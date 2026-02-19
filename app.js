const AUTH_USER = "demo.user";
const AUTH_SALT = "Lakeland-FinDash-2026";
const AUTH_HASH = "f5d6de5476717c616a5e7ccaf61e54800ba0d1599f1ded0feb9b28dd2d8bae54";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000;
const SESSION_MS = 45 * 60 * 1000;
const LIVE_REFRESH_MS = 60 * 1000;
const WATCHLISTS_KEY = "finDashWatchlists";
const ACTIVE_WATCHLIST_KEY = "finDashActiveWatchlist";
const ADVISOR_SETTINGS_KEY = "finDashAdvisorSettings";
const STRATEGY_LAB_KEY = "finDashStrategyLab";
const PORTFOLIO_KEY = "finDashPortfolio";
const PORTFOLIO_IMPORT_KEY = "finDashPortfolioImportApiKey";

const STOCKS = [
  { symbol: "AAPL", company: "Apple", category: "TECH", exchange: "NASDAQ", price: 228.74, dayPct: 0.94, ytdPct: 19.8, pe: 32.1, marketCap: 3560, volume: 58300000, trend: [220, 222, 223, 224, 225, 227, 228.74] },
  { symbol: "MSFT", company: "Microsoft", category: "TECH", exchange: "NASDAQ", price: 467.38, dayPct: 0.51, ytdPct: 16.4, pe: 37.8, marketCap: 3470, volume: 27800000, trend: [451, 455, 457, 460, 462, 465, 467.38] },
  { symbol: "AMZN", company: "Amazon", category: "TECH", exchange: "NASDAQ", price: 201.45, dayPct: -0.22, ytdPct: 11.7, pe: 56.5, marketCap: 2110, volume: 41100000, trend: [192, 194, 197, 199, 200, 202, 201.45] },
  { symbol: "GOOGL", company: "Alphabet", category: "TECH", exchange: "NASDAQ", price: 196.6, dayPct: 1.13, ytdPct: 14.6, pe: 27.9, marketCap: 2400, volume: 23900000, trend: [187, 188, 190, 191, 193, 195, 196.6] },
  { symbol: "META", company: "Meta", category: "TECH", exchange: "NASDAQ", price: 613.29, dayPct: -0.44, ytdPct: 23.7, pe: 33.4, marketCap: 1560, volume: 16700000, trend: [586, 590, 595, 602, 607, 614, 613.29] },

  { symbol: "NVDA", company: "NVIDIA", category: "CHIPS", exchange: "NASDAQ", price: 129.34, dayPct: 1.66, ytdPct: 30.1, pe: 62.5, marketCap: 3160, volume: 331000000, trend: [114, 116, 118, 122, 125, 127, 129.34] },
  { symbol: "AMD", company: "Advanced Micro Devices", category: "CHIPS", exchange: "NASDAQ", price: 178.14, dayPct: 1.07, ytdPct: 17.9, pe: 50.2, marketCap: 288, volume: 57200000, trend: [166, 168, 171, 173, 175, 177, 178.14] },
  { symbol: "TSM", company: "Taiwan Semiconductor", category: "CHIPS", exchange: "NYSE", price: 177.88, dayPct: -0.29, ytdPct: 24.2, pe: 25.7, marketCap: 922, volume: 14900000, trend: [166, 169, 172, 173, 175, 178, 177.88] },
  { symbol: "AVGO", company: "Broadcom", category: "CHIPS", exchange: "NASDAQ", price: 1488.5, dayPct: 0.89, ytdPct: 27.2, pe: 46.9, marketCap: 690, volume: 4100000, trend: [1382, 1404, 1428, 1450, 1462, 1475, 1488.5] },
  { symbol: "INTC", company: "Intel", category: "CHIPS", exchange: "NASDAQ", price: 42.91, dayPct: -1.2, ytdPct: -8.5, pe: 22.8, marketCap: 182, volume: 54300000, trend: [47, 46.5, 45.8, 44.4, 44, 43.5, 42.91] },

  { symbol: "TSLA", company: "Tesla", category: "VEHICLES", exchange: "NASDAQ", price: 219.08, dayPct: -0.89, ytdPct: -5.9, pe: 63.4, marketCap: 702, volume: 109000000, trend: [228, 226, 225, 223, 222, 220, 219.08] },
  { symbol: "TM", company: "Toyota", category: "VEHICLES", exchange: "NYSE", price: 250.63, dayPct: 0.21, ytdPct: 9.2, pe: 10.1, marketCap: 344, volume: 2200000, trend: [238, 240, 243, 246, 248, 249, 250.63] },
  { symbol: "GM", company: "General Motors", category: "VEHICLES", exchange: "NYSE", price: 48.37, dayPct: 0.67, ytdPct: 13.8, pe: 5.3, marketCap: 54, volume: 12900000, trend: [44, 44.7, 45.5, 46.2, 47, 47.6, 48.37] },
  { symbol: "F", company: "Ford", category: "VEHICLES", exchange: "NYSE", price: 12.76, dayPct: -0.16, ytdPct: 3.1, pe: 7.2, marketCap: 51, volume: 47900000, trend: [12.1, 12.2, 12.35, 12.42, 12.55, 12.7, 12.76] },
  { symbol: "RIVN", company: "Rivian", category: "VEHICLES", exchange: "NASDAQ", price: 17.62, dayPct: 1.42, ytdPct: 7.5, pe: null, marketCap: 18, volume: 36600000, trend: [15.9, 16.1, 16.3, 16.8, 17.1, 17.4, 17.62] }
];

const DEFAULT_WATCHLISTS = [
  {
    id: "wl-starter",
    name: "Starter Watchlist",
    symbols: ["AAPL", "NVDA", "TSLA"]
  }
];

const FACTOR_LIBRARY = [
  { id: "momentum", name: "Momentum", note: "Day move + short trend acceleration." },
  { id: "trend", name: "Trend", note: "YTD directional quality." },
  { id: "breadth", name: "Breadth", note: "How many symbols are green today." },
  { id: "valuation", name: "Valuation", note: "P/E risk balance." },
  { id: "liquidity", name: "Liquidity", note: "Average tradable depth." },
  { id: "concentration", name: "Concentration", note: "Diversification across symbols." }
];

function loadWatchlists() {
  try {
    const raw = JSON.parse(localStorage.getItem(WATCHLISTS_KEY) || "[]");
    if (!Array.isArray(raw) || !raw.length) {
      return structuredClone(DEFAULT_WATCHLISTS);
    }

    const cleaned = raw
      .filter((w) => w && typeof w.id === "string" && typeof w.name === "string" && Array.isArray(w.symbols))
      .map((w) => ({
        id: w.id,
        name: w.name.trim() || "Watchlist",
        symbols: Array.from(new Set(w.symbols.filter((sym) => typeof sym === "string")))
      }));

    return cleaned.length ? cleaned : structuredClone(DEFAULT_WATCHLISTS);
  } catch {
    return structuredClone(DEFAULT_WATCHLISTS);
  }
}

function loadAdvisorSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem(ADVISOR_SETTINGS_KEY) || "{}");
    return {
      risk: ["CONSERVATIVE", "BALANCED", "AGGRESSIVE"].includes(raw.risk) ? raw.risk : "BALANCED",
      accountType: ["TAXABLE", "RETIREMENT"].includes(raw.accountType) ? raw.accountType : "TAXABLE",
      taxBracket: [12, 22, 24, 32, 37].includes(Number(raw.taxBracket)) ? Number(raw.taxBracket) : 24
    };
  } catch {
    return { risk: "BALANCED", accountType: "TAXABLE", taxBracket: 24 };
  }
}

function loadStrategyLabState() {
  const defaultActive = ["momentum", "trend", "breadth", "valuation"];
  const allIds = FACTOR_LIBRARY.map((f) => f.id);
  const defaultLibrary = allIds.filter((id) => !defaultActive.includes(id));
  const defaultWeights = Object.fromEntries(allIds.map((id) => [id, 50]));

  try {
    const raw = JSON.parse(localStorage.getItem(STRATEGY_LAB_KEY) || "{}");
    const activeIds = Array.isArray(raw.activeFactorIds) ? raw.activeFactorIds.filter((id) => allIds.includes(id)) : defaultActive;
    const libraryIds = Array.isArray(raw.libraryFactorIds) ? raw.libraryFactorIds.filter((id) => allIds.includes(id) && !activeIds.includes(id)) : defaultLibrary;
    const missing = allIds.filter((id) => !activeIds.includes(id) && !libraryIds.includes(id));
    const weights = { ...defaultWeights, ...(raw.weights || {}) };
    return {
      activeFactorIds: [...new Set(activeIds)],
      libraryFactorIds: [...new Set([...libraryIds, ...missing])],
      weights
    };
  } catch {
    return {
      activeFactorIds: defaultActive,
      libraryFactorIds: defaultLibrary,
      weights: defaultWeights
    };
  }
}

function loadPortfolio() {
  try {
    const raw = JSON.parse(localStorage.getItem(PORTFOLIO_KEY) || "[]");
    if (!Array.isArray(raw)) {
      return [];
    }
    return raw
      .filter((h) => h && typeof h.symbol === "string")
      .map((h) => ({
        symbol: h.symbol,
        shares: Math.max(0, Number(h.shares || 0)),
        costBasis: Math.max(0, Number(h.costBasis || 0))
      }))
      .filter((h) => h.shares > 0);
  } catch {
    return [];
  }
}

const state = {
  stocks: structuredClone(STOCKS),
  selectedSymbol: "NVDA",
  dataMode: localStorage.getItem("finDashDataMode") || "LIVE",
  lastUpdated: null,
  liveError: "",
  watchlists: loadWatchlists(),
  activeWatchlistId: localStorage.getItem(ACTIVE_WATCHLIST_KEY) || "ALL",
  advisor: loadAdvisorSettings(),
  strategyLab: loadStrategyLabState(),
  portfolio: loadPortfolio()
};

const authCard = document.getElementById("authCard");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const authMessage = document.getElementById("authMessage");
const logoutBtn = document.getElementById("logoutBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPage = document.getElementById("settingsPage");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const strategyLabBtn = document.getElementById("strategyLabBtn");
const strategyLabPage = document.getElementById("strategyLabPage");
const closeStrategyLabBtn = document.getElementById("closeStrategyLabBtn");
const portfolioBtn = document.getElementById("portfolioBtn");
const portfolioPage = document.getElementById("portfolioPage");
const closePortfolioBtn = document.getElementById("closePortfolioBtn");
const clock = document.getElementById("sessionClock");
const marketStatus = document.getElementById("marketStatus");
const stockTableBody = document.getElementById("stockTableBody");
const kpiGrid = document.getElementById("kpiGrid");
const selectedStockEl = document.getElementById("selectedStock");
const predictorCard = document.getElementById("predictorCard");
const watchlistSymbols = document.getElementById("watchlistSymbols");

const sectorFilter = document.getElementById("sectorFilter");
const exchangeFilter = document.getElementById("exchangeFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");
const dataMode = document.getElementById("dataMode");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKeyBtn = document.getElementById("saveApiKeyBtn");
const refreshBtn = document.getElementById("refreshBtn");
const portfolioApiKeyInput = document.getElementById("portfolioApiKeyInput");
const savePortfolioApiKeyBtn = document.getElementById("savePortfolioApiKeyBtn");
const importPortfolioBtn = document.getElementById("importPortfolioBtn");

const watchlistSelect = document.getElementById("watchlistSelect");
const watchlistNameInput = document.getElementById("watchlistNameInput");
const createWatchlistBtn = document.getElementById("createWatchlistBtn");
const renameWatchlistBtn = document.getElementById("renameWatchlistBtn");
const deleteWatchlistBtn = document.getElementById("deleteWatchlistBtn");
const riskProfileSelect = document.getElementById("riskProfileSelect");
const accountTypeSelect = document.getElementById("accountTypeSelect");
const taxBracketSelect = document.getElementById("taxBracketSelect");
const advisorOutput = document.getElementById("advisorOutput");
const factorLibraryZone = document.getElementById("factorLibraryZone");
const activeSignalsZone = document.getElementById("activeSignalsZone");
const predictionScoreValue = document.getElementById("predictionScoreValue");
const consolidationScoreValue = document.getElementById("consolidationScoreValue");
const strategySignalSummary = document.getElementById("strategySignalSummary");
const strategyStockList = document.getElementById("strategyStockList");
const portfolioSymbolSelect = document.getElementById("portfolioSymbolSelect");
const portfolioSharesInput = document.getElementById("portfolioSharesInput");
const portfolioCostInput = document.getElementById("portfolioCostInput");
const addPortfolioHoldingBtn = document.getElementById("addPortfolioHoldingBtn");
const portfolioTableBody = document.getElementById("portfolioTableBody");
const portfolioSummary = document.getElementById("portfolioSummary");

const lockState = () => JSON.parse(localStorage.getItem("lockState") || "{\"attempts\":0,\"until\":0}");

const setLockState = (attempts, until) => {
  localStorage.setItem("lockState", JSON.stringify({ attempts, until }));
};

const setSession = () => {
  localStorage.setItem("finDashSession", String(Date.now() + SESSION_MS));
};

const isSessionValid = () => {
  const expiresAt = Number(localStorage.getItem("finDashSession") || 0);
  return Date.now() < expiresAt;
};

const clearSession = () => {
  localStorage.removeItem("finDashSession");
};

const getApiKey = () => localStorage.getItem("finDashFinnhubKey") || "";

const saveApiKey = (key) => {
  if (!key) {
    localStorage.removeItem("finDashFinnhubKey");
    return;
  }
  localStorage.setItem("finDashFinnhubKey", key);
};

function persistWatchlists() {
  localStorage.setItem(WATCHLISTS_KEY, JSON.stringify(state.watchlists));
}

function setActiveWatchlist(id) {
  state.activeWatchlistId = id;
  localStorage.setItem(ACTIVE_WATCHLIST_KEY, id);
}

function getActiveWatchlist() {
  if (state.activeWatchlistId === "ALL") {
    return null;
  }
  return state.watchlists.find((w) => w.id === state.activeWatchlistId) || null;
}

function getWatchlistStocks() {
  const active = getActiveWatchlist();
  if (!active) {
    return state.stocks;
  }
  return state.stocks.filter((s) => active.symbols.includes(s.symbol));
}

function isSymbolInActiveWatchlist(symbol) {
  const active = getActiveWatchlist();
  if (!active) {
    return false;
  }
  return active.symbols.includes(symbol);
}

function addSymbolToActiveWatchlist(symbol) {
  const active = getActiveWatchlist();
  if (!active) {
    return;
  }

  if (!active.symbols.includes(symbol)) {
    active.symbols.push(symbol);
    persistWatchlists();
  }

  renderWatchlistControls();
  render();
}

function createWatchlist() {
  const desired = watchlistNameInput.value.trim();
  const name = desired || `Watchlist ${state.watchlists.length + 1}`;
  const id = `wl-${Date.now()}`;
  state.watchlists.push({ id, name, symbols: [] });
  persistWatchlists();
  setActiveWatchlist(id);
  renderWatchlistControls();
  render();
}

function renameWatchlist() {
  const active = getActiveWatchlist();
  if (!active) {
    return;
  }

  const nextName = watchlistNameInput.value.trim();
  if (!nextName) {
    return;
  }

  active.name = nextName;
  persistWatchlists();
  renderWatchlistControls();
}

function deleteWatchlist() {
  const active = getActiveWatchlist();
  if (!active) {
    return;
  }

  state.watchlists = state.watchlists.filter((w) => w.id !== active.id);
  if (!state.watchlists.length) {
    state.watchlists = structuredClone(DEFAULT_WATCHLISTS);
  }

  persistWatchlists();
  setActiveWatchlist("ALL");
  renderWatchlistControls();
  render();
}

function renderWatchlistControls() {
  const options = ['<option value="ALL">All Symbols</option>'];
  options.push(...state.watchlists.map((w) => `<option value="${w.id}">${w.name} (${w.symbols.length})</option>`));
  watchlistSelect.innerHTML = options.join("");

  const hasActive = state.activeWatchlistId === "ALL" || state.watchlists.some((w) => w.id === state.activeWatchlistId);
  if (!hasActive) {
    setActiveWatchlist("ALL");
  }

  watchlistSelect.value = state.activeWatchlistId;

  const active = getActiveWatchlist();
  if (document.activeElement !== watchlistNameInput) {
    watchlistNameInput.value = active ? active.name : "";
  }
  renameWatchlistBtn.disabled = !active;
  deleteWatchlistBtn.disabled = !active;
}

function predictorForStocks(stocks) {
  if (!stocks.length) {
    return {
      label: "No Signal",
      className: "neutral",
      confidence: 0,
      projectedMove: 0,
      rationale: "Add symbols to this watchlist to generate a predictor."
    };
  }

  const avgDay = stocks.reduce((sum, s) => sum + s.dayPct, 0) / stocks.length;
  const avgYtd = stocks.reduce((sum, s) => sum + s.ytdPct, 0) / stocks.length;
  const avgMomentum = stocks.reduce((sum, s) => {
    const first = s.trend[0] || s.price;
    const last = s.trend[s.trend.length - 1] || s.price;
    return sum + ((last - first) / first) * 100;
  }, 0) / stocks.length;

  const score = avgDay * 0.5 + avgYtd * 0.2 + avgMomentum * 0.3;
  const projectedMove = score * 0.35;
  const confidence = Math.min(95, Math.max(52, 58 + Math.abs(score) * 2.8));

  if (score > 3.5) {
    return {
      label: "Bullish Bias",
      className: "bull",
      confidence,
      projectedMove,
      rationale: "Broad positive momentum across day change, YTD trend, and short-range price action."
    };
  }

  if (score > 1) {
    return {
      label: "Positive Drift",
      className: "bull",
      confidence,
      projectedMove,
      rationale: "Mixed but net positive trend profile with moderate upside continuation."
    };
  }

  if (score < -3) {
    return {
      label: "Bearish Bias",
      className: "bear",
      confidence,
      projectedMove,
      rationale: "Persistent downside in day performance and momentum slope across symbols."
    };
  }

  if (score < -1) {
    return {
      label: "Negative Drift",
      className: "bear",
      confidence,
      projectedMove,
      rationale: "Softer tape with weak short-term momentum and cautious near-term outlook."
    };
  }

  return {
    label: "Neutral",
    className: "neutral",
    confidence,
    projectedMove,
    rationale: "Conflicting signals with no strong directional edge currently."
  };
}

function renderPredictor() {
  const active = getActiveWatchlist();
  const scopedStocks = getWatchlistStocks();
  const signal = predictorForStocks(scopedStocks);

  const watchlistLabel = active ? active.name : "All Symbols";
  predictorCard.innerHTML = `
    <p class="predictor-kicker">Performance Predictor</p>
    <p class="predictor-title">${watchlistLabel}: <span class="signal ${signal.className}">${signal.label}</span></p>
    <p class="predictor-meta">Confidence: ${signal.confidence.toFixed(0)}% | Projected next-session move: ${fmtPct(signal.projectedMove)}</p>
    <p class="predictor-note">${signal.rationale}</p>
  `;

  if (!scopedStocks.length) {
    watchlistSymbols.innerHTML = '<span class="symbol-pill">No symbols yet</span>';
    return;
  }

  watchlistSymbols.innerHTML = scopedStocks
    .map((s) => `<span class="symbol-pill ${s.dayPct >= 0 ? "up" : "down"}">${s.symbol} ${fmtPct(s.dayPct)}</span>`)
    .join("");
}

function persistAdvisorSettings() {
  localStorage.setItem(ADVISOR_SETTINGS_KEY, JSON.stringify(state.advisor));
}

function persistStrategyLab() {
  localStorage.setItem(STRATEGY_LAB_KEY, JSON.stringify(state.strategyLab));
}

function persistPortfolio() {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(state.portfolio));
}

function getPortfolioImportApiKey() {
  return localStorage.getItem(PORTFOLIO_IMPORT_KEY) || "";
}

function savePortfolioImportApiKey(key) {
  if (!key) {
    localStorage.removeItem(PORTFOLIO_IMPORT_KEY);
    return;
  }
  localStorage.setItem(PORTFOLIO_IMPORT_KEY, key);
}

function findStock(symbol) {
  return state.stocks.find((s) => s.symbol === symbol);
}

function addPortfolioHolding(symbol, shares, costBasis = null) {
  const stock = findStock(symbol);
  if (!stock) {
    return;
  }

  const qty = Number(shares);
  if (!Number.isFinite(qty) || qty <= 0) {
    return;
  }

  const existing = state.portfolio.find((h) => h.symbol === symbol);
  const basis = costBasis === null || costBasis === "" ? stock.price : Number(costBasis);
  const validBasis = Number.isFinite(basis) && basis >= 0 ? basis : stock.price;

  if (existing) {
    const totalShares = existing.shares + qty;
    existing.costBasis = ((existing.costBasis * existing.shares) + (validBasis * qty)) / totalShares;
    existing.shares = totalShares;
  } else {
    state.portfolio.push({ symbol, shares: qty, costBasis: validBasis });
  }

  persistPortfolio();
  renderPortfolio();
}

function removePortfolioHolding(symbol) {
  state.portfolio = state.portfolio.filter((h) => h.symbol !== symbol);
  persistPortfolio();
  renderPortfolio();
}

function renderPortfolioSymbolSelect() {
  portfolioSymbolSelect.innerHTML = state.stocks
    .map((s) => `<option value="${s.symbol}">${s.symbol} - ${s.company}</option>`)
    .join("");
}

function renderPortfolioSummary() {
  const rows = state.portfolio.map((h) => {
    const stock = findStock(h.symbol);
    const price = stock ? stock.price : 0;
    const value = price * h.shares;
    const pnl = (price - h.costBasis) * h.shares;
    return { value, pnl };
  });
  const totalValue = rows.reduce((sum, r) => sum + r.value, 0);
  const totalPnl = rows.reduce((sum, r) => sum + r.pnl, 0);
  portfolioSummary.innerHTML = `
    <div class="alloc-row"><span>Total Market Value</span><strong>${fmtCurrency(totalValue)}</strong></div>
    <div class="alloc-row"><span>Total Unrealized P/L</span><strong class="${totalPnl >= 0 ? "pos" : "neg"}">${fmtCurrency(totalPnl)}</strong></div>
    <div class="alloc-row"><span>Holdings</span><strong>${state.portfolio.length}</strong></div>
  `;
}

function renderPortfolio() {
  renderPortfolioSymbolSelect();
  renderPortfolioSummary();
  if (!state.portfolio.length) {
    portfolioTableBody.innerHTML = '<tr><td colspan="7">No holdings yet. Add your current portfolio.</td></tr>';
    return;
  }

  portfolioTableBody.innerHTML = state.portfolio.map((h) => {
    const stock = findStock(h.symbol);
    const price = stock ? stock.price : 0;
    const marketValue = price * h.shares;
    const pnl = (price - h.costBasis) * h.shares;
    return `
      <tr>
        <td><strong>${h.symbol}</strong></td>
        <td>${h.shares.toFixed(2)}</td>
        <td>${fmtCurrency(h.costBasis)}</td>
        <td>${fmtCurrency(price)}</td>
        <td>${fmtCurrency(marketValue)}</td>
        <td class="${pnl >= 0 ? "pos" : "neg"}">${fmtCurrency(pnl)}</td>
        <td><button type="button" class="secondary" data-remove-holding="${h.symbol}">Remove</button></td>
      </tr>
    `;
  }).join("");

  portfolioTableBody.querySelectorAll("[data-remove-holding]").forEach((btn) => {
    btn.addEventListener("click", () => removePortfolioHolding(btn.dataset.removeHolding));
  });
}

function importPortfolioFromApiKey() {
  const key = getPortfolioImportApiKey();
  if (!key) {
    return;
  }

  const seedStocks = getWatchlistStocks().slice(0, 5);
  seedStocks.forEach((s, idx) => {
    addPortfolioHolding(s.symbol, 8 + idx * 4, s.price * (0.92 + idx * 0.015));
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getFactorScores(stocks) {
  if (!stocks.length) {
    return {
      momentum: 0,
      trend: 0,
      breadth: 0,
      valuation: 0,
      liquidity: 0,
      concentration: 0
    };
  }

  const avgDay = stocks.reduce((sum, s) => sum + s.dayPct, 0) / stocks.length;
  const avgYtd = stocks.reduce((sum, s) => sum + s.ytdPct, 0) / stocks.length;
  const avgVol = stocks.reduce((sum, s) => sum + s.volume, 0) / stocks.length;
  const posPct = stocks.filter((s) => s.dayPct >= 0).length / stocks.length;

  const momentum7 = stocks.reduce((sum, s) => {
    const first = s.trend[0] || s.price;
    const last = s.trend[s.trend.length - 1] || s.price;
    return sum + ((last - first) / first) * 100;
  }, 0) / stocks.length;

  const peSet = stocks.filter((s) => s.pe !== null);
  const avgPe = peSet.length ? peSet.reduce((sum, s) => sum + s.pe, 0) / peSet.length : 24;

  const capTotal = stocks.reduce((sum, s) => sum + s.marketCap, 0) || 1;
  const topShare = Math.max(...stocks.map((s) => s.marketCap)) / capTotal;
  const dayRange = Math.max(...stocks.map((s) => s.dayPct)) - Math.min(...stocks.map((s) => s.dayPct));
  const dayStd = Math.sqrt(stocks.reduce((sum, s) => sum + ((s.dayPct - avgDay) ** 2), 0) / stocks.length);

  return {
    momentum: clamp(avgDay * 35 + momentum7 * 1.2, -100, 100),
    trend: clamp(avgYtd * 2, -100, 100),
    breadth: clamp((posPct * 200) - 100, -100, 100),
    valuation: clamp((24 - avgPe) * 3, -100, 100),
    liquidity: clamp(((avgVol / 25000000) - 1) * 70, -100, 100),
    concentration: clamp((0.35 - topShare) * 280 + clamp(100 - dayRange * 16 - dayStd * 18, -40, 40), -100, 100)
  };
}

function computeStrategyScores(stocks) {
  const factorScores = getFactorScores(stocks);
  const activeIds = state.strategyLab.activeFactorIds;
  if (!activeIds.length) {
    return { prediction: 0, consolidation: 50, summary: "Neutral", factorScores };
  }

  let totalWeight = 0;
  let weightedScore = 0;
  activeIds.forEach((id) => {
    const weight = clamp(Number(state.strategyLab.weights[id] || 50), 1, 100);
    totalWeight += weight;
    weightedScore += (factorScores[id] || 0) * weight;
  });

  const prediction = totalWeight ? clamp(weightedScore / totalWeight, -100, 100) : 0;

  const breadthStability = clamp(100 - Math.abs(factorScores.breadth) * 0.45, 0, 100);
  const consolidation = Math.round(clamp(
    ((factorScores.concentration + 100) / 2) * 0.55
      + ((factorScores.valuation + 100) / 2) * 0.15
      + breadthStability * 0.30,
    0,
    100
  ));

  let summary = "Neutral";
  if (prediction >= 28) {
    summary = "Bullish Setup";
  } else if (prediction <= -28) {
    summary = "Defensive / Bearish";
  } else if (consolidation >= 70) {
    summary = "Consolidation Breakout Watch";
  }

  return { prediction: Number(prediction.toFixed(1)), consolidation, summary, factorScores };
}

function strategyFactorCard(id, inActive, score) {
  const factor = FACTOR_LIBRARY.find((f) => f.id === id);
  if (!factor) {
    return "";
  }
  const weight = clamp(Number(state.strategyLab.weights[id] || 50), 1, 100);
  return `
    <article class="strategy-factor-card" draggable="true" data-factor-id="${id}">
      <div class="strategy-factor-row">
        <strong>${factor.name}</strong>
        <span class="strategy-factor-score">${score > 0 ? "+" : ""}${score.toFixed(1)}</span>
      </div>
      <p>${factor.note}</p>
      <button type="button" class="secondary strategy-factor-btn" data-factor-action="${inActive ? "remove" : "add"}" data-factor-id="${id}">
        ${inActive ? "Remove" : "Add"}
      </button>
      ${inActive ? `
        <label class="strategy-weight-label">
          Weight
          <input type="range" min="1" max="100" value="${weight}" data-factor-weight="${id}" />
        </label>
      ` : ""}
    </article>
  `;
}

function renderStrategyLab() {
  const scoped = getWatchlistStocks();
  const filtered = filteredStocks();
  const result = computeStrategyScores(scoped);

  predictionScoreValue.textContent = `${result.prediction > 0 ? "+" : ""}${result.prediction}`;
  consolidationScoreValue.textContent = `${result.consolidation}`;
  strategySignalSummary.textContent = result.summary;

  factorLibraryZone.innerHTML = state.strategyLab.libraryFactorIds
    .map((id) => strategyFactorCard(id, false, result.factorScores[id] || 0))
    .join("");

  activeSignalsZone.innerHTML = state.strategyLab.activeFactorIds
    .map((id) => strategyFactorCard(id, true, result.factorScores[id] || 0))
    .join("");

  strategyStockList.innerHTML = filtered.length
    ? filtered.map((s) => `
      <button type="button" class="secondary strategy-stock-btn" data-lab-add-stock="${s.symbol}">
        + ${s.symbol} (${fmtCurrency(s.price)})
      </button>
    `).join("")
    : '<span class="symbol-pill">No stocks in current filter</span>';

  bindStrategyLabEvents();
}

function bindStrategyLabEvents() {
  document.querySelectorAll(".strategy-factor-card[draggable='true']").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      const factorId = card.dataset.factorId;
      event.dataTransfer.setData("text/plain", factorId);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      factorLibraryZone.classList.remove("is-over");
      activeSignalsZone.classList.remove("is-over");
    });
  });

  document.querySelectorAll("[data-factor-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const factorId = btn.dataset.factorId;
      const action = btn.dataset.factorAction;
      moveFactor(factorId, action === "add");
    });
  });

  strategyStockList.querySelectorAll("[data-lab-add-stock]").forEach((btn) => {
    btn.addEventListener("click", () => {
      addPortfolioHolding(btn.dataset.labAddStock, 10);
      openPortfolioPage();
    });
  });
}

function moveFactor(factorId, toActive) {
  state.strategyLab.activeFactorIds = state.strategyLab.activeFactorIds.filter((id) => id !== factorId);
  state.strategyLab.libraryFactorIds = state.strategyLab.libraryFactorIds.filter((id) => id !== factorId);
  if (toActive) {
    state.strategyLab.activeFactorIds.push(factorId);
  } else {
    state.strategyLab.libraryFactorIds.push(factorId);
  }
  persistStrategyLab();
  renderStrategyLab();
}

function buildAdvisorRecommendation(stocks) {
  if (!stocks.length) {
    return {
      allocation: { cash: 40, etf: 45, stocks: 15 },
      taxTips: ["Add symbols to a watchlist to generate tailored guidance."],
      signals: { buy: [], hold: [], sell: [] }
    };
  }

  const baseByRisk = {
    CONSERVATIVE: { cash: 35, etf: 50, stocks: 15 },
    BALANCED: { cash: 20, etf: 45, stocks: 35 },
    AGGRESSIVE: { cash: 10, etf: 35, stocks: 55 }
  };

  const allocation = { ...baseByRisk[state.advisor.risk] };
  const avgDay = stocks.reduce((sum, s) => sum + s.dayPct, 0) / stocks.length;
  const avgYtd = stocks.reduce((sum, s) => sum + s.ytdPct, 0) / stocks.length;

  if (avgDay < -0.7 || avgYtd < -1.5) {
    allocation.cash += 8;
    allocation.stocks -= 6;
    allocation.etf -= 2;
  } else if (avgDay > 0.7 && avgYtd > 2) {
    allocation.cash -= 4;
    allocation.stocks += 4;
  }

  const total = allocation.cash + allocation.etf + allocation.stocks;
  allocation.cash = Math.max(5, Math.round((allocation.cash / total) * 100));
  allocation.etf = Math.max(15, Math.round((allocation.etf / total) * 100));
  allocation.stocks = Math.max(10, 100 - allocation.cash - allocation.etf);

  const taxTips = [];
  if (state.advisor.accountType === "TAXABLE") {
    taxTips.push("Prioritize ETFs for core exposure to reduce taxable distributions.");
    taxTips.push("Harvest losses on laggards to offset gains when possible.");
    taxTips.push("Target 1+ year holding periods for lower long-term capital gains rates.");
  } else {
    taxTips.push("Place higher-turnover or high-yield ideas in retirement accounts first.");
    taxTips.push("Max contributions before adding more taxable risk.");
    taxTips.push("Rebalance in retirement accounts to avoid taxable events.");
  }

  if (state.advisor.taxBracket >= 32) {
    taxTips.push("Higher bracket detected: emphasize tax-efficient ETFs and deferred gains.");
  }

  const scored = stocks.map((s) => {
    const momentum = ((s.trend[s.trend.length - 1] - s.trend[0]) / s.trend[0]) * 100;
    let score = s.dayPct * 0.4 + s.ytdPct * 0.3 + momentum * 0.3;
    if (typeof s.pe === "number" && s.pe > 55) {
      score -= 1.1;
    }
    return { symbol: s.symbol, score };
  });

  const signals = { buy: [], hold: [], sell: [] };
  scored.forEach((s) => {
    if (s.score > 5) {
      signals.buy.push(s.symbol);
    } else if (s.score < -2.5) {
      signals.sell.push(s.symbol);
    } else {
      signals.hold.push(s.symbol);
    }
  });

  return { allocation, taxTips, signals };
}

function renderAdvisor(stocks) {
  const { allocation, taxTips, signals } = buildAdvisorRecommendation(stocks);

  const renderSignalPills = (items, kind, fallback) =>
    items.length
      ? items.map((s) => `<span class="signal-pill ${kind}">${kind.toUpperCase()} ${s}</span>`).join("")
      : `<span class="signal-pill ${kind}">${fallback}</span>`;

  advisorOutput.innerHTML = `
    <div class="advisor-grid">
      <div>
        <p class="advisor-block-title">Allocation</p>
        <div class="alloc-row"><span>Cash</span><strong>${allocation.cash}%</strong></div>
        <div class="alloc-row"><span>ETFs</span><strong>${allocation.etf}%</strong></div>
        <div class="alloc-row"><span>Individual Stocks</span><strong>${allocation.stocks}%</strong></div>
      </div>
      <div>
        <p class="advisor-block-title">Tax Optimization</p>
        <ul class="mini-list">
          ${taxTips.map((tip) => `<li>${tip}</li>`).join("")}
        </ul>
      </div>
      <div>
        <p class="advisor-block-title">Buy / Hold / Sell</p>
        <div class="signal-list">
          ${renderSignalPills(signals.buy, "buy", "BUY none")}
          ${renderSignalPills(signals.hold.slice(0, 3), "hold", "HOLD none")}
          ${renderSignalPills(signals.sell, "sell", "SELL none")}
        </div>
      </div>
    </div>
    <p class="advisor-note">Educational model output only, not financial/tax/legal advice.</p>
  `;
}

async function sha256(text) {
  const encoded = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function fmtCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function fmtCompactBillions(value) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)}B`;
}

function fmtPct(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function fmtVol(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

function filteredStocks() {
  const sector = sectorFilter.value;
  const exchange = exchangeFilter.value;
  const term = searchInput.value.trim().toLowerCase();
  const sortBy = sortFilter.value;

  const active = getActiveWatchlist();

  const visible = state.stocks.filter((s) => {
    const sectorMatch = sector === "ALL" || s.category === sector;
    const exchangeMatch = exchange === "ALL" || s.exchange === exchange;
    const searchMatch = term.length === 0 || s.symbol.toLowerCase().includes(term) || s.company.toLowerCase().includes(term);
    const watchlistMatch = !active || active.symbols.includes(s.symbol);
    return sectorMatch && exchangeMatch && searchMatch && watchlistMatch;
  });

  visible.sort((a, b) => {
    if (sortBy === "pe") {
      const pa = a.pe ?? Number.POSITIVE_INFINITY;
      const pb = b.pe ?? Number.POSITIVE_INFINITY;
      return pa - pb;
    }

    return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
  });

  return visible;
}

function renderKpis(stocks) {
  if (!stocks.length) {
    kpiGrid.innerHTML = "";
    return;
  }

  const totalCap = stocks.reduce((sum, s) => sum + s.marketCap, 0);
  const peNames = stocks.filter((s) => s.pe !== null);
  const avgPE = peNames.length ? stocks.reduce((sum, s) => sum + (s.pe || 0), 0) / peNames.length : 0;
  const avgDay = stocks.reduce((sum, s) => sum + s.dayPct, 0) / stocks.length;
  const winner = [...stocks].sort((a, b) => b.dayPct - a.dayPct)[0];
  const loser = [...stocks].sort((a, b) => a.dayPct - b.dayPct)[0];

  const cards = [
    { label: "Total Market Cap", value: fmtCompactBillions(totalCap) },
    { label: "Average P/E", value: avgPE.toFixed(2) },
    { label: "Average Day %", value: fmtPct(avgDay) },
    { label: "Top Momentum", value: `${winner.symbol} ${fmtPct(winner.dayPct)}` },
    { label: "Lagging", value: `${loser.symbol} ${fmtPct(loser.dayPct)}` }
  ];

  kpiGrid.innerHTML = cards.map((c) => `
    <div class="kpi-card">
      <p class="kpi-label">${c.label}</p>
      <p class="kpi-value">${c.value}</p>
    </div>
  `).join("");
}

function renderTable(stocks) {
  if (!stocks.length) {
    stockTableBody.innerHTML = `<tr><td colspan="10">No data after current filters.</td></tr>`;
    selectedStockEl.innerHTML = "";
    drawSparkline([]);
    return;
  }

  if (!stocks.some((s) => s.symbol === state.selectedSymbol)) {
    state.selectedSymbol = stocks[0].symbol;
  }

  stockTableBody.innerHTML = stocks.map((s) => {
    const isActive = s.symbol === state.selectedSymbol ? "active" : "";
    const dayClass = s.dayPct >= 0 ? "pos" : "neg";
    const ytdClass = s.ytdPct >= 0 ? "pos" : "neg";
    const canAdd = state.activeWatchlistId !== "ALL";
    const isAdded = isSymbolInActiveWatchlist(s.symbol);

    return `
      <tr class="${isActive}" data-symbol="${s.symbol}">
        <td>
          <button class="add-symbol-btn" data-add-symbol="${s.symbol}" ${!canAdd || isAdded ? "disabled" : ""} title="${canAdd ? (isAdded ? "Already in watchlist" : "Add to active watchlist") : "Choose a watchlist first"}">${isAdded ? "Added" : "+"}</button>
        </td>
        <td><strong>${s.symbol}</strong></td>
        <td>${s.company}</td>
        <td>${s.category}</td>
        <td>${s.exchange}</td>
        <td>${fmtCurrency(s.price)}</td>
        <td class="${dayClass}">${fmtPct(s.dayPct)}</td>
        <td class="${ytdClass}">${fmtPct(s.ytdPct)}</td>
        <td>${s.pe === null ? "N/A" : s.pe.toFixed(1)}</td>
        <td>${fmtVol(s.volume)}</td>
      </tr>
    `;
  }).join("");

  stockTableBody.querySelectorAll("tr[data-symbol]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedSymbol = row.dataset.symbol;
      render();
    });
  });

  stockTableBody.querySelectorAll("button[data-add-symbol]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      addSymbolToActiveWatchlist(btn.dataset.addSymbol);
    });
  });

  renderSelected(stocks.find((s) => s.symbol === state.selectedSymbol));
}

function renderSelected(stock) {
  if (!stock) {
    selectedStockEl.innerHTML = "";
    drawSparkline([]);
    return;
  }

  const delta = stock.price - stock.trend[0];
  const deltaPct = (delta / stock.trend[0]) * 100;
  selectedStockEl.innerHTML = `
    <p class="stock-title">${stock.company} (${stock.symbol})</p>
    <p class="stock-meta">${stock.category} | ${stock.exchange} | Mkt Cap: ${fmtCompactBillions(stock.marketCap)}</p>
    <p class="stock-stats">Current: <strong>${fmtCurrency(stock.price)}</strong> | 7-tick move: <strong class="${deltaPct >= 0 ? "pos" : "neg"}">${fmtPct(deltaPct)}</strong></p>
    <p class="stock-stats">Day: <span class="${stock.dayPct >= 0 ? "pos" : "neg"}">${fmtPct(stock.dayPct)}</span> | YTD: <span class="${stock.ytdPct >= 0 ? "pos" : "neg"}">${fmtPct(stock.ytdPct)}</span> | P/E: ${stock.pe === null ? "N/A" : stock.pe.toFixed(1)}</p>
  `;

  drawSparkline(stock.trend);
}

function drawSparkline(points) {
  const canvas = document.getElementById("sparkline");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!points.length) {
    return;
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const pad = 22;

  ctx.beginPath();
  points.forEach((value, i) => {
    const x = pad + (i * (canvas.width - pad * 2)) / (points.length - 1);
    const y = canvas.height - pad - ((value - min) * (canvas.height - pad * 2)) / range;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#0c4a6e");
  gradient.addColorStop(1, "#047857");

  ctx.lineWidth = 3;
  ctx.strokeStyle = gradient;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width - pad, canvas.height - pad - ((points[points.length - 1] - min) * (canvas.height - pad * 2)) / range, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#047857";
  ctx.fill();
}

function simulateTick() {
  state.stocks = state.stocks.map((s) => {
    const move = (Math.random() - 0.46) * (s.price * 0.015);
    const nextPrice = Math.max(1, s.price + move);
    const nextDayPct = ((nextPrice - s.price) / s.price) * 100 + s.dayPct;
    const nextYtd = s.ytdPct + (Math.random() - 0.5) * 0.8;
    const nextVolume = Math.round(s.volume * (1 + (Math.random() - 0.45) * 0.06));
    const nextTrend = [...s.trend.slice(1), Number(nextPrice.toFixed(2))];

    return {
      ...s,
      price: Number(nextPrice.toFixed(2)),
      dayPct: Number(nextDayPct.toFixed(2)),
      ytdPct: Number(nextYtd.toFixed(2)),
      volume: nextVolume,
      trend: nextTrend
    };
  });

  state.lastUpdated = new Date();
  state.liveError = "";
  render();
}

async function fetchFinnhubQuote(symbol, apiKey) {
  const endpoint = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data || typeof data.c !== "number" || data.c <= 0) {
    throw new Error(`No quote for ${symbol}`);
  }

  return data;
}

async function refreshLiveData({ manual = false } = {}) {
  if (state.dataMode !== "LIVE") {
    if (manual) {
      simulateTick();
    }
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    state.liveError = "Live mode selected: add a Finnhub API key.";
    updateMarketStatus();
    if (manual) {
      simulateTick();
    }
    return;
  }

  try {
    refreshBtn.disabled = true;
    refreshBtn.textContent = "Refreshing...";

    const quoteEntries = await Promise.all(
      state.stocks.map(async (stock) => {
        const quote = await fetchFinnhubQuote(stock.symbol, apiKey);
        return [stock.symbol, quote];
      })
    );

    const quoteMap = Object.fromEntries(quoteEntries);

    state.stocks = state.stocks.map((stock) => {
      const quote = quoteMap[stock.symbol];
      if (!quote) {
        return stock;
      }

      const nextPrice = Number(quote.c.toFixed(2));
      const dayPct = typeof quote.dp === "number" ? quote.dp : ((quote.c - quote.pc) / quote.pc) * 100;
      const trend = [...stock.trend.slice(1), nextPrice];

      return {
        ...stock,
        price: nextPrice,
        dayPct: Number(dayPct.toFixed(2)),
        trend
      };
    });

    state.lastUpdated = new Date();
    state.liveError = "";
    render();
  } catch (error) {
    state.liveError = `Live fetch failed: ${error.message}.`;
    if (manual) {
      simulateTick();
    }
    updateMarketStatus();
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = "Refresh Data Now";
  }
}

function updateMarketStatus() {
  const timeLabel = state.lastUpdated
    ? state.lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "not yet";

  if (state.dataMode === "SIM") {
    marketStatus.textContent = `Data: Simulation | Updated ${timeLabel}`;
    return;
  }

  if (state.liveError) {
    marketStatus.textContent = `Data: Live Error | ${state.liveError}`;
    return;
  }

  marketStatus.textContent = `Data: Live (Finnhub) | Updated ${timeLabel}`;
}

function render() {
  const stocks = filteredStocks();
  renderWatchlistControls();
  renderKpis(stocks);
  renderAdvisor(stocks);
  renderTable(stocks);
  renderPredictor();
  renderStrategyLab();
  renderPortfolio();
  updateMarketStatus();
}

function showDashboard() {
  authCard.classList.add("hidden");
  dashboard.classList.remove("hidden");
  settingsPage.classList.add("hidden");
  strategyLabPage.classList.add("hidden");
  portfolioPage.classList.add("hidden");
  dashboard.setAttribute("aria-hidden", "false");
  settingsPage.setAttribute("aria-hidden", "true");
  strategyLabPage.setAttribute("aria-hidden", "true");
  portfolioPage.setAttribute("aria-hidden", "true");
  dataMode.value = state.dataMode;
  riskProfileSelect.value = state.advisor.risk;
  accountTypeSelect.value = state.advisor.accountType;
  taxBracketSelect.value = String(state.advisor.taxBracket);
  render();
  refreshLiveData();
}

function showLogin() {
  settingsPage.classList.add("hidden");
  settingsPage.setAttribute("aria-hidden", "true");
  strategyLabPage.classList.add("hidden");
  strategyLabPage.setAttribute("aria-hidden", "true");
  portfolioPage.classList.add("hidden");
  portfolioPage.setAttribute("aria-hidden", "true");
  dashboard.classList.add("hidden");
  dashboard.setAttribute("aria-hidden", "true");
  authCard.classList.remove("hidden");
}

function openSettings() {
  dashboard.classList.add("hidden");
  settingsPage.classList.remove("hidden");
  strategyLabPage.classList.add("hidden");
  portfolioPage.classList.add("hidden");
  dashboard.setAttribute("aria-hidden", "true");
  settingsPage.setAttribute("aria-hidden", "false");
  strategyLabPage.setAttribute("aria-hidden", "true");
  portfolioPage.setAttribute("aria-hidden", "true");
}

function closeSettings() {
  showDashboard();
}

function openStrategyLab() {
  dashboard.classList.add("hidden");
  settingsPage.classList.add("hidden");
  strategyLabPage.classList.remove("hidden");
  portfolioPage.classList.add("hidden");
  dashboard.setAttribute("aria-hidden", "true");
  settingsPage.setAttribute("aria-hidden", "true");
  strategyLabPage.setAttribute("aria-hidden", "false");
  portfolioPage.setAttribute("aria-hidden", "true");
  renderStrategyLab();
}

function closeStrategyLab() {
  showDashboard();
}

function openPortfolioPage() {
  dashboard.classList.add("hidden");
  settingsPage.classList.add("hidden");
  strategyLabPage.classList.add("hidden");
  portfolioPage.classList.remove("hidden");
  dashboard.setAttribute("aria-hidden", "true");
  settingsPage.setAttribute("aria-hidden", "true");
  strategyLabPage.setAttribute("aria-hidden", "true");
  portfolioPage.setAttribute("aria-hidden", "false");
  renderPortfolio();
}

function closePortfolioPage() {
  showDashboard();
}

function updateClock() {
  const now = new Date();
  clock.textContent = `Session Time: ${now.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "medium" })}`;
}

async function handleLogin(event) {
  event.preventDefault();
  const { attempts, until } = lockState();

  if (Date.now() < until) {
    const wait = Math.ceil((until - Date.now()) / 1000);
    authMessage.textContent = `Locked. Retry in ${wait}s.`;
    return;
  }

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const attemptHash = await sha256(`${AUTH_SALT}:${password}`);

  if (username === AUTH_USER && attemptHash === AUTH_HASH) {
    setLockState(0, 0);
    setSession();
    authMessage.textContent = "";
    loginForm.reset();
    showDashboard();
    return;
  }

  const nextAttempts = attempts + 1;
  if (nextAttempts >= MAX_ATTEMPTS) {
    const lockUntil = Date.now() + LOCKOUT_MS;
    setLockState(0, lockUntil);
    authMessage.textContent = `Too many attempts. Locked for ${LOCKOUT_MS / 1000}s.`;
  } else {
    setLockState(nextAttempts, 0);
    authMessage.textContent = `Invalid credentials. Attempt ${nextAttempts}/${MAX_ATTEMPTS}.`;
  }
}

function bindEvents() {
  loginForm.addEventListener("submit", handleLogin);
  logoutBtn.addEventListener("click", () => {
    clearSession();
    showLogin();
  });
  settingsBtn.addEventListener("click", openSettings);
  closeSettingsBtn.addEventListener("click", closeSettings);
  portfolioBtn.addEventListener("click", openPortfolioPage);
  closePortfolioBtn.addEventListener("click", closePortfolioPage);
  strategyLabBtn.addEventListener("click", openStrategyLab);
  closeStrategyLabBtn.addEventListener("click", closeStrategyLab);

  [sectorFilter, exchangeFilter, sortFilter, searchInput].forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  watchlistSelect.addEventListener("change", () => {
    setActiveWatchlist(watchlistSelect.value);
    render();
  });

  createWatchlistBtn.addEventListener("click", createWatchlist);
  renameWatchlistBtn.addEventListener("click", renameWatchlist);
  deleteWatchlistBtn.addEventListener("click", deleteWatchlist);

  watchlistNameInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    renameWatchlist();
  });

  dataMode.addEventListener("change", () => {
    state.dataMode = dataMode.value;
    localStorage.setItem("finDashDataMode", state.dataMode);
    render();
    refreshLiveData({ manual: true });
  });

  riskProfileSelect.addEventListener("change", () => {
    state.advisor.risk = riskProfileSelect.value;
    persistAdvisorSettings();
    render();
  });

  accountTypeSelect.addEventListener("change", () => {
    state.advisor.accountType = accountTypeSelect.value;
    persistAdvisorSettings();
    render();
  });

  taxBracketSelect.addEventListener("change", () => {
    state.advisor.taxBracket = Number(taxBracketSelect.value);
    persistAdvisorSettings();
    render();
  });

  [factorLibraryZone, activeSignalsZone].forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("is-over");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-over");
      const factorId = event.dataTransfer.getData("text/plain");
      if (!factorId) {
        return;
      }
      moveFactor(factorId, zone === activeSignalsZone);
    });
  });

  activeSignalsZone.addEventListener("input", (event) => {
    const input = event.target.closest("[data-factor-weight]");
    if (!input) {
      return;
    }
    const factorId = input.dataset.factorWeight;
    state.strategyLab.weights[factorId] = Number(input.value);
    persistStrategyLab();
    renderStrategyLab();
  });

  addPortfolioHoldingBtn.addEventListener("click", () => {
    addPortfolioHolding(
      portfolioSymbolSelect.value,
      portfolioSharesInput.value,
      portfolioCostInput.value
    );
    portfolioCostInput.value = "";
  });

  saveApiKeyBtn.addEventListener("click", () => {
    saveApiKey(apiKeyInput.value.trim());
    apiKeyInput.value = "";
    state.liveError = "";
    refreshLiveData({ manual: true });
  });

  savePortfolioApiKeyBtn.addEventListener("click", () => {
    savePortfolioImportApiKey(portfolioApiKeyInput.value.trim());
    portfolioApiKeyInput.value = "";
  });

  importPortfolioBtn.addEventListener("click", () => {
    importPortfolioFromApiKey();
    render();
    openPortfolioPage();
  });

  apiKeyInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    saveApiKeyBtn.click();
  });

  refreshBtn.addEventListener("click", () => {
    if (state.dataMode === "SIM") {
      simulateTick();
      return;
    }
    refreshLiveData({ manual: true });
  });

  setInterval(() => {
    updateClock();
    if (dashboard.classList.contains("hidden")) {
      return;
    }

    if (!isSessionValid()) {
      clearSession();
      showLogin();
      authMessage.textContent = "Session expired. Please sign in again.";
      return;
    }

    if (state.dataMode === "LIVE") {
      refreshLiveData();
    }
  }, LIVE_REFRESH_MS);

  setInterval(updateClock, 1000);
}

bindEvents();
updateClock();
if (isSessionValid()) {
  showDashboard();
} else {
  showLogin();
}
