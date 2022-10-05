import React, { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { notification } from "antd";
import ProgressBar from "./ProgressBar";

const FormWrapper = styled.div`
  .image-preview {
    width: 0%;
    opacity: 0;
    display: block;
    margin: 0 auto 20px auto;
    border-radius: 10px;
    border: 5px solid grey;
  }

  .image-preview-show {
    width: 300px;
    opacity: 1;
    transition: 0.5s;
  }

  .file-dropper {
    border: 1px dashed black;
    height: 200px;
    background-color: bisque;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .file-dropper input {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    cursor: pointer;
  }

  .file-dropper input::file-selector-button {
    display: none;
  }

  .file-dropper:hover {
    background-color: gray;
    color: white;
    transition: 0.5s;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40;
  border-radius: 3;
  cursor: pointer;
`;

interface Response {
  success: boolean;
  data: any;
}

export default function UploadForm() {
  const DEFAULT_FILE_NAME = "이미지 파일을 업로드 해주세요.";
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const [fileName, setFileName] = useState<string | undefined>(
    DEFAULT_FILE_NAME
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageSelectHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const imageFile = e.currentTarget.files && e.currentTarget.files[0];
    setFile(imageFile);
    setFileName(imageFile?.name);

    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = (e) => {
        setImgSrc(e.target!.result as string);
      };
    }
  };

  function initFileState(): void {
    setUploadPercent(0);
    setFileName(DEFAULT_FILE_NAME);
    setFile(null);
    setImgSrc("");
    fileInputRef.current!.value = "";
  }

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void | null> {
    e.preventDefault();

    if (!file) {
      return notification.open({
        type: "info",
        message: "Please select a file.",
      });
    }

    const formData = new FormData();
    formData.append("image", file as File);

    try {
      const {
        data: { success, data },
      } = await axios.post<Response>("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e: ProgressEvent) => {
          setUploadPercent(Math.round((100 * e.loaded) / e.total));
        },
      });

      if (success) {
        notification.open({
          type: "success",
          message: "Upload Success!",
          duration: 2,
        });

        setTimeout(() => {
          initFileState();
        }, 2000);
      } else {
        notification.open({
          type: "error",
          message: "Upload Failed!",
          duration: 2,
        });

        initFileState();
      }
    } catch (err) {
      console.log(err);
      notification.open({
        type: "error",
        message: "Upload Failed!",
        duration: 2,
      });

      initFileState();
    }
  }

  return (
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <img
          className={`image-preview ${imgSrc && "image-preview-show"}`}
          src={imgSrc}
        />
        {/* <ProgressBar percent={uploadPercent} /> */}
        <ProgressBar percent={uploadPercent} />

        <div className="file-dropper">
          {fileName}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={imageSelectHandler}
          />
        </div>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormWrapper>
  );
}
