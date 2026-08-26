/* ============================================================
   Gautam Gohel — Portfolio interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMountainBackground();
  initBootSequence();
  initNav();
  initTiltCards();
  initHeroScene();
  initGlitchBursts();
});

/* ---------------- Mountain background ---------------- */

function initMountainBackground() {
  const wrap = document.createElement('div');
  wrap.className = 'mountain-bg';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = `
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <polyline class="contour" points="0,120 140,132 280,118 420,140 560,122 700,138 840,116 980,134 1120,120 1260,136 1440,122" />
      <polyline class="contour" points="0,180 140,192 280,176 420,196 560,180 700,194 840,174 980,192 1120,178 1260,194 1440,180" />

      <polygon class="layer-back" fill="#16202f" stroke="#223049" stroke-width="1"
        points="0,260 120,200 240,240 360,150 480,210 600,170 720,230 840,180 960,220 1080,160 1200,210 1320,180 1440,230 1440,420 0,420" />

      <polygon class="layer-mid" fill="#101722" stroke="#2c4a63" stroke-width="1" stroke-opacity=".6"
        points="0,320 100,250 220,300 340,200 460,270 580,210 700,290 820,230 940,300 1060,220 1180,280 1300,240 1440,300 1440,420 0,420" />

      <polygon class="layer-front" fill="#0b0f16" stroke="#ff8a3d" stroke-width="1.2" stroke-opacity=".4"
        points="0,380 90,300 200,360 320,260 440,340 560,270 680,350 800,280 920,360 1040,270 1160,340 1280,290 1440,350 1440,420 0,420" />

      <circle class="beacon-ring" cx="320" cy="260" r="4" />
      <circle class="beacon-core" cx="320" cy="260" r="2.4" />
      <circle class="beacon-ring" cx="1040" cy="270" r="4" />
      <circle class="beacon-core" cx="1040" cy="270" r="2.4" />
    </svg>
  `;
  document.body.insertBefore(wrap, document.body.firstChild);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const back = wrap.querySelector('.layer-back');
  const mid = wrap.querySelector('.layer-mid');
  const front = wrap.querySelector('.layer-front');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      back.style.transform = `translateY(${y * 0.015}px)`;
      mid.style.transform = `translateY(${y * 0.035}px)`;
      front.style.transform = `translateY(${y * 0.06}px)`;
      ticking = false;
    });
  }, { passive: true });
}

/* ---------------- Boot sequence ---------------- */

function initBootSequence() {
  const overlay = document.getElementById('boot-overlay');
  if (!overlay) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('ops-console-booted');

  if (reduceMotion || seen) {
    overlay.classList.add('hidden');
    return;
  }

  sessionStorage.setItem('ops-console-booted', '1');
  window.setTimeout(() => overlay.classList.add('hidden'), 1500);
}

/* ---------------- Glitch bursts on headings ---------------- */

function initGlitchBursts() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const targets = document.querySelectorAll('.glitch');
  if (!targets.length) return;

  targets.forEach(el => {
    const fire = () => {
      el.classList.add('glitch-burst');
      window.setTimeout(() => el.classList.remove('glitch-burst'), 420);
    };
    // one soft burst shortly after load, then occasional re-triggers
    window.setTimeout(fire, 1800);
    window.setInterval(fire, 7000 + Math.random() * 4000);
  });
}

/* ---------------- Nav ---------------- */

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
  document.querySelectorAll('.side-dots a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path);
  });
}

/* ---------------- 3D tilt cards ---------------- */

function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  cards.forEach(card => {
    let bounds;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const px = (x / bounds.width) - 0.5;
      const py = (y / bounds.height) - 0.5;
      const rotateX = (py * -8).toFixed(2);
      const rotateY = (px * 10).toFixed(2);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ---------------- Hero 3D scene: multi-cloud network ---------------- */

function initHeroScene() {
  const mount = document.getElementById('hero-scene');
  if (!mount || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const width = mount.clientWidth;
  const height = mount.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  // Wireframe sphere = the "cloud" the nodes orbit within
  const sphereGeo = new THREE.SphereGeometry(2.5, 24, 18);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x223049,
    wireframe: true,
    transparent: true,
    opacity: 0.55
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  group.add(sphere);

  // Tilted orbit rings — sci-fi HUD / targeting-array feel
  const ringSpecs = [
    { radius: 3.15, color: 0xff8a3d, tiltX: 1.15, tiltZ: 0.15, opacity: 0.5 },
    { radius: 3.55, color: 0x4cd3c2, tiltX: 0.35, tiltZ: -0.4, opacity: 0.32 },
    { radius: 3.9, color: 0x4cd3c2, tiltX: -0.5, tiltZ: 0.6, opacity: 0.18 }
  ];
  const rings = ringSpecs.map(spec => {
    const ringGeo = new THREE.RingGeometry(spec.radius, spec.radius + 0.012, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: spec.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: spec.opacity
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = spec.tiltX;
    ring.rotation.z = spec.tiltZ;
    group.add(ring);
    return ring;
  });

  // Provider nodes: AWS / Azure / GCP + observability tool satellites
  const providerColor = 0xff8a3d;
  const toolColor = 0x4cd3c2;

  function latLonToVec3(lat, lon, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  const providerNodes = [
    latLonToVec3(35, -20, 2.5),
    latLonToVec3(-15, 90, 2.5),
    latLonToVec3(10, 200, 2.5)
  ];

  const toolNodes = [
    latLonToVec3(60, 40, 2.5),
    latLonToVec3(-45, 140, 2.5),
    latLonToVec3(5, -110, 2.5),
    latLonToVec3(-60, -60, 2.5),
    latLonToVec3(70, -150, 2.5)
  ];

  function addNode(pos, color, size) {
    const geo = new THREE.SphereGeometry(size, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    group.add(mesh);

    const glowGeo = new THREE.SphereGeometry(size * 2.2, 12, 12);
    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.copy(pos);
    group.add(glow);
  }

  providerNodes.forEach(p => addNode(p, providerColor, 0.09));
  toolNodes.forEach(p => addNode(p, toolColor, 0.055));

  // Connection arcs between provider nodes (triangle) and to tool satellites
  function makeArc(a, b, color, opacity) {
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(3.05);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const points = curve.getPoints(40);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.Line(geo, mat);
  }

  for (let i = 0; i < providerNodes.length; i++) {
    for (let j = i + 1; j < providerNodes.length; j++) {
      group.add(makeArc(providerNodes[i], providerNodes[j], 0xff8a3d, 0.4));
    }
  }
  toolNodes.forEach((t, idx) => {
    const nearest = providerNodes[idx % providerNodes.length];
    group.add(makeArc(nearest, t, 0x4cd3c2, 0.22));
  });

  // Outer point field for depth
  const starGeo = new THREE.BufferGeometry();
  const starCount = 140;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = 4.2 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x8b98ac, size: 0.02, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(starGeo, starMat));

  let mouseX = 0, mouseY = 0;
  mount.addEventListener('mousemove', (e) => {
    const b = mount.getBoundingClientRect();
    mouseX = ((e.clientX - b.left) / b.width - 0.5) * 2;
    mouseY = ((e.clientY - b.top) / b.height - 0.5) * 2;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reduceMotion) {
      group.rotation.y = t * 0.18 + mouseX * 0.4;
      group.rotation.x = mouseY * 0.25;
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.0016 * (i % 2 === 0 ? 1 : -1);
      });
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}
