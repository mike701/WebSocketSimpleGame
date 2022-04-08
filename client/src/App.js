import logo from './logo.svg';
import './App.css';
import Environment from './Environment';
import { Suspense } from 'react';
import React, { useLayoutEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { PointerLockControls, Sky, Text, useFBX, useGLTF, useNormalTexture} from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import { Physics } from '@react-three/cannon';
import * as THREE from "three";
function App() {
  return (
    <div className="App">
      <>
          <div/>
          <Suspense fallback={<h1>Hello</h1>} style={{ position: "absolute", top: "0vh" }}>
          <Environment></Environment>
          </Suspense>
        </>
    </div>
  );
}

export default App;
