const canvas = document.getElementById("networkCanvas");
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const fireflies = [];
      const numFireflies = 15;
      const attractionPoint = { x: canvas.width / 2, y: canvas.height / 2 }; // Mittelpunkt des Schwarms
      const attractionStrength = 0.005; // Stärke der Anziehungskraft
      const connectionDistance = 120; // Maximale Entfernung für Netzwerklinien

      // Glühwürmchen erstellen
      function createFirefly() {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.5,
        };
      }

      for (let i = 0; i < numFireflies; i++) {
        fireflies.push(createFirefly());
      }

      // Schwarm-Logik anwenden
      function updateFireflies() {
        fireflies.forEach((firefly) => {
          // Anziehung zum zentralen Punkt
          const dx = attractionPoint.x - firefly.x;
          const dy = attractionPoint.y - firefly.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          firefly.vx += (dx / distance) * attractionStrength;
          firefly.vy += (dy / distance) * attractionStrength;

          // Geschwindigkeit begrenzen
          const speedLimit = 2;
          const speed = Math.sqrt(firefly.vx * firefly.vx + firefly.vy * firefly.vy);
          if (speed > speedLimit) {
            firefly.vx = (firefly.vx / speed) * speedLimit;
            firefly.vy = (firefly.vy / speed) * speedLimit;
          }

          // Position aktualisieren
          firefly.x += firefly.vx;
          firefly.y += firefly.vy;

          // Bildschirmbegrenzung
          if (firefly.x < 0 || firefly.x > canvas.width) firefly.vx *= -1;
          if (firefly.y < 0 || firefly.y > canvas.height) firefly.vy *= -1;
        });
      }

      // Netzwerklinien zeichnen
      function drawConnections() {
        for (let i = 0; i < fireflies.length; i++) {
          for (let j = i + 1; j < fireflies.length; j++) {
            const dx = fireflies[i].x - fireflies[j].x;
            const dy = fireflies[i].y - fireflies[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = 1 - distance / connectionDistance;
              ctx.strokeStyle = `rgba(225, 255, 187, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(fireflies[i].x, fireflies[i].y);
              ctx.lineTo(fireflies[j].x, fireflies[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Glühwürmchen mit Glow zeichnen
      function drawFireflies() {
        fireflies.forEach((firefly) => {
          // Glow-Effekt
          const glowRadius = firefly.radius * 6; // Größe des Glow-Effekts
          const gradient = ctx.createRadialGradient(
            firefly.x,
            firefly.y,
            0,
            firefly.x,
            firefly.y,
            glowRadius
          );
          gradient.addColorStop(0, `rgba(225, 255, 187, ${firefly.opacity * 0.8})`);
          gradient.addColorStop(1, "rgba(225, 255, 187, 0)");

          // Glow zeichnen
          ctx.beginPath();
          ctx.arc(firefly.x, firefly.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Glühwürmchen-Kern
          ctx.beginPath();
          ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 255, 187) ${firefly.opacity})`;
          ctx.fill();
        });
      }

      // Hauptzeichnungsfunktion
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawConnections();
        drawFireflies();
        updateFireflies();

        requestAnimationFrame(draw);
      }

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        attractionPoint.x = canvas.width / 2;
        attractionPoint.y = canvas.height / 2;
      });

      draw();
