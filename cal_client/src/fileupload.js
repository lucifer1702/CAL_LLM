import React, { useState } from "react";
import { setExtractedText } from "./summary"; // Adjust the path as necessary

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedTextState] = useState("");
  const [error, setError] = useState("");
  const [summaryGenerated, setSummaryGenerated] = useState(false);

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
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setExtractedTextState(data.summary);
        setExtractedText(data.summary); // Export the extracted text
        setSummaryGenerated(true); // Indicate that the summary has been generated
        setError("");
      } else {
        setError(data.error);
        setExtractedTextState("");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while uploading the file.");
      setExtractedTextState("");
    }
  };

  return (
    <div>
      <h1>PDF SUMMARY</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {summaryGenerated && (
        <div>
          <h2>Summary Generated!</h2>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
