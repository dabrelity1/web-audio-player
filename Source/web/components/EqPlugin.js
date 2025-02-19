import React, { useState } from 'react';
import EqSlider from './EQSlider';

const EqPlugin = () => {
  const [low, setLow] = useState(50);
  const [mid, setMid] = useState(50);
  const [high, setHigh] = useState(50);
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);

  const onLowChange = (e) => setLow(e.target.value);
  const onMidChange = (e) => setMid(e.target.value);
  const onHighChange = (e) => setHigh(e.target.value);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      const reader = new FileReader();
      reader.onload = (e) => {
        context.decodeAudioData(e.target.result, (buffer) => {
          setAudioBuffer(buffer);
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const processAudio = () => {
    if (audioContext && audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const lowShelf = audioContext.createBiquadFilter();
      lowShelf.type = 'lowshelf';
      lowShelf.frequency.setValueAtTime(500, audioContext.currentTime);
      lowShelf.gain.setValueAtTime(low - 50, audioContext.currentTime);

      const midPeaking = audioContext.createBiquadFilter();
      midPeaking.type = 'peaking';
      midPeaking.frequency.setValueAtTime(1000, audioContext.currentTime);
      midPeaking.gain.setValueAtTime(mid - 50, audioContext.currentTime);

      const highShelf = audioContext.createBiquadFilter();
      highShelf.type = 'highshelf';
      highShelf.frequency.setValueAtTime(3000, audioContext.currentTime);
      highShelf.gain.setValueAtTime(high - 50, audioContext.currentTime);

      source.connect(lowShelf);
      lowShelf.connect(midPeaking);
      midPeaking.connect(highShelf);
      highShelf.connect(audioContext.destination);

      source.start();
    }
  };

  return (
    <div className="eq-plugin">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <EqSlider label="Low" value={low} onChange={onLowChange} />
      <EqSlider label="Mid" value={mid} onChange={onMidChange} />
      <EqSlider label="High" value={high} onChange={onHighChange} />
      <button onClick={processAudio}>Process Audio</button>
    </div>
  );
};

export default EqPlugin;