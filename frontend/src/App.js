import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/upload-financials`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error analyzing financials");
    }

    setLoading(false);
  };

  const getColor = () => {
    if (!result) return "#ccc";
    if (result.financial_health === "Good") return "#38a169";
    if (result.financial_health === "Medium") return "#d69e2e";
    return "#e53e3e";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          width: "400px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2>SME Financial Health Assessment</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button
          onClick={uploadFile}
          style={{
            padding: "10px 20px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Analyze Financials
        </button>

        {loading && <p style={{ marginTop: "20px" }}>Analyzing...</p>}

        {result && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "10px",
              background: getColor(),
              color: "white",
            }}
          >
            <h3>Financial Health: {result.financial_health}</h3>
            <p>Profit Margin: {result.profit_margin_percent}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;