document.addEventListener('DOMContentLoaded', () => {
  // Pet info toggle visibility
  const petRadios = document.querySelectorAll('input[name="pets"]');
  const petGroup = document.getElementById('petSpecifyGroup');

  petRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'yes') {
        petGroup.classList.remove('hidden');
      } else {
        petGroup.classList.add('hidden');
      }
    });
  });

  // Mode Selection Toggle
  const btnFull = document.getElementById('btnFullApp');
  const btnCredit = document.getElementById('btnCreditCheck');

  btnFull.addEventListener('click', () => {
    btnFull.classList.add('active');
    btnCredit.classList.remove('active');
  });

  btnCredit.addEventListener('click', () => {
    btnCredit.classList.add('active');
    btnFull.classList.remove('active');
  });

  // Signature Pad Setup
  const canvas = document.getElementById('signaturePad');
  const ctx = canvas.getContext('2d');
  let isDrawing = false;

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseleave', () => isDrawing = false);

  document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});