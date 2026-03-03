#!/usr/bin/env node
/**
 * 从 Obsidian 笔记仓库同步内容到博客
 * 
 * 使用方法：
 *   node scripts/sync-notes.js
 * 
 * 环境变量：
 *   NOTES_REPO_URL - 笔记仓库地址
 *   PUBLISH_TAG - 只发布包含此标签的笔记（默认：publish）
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  notesRepo: process.env.NOTES_REPO_URL || 'https://github.com/souvenal/pure-notes.git',
  notesBranch: process.env.NOTES_BRANCH || 'main',
  publishTag: process.env.PUBLISH_TAG || '#publish',
  tempDir: '.temp-notes',
  outputDir: 'content/posts',
  // 要同步的目录（留空表示全部）
  includeDirs: ['Render', 'Languages', 'Math'],
  // 要排除的目录
  excludeDirs: ['Applications', 'System'],
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 清理临时目录
function cleanup() {
  if (fs.existsSync(CONFIG.tempDir)) {
    fs.rmSync(CONFIG.tempDir, { recursive: true, force: true });
    log('🧹 清理临时目录', 'yellow');
  }
}

// 克隆笔记仓库
function cloneNotes() {
  log('📦 克隆笔记仓库...', 'blue');
  try {
    execSync(
      `git clone --depth 1 --branch ${CONFIG.notesBranch} ${CONFIG.notesRepo} ${CONFIG.tempDir}`,
      { stdio: 'inherit' }
    );
    log('✅ 克隆完成', 'green');
  } catch (error) {
    log('❌ 克隆失败', 'red');
    throw error;
  }
}

// 检查文件是否应该发布
function shouldPublish(content) {
  return content.includes(CONFIG.publishTag);
}

// 转换 Obsidian 链接为博客格式
function convertLinks(content) {
  // Obsidian: [[filename]] -> 博客: [filename](/posts/filename)
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, link) => {
    const slug = link.toLowerCase().replace(/\s+/g, '-');
    return `[${link}](/posts/${slug})`;
  });

  // Obsidian: ![[image.png]] -> 博客: ![image](/posts/image.png)
  content = content.replace(/!\[\[([^\]]+)\]\]/g, (match, image) => {
    return `![${image}](/images/${image})`;
  });

  return content;
}

// 添加/更新 frontmatter
function processFrontmatter(content, fileName) {
  const title = path.basename(fileName, '.md');
  const date = new Date().toISOString().split('T')[0];
  
  // 检查是否已有 frontmatter
  if (content.startsWith('---')) {
    // 更新现有 frontmatter
    return content.replace(
      /---\n([\s\S]*?)\n---/,
      `---\n$1\nlastModified: ${date}\n---`
    );
  }
  
  // 添加新 frontmatter
  const newFrontmatter = `---
title: ${title}
date: ${date}
category: note
tags: []
---

`;
  
  return newFrontmatter + content;
}

// 处理单个文件
function processFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 检查是否应该发布
  if (!shouldPublish(content)) {
    log(`⏭️  跳过（未标记发布）: ${relativePath}`, 'yellow');
    return null;
  }
  
  // 转换内容
  let processedContent = content;
  processedContent = convertLinks(processedContent);
  processedContent = processFrontmatter(processedContent, path.basename(filePath));
  
  // 移除发布标签（不需要在正文中显示）
  processedContent = processedContent.replace(new RegExp(CONFIG.publishTag, 'g'), '');
  
  return processedContent;
}

// 递归处理目录
function processDirectory(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativePath, entry.name);
    
    if (entry.isDirectory()) {
      // 检查是否在排除列表
      if (CONFIG.excludeDirs.includes(entry.name)) {
        log(`⏭️  跳过目录: ${relPath}`, 'yellow');
        continue;
      }
      
      // 如果配置了包含目录，检查是否在列表中
      if (CONFIG.includeDirs.length > 0 && !CONFIG.includeDirs.includes(entry.name) && relativePath === '') {
        continue;
      }
      
      results.push(...processDirectory(fullPath, relPath));
    } else if (entry.name.endsWith('.md')) {
      log(`📝 处理: ${relPath}`, 'blue');
      const processed = processFile(fullPath, relPath);
      if (processed) {
        results.push({
          source: relPath,
          content: processed,
          outputName: entry.name.toLowerCase().replace(/\s+/g, '-'),
        });
      }
    }
  }
  
  return results;
}

// 写入文件
function writePosts(posts) {
  // 确保输出目录存在
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  for (const post of posts) {
    const outputPath = path.join(CONFIG.outputDir, post.outputName);
    fs.writeFileSync(outputPath, post.content, 'utf-8');
    log(`✅ 已发布: ${post.outputName}`, 'green');
  }
  
  // 生成索引文件
  generateIndex(posts);
}

// 生成索引
function generateIndex(posts) {
  const indexContent = `---
title: 文章列表
date: ${new Date().toISOString().split('T')[0]}
---

# 所有文章

${posts.map(post => `- [${post.source.replace('.md', '')}](/posts/${post.outputName.replace('.md', '')})`).join('\n')}
`;
  
  fs.writeFileSync(path.join(CONFIG.outputDir, 'index.md'), indexContent, 'utf-8');
  log('📑 已生成索引', 'green');
}

// 主函数
async function main() {
  try {
    log('🚀 开始同步笔记...\n', 'blue');
    
    // 清理和克隆
    cleanup();
    cloneNotes();
    
    // 处理文件
    log('\n📂 扫描笔记文件...', 'blue');
    const posts = processDirectory(CONFIG.tempDir);
    
    if (posts.length === 0) {
      log('\n⚠️ 没有找到可发布的笔记', 'yellow');
      log(`提示：在笔记中添加 ${CONFIG.publishTag} 标签即可发布`, 'yellow');
      cleanup();
      return;
    }
    
    log(`\n📊 找到 ${posts.length} 篇可发布的笔记\n`, 'blue');
    
    // 写入文件
    writePosts(posts);
    
    // 清理
    cleanup();
    
    log('\n✨ 同步完成！', 'green');
    log(`📁 文件已保存到: ${CONFIG.outputDir}`, 'green');
    
  } catch (error) {
    log(`\n❌ 错误: ${error.message}`, 'red');
    cleanup();
    process.exit(1);
  }
}

main();
