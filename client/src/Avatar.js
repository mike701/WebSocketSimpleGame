import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PerspectiveCamera, useFBX, useGLTF} from "@react-three/drei";
export default function Avatar(props) {
 const [avatar,setAvatar] = useState(props.position);
const keys={KeyW: [0,0,2], KeyS: [0,0,-2], KeyA:[2,0,0], KeyD:[-2,0,0]}
const moveFieldByKey = (key) => keys[key];

useEffect(() => {
  const handleKeyDown = (e) => {
    let temp = avatar.map((m, i) => {
      console.log(moveFieldByKey(e.code)[i], parseInt(moveFieldByKey(e.code)[i]),m);
      return m + parseInt(moveFieldByKey(e.code)[i])
    });
    console.log(temp);
    setAvatar(temp);
  };
  const handleKeyUp = (e) => { console.log(avatar) };
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    // window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  }
}, [avatar])

  const { nodes, scene } = useGLTF("./scene.gltf");
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  const ref=useRef(nodes);
  return <PerspectiveCamera lookAt={ref}>
  <group rotation={[0, 0, 0]} scale={[10, 10, 10]} position={avatar}>
    <primitive object={scene} />
  </group>
  </PerspectiveCamera>
}

useGLTF.preload("/scene.gltf")
useFBX.preload("/HipHopDancing(1).fbx")