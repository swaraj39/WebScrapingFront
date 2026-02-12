import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [metals, setMetals] = useState({
        gold24: null,
        silver: null,
        platinum: null,
        copper: null,
        lead: null
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("https://webscraping-2-3iey.onrender.com/metal")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMetals({
                    gold24: data.gold24,
                    silver: data.silver,
                    platinum: data.platinum,
                    copper: data.copper,
                    lead: data.Lead
                });
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);

    // Function to calculate price for 10 grams
    const calculatePricePer10g = (pricePerKg) => {
        if (pricePerKg === null) return null;
        return (pricePerKg / 100).toFixed(2);
    };

    const cards = [
        { 
            name: "Gold (24K)", 
            value: metals.gold24, 
            pricePer10g: calculatePricePer10g(metals.gold24),
            className: "gold", 
            icon: "🟡",
            unit: "g"
        },
        { 
            name: "Silver", 
            value: metals.silver, 
            pricePer10g: calculatePricePer10g(metals.silver),
            className: "silver", 
            icon: "⚪",
            unit: "g"
        },
        { 
            name: "Platinum", 
            value: metals.platinum, 
            pricePer10g: calculatePricePer10g(metals.platinum),
            className: "platinum", 
            icon: "🔵",
            unit: "g"
        },
        { 
            name: "Copper", 
            value: metals.copper, 
            pricePer10g: calculatePricePer10g(metals.copper),
            className: "copper", 
            icon: "🟠",
            unit: "g"
        },
        { 
            name: "Lead", 
            value: metals.lead, 
            pricePer10g: calculatePricePer10g(metals.lead),
            className: "lead", 
            icon: "⚫",
            unit: "g"
        }
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
                        <div className="card-header">
                            <span className="card-icon">{card.icon}</span>
                            <h2>{card.name}</h2>
                        </div>
                        <div className="price-container">
                            <div className="price-main">
                                <span className="price-label">10g</span>
                                <p className={`price-value ${card.pricePer10g == null ? "loading" : ""}`}>
                                    {card.pricePer10g != null 
                                        ? `₹${parseFloat(card.pricePer10g).toLocaleString('en-IN')}` 
                                        : "Fetching price..."}
                                </p>
                            </div>
                            <div className="price-sub">
                                <span className="sub-label">(1kg: ₹{card.value != null ? parseFloat(card.value).toLocaleString('en-IN') : "---"})</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
