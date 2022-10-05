import React from "react";
import UploadForm from "./UploadForm";
import ImageList from "./ImageList";

function PhotoAlbum() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Photo Album</h2>
      <UploadForm />
      <ImageList />
    </div>
  );
}

export default PhotoAlbum;
