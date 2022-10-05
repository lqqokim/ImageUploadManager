import React, { useState, useEffect } from "react";
import axios from "axios";

interface Image {
  key: string;
  originFileName: string;
}

function ImageList() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios.get('/images')
      .then(result => setImages(result.data.data))
      .catch(err => console.error(err));
  }, []);

  const imgList = images.map(image => (
    <img style={{ width: '100%' }} key={image.key} src={`http://localhost:3100/uploads/${image.key}`} />
  ));

  return (
    <div style={{marginTop: '10px'}}>
      <h1>Image List</h1>
      {imgList}
    </div>
  )
};

export default ImageList;