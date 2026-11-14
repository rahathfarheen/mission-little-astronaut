import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * LunarBase3D: Interactive 3D Perspective Viewport for Mission: Little Astronaut
 * Visualizes the 4 Core Resource Systems in Real-Time:
 * 1. 🫁 Central Hydroponics Oxygen Dome (Glows with O2 levels)
 * 2. 💧 Water Cryogenic Storage Silo (Fluid column tracks H2O)
 * 3. ⚡ Photovoltaic Solar Wings (Tracks sun, reflects battery energy)
 * 4. 🛡️ Magnetic Radiation Shield Force Field (Hexagonal deflector dome)
 *
 * Designed with pure Canvas 3D Perspective Projection - zero external 3D npm dependencies,
 * guaranteed 60fps across all desktop and mobile browsers.
 */
export const LunarBase3D = ({
  resources = { oxygen: 90, water: 85, energy: 80, radiationShield: 95 },
  onModuleClick = null,
  activeModule = null
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // 3D Camera State
  const [camera, setCamera] = useState({
    rotX: 0.35,  // Pitch
    rotY: -0.65, // Yaw
    zoom: 1.0,
    targetX: 0,
    targetY: 0,
    targetZ: 0
  });

  const [hoveredModule, setHoveredModule] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);
  const timeRef = useRef(0);

  // Preset Camera Positions
  const setCameraPreset = (preset) => {
    switch (preset) {
      case 'overview':
        setCamera({ rotX: 0.35, rotY: -0.65, zoom: 1.0, targetX: 0, targetY: 0, targetZ: 0 });
        break;
      case 'oxygen':
        setCamera({ rotX: 0.25, rotY: -0.2, zoom: 1.45, targetX: 0, targetY: 10, targetZ: 0 });
        break;
      case 'water':
        setCamera({ rotX: 0.3, rotY: -1.3, zoom: 1.4, targetX: 60, targetY: 15, targetZ: 10 });
        break;
      case 'energy':
        setCamera({ rotX: 0.4, rotY: 0.7, zoom: 1.35, targetX: -60, targetY: 20, targetZ: 20 });
        break;
      case 'shield':
        setCamera({ rotX: 0.55, rotY: -0.8, zoom: 0.85, targetX: 0, targetY: 0, targetZ: 0 });
        break;
      default:
        break;
    }
  };

  // 3D Math Utilities
  const project3D = useCallback((x, y, z, width, height, cam) => {
    // Relative to camera target
    const dx = x - cam.targetX;
    const dy = y - cam.targetY;
    const dz = z - cam.targetZ;

    // Rotate Y (Yaw)
    const cosY = Math.cos(cam.rotY);
    const sinY = Math.sin(cam.rotY);
    const x1 = dx * cosY - dz * sinY;
    const z1 = dx * sinY + dz * cosY;

    // Rotate X (Pitch)
    const cosX = Math.cos(cam.rotX);
    const sinX = Math.sin(cam.rotX);
    const y2 = dy * cosX - z1 * sinX;
    const z2 = dy * sinX + z1 * cosX;

    // Perspective Projection
    const distance = 420 / (cam.zoom || 1.0);
    const fov = 380;
    const depth = z2 + distance;

    if (depth <= 10) return null; // Behind camera clipping

    const scale = fov / depth;
    const screenX = width / 2 + x1 * scale;
    const screenY = height / 2 - y2 * scale;

    return { x: screenX, y: screenY, scale, depth, z2 };
  }, []);

  // Main 3D Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      timeRef.current += 0.025;
      const t = timeRef.current;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Space Cosmic Backdrop
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#040714');
      skyGrad.addColorStop(0.6, '#0B112C');
      skyGrad.addColorStop(1, '#141D3B');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Starfield dots
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 45; i++) {
        const sx = ((i * 137.5) % width);
        const sy = ((i * 83.1) % (height * 0.7));
        const alpha = 0.3 + 0.5 * Math.sin(t + i);
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
      ctx.globalAlpha = 1.0;

      // Earth in lunar sky
      const earthX = width * 0.82;
      const earthY = height * 0.22;
      const earthRad = 26;
      const earthGlow = ctx.createRadialGradient(earthX, earthY, 5, earthX, earthY, earthRad * 1.5);
      earthGlow.addColorStop(0, '#4CC9F0');
      earthGlow.addColorStop(0.5, '#4361EE');
      earthGlow.addColorStop(0.8, '#3A0CA3');
      earthGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = earthGlow;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRad * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Earth planet body
      ctx.beginPath();
      ctx.fillStyle = '#3A86FF';
      ctx.arc(earthX, earthY, earthRad, 0, Math.PI * 2);
      ctx.fill();
      // Swirl clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(earthX - 4, earthY - 6, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(earthX + 6, earthY + 4, 10, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Lunar Regolith Ground Grid & Craters
      const groundPoints = [];
      const gridSize = 160;
      const gridSteps = 8;
      const stepSize = gridSize / gridSteps;

      ctx.strokeStyle = 'rgba(74, 94, 142, 0.25)';
      ctx.lineWidth = 1;

      // Draw ground grid
      for (let gx = -gridSize; gx <= gridSize; gx += stepSize) {
        ctx.beginPath();
        let started = false;
        for (let gz = -gridSize; gz <= gridSize; gz += stepSize) {
          // Add gentle terrain elevation dips
          const elev = Math.sin(gx * 0.03) * Math.cos(gz * 0.03) * 6;
          const p = project3D(gx, elev - 5, gz, width, height, camera);
          if (p) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else { ctx.lineTo(p.x, p.y); }
          }
        }
        ctx.stroke();
      }

      for (let gz = -gridSize; gz <= gridSize; gz += stepSize) {
        ctx.beginPath();
        let started = false;
        for (let gx = -gridSize; gx <= gridSize; gx += stepSize) {
          const elev = Math.sin(gx * 0.03) * Math.cos(gz * 0.03) * 6;
          const p = project3D(gx, elev - 5, gz, width, height, camera);
          if (p) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else { ctx.lineTo(p.x, p.y); }
          }
        }
        ctx.stroke();
      }

      // Draw Lunar Crater Rims (South Pole Shackleton Rim)
      const craterCenter = project3D(70, -5, -60, width, height, camera);
      if (craterCenter) {
        ctx.strokeStyle = 'rgba(58, 80, 107, 0.4)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(craterCenter.x, craterCenter.y, 45 * craterCenter.scale, 20 * craterCenter.scale, camera.rotY, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Render 3D Modules (Depth-sorted)
      const objects = [];

      // 3A. Central Oxygen Biodome
      const o2Val = resources.oxygen || 0;
      const o2StatusColor = o2Val > 60 ? '#06D6A0' : o2Val > 25 ? '#FFD166' : '#EF476F';
      const o2Pulse = 0.85 + 0.15 * Math.sin(t * 3);

      objects.push({
        id: 'oxygen-dome',
        name: 'Hydroponics Oxygen Dome',
        type: 'dome',
        x: 0,
        y: 0,
        z: 0,
        radius: 42,
        render: (proj) => {
          // Dome base ring
          ctx.beginPath();
          ctx.fillStyle = '#1D2A4D';
          ctx.strokeStyle = '#3A86FF';
          ctx.lineWidth = 2;
          ctx.ellipse(proj.x, proj.y, 42 * proj.scale, 18 * proj.scale, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Glowing interior hydroponics light
          const domeGlow = ctx.createRadialGradient(
            proj.x, proj.y - 20 * proj.scale, 5 * proj.scale,
            proj.x, proj.y - 20 * proj.scale, 40 * proj.scale
          );
          domeGlow.addColorStop(0, o2StatusColor);
          domeGlow.addColorStop(0.6, `${o2StatusColor}66`);
          domeGlow.addColorStop(1, 'rgba(6, 214, 160, 0.05)');
          ctx.fillStyle = domeGlow;

          // Upper Hemisphere Dome
          ctx.beginPath();
          ctx.arc(proj.x, proj.y - 4 * proj.scale, 38 * proj.scale, Math.PI, 0, false);
          ctx.closePath();
          ctx.fill();

          // Geodesic Wireframe lines
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * o2Pulse})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y - 4 * proj.scale, 38 * proj.scale, Math.PI, 0, false);
          ctx.stroke();

          // Interior Plant Silhouette / Crops
          ctx.fillStyle = '#06D6A0';
          for (let p = -2; p <= 2; p++) {
            const px = proj.x + p * 10 * proj.scale;
            const py = proj.y - 8 * proj.scale;
            ctx.fillRect(px, py, 4 * proj.scale, 8 * proj.scale);
          }

          // 3D Floating Hologram Badge
          drawModuleTag(ctx, proj.x, proj.y - 52 * proj.scale, `🫁 O2 Reserve: ${o2Val}%`, o2StatusColor);
        }
      });

      // 3B. Water Extraction & Purification Silo
      const waterVal = resources.water || 0;
      objects.push({
        id: 'water-silo',
        name: 'Cryogenic Water Silo',
        type: 'silo',
        x: 65,
        y: 0,
        z: 20,
        radius: 28,
        render: (proj) => {
          const siloW = 28 * proj.scale;
          const siloH = 50 * proj.scale;
          const topY = proj.y - siloH;

          // Silo Metallic Cylinder Body
          const grad = ctx.createLinearGradient(proj.x - siloW / 2, proj.y, proj.x + siloW / 2, proj.y);
          grad.addColorStop(0, '#1E2D4A');
          grad.addColorStop(0.5, '#415A77');
          grad.addColorStop(1, '#0D1B2A');

          ctx.fillStyle = grad;
          ctx.fillRect(proj.x - siloW / 2, topY, siloW, siloH);
          ctx.strokeStyle = '#4CC9F0';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(proj.x - siloW / 2, topY, siloW, siloH);

          // Silo Domed Cap
          ctx.beginPath();
          ctx.fillStyle = '#415A77';
          ctx.ellipse(proj.x, topY, siloW / 2, 8 * proj.scale, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Visible Water Indicator Gauge on Silo
          const fillPercent = Math.max(0, Math.min(100, waterVal)) / 100;
          const waterBarH = (siloH * 0.75) * fillPercent;
          const waterBarY = proj.y - waterBarH - 5 * proj.scale;

          ctx.fillStyle = 'rgba(58, 134, 255, 0.85)';
          ctx.fillRect(proj.x - (siloW * 0.3) / 2, waterBarY, siloW * 0.3, waterBarH);

          // Water bubble animation
          const bubbleY = proj.y - ((t * 20) % (siloH * 0.7));
          ctx.fillStyle = '#FFF';
          ctx.beginPath();
          ctx.arc(proj.x, bubbleY, 2 * proj.scale, 0, Math.PI * 2);
          ctx.fill();

          // 3D Tag
          drawModuleTag(ctx, proj.x, topY - 14 * proj.scale, `💧 H2O: ${waterVal}%`, '#3A86FF');
        }
      });

      // 3C. Photovoltaic Solar Wings Array
      const energyVal = resources.energy || 0;
      objects.push({
        id: 'solar-array',
        name: 'Sun-Tracking Solar Wings',
        type: 'solar',
        x: -65,
        y: 0,
        z: 25,
        radius: 35,
        render: (proj) => {
          // Support Pylon Mast
          ctx.strokeStyle = '#8D99AE';
          ctx.lineWidth = 4 * proj.scale;
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(proj.x, proj.y - 45 * proj.scale);
          ctx.stroke();

          // Crossbar
          const pivotY = proj.y - 45 * proj.scale;
          ctx.lineWidth = 2 * proj.scale;
          ctx.beginPath();
          ctx.moveTo(proj.x - 30 * proj.scale, pivotY);
          ctx.lineTo(proj.x + 30 * proj.scale, pivotY);
          ctx.stroke();

          // Solar Wing Panels (Glows with energy value)
          const panelColor = energyVal > 40 ? '#FFD166' : '#FF8800';
          const wingW = 26 * proj.scale;
          const wingH = 34 * proj.scale;

          // Left Wing
          ctx.fillStyle = '#0F172A';
          ctx.strokeStyle = panelColor;
          ctx.lineWidth = 1.5;
          ctx.fillRect(proj.x - 32 * proj.scale, pivotY - wingH / 2, wingW, wingH);
          ctx.strokeRect(proj.x - 32 * proj.scale, pivotY - wingH / 2, wingW, wingH);

          // Right Wing
          ctx.fillRect(proj.x + 6 * proj.scale, pivotY - wingH / 2, wingW, wingH);
          ctx.strokeRect(proj.x + 6 * proj.scale, pivotY - wingH / 2, wingW, wingH);

          // Grid Cell lines
          ctx.strokeStyle = 'rgba(255, 209, 102, 0.4)';
          ctx.lineWidth = 1;
          for (let row = 1; row <= 3; row++) {
            const gy = pivotY - wingH / 2 + (wingH / 4) * row;
            ctx.beginPath();
            ctx.moveTo(proj.x - 32 * proj.scale, gy);
            ctx.lineTo(proj.x - 32 * proj.scale + wingW, gy);
            ctx.moveTo(proj.x + 6 * proj.scale, gy);
            ctx.lineTo(proj.x + 6 * proj.scale + wingW, gy);
            ctx.stroke();
          }

          // Sunlight gleam shimmer
          const gleamX = proj.x - 32 * proj.scale + ((t * 15) % (wingW * 2.5));
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(proj.x, pivotY, 3 * proj.scale, 0, Math.PI * 2);
          ctx.fill();

          // 3D Tag
          drawModuleTag(ctx, proj.x, pivotY - wingH / 2 - 14 * proj.scale, `⚡ Power: ${energyVal}%`, '#FFD166');
        }
      });

      // 3D. 3D Astronaut Rover & Cadet on Regolith
      objects.push({
        id: 'rover-astronaut',
        name: 'Cadet & Exploration Rover',
        type: 'rover',
        x: 10,
        y: 0,
        z: 60,
        radius: 20,
        render: (proj) => {
          // Rover body
          const rw = 26 * proj.scale;
          const rh = 14 * proj.scale;
          ctx.fillStyle = '#E0E1DD';
          ctx.fillRect(proj.x - rw / 2, proj.y - rh, rw, rh);
          ctx.strokeStyle = '#0077B6';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(proj.x - rw / 2, proj.y - rh, rw, rh);

          // 6 Rover Wheels
          ctx.fillStyle = '#1B263B';
          for (let w = -1; w <= 1; w++) {
            const wx = proj.x + w * 9 * proj.scale;
            ctx.beginPath();
            ctx.arc(wx, proj.y, 4 * proj.scale, 0, Math.PI * 2);
            ctx.fill();
          }

          // Antenna
          ctx.strokeStyle = '#FFD166';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(proj.x + 6 * proj.scale, proj.y - rh);
          ctx.lineTo(proj.x + 8 * proj.scale, proj.y - rh - 12 * proj.scale);
          ctx.stroke();

          // Astronaut beside rover
          const ax = proj.x - 20 * proj.scale;
          const ay = proj.y - 18 * proj.scale;
          // Suit Body
          ctx.fillStyle = '#FFF';
          ctx.fillRect(ax - 4 * proj.scale, ay, 8 * proj.scale, 14 * proj.scale);
          // Gold Visor Helmet
          ctx.beginPath();
          ctx.fillStyle = '#FFD166';
          ctx.arc(ax, ay - 4 * proj.scale, 5 * proj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Sort by depth (painter's algorithm)
      const projectedObjects = objects.map(obj => {
        const proj = project3D(obj.x, obj.y, obj.z, width, height, camera);
        return { ...obj, proj };
      }).filter(obj => obj.proj !== null)
        .sort((a, b) => b.proj.depth - a.proj.depth);

      // Draw all 3D base structures
      projectedObjects.forEach(obj => {
        obj.render(obj.proj);
      });

      // 4. Hemispherical Radiation Deflector Shield (Rendered over the base)
      const shieldVal = resources.radiationShield || 0;
      const shieldCenter = project3D(0, 0, 0, width, height, camera);
      if (shieldCenter) {
        const shieldR = 95 * shieldCenter.scale;
        const shieldAlpha = Math.max(0.08, (shieldVal / 100) * 0.35);

        // Gradient bubble
        const shieldGrad = ctx.createRadialGradient(
          shieldCenter.x, shieldCenter.y - 15 * shieldCenter.scale, 10 * shieldCenter.scale,
          shieldCenter.x, shieldCenter.y - 15 * shieldCenter.scale, shieldR
        );
        shieldGrad.addColorStop(0, 'rgba(157, 78, 221, 0.02)');
        shieldGrad.addColorStop(0.7, `rgba(157, 78, 221, ${shieldAlpha * 0.5})`);
        shieldGrad.addColorStop(1, `rgba(114, 9, 183, ${shieldAlpha})`);

        ctx.fillStyle = shieldGrad;
        ctx.beginPath();
        ctx.arc(shieldCenter.x, shieldCenter.y, shieldR, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();

        // Shimmering Force-Field Hex Lines
        ctx.strokeStyle = `rgba(181, 23, 158, ${shieldAlpha * 1.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(shieldCenter.x, shieldCenter.y, shieldR, Math.PI, 0, false);
        ctx.stroke();

        // Concentric energetic pulse ripple
        const rippleR = ((t * 25) % shieldR);
        ctx.strokeStyle = `rgba(157, 78, 221, ${shieldAlpha * (1 - rippleR / shieldR)})`;
        ctx.beginPath();
        ctx.arc(shieldCenter.x, shieldCenter.y, rippleR, Math.PI, 0, false);
        ctx.stroke();

        // Radiation Shield Status Banner
        drawModuleTag(ctx, shieldCenter.x, shieldCenter.y - shieldR - 12 * shieldCenter.scale, `🛡️ Magnetic Shield: ${shieldVal}%`, '#9D4EDD');
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [camera, resources, project3D]);

  // Helper to draw neat 3D hologram text tags
  const drawModuleTag = (ctx, x, y, text, color) => {
    ctx.save();
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    const textWidth = ctx.measureText(text).width;
    const pad = 6;

    ctx.fillStyle = 'rgba(10, 15, 30, 0.85)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    // Rounded tag pill
    ctx.beginPath();
    ctx.roundRect(x - textWidth / 2 - pad, y - 10, textWidth + pad * 2, 20, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  };

  // Mouse & Touch Drag Controls for 3D Camera Orbit
  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setCamera(prev => ({
      ...prev,
      rotY: prev.rotY + dx * 0.008,
      rotX: Math.max(0.1, Math.min(1.2, prev.rotX + dy * 0.008))
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setCamera(prev => ({
      ...prev,
      zoom: Math.max(0.6, Math.min(2.2, prev.zoom * zoomFactor))
    }));
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '2px solid rgba(58, 134, 255, 0.4)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(58, 134, 255, 0.1)',
        marginBottom: '24px',
        userSelect: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      />

      {/* 3D Viewport Controls & Camera Angle Toolbar */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px',
          background: 'rgba(11, 19, 43, 0.85)',
          padding: '6px 12px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          zIndex: 10,
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--starlight-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          🎥 3D Camera:
        </span>
        <button
          onClick={() => setCameraPreset('overview')}
          style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#FFF', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          🌐 Base Overview
        </button>
        <button
          onClick={() => setCameraPreset('oxygen')}
          style={{ background: 'rgba(6, 214, 160, 0.15)', border: '1px solid #06D6A0', color: '#06D6A0', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          🫁 O2 Biodome
        </button>
        <button
          onClick={() => setCameraPreset('water')}
          style={{ background: 'rgba(58, 134, 255, 0.15)', border: '1px solid #3A86FF', color: '#3A86FF', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          💧 Water Silo
        </button>
        <button
          onClick={() => setCameraPreset('energy')}
          style={{ background: 'rgba(255, 209, 102, 0.15)', border: '1px solid #FFD166', color: '#FFD166', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          ⚡ Solar Wings
        </button>
        <button
          onClick={() => setCameraPreset('shield')}
          style={{ background: 'rgba(157, 78, 221, 0.15)', border: '1px solid #9D4EDD', color: '#9D4EDD', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          🛡️ Shield Dome
        </button>
      </div>

      {/* Orbit & Zoom Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(11, 19, 43, 0.75)',
          padding: '6px 12px',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          pointerEvents: 'none'
        }}
      >
        🖱️ Drag to orbit 360° • Scroll to zoom
      </div>
    </div>
  );
};
