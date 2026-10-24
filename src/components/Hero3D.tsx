"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setWebglSupported(false);
      return;
    }

    // 2. WebGL check
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebglSupported(false);
      return;
    }
    setWebglSupported(true);

    const container = containerRef.current;
    if (!container) return;

    // 3. Three.js Tactile Editorial Sculpture Setup
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 6.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Sculpture Geometry: Torus Knot in Deep Obsidian Spruce (#041214) with Ceramic Glaze
    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 128, 32, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x041214,          // Deep Obsidian Spruce
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      reflectivity: 0.6,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    mainGroup.add(knotMesh);

    // Orbital Hairline Wireframe Cage in Warm Terracotta (#D4A373)
    const wireGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4a373,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Architectural Coordinate Ring in Muted Sage Green (#CCD5AE)
    const ringGeo = new THREE.TorusGeometry(2.7, 0.014, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xccd5ae,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    mainGroup.add(ringMesh);

    // Natural Studio Daylight Lighting (Key, Fill, and Gold Rim from Moniqa palette)
    const keyLight = new THREE.DirectionalLight(0xfefae0, 2.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe9edc9, 1.5);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const goldRim = new THREE.DirectionalLight(0xfdbb4f, 2.2);
    goldRim.position.set(0, -6, -4);
    scene.add(goldRim);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      // Slow, meditative, intentional rotation
      knotMesh.rotation.x += 0.22 * delta;
      knotMesh.rotation.y += 0.35 * delta;

      wireMesh.rotation.x -= 0.12 * delta;
      wireMesh.rotation.y -= 0.18 * delta;

      ringMesh.rotation.z += 0.08 * delta;

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      mainGroup.rotation.y = mouseX;
      mainGroup.rotation.x = mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeo.dispose();
      knotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Non-WebGL / Reduced Motion Fallback */}
      {webglSupported === false && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px]" fill="none">
            <circle cx="200" cy="200" r="140" stroke="#CCD5AE" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="200" cy="200" r="100" stroke="#E9EDC9" strokeWidth="2" />
            <rect x="130" y="130" width="140" height="140" rx="20" stroke="#041214" strokeWidth="3" fill="#FAEDCD" fillOpacity="0.8" />
            <path d="M150 200C150 160 250 160 250 200C250 240 150 240 150 200Z" stroke="#D4A373" strokeWidth="4" />
            <circle cx="200" cy="200" r="6" fill="#FDBB4F" />
          </svg>
        </div>
      )}
    </div>
  );
}
