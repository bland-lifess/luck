<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Depth & Line — Fishing Frenzy</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
<style>
  :root {
    --abyss: #030b14;
    --deep: #071525;
    --ocean: #0a2540;
    --mid: #0d3459;
    --surface: #1a5276;
    --foam: #2e86ab;
    --glow: #4ecdc4;
    --gold: #f7c948;
    --rare: #b44fec;
    --epic: #ff6b35;
    --legendary: #ff2d55;
    --mythic: #ff9f1c;
    --common-clr: #7ecba1;
    --uncommon-clr: #5bc0eb;
    --rare-clr: #b44fec;
    --epic-clr: #ff6b35;
    --legendary-clr: #ff2d55;
    --mythic-clr: #ff9f1c;
    --text: #d4e8f5;
    --muted: #6a9ab0;
  }

- { margin: 0; padding: 0; box-sizing: border-box; }

body {
background: var(–abyss);
color: var(–text);
font-family: ‘Crimson Pro’, serif;
min-height: 100vh;
overflow-x: hidden;
cursor: default;
}

/* –– OCEAN BACKGROUND –– */
#ocean-bg {
position: fixed; inset: 0; z-index: 0;
background: linear-gradient(180deg,
#01050d 0%, #020d1f 15%, #041830 30%,
#062240 50%, #082d52 70%, #0a3868 100%);
overflow: hidden;
}
.bubble {
position: absolute;
border-radius: 50%;
background: radial-gradient(circle at 35% 35%, rgba(78,205,196,0.3), rgba(78,205,196,0.05));
border: 1px solid rgba(78,205,196,0.15);
animation: rise linear infinite;
pointer-events: none;
}
@keyframes rise {
0% { transform: translateY(110vh) translateX(0) scale(1); opacity: 0; }
10% { opacity: 1; }
90% { opacity: 0.6; }
100% { transform: translateY(-10vh) translateX(var(–drift)) scale(0.8); opacity: 0; }
}
.fish-bg {
position: absolute;
font-size: 1.4rem;
opacity: 0.06;
animation: swim linear infinite;
pointer-events: none;
filter: blur(0.5px);
}
@keyframes swim {
from { transform: translateX(-120px); }
to { transform: translateX(calc(100vw + 120px)); }
}
.caustic {
position: absolute; inset: 0;
background: radial-gradient(ellipse 200px 80px at var(–cx) var(–cy), rgba(78,205,196,0.04), transparent);
animation: caustic-move 8s ease-in-out infinite alternate;
}
@keyframes caustic-move {
0% { –cx: 20%; –cy: 30%; }
100% { –cx: 80%; –cy: 60%; }
}

/* –– LAYOUT –– */
#app { position: relative; z-index: 1; max-width: 960px; margin: 0 auto; padding: 0 16px 40px; }

/* –– HEADER –– */
header {
text-align: center;
padding: 32px 0 20px;
position: relative;
}
header h1 {
font-family: ‘Cinzel’, serif;
font-size: clamp(2rem, 6vw, 3.5rem);
font-weight: 900;
letter-spacing: 0.08em;
background: linear-gradient(135deg, #c9e8f5 0%, #4ecdc4 40%, #f7c948 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
line-height: 1.1;
text-shadow: none;
}
header .subtitle {
font-style: italic;
color: var(–muted);
font-size: 1rem;
margin-top: 4px;
letter-spacing: 0.15em;
}
.stats-bar {
display: flex;
justify-content: center;
gap: 28px;
margin-top: 18px;
flex-wrap: wrap;
}
.stat-chip {
display: flex;
align-items: center;
gap: 8px;
background: rgba(13,52,89,0.6);
border: 1px solid rgba(78,205,196,0.2);
border-radius: 30px;
padding: 6px 16px;
font-size: 0.88rem;
}
.stat-chip .lbl { color: var(–muted); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
.stat-chip .val { color: var(–gold); font-family: ‘Cinzel’, serif; font-weight: 600; font-size: 1rem; }

/* –– NAV TABS –– */
.tabs {
display: flex;
gap: 4px;
margin: 24px 0 0;
background: rgba(7,21,37,0.7);
padding: 4px;
border-radius: 14px;
border: 1px solid rgba(78,205,196,0.12);
overflow-x: auto;
}
.tab {
flex: 1; min-width: 80px;
padding: 10px 16px;
border: none;
background: transparent;
color: var(–muted);
font-family: ‘Cinzel’, serif;
font-size: 0.75rem;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
border-radius: 10px;
cursor: pointer;
transition: all 0.25s;
white-space: nowrap;
}
.tab:hover { color: var(–glow); background: rgba(78,205,196,0.07); }
.tab.active {
background: linear-gradient(135deg, rgba(78,205,196,0.2), rgba(78,205,196,0.08));
color: var(–glow);
border: 1px solid rgba(78,205,196,0.3);
box-shadow: 0 0 20px rgba(78,205,196,0.1);
}

/* –– PANELS –– */
.panel { display: none; animation: fadein 0.3s ease; }
.panel.active { display: block; }
@keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

/* –– FISHING PANEL –– */
#fishing-zone {
margin-top: 20px;
border-radius: 20px;
overflow: hidden;
border: 1px solid rgba(78,205,196,0.2);
box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
position: relative;
}
#water-surface {
height: 90px;
background: linear-gradient(180deg, rgba(10,37,64,0.9) 0%, rgba(13,52,89,0.95) 100%);
position: relative;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
}
.wave-line {
position: absolute;
width: 200%;
height: 2px;
background: linear-gradient(90deg, transparent, rgba(78,205,196,0.4), rgba(78,205,196,0.7), rgba(78,205,196,0.4), transparent);
animation: wave-anim 3s ease-in-out infinite;
}
.wave-line:nth-child(2) { top: 55%; opacity: 0.4; animation-delay: -1.5s; }
.wave-line:nth-child(3) { top: 70%; opacity: 0.2; animation-delay: -0.8s; }
@keyframes wave-anim {
0%, 100% { transform: translateX(-25%) scaleY(1); }
50% { transform: translateX(0%) scaleY(1.5); }
}
#rod-display {
text-align: center;
padding: 4px 0;
z-index: 2;
position: relative;
}
#rod-display .rod-name {
font-family: ‘Cinzel’, serif;
font-size: 0.8rem;
color: var(–gold);
letter-spacing: 0.1em;
}
#fishing-area {
min-height: 360px;
background: linear-gradient(180deg,
rgba(13,52,89,0.95) 0%,
rgba(8,29,52,0.97) 40%,
rgba(3,11,20,0.99) 100%);
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px;
overflow: hidden;
}

/* floating fish in background */
.bg-fish {
position: absolute;
font-size: 1.2rem;
opacity: 0.08;
pointer-events: none;
animation: bg-swim linear infinite;
}
@keyframes bg-swim {
from { transform: translateX(-60px) scaleX(1); }
to { transform: translateX(calc(100% + 120px)) scaleX(1); }
}

#cast-btn {
position: relative;
padding: 18px 48px;
font-family: ‘Cinzel’, serif;
font-size: 1rem;
font-weight: 600;
letter-spacing: 0.15em;
text-transform: uppercase;
border: 2px solid var(–glow);
background: linear-gradient(135deg, rgba(78,205,196,0.15), rgba(78,205,196,0.05));
color: var(–glow);
border-radius: 50px;
cursor: pointer;
transition: all 0.2s;
overflow: hidden;
}
#cast-btn::before {
content: ‘’;
position: absolute;
inset: -2px;
border-radius: 50px;
background: linear-gradient(135deg, var(–glow), var(–foam), var(–glow));
z-index: -1;
opacity: 0;
transition: opacity 0.2s;
}
#cast-btn:hover { transform: scale(1.04); box-shadow: 0 0 30px rgba(78,205,196,0.3); }
#cast-btn:hover::before { opacity: 0.1; }
#cast-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

#status-text {
font-style: italic;
color: var(–muted);
font-size: 0.95rem;
margin-top: 12px;
min-height: 24px;
text-align: center;
transition: color 0.3s;
}
#status-text.excited { color: var(–glow); }

/* fishing line */
#fish-line {
position: absolute;
top: 0;
left: 50%;
transform: translateX(-50%);
width: 2px;
height: 0;
background: linear-gradient(180deg, rgba(78,205,196,0.6), rgba(78,205,196,0.2));
transition: height 0.8s ease-in-out;
pointer-events: none;
z-index: 2;
}
.lure {
position: absolute;
bottom: -6px;
left: 50%;
transform: translateX(-50%);
width: 10px;
height: 10px;
background: var(–gold);
border-radius: 50%;
box-shadow: 0 0 8px var(–gold);
}

/* –– MINIGAME –– */
#minigame-overlay {
display: none;
position: absolute;
inset: 0;
background: rgba(3,11,20,0.95);
z-index: 10;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 0 0 20px 20px;
}
#minigame-overlay.active { display: flex; }
#minigame-title {
font-family: ‘Cinzel’, serif;
font-size: 1.1rem;
color: var(–glow);
letter-spacing: 0.1em;
margin-bottom: 6px;
}
#minigame-fish-reveal {
font-size: 0.85rem;
color: var(–muted);
margin-bottom: 20px;
font-style: italic;
}
#minigame-canvas {
border-radius: 50%;
cursor: crosshair;
touch-action: none;
user-select: none;
}
#minigame-progress-bar {
width: 280px;
height: 6px;
background: rgba(255,255,255,0.08);
border-radius: 3px;
margin-top: 14px;
overflow: hidden;
}
#minigame-progress-fill {
height: 100%;
border-radius: 3px;
background: linear-gradient(90deg, var(–glow), var(–gold));
transition: width 0.1s;
}
#minigame-info {
display: flex;
gap: 20px;
margin-top: 10px;
font-size: 0.8rem;
color: var(–muted);
}
#minigame-info span { color: var(–text); font-family: ‘Cinzel’, serif; }

/* catch result */
#catch-result {
display: none;
flex-direction: column;
align-items: center;
gap: 12px;
text-align: center;
}
#catch-result.active { display: flex; }
.catch-fish-emoji { font-size: 4rem; filter: drop-shadow(0 0 20px currentColor); animation: bob 2s ease-in-out infinite; }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.catch-fish-name { font-family: ‘Cinzel’, serif; font-size: 1.4rem; font-weight: 600; }
.catch-fish-rarity { font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; }
.catch-fish-value { font-size: 1rem; color: var(–gold); }
.catch-fish-desc { font-style: italic; color: var(–muted); font-size: 0.85rem; max-width: 260px; }
#catch-continue-btn {
padding: 10px 32px;
background: rgba(78,205,196,0.15);
border: 1px solid rgba(78,205,196,0.4);
border-radius: 30px;
color: var(–glow);
font-family: ‘Cinzel’, serif;
font-size: 0.8rem;
letter-spacing: 0.1em;
cursor: pointer;
transition: all 0.2s;
margin-top: 4px;
}
#catch-continue-btn:hover { background: rgba(78,205,196,0.25); }

/* –– INVENTORY –– */
.section-title {
font-family: ‘Cinzel’, serif;
font-size: 0.85rem;
letter-spacing: 0.2em;
text-transform: uppercase;
color: var(–muted);
margin: 28px 0 14px;
display: flex;
align-items: center;
gap: 10px;
}
.section-title::after {
content: ‘’;
flex: 1;
height: 1px;
background: linear-gradient(90deg, rgba(78,205,196,0.3), transparent);
}

#fish-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
gap: 10px;
}
.fish-card {
background: rgba(7,21,37,0.8);
border: 1px solid rgba(78,205,196,0.1);
border-radius: 12px;
padding: 14px 12px;
text-align: center;
transition: all 0.2s;
cursor: default;
position: relative;
overflow: hidden;
}
.fish-card:hover {
transform: translateY(-2px);
border-color: rgba(78,205,196,0.3);
box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.fish-card::before {
content: ‘’;
position: absolute;
top: 0; left: 0; right: 0;
height: 2px;
background: var(–rarity-color, var(–glow));
border-radius: 12px 12px 0 0;
}
.fish-card .emoji { font-size: 2rem; }
.fish-card .name { font-family: ‘Cinzel’, serif; font-size: 0.7rem; letter-spacing: 0.05em; margin: 6px 0 2px; }
.fish-card .count { color: var(–muted); font-size: 0.75rem; }
.fish-card .value { color: var(–gold); font-size: 0.75rem; }
.fish-card.locked { opacity: 0.25; filter: grayscale(1); }

/* –– SHOP –– */
.rods-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 12px;
margin-top: 8px;
}
.rod-card {
background: rgba(7,21,37,0.8);
border: 1px solid rgba(78,205,196,0.15);
border-radius: 14px;
padding: 18px 16px;
transition: all 0.2s;
position: relative;
overflow: hidden;
}
.rod-card.owned { border-color: rgba(78,205,196,0.4); }
.rod-card.equipped { border-color: var(–gold); box-shadow: 0 0 20px rgba(247,201,72,0.15); }
.rod-card .rod-icon { font-size: 2.2rem; margin-bottom: 8px; }
.rod-card .rod-name { font-family: ‘Cinzel’, serif; font-size: 0.9rem; font-weight: 600; color: var(–text); }
.rod-card .rod-desc { font-size: 0.78rem; color: var(–muted); font-style: italic; margin: 4px 0 10px; }
.rod-stats { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.rod-stat {
background: rgba(78,205,196,0.07);
border: 1px solid rgba(78,205,196,0.15);
border-radius: 4px;
padding: 2px 7px;
font-size: 0.68rem;
color: var(–glow);
}
.rod-action {
width: 100%;
padding: 8px;
border: 1px solid;
border-radius: 8px;
font-family: ‘Cinzel’, serif;
font-size: 0.72rem;
letter-spacing: 0.1em;
cursor: pointer;
transition: all 0.2s;
}
.rod-action.buy { border-color: var(–gold); color: var(–gold); background: rgba(247,201,72,0.08); }
.rod-action.buy:hover { background: rgba(247,201,72,0.18); }
.rod-action.equip { border-color: var(–glow); color: var(–glow); background: rgba(78,205,196,0.08); }
.rod-action.equip:hover { background: rgba(78,205,196,0.18); }
.rod-action.equipped-lbl { border-color: rgba(247,201,72,0.4); color: var(–gold); background: rgba(247,201,72,0.05); cursor: default; }
.rod-action:disabled { opacity: 0.4; cursor: not-allowed; }
.rod-price { font-size: 0.75rem; color: var(–gold); margin-bottom: 6px; }

/* –– LEADERBOARD –– */
#leaderboard-panel { padding-bottom: 20px; }
.lb-entry {
display: flex;
align-items: center;
gap: 14px;
padding: 12px 16px;
margin-bottom: 6px;
border-radius: 10px;
background: rgba(7,21,37,0.7);
border: 1px solid rgba(78,205,196,0.08);
transition: all 0.2s;
}
.lb-entry:hover { border-color: rgba(78,205,196,0.2); }
.lb-entry.me { border-color: rgba(247,201,72,0.3); background: rgba(247,201,72,0.04); }
.lb-rank {
font-family: ‘Cinzel’, serif;
font-weight: 900;
font-size: 1.1rem;
width: 32px;
text-align: center;
flex-shrink: 0;
}
.lb-rank.gold { color: #ffd700; }
.lb-rank.silver { color: #c0c0c0; }
.lb-rank.bronze { color: #cd7f32; }
.lb-rank.other { color: var(–muted); font-size: 0.9rem; }
.lb-name { flex: 1; font-family: ‘Cinzel’, serif; font-size: 0.9rem; }
.lb-score { color: var(–gold); font-family: ‘Cinzel’, serif; font-size: 0.95rem; }
.lb-detail { color: var(–muted); font-size: 0.75rem; }

.lb-submit-zone {
margin-top: 20px;
padding: 20px;
border-radius: 14px;
background: rgba(7,21,37,0.7);
border: 1px solid rgba(78,205,196,0.15);
text-align: center;
}
.lb-submit-zone input {
background: rgba(255,255,255,0.05);
border: 1px solid rgba(78,205,196,0.3);
border-radius: 8px;
padding: 10px 16px;
color: var(–text);
font-family: ‘Crimson Pro’, serif;
font-size: 1rem;
width: 200px;
outline: none;
margin-right: 10px;
margin-bottom: 10px;
}
.lb-submit-zone input:focus { border-color: var(–glow); }
.lb-submit-zone button {
padding: 10px 24px;
background: rgba(78,205,196,0.15);
border: 1px solid var(–glow);
border-radius: 8px;
color: var(–glow);
font-family: ‘Cinzel’, serif;
font-size: 0.75rem;
cursor: pointer;
transition: all 0.2s;
letter-spacing: 0.1em;
}
.lb-submit-zone button:hover { background: rgba(78,205,196,0.25); }

/* –– TOAST –– */
#toast {
position: fixed;
bottom: 24px;
left: 50%;
transform: translateX(-50%) translateY(60px);
background: rgba(7,21,37,0.95);
border: 1px solid rgba(78,205,196,0.3);
border-radius: 30px;
padding: 12px 24px;
font-family: ‘Cinzel’, serif;
font-size: 0.85rem;
color: var(–glow);
letter-spacing: 0.08em;
box-shadow: 0 8px 32px rgba(0,0,0,0.4);
z-index: 999;
transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
pointer-events: none;
opacity: 0;
white-space: nowrap;
}
#toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

/* misc */
.sell-btn {
padding: 6px 16px;
background: rgba(247,201,72,0.1);
border: 1px solid rgba(247,201,72,0.3);
border-radius: 20px;
color: var(–gold);
font-family: ‘Cinzel’, serif;
font-size: 0.7rem;
cursor: pointer;
transition: all 0.2s;
letter-spacing: 0.08em;
margin-top: 4px;
}
.sell-btn:hover { background: rgba(247,201,72,0.2); }

#sell-all-btn {
display: block;
margin: 16px auto 0;
padding: 12px 32px;
background: rgba(247,201,72,0.1);
border: 1px solid rgba(247,201,72,0.3);
border-radius: 30px;
color: var(–gold);
font-family: ‘Cinzel’, serif;
font-size: 0.8rem;
cursor: pointer;
transition: all 0.2s;
letter-spacing: 0.1em;
}
#sell-all-btn:hover { background: rgba(247,201,72,0.2); }

.empty-state {
text-align: center;
padding: 40px;
color: var(–muted);
font-style: italic;
font-size: 0.9rem;
}

.refresh-btn {
margin-left: 10px;
padding: 4px 12px;
background: rgba(78,205,196,0.08);
border: 1px solid rgba(78,205,196,0.2);
border-radius: 20px;
color: var(–glow);
font-size: 0.72rem;
cursor: pointer;
font-family: ‘Cinzel’, serif;
transition: all 0.2s;
}
.refresh-btn:hover { background: rgba(78,205,196,0.18); }

@media (max-width: 480px) {
.rods-grid { grid-template-columns: 1fr 1fr; }
#fish-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
}
</style>

</head>
<body>

<div id="ocean-bg"></div>

<div id="app">
  <header>
    <h1>Depth &amp; Line</h1>
    <div class="subtitle">Fishing Frenzy &mdash; Cast into the Unknown</div>
    <div class="stats-bar">
      <div class="stat-chip">
        <div>
          <div class="lbl">Gold</div>
          <div class="val" id="hdr-gold">0</div>
        </div>
      </div>
      <div class="stat-chip">
        <div>
          <div class="lbl">Total Caught</div>
          <div class="val" id="hdr-caught">0</div>
        </div>
      </div>
      <div class="stat-chip">
        <div>
          <div class="lbl">Net Worth</div>
          <div class="val" id="hdr-worth">0</div>
        </div>
      </div>
      <div class="stat-chip">
        <div>
          <div class="lbl">Rod</div>
          <div class="val" id="hdr-rod">Driftwood</div>
        </div>
      </div>
    </div>
  </header>

  <div class="tabs">
    <button class="tab active" onclick="switchTab('fishing')">🎣 Fish</button>
    <button class="tab" onclick="switchTab('inventory')">🐟 Haul</button>
    <button class="tab" onclick="switchTab('shop')">⚓ Rods</button>
    <button class="tab" onclick="switchTab('leaderboard')">🏆 Board</button>
  </div>

  <!-- FISHING -->

  <div id="fishing-panel" class="panel active">
    <div id="fishing-zone">
      <div id="water-surface">
        <div class="wave-line"></div>
        <div class="wave-line"></div>
        <div class="wave-line"></div>
        <div id="rod-display">
          <div class="rod-name" id="active-rod-label">🪵 Driftwood Rod</div>
        </div>
      </div>
      <div id="fishing-area">
        <div id="fish-line"><div class="lure"></div></div>

```
    <button id="cast-btn" onclick="startCast()">⬇ Cast Line</button>
    <div id="status-text">Choose a rod and cast your line.</div>

    <div id="catch-result">
      <div class="catch-fish-emoji" id="cr-emoji"></div>
      <div class="catch-fish-name" id="cr-name"></div>
      <div class="catch-fish-rarity" id="cr-rarity"></div>
      <div class="catch-fish-value" id="cr-value"></div>
      <div class="catch-fish-desc" id="cr-desc"></div>
      <button id="catch-continue-btn" onclick="resetFishing()">Cast Again ↩</button>
    </div>

    <div id="minigame-overlay">
      <div id="minigame-title">Something's biting!</div>
      <div id="minigame-fish-reveal" id="mg-hint"></div>
      <canvas id="minigame-canvas" width="280" height="280"></canvas>
      <div id="minigame-progress-bar"><div id="minigame-progress-fill" style="width:0%"></div></div>
      <div id="minigame-info">
        <div>Hits: <span id="mg-hits">0</span></div>
        <div>Needed: <span id="mg-needed">0</span></div>
        <div>Time: <span id="mg-time">10</span>s</div>
      </div>
    </div>
  </div>
</div>
```

  </div>

  <!-- INVENTORY -->

  <div id="inventory-panel" class="panel">
    <div class="section-title">Your Catch</div>
    <div id="fish-grid"></div>
    <button id="sell-all-btn" onclick="sellAll()">Sell All Fish</button>
  </div>

  <!-- SHOP -->

  <div id="shop-panel" class="panel">
    <div class="section-title">Rod Outfitter</div>
    <div class="rods-grid" id="rods-grid"></div>
  </div>

  <!-- LEADERBOARD -->

  <div id="leaderboard-panel" class="panel">
    <div class="section-title">
      Global Rankings
      <button class="refresh-btn" onclick="loadLeaderboard()">↻ Refresh</button>
    </div>
    <div id="lb-list"></div>
    <div class="lb-submit-zone">
      <div style="margin-bottom:12px;font-family:'Cinzel',serif;font-size:0.8rem;color:var(--muted);">Submit your score to the global board</div>
      <input type="text" id="lb-name-input" placeholder="Your angler name" maxlength="20">
      <button onclick="submitScore()">Submit Score</button>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
// ============================================================
// DATA DEFINITIONS
// ============================================================
const FISH = [
  // COMMON (weight 50)
  { id:'minnow',      name:'Minnow',           emoji:'🐟', rarity:'common',    value:5,   weight:50, desc:'Tiny and plentiful. The first fish every angler meets.', hits:3 },
  { id:'bluegill',    name:'Bluegill',          emoji:'🐠', rarity:'common',    value:8,   weight:48, desc:'A feisty panfish with iridescent blue-green scales.', hits:3 },
  { id:'perch',       name:'Yellow Perch',      emoji:'🐡', rarity:'common',    value:10,  weight:45, desc:'Striped in gold and black. Schooling fish of still waters.', hits:4 },
  { id:'carp',        name:'Common Carp',       emoji:'🐟', rarity:'common',    value:12,  weight:42, desc:'Ancient bottom-feeder. Surprisingly strong for its size.', hits:4 },
  { id:'roach',       name:'Roach',             emoji:'🐠', rarity:'common',    value:7,   weight:44, desc:'Silver-scaled and quick. Loves weedy shallows.', hits:3 },
  // UNCOMMON (weight 30)
  { id:'bass',        name:'Largemouth Bass',   emoji:'🐟', rarity:'uncommon',  value:25,  weight:30, desc:'The king of freshwater sport fishing.', hits:5 },
  { id:'trout',       name:'Rainbow Trout',     emoji:'🐠', rarity:'uncommon',  value:28,  weight:28, desc:'A streak of pink and silver beneath cold mountain streams.', hits:5 },
  { id:'catfish',     name:'Channel Catfish',   emoji:'🐡', rarity:'uncommon',  value:22,  weight:30, desc:'Nocturnal prowler. Navigates by whiskers in murky depths.', hits:5 },
  { id:'pike',        name:'Northern Pike',     emoji:'🐟', rarity:'uncommon',  value:35,  weight:22, desc:'An ambush predator with needle-sharp teeth.', hits:6 },
  { id:'walleye',     name:'Walleye',           emoji:'🐠', rarity:'uncommon',  value:30,  weight:24, desc:'Glass eyes glow in deep water. A prized table fish.', hits:5 },
  { id:'crappie',     name:'Black Crappie',     emoji:'🐡', rarity:'uncommon',  value:20,  weight:28, desc:'Speckled and delicate. Often found beneath fallen logs.', hits:4 },
  // RARE (weight 14)
  { id:'salmon',      name:'Atlantic Salmon',   emoji:'🐟', rarity:'rare',      value:65,  weight:14, desc:'Born in fresh water, forged by the ocean. A legendary fighter.', hits:7 },
  { id:'sturgeon',    name:'Lake Sturgeon',     emoji:'🦈', rarity:'rare',      value:80,  weight:12, desc:'A living fossil. Armored scales from the age of dinosaurs.', hits:8 },
  { id:'eel',         name:'American Eel',      emoji:'🐍', rarity:'rare',      value:55,  weight:14, desc:'Sinuous and elusive, migrating thousands of miles to spawn.', hits:7 },
  { id:'muskie',      name:'Muskellunge',       emoji:'🐟', rarity:'rare',      value:90,  weight:10, desc:'The fish of ten thousand casts. Massive and terrifying.', hits:8 },
  { id:'steelhead',   name:'Steelhead Trout',   emoji:'🐠', rarity:'rare',      value:70,  weight:12, desc:'Sea-run rainbow trout. Chrome-bright and explosively powerful.', hits:7 },
  // EPIC (weight 5)
  { id:'tuna',        name:'Bluefin Tuna',      emoji:'🐟', rarity:'epic',      value:220, weight:5,  desc:'The ocean's apex predator. Can reach 600 lbs. Worth a fortune.', hits:9 },
  { id:'marlin',      name:'Blue Marlin',       emoji:'🐬', rarity:'epic',      value:280, weight:4,  desc:'A billfish of the deep blue. The ultimate ocean trophy.', hits:10 },
  { id:'halibut',     name:'Pacific Halibut',   emoji:'🐡', rarity:'epic',      value:200, weight:5,  desc:'Flat and enormous. The largest flatfish in the Pacific.', hits:9 },
  { id:'tarpon',      name:'Silver King Tarpon',emoji:'🐠', rarity:'epic',      value:250, weight:4,  desc:'Leaps 10 feet out of the water. A heart-stopping catch.', hits:10 },
  { id:'coelacanth',  name:'Coelacanth',        emoji:'🐟', rarity:'epic',      value:350, weight:3,  desc:'Thought extinct for 65 million years. Science wants this back.', hits:11 },
  // LEGENDARY (weight 1.5)
  { id:'oarfish',     name:'Oarfish',           emoji:'🐉', rarity:'legendary', value:750, weight:1.5,desc:'The mythical sea serpent. Reaches 30 meters in length.', hits:12 },
  { id:'sunfish',     name:'Giant Ocean Sunfish',emoji:'🐡', rarity:'legendary', value:600, weight:1.5,desc:'The world's heaviest bony fish. Drifts like an alien moon.', hits:12 },
  { id:'arapaima',    name:'Arapaima',          emoji:'🐟', rarity:'legendary', value:800, weight:1,  desc:'Armored river giant of the Amazon. Breathes air.', hits:13 },
  { id:'anglerfish',  name:'Deep Sea Anglerfish',emoji:'🫧', rarity:'legendary', value:900, weight:1,  desc:'Lures prey with bio-luminescent bait in the void below.', hits:13 },
  // MYTHIC (weight 0.3)
  { id:'dragon',      name:'Sea Dragon',        emoji:'🐲', rarity:'mythic',    value:5000, weight:0.3, desc:'Ancient guardian of the deep. Has not been caught in recorded history.', hits:15 },
  { id:'kraken',      name:'Kraken Spawn',      emoji:'🦑', rarity:'mythic',    value:8000, weight:0.2, desc:'Fragment of an elder god. Fishermen who land one are never quite the same.', hits:16 },
  { id:'leviathan',   name:'Leviathan Scale',   emoji:'🌊', rarity:'mythic',    value:12000, weight:0.1, desc:'Not a fish, but a piece of something so vast it has no name.', hits:18 },
];

const RARITY_COLORS = {
  common: '#7ecba1', uncommon: '#5bc0eb', rare: '#b44fec',
  epic: '#ff6b35', legendary: '#ff2d55', mythic: '#ff9f1c'
};
const RARITY_LABELS = {
  common: 'Common', uncommon: 'Uncommon', rare: 'Rare',
  epic: 'Epic', legendary: 'Legendary', mythic: 'Mythic ✦'
};

const RODS = [
  { id:'driftwood', name:'Driftwood Rod', emoji:'🪵', price:0, desc:'A gnarled branch and some twine. But the fish don\'t care.', luck:1.0, speed:1.0, rareBonus:0 },
  { id:'bamboo',    name:'Bamboo Cane',   emoji:'🎋', price:80, desc:'Springy and light. Slightly better odds in the shallows.', luck:1.15, speed:1.1, rareBonus:0.01 },
  { id:'fiberglass',name:'Fiberglass Rod',emoji:'🎣', price:200, desc:'The workhorse of weekend anglers. Reliable and forgiving.', luck:1.3, speed:1.2, rareBonus:0.02 },
  { id:'carbon',    name:'Carbon Fiber',  emoji:'⚙️', price:500, desc:'Impossibly light and sensitive. You\'ll feel every nibble.', luck:1.5, speed:1.4, rareBonus:0.04 },
  { id:'titanium',  name:'Titanium Pro',  emoji:'🔱', price:1200, desc:'Used by tournament anglers. Rare fish fear its vibration.', luck:1.75, speed:1.6, rareBonus:0.07 },
  { id:'crystal',   name:'Crystal Rod',   emoji:'💎', price:3000, desc:'Grown in deep-sea pressure chambers. Resonates with ocean magic.', luck:2.1, speed:1.8, rareBonus:0.12 },
  { id:'abyssal',   name:'Abyssal Spire', emoji:'🌊', price:7500, desc:'Forged from a sea serpent\'s spine. Even mythics are drawn to it.', luck:2.8, speed:2.2, rareBonus:0.2 },
  { id:'divine',    name:'Divine Leviathan',emoji:'⚡', price:20000, desc:'The rod at the end of the world. No fish can resist.', luck:4.0, speed:2.8, rareBonus:0.35 },
];

// ============================================================
// STATE
// ============================================================
let state = {
  gold: 0,
  totalCaught: 0,
  equippedRod: 'driftwood',
  ownedRods: ['driftwood'],
  inventory: {}, // fishId -> count
  totalEarned: 0,
};

function saveState() {
  localStorage.setItem('dnl_save', JSON.stringify(state));
}

function loadState() {
  const s = localStorage.getItem('dnl_save');
  if (s) {
    try { state = { ...state, ...JSON.parse(s) }; } catch(e) {}
  }
}

function netWorth() {
  let w = state.gold;
  for (const [id, count] of Object.entries(state.inventory)) {
    const f = FISH.find(x => x.id === id);
    if (f) w += f.value * count;
  }
  return w;
}

function updateHeader() {
  document.getElementById('hdr-gold').textContent = formatNum(state.gold);
  document.getElementById('hdr-caught').textContent = formatNum(state.totalCaught);
  document.getElementById('hdr-worth').textContent = formatNum(netWorth());
  const rod = RODS.find(r => r.id === state.equippedRod);
  document.getElementById('hdr-rod').textContent = rod ? rod.name : '—';
  document.getElementById('active-rod-label').textContent = rod ? rod.emoji + ' ' + rod.name : '—';
}

function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(1) + 'k';
  return Math.floor(n).toString();
}

// ============================================================
// OCEAN BACKGROUND
// ============================================================
function initBackground() {
  const bg = document.getElementById('ocean-bg');
  // Bubbles
  for (let i = 0; i < 28; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = 4 + Math.random() * 18;
    b.style.cssText = `
      width:${s}px; height:${s}px;
      left:${Math.random()*100}%;
      animation-duration:${6+Math.random()*14}s;
      animation-delay:-${Math.random()*12}s;
      --drift:${(Math.random()-0.5)*60}px;
    `;
    bg.appendChild(b);
  }
  // Background fish
  const bfishes = ['🐟','🐠','🐡','🦈','🐬'];
  for (let i = 0; i < 12; i++) {
    const f = document.createElement('div');
    f.className = 'fish-bg';
    f.textContent = bfishes[Math.floor(Math.random()*bfishes.length)];
    f.style.cssText = `
      top:${10+Math.random()*80}%;
      animation-duration:${20+Math.random()*40}s;
      animation-delay:-${Math.random()*40}s;
      font-size:${0.8+Math.random()*1.6}rem;
    `;
    bg.appendChild(f);
  }
}

// Also add floating fish to fishing area
function initFishingBg() {
  const area = document.getElementById('fishing-area');
  const bfishes = ['🐟','🐠','🐡','🦈'];
  for (let i = 0; i < 6; i++) {
    const f = document.createElement('div');
    f.className = 'bg-fish';
    f.textContent = bfishes[Math.floor(Math.random()*bfishes.length)];
    f.style.cssText = `
      top:${15+Math.random()*65}%;
      font-size:${0.9+Math.random()*1.2}rem;
      animation-duration:${18+Math.random()*25}s;
      animation-delay:-${Math.random()*30}s;
    `;
    area.appendChild(f);
  }
}

// ============================================================
// FISHING LOGIC
// ============================================================
let fishingState = 'idle'; // idle | casting | minigame | result

function getRod() { return RODS.find(r => r.id === state.equippedRod); }

function rollFish() {
  const rod = getRod();
  // Build weighted table with rare bonus
  const pool = [];
  for (const fish of FISH) {
    let w = fish.weight * rod.luck;
    // rare bonus increases weight of non-common fish
    if (fish.rarity !== 'common') w *= (1 + rod.rareBonus * 10);
    pool.push({ fish, w });
  }
  const total = pool.reduce((a, b) => a + b.w, 0);
  let r = Math.random() * total;
  for (const { fish, w } of pool) {
    r -= w;
    if (r <= 0) return fish;
  }
  return FISH[0];
}

function setStatus(text, excited) {
  const el = document.getElementById('status-text');
  el.textContent = text;
  el.className = excited ? 'excited' : '';
}

let castTimeout;

function startCast() {
  if (fishingState !== 'idle') return;
  fishingState = 'casting';

  document.getElementById('cast-btn').style.display = 'none';
  document.getElementById('status-text').style.display = 'block';

  // Animate line going down
  const line = document.getElementById('fish-line');
  line.style.height = '0px';
  setTimeout(() => { line.style.height = '180px'; }, 50);

  setStatus('Line in the water…');

  const rod = getRod();
  const waitTime = Math.max(800, 3000 / rod.speed * (0.5 + Math.random()));

  castTimeout = setTimeout(() => {
    setStatus('Something is biting! 🎣', true);
    const targetFish = rollFish();
    setTimeout(() => startMinigame(targetFish), 600);
  }, waitTime);
}

function resetFishing() {
  fishingState = 'idle';
  document.getElementById('fish-line').style.height = '0';
  document.getElementById('catch-result').classList.remove('active');
  document.getElementById('cast-btn').style.display = '';
  document.getElementById('status-text').style.display = 'block';
  setStatus('Choose a rod and cast your line.');
  saveState();
  updateHeader();
}

// ============================================================
// MINIGAME
// ============================================================
let mgState = null;

function startMinigame(fish) {
  const overlay = document.getElementById('minigame-overlay');
  overlay.classList.add('active');
  document.getElementById('status-text').style.display = 'none';

  const rod = getRod();
  const needed = Math.max(2, fish.hits - Math.floor(rod.luck * 0.5));
  const timeLimit = Math.max(5, 14 - rod.speed * 1.5);

  document.getElementById('minigame-fish-reveal').textContent =
    `You feel a ${RARITY_LABELS[fish.rarity].toLowerCase()} fish…`;

  mgState = {
    fish,
    needed,
    hits: 0,
    timeLeft: timeLimit,
    maxTime: timeLimit,
    circles: [],
    running: true,
    timerId: null,
    spawnId: null,
  };

  document.getElementById('mg-needed').textContent = needed;
  document.getElementById('mg-hits').textContent = 0;
  document.getElementById('minigame-progress-fill').style.width = '0%';

  const canvas = document.getElementById('minigame-canvas');
  const ctx = canvas.getContext('2d');
  canvas.addEventListener('pointerdown', onMgClick);

  mgState.timerId = setInterval(() => {
    mgState.timeLeft -= 0.1;
    document.getElementById('mg-time').textContent = mgState.timeLeft.toFixed(1);
    if (mgState.timeLeft <= 0) endMinigame(false);
  }, 100);

  mgState.spawnId = setInterval(() => spawnCircle(), Math.max(600, 1400 / rod.speed));

  spawnCircle();
  requestAnimationFrame(renderMg);
}

function spawnCircle() {
  if (!mgState || !mgState.running) return;
  const canvas = document.getElementById('minigame-canvas');
  const margin = 40;
  const x = margin + Math.random() * (canvas.width - margin * 2);
  const y = margin + Math.random() * (canvas.height - margin * 2);
  const maxR = 38;
  const minR = 10;
  const duration = 2200;
  const rarity = mgState.fish.rarity;

  mgState.circles.push({
    x, y, r: maxR, maxR, minR, duration,
    born: performance.now(),
    dead: false,
    color: RARITY_COLORS[rarity],
  });
}

function onMgClick(e) {
  if (!mgState || !mgState.running) return;
  const canvas = document.getElementById('minigame-canvas');
  const rect = canvas.getBoundingClientRect();
  const cx = (e.clientX - rect.left) * (canvas.width / rect.width);
  const cy = (e.clientY - rect.top) * (canvas.height / rect.height);

  let hit = false;
  for (let i = mgState.circles.length - 1; i >= 0; i--) {
    const c = mgState.circles[i];
    if (c.dead) continue;
    const dist = Math.hypot(cx - c.x, cy - c.y);
    if (dist <= c.r + 4) {
      c.dead = true;
      hit = true;
      mgState.hits++;
      document.getElementById('mg-hits').textContent = mgState.hits;
      document.getElementById('minigame-progress-fill').style.width =
        Math.min(100, (mgState.hits / mgState.needed) * 100) + '%';
      spawnHitEffect(c.x, c.y, c.color);
      if (mgState.hits >= mgState.needed) { endMinigame(true); return; }
      break;
    }
  }

  // Ripple on miss
  if (!hit) {
    spawnMissEffect(cx, cy);
  }
}

function spawnHitEffect(x, y, color) {
  if (!mgState) return;
  mgState.circles.push({ x, y, r: 6, maxR: 45, minR: 6, duration: 400, born: performance.now(), dead: false, color, isEffect: true, expanding: true });
}

function spawnMissEffect(x, y) {
  if (!mgState) return;
  mgState.circles.push({ x, y, r: 4, maxR: 20, minR: 4, duration: 250, born: performance.now(), dead: false, color: 'rgba(255,100,100,0.6)', isEffect: true, expanding: true, isMiss: true });
}

function renderMg() {
  if (!mgState) return;
  const canvas = document.getElementById('minigame-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // Draw ocean background
  const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W/2);
  grad.addColorStop(0, 'rgba(13,52,89,0.8)');
  grad.addColorStop(1, 'rgba(3,11,20,0.9)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(W/2, H/2, W/2, 0, Math.PI*2);
  ctx.fill();

  // Clip to circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(W/2, H/2, W/2 - 2, 0, Math.PI*2);
  ctx.clip();

  const now = performance.now();

  // Timer arc
  const timerPct = mgState.timeLeft / mgState.maxTime;
  ctx.save();
  ctx.beginPath();
  ctx.arc(W/2, H/2, W/2 - 4, -Math.PI/2, -Math.PI/2 + timerPct * Math.PI * 2);
  ctx.strokeStyle = timerPct > 0.4 ? 'rgba(78,205,196,0.6)' : 'rgba(255,80,80,0.8)';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();

  // Draw circles
  mgState.circles = mgState.circles.filter(c => {
    const age = now - c.born;
    if (c.isEffect) {
      if (age > c.duration) return false;
      const progress = age / c.duration;
      const r = c.r + (c.maxR - c.r) * progress;
      const alpha = 1 - progress;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI*2);
      ctx.strokeStyle = c.color.replace(')', `,${alpha})`).replace('rgb', 'rgba');
      ctx.lineWidth = 2;
      ctx.stroke();
      return true;
    }
    if (c.dead || age > c.duration) return false;
    const progress = age / c.duration;
    const r = c.maxR - (c.maxR - c.minR) * progress;
    const alpha = progress < 0.8 ? 1 : 1 - (progress - 0.8) / 0.2;

    // Outer ring (fades as time runs out)
    ctx.beginPath();
    ctx.arc(c.x, c.y, r + 12 * (1-progress), 0, Math.PI*2);
    ctx.strokeStyle = `${c.color}${Math.floor(alpha * 50).toString(16).padStart(2,'0')}`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main circle
    const grd = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
    grd.addColorStop(0, c.color + 'aa');
    grd.addColorStop(0.6, c.color + '44');
    grd.addColorStop(1, c.color + '00');
    ctx.beginPath();
    ctx.arc(c.x, c.y, r, 0, Math.PI*2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(c.x, c.y, r, 0, Math.PI*2);
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = alpha;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Inner dot
    ctx.beginPath();
    ctx.arc(c.x, c.y, 4, 0, Math.PI*2);
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = alpha * 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;

    return true;
  });

  ctx.restore();

  if (mgState.running) requestAnimationFrame(renderMg);
}

function endMinigame(success) {
  if (!mgState || !mgState.running) return;
  mgState.running = false;
  clearInterval(mgState.timerId);
  clearInterval(mgState.spawnId);

  const canvas = document.getElementById('minigame-canvas');
  canvas.removeEventListener('pointerdown', onMgClick);

  const overlay = document.getElementById('minigame-overlay');
  overlay.classList.remove('active');

  document.getElementById('fish-line').style.height = '0';

  if (success) {
    catchFish(mgState.fish);
  } else {
    fishingState = 'idle';
    document.getElementById('cast-btn').style.display = '';
    document.getElementById('status-text').style.display = 'block';
    setStatus('The fish got away… Try again!');
    showToast('Got away! 😤');
  }

  mgState = null;
}

function catchFish(fish) {
  fishingState = 'result';

  // Add to inventory
  state.inventory[fish.id] = (state.inventory[fish.id] || 0) + 1;
  state.totalCaught++;

  // Show result
  document.getElementById('cast-btn').style.display = 'none';
  document.getElementById('status-text').style.display = 'none';

  const result = document.getElementById('catch-result');
  result.classList.add('active');

  document.getElementById('cr-emoji').textContent = fish.emoji;
  document.getElementById('cr-emoji').style.color = RARITY_COLORS[fish.rarity];

  const nameEl = document.getElementById('cr-name');
  nameEl.textContent = fish.name;
  nameEl.style.color = RARITY_COLORS[fish.rarity];

  const rarityEl = document.getElementById('cr-rarity');
  rarityEl.textContent = RARITY_LABELS[fish.rarity];
  rarityEl.style.color = RARITY_COLORS[fish.rarity];

  document.getElementById('cr-value').textContent = `Worth ${formatNum(fish.value)} gold`;
  document.getElementById('cr-desc').textContent = fish.desc;

  showToast(`${fish.emoji} ${fish.name} — ${RARITY_LABELS[fish.rarity]}!`);
  saveState();
  updateHeader();
}

// ============================================================
// INVENTORY
// ============================================================
function renderInventory() {
  const grid = document.getElementById('fish-grid');
  grid.innerHTML = '';

  const fishCaught = FISH.filter(f => state.inventory[f.id] > 0);

  if (fishCaught.length === 0) {
    grid.innerHTML = '<div class="empty-state">No fish yet. Head to the fishing dock!</div>';
    return;
  }

  // Sort by rarity then value
  const order = ['mythic','legendary','epic','rare','uncommon','common'];
  fishCaught.sort((a, b) => {
    const ai = order.indexOf(a.rarity), bi = order.indexOf(b.rarity);
    return ai !== bi ? ai - bi : b.value - a.value;
  });

  for (const fish of fishCaught) {
    const count = state.inventory[fish.id] || 0;
    if (count === 0) continue;
    const card = document.createElement('div');
    card.className = 'fish-card';
    card.style.setProperty('--rarity-color', RARITY_COLORS[fish.rarity]);
    card.innerHTML = `
      <div class="emoji">${fish.emoji}</div>
      <div class="name">${fish.name}</div>
      <div class="count" style="color:${RARITY_COLORS[fish.rarity]}">×${count}</div>
      <div class="value">${formatNum(fish.value)}g each</div>
      <button class="sell-btn" onclick="sellFish('${fish.id}')">Sell</button>
    `;
    grid.appendChild(card);
  }
}

function sellFish(id) {
  const fish = FISH.find(f => f.id === id);
  const count = state.inventory[id] || 0;
  if (!fish || count === 0) return;
  state.inventory[id] = 0;
  const earned = fish.value * count;
  state.gold += earned;
  state.totalEarned += earned;
  showToast(`Sold ${count}× ${fish.name} for ${formatNum(earned)}g`);
  saveState();
  updateHeader();
  renderInventory();
}

function sellAll() {
  let total = 0;
  for (const [id, count] of Object.entries(state.inventory)) {
    if (count > 0) {
      const fish = FISH.find(f => f.id === id);
      if (fish) { total += fish.value * count; state.inventory[id] = 0; }
    }
  }
  state.gold += total;
  state.totalEarned += total;
  showToast(`Sold all fish for ${formatNum(total)}g! 💰`);
  saveState();
  updateHeader();
  renderInventory();
}

// ============================================================
// SHOP
// ============================================================
function renderShop() {
  const grid = document.getElementById('rods-grid');
  grid.innerHTML = '';

  for (const rod of RODS) {
    const owned = state.ownedRods.includes(rod.id);
    const equipped = state.equippedRod === rod.id;
    const card = document.createElement('div');
    card.className = `rod-card ${owned ? 'owned' : ''} ${equipped ? 'equipped' : ''}`;

    let actionHtml;
    if (equipped) {
      actionHtml = `<button class="rod-action equipped-lbl" disabled>✓ Equipped</button>`;
    } else if (owned) {
      actionHtml = `<button class="rod-action equip" onclick="equipRod('${rod.id}')">Equip</button>`;
    } else {
      const canAfford = state.gold >= rod.price;
      actionHtml = `
        <div class="rod-price">${formatNum(rod.price)} gold</div>
        <button class="rod-action buy" onclick="buyRod('${rod.id}')" ${canAfford ? '' : 'disabled'}>
          ${canAfford ? 'Buy' : 'Need '+formatNum(rod.price)+'g'}
        </button>`;
    }

    card.innerHTML = `
      <div class="rod-icon">${rod.emoji}</div>
      <div class="rod-name">${rod.name}</div>
      <div class="rod-desc">${rod.desc}</div>
      <div class="rod-stats">
        <div class="rod-stat">Luck ×${rod.luck.toFixed(1)}</div>
        <div class="rod-stat">Speed ×${rod.speed.toFixed(1)}</div>
        <div class="rod-stat">+${(rod.rareBonus*100).toFixed(0)}% Rare</div>
      </div>
      ${actionHtml}
    `;
    grid.appendChild(card);
  }
}

function buyRod(id) {
  const rod = RODS.find(r => r.id === id);
  if (!rod || state.gold < rod.price) { showToast('Not enough gold!'); return; }
  state.gold -= rod.price;
  state.ownedRods.push(id);
  state.equippedRod = id;
  saveState();
  updateHeader();
  renderShop();
  showToast(`${rod.emoji} ${rod.name} acquired!`);
}

function equipRod(id) {
  state.equippedRod = id;
  saveState();
  updateHeader();
  renderShop();
  const rod = RODS.find(r => r.id === id);
  showToast(`${rod.emoji} ${rod.name} equipped!`);
}

// ============================================================
// LEADERBOARD (shared artifact storage)
// ============================================================
async function loadLeaderboard() {
  const list = document.getElementById('lb-list');
  list.innerHTML = '<div class="empty-state">Loading rankings…</div>';

  try {
    const result = await window.storage.list('lb:');
    const keys = result?.keys || [];
    const entries = [];

    for (const key of keys) {
      try {
        const r = await window.storage.get(key, true);
        if (r?.value) {
          const data = JSON.parse(r.value);
          entries.push(data);
        }
      } catch(e) {}
    }

    entries.sort((a, b) => b.score - a.score);
    renderLeaderboard(entries);
  } catch(e) {
    list.innerHTML = '<div class="empty-state">Could not load rankings.</div>';
  }
}

function renderLeaderboard(entries) {
  const list = document.getElementById('lb-list');
  list.innerHTML = '';

  if (entries.length === 0) {
    list.innerHTML = '<div class="empty-state">No scores yet. Be the first to submit!</div>';
    return;
  }

  const myName = localStorage.getItem('dnl_name');

  entries.forEach((e, i) => {
    const entry = document.createElement('div');
    const isMe = myName && e.name === myName;
    entry.className = `lb-entry ${isMe ? 'me' : ''}`;

    let rankHtml;
    if (i === 0) rankHtml = `<div class="lb-rank gold">①</div>`;
    else if (i === 1) rankHtml = `<div class="lb-rank silver">②</div>`;
    else if (i === 2) rankHtml = `<div class="lb-rank bronze">③</div>`;
    else rankHtml = `<div class="lb-rank other">#${i+1}</div>`;

    entry.innerHTML = `
      ${rankHtml}
      <div>
        <div class="lb-name">${escHtml(e.name)} ${isMe ? '<span style="color:var(--gold);font-size:0.7rem">(you)</span>' : ''}</div>
        <div class="lb-detail">${formatNum(e.caught)} fish · ${escHtml(e.rod || '?')}</div>
      </div>
      <div class="lb-score">${formatNum(e.score)}g</div>
    `;
    list.appendChild(entry);
  });
}

async function submitScore() {
  const nameInput = document.getElementById('lb-name-input');
  const name = nameInput.value.trim();
  if (!name) { showToast('Enter your angler name!'); return; }

  localStorage.setItem('dnl_name', name);

  const rod = RODS.find(r => r.id === state.equippedRod);
  const payload = {
    name,
    score: netWorth(),
    caught: state.totalCaught,
    rod: rod?.name || '?',
    ts: Date.now(),
  };

  try {
    const key = `lb:${name.toLowerCase().replace(/[^a-z0-9]/g,'_')}`;
    await window.storage.set(key, JSON.stringify(payload), true);
    showToast('Score submitted! 🏆');
    loadLeaderboard();
  } catch(e) {
    showToast('Submission failed.');
  }
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ============================================================
// UI HELPERS
// ============================================================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach((el, i) => {
    const tabs = ['fishing','inventory','shop','leaderboard'];
    el.classList.toggle('active', tabs[i] === tab);
  });
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(tab + '-panel').classList.add('active');

  if (tab === 'inventory') renderInventory();
  if (tab === 'shop') renderShop();
  if (tab === 'leaderboard') loadLeaderboard();
}

// ============================================================
// INIT
// ============================================================
loadState();
initBackground();
initFishingBg();
updateHeader();
</script>

</body>
</html>
