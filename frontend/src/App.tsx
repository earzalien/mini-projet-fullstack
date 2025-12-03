import { useEffect, useState } from "react";

type ApiResponse = {
    message: string;
};

function App() {
    const [message, setMessage] = useState<string>("Chargement...");
    const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
		const fetchMessage = async () => {
			try {
				const response = await fetch(`${API_URL}/api/message`);

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}

				const data = (await response.json()) as ApiResponse;
				setMessage(data.message);
				setError(null);
			}
			catch {
				setError("Erreur lors de l'appel API");
			}
		};

        fetchMessage();
    }, []);

    return (
        <>
            <h1>Mini projet fullstack</h1>
            <p>Message du backend :</p>
            {error ? <pre>{error}</pre> : <pre>{message}</pre>}
        </>
    );
}

export default App;
