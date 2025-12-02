import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState<string>("Chargement...");

  useEffect(() => {
    fetch("http://localhost:4000/api/message")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Erreur lors de l'appel API");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Mini projet fullstack</h1>
      <p>Message du backend :</p>
      <pre>{message}</pre>
    </div>
  );
}

export default App;
