import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/upload-financials", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>SME Financial Health Assessment</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>Analyze Financials</button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;