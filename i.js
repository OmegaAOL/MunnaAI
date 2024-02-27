window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  canvas.width = 1200;
  canvas.height = 600;

  let sw = 128;
  let sh = 128;
  let frame = 0;
  let index = 1;
  let stagger = 0;

  prad = new Image();
  prad.src = "pradP.png";

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(prad, frame * sw, index * sh, sw, sh, 0, 0, 300, 300);

    if (frame >= 10) {frame = 0;}

    if (stagger % 15 == 0) {frame++;}

    stagger ++;

    requestAnimationFrame(animate);
    
  };

  animate();
  
});