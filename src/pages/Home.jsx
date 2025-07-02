import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import DescriptionBox from "../components/DescriptionBox";
import SpeakButton from "../components/SpeakButton";
import { getImageDescription } from "../api/geminiApi";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());

  const handleImageReady = async (base64Image) => {
    try {
      setLoading(true);
      setDescription("Thinking...");
      const caption = await getImageDescription(base64Image);
      setDescription(caption);
    } catch (err) {
      setDescription("Oops! Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetEverything = () => {
    setDescription("");
    setImageKey(Date.now());
    window.speechSynthesis.cancel();
  };

  return (
    <div className="home-container" role="main">
      <h1>VisionTalk</h1>
      <ImageUpload key={imageKey} onImageReady={handleImageReady} />
      {(description || loading) && (
        <section aria-label="Image description and controls">
          <DescriptionBox text={description} loading={loading} />
          {!loading && description && description !== "Thinking..." && (
            <>
              <SpeakButton text={description} />
              <button
                className="new-upload-btn"
                onClick={resetEverything}
                aria-label="Upload a new image"
              >
                <ArrowPathIcon aria-hidden="true" />
                Upload New Image
              </button>
            </>
          )}
        </section>
      )}
    </div>
  );
}

export default Home;