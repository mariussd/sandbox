import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  OrbitControls,
  PivotControls,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const sphere = useRef();
  const cube = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={2}
      >
        <mesh ref={sphere} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </PivotControls>

      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh ref={cube} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </PivotControls>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={1024}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
          color="lightblue"
        />
        {/* <meshStandardMaterial color="greenyellow" />*/}
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          color="salmon"
          fontSize={1}
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          I LOVE R3F
        </Text>
      </Float>
    </>
  );
}
