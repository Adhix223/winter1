// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#winterCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0xccccff, 1);
scene.add(ambientLight);

// Snow Particle System
const snowGeometry = new THREE.BufferGeometry();
const snowCount = 1000;
const positions = [];

for (let i = 0; i < snowCount; i++) {
  positions.push((Math.random() - 0.5) * 100); // X
  positions.push(Math.random() * 100);        // Y
  positions.push((Math.random() - 0.5) * 100); // Z
}

snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const snowMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.5,
  transparent: true,
  opacity: 0.8,
});

const snow = new THREE.Points(snowGeometry, snowMaterial);
scene.add(snow);

// Camera Position
camera.position.z = 50;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Snowfall Effect
  const positions = snowGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] -= 0.2; // Move snow down
    if (positions[i + 1] < -50) {
      positions[i + 1] = 100; // Reset snow position
    }
  }
  snowGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

animate();

// Adjust Canvas on Resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
