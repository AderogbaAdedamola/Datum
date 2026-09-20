import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, Cylinder } from '@react-three/drei';

const LevelNotch = ({ index, position, level }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Delay each notch by 0.2s after the main reveal (which takes ~0.66s)
    const delay = 0.8 + index * 0.2;
    const isActive = t > delay && index < level;
    
    if (meshRef.current) {
      if (isActive) {
        meshRef.current.material.emissiveIntensity = Math.min((t - delay) * 5, 2); // fade in to 2
      } else {
        meshRef.current.material.emissiveIntensity = 0;
      }
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial 
        color="#FDE68A" 
        emissive="#FDE68A"
        emissiveIntensity={0}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const RotatingMedallion = ({ level = 3 }) => {
  const meshRef = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handlePointerMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Orchestrated reveal: scale up with bounce
    const revealProgress = Math.min(t * 1.2, 1);
    const easeOutBounce = (x) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (x < 1 / d1) return n1 * x * x;
      else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
      else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
      else return n1 * (x -= 2.625 / d1) * x + 0.984375;
    };
    
    const scale = easeOutBounce(revealProgress);
    meshRef.current.scale.set(scale, scale, scale);

    // Animation phases
    if (revealProgress < 1) {
       meshRef.current.rotation.y = t * Math.PI * 3;
       meshRef.current.rotation.x = Math.PI / 4 * (1 - revealProgress);
    } else {
      const targetX = pointer.current.y * 0.4;
      const targetY = pointer.current.x * 0.4;
       
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    }
  });

  // Map level to material colors based on design doc
  const materials = {
    0: { color: '#E5E7EB', metalness: 0.2, roughness: 0.8 }, // Tin/Grey
    1: { color: '#D1D5DB', metalness: 0.4, roughness: 0.6 }, // Better Tin
    2: { color: '#D4A373', metalness: 0.6, roughness: 0.4 }, // Bronze
    3: { color: '#B08D6A', metalness: 0.7, roughness: 0.3 }, // Better Bronze
    4: { color: '#E2E8F0', metalness: 0.8, roughness: 0.2 }, // Silver
    5: { color: '#FDE68A', metalness: 0.9, roughness: 0.1 }, // Desaturated Gold
  };

  const matProps = materials[level] || materials[3];

  return (
    <group ref={meshRef}>
      {/* Base Medallion Cylinder */}
      <Cylinder args={[2, 2, 0.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={matProps.color} 
          metalness={matProps.metalness} 
          roughness={matProps.roughness} 
        />
      </Cylinder>
      
      {/* Inner Rim (embossed) */}
      <Cylinder args={[1.8, 1.8, 0.22, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={matProps.color} 
          metalness={matProps.metalness + 0.1} 
          roughness={matProps.roughness - 0.1} 
        />
      </Cylinder>

      {/* Crosshairs (engraved) */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[3.8, 0.02]} />
        <meshStandardMaterial color="#161B22" metalness={0} roughness={1} opacity={0.3} transparent />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[0.02, 3.8]} />
        <meshStandardMaterial color="#161B22" metalness={0} roughness={1} opacity={0.3} transparent />
      </mesh>

      {/* Center Point */}
      <Cylinder args={[0.2, 0.2, 0.24, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#A9825A" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Level Notches */}
      {[...Array(5)].map((_, i) => {
        // distribute along the top half or evenly around the rim
        const angle = (i / 4) * Math.PI - Math.PI; 
        const radius = 1.9;
        const x = Math.cos(angle) * radius;
        const y = -Math.sin(angle) * radius;
        
        return (
          <LevelNotch key={i} index={i} position={[x, y, 0.12]} level={level} />
        );
      })}

      {/* Level Text */}
      <Text
        position={[0, -0.8, 0.12]}
        fontSize={0.25}
        color="#161B22"
        font="https://fonts.gstatic.com/s/fraunces/v31/6NUO8FyLNQOQZawkxQ0aZyoM.woff2"
        anchorX="center"
        anchorY="middle"
        material-opacity={0.7}
      >
        LEVEL
      </Text>
      <Text
        position={[0, -1.2, 0.12]}
        fontSize={0.4}
        color="#161B22"
        font="https://fonts.gstatic.com/s/fraunces/v31/6NUO8FyLNQOQZawkxQ0aZyoM.woff2"
        anchorX="center"
        anchorY="middle"
      >
        {level}
      </Text>
    </group>
  );
};

const Medallion3D = ({ level = 3, className = '' }) => {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Soft environment lighting to bring out the metalness */}
        <Environment preset="city" />
        
        <RotatingMedallion level={level} />
      </Canvas>
    </div>
  );
};

export default Medallion3D;
