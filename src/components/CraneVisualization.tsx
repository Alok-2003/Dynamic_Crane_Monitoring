import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Import loaders
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CraneVisualization: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null); // Type reference for the scene container
  const [modelLoaded, setModelLoaded] = useState(false); // Using state to track if the model has been loaded

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      95, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      500 // Far clipping plane
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (sceneRef.current) {
      sceneRef.current.appendChild(renderer.domElement);
    }

    // Add lighting
    const light = new THREE.AmbientLight(0x404040, 5); // Ambient light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Set up OrbitControls for camera manipulation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable smooth camera movement
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    // Load the 3D model (use OBJLoader for obj files)
    const loader = new OBJLoader();
    if (!modelLoaded) { // Load the model only if it hasn't been loaded already
      loader.load('/models/Kran.obj', (object) => {
        object.scale.set(1, 1, 1); // Scale down the object if it's too big or too small
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshNormalMaterial(); // Apply material to visualize the model better
          }
        });
        scene.add(object);
        setModelLoaded(true); // Mark that the model is loaded
      });
    }

    // Set camera position
    camera.position.set(10, 10, 10); // Adjust the Z position of the camera

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update the controls based on user input
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function when the component unmounts
    return () => {
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement);
      }
      // Clean up all objects and materials manually
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Dispose of geometry and material
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      // Dispose of renderer, camera, and lights if necessary
      renderer.dispose();
      directionalLight.dispose();
      light.dispose();
    };
  }, [modelLoaded]); // Only run the effect when the model is not loaded

  return <div ref={sceneRef} style={{ width: '500px', height: '250px' }}></div>;
};

export default CraneVisualization;
