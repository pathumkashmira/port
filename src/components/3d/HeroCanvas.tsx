'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL not supported:', e);
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 25;

    // 1. Floating Particle Grid (3D Space Dust / Digital Studio Matrix)
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Color variation between gold, cyan, and deep titanium
      const rand = Math.random();
      if (rand > 0.6) {
        // Gold
        colors[i * 3] = 0.83;
        colors[i * 3 + 1] = 0.68;
        colors[i * 3 + 2] = 0.21;
      } else if (rand > 0.3) {
        // Cyan Glow
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.95;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Titanium
        colors[i * 3] = 0.4;
        colors[i * 3 + 1] = 0.45;
        colors[i * 3 + 2] = 0.5;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 2. Central 3D Geometric Artifact (Wireframe Icosahedron & Torus knot)
    const artifactGroup = new THREE.Group();

    const icosahedronGeo = new THREE.IcosahedronGeometry(5.5, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(icosahedronGeo, wireframeMat);
    artifactGroup.add(wireframeMesh);

    // Inner gold core
    const innerGeo = new THREE.OctahedronGeometry(2.8, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
      wireframeLinewidth: 1.5,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    artifactGroup.add(innerMesh);

    // Subtle lighting for mesh materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3, 50);
    cyanLight.position.set(-10, -10, 10);
    scene.add(cyanLight);

    scene.add(artifactGroup);

    // Mouse Tracking for Smooth Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / artifact interpolation toward mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      artifactGroup.rotation.y = elapsedTime * 0.12 + currentMouseX * 0.8;
      artifactGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.3 + currentMouseY * 0.5;
      innerMesh.rotation.y = -elapsedTime * 0.25;

      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = currentMouseY * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      icosahedronGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 size-full pointer-events-none z-0"
      data-cursor="DRAG 3D"
      aria-hidden="true"
    />
  );
}
