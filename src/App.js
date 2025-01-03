import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState(null);
  const [countValid, setCountValid] = useState(0);
  const [error, setError] = useState("");

  const handleChooseFile = (event) => {
    setError("");
    setText(null);

    const file = event.target.files[0];

    if (!file) {
      setError("File not selected");
      return;
    }

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setText(reader.result.split("\n"));
      console.log(reader.result);
    };
    reader.onerror = () => {
      setError("Error during reading text from file");
    };
  };

  useEffect(() => {
    setCountValid(0);

    if (!text) {
      return;
    }

    text.forEach((el) => {
      const newEl = el.replace(":", "").replace("-", " ").split(" ");

      for (let i = 0; i < 4; i++) {
        if (!newEl[i]) {
          setError(
            "Incorrect file structure. Please, provide file in correct form: 'a 1-5: abcdj'"
          );
          return;
        }
      }

      let counter = 0;
      for (let ch of newEl[3]) {
        if (ch === newEl[0]) {
          counter++;
        }
      }

      if (counter >= +newEl[1] && counter <= +newEl[2]) {
        setCountValid((prev) => prev + 1);
      }
    });
  }, [text]);

  return (
    <div className="App">
      <p>Please choose a .txt file:</p>
      <input type="file" onChange={handleChooseFile} accept=".txt" />
      {text && !error && (
        <p className="success">Valid passwords: {countValid}</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
