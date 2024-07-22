import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
        header: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      if (response.ok) {
        setExtractedText(data.summary);
        setError("");
      } else {
        setError(data.error);
        setExtractedText("");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while uploading the file.");
      setExtractedText("");
    }
  };

  return (
    <div>
      <h1>PDF SUMMARY</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {extractedText && (
        <div>
          <h2>SUMMARY:</h2>
          <pre>{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
