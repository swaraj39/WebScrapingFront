import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [metals, setMetals] = useState({
        gold24: "",
        silver: "",
        platinum: "",
        copper: "",
        lead: ""
    });

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://webscraping-2-3iey.onrender.com/metal")   // ← use http unless you configured SSL
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                setMetals({
                    gold24: data.gold24 || "",
                    silver: data.silver || "",
                    platinum: data.platinum || "",
                    copper: data.copper || "",
                    lead: data.lead || ""
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    const cards = [
        { name: "Gold (24K)", value: metals.gold24, className: "gold", icon: "🟡" },
        { name: "Silver", value: metals.silver, className: "silver", icon: "⚪" },
        { name: "Platinum", value: metals.platinum, className: "platinum", icon: "🔵" },
        { name: "Copper", value: metals.copper, className: "copper", icon: "🟠" },
        { name: "Lead", value: metals.lead, className: "lead", icon: "⚫" }
    ];

    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard">
            <header className="header">
                <h1>Metal Price Dashboard</h1>
                <input
                    type="text"
                    placeholder="Search metal..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </header>

            <div className="card-container">
                {filteredCards.map((card, index) => (
                    <div className={`card ${card.className}`} key={index}>
                        <h2>{card.icon} {card.name}</h2>
                        <p className={!card.value ? "loading" : ""}>
                            {loading
                                ? "Fetching price..."
                                : card.value || "Not available"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
