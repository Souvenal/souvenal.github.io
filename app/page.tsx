import ShaderBackground from "./components/ShaderBackground";
import Navigation from "./components/Navigation";
import BlogCards3D from "./components/BlogCards3D";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* GPU Shader 背景 */}
      <ShaderBackground />

      {/* 导航栏 */}
      <Navigation />

      {/* Hero 区域 */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-gray-300 text-sm">GPU 图形工程师</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            探索
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              GPU 渲染
            </span>
            的世界
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            分享 WebGL、Shader、光线追踪和实时渲染的技术博客。
            <br />
            用 GPU 打造沉浸式阅读体验。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#posts"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              浏览文章
            </a>
            <a
              href="/shaders"
              className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-200"
            >
              Shader Demo
            </a>
          </div>
        </div>
      </section>

      {/* 3D 博客卡片区域 */}
      <section id="posts" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">最新文章</h2>
            <p className="text-gray-400">悬停卡片查看效果，点击阅读文章</p>
          </div>

          <BlogCards3D />
        </div>
      </section>

      {/* 技术标签云 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">技术栈</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "WebGL",
              "GLSL",
              "Three.js",
              "React Three Fiber",
              "GPU Computing",
              "Ray Tracing",
              "Compute Shader",
              "Post-processing",
              "Particles",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 GPU Blog. Built with Next.js & React Three Fiber.
          </p>

          <div className="flex gap-6">
            <a
              href="https://github.com"
              className="text-gray-500 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-500 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
