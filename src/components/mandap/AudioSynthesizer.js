// Web Audio API Ambient Sound Generator for Sacred Fire & Chimes

let audioCtx = null;
let noiseNode = null;
let isPlaying = false;

export function toggleAmbientSound(enable) {
  if (enable) {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    if (!isPlaying) {
      // 1. Create crackling fire noise
      const bufferSize = audioCtx.sampleRate * 2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Pink-ish crackle noise generator
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      // Filter for warm low fire frequency
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 450;
      filter.Q.value = 1.2;

      const gain = audioCtx.createGain();
      gain.gain.value = 0.25;

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noiseNode.start();
      isPlaying = true;
    }
  } else {
    if (noiseNode && isPlaying) {
      try {
        noiseNode.stop();
      } catch (e) {}
      isPlaying = false;
    }
  }
  return isPlaying;
}
