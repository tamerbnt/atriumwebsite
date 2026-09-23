import * as THREE from 'three';

/**
 * Generates an ultra-lightweight studio environment map using PMREMGenerator.
 * Fully offline, 0 KB network payload, pre-baked specular reflections.
 */
export function createBakedEnvironmentTexture(renderer: THREE.WebGLRenderer): THREE.Texture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  // Dark studio base gradient (neutral charcoal with optical depth)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#0e1014');
  bgGrad.addColorStop(0.35, '#171a21');
  bgGrad.addColorStop(0.7, '#1f242e');
  bgGrad.addColorStop(1, '#090a0d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // High-intensity overhead studio softbox (generates crisp, elongated anisotropic specular highlights)
  const softbox = ctx.createLinearGradient(width * 0.25, 0, width * 0.75, 0);
  softbox.addColorStop(0, 'rgba(255, 255, 255, 0)');
  softbox.addColorStop(0.2, 'rgba(240, 245, 255, 0.6)');
  softbox.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  softbox.addColorStop(0.8, 'rgba(240, 245, 255, 0.6)');
  softbox.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = softbox;
  ctx.fillRect(width * 0.2, height * 0.15, width * 0.6, height * 0.22);

  // Primary circular spotlight highlight
  const keyLight = ctx.createRadialGradient(
    width * 0.52,
    height * 0.26,
    4,
    width * 0.52,
    height * 0.26,
    90
  );
  keyLight.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  keyLight.addColorStop(0.25, 'rgba(230, 240, 255, 0.85)');
  keyLight.addColorStop(0.65, 'rgba(160, 185, 220, 0.35)');
  keyLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = keyLight;
  ctx.beginPath();
  ctx.arc(width * 0.52, height * 0.26, 90, 0, Math.PI * 2);
  ctx.fill();

  // Lateral rim strip (Apple-grade edge glint on rounded corners)
  const edgeStrip = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.75);
  edgeStrip.addColorStop(0, 'rgba(215, 235, 255, 0)');
  edgeStrip.addColorStop(0.5, 'rgba(235, 245, 255, 0.9)');
  edgeStrip.addColorStop(1, 'rgba(215, 235, 255, 0)');
  ctx.fillStyle = edgeStrip;
  ctx.fillRect(width * 0.88, height * 0.35, width * 0.08, height * 0.4);

  // Soft secondary rim light (cool silver-blue contrast fill)
  const rimLight = ctx.createRadialGradient(
    width * 0.14,
    height * 0.48,
    3,
    width * 0.14,
    height * 0.48,
    75
  );
  rimLight.addColorStop(0, 'rgba(225, 240, 255, 0.9)');
  rimLight.addColorStop(0.45, 'rgba(140, 175, 220, 0.4)');
  rimLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = rimLight;
  ctx.beginPath();
  ctx.arc(width * 0.14, height * 0.48, 75, 0, Math.PI * 2);
  ctx.fill();

  // Warm terracotta ground reflection (delicately bounces off the bottom rounded bevels of the cubes)
  const terracottaGlow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.82,
    8,
    width * 0.5,
    height * 0.82,
    140
  );
  terracottaGlow.addColorStop(0, 'rgba(224, 107, 72, 0.95)');
  terracottaGlow.addColorStop(0.35, 'rgba(184, 84, 56, 0.6)');
  terracottaGlow.addColorStop(0.7, 'rgba(110, 40, 24, 0.2)');
  terracottaGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = terracottaGlow;
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.82, 140, 0, Math.PI * 2);
  ctx.fill();

  const canvasTexture = new THREE.CanvasTexture(canvas);
  canvasTexture.mapping = THREE.EquirectangularReflectionMapping;

  try {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const renderTarget = pmremGenerator.fromEquirectangular(canvasTexture);
    canvasTexture.dispose();
    pmremGenerator.dispose();
    return renderTarget.texture;
  } catch (err) {
    console.warn('PMREM environment generation fallback', err);
    return canvasTexture;
  }
}

/**
 * Generates a pre-baked blurred contact shadow texture for a cube.
 * Completely eliminates the need for dynamic shadow maps and shadow passes.
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, size, size);

  // Soft blurred rounded contact shadow
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.08,
    size / 2,
    size / 2,
    size * 0.48
  );
  grad.addColorStop(0, 'rgba(20, 10, 8, 0.65)');
  grad.addColorStop(0.4, 'rgba(25, 12, 10, 0.40)');
  grad.addColorStop(0.7, 'rgba(30, 15, 12, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates micro-scratches/brushed anisotropic texture map for brushed aluminum.
 */
export function createBrushedMetalTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base neutral 50% gray for height / bump
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Micro-grain noise pass (gives genuine bead-blasted satin texture)
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 16;
    data[i] = Math.min(255, Math.max(0, 128 + grain));
    data[i + 1] = Math.min(255, Math.max(0, 128 + grain));
    data[i + 2] = Math.min(255, Math.max(0, 128 + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // High-density fine horizontal anisotropic brushing lines
  for (let i = 0; i < 900; i++) {
    const y = Math.random() * size;
    const alpha = 0.02 + Math.random() * 0.055;
    const isBright = Math.random() > 0.45;
    const shade = isBright ? 210 + Math.floor(Math.random() * 45) : 50 + Math.floor(Math.random() * 40);
    ctx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
    ctx.lineWidth = 0.4 + Math.random() * 0.8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

/**
 * Generates a refined circular terracotta gradient texture for the small floating flat space.
 * Features an intense warm terracotta center fading softly to dark charcoal and transparent edge.
 */
export function createSmallTerracottaGradientTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Clear transparent canvas
  ctx.clearRect(0, 0, width, height);

  // Radial terracotta gradient from bright terracotta core to dark edge
  const grad = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    5,
    width * 0.5,
    height * 0.5,
    width * 0.45
  );
  grad.addColorStop(0, 'rgba(224, 107, 72, 0.95)'); // Luminous warm terracotta core
  grad.addColorStop(0.28, 'rgba(184, 84, 56, 0.85)'); // Signature Atrium terracotta
  grad.addColorStop(0.60, 'rgba(120, 42, 24, 0.55)'); // Deep roasted terracotta
  grad.addColorStop(0.82, 'rgba(35, 15, 12, 0.20)'); // Soft dark edge
  grad.addColorStop(0.95, 'rgba(0, 0, 0, 0)'); // Clean fade to outer black
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.5, width * 0.5, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Generates an atmospheric deep space terracotta gradient texture.
 * Transitions from deep obsidian black into an incandescent terracotta cosmic aura.
 */
export function createSpaceTerracottaGradientTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base deep obsidian space
  ctx.fillStyle = '#06070a';
  ctx.fillRect(0, 0, width, height);

  // Radiant terracotta atmospheric nebula glow located lower-right/center
  const grad = ctx.createRadialGradient(
    width * 0.62,
    height * 0.68,
    15,
    width * 0.58,
    height * 0.62,
    width * 0.72
  );
  grad.addColorStop(0, 'rgba(224, 107, 72, 0.85)'); // Warm glowing core
  grad.addColorStop(0.22, 'rgba(184, 84, 56, 0.75)'); // Vibrant signature terracotta
  grad.addColorStop(0.48, 'rgba(112, 38, 22, 0.45)'); // Deep roasted terracotta
  grad.addColorStop(0.72, 'rgba(32, 14, 12, 0.25)'); // Cosmic dusk
  grad.addColorStop(1, 'rgba(6, 7, 10, 0)'); // Fades into pure obsidian void

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle floating stellar dust motes
  ctx.fillStyle = 'rgba(255, 230, 220, 0.65)';
  for (let i = 0; i < 75; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 1.1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Generates an optical eye lens texture with a radial gradient emissive falloff.
 * Features an intense hot terracotta/coral core fading into darker saturated edges.
 */
export function createEyeGlowTexture(): THREE.CanvasTexture {
  const width = 256;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Smooth dark base
  ctx.fillStyle = '#140402';
  ctx.fillRect(0, 0, width, height);

  // Elliptical radial gradient for rectangular rounded lens
  ctx.save();
  ctx.scale(1.0, 0.5);

  const grad = ctx.createRadialGradient(
    width * 0.5,
    height,
    4,
    width * 0.5,
    height,
    width * 0.48
  );

  // Hot core to dimmer rim falloff
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.20, '#ff8a65');
  grad.addColorStop(0.55, '#ff5024');
  grad.addColorStop(0.85, '#9e2a10');
  grad.addColorStop(1.0, '#1a0502');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(width * 0.5, height, width * 0.48, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

