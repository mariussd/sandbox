import { Canvas, type MeshProps, useFrame } from "@react-three/fiber";
import { Float, ScrollControls, useScroll } from "@react-three/drei";
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
        position: [0, 0, 6],
      }}
    >
      <directionalLight position={[1, 3, 2]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <ScrollControls damping={0.01} pages={5}>
        <Cube />
      </ScrollControls>
    </Canvas>
  );
};

const Cube = () => {
  const ref = useRef<MeshProps>();
  const scroll = useScroll();

  const oldOffset = useRef(0);

  useFrame(({ mouse, camera, viewport }) => {
    const scrollDirection = oldOffset.current - scroll.offset > 0 ? 1 : -1;

    if (!ref.current) return;

    ref.current.rotation.y += scroll.delta * 2 * scrollDirection;
    ref.current.rotation.z -= scroll.delta * 1.3 * -scrollDirection;

    oldOffset.current = scroll.offset;

    camera.position.x = 3 * mouse.x - viewport.left;
    camera.position.y = 3 * mouse.y - viewport.top;

    camera.lookAt(ref.current?.position);
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
