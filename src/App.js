import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [metals, setMetals] = useState({
        gold24: null,
        silver: null,
        copper: null,
        lead: null
    });

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8081/metal")
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                setMetals({
                    gold24: data.gold24 || null,
                    silver: data.silver || null,
                    copper: data.copper || null,
                    lead: data.lead || null
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    // Extract numeric value from ₹ string
    const extractNumericValue = (value) => {
        if (!value) return null;
        const str = String(value);
        const match = str.match(/[\d,]+(\.\d+)?/);
        if (!match) return null;
        return parseFloat(match[0].replace(/,/g, ""));
    };

    const formatCurrency = (value) => {
        const num = extractNumericValue(value);
        if (num === null) return null;
        return `₹${num.toLocaleString("en-IN")}`;
    };

    const calculatePerKg = (value) => {
        const num = extractNumericValue(value);
        if (num === null) return null;
        return `₹${(num * 100).toLocaleString("en-IN")}/kg`;
    };

    // ⭐ Price movement feature
    const getPriceChange = (current, previous) => {
        const curr = extractNumericValue(current);
        const prev = extractNumericValue(previous);
        if (curr === null || prev === null) return null;

        const diff = curr - prev;
        const percent = ((diff / prev) * 100).toFixed(2);

        return {
            diff,
            percent,
            isUp: diff > 0
        };
    };

    const formatChange = (change) => {
        if (!change) return null;
        const symbol = change.isUp ? "▲" : "▼";
        const sign = change.isUp ? "+" : "";
        return `${symbol} ${sign}₹${Math.abs(change.diff).toLocaleString("en-IN")} (${sign}${change.percent}%)`;
    };

    const cards = [
        { name: "Gold (24K)", value: metals.gold24, className: "gold", icon: "🟡" },
        { name: "Silver", value: metals.silver, className: "silver", icon: "⚪" },
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
                {filteredCards.map((card, index) => {
                    const current = formatCurrency(card.value?.current);
                    const previous = formatCurrency(card.value?.previous);
                    const perKg = calculatePerKg(card.value?.current);
                    const change = getPriceChange(
                        card.value?.current,
                        card.value?.previous
                    );

                    return (
                        <div className={`card ${card.className}`} key={index}>
                            <div className="card-header">
                                <span className="card-icon">{card.icon}</span>
                                <h2>{card.name}</h2>
                            </div>

                            <div className="price-container">
                                <div className="price-main">
                                    <span className="price-label">10g</span>

                                    {loading ? (
                                        <p className="loading">Fetching price...</p>
                                    ) : current ? (
                                        <p className="price-value">{current}</p>
                                    ) : (
                                        <p className="not-available">Price unavailable</p>
                                    )}
                                </div>

                                <div className="price-sub">
                                    {loading ? (
                                        "Loading..."
                                    ) : current ? (
                                        <>
                                            <div><strong>1kg:</strong> {perKg}</div>

                                            {previous && (
                                                <div className="previous">
                                                    Previous: {previous}
                                                </div>
                                            )}

                                            {change && (
                                                <div className={`price-change ${change.isUp ? "up" : "down"}`}>
                                                    {formatChange(change)}
                                                </div>
                                            )}

                                            {/*{change && (*/}
                                            {/*    <div className="profit-hint">*/}
                                            {/*        If you bought 10g yesterday →*/}
                                            {/*        <strong>*/}
                                            {/*            {change.isUp*/}
                                            {/*                ? ` profit ₹${Math.abs(change.diff).toLocaleString("en-IN")}`*/}
                                            {/*                : ` loss ₹${Math.abs(change.diff).toLocaleString("en-IN")}`*/}
                                            {/*            }*/}
                                            {/*        </strong>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                        </>
                                    ) : (
                                        "No data available"
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
