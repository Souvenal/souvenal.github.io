"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random number generator for deterministic results
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
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
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // 平滑鼠标跟随
      material.uniforms.uMouse.value.x += (mouseRef.current.x - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (mouseRef.current.y - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  // 鼠标移动事件
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    mouseRef.current = {
      x: e.uv?.x ?? 0.5,
      y: e.uv?.y ?? 0.5,
    };
  };

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// 粒子系统组件 - 使用 userData 存储速度
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  // 使用 useMemo 创建 geometry，velocities 存储在 userData 中
  const geometry = useMemo(() => {
    const random = seededRandom(12345);
    const pos = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (random() - 0.5) * 4;
      pos[i * 3 + 1] = (random() - 0.5) * 4;
      pos[i * 3 + 2] = (random() - 0.5) * 2;
      
      velocities[i * 3] = (random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (random() - 0.5) * 0.001;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    // 将 velocities 存储在 userData 中，这是 Three.js 的标准做法
    geo.userData = { velocities };
    
    return geo;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      const array = positionAttribute.array as Float32Array;
      const velocities = pointsRef.current.geometry.userData.velocities as Float32Array;
      
      if (velocities) {
        for (let i = 0; i < particleCount; i++) {
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

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// 主背景组件
export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ShaderPlane />
        <ParticleField />
      </Canvas>
    </div>
  );
}
