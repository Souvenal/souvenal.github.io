# Obsidian 笔记自动发布系统

## 🎯 工作流程

```
Obsidian 编辑笔记
    ↓ 添加 #publish 标签
推送到 pure-notes 仓库
    ↓ (每小时自动)
GitHub Actions 检测到更新
    ↓
转换格式并同步到博客
    ↓
博客自动构建并部署
```

## 📝 发布笔记的方法

在 Obsidian 的任意 Markdown 文件中添加标签：

```markdown
---
title: 我的笔记标题
date: 2024-01-01
---

这是一篇技术笔记...

更多内容...

#publish  <-- 添加这个标签即可发布
```

### 支持的标签

- `#publish` - 发布这篇文章（默认）
- `#publish-tech` - 发布到技术分类
- `#publish-draft` - 草稿模式（不发布）

## 🔧 目录结构

### 笔记仓库 (pure-notes)
```
pure-notes/
├── Archive/
│   ├── Render/          # ✓ 会同步
│   │   └── Vulkan/
│   │       └── intro.md  # 添加 #publish 就会发布
│   ├── Languages/       # ✓ 会同步
│   ├── Math/            # ✓ 会同步
│   ├── Applications/    # ✗ 不同步（配置排除）
│   └── System/          # ✗ 不同步（配置排除）
└── ...
```

### 博客仓库 (souvenal.github.io)
```
content/
└── posts/               # 同步后的文章
    ├── intro.md
    ├── shader-guide.md
    └── index.md         # 自动生成的索引
```

## 🎨 自定义配置

编辑 `scripts/sync-notes.js` 中的 `CONFIG`：

```javascript
const CONFIG = {
  // 要同步的目录（从根目录开始）
  includeDirs: ['Render', 'Languages', 'Math'],
  
  // 要排除的目录
  excludeDirs: ['Applications', 'System', 'Private'],
  
  // 发布标签
  publishTag: '#publish',
  
  // ... 更多配置
};
```

## 🖼️ 图片处理

Obsidian 的图片会自动处理：

```markdown
# Obsidian 格式
![[my-image.png]]

# 自动转换为
![my-image.png](/images/my-image.png)
```

**注意**：
- 图片需要手动复制到博客的 `public/images/` 目录
- 或者使用图床（推荐 Imgur、SM.MS）

## 🔗 内部链接

Obsidian 的 wiki 链接会自动转换：

```markdown
# Obsidian 格式
[[另一篇笔记]]

# 自动转换为
[另一篇笔记](/posts/另一篇笔记)
```

## 🚀 手动同步

如果想立即同步（不等待自动同步）：

```bash
# 本地运行
node scripts/sync-notes.js

# 或者 GitHub 上手动触发
# Actions → Sync Notes from Obsidian → Run workflow
```

## 📊 查看同步状态

在 GitHub 仓库页面：
1. 点击 **Actions** 标签
2. 查看 **Sync Notes from Obsidian** 工作流
3. 绿色 ✓ 表示成功，红色 ✗ 表示失败

## 💡 最佳实践

1. **不要发布敏感信息** - 在 `excludeDirs` 中添加私人笔记目录
2. **使用 Frontmatter** - 添加标题、日期、标签等元数据
3. **定期整理** - 删除不需要的旧笔记
4. **图片优化** - 压缩图片后再放入 Obsidian

## 🐛 常见问题

### Q: 为什么我添加了 #publish 但没有同步？
A: 检查以下几点：
- 标签是否在文件末尾或单独一行
- 文件是否在 `includeDirs` 配置的目录中
- 是否推送到了 GitHub
- 等待最多1小时（自动同步是每小时一次）

### Q: 可以只发布部分章节吗？
A: 目前不支持。建议把要发布的内容单独放在一个文件中。

### Q: 如何取消发布？
A: 删除 `#publish` 标签，下次同步时会自动移除。

### Q: 发布后可以修改吗？
A: 可以！修改 Obsidian 中的文件，再次添加 `#publish` 标签即可更新。

## 🔮 未来功能

- [ ] 按标签自动分类
- [ ] 支持加密笔记
- [ ] 图片自动上传图床
- [ ] 双向同步（评论同步回 Obsidian）
