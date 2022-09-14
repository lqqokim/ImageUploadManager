import React, { useState } from "react";
import axios from "axios";

interface Response {
  success: boolean;
  data: any;
}

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | undefined>(
    "이미지 파일을 업로드 해주세요."
  );

  const imageSelectHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const imageFile = e.currentTarget.files && e.currentTarget.files[0];
    setFile(imageFile);
    setFileName(imageFile?.name);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file as File);

    try {
      const {
        data: { success, data },
      } = await axios.post<Response>("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (success) {
        console.log(data);
        alert("Upload Success!");
      } else {
        alert("Upload Failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Upload Failed!");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={imageSelectHandler} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UploadForm;
