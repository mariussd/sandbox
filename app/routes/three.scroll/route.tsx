import { Canvas, type MeshProps, useFrame } from "@react-three/fiber";
import { Float, ScrollControls, useScroll, Scroll } from "@react-three/drei";
import { useRef } from "react";
import { type LinksFunction } from "@remix-run/node";
import styles from "~/routes/three.scroll/styles/styles.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const ScrollTest = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-6, 3, 6],
      }}
    >
      <directionalLight position={[1, 3, 2]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <ScrollControls damping={0.01} pages={5}>
        <Cube />
        {/*        <Scroll>
          <Cube></Cube>
        </Scroll>*/}
      </ScrollControls>
    </Canvas>
  );
};

const Cube = () => {
  const ref = useRef<MeshProps>();
  const scroll = useScroll();

  const oldOffset = useRef(0);

  useFrame((state, delta) => {
    const scrollDirection = oldOffset.current - scroll.offset > 0 ? 1 : -1;

    ref.current.rotation.y += scroll.delta * 1.3 * scrollDirection;
    ref.current.rotation.z -= scroll.delta * 0.2 * -scrollDirection;

    oldOffset.current = scroll.offset;
  });

  return (
    <Float>
      <mesh ref={ref} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </Float>
  );
};

export default ScrollTest;
