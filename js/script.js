
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
    window.setTimeout(fire, 1800);
    window.setInterval(fire, 7000 + Math.random() * 4000);
  });
}

/* ---------------- Navigation ---------------- */

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
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

/* ---------------- 3D Tilt Cards ---------------- */

function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion) return;

  cards.forEach(card => {
    let bounds;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', e => {
      if (!bounds) bounds = card.getBoundingClientRect();

      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const px = x / bounds.width - 0.5;
      const py = y / bounds.height - 0.5;

      const rotateX = (py * -8).toFixed(2);
      const rotateY = (px * 10).toFixed(2);

      card.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ---------------- Cinematic 3D Cloud Scene ---------------- */

function initHeroScene() {
  const mount = document.getElementById('hero-scene');

  if (!mount || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const width = Math.max(mount.clientWidth, 1);
  const height = Math.max(mount.clientHeight, 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.1,
    100
  );

  camera.position.set(0, 1.2, 10);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
  );

  renderer.setSize(width, height);
  mount.appendChild(renderer.domElement);

  const cloudGroup = new THREE.Group();
  scene.add(cloudGroup);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const light = new THREE.PointLight(0x4cd3c2, 3, 20);
  light.position.set(0, 3, 5);
  scene.add(light);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.7, 2),
    new THREE.MeshPhongMaterial({
      color: 0x4cd3c2,
      emissive: 0x12665e,
      shininess: 100,
      flatShading: true
    })
  );

  core.position.y = 0.3;
  cloudGroup.add(core);

  const racks = [];

  function createServerRack(x, color) {
    const rack = new THREE.Group();

    const cabinet = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 2.2, 0.8),
      new THREE.MeshPhongMaterial({
        color: 0x172333,
        specular: 0x445566
      })
    );

    rack.add(cabinet);

    for (let i = 0; i < 6; i++) {
      const server = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.22, 0.84),
        new THREE.MeshPhongMaterial({
          color: 0x25364b
        })
      );

      server.position.y = -0.83 + i * 0.33;
      rack.add(server);

      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 8),
        new THREE.MeshBasicMaterial({ color })
      );

      led.position.set(
        0.34,
        server.position.y,
        0.45
      );

      rack.add(led);
    }

    rack.position.set(x, -0.2, 0);
    cloudGroup.add(rack);
    racks.push(rack);

    return rack;
  }

  createServerRack(-2.5, 0xff9900); // AWS
  createServerRack(0, 0x00a4ef);    // Azure
  createServerRack(2.5, 0x34a853);  // GCP

  /* ----- Network connections ----- */

  const connections = [];
  const packets = [];

  const rackPositions = [
    new THREE.Vector3(-2.5, 0.5, 0),
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(2.5, 0.5, 0)
  ];

  function addConnection(start, end, color) {
    const middle = start.clone()
      .add(end)
      .multiplyScalar(0.5);

    middle.y += 1.2;

    const curve = new THREE.QuadraticBezierCurve3(
      start,
      middle,
      end
    );

    const geometry = new THREE.BufferGeometry()
      .setFromPoints(curve.getPoints(60));

    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.75
    });

    const line = new THREE.Line(geometry, material);
    cloudGroup.add(line);

    connections.push(curve);

    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      new THREE.MeshBasicMaterial({ color: color })
    );

    cloudGroup.add(packet);

    packets.push({
      mesh: packet,
      curve: curve,
      offset: Math.random()
    });
  }

  addConnection(
    rackPositions[0],
    rackPositions[1],
    0xff9900
  );

  addConnection(
    rackPositions[1],
    rackPositions[2],
    0x00a4ef
  );

  addConnection(
    rackPositions[0],
    rackPositions[2],
    0x4cd3c2
  );

  /* ----- Background stars ----- */

  const starCount = 180;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 14;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(starPositions, 3)
  );

  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0x8bdaef,
      size: 0.035,
      transparent: true,
      opacity: 0.7
    })
  );

  scene.add(stars);

  /* ----- Mouse movement ----- */

  let mouseX = 0;
  let mouseY = 0;

  mount.addEventListener('mousemove', event => {
    const rect = mount.getBoundingClientRect();

    mouseX = (
      (event.clientX - rect.left) / rect.width - 0.5
    ) * 2;

    mouseY = (
      (event.clientY - rect.top) / rect.height - 0.5
    ) * 2;
  });

  /* ----- Animation loop ----- */

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    if (!reduceMotion) {
      cloudGroup.rotation.y =
        Math.sin(time * 0.2) * 0.12 + mouseX * 0.18;

      cloudGroup.rotation.x = mouseY * 0.1;

      core.rotation.x += 0.006;
      core.rotation.y += 0.009;

      core.position.y =
        0.3 + Math.sin(time * 1.5) * 0.12;

      racks.forEach((rack, index) => {
        rack.rotation.y =
          Math.sin(time * 0.5 + index) * 0.08;
      });
    }

    packets.forEach(packet => {
      const progress = reduceMotion
        ? packet.offset
        : (time * 0.18 + packet.offset) % 1;

      packet.mesh.position.copy(
        packet.curve.getPoint(progress)
      );
    });

    renderer.render(scene, camera);
  }

  animate();

  /* ----- Responsive resize ----- */

  window.addEventListener('resize', () => {
    const w = Math.max(mount.clientWidth, 1);
    const h = Math.max(mount.clientHeight, 1);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
  });

} // End of initHeroScene
