import * as THREE from "three";
import {
  getRandomNumber,
  getCubeGeometry,
  getSphereGeometry,
  getTorusGeometry,
} from "./utils";

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;
const far = 300;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 50;

const MAX_Z = 50;
const MIN_Z = -250;

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(1, 2, 6);
scene.add(directionalLight);

const background = textureLoader.load("/images/space.jpg");
scene.background = background;

const makeMesh = (geometry, color, texturePath, offset) => {
  const texture = texturePath ? textureLoader.load(texturePath) : undefined;
  const material = new THREE.MeshPhongMaterial({
    color: color || 0xffffff,
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const x = getRandomNumber(-60, 60);
  const y = getRandomNumber(-40, 40);
  const z = MIN_Z - offset;
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  return {
    mesh,
    move: {
      x: x * 0.001,
      y: y * 0.001,
      z: z * -0.001,
    },
  };
};

const objects = [
  makeMesh(getCubeGeometry(12), undefined, "/images/wood.jpg", 40),
  makeMesh(getTorusGeometry(7, 4), undefined, "/images/donut1.png", 70),
  makeMesh(getCubeGeometry(10), undefined, "/images/wall.jpg", 150),
  makeMesh(getSphereGeometry(5), undefined, "/images/eye_0001_c.jpg", 190),
  makeMesh(getCubeGeometry(10), undefined, "/images/spangeBob.jpg", 230),
  makeMesh(getCubeGeometry(10), undefined, "/images/doge_glasses.jpg", 270),
  makeMesh(getSphereGeometry(5), undefined, "/images/textil5.jpg", 300),
  makeMesh(getTorusGeometry(7, 4), undefined, "/images/donut2.png", 330),
  makeMesh(getCubeGeometry(10), undefined, "/images/doge.jpg", 400),
  makeMesh(getCubeGeometry(10), 0xbf1304, undefined, 440),
];

const needsResize = () => {
  const canvas = renderer.domElement;
  return (
    canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight
  );
};

const render = () => {
  if (needsResize()) {
    const canvas = renderer.domElement;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  objects.forEach(({ mesh, move }) => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y -= 0.005;
    mesh.rotation.z += 0.01;
    mesh.position.x += move.x;
    mesh.position.y += move.y;
    mesh.position.z += move.z;

    if (mesh.position.z >= MAX_Z) {
      mesh.position.z = MIN_Z;
      mesh.position.x = getRandomNumber(-60, 60);
      mesh.position.y = getRandomNumber(-40, 40);
    }
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
