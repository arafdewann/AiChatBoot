import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading...");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
        headers: {
          Authorization: `Bearer YOUR_API_KEY`, // Ensure to replace with the correct API key
        },
      });

      // Update the logic based on the actual response structure
      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setAnswer(generatedText);
      } else {
        setAnswer("No valid response from the API.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Something went wrong. Please try again.");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Gemini AI Bot Assistant</h1>
      <form
        onSubmit={generateAnswer}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <textarea
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid white",
            padding: "10px",
            width: "100%",
            maxWidth: "600px",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid white",
            padding: "10px 20px",
            borderRadius: "12px",
            cursor: generatingAnswer ? "not-allowed" : "pointer",
          }}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Loading..." : "Submit"}
        </button>
      </form>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          maxWidth: "600px",
          wordWrap: "break-word",
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default App;
