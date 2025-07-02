import React, { useState } from "react";
import { convertToBase64 } from "../utils/convertToBase64";
import { PhotoIcon } from "@heroicons/react/24/solid"; // Import Heroicon
import "../styles/App.css";

function ImageUpload({ onImageReady }) {
  const [preview, setPreview] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setPreview(URL.createObjectURL(file));
    onImageReady(base64); // Send to parent
  };

  return (
    <div className="upload-container">
      <label htmlFor="image-upload" className="upload-label">
        <PhotoIcon aria-hidden="true" />
        <span>Choose an image</span>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt="Image preview"
          className="image-preview"
        />
      )}
    </div>
  );
}

export default ImageUpload;