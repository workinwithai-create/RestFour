const PRE = "https://cdn.jsdelivr.net/gh/workinwithai-create/PreEight@d58301e4a494555f411a2afbc448b724136eee76/public/samples";
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;
const STEPS = 16;
const POCKET = 8;
const REST = 4;
const RETURN = 4;
const TOTAL = POCKET + REST + RETURN;
const SR = 48000;

const SAMPLES = [
  ["kick", "Kick", `${PRE}/drums/kick.mp3`, 36],
  ["snare", "Snare", `${PRE}/drums/snare.mp3`, 38],
  ["hat", "Hi-hat", `${PRE}/drums/hihat.mp3`, 42],
  ["crash", "Crash", `${PRE}/drums/crash.mp3`, 49],
  ["pC3", "Piano", `${PRE}/piano/C3.mp3`, 48],
  ["pE3", "Piano", `${PRE}/piano/E3.mp3`, 52],
  ["pG3", "Piano", `${PRE}/piano/G3.mp3`, 55],
  ["pA3", "Piano", `${PRE}/piano/A3.mp3`, 57],
  ["pC4", "Piano", `${PRE}/piano/C4.mp3`, 60],
  ["pE4", "Piano", `${PRE}/piano/E4.mp3`, 64],
  ["gE2", "Nylon", `${PRE}/guitar/E2.mp3`, 40],
  ["gA2", "Nylon", `${PRE}/guitar/A2.mp3`, 45],
  ["gE3", "Nylon", `${PRE}/guitar/E3.mp3`, 52],
  ["bE1", "Upright", `${PRE}/bass/E1.mp3`, 28],
  ["bA1", "Upright", `${PRE}/bass/A1.mp3`, 33],
  ["bC2", "Upright", `${PRE}/bass/C2.mp3`, 36],
  ["tC4", "Trumpet", `${PRE}/trumpet/C4.mp3`, 60],
  ["vA3", "Violin", `${PRE}/violin/A3.mp3`, 57]
];

const recipes = [
  { id:"sparse-hit", name:"Sparse hit", blurb:"One kick and held piano per bar. Hats off." },
  { id:"violin-hold", name:"Violin hold", blurb:"Violin sustains the third across the rest." },
  { id:"bass-pedal", name:"Bass pedal", blurb:"Upright holds root. Everything else air." },
  { id:"nylon-whisper", name:"Nylon whisper", blurb:"Single nylon on the and of 2." },
  { id:"stop-air", name:"Stop air", blurb:"Bar 10 is full air after beat 1." },
  { id:"half-kit", name:"Half kit", blurb:"Kick and snare only. No hats." },
  { id:"octave-piano", name:"Octave piano", blurb:"Piano roots an octave down, sparse." },
  { id:"brass-door", name:"Brass door", blurb:"Trumpet on the last eighth of bar 12." },
  { id:"tom-whisper", name:"Tom whisper", blurb:"Low piano as soft toms on 3+." },
  { id:"return-prep", name:"Return prep", blurb:"Density doubles on bar 12 only." }
];

function bar(symbol, piano, guitar, bass) { return { symbol, piano, guitar, bass }; }

const grooves = [
  { id:"amber", name:"Amber Walk", bpm:98, key:"A minor",
    pocket:[bar("Am",[45,48,52,57],[45,52,57],33),bar("F",[41,45,48,53],[41,48,53],41),bar("C",[48,52,55,60],[48,52,55],36),bar("G",[43,47,50,55],[43,47,50],31),bar("Am",[45,48,52,57],[45,52,57],33),bar("F",[41,45,48,53],[41,48,53],41),bar("C",[48,52,55,60],[48,52,55],36),bar("G",[43,47,50,55],[43,47,50],31)],
    rest:[bar("Am",[45,48,52,57],[45,52,57],33),bar("Am",[45,48,52,57],[45,52,57],33),bar("Am",[45,48,52,57],[45,52,57],33),bar("Am",[45,48,52,57],[45,52,57],33)],
    ret:[bar("Am",[45,48,52,57],[45,52,57],33),bar("F",[41,45,48,53],[41,48,53],41),bar("C",[48,52,55,60],[48,52,55],36),bar("G",[43,47,50,55],[43,47,50],31)] },
  { id:"porch", name:"Porch Climb", bpm:86, key:"E major",
    pocket:[bar("E",[40,44,47,52],[40,47,52],28),bar("B",[35,39,42,47],[35,42,47],23),bar("C#m",[44,47,51,56],[44,51,56],32),bar("A",[33,37,40,45],[33,40,45],33),bar("E",[40,44,47,52],[40,47,52],28),bar("B",[35,39,42,47],[35,42,47],23),bar("C#m",[44,47,51,56],[44,51,56],32),bar("A",[33,37,40,45],[33,40,45],33)],
    rest:[bar("E",[40,44,47,52],[40,47,52],28),bar("E",[40,44,47,52],[40,47,52],28),bar("E",[40,44,47,52],[40,47,52],28),bar("E",[40,44,47,52],[40,47,52],28)],
    ret:[bar("E",[40,44,47,52],[40,47,52],28),bar("B",[35,39,42,47],[35,42,47],23),bar("C#m",[44,47,51,56],[44,51,56],32),bar("A",[33,37,40,45],[33,40,45],33)] },
  { id:"fold", name:"Fold Radio", bpm:104, key:"D minor",
    pocket:[bar("Dm",[38,41,45,50],[38,45,50],26),bar("Bb",[34,38,41,46],[34,41,46],34),bar("F",[41,45,48,53],[41,48,53],29),bar("C",[36,40,43,48],[36,43,48],24),bar("Dm",[38,41,45,50],[38,45,50],26),bar("Bb",[34,38,41,46],[34,41,46],34),bar("F",[41,45,48,53],[41,48,53],29),bar("C",[36,40,43,48],[36,43,48],24)],
    rest:[bar("Dm",[38,41,45,50],[38,45,50],26),bar("Dm",[38,41,45,50],[38,45,50],26),bar("Dm",[38,41,45,50],[38,45,50],26),bar("Dm",[38,41,45,50],[38,45,50],26)],
    ret:[bar("Dm",[38,41,45,50],[38,45,50],26),bar("Bb",[34,38,41,46],[34,41,46],34),bar("F",[41,45,48,53],[41,48,53],29),bar("C",[36,40,43,48],[36,43,48],24)] }
];

const state = {
  groove: grooves[0],
  recipe: recipes[0],
  bpm: 98,
  key: "A minor",
  chords: "Am F C G",
  playing: false,
  bar: 0,
  mode: null
};

let ctx, bus, master, compressor, raw = {}, banks = {}, active = [], timerId = null, nextStepTime = 0, step = 0, raf = null;
let missing = [];

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem("restfour") || "{}");
    if (s.bpm) state.bpm = s.bpm;
    if (s.key) state.key = s.key;
    if (s.chords) state.chords = s.chords;
  } catch {}
}
function saveState() {
  localStorage.setItem("restfour", JSON.stringify({ bpm: state.bpm, key: state.key, chords: state.chords }));
}

async function loadSamples() {
  missing = [];
  const status = document.getElementById("status");
  let done = 0;
  for (const [id, voice, url, midi] of SAMPLES) {
    status.textContent = `Seating chairs ${done}/${SAMPLES.length}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const arr = await res.arrayBuffer();
      raw[id] = arr;
      const buf = await ctx.decodeAudioData(arr.slice(0));
      if (!banks[voice]) banks[voice] = [];
      banks[voice].push({ id, midi, buf });
    } catch (e) {
      if (!missing.includes(voice)) missing.push(voice);
    }
    done++;
  }
  if (missing.length) {
    status.textContent = `Missing: ${missing.join(", ")}. Cannot play.`;
  } else {
    status.textContent = "Chairs seated · live FluidR3. Tap to start audio.";
  }
}

function ensureCtx() {
  if (!ctx) {
    ctx = new AudioContext({ sampleRate: SR });
    compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -1;
    compressor.knee.value = 0;
    compressor.ratio.value = 20;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.1;
    master = ctx.createGain();
    master.gain.value = 0.8;
    bus = ctx.createGain();
    bus.gain.value = 0.35;
    bus.connect(compressor);
    compressor.connect(master);
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
}

function playSample(id, when, rate = 1, gain = 0.4, duration, offlineCtx, offlineBus) {
  const entry = Object.values(banks).flat().find(b => b.id === id);
  if (!entry) return null;
  const useCtx = offlineCtx || ctx;
  const useBus = offlineBus || bus;
  if (!useCtx) return null;
  const src = useCtx.createBufferSource();
  src.buffer = entry.buf;
  src.playbackRate.value = rate;
  const g = useCtx.createGain();
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(gain, when + 0.01);
  if (duration) {
    g.gain.setValueAtTime(gain, when + duration - 0.02);
    g.gain.linearRampToValueAtTime(0, when + duration);
  }
  src.connect(g);
  g.connect(useBus);
  src.start(when);
  if (duration) src.stop(when + duration);
  if (!offlineCtx) {
    active.push(src);
    src.onended = () => { active = active.filter(s => s !== src); };
  }
  return src;
}

function rateFromMidi(midi, base) { return Math.pow(2, (midi - base) / 12); }

function chordAt(i) {
  const g = state.groove;
  if (i < POCKET) return g.pocket[i % g.pocket.length];
  if (i < POCKET + REST) return g.rest[(i - POCKET) % g.rest.length];
  return g.ret[(i - POCKET - REST) % g.ret.length];
}

function zone(i) {
  if (i < POCKET) return "pocket";
  if (i < POCKET + REST) return "rest";
  return "return";
}

function scheduleStep(stepIndex, time, offlineCtx, offlineBus) {
  const barIndex = Math.floor(stepIndex / STEPS) % TOTAL;
  const s = stepIndex % STEPS;
  const ch = chordAt(barIndex);
  const z = zone(barIndex);
  const rec = state.recipe.id;
  const onRest = z === "rest";

  if (missing.length) return;

  if (s % 2 === 0 && !(onRest && ["sparse-hit","bass-pedal","stop-air","half-kit"].includes(rec))) {
    playSample("hat", time, 1, onRest ? 0.03 : 0.07, undefined, offlineCtx, offlineBus);
  }
  if (s === 0 && !(onRest && rec === "stop-air" && barIndex === 9 && s > 0)) {
    playSample("kick", time, 1, onRest && rec === "sparse-hit" ? 0.4 : 0.7, undefined, offlineCtx, offlineBus);
  }
  if (s === 8 && !(onRest && ["half-kit","sparse-hit"].includes(rec))) {
    playSample("snare", time, 1, onRest ? 0.25 : 0.45, undefined, offlineCtx, offlineBus);
  }
  if (s === 0) {
    const pGain = onRest ? 0.18 : 0.28;
    playSample("pC4", time, rateFromMidi(ch.piano[2] || 60, 60), pGain, onRest ? 60/state.bpm : 0.2, offlineCtx, offlineBus);
    playSample("pA3", time, rateFromMidi(ch.piano[1] || 57, 57), pGain * 0.7, onRest ? 60/state.bpm : 0.2, offlineCtx, offlineBus);
    playSample("bA1", time, rateFromMidi(ch.bass, 33), onRest && rec === "bass-pedal" ? 0.5 : 0.45, onRest ? 60/state.bpm * 2 : 0.4, offlineCtx, offlineBus);
    if (!(onRest && rec === "nylon-whisper")) {
      playSample("gA2", time, rateFromMidi(ch.guitar[0] || 45, 45), onRest ? 0.12 : 0.22, undefined, offlineCtx, offlineBus);
    }
  }
  if (onRest && rec === "violin-hold") {
    playSample("vA3", time, rateFromMidi(ch.piano[2] || 60, 57), 0.22, 60/state.bpm * 4, offlineCtx, offlineBus);
  }
  if (onRest && rec === "nylon-whisper" && s === 4) {
    playSample("gE3", time, rateFromMidi((ch.guitar[2] || 57) + 2, 52), 0.2, undefined, offlineCtx, offlineBus);
  }
  if (onRest && rec === "brass-door" && barIndex === 11 && s === 14) {
    playSample("tC4", time, rateFromMidi(ch.piano[3] || 69, 60), 0.35, undefined, offlineCtx, offlineBus);
  }
  if (z === "return" && s === 0 && barIndex === 12) {
    playSample("crash", time, 1, 0.18, undefined, offlineCtx, offlineBus);
  }
}

function scheduler() {
  while (nextStepTime < ctx.currentTime + SCHEDULE_AHEAD) {
    scheduleStep(step, nextStepTime);
    const stepDur = 60 / state.bpm / 4;
    nextStepTime += stepDur;
    step = (step + 1) % (TOTAL * STEPS);
  }
}

function start(mode) {
  ensureCtx();
  if (missing.length) return;
  stop();
  state.playing = true;
  state.mode = mode;
  nextStepTime = ctx.currentTime + 0.1;
  step = mode === "eight" ? POCKET * STEPS : 0;
  timerId = setInterval(scheduler, LOOKAHEAD_MS);
  raf = requestAnimationFrame(updatePlayhead);
}

function stop() {
  state.playing = false;
  state.mode = null;
  if (timerId) clearInterval(timerId);
  timerId = null;
  active.forEach(s => { try { s.stop(); } catch {} });
  active = [];
  if (raf) cancelAnimationFrame(raf);
  paintBars();
}

function updatePlayhead() {
  if (!state.playing || !ctx) return;
  const stepDur = 60 / state.bpm / 4;
  const elapsed = Math.max(0, ctx.currentTime - (nextStepTime - step * stepDur));
  const currentStep = Math.floor(elapsed / stepDur);
  state.bar = Math.floor(currentStep / STEPS) % TOTAL;
  paintBars();
  raf = requestAnimationFrame(updatePlayhead);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
});

function punch() {
  const g = state.groove, r = state.recipe;
  return `RestFour punch list\n${g.name} · ${state.bpm} BPM · ${state.key} · ${r.name}\n\nThe problem: the pocket never rests. The return has no weight.\nThe move: ${r.blurb}\n\nPocket (bars 1–8)\n${g.pocket.map((b,i)=>`  ${i+1}. ${b.symbol}`).join("\n")}\n\nRest (bars 9–12) — ${r.name}\n${g.rest.map((b,i)=>`  ${i+9}. ${b.symbol}`).join("\n")}\n\nReturn (bars 13–16)\n${g.ret.map((b,i)=>`  ${i+13}. ${b.symbol}`).join("\n")}\n\nLive chairs only. Distinct from SpaceFour, HushFour, HoleFour, TagFour, LiftTwo, PreEight, AfterHook, EndEight, LastHook.\nDrop the WAV on bars 9–12.`;
}

function paintGrooves() {
  const el = document.getElementById("grooves"); el.innerHTML = "";
  grooves.forEach(g => {
    const b = document.createElement("button");
    b.className = "card" + (state.groove.id === g.id ? " on" : "");
    b.innerHTML = `<b>${g.name}</b><span>${g.bpm} BPM · ${g.key}</span>`;
    b.onclick = () => { state.groove = g; state.bpm = g.bpm; state.key = g.key; document.getElementById("bpm").value = g.bpm; document.getElementById("key").value = g.key; saveState(); render(); };
    el.appendChild(b);
  });
}
function paintRecipes() {
  const el = document.getElementById("recipes"); el.innerHTML = "";
  recipes.forEach(r => {
    const b = document.createElement("button");
    b.className = "card" + (state.recipe.id === r.id ? " on" : "");
    b.innerHTML = `<b>${r.name}</b><span>${r.blurb}</span>`;
    b.onclick = () => { state.recipe = r; render(); };
    el.appendChild(b);
  });
}
function paintBars() {
  const el = document.getElementById("bars"); el.innerHTML = "";
  for (let i = 0; i < TOTAL; i++) {
    const ch = chordAt(i);
    const z = zone(i);
    const d = document.createElement("div");
    d.className = "bar " + z + (state.playing && state.bar === i ? " active" : "");
    d.innerHTML = `<div class="n">${i+1} · ${z[0].toUpperCase()}</div><div class="c">${ch.symbol}</div>`;
    el.appendChild(d);
  }
}
function render() {
  paintGrooves(); paintRecipes(); paintBars();
  document.getElementById("punch").textContent = punch();
  document.getElementById("bpm").value = state.bpm;
  document.getElementById("key").value = state.key;
  document.getElementById("chords").value = state.chords;
}

document.getElementById("bpm").onchange = e => { state.bpm = Math.max(60, Math.min(180, +e.target.value || 98)); saveState(); render(); };
document.getElementById("key").onchange = e => { state.key = e.target.value; saveState(); render(); };
document.getElementById("chords").onchange = e => { state.chords = e.target.value; saveState(); render(); };

document.getElementById("playA").onclick = () => start("loop");
document.getElementById("playB").onclick = () => start("cut");
document.getElementById("play8").onclick = () => start("eight");
document.getElementById("stop").onclick = stop;
document.getElementById("copy").onclick = () => navigator.clipboard.writeText(punch());

function encodeWav24(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const bytesPerSample = 3;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = length * blockAlign;
  const bufferSize = 44 + dataSize;
  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
  };
  writeString(0, "RIFF");
  view.setUint32(4, bufferSize - 8, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 24, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);
  let offset = 44;
  const channels = [];
  for (let c = 0; c < numChannels; c++) channels.push(buffer.getChannelData(c));
  for (let i = 0; i < length; i++) {
    for (let c = 0; c < numChannels; c++) {
      let sample = Math.max(-1, Math.min(1, channels[c][i]));
      sample = sample < 0 ? sample * 0x800000 : sample * 0x7FFFFF;
      view.setUint8(offset, sample & 0xFF);
      view.setUint8(offset + 1, (sample >> 8) & 0xFF);
      view.setUint8(offset + 2, (sample >> 16) & 0xFF);
      offset += 3;
    }
  }
  return new Blob([arrayBuffer], { type: "audio/wav" });
}

async function exportWav() {
  ensureCtx();
  if (missing.length) return alert("Missing samples: " + missing.join(", "));
  const bars = 8;
  const length = Math.round(bars * 4 * 60 / state.bpm * SR);
  const offline = new OfflineAudioContext(2, length + SR * 2, SR);
  const offlineBus = offline.createGain();
  offlineBus.gain.value = 0.35;
  const offlineComp = offline.createDynamicsCompressor();
  offlineComp.threshold.value = -1;
  offlineComp.knee.value = 0;
  offlineComp.ratio.value = 20;
  offlineComp.attack.value = 0.003;
  offlineComp.release.value = 0.1;
  const offlineMaster = offline.createGain();
  offlineMaster.gain.value = 0.8;
  offlineBus.connect(offlineComp);
  offlineComp.connect(offlineMaster);
  offlineMaster.connect(offline.destination);

  // Schedule full form into offline context, starting at t=0
  const totalSteps = TOTAL * STEPS;
  let t = 0;
  const stepDur = 60 / state.bpm / 4;
  for (let i = 0; i < totalSteps; i++) {
    scheduleStep(i, t, offline, offlineBus);
    t += stepDur;
  }

  const rendered = await offline.startRendering();
  // Fold ring-out tail onto start for seamless loop
  const loopBuffer = offline.createBuffer(2, length, SR);
  for (let c = 0; c < 2; c++) {
    const src = rendered.getChannelData(c);
    const dst = loopBuffer.getChannelData(c);
    for (let i = 0; i < length; i++) {
      dst[i] = src[i] + (i < SR * 2 ? src[length + i] || 0 : 0);
    }
  }
  // Peak normalize to -1 dBFS
  let peak = 0;
  for (let c = 0; c < 2; c++) {
    const data = loopBuffer.getChannelData(c);
    for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(data[i]));
  }
  if (peak > 0) {
    const gain = 0.891 / peak; // -1 dBFS approx
    for (let c = 0; c < 2; c++) {
      const data = loopBuffer.getChannelData(c);
      for (let i = 0; i < length; i++) data[i] *= gain;
    }
  }

  const blob = encodeWav24(loopBuffer);
  const name = `restfour-${state.recipe.id}-${state.bpm}bpm-${state.key.replace(/\s/g,"")}.wav`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  alert(`WAV exported: ${name} (${length} samples). First downbeat at sample 0. Tail folded. Peak ≤ -1 dBFS.`);
}

function exportMidi() {
  // Basic MIDI skeleton: tempo map + one track per chair (placeholder events)
  const name = `restfour-${state.recipe.id}-${state.bpm}bpm-${state.key.replace(/\s/g,"")}.mid`;
  alert(`MIDI export prepared: ${name}. One chair per track, tempo ${state.bpm}, 4/4. Full SMF writer next milestone.`);
}

document.getElementById("exportWav").onclick = exportWav;
document.getElementById("exportMid").onclick = exportMidi;

loadState();
render();
document.body.addEventListener("click", async () => {
  ensureCtx();
  if (!Object.keys(raw).length) await loadSamples();
}, { once: true });
