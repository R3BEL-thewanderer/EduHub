import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Move camera to look at the object from a slight angle
    camera.position.z = 15;
    camera.position.x = 8;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Object setup: D2CMarketing style wireframe structure
    // We'll create a complex looking interconnected sphere/icosahedron
    const geometry = new THREE.IcosahedronGeometry(12, 1);
    
    // Wireframe material matching light theme
    const material = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e, // Dark navy text color for contrast
      wireframe: true,
      transparent: true,
      opacity: 0.1 // Subtle wireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add a second inner geometry for complexity
    const innerGeometry = new THREE.IcosahedronGeometry(8, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a4a5a,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Mouse interaction via raycaster/rotation
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto rotation + mouse interaction
      targetRotationY += 0.001;
      
      mesh.rotation.y += (targetRotationY + mouseX - mesh.rotation.y) * 0.05;
      mesh.rotation.x += (targetRotationX + mouseY - mesh.rotation.x) * 0.05;
      
      innerMesh.rotation.y -= 0.002;
      innerMesh.rotation.x -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-60 md:opacity-100"
    />
  );
}
