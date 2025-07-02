import React, { useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
} from "@heroicons/react/24/solid"; // Import Heroicons

function SpeakButton({ text }) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utteranceRef = useRef(null);

  const handlePlay = () => {
    if (!text) return;

    // If resuming from pause, just resume
    if (paused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }

    // If already speaking, prevent replay
    if (window.speechSynthesis.speaking) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  return (
    <div className="tts-controls" role="region" aria-label="Text-to-speech controls">
      <button
        onClick={handlePlay}
        disabled={!text}
        aria-label={paused ? "Resume speech" : "Play speech"}
      >
        {paused ? <PlayIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
        {paused ? "Resume" : "Play"}
      </button>
      <button
        onClick={handlePause}
        disabled={!speaking || paused}
        aria-label="Pause speech"
      >
        <PauseIcon aria-hidden="true" />
        Pause
      </button>
      <button
        onClick={handleStop}
        disabled={!speaking}
        aria-label="Stop speech"
      >
        <StopIcon aria-hidden="true" />
        Stop
      </button>
    </div>
  );
}

export default SpeakButton;