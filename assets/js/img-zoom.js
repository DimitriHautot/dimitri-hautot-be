// Lightbox des images marquées #zoom (voir layouts/_markup/render-image.html).
document.addEventListener('click', function (e) {
  var a = e.target.closest('a.img-zoom');
  if (!a || typeof HTMLDialogElement !== 'function') return;
  e.preventDefault();
  var d = document.getElementById('img-zoom-dialog');
  if (!d) {
    d = document.createElement('dialog');
    d.id = 'img-zoom-dialog';
    d.className = 'img-zoom-dialog';
    d.addEventListener('click', function () { d.close(); });
    document.body.appendChild(d);
  }
  var img = document.createElement('img');
  img.src = a.href;
  img.alt = a.querySelector('img').alt;
  d.replaceChildren(img);
  d.showModal();
});
