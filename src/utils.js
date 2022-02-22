import * as THREE from "three";

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getCubeGeometry = (sideLenght) =>
  new THREE.BoxGeometry(sideLenght, sideLenght, sideLenght);

export const getSphereGeometry = (radius) => {
  const widthSegments = 24;
  const heightSegments = 16;
  return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
};

export const getTorusGeometry = (torusRadius, tubeRadius) => {
  const radialSegments = 16;
  const tubularSegments = 48;
  return new THREE.TorusGeometry(
    torusRadius,
    tubeRadius,
    radialSegments,
    tubularSegments
  );
};
