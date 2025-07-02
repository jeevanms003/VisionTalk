export function speakText(text) {
  if (!window.speechSynthesis) {
    alert("Your browser doesn't support text-to-speech.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}