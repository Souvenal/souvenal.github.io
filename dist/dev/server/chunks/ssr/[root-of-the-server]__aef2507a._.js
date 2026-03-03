module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShaderBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// Seeded random number generator for deterministic results
function seededRandom(seed) {
    let s = seed;
    return ()=>{
        s = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
        return s - Math.floor(s);
    };
}
// GLSL Fragment Shader - 动态流体背景
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // 简单的噪声函数
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  // FBM - 分形布朗运动
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 st = vUv * 3.0;
    
    // 添加时间动画
    float t = uTime * 0.15;
    
    // 创建流体效果
    vec2 q = vec2(
      fbm(st + t),
      fbm(st + vec2(1.0))
    );
    
    vec2 r = vec2(
      fbm(st + q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(st + q + vec2(8.3, 2.8) + 0.126 * t)
    );
    
    float f = fbm(st + r);
    
    // 颜色混合 - 科技蓝紫色调
    vec3 color1 = vec3(0.1, 0.15, 0.3);  // 深蓝
    vec3 color2 = vec3(0.3, 0.2, 0.5);  // 紫色
    vec3 color3 = vec3(0.0, 0.4, 0.6);  // 青色
    vec3 color4 = vec3(0.05, 0.05, 0.15); // 近黑蓝
    
    vec3 color = mix(color1, color2, clamp(f * f * 2.0, 0.0, 1.0));
    color = mix(color, color3, clamp(length(q) * 0.5, 0.0, 1.0));
    color = mix(color, color4, clamp(length(r.x), 0.0, 1.0));
    
    // 添加鼠标交互辉光
    float mouseDist = distance(vUv, uMouse);
    float glow = smoothstep(0.5, 0.0, mouseDist) * 0.3;
    color += vec3(0.2, 0.4, 0.8) * glow;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
// 顶点着色器
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
// Shader平面组件
function ShaderPlane() {
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0.5,
        y: 0.5
    });
    const uniforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            uTime: {
                value: 0
            },
            uMouse: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](0.5, 0.5)
            },
            uResolution: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](window.innerWidth, window.innerHeight)
            }
        }), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        if (meshRef.current) {
            const material = meshRef.current.material;
            material.uniforms.uTime.value = state.clock.elapsedTime;
            // 平滑鼠标跟随
            material.uniforms.uMouse.value.x += (mouseRef.current.x - material.uniforms.uMouse.value.x) * 0.05;
            material.uniforms.uMouse.value.y += (mouseRef.current.y - material.uniforms.uMouse.value.y) * 0.05;
        }
    });
    // 鼠标移动事件
    const handlePointerMove = (e)=>{
        mouseRef.current = {
            x: e.uv?.x ?? 0.5,
            y: e.uv?.y ?? 0.5
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        onPointerMove: handlePointerMove,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    2,
                    2
                ]
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                fragmentShader: fragmentShader,
                vertexShader: vertexShader,
                uniforms: uniforms
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
// 粒子系统组件 - 使用 userData 存储速度
function ParticleField() {
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const particleCount = 100;
    // 使用 useMemo 创建 geometry，velocities 存储在 userData 中
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const random = seededRandom(12345);
        const pos = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        for(let i = 0; i < particleCount; i++){
            pos[i * 3] = (random() - 0.5) * 4;
            pos[i * 3 + 1] = (random() - 0.5) * 4;
            pos[i * 3 + 2] = (random() - 0.5) * 2;
            velocities[i * 3] = (random() - 0.5) * 0.002;
            velocities[i * 3 + 1] = (random() - 0.5) * 0.002;
            velocities[i * 3 + 2] = (random() - 0.5) * 0.001;
        }
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](pos, 3));
        // 将 velocities 存储在 userData 中，这是 Three.js 的标准做法
        geo.userData = {
            velocities
        };
        return geo;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (pointsRef.current) {
            const positionAttribute = pointsRef.current.geometry.attributes.position;
            const array = positionAttribute.array;
            const velocities = pointsRef.current.geometry.userData.velocities;
            if (velocities) {
                for(let i = 0; i < particleCount; i++){
                    array[i * 3] += velocities[i * 3];
                    array[i * 3 + 1] += velocities[i * 3 + 1];
                    array[i * 3 + 2] += velocities[i * 3 + 2];
                    // 边界检查 - 使用反弹
                    if (Math.abs(array[i * 3]) > 2) {
                        velocities[i * 3] = -velocities[i * 3];
                        array[i * 3] = Math.sign(array[i * 3]) * 2;
                    }
                    if (Math.abs(array[i * 3 + 1]) > 2) {
                        velocities[i * 3 + 1] = -velocities[i * 3 + 1];
                        array[i * 3 + 1] = Math.sign(array[i * 3 + 1]) * 2;
                    }
                    if (Math.abs(array[i * 3 + 2]) > 1) {
                        velocities[i * 3 + 2] = -velocities[i * 3 + 2];
                        array[i * 3 + 2] = Math.sign(array[i * 3 + 2]) * 1;
                    }
                }
                positionAttribute.needsUpdate = true;
            }
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            size: 0.02,
            color: "#60a5fa",
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        }, void 0, false, {
            fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
            lineNumber: 208,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
function ShaderBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 -z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    0,
                    1
                ],
                fov: 75
            },
            dpr: [
                1,
                2
            ],
            gl: {
                antialias: true,
                alpha: true
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderPlane, {}, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ParticleField, {}, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
            lineNumber: 223,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Projects/souvenal-blog/app/components/ShaderBackground.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}
}),
"[project]/Projects/souvenal-blog/app/components/Navigation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Navigation() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const navItems = [
        {
            name: "首页",
            href: "/"
        },
        {
            name: "文章",
            href: "/posts"
        },
        {
            name: "Shader",
            href: "/shaders"
        },
        {
            name: "关于",
            href: "/about"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-white",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                                        }, void 0, false, {
                                            fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                            lineNumber: 29,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                        lineNumber: 23,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-bold text-lg",
                                    children: "GPU Blog"
                                }, void 0, false, {
                                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center space-x-8",
                            children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium",
                                    children: item.name
                                }, item.name, false, {
                                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "md:hidden text-gray-300 hover:text-white",
                            onClick: ()=>setIsOpen(!isOpen),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 6h16M4 12h16M4 18h16"
                                }, void 0, false, {
                                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md rounded-lg mt-2",
                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium",
                                onClick: ()=>setIsOpen(false),
                                children: item.name
                            }, item.name, false, {
                                fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                                lineNumber: 88,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Projects/souvenal-blog/app/components/Navigation.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogCards3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/@react-three/drei/core/Text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/@react-three/drei/core/RoundedBox.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/souvenal-blog/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// 3D博客卡片组件
function BlogCard({ position, title, date, category, onClick }) {
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clicked, setClicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        if (meshRef.current) {
            // 悬停时的缩放动画
            const targetScale = hovered ? 1.1 : 1;
            meshRef.current.scale.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](targetScale, targetScale, targetScale), 0.1);
            // 轻微的浮动动画
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
            // 点击时的旋转效果
            if (clicked) {
                meshRef.current.rotation.y += 0.1;
                if (meshRef.current.rotation.y > Math.PI * 2) {
                    setClicked(false);
                    meshRef.current.rotation.y = 0;
                }
            }
        }
    });
    const handleClick = ()=>{
        setClicked(true);
        onClick();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundedBox"], {
                ref: meshRef,
                args: [
                    2.2,
                    1.4,
                    0.1
                ],
                radius: 0.05,
                smoothness: 4,
                onPointerOver: ()=>setHovered(true),
                onPointerOut: ()=>setHovered(false),
                onClick: handleClick,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                    color: hovered ? "#4f46e5" : "#1e1b4b",
                    metalness: 0.8,
                    roughness: 0.2,
                    emissive: hovered ? "#4338ca" : "#000000",
                    emissiveIntensity: hovered ? 0.3 : 0
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                position: [
                    0,
                    0.3,
                    0.06
                ],
                fontSize: 0.15,
                color: "white",
                anchorX: "center",
                anchorY: "middle",
                maxWidth: 2,
                children: title
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                position: [
                    -0.7,
                    -0.4,
                    0.06
                ],
                fontSize: 0.08,
                color: "#60a5fa",
                anchorX: "left",
                anchorY: "middle",
                children: category
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                position: [
                    0.7,
                    -0.4,
                    0.06
                ],
                fontSize: 0.07,
                color: "#9ca3af",
                anchorX: "right",
                anchorY: "middle",
                children: date
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            hovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$RoundedBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundedBox"], {
                args: [
                    2.25,
                    1.45,
                    0.08
                ],
                radius: 0.05,
                smoothness: 4,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                    color: "#818cf8",
                    transparent: true,
                    opacity: 0.3
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 108,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
// 相机控制
function CameraController() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        state.camera.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(state.camera.position.x, state.pointer.x * 0.5, 0.05);
        state.camera.position.y = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(state.camera.position.y, state.pointer.y * 0.3 + 2, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}
// 博客数据
const blogPosts = [
    {
        id: 1,
        title: "GPU 粒子系统优化",
        date: "2024-12-15",
        category: "Graphics",
        position: [
            -2.8,
            0.5,
            0
        ]
    },
    {
        id: 2,
        title: "GLSL Shader 技巧",
        date: "2024-12-10",
        category: "Shader",
        position: [
            0,
            0.5,
            0
        ]
    },
    {
        id: 3,
        title: "WebGL 性能调优",
        date: "2024-12-05",
        category: "WebGL",
        position: [
            2.8,
            0.5,
            0
        ]
    },
    {
        id: 4,
        title: "光线追踪入门",
        date: "2024-11-28",
        category: "RayTracing",
        position: [
            -1.4,
            -1.2,
            0
        ]
    },
    {
        id: 5,
        title: "Compute Shader 实战",
        date: "2024-11-20",
        category: "GPU",
        position: [
            1.4,
            -1.2,
            0
        ]
    }
];
function BlogCards3D() {
    const handleCardClick = (id, title)=>{
        console.log(`打开文章: ${title} (ID: ${id})`);
    // 这里可以添加路由跳转逻辑
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[60vh] w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    2,
                    5
                ],
                fov: 50
            },
            dpr: [
                1,
                2
            ],
            gl: {
                antialias: true,
                alpha: true
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraController, {}, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                    intensity: 0.5
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: [
                        5,
                        5,
                        5
                    ],
                    intensity: 1
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    position: [
                        -5,
                        3,
                        2
                    ],
                    color: "#4f46e5",
                    intensity: 2
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    position: [
                        5,
                        3,
                        2
                    ],
                    color: "#06b6d4",
                    intensity: 2
                }, void 0, false, {
                    fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                blogPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$souvenal$2d$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogCard, {
                        position: post.position,
                        title: post.title,
                        date: post.date,
                        category: post.category,
                        onClick: ()=>handleCardClick(post.id, post.title)
                    }, post.id, false, {
                        fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
            lineNumber: 180,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Projects/souvenal-blog/app/components/BlogCards3D.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aef2507a._.js.map