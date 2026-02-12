.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== GLOBAL ===== */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
  min-height: 100vh;
  padding: 20px;
  color: #e5e7eb;
}

.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

/* ===== HEADER ===== */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #f1f5f9;
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.header input {
  padding: 15px 30px;
  width: 100%;
  max-width: 500px;
  border-radius: 50px;
  border: 1px solid #1e293b;
  font-size: 1.05rem;
  background: rgba(15, 23, 42, 0.8);
  color: #e5e7eb;
  transition: 0.3s;
}

.header input:focus {
  outline: none;
  border: 1px solid #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.header input::placeholder {
  color: #64748b;
}

/* ===== CARD GRID ===== */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

/* ===== CARD ===== */
.card {
  background: rgba(15, 23, 42, 0.75);
  border-radius: 24px;
  padding: 25px;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  transition: 0.35s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.15);
}

/* top glow bar */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  border-radius: 24px 24px 0 0;
  background: currentColor;
}

/* ===== CARD HEADER ===== */
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.card-icon {
  font-size: 2rem;
}

.card h2 {
  font-size: 1.4rem;
  color: #f1f5f9;
  font-weight: 600;
}

/* ===== PRICE BOX ===== */
.price-container {
  background: rgba(2, 6, 23, 0.6);
  border-radius: 16px;
  padding: 20px;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 15px;
}

.price-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.1);
  padding: 6px 14px;
  border-radius: 20px;
  text-transform: uppercase;
}

.price-value {
  font-size: 2.1rem;
  font-weight: 800;
  color: #f8fafc;
}

.price-sub {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed rgba(148, 163, 184, 0.2);
  font-size: 0.95rem;
  color: #cbd5f5;
}

/* ===== PRICE STATUS ===== */
.loading {
  color: #facc15;
  animation: pulse 1.5s infinite;
}

.not-available {
  color: #f87171;
}

.price-change {
  margin-top: 6px;
  font-weight: 600;
}

.price-change.up {
  color: #22c55e;
}

.price-change.down {
  color: #ef4444;
}

.profit-hint {
  margin-top: 4px;
  font-size: 0.85rem;
  color: #94a3b8;
}

/* ===== METAL COLORS ===== */
.card.gold { color: #facc15; }
.card.silver { color: #cbd5f5; }
.card.copper { color: #f97316; }
.card.lead { color: #94a3b8; }

/* ===== ANIMATION ===== */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .header h1 { font-size: 2rem; }
  .price-value { font-size: 1.8rem; }
}
