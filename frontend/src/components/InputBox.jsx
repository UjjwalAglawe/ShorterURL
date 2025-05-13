import { useState } from "react";
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

export const InputBox = () => {
    const [inputValue, setInputValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copied, setCopied] = useState(false);

    function handleInput(event) {
        setInputValue(event.target.value);
        setShortUrl('');
        setCopied(false);
    }

    async function handleSubmit() {
        try {
            const res = await axios.post(URL, { url: inputValue });
            setShortUrl(res.data.shortUrl);
        } catch (err) {
            console.error("Error shortening URL:", err.message);
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copy state
    }

    return (
        <div className="max-w-xl mx-auto p-8 text-center text-white">
            <h1 className="text-3xl font-bold mb-6">🔗 URL Shortener</h1>

            <input
                onChange={handleInput}
                value={inputValue}
                placeholder="Enter the URL"
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
                onClick={handleSubmit}
                className="mt-4 w-full bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
            >
                ✂️ Shorten URL
            </button>

            {shortUrl && (
                <div className="mt-6 bg-gray-800 p-4 rounded-xl">
                    <p className="text-lg font-medium break-words">{shortUrl}</p>
                    <button
                        onClick={copyToClipboard}
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-semibold"
                    >
                        {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
                    </button>
                </div>
            )}
        </div>
    );
};
