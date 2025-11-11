 // script.js
window.onload = function() {
  // Navegación (respeta espacios en nombres)
  document.querySelectorAll(".btn.animado").forEach(b => {
    b.addEventListener("click", () => {
      const link = b.dataset.link;
      if (link) location.href = link;
    });
  });

  // Detectar nombre de archivo actual
  const path = window.location.pathname;
  const filename = decodeURIComponent(path.split("/").pop()).toLowerCase();

  // ---------- PAGINA PRINCIPAL ----------
  if (filename === "" || filename === "index.html") {
    // esperar un poco para evitar problemas en hosts que prerenderizan (GitHub Pages)
    setTimeout(() => {
      alert("¡Bienvenido a la página principal!");
      const nombre = prompt("Ingrese su nombre:");
      const apellido = prompt("Ingrese su apellido:");
      const saludoEl = document.getElementById("saludo");
      const titulo = document.getElementById("titulo");
      if (nombre && apellido && (nombre.trim().length > 0 || apellido.trim().length > 0)) {
        const full = `${(nombre||"").trim()} ${(apellido||"").trim()}`.trim();
        if (saludoEl) saludoEl.textContent = `¡Hola, ${full}! Bienvenido al sitio.`;
        if (titulo) titulo.textContent = `Hola, ${full}`;
      } else if (nombre && nombre.trim().length > 0) {
        if (saludoEl) saludoEl.textContent = `¡Hola, ${nombre.trim()}! Bienvenido al sitio.`;
        if (titulo) titulo.textContent = `Hola, ${nombre.trim()}`;
      } else {
        if (saludoEl) saludoEl.textContent = "Bienvenido, visitante.";
      }
    }, 300);
  }

  // ---------- PAGINA 1 (GALERÍA) ----------
  if (filename === "pagina 1.html") {
    setTimeout(() => {
      alert("¡Bienvenido a la galería!");
      const edadStr = prompt("¿Cuál es tu edad?");
      const edad = parseInt(edadStr, 10);
      if (!isNaN(edad)) {
        if (edad > 20) alert("Eres mayor de 20 años.");
        else alert("Eres menor de 20 años.");
      } else {
        alert("No ingresaste una edad válida.");
      }
    }, 300);

    // GALERÍA: hover cambia a la siguiente imagen en la lista (no persistente)
    const galeria = document.getElementById("galeria");
    if (galeria) {
      // crear un array con las src originales
      const imgs = Array.from(galeria.querySelectorAll("img"));
      const srcs = imgs.map(i => i.src);

      imgs.forEach((img, idx) => {
        // cuando entra el cursor: reemplaza src por el siguiente
        img.addEventListener("mouseenter", () => {
          const nextIndex = (idx + 1) % srcs.length;
          img.dataset.original = img.src; // guarda original para revertir
          img.src = srcs[nextIndex];
        });
        // al salir: vuelve al original
        img.addEventListener("mouseleave", () => {
          if (img.dataset.original) {
            img.src = img.dataset.original;
            delete img.dataset.original;
          }
        });

        // click opcional: navegar a la imagen siguiente en más grande (opcional)
        img.addEventListener("click", () => {
          const nextIndex = (idx + 1) % srcs.length;
          window.open(srcs[nextIndex], "_blank");
        });
      });
    }
  }

  // ---------- PAGINA 2 (TABLA OPERACIONES) ----------
  if (filename === "pagina 2.html") {
    // no timeout aquí, porque queremos mensaje inmediato
    alert("Bienvenido a la tabla de operaciones.");
    const resultado = document.getElementById("resultado");

    document.querySelectorAll(".calc").forEach(btn => {
      btn.addEventListener("click", () => {
        const op = btn.dataset.op;
        let r = null;

        function askNumber(msg) {
          const v = prompt(msg);
          if (v === null) return null;
          const n = parseFloat(v);
          return isNaN(n) ? null : n;
        }

        if (op === "suma") {
          const a = askNumber("Ingrese el primer número:");
          if (a === null) { alert("Operación cancelada."); return; }
          const b = askNumber("Ingrese el segundo número:");
          if (b === null) { alert("Operación cancelada."); return; }
          r = a + b;
        } else if (op === "division") {
          const a = askNumber("Ingrese el primer número (dividendo):");
          if (a === null) { alert("Operación cancelada."); return; }
          const b = askNumber("Ingrese el segundo número (divisor):");
          if (b === null) { alert("Operación cancelada."); return; }
          if (b === 0) { alert("Error: división por cero."); return; }
          r = a / b;
        } else if (op === "promedio") {
          const a = askNumber("Ingrese el primer número:");
          if (a === null) { alert("Operación cancelada."); return; }
          const b = askNumber("Ingrese el segundo número:");
          if (b === null) { alert("Operación cancelada."); return; }
          r = (a + b) / 2;
        }

        if (r !== null) {
          if (resultado) resultado.textContent = `Resultado: ${r}`;
          alert(`Resultado: ${r}`);
        }
      });
    });
  }
};
