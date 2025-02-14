import { useState } from "react";

export function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>("");

  function fileInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedFile(e.target.files![0]);
  }

  async function uploadHandler() {
    try {
      // null guard
      if (!selectedFile) return;
      // create fdata and append file
      const formData = new FormData();
      formData.append("file", selectedFile);
      // uploading file
      const result = await fetch("http://localhost:3000/storage/upload", {
        method: "POST",
        body: formData,
      });
      const text = await result.text();
      setResponseText(text);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-teal-950">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-neutral-100">
        Upload anything.
      </h1>
      <input
        type="file"
        onChange={fileInputChangeHandler}
        className="mb-4 rounded bg-white px-3 py-2 font-black"
      />
      <button
        onClick={() => uploadHandler()}
        className="cursor-pointer rounded bg-sky-300 px-5 py-2 font-mono text-2xl font-bold text-green-950 shadow hover:bg-sky-400"
      >
        UPLOAD
      </button>
      {responseText && <span className="text-white">{responseText}</span>}
    </div>
  );
}
