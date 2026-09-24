// Veszprém "Részvételi költségvetés" banner paletta
export const C = { dark: "#0E2A33", blue: "#1C5E7E", cyan: "#16B3A3", green: "#159E8C", gold: "#E0A53A", goldHi: "#F7C53F", coral: "#EE7050", red: "#E94957", grey: "#6A737B" };
export const BLOCKS = [C.dark, C.blue, C.red, C.coral, C.goldHi, C.cyan];

export function makeTheme(dark, contrast) {
  let t = dark
    ? { app: C.dark, card: "rgba(255,255,255,0.06)", line: "rgba(255,255,255,0.12)", text: "#EAF2F8", soft: "#9FB2C0", nav: "rgba(16,46,57,0.92)", chip: "rgba(255,255,255,0.08)", inputBg: "rgba(255,255,255,0.07)", goldText: C.goldHi, indicator: "rgba(22,179,163,0.26)", active: C.cyan }
    : { app: "#F3F6F7", card: "#FFFFFF", line: "rgba(14,42,51,0.08)", text: "#0E2A33", soft: "#5B6772", nav: "rgba(255,255,255,0.96)", chip: "#E9EFF0", inputBg: "#E9EFF0", goldText: "#9c7416", indicator: "rgba(28,94,126,0.14)", active: C.blue };
  if (contrast) t = dark
    ? { ...t, app: "#000", card: "#0c0c0c", line: "#ffffff", text: "#fff", soft: "#e8e8e8", nav: "#000", chip: "#1d1d1d", inputBg: "#1d1d1d", indicator: "rgba(63,208,192,0.32)", active: "#3fd0c0", goldText: C.goldHi }
    : { ...t, app: "#fff", card: "#fff", line: "#111", text: "#000", soft: "#1f1f1f", nav: "#fff", chip: "#e7e7e7", indicator: "rgba(13,74,102,0.18)", active: "#0d4a66", goldText: "#6e4a10" };
  const elev = dark ? { 1: "0 1px 3px rgba(0,0,0,0.5)", 2: "0 3px 10px rgba(0,0,0,0.5)", 3: "0 10px 26px rgba(0,0,0,0.55)" } : { 1: "0 1px 3px rgba(14,42,51,0.1)", 2: "0 4px 12px rgba(14,42,51,0.1)", 3: "0 12px 30px rgba(14,42,51,0.16)" };
  const cardBorder = contrast ? `1.5px solid ${t.line}` : dark ? `1px solid ${t.line}` : "none";
  const card = { background: t.card, border: cardBorder, borderRadius: 18, boxShadow: contrast ? "none" : elev[1], ...(dark && !contrast ? { backdropFilter: "blur(8px)" } : {}) };
  const okBg = dark ? "rgba(21,158,140,0.18)" : "#E2F5F1";
  const dangerBg = dark ? "rgba(233,73,87,0.14)" : "rgba(233,73,87,0.07)";
  return { t, elev, cardBorder, card, okBg, dangerBg };
}
