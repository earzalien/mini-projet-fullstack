import { useEffect, useState } from "react";

type ApiResponse = {
    message: string;
};

function App() {
    const [message, setMessage] = useState<string>("Chargement...");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/message",
                );
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                const data = (await response.json()) as ApiResponse;
                setMessage(data.message);
                setError(null);
            } catch (_err) {
                setError("Erreur lors de l'appel API");
            }
        };

        fetchMessage();
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Mini projet fullstack</h1>
            <p>Message du backend :</p>
            {error ? <pre>{error}</pre> : <pre>{message}</pre>}
        </div>
    );
}

export default App;
