const lyrics = [
  "They told him, \"Don't you ever come around here",
  "Don't want to see your face, you better disappear\"",
  "The fire's in their eyes and their words are really clear",
  "So beat it, just beat it",
  "You better run, you better do what you can",
  "Don't want to see no blood, don't be a macho man",
  "You want to be tough, better do what you can",
  "So beat it, but you want to be bad",
  "Just beat it, beat it, beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it",
  "Just beat it, beat it",
  "Just beat it, beat it",
  "Just beat it, beat it (ooh)",
  "They're out to get you, better leave while you can",
  "Don't want to be a boy, you want to be a man",
  "You want to stay alive, better do what you can",
  "So beat it, just beat it (ooh)",
  "You have to show them that you're really not scared",
  "You're playin' with your life, this ain't no truth or dare",
  "They'll kick you, then they beat you",
  "Then they'll tell you it's fair",
  "So beat it, but you want to be bad",
  "Just beat it, beat it, beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it, beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it, beat it, beat it",
  "Beat it, beat it, beat it",
  "Beat it, beat it, beat it",
  "Beat it, beat it, beat it",
  "Beat it, beat it, beat it",
  "Beat it, beat it, beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it",
  "Beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it, beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it, beat it, beat it",
  "No one wants to be defeated",
  "Showin' how funky and strong is your fight",
  "It doesn't matter who's wrong or right",
  "Just beat it, beat it",
  "Beat it, beat it"
];

/* ── sequin sparkles ── */
for (let i = 0; i < 28; i++) {
  const s = document.createElement('div');
  s.className = 'sparkle';
  const size = 1.5 + Math.random() * 2.5;
  s.style.cssText = [
    `left:${Math.random() * 100}%`,
    `top:${Math.random() * 100}%`,
    `width:${size}px`,
    `height:${size}px`,
    `animation-duration:${2 + Math.random() * 3}s`,
    `animation-delay:${Math.random() * 4}s`,
    `opacity:0`
  ].join(';');
  document.body.appendChild(s);
}

/* ── zipper teeth ── */
const zipperEl = document.getElementById('zipper');
for (let i = 0; i < 9; i++) {
  const t = document.createElement('div');
  t.className = 'zipper-tooth' + (i === 4 ? ' lit' : '');
  zipperEl.appendChild(t);
}

/* ── speed control ── */
const speedSlider = document.getElementById('speedSlider');
const speedLabel  = document.getElementById('speedLabel');

function getDelay() {
  // 1.0× = 2000 ms; speed multiplier compresses the interval
  return Math.round(2000 / parseFloat(speedSlider.value));
}

function updateSliderFill() {
  const min = parseFloat(speedSlider.min);
  const max = parseFloat(speedSlider.max);
  const val = parseFloat(speedSlider.value);
  const pct = ((val - min) / (max - min)) * 100;
  speedSlider.style.setProperty('--fill', `${pct}%`);
  speedSlider.classList.add('filled');
}

speedSlider.addEventListener('input', () => {
  const val = parseFloat(speedSlider.value);
  speedLabel.textContent = `${val.toFixed(2).replace(/\.?0+$/, '')}×`;
  updateSliderFill();
  // if currently playing, restart the interval at the new speed
  if (playing) {
    clearInterval(timer);
    timer = setInterval(advance, getDelay());
  }
});

updateSliderFill();

/* ── app state ── */
let current = 0;
let playing = false;
let timer   = null;

const lyricLine   = document.getElementById('lyricLine');
const lineNumber  = document.getElementById('lineNumber');
const progress    = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');
const playBtn     = document.getElementById('playBtn');

function render(animate) {
  if (animate) {
    lyricLine.classList.remove('visible');
    setTimeout(() => {
      lyricLine.textContent = lyrics[current];
      lyricLine.classList.add('visible');
    }, 220);
  } else {
    lyricLine.textContent = lyrics[current];
    lyricLine.classList.add('visible');
  }

  lineNumber.textContent  = `Line ${current + 1}`;
  progress.textContent    = `Line ${current + 1} of ${lyrics.length}`;
  progressBar.style.width = `${((current + 1) / lyrics.length) * 100}%`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === lyrics.length - 1;

  if (playing) {
    playBtn.textContent = 'Pause';
    playBtn.classList.add('paused');
    playBtn.setAttribute('aria-label', 'Pause');
    playBtn.setAttribute('aria-pressed', 'true');
  } else {
    playBtn.textContent = 'Play';
    playBtn.classList.remove('paused');
    playBtn.setAttribute('aria-label', 'Play');
    playBtn.setAttribute('aria-pressed', 'false');
  }

  /* light up the matching zipper tooth */
  const teeth = zipperEl.querySelectorAll('.zipper-tooth');
  const lit = Math.round((current / (lyrics.length - 1)) * (teeth.length - 1));
  teeth.forEach((t, i) => t.classList.toggle('lit', i === lit));
}

function advance() {
  if (current < lyrics.length - 1) {
    current++;
    render(true);
  } else {
    playing = false;
    clearInterval(timer);
    timer = null;
    render(false);
  }
}

function startPlay() {
  playing = true;
  render(false);
  timer = setInterval(advance, getDelay());
}

function pausePlay() {
  clearInterval(timer);
  timer = null;
  playing = false;
  render(false);
}

function flash(btn) {
  btn.classList.remove('key-flash');
  void btn.offsetWidth; // reflow to restart animation
  btn.classList.add('key-flash');
  btn.addEventListener('animationend', () => btn.classList.remove('key-flash'), { once: true });
}

prevBtn.addEventListener('click', () => {
  if (current > 0) { current--; render(true); }
});

nextBtn.addEventListener('click', () => {
  if (current < lyrics.length - 1) { current++; render(true); }
});

playBtn.addEventListener('click', () => {
  if (playing) { pausePlay(); } else { startPlay(); }
});

document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

  if (e.code === 'Space') {
    e.preventDefault();
    if (playing) { pausePlay(); } else { startPlay(); }
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    if (current > 0) { current--; render(true); flash(prevBtn); }
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    if (current < lyrics.length - 1) { current++; render(true); flash(nextBtn); }
  }
});

render(false);
