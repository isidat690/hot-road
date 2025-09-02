// --- Smooth scroll for navigation links ---
document.querySelectorAll('.navbar-nav .nav-link, .footer__nav a').forEach(link => {
  link.addEventListener('click', function(e){
    if(this.hash && document.querySelector(this.hash)) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({behavior:'smooth', block:'start'});
      document.querySelectorAll('.navbar-nav .nav-link').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// --- Animated Counters (About Stats) ---
function animateCounter(id, end, duration = 1600) {
  const el = document.getElementById(id);
  let start = 0;
  const step = Math.ceil(end / (duration/24));
  function updateCounter() {
    start += step;
    if (start >= end) {
      el.textContent = end;
    } else {
      el.textContent = start;
      requestAnimationFrame(updateCounter);
    }
  }
  if (el) updateCounter();
}
const counters = [
  {id:'counterCars',end:1800},
  {id:'counterHappy',end:1500},
  {id:'counterYears',end:7}
];
let countersStarted = false;
function startCounters(){
  if(!countersStarted){
    counters.forEach(c=>animateCounter(c.id,c.end));
    countersStarted = true;
  }
}
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  const io = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting) startCounters();
  },{threshold:0.5});
  io.observe(aboutStats);
}

// --- Gallery Modal ---
const galleryImgs = document.querySelectorAll('.gallery-img');
const galleryModal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
let currentImgIndex = 0;
if(galleryImgs.length && galleryModal && modalImg){
  galleryImgs.forEach((img, idx) => {
    img.addEventListener('click', function(){
      modalImg.src = this.src;
      currentImgIndex = idx;
      new bootstrap.Modal(galleryModal).show();
    });
  });
  galleryModal.addEventListener('hidden.bs.modal', () => { modalImg.src=''; });
}

// --- Video Modal ---
const videoPreviews = document.querySelectorAll('.video-preview');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
if(videoPreviews.length && videoModal && modalVideo){
  videoPreviews.forEach(v => {
    v.addEventListener('click', function(){
      modalVideo.src = this.src;
      new bootstrap.Modal(videoModal).show();
    });
  });
  videoModal.addEventListener('hidden.bs.modal', () => { modalVideo.pause(); modalVideo.src