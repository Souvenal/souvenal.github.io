"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface BlogCardProps {
  position: [number, number, number];
  title: string;
  date: string;
  category: string;
  onClick: () => void;
}

// 3D博客卡片组件
function BlogCard({ position, title, date, category, onClick }: BlogCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // 悬停时的缩放动画
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // 轻微的浮动动画
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;

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

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2.2, 1.4, 0.1]}
        radius={0.05}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color={hovered ? "#4f46e5" : "#1e1b4b"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#4338ca" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </RoundedBox>

      {/* 标题文字 */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>

      {/* 分类标签 */}
      <Text
        position={[-0.7, -0.4, 0.06]}
        fontSize={0.08}
        color="#60a5fa"
        anchorX="left"
        anchorY="middle"
      >
        {category}
      </Text>

      {/* 日期 */}
      <Text
        position={[0.7, -0.4, 0.06]}
        fontSize={0.07}
        color="#9ca3af"
        anchorX="right"
        anchorY="middle"
      >
        {date}
      </Text>

      {/* 悬停时的发光边框 */}
      {hovered && (
        <RoundedBox args={[2.25, 1.45, 0.08]} radius={0.05} smoothness={4}>
          <meshBasicMaterial color="#818cf8" transparent opacity={0.3} />
        </RoundedBox>
      )}
    </group>
  );
}

// 相机控制
function CameraController() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      (state.pointer.x * 0.5),
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      (state.pointer.y * 0.3 + 2),
      0.05
    );
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
    position: [-2.8, 0.5, 0] as [number, number, number],
  },
  {
    id: 2,
    title: "GLSL Shader 技巧",
    date: "2024-12-10",
    category: "Shader",
    position: [0, 0.5, 0] as [number, number, number],
  },
  {
    id: 3,
    title: "WebGL 性能调优",
    date: "2024-12-05",
    category: "WebGL",
    position: [2.8, 0.5, 0] as [number, number, number],
  },
  {
    id: 4,
    title: "光线追踪入门",
    date: "2024-11-28",
    category: "RayTracing",
    position: [-1.4, -1.2, 0] as [number, number, number],
  },
  {
    id: 5,
    title: "Compute Shader 实战",
    date: "2024-11-20",
    category: "GPU",
    position: [1.4, -1.2, 0] as [number, number, number],
  },
];

export default function BlogCards3D() {
  const handleCardClick = (id: number, title: string) => {
    console.log(`打开文章: ${title} (ID: ${id})`);
    // 这里可以添加路由跳转逻辑
  };

  return (
    <div className="h-[60vh] w-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraController />

        {/* 环境光 */}
        <ambientLight intensity={0.5} />

        {/* 主光源 */}
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* 彩色点光源 */}
        <pointLight position={[-5, 3, 2]} color="#4f46e5" intensity={2} />
        <pointLight position={[5, 3, 2]} color="#06b6d4" intensity={2} />

        {/* 博客卡片 */}
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            position={post.position}
            title={post.title}
            date={post.date}
            category={post.category}
            onClick={() => handleCardClick(post.id, post.title)}
          />
        ))}
      </Canvas>
    </div>
  );
}
