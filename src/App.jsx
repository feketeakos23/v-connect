import { useState, useEffect, useRef } from "react";
import {
  Home, Compass, Coins, User, HelpCircle, Bell, Search, SlidersHorizontal,
  MapPin, Calendar, ChevronRight, ChevronLeft, ArrowLeft, X, Sun, Moon, Coffee, Ticket,
  Music, MessageCircle, Mic, Send, Phone, Sparkles, LogOut, History, Navigation,
  Lightbulb, Award, Check, TrendingUp, TrendingDown, Wallet, Film, Waves, QrCode, Trophy, Share2,
  Activity, Camera, BookOpen, Bot, Timer, PieChart, School, Play, Pause, RotateCcw,
  UtensilsCrossed, GraduationCap, Clock, Info, Accessibility, Contrast, Type, Wind,
  ExternalLink, Brain, ChevronDown, ArrowUpRight, ArrowDownRight, Leaf, Wifi, TreePine
} from "lucide-react";

// Veszprém "Részvételi költségvetés" banner paletta
const C = { dark: "#0E2A33", blue: "#1C5E7E", cyan: "#16B3A3", green: "#159E8C", gold: "#E0A53A", goldHi: "#F7C53F", coral: "#EE7050", red: "#E94957", grey: "#6A737B" };
const BLOCKS = [C.dark, C.blue, C.red, C.coral, C.goldHi, C.cyan];
let RM = false;

function Crown({ size = 30 }) {
  const cs = [C.red, C.cyan, C.goldHi, C.coral, C.cyan, C.goldHi, C.coral, C.cyan, C.red];
  const pos = [[8, 26], [8, 44], [32, 26], [32, 44], [57, 26], [57, 44], [82, 26], [82, 44], [106, 26]];
  return (
    <svg viewBox="0 0 130 92" width={size} height={(size * 92) / 130} aria-hidden>
      <rect x="57" y="2" width="16" height="16" rx="1.5" transform="rotate(45 65 10)" fill={C.goldHi} />
      {pos.map(([x, y], i) => <rect key={i} x={x} y={y} width="15" height="15" rx="1.5" fill={cs[i]} />)}
      <rect x="6" y="66" width="118" height="11" rx="2" fill={C.blue} />
    </svg>
  );
}
function Coin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "0 0 auto" }} aria-hidden>
      <circle cx="12" cy="12" r="10" fill={C.goldHi} stroke={C.gold} strokeWidth="2" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#6e4a10" fontFamily="system-ui">P</text>
    </svg>
  );
}
function Skyline({ color, opacity = 0.5, h = 90 }) {
  return (
    <svg viewBox="0 0 400 90" width="100%" height={h} preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, opacity }} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1.4">
        <path d="M0 88 L0 60 L26 60 L26 34 L34 34 L34 22 L42 22 L42 34 L50 34 L50 60 L70 60 L70 70 L70 88" />
        <path d="M70 70 L100 70 L100 46 L108 38 L116 46 L116 70 L150 70" />
        <path d="M150 88 L150 50 Q150 40 160 40 L182 40 Q192 40 192 50 L192 88" />
        <path d="M210 88 L210 56 M230 88 L230 56 M250 88 L250 56 M270 88 L270 56 M290 88 L290 56 M310 88 L310 56" />
        <path d="M205 56 Q255 30 315 56" />
        <path d="M340 88 L340 44 L348 44 L348 30 L356 30 L356 44 L380 44 L380 24 L388 24 L388 44 L400 44 L400 88" />
      </g>
    </svg>
  );
}
const Pill = ({ children, bg, fg }) => <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{children}</span>;
const ColorBlocks = () => <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 12 }}>{BLOCKS.map((b, i) => <div key={i} style={{ width: 22, height: 10, borderRadius: 3, background: b }} />)}</div>;

function Ripple({ children, onClick, style, color = "rgba(255,255,255,0.4)", aria }) {
  const [r, setR] = useState([]);
  const click = (e) => {
    if (!RM) {
      const b = e.currentTarget.getBoundingClientRect();
      const size = Math.max(b.width, b.height) * 1.2;
      const id = Date.now() + Math.random();
      setR((p) => [...p, { id, x: e.clientX - b.left - size / 2, y: e.clientY - b.top - size / 2, size }]);
      setTimeout(() => setR((p) => p.filter((i) => i.id !== id)), 600);
    }
    onClick && onClick(e);
  };
  return (
    <div onClick={click} role={aria ? "button" : undefined} aria-label={aria} tabIndex={aria ? 0 : undefined} style={{ position: "relative", overflow: "hidden", userSelect: "none", ...style }}>
      {children}
      {r.map((i) => <span key={i.id} className="ripple" style={{ position: "absolute", left: i.x, top: i.y, width: i.size, height: i.size, borderRadius: "50%", background: color, transform: "scale(0)", opacity: 0.55, pointerEvents: "none" }} />)}
    </div>
  );
}
function IconBtn({ icon: Ic, onClick, t, scrim, color, label }) {
  return (
    <Ripple onClick={onClick} aria={label} color={scrim ? "rgba(255,255,255,0.35)" : "rgba(120,120,120,0.25)"} style={{ width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", cursor: "pointer", flex: "0 0 auto", background: scrim ? "rgba(0,0,0,0.42)" : t.chip, color: color || (scrim ? "#fff" : t.text), backdropFilter: scrim ? "blur(6px)" : "none" }}>
      <Ic size={20} />
    </Ripple>
  );
}
function Switch({ on, onChange, t }) {
  return (
    <Ripple onClick={onChange} aria="kapcsoló" color="rgba(120,120,120,0.2)" style={{ width: 52, height: 32, borderRadius: 999, background: on ? C.green : t.chip, padding: 3, cursor: "pointer", flex: "0 0 auto", boxSizing: "border-box" }}>
      <div style={{ width: 26, height: 26, borderRadius: 999, background: "#fff", transform: on ? "translateX(20px)" : "translateX(0)", transition: RM ? "none" : "transform .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.35)" }} />
    </Ripple>
  );
}
const Scroll = ({ children }) => <div className="nobar" style={{ height: "100%", overflowY: "auto", paddingBottom: 100 }}>{children}</div>;
function TopBar({ t, dark, setDark, title, back, setScreen }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {back && <IconBtn icon={ChevronLeft} t={t} label="Vissza" onClick={() => setScreen(back)} />}
        {title ? <span style={{ fontWeight: 700, fontSize: 22, color: t.text, paddingLeft: back ? 2 : 8 }}>{title}</span> : <span style={{ paddingLeft: 6 }}><Crown size={30} /></span>}
      </div>
      <IconBtn icon={dark ? Sun : Moon} t={t} color={t.goldText} label="Sötét mód" onClick={() => setDark((d) => !d)} />
    </div>
  );
}
function MapPreview({ onClick }) {
  return (
    <Ripple onClick={onClick} aria="Térkép, útvonaltervezés" color="rgba(0,0,0,0.08)" style={{ display: "block", borderRadius: 18, overflow: "hidden", cursor: "pointer", height: 150, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
      <svg viewBox="0 0 400 150" width="100%" height="150" preserveAspectRatio="xMidYMid slice" style={{ display: "block", background: "#E6E9ED" }}>
        <rect x="40" y="0" width="60" height="150" fill="#CFE8D0" />
        <g stroke="#FFFFFF" strokeWidth="9" fill="none" strokeLinecap="round"><path d="M-10 110 L180 95 L420 130" /><path d="M120 -10 L150 80 L130 160" /><path d="M250 -10 L240 160" /><path d="M40 40 L380 30" /></g>
        <g stroke="#D7DCE2" strokeWidth="3" fill="none"><path d="M-10 110 L180 95 L420 130" /><path d="M120 -10 L150 80 L130 160" /></g>
      </svg>
      <MapPin size={36} color={C.coral} fill={C.coral} style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-90%)", filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.3))" }} />
      <span style={{ position: "absolute", bottom: 6, right: 10, fontSize: 9, color: "#7a828c" }}>Térkép · ©2026</span>
    </Ripple>
  );
}

export default function VConnect() {
  const [dark, setDark] = useState(false);
  const [screen, setScreen] = useState("login");
  const [points, setPoints] = useState(450);
  const [toast, setToast] = useState(null);
  const [scanState, setScanState] = useState("idle");
  const [redeemed, setRedeemed] = useState([]);
  const [pointsTab, setPointsTab] = useState("earn");
  const [qrBack, setQrBack] = useState("home");
  const [evId, setEvId] = useState("meccs");
  const [chat, setChat] = useState([{ from: "bot", text: "Szia! Miben segíthetek ma? Kockulnál valahol, vagy valami komolyabb dolog érdekel? 🙂" }]);
  const [draft, setDraft] = useState("");
  const [focusMin, setFocusMin] = useState(25);
  const [focusLeft, setFocusLeft] = useState(25 * 60);
  const [focusRun, setFocusRun] = useState(false);
  const [ideaText, setIdeaText] = useState("");
  const [myVotes, setMyVotes] = useState([]);
  const [projSel, setProjSel] = useState(null);
  const [cat, setCat] = useState("Mind");
  const [filterOpen, setFilterOpen] = useState(false);
  const [flt, setFlt] = useState({ age: "Mind", price: "Mind", place: "Mind", pts: false });
  const [openTech, setOpenTech] = useState(null);
  const [histFilter, setHistFilter] = useState("all");
  const [a, setA] = useState({ contrast: false, big: false, reduce: false });
  const [reg, setReg] = useState({ name: "", email: "", dob: "", pw: "", pw2: "", consent: false });
  const [regTried, setRegTried] = useState(false);
  const [me, setMe] = useState({ name: "Nagy Anna", email: "anna@pelda.hu", dob: "2008-05-14", grade: "Középiskola", lang: "Magyar" });
  const [notif, setNotif] = useState({ push: true, email: false, events: true });
  const [query, setQuery] = useState("");
  const chatEnd = useRef(null);
  RM = a.reduce;
  const anim = (cls) => (a.reduce ? "" : cls);

  let base = dark
    ? { app: C.dark, card: "rgba(255,255,255,0.06)", line: "rgba(255,255,255,0.12)", text: "#EAF2F8", soft: "#9FB2C0", nav: "rgba(16,46,57,0.92)", chip: "rgba(255,255,255,0.08)", inputBg: "rgba(255,255,255,0.07)", goldText: C.goldHi, indicator: "rgba(22,179,163,0.26)", active: C.cyan }
    : { app: "#F3F6F7", card: "#FFFFFF", line: "rgba(14,42,51,0.08)", text: "#0E2A33", soft: "#5B6772", nav: "rgba(255,255,255,0.96)", chip: "#E9EFF0", inputBg: "#E9EFF0", goldText: "#9c7416", indicator: "rgba(28,94,126,0.14)", active: C.blue };
  if (a.contrast) base = dark
    ? { ...base, app: "#000", card: "#0c0c0c", line: "#ffffff", text: "#fff", soft: "#e8e8e8", nav: "#000", chip: "#1d1d1d", inputBg: "#1d1d1d", indicator: "rgba(63,208,192,0.32)", active: "#3fd0c0", goldText: C.goldHi }
    : { ...base, app: "#fff", card: "#fff", line: "#111", text: "#000", soft: "#1f1f1f", nav: "#fff", chip: "#e7e7e7", indicator: "rgba(13,74,102,0.18)", active: "#0d4a66", goldText: "#6e4a10" };
  const t = base;
  const elev = dark ? { 1: "0 1px 3px rgba(0,0,0,0.5)", 2: "0 3px 10px rgba(0,0,0,0.5)", 3: "0 10px 26px rgba(0,0,0,0.55)" } : { 1: "0 1px 3px rgba(14,42,51,0.1)", 2: "0 4px 12px rgba(14,42,51,0.1)", 3: "0 12px 30px rgba(14,42,51,0.16)" };
  const cardBorder = a.contrast ? `1.5px solid ${t.line}` : dark ? `1px solid ${t.line}` : "none";
  const card = { background: t.card, border: cardBorder, borderRadius: 18, boxShadow: a.contrast ? "none" : elev[1], ...(dark && !a.contrast ? { backdropFilter: "blur(8px)" } : {}) };
  const okBg = dark ? "rgba(21,158,140,0.18)" : "#E2F5F1";
  const dangerBg = dark ? "rgba(233,73,87,0.14)" : "rgba(233,73,87,0.07)";

  function fire(msg, color = C.green) { setToast({ msg, color }); }
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2200); return () => clearTimeout(id); }, [toast]);
  useEffect(() => { if (!focusRun) return; if (focusLeft <= 0) { setFocusRun(false); fire("A tanulási idő letelt – tarts szünetet! ☕", C.green); return; } const id = setTimeout(() => setFocusLeft((s) => s - 1), 1000); return () => clearTimeout(id); }, [focusRun, focusLeft]);
  useEffect(() => { if (screen === "chat") setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: a.reduce ? "auto" : "smooth" }), 40); }, [chat, screen]);

  function openQR() { setQrBack(screen); setScreen("qr"); }
  function goPoints(tab) { setPointsTab(tab); setScreen("points"); }
  function openEvent(id) { setEvId(id); setScreen("event"); }
  function simulateScan() { if (scanState === "success") return; setScanState("success"); setTimeout(() => { setPoints((p) => p + 50); fire("+50 pont jóváírva! 🎉", C.green); }, 700); setTimeout(() => setScanState("idle"), 2400); }
  function redeem(item) { if (points < item.cost) { fire("Nincs elég pontod ehhez 😕", C.red); return; } setPoints((p) => p - item.cost); setRedeemed((r) => [...r, item.id]); fire(`Beváltva: ${item.name}`, C.coral); }
  function sendMsg(text) {
    const msg = (text ?? draft).trim(); if (!msg) return; setChat((c) => [...c, { from: "me", text: msg }]); setDraft("");
    const low = msg.toLowerCase(); let reply;
    if (/(rossz|szomor|magány|magany|stressz|szorong|félek|felek|nem bírom|nem birom|baj)/.test(low)) reply = "Sajnálom, hogy most nehéz. 💙 Nem vagy egyedül — segíthet, ha beszélsz egy megbízható felnőttel, vagy felhívod a Kék Vonalat (116-111, ingyenes, 0–24, fiataloknak). A Segítő fülön az SOS-kártyán egy koppintással eléred a számokat.";
    else if (/(tanul|matek|matematika|vizsga|érettségi|erettsegi|százalék|szazalek)/.test(low)) reply = "Vágjunk bele! Mondd el, melyik témánál akadtál el. Tipp: a Segítő → Tanulási technikák és a Fókusz Óra is sokat segíthet. ⏱️";
    else reply = "Jó kérdés! 🙌 Nézz körül a Felfedezés fülön — ma több ingyenes esemény is van pontgyűjtéssel. Mit szeretsz: zene, sport, tech vagy kultúra?";
    setTimeout(() => setChat((c) => [...c, { from: "bot", text: reply }]), 600);
  }

  const cats = [{ n: "Zene", c: C.cyan }, { n: "Kultúra", c: C.blue }, { n: "Sport", c: C.green }, { n: "Tech", c: C.gold }, { n: "Gasztro", c: C.coral }];
  const catColor = (n) => (cats.find((c) => c.n === n) || { c: C.blue }).c;
  const events = [
    { id: "meccs", name: "Telekom Veszprém Meccs", cat: "Sport", icon: Trophy, pts: 30, place: "Veszprém Aréna", date: "2026. Máj. 25., Szombat", time: "18:00 – 20:00", partner: "Veszprém Handball", age: "Mind", free: false, outdoor: false, desc: "Bajnokok Ligája rangadó a Veszprém Arénában. Szurkolj együtt a várossal, és gyűjts pontot a belépőd QR-kódjával a helyszínen!" },
    { id: "utcazene", name: "Utcazene Fesztivál", cat: "Zene", icon: Music, pts: 50, place: "Óváros tér", date: "2026. Jún. 21., Vasárnap", time: "17:00 – 23:00", partner: "VEB Kulturális Kft.", age: "Mind", free: true, outdoor: true, desc: "Élő koncertek a belváros utcáin – több színpad, ingyenes belépés, jó hangulat estig." },
    { id: "muzeum", name: "Múzeumok Éjszakája", cat: "Kultúra", icon: Sparkles, pts: 40, place: "Vár", date: "2026. Jún. 22., Hétfő", time: "18:00 – 24:00", partner: "Laczkó Dezső Múzeum", age: "Mind", free: false, outdoor: false, desc: "Éjszakai tárlatvezetések, workshopok és fény-installációk a Várnegyedben." },
    { id: "robot", name: "AI & Robotika Workshop", cat: "Tech", icon: Bot, pts: 60, place: "Hangvilla", date: "2026. Jún. 27., Szombat", time: "10:00 – 14:00", partner: "Code Creator", age: "Középiskola", free: true, outdoor: false, desc: "Ozobot, Matatalab és gépi tanulás – építsd és programozd a saját robotodat!" },
    { id: "skate", name: "Skate Jam a Várkútnál", cat: "Sport", icon: Activity, pts: 30, place: "Várkút", date: "2026. Jún. 25., Csütörtök", time: "15:00 – 19:00", partner: "Veszprém SE", age: "Mind", free: true, outdoor: true, desc: "Gördeszka- és roller-verseny minden szinten, DJ-vel és díjakkal." },
    { id: "film", name: "Filmklub a Hangvillában", cat: "Kultúra", icon: Film, pts: 25, place: "Hangvilla", date: "2026. Jún. 28., Vasárnap", time: "19:00", partner: "Hangvilla", age: "Középiskola", free: false, outdoor: false, desc: "Kultikus filmek nagyvásznon, beszélgetéssel a vetítés után." },
    { id: "food", name: "Nyári Streetfood Piknik", cat: "Gasztro", icon: UtensilsCrossed, pts: 20, place: "Erzsébet-liget", date: "2026. Júl. 5., Vasárnap", time: "11:00 – 20:00", partner: "Streetfood VESZ", age: "Mind", free: true, outdoor: true, desc: "Helyi food truckok, kézműves limonádé és élőzene a ligetben." },
    { id: "egyetem", name: "Pannon Egyetem Nyílt Nap", cat: "Tech", icon: GraduationCap, pts: 35, place: "Pannon Egyetem", date: "2026. Júl. 10., Péntek", time: "09:00 – 15:00", partner: "Pannon Egyetem", age: "Középiskola", free: true, outdoor: false, desc: "Ismerd meg a szakokat, a kampuszt és a diákéletet – kérdezz a hallgatóktól!" },
  ];
  const challenges = [
    { name: "Könyvmoly", desc: "Látogass el a könyvtárba, és olvass egy órát.", pts: 15, icon: BookOpen },
    { name: "Szigeti Futás", desc: "Teljesíts egy kört a Szigeti sétányon.", pts: 40, icon: Activity },
    { name: "Tűztorony Szelfi", desc: "Készíts egy képet a városról a Tűztoronynál.", pts: 25, icon: Camera },
    { name: "Várnegyed Túra", desc: "Csekkolj be a Hősök Kapujánál.", pts: 20, icon: MapPin },
  ];
  const earnSpots = [
    { name: "Veszprémi Vár QR", place: "Vár, főbejárat", pts: 20, icon: MapPin }, { name: "Könyvtár látogatás", place: "Eötvös Károly Könyvtár", pts: 15, icon: BookOpen },
    { name: "Múzeumok Éjszakája", place: "belépő QR-kód", pts: 40, icon: Sparkles }, { name: "Tűztorony kilátó", place: "belépés", pts: 25, icon: Camera },
  ];
  const rewards = [
    { id: "mozi", name: "Mozijegy -50%", cost: 100, icon: Film, c: C.blue }, { id: "kave", name: "Ingyen kávé", cost: 50, icon: Coffee, c: C.gold },
    { id: "koncert", name: "Koncert sorsolás", cost: 200, icon: Music, c: C.cyan }, { id: "uszoda", name: "Uszoda belépő", cost: 80, icon: Waves, c: C.green },
    { id: "konyv", name: "Könyvesbolt kupon", cost: 60, icon: BookOpen, c: C.coral }, { id: "food", name: "Streetfood -20%", cost: 40, icon: Ticket, c: C.gold },
  ];
  const toolsList = [
    { n: "Tanulási technikák", d: "Gen Z-barát módszerek", icon: Brain, c: C.cyan, go: "techniques" }, { n: "Fókusz Óra", d: "Pomodoro időzítő", icon: Timer, c: C.blue, go: "focus" },
    { n: "Továbbtanulás", d: "Felvi, KIFIR, szakok", icon: GraduationCap, c: C.green, go: "study" }, { n: "Szolgáltatások", d: "Tanárok, autósiskolák", icon: School, c: C.gold, go: "services" },
    { n: "Ötletláda", d: "Küldj be ötleteket", icon: Lightbulb, c: C.coral, go: "ideabox" }, { n: "Költségvetés", d: "Dönts a fejlesztésekről", icon: PieChart, c: C.red, go: "budget" },
  ];
  const teachers = [{ n: "Kovács Eszter", s: "Matematika · középiskola", m: "online / személyes" }, { n: "Nagy Péter", s: "Angol nyelv · felső tagozat", m: "személyes" }];
  const schools = [{ n: "Veszprém Drive", s: "B, AM kategória", m: "elmélet online" }, { n: "Gyorsuló Kft.", s: "A, A2, B kategória", m: "személyes" }];
  const projects = [
    { id: "p1", name: "Új gördeszkapálya a Séd-völgyben", cat: "Sport & szabadidő", district: "Jutas", icon: Activity, c: C.green, cost: "4,5 M Ft", v: 312, by: "Veszprémi Gördeszkás Egyesület", desc: "Modern betonos skatepark a Séd patak mentén, esti világítással és pihenőzónával.", long: "A Séd-völgy alulhasznosított részén minden korosztálynak szóló, biztonságos betonpálya épülne street- és bowl-elemekkel, esti LED-világítással, ivókúttal és árnyékos pihenőzónával. A helyszín gyalog és bringával is jól megközelíthető.", bd: [{ l: "Beton és burkolat", pct: 55 }, { l: "Pályaelemek", pct: 30 }, { l: "Világítás & padok", pct: 15 }] },
    { id: "p2", name: "Közösségi kert a Jutasi úton", cat: "Zöld város", district: "Jutasi út", icon: Leaf, c: C.cyan, cost: "2,8 M Ft", v: 248, by: "Jutasi úti Lakóközösség", desc: "Magaságyásos közösségi kert, ahol a lakók együtt kertészkednek.", long: "Egy elhanyagolt zöldterületből közösségi kert lenne magaságyásokkal, amelyeket a környékbeli családok és diákok gondoznának. Lenne szerszámtároló, komposztáló és esővízgyűjtő, valamint havi kertészkedő-workshopok.", bd: [{ l: "Magaságyások, talaj", pct: 45 }, { l: "Kerítés & tároló", pct: 35 }, { l: "Komposztáló & vízgyűjtő", pct: 20 }] },
    { id: "p3", name: "Ingyenes wifi a belvárosban", cat: "Digitális város", district: "Belváros", icon: Wifi, c: C.blue, cost: "3,2 M Ft", v: 401, by: "Veszprémi Ifjúsági Kerekasztal", desc: "Szabadon elérhető, gyors wifi az Óváros téren és a sétálóutcán.", long: "Ingyenes, regisztráció utáni gyors wifi-lefedettség az Óváros téren, a sétálóutcán és a buszpályaudvar környékén. Segíti a tanulást, a turistákat és a városi appok használatát is.", bd: [{ l: "Access pointok", pct: 50 }, { l: "Telepítés & kábelezés", pct: 30 }, { l: "1 éves üzemeltetés", pct: 20 }] },
    { id: "p4", name: "Fásítás a Cholnoky lakótelepen", cat: "Zöld város", district: "Cholnoky", icon: TreePine, c: C.coral, cost: "1,9 M Ft", v: 177, by: "Cholnoky Lakóközösség", desc: "100 új fa és árnyékot adó padok a lakótelepi tereken.", long: "Száz őshonos fa és árnyékot adó padok telepítése a lakótelep betonos tereire a nyári hőszigetek mérséklésére. A fák gondozását a lakók és egy helyi iskola közösen vállalná.", bd: [{ l: "Facsemeték (100 db)", pct: 60 }, { l: "Ültetés & öntözés", pct: 25 }, { l: "Padok", pct: 15 }] },
  ];
  const studyLinks = [
    { n: "Felvi.hu", d: "Egyetemek, szakok, pontszámítás", url: "https://www.felvi.hu", c: C.blue, icon: GraduationCap },
    { n: "Pannon Egyetem szakok", d: "A veszprémi egyetem képzései", url: "https://www.felvi.hu/felveteli/meghirdetesek_a/!FFT_Megjelenito_A/intezmenyek/41/kepzesek", c: C.cyan, icon: School },
    { n: "KIFIR", d: "Középiskolai felvételi rendszer", url: "https://kifir2.kir.hu", c: C.green, icon: BookOpen },
    { n: "Sulinavigátor", d: "Iskolakereső – ált. és középiskolák", url: "https://sulinavigator.hu", c: C.gold, icon: Compass },
  ];
  const techniques = [
    { n: "Pomodoro", e: "🍅", c: C.red, tag: "Fókusz", hook: "25 perc nyomás, 5 perc lazsa. A telód is kibírja addig.", how: "Állíts be 25 perc fókuszt, majd 5 perc szünetet. 4 kör után jöhet egy hosszabb, ~20 perces pihi.", when: "Ha szétesik a figyelmed, vagy halogatsz.", tip: "Indítsd egyből a Fókusz Órát az appban!", go: "focus" },
    { n: "Aktív felidézés", e: "🧠", c: C.cyan, tag: "Memória", hook: "Ne olvasd újra 5x – kérdezd ki magad. Sokkal durvábban beég.", how: "Csukd be a füzetet, és FEJBŐL idézd fel az anyagot, csak utána ellenőrizd. A flashcard a legjobb haver.", when: "Definíciók, évszámok, képletek tanulásakor.", tip: "Kérdezd ki magad fennhangon – még jobban rögzül." },
    { n: "Feynman-módszer", e: "🗣️", c: C.green, tag: "Megértés", hook: "Magyarázd el úgy, mintha egy 10 évesnek mesélnéd.", how: "Mondd el a témát egyszerű szavakkal, hangosan vagy papíron. Ahol elakadsz vagy bonyolítasz → ott a lyuk a tudásodban.", when: "Amikor 'értem, csak nem tudom elmondani'.", tip: "Vedd fel hangüzenetként magadnak, és hallgasd vissza." },
    { n: "Időzített ismétlés", e: "📆", c: C.blue, tag: "Hosszú táv", hook: "Ismételj egyre ritkábban: 1 nap → 3 nap → 1 hét.", how: "Ne magolj be mindent egyszerre. Oszd el az ismétléseket napokra – az agyad így rakja hosszú távú tárba.", when: "Nagy anyag, vizsgaidőszak, nyelvtanulás.", tip: "Egy ingyenes flashcard app (pl. Anki) automatikusan időzít." },
    { n: "Brain dump", e: "🧹", c: C.gold, tag: "Stresszoldó", hook: "Vizsga előtt 5 perc: ürítsd ki az agyad egy lapra.", how: "Írj le MINDENT, ami az anyagból vagy a teendőkből kavarog – rendezetlenül is. Felszabadul a 'RAM', csökken a szorongás.", when: "Dolgozat előtt, vagy ha ezer dolog jár a fejedben.", tip: "Utána húzd ki, ami nem fontos – marad a lényeg." },
    { n: "Body doubling", e: "👯", c: C.coral, tag: "Motiváció", hook: "Tanulj valakivel együtt – akár néma videóhívásban.", how: "A puszta jelenlét (élőben vagy online) elkötelez és beindít. Nem kell beszélni, csak együtt csináljátok a sajátotokat.", when: "Ha egyedül sehogy nem tudsz nekiállni.", tip: "Beszéljetek meg egy közös Pomodoro-kört." },
  ];
  const history = [
    { type: "earn", n: "Várséta QR", place: "Veszprémi Vár", dt: "Ma, 16:42", val: 50 },
    { type: "redeem", n: "Ingyen kávé", place: "Café Frei", dt: "Ma, 11:08", val: 50 },
    { type: "earn", n: "Múzeumok Éjszakája", place: "Vár", dt: "Jún. 18., 19:20", val: 40 },
    { type: "earn", n: "Könyvtár látogatás", place: "Eötvös K. Könyvtár", dt: "Jún. 17., 14:05", val: 15 },
    { type: "redeem", n: "Mozijegy -50%", place: "Cinema Veszprém", dt: "Jún. 15., 20:30", val: 100 },
    { type: "earn", n: "Skate Jam", place: "Várkút", dt: "Jún. 14., 17:50", val: 30 },
    { type: "earn", n: "Tűztorony szelfi", place: "Tűztorony", dt: "Jún. 12., 10:15", val: 25 },
  ];

  const fbtn = (label, onClick, { bg = C.blue, fg = "#fff", icon: Ic, full, ripple = "rgba(255,255,255,0.45)", outlined } = {}) => (
    <Ripple onClick={onClick} aria={label} color={ripple} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 999, padding: outlined ? "10px 18px" : "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", width: full ? "100%" : "auto", background: outlined ? "transparent" : bg, color: fg, border: outlined ? `1px solid ${t.line}` : "none", boxShadow: outlined || a.contrast ? "none" : elev[1] }}>
      {Ic && <Ic size={17} />}{label}
    </Ripple>
  );
  const ToolGrid = ({ items }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {items.map((m) => (
        <Ripple key={m.n} onClick={() => setScreen(m.go)} aria={m.n} color="rgba(120,120,120,0.16)" style={{ ...card, padding: 15, display: "flex", flexDirection: "column", gap: 9, alignItems: "flex-start", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: `${m.c}1f`, display: "grid", placeItems: "center" }}><m.icon size={21} color={m.c} /></div>
          <div><div style={{ fontWeight: 800, color: t.text, fontSize: 14.5 }}>{m.n}</div><div style={{ color: t.soft, fontSize: 11.5, marginTop: 2, lineHeight: 1.3 }}>{m.d}</div></div>
        </Ripple>
      ))}
    </div>
  );

  // ---------- KÉPERNYŐK ----------
  const renderRegister = () => {
    const up = (k, v) => setReg((r) => ({ ...r, [k]: v }));
    const today = new Date();
    const dobMax = today.toISOString().slice(0, 10);
    const d = reg.dob ? new Date(reg.dob) : null, dobValid = !!d && !isNaN(d.getTime());
    let age = null;
    if (dobValid) { age = today.getFullYear() - d.getFullYear(); const md = today.getMonth() - d.getMonth(); if (md < 0 || (md === 0 && today.getDate() < d.getDate())) age--; }
    const v = {
      name: reg.name.trim().length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.email),
      dobValid,
      age: dobValid && age >= 14 && age <= 100,
      len: reg.pw.length >= 8, low: /[a-z]/.test(reg.pw), upp: /[A-Z]/.test(reg.pw), num: /\d/.test(reg.pw),
    };
    v.pw = v.len && v.low && v.upp && v.num;
    v.match = reg.pw.length > 0 && reg.pw === reg.pw2;
    const allOk = v.name && v.email && v.dobValid && v.age && v.pw && v.match && reg.consent;
    const submit = () => { setRegTried(true); if (allOk) { fire("Sikeres regisztráció! Üdv a V-Connecten 🎉", C.green); setScreen("home"); } };
    const field = (label, key, opts = {}) => (
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: C.grey }}>{label}</label>
        <input value={reg[key]} onChange={(e) => up(key, e.target.value)} type={opts.type || "text"} inputMode={opts.inputMode} maxLength={opts.maxLength} placeholder={opts.ph} aria-label={label}
          style={{ width: "100%", boxSizing: "border-box", marginTop: 5, padding: "12px 14px", borderRadius: 13, background: "#F6F8FB", fontSize: 14, outline: "none", border: `1px solid ${regTried && !opts.ok ? C.red : "#E2E8EE"}` }} />
        {opts.err && regTried && !opts.ok && <div style={{ color: C.red, fontSize: 11.5, marginTop: 4 }}>{opts.err}</div>}
        {opts.hint && !(regTried && !opts.ok) && <div style={{ color: C.grey, fontSize: 11.5, marginTop: 4 }}>{opts.hint}</div>}
      </div>
    );
    const Req = ({ ok, children }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: ok ? C.green : "#9aa4ad", fontSize: 12 }}>
        <span style={{ width: 16, height: 16, borderRadius: 99, background: ok ? C.green : "transparent", border: `1.5px solid ${ok ? C.green : "#cfd6dd"}`, display: "grid", placeItems: "center", flex: "0 0 auto" }}>{ok && <Check size={11} color="#fff" />}</span>{children}
      </div>
    );
    return (
      <div className="nobar" style={{ height: "100%", overflowY: "auto", position: "relative", background: `linear-gradient(160deg, ${C.blue} 0%, #0F3A4A 55%, ${C.dark} 100%)` }}>
        <Skyline color="rgba(255,255,255,0.16)" opacity={1} />
        <div style={{ position: "relative", zIndex: 1, padding: "14px 22px 34px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <IconBtn icon={ArrowLeft} t={t} scrim label="Vissza" onClick={() => setScreen("login")} />
            <IconBtn icon={dark ? Sun : Moon} t={t} scrim label="Sötét mód" onClick={() => setDark((d) => !d)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "8px 0 16px" }}>
            <Crown size={44} /><div style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginTop: 6 }}>Fiók létrehozása</div><div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Csatlakozz a veszprémi fiatalokhoz!</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.98)", borderRadius: 22, padding: 20, boxShadow: "0 18px 50px rgba(0,0,0,0.35)" }}>
            {field("Teljes név", "name", { ph: "Nagy Anna", ok: v.name, err: "Add meg a neved (min. 2 karakter)." })}
            {field("E-mail", "email", { ph: "anna@pelda.hu", inputMode: "email", ok: v.email, err: "Érvényes e-mail címet adj meg." })}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.grey }}>Születési dátum</label>
              <input value={reg.dob} onChange={(e) => up("dob", e.target.value)} type="date" max={dobMax} aria-label="Születési dátum"
                style={{ width: "100%", boxSizing: "border-box", marginTop: 5, padding: "12px 14px", borderRadius: 13, background: "#F6F8FB", fontSize: 14, outline: "none", color: "#0E2A33", border: `1px solid ${regTried && !(v.dobValid && v.age) ? C.red : "#E2E8EE"}` }} />
              {regTried && !(v.dobValid && v.age)
                ? <div style={{ color: C.red, fontSize: 11.5, marginTop: 4 }}>{!v.dobValid ? "Adj meg egy érvényes dátumot." : "14 éven aluliak nem regisztrálhatnak."}</div>
                : <div style={{ color: C.grey, fontSize: 11.5, marginTop: 4 }}>Legalább 14 évesnek kell lenned.</div>}
            </div>
            {field("Jelszó", "pw", { type: "password", ph: "••••••••", ok: v.pw })}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 10px", margin: "2px 0 12px" }}>
              <Req ok={v.len}>Min. 8 karakter</Req><Req ok={v.num}>Tartalmaz számot</Req>
              <Req ok={v.low}>Kisbetű (a–z)</Req><Req ok={v.upp}>Nagybetű (A–Z)</Req>
            </div>
            {field("Jelszó megerősítése", "pw2", { type: "password", ph: "••••••••", ok: v.match, err: "A két jelszó nem egyezik." })}
            <Ripple onClick={() => up("consent", !reg.consent)} aria="Adatkezelés elfogadása" color="rgba(0,0,0,0.06)" style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 2px", cursor: "pointer", borderRadius: 10, marginBottom: 4 }}>
              <span style={{ width: 22, height: 22, borderRadius: 7, background: reg.consent ? C.green : "#fff", border: `1.5px solid ${regTried && !reg.consent ? C.red : reg.consent ? C.green : "#cfd6dd"}`, display: "grid", placeItems: "center", flex: "0 0 auto", marginTop: 1 }}>{reg.consent && <Check size={14} color="#fff" />}</span>
              <span style={{ fontSize: 12.5, color: "#5B6772", lineHeight: 1.4 }}>Elfogadom az <b style={{ color: C.blue }}>adatkezelési tájékoztatót</b> és a felhasználási feltételeket.</span>
            </Ripple>
            <div style={{ marginTop: 10 }}>{fbtn("Regisztráció", submit, { full: true, bg: allOk ? C.blue : "#B6C2CC" })}</div>
          </div>
          <div style={{ textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.85)", fontSize: 13 }}>Már van fiókod? <span onClick={() => setScreen("login")} style={{ color: C.goldHi, fontWeight: 800, cursor: "pointer" }}>Belépés</span></div>
        </div>
      </div>
    );
  };

  const renderLogin = () => (
    <div className="nobar" style={{ position: "relative", height: "100%", overflowY: "auto", background: `linear-gradient(160deg, ${C.blue} 0%, #0F3A4A 55%, ${C.dark} 100%)` }}>
      <div style={{ position: "absolute", top: 14, right: 16, zIndex: 2 }}><IconBtn icon={dark ? Sun : Moon} t={t} scrim label="Sötét mód" onClick={() => setDark((d) => !d)} /></div>
      <Skyline color="rgba(255,255,255,0.18)" opacity={1} />
      <div style={{ minHeight: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", padding: 26, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
          <Crown size={60} /><div style={{ color: "#fff", fontWeight: 900, fontSize: 30, letterSpacing: 1, marginTop: 8 }}>V-CONNECT</div>
          <div style={{ color: C.goldHi, fontSize: 14, fontWeight: 700 }}>Kezedben a város!</div>
          <ColorBlocks />
        </div>
        <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 24, padding: 20, boxShadow: "0 18px 50px rgba(0,0,0,0.35)" }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey }}>E-mail</label>
          <input placeholder="anna@pelda.hu" inputMode="email" style={{ width: "100%", boxSizing: "border-box", marginTop: 5, marginBottom: 12, padding: "12px 14px", borderRadius: 13, border: "1px solid #E2E8EE", background: "#F6F8FB", fontSize: 14, outline: "none" }} />
          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey }}>Jelszó</label>
          <input type="password" placeholder="••••••••" style={{ width: "100%", boxSizing: "border-box", marginTop: 5, marginBottom: 16, padding: "12px 14px", borderRadius: 13, border: "1px solid #E2E8EE", background: "#F6F8FB", fontSize: 14, outline: "none" }} />
          {fbtn("Bejelentkezés", () => setScreen("home"), { full: true })}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0", color: "#A7B2BC", fontSize: 11 }}><div style={{ flex: 1, height: 1, background: "#E2E8EE" }} /> VAGY <div style={{ flex: 1, height: 1, background: "#E2E8EE" }} /></div>
          <div style={{ display: "flex", gap: 10 }}>{["Google", "Apple"].map((p) => fbtn(p, () => setScreen("home"), { bg: "#fff", fg: "#0E2A33", full: true, ripple: "rgba(0,0,0,0.08)", outlined: true }))}</div>
        </div>
        <div style={{ marginTop: 16 }}>{fbtn("Regisztrálok", () => setScreen("register"), { full: true, bg: C.goldHi, fg: "#3a2a10", ripple: "rgba(0,0,0,0.1)" })}</div>
      </div>
    </div>
  );

  const renderHome = () => (
    <Scroll>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px 4px" }}>
        <div><div style={{ color: t.soft, fontSize: 13 }}>Szia,</div><div style={{ color: t.text, fontWeight: 900, fontSize: 22 }}>Anna! 👋</div></div>
        <IconBtn icon={dark ? Sun : Moon} t={t} color={t.goldText} label="Sötét mód" onClick={() => setDark((d) => !d)} />
      </div>
      <div style={{ padding: "6px 18px 0" }}>
        <div style={{ ...card, padding: 18, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.blue}, ${C.dark})`, border: "none", color: "#fff", boxShadow: a.contrast ? "none" : elev[2] }}>
          <Trophy size={26} color={C.goldHi} style={{ position: "absolute", top: 16, right: 18 }} />
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>AKTUÁLIS EGYENLEG</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 6 }}><Coin size={30} /><span style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>{points}</span><span style={{ fontSize: 16, fontWeight: 700, opacity: 0.85, marginTop: 10 }}>Pont</span></div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>{fbtn("QR Olvasás", openQR, { bg: "#fff", fg: C.blue, icon: QrCode, full: true, ripple: "rgba(0,0,0,0.08)" })}{fbtn("Beváltás", () => goPoints("redeem"), { bg: "rgba(255,255,255,0.18)", fg: "#fff", icon: Wallet, full: true })}</div>
        </div>
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <Ripple onClick={() => openEvent("utcazene")} aria="Utcazene Fesztivál" color="rgba(255,255,255,0.3)" style={{ borderRadius: 22, minHeight: 150, padding: 18, color: "#fff", cursor: "pointer", background: `linear-gradient(135deg, ${C.cyan} 0%, ${C.blue} 100%)`, boxShadow: a.contrast ? "none" : elev[2] }}>
          <Skyline color="rgba(255,255,255,0.2)" opacity={1} />
          <div style={{ position: "relative", zIndex: 1 }}><Pill bg="rgba(255,255,255,0.22)" fg="#fff">KIEMELT</Pill><div style={{ fontWeight: 900, fontSize: 21, marginTop: 10 }}>Utcazene Fesztivál</div><div style={{ fontSize: 13, opacity: 0.9, marginTop: 4, display: "flex", gap: 12 }}><span><Calendar size={12} style={{ verticalAlign: -1 }} /> Jún. 21.</span><span><MapPin size={12} style={{ verticalAlign: -1 }} /> Óváros tér</span></div></div>
        </Ripple>
      </div>
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}><Lightbulb size={19} color={C.goldHi} /><span style={{ fontWeight: 800, color: t.text, fontSize: 17 }}>Napi Kihívások</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {challenges.map((ch) => (
            <Ripple key={ch.name} onClick={openQR} aria={ch.name} color="rgba(120,120,120,0.18)" style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 13, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><ch.icon size={21} color={t.active} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{ch.name}</div><div style={{ color: t.soft, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.desc}</div></div>
              <Pill bg={okBg} fg={C.green}>+{ch.pts}p</Pill>
            </Ripple>
          ))}
        </div>
      </div>
    </Scroll>
  );

  const fltActive = flt.age !== "Mind" || flt.price !== "Mind" || flt.place !== "Mind" || flt.pts;
  const renderExplore = () => {
    let shown = cat === "Mind" ? events : events.filter((e) => e.cat === cat);
    shown = shown.filter((e) => (flt.age === "Mind" || e.age === flt.age || e.age === "Mind") && (flt.price === "Mind" || (flt.price === "Ingyenes" ? e.free : !e.free)) && (flt.place === "Mind" || (flt.place === "Kültéri" ? e.outdoor : !e.outdoor)) && (!flt.pts || e.pts > 0));
    return (
      <Scroll>
        <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Felfedezés" />
        <div style={{ padding: "0 18px", display: "flex", gap: 10 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: t.chip, borderRadius: 999, padding: "11px 16px" }}><Search size={17} color={t.soft} /><input placeholder="Keresés…" style={{ border: "none", outline: "none", background: "transparent", color: t.text, fontSize: 14, width: "100%" }} /></div>
          <div style={{ position: "relative" }}><IconBtn icon={SlidersHorizontal} t={t} color="#fff" label="Szűrők" onClick={() => setFilterOpen(true)} />{fltActive && <span style={{ position: "absolute", top: 2, right: 2, width: 12, height: 12, borderRadius: 99, background: C.goldHi, border: `2px solid ${t.app}` }} />}</div>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 18px 6px" }} className="nobar">
          {["Mind", ...cats.map((c) => c.n)].map((n) => { const on = cat === n; const cc = n === "Mind" ? t.active : catColor(n); return <Ripple key={n} onClick={() => setCat(n)} aria={n} color="rgba(255,255,255,0.3)" style={{ flex: "0 0 auto", background: on ? cc : t.chip, color: on ? "#fff" : t.text, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{n}</Ripple>; })}
        </div>
        {shown.length === 0 && <div style={{ padding: "30px 18px", textAlign: "center", color: t.soft, fontSize: 14 }}>Nincs a szűrőknek megfelelő esemény. 🔍</div>}
        <div style={{ padding: "6px 18px 0", display: "flex", flexDirection: "column", gap: 13 }}>
          {shown.map((p) => (
            <Ripple key={p.id} onClick={() => openEvent(p.id)} aria={p.name} color="rgba(120,120,120,0.16)" style={{ ...card, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 110, background: `linear-gradient(120deg, ${catColor(p.cat)}, ${C.blue})`, position: "relative", display: "grid", placeItems: "center" }}>
                <p.icon size={36} color="rgba(255,255,255,0.92)" />
                <div style={{ position: "absolute", top: 10, right: 10 }}><Pill bg="rgba(21,158,140,0.95)" fg="#fff">+{p.pts} Pont</Pill></div>
                <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}><Pill bg="rgba(0,0,0,0.32)" fg="#fff">{p.cat}</Pill>{p.free && <Pill bg="rgba(0,0,0,0.32)" fg="#fff">Ingyenes</Pill>}</div>
              </div>
              <div style={{ padding: 13 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15.5 }}>{p.name}</div><div style={{ color: t.soft, fontSize: 12.5, marginTop: 5, display: "flex", gap: 14 }}><span><Calendar size={12} style={{ verticalAlign: -1 }} /> {p.date.split(",")[0].replace("2026. ", "")}</span><span><MapPin size={12} style={{ verticalAlign: -1 }} /> {p.place}</span></div></div>
            </Ripple>
          ))}
        </div>
      </Scroll>
    );
  };

  const renderEvent = () => {
    const ev = events.find((e) => e.id === evId) || events[0];
    return (
      <Scroll>
        <div style={{ position: "relative", height: 300, overflow: "hidden", background: `linear-gradient(150deg, ${catColor(ev.cat)} 0%, ${C.blue} 65%, ${C.dark} 100%)` }}>
          {[18, 38, 58, 78].map((l, i) => <div key={i} style={{ position: "absolute", top: -40, left: `${l}%`, width: 26, height: 420, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)", transform: `rotate(${i % 2 ? 14 : -12}deg)`, filter: "blur(5px)", opacity: 0.5 }} />)}
          <ev.icon size={120} color="rgba(255,255,255,0.12)" style={{ position: "absolute", right: -10, top: 60 }} />
          <Skyline color="rgba(255,255,255,0.14)" opacity={1} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 28%, transparent 50%, rgba(14,42,51,0.92) 100%)" }} />
          <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", zIndex: 2 }}><IconBtn icon={ArrowLeft} t={t} scrim label="Vissza" onClick={() => setScreen("explore")} /><IconBtn icon={Share2} t={t} scrim label="Megosztás" onClick={() => fire("Megosztás…", C.cyan)} /></div>
          <div style={{ position: "absolute", bottom: 16, left: 18, right: 18, zIndex: 2 }}><span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#fff", opacity: 0.9 }}>{ev.cat.toUpperCase()}</span><div style={{ fontSize: 29, fontWeight: 900, color: "#fff", lineHeight: 1.06, marginTop: 6 }}>{ev.name}</div></div>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><MapPin size={20} color={t.soft} /></div>
            <div style={{ flex: 1, fontWeight: 700, color: t.text, fontSize: 15 }}>{ev.place}</div>
            {fbtn("Útvonal", () => fire("Útvonaltervezés megnyitása…", C.blue), { icon: Navigation, outlined: true, fg: t.text, ripple: "rgba(120,120,120,0.18)" })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><Calendar size={19} color={t.soft} /></div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: t.text, fontSize: 15 }}>{ev.date}</div><div style={{ color: t.soft, fontSize: 12.5, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> {ev.time}</div></div>
          </div>
          <MapPreview onClick={() => fire("Útvonaltervezés megnyitása…", C.blue)} />
          <div style={{ marginTop: 16, borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 12, background: okBg, border: `1px solid ${C.green}40` }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: C.green, display: "grid", placeItems: "center", flex: "0 0 auto" }}><QrCode size={22} color="#fff" /></div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 14.5 }}>Itt pontot gyűjthetsz!</div><div style={{ color: C.green, fontWeight: 800, fontSize: 13 }}>+{ev.pts} pont a QR-beolvasásért</div></div>
            {fbtn("Gyűjtés", openQR, { bg: C.green })}
          </div>
          <div style={{ marginTop: 18 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 16, marginBottom: 8 }}>Leírás</div><div style={{ color: t.soft, fontSize: 14, lineHeight: 1.55 }}>{ev.desc}</div></div>
          <div style={{ ...card, padding: 14, marginTop: 16, display: "flex", alignItems: "center", gap: 11 }}><Info size={18} color={t.active} /><div style={{ fontSize: 13.5, color: t.text }}>Szervező: <b>{ev.partner}</b></div></div>
          <div style={{ marginTop: 18 }}>{fbtn("Érdekel", () => fire("Felvettük az érdeklődéseid közé ⭐", C.cyan), { full: true })}</div>
        </div>
      </Scroll>
    );
  };

  const renderScanner = () => (
    <div style={{ height: "100%", position: "relative", background: "#06222B", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}><IconBtn icon={X} t={t} scrim label="Bezárás" onClick={() => setScreen(qrBack)} /></div>
      <div style={{ flex: 1, display: "grid", placeItems: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 42%, ${C.cyan}33, transparent 60%)` }} />
        <div style={{ position: "relative", width: 230, height: 230, borderRadius: 26 }}>
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", width: 38, height: 38, [y ? "bottom" : "top"]: 0, [x ? "right" : "left"]: 0, borderTop: !y ? `4px solid ${scanState === "success" ? C.green : C.cyan}` : "none", borderBottom: y ? `4px solid ${scanState === "success" ? C.green : C.cyan}` : "none", borderLeft: !x ? `4px solid ${scanState === "success" ? C.green : C.cyan}` : "none", borderRight: x ? `4px solid ${scanState === "success" ? C.green : C.cyan}` : "none", borderRadius: 10 }} />
          ))}
          {scanState === "idle" && <div className={anim("laser")} style={{ position: "absolute", top: "48%", left: 12, right: 12, height: 3, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`, boxShadow: `0 0 14px ${C.cyan}` }} />}
          {scanState === "success" && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><div style={{ width: 80, height: 80, borderRadius: 999, background: C.green, display: "grid", placeItems: "center", boxShadow: `0 0 30px ${C.green}` }}><Check size={44} color="#fff" /></div></div>}
        </div>
      </div>
      <div style={{ padding: "0 28px 40px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Irányítsd a kamerát a QR-kódra a pontokért!</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, marginTop: 6, marginBottom: 16 }}>(Prototípus – koppints a gombra a beolvasás szimulálásához)</div>
        <div style={{ display: "inline-block" }}>{fbtn("Beolvasás szimulálása", simulateScan, { bg: C.cyan, fg: "#06222B" })}</div>
      </div>
    </div>
  );

  const renderPoints = () => (
    <Scroll>
      <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Pontok" />
      <div style={{ padding: "0 18px 4px" }}>
        <div style={{ ...card, padding: 16, background: `linear-gradient(120deg, ${C.gold}, ${C.goldHi})`, border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#3a2a10", boxShadow: a.contrast ? "none" : elev[2] }}>
          <div><div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.8 }}>Egyenleged</div><div style={{ fontSize: 28, fontWeight: 900, display: "flex", alignItems: "center", gap: 8 }}><Coin size={26} /> {points} Pont</div></div><Wallet size={34} />
        </div>
      </div>
      <div style={{ padding: "14px 18px 0" }}>
        <div style={{ display: "flex", background: t.chip, borderRadius: 999, padding: 4 }}>
          {[{ k: "earn", l: "Pontszerzés" }, { k: "redeem", l: "Beváltás" }].map((tab) => (
            <Ripple key={tab.k} onClick={() => setPointsTab(tab.k)} aria={tab.l} color="rgba(120,120,120,0.18)" style={{ flex: 1, padding: "9px 0", borderRadius: 999, cursor: "pointer", fontWeight: 800, fontSize: 13.5, textAlign: "center", background: pointsTab === tab.k ? (dark ? t.active : "#fff") : "transparent", color: pointsTab === tab.k ? (dark ? "#06202f" : t.active) : t.soft, boxShadow: pointsTab === tab.k && !a.contrast ? elev[1] : "none" }}>{tab.l}</Ripple>
          ))}
        </div>
      </div>
      {pointsTab === "earn" && (
        <div style={{ padding: "14px 18px 0", display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ color: t.soft, fontSize: 12.5, marginBottom: -2 }}>Olvasd be a helyszíni QR-kódot a pontokért.</div>
          {earnSpots.map((s) => (
            <div key={s.name} style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><s.icon size={21} color={t.active} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 14.5 }}>{s.name}</div><div style={{ color: t.soft, fontSize: 12.5 }}><MapPin size={11} style={{ verticalAlign: -1 }} /> {s.place}</div></div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}><Pill bg={okBg} fg={C.green}>+{s.pts}p</Pill>{fbtn("Gyűjtés", openQR, { icon: QrCode })}</div>
            </div>
          ))}
        </div>
      )}
      {pointsTab === "redeem" && (
        <div style={{ padding: "14px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {rewards.map((r) => {
            const done = redeemed.includes(r.id), ok = points >= r.cost;
            return (
              <div key={r.id} style={{ ...card, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: `${r.c}1f`, display: "grid", placeItems: "center" }}><r.icon size={22} color={r.c} /></div>
                <div style={{ fontWeight: 800, color: t.text, fontSize: 13.5, lineHeight: 1.2, minHeight: 33 }}>{r.name}</div>
                <div style={{ color: t.goldText, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}><Coin size={14} /> {r.cost} Pont</div>
                <Ripple onClick={() => !done && redeem(r)} aria={r.name} color={ok && !done ? "rgba(255,255,255,0.4)" : "rgba(120,120,120,0.15)"} style={{ marginTop: 2, padding: "9px 0", borderRadius: 999, textAlign: "center", cursor: done ? "default" : "pointer", fontWeight: 800, fontSize: 13, background: done ? okBg : ok ? t.active : t.chip, color: done ? C.green : ok ? "#fff" : t.soft }}>{done ? "✓ Beváltva" : "Kérem"}</Ripple>
              </div>
            );
          })}
        </div>
      )}
    </Scroll>
  );

  const renderHistory = () => {
    const earned = history.filter((h) => h.type === "earn").reduce((s, h) => s + h.val, 0);
    const spent = history.filter((h) => h.type === "redeem").reduce((s, h) => s + h.val, 0);
    const list = histFilter === "all" ? history : history.filter((h) => h.type === histFilter);
    return (
      <Scroll>
        <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Előzmények" back="profile" />
        <div style={{ padding: "0 18px", display: "flex", gap: 12 }}>
          <div style={{ ...card, flex: 1, padding: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 7 }}><TrendingUp size={16} color={C.green} /><span style={{ color: t.soft, fontSize: 12 }}>Gyűjtött</span></div><div style={{ fontWeight: 900, fontSize: 20, color: C.green, marginTop: 5 }}>+{earned}</div></div>
          <div style={{ ...card, flex: 1, padding: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 7 }}><TrendingDown size={16} color={C.red} /><span style={{ color: t.soft, fontSize: 12 }}>Beváltott</span></div><div style={{ fontWeight: 900, fontSize: 20, color: C.red, marginTop: 5 }}>−{spent}</div></div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "14px 18px 4px" }}>
          {[{ k: "all", l: "Mind" }, { k: "earn", l: "Pontszerzés" }, { k: "redeem", l: "Beváltás" }].map((f) => { const on = histFilter === f.k; return <Ripple key={f.k} onClick={() => setHistFilter(f.k)} aria={f.l} color="rgba(120,120,120,0.18)" style={{ background: on ? t.active : t.chip, color: on ? "#fff" : t.text, borderRadius: 999, padding: "8px 15px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{f.l}</Ripple>; })}
        </div>
        <div style={{ padding: "8px 18px 0", display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((h, i) => {
            const earn = h.type === "earn";
            return (
              <Ripple key={i} onClick={() => fire(`${h.n} · ${h.place} · ${h.dt}`, earn ? C.green : C.red)} aria={h.n} color="rgba(120,120,120,0.15)" style={{ ...card, padding: 13, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: earn ? okBg : dangerBg, display: "grid", placeItems: "center", flex: "0 0 auto" }}>{earn ? <ArrowUpRight size={20} color={C.green} /> : <ArrowDownRight size={20} color={C.red} />}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 14.5 }}>{h.n}</div><div style={{ color: t.soft, fontSize: 12 }}>{h.place} · {h.dt}</div></div>
                <div style={{ fontWeight: 900, fontSize: 15, color: earn ? C.green : C.red }}>{earn ? "+" : "−"}{h.val}</div>
              </Ripple>
            );
          })}
        </div>
      </Scroll>
    );
  };

  const renderProfile = () => (
    <Scroll>
      <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Profil" />
      <div style={{ padding: "0 18px" }}>
        <div className={anim("holo")} style={{ position: "relative", borderRadius: 22, overflow: "hidden", padding: 18, color: "#fff", minHeight: 150, background: `linear-gradient(115deg, ${C.blue}, ${C.cyan}, ${C.goldHi}, ${C.coral})`, backgroundSize: "300% 300%", boxShadow: a.contrast ? "none" : elev[2] }}>
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between" }}><div><Crown size={30} /><div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 2, marginTop: 6 }}>DIGITÁLIS IFJÚSÁGI KÁRTYA</div></div><div style={{ width: 52, height: 52, borderRadius: 14, background: "#fff", display: "grid", placeItems: "center" }}><QrCode size={36} color={C.blue} /></div></div>
          <div style={{ position: "relative", zIndex: 1, marginTop: 26 }}><div style={{ fontSize: 12, opacity: 0.9 }}>Kártyatulajdonos</div><div style={{ fontWeight: 900, fontSize: 20 }}>NAGY ANNA</div><div style={{ fontFamily: "monospace", letterSpacing: 3, fontSize: 13, marginTop: 4, opacity: 0.9 }}>VESZ · 0042 · 2026</div></div>
        </div>
      </div>
      <div style={{ padding: "16px 18px 0", display: "flex", gap: 12 }}>
        {[{ l: "Meglátogatott események", v: "12", i: Calendar, c: t.active }, { l: "Megspórolt pénz", v: "8 500 Ft", i: TrendingUp, c: C.green }].map((s) => (
          <div key={s.l} style={{ ...card, flex: 1, padding: 14 }}><s.i size={18} color={s.c} /><div style={{ fontWeight: 900, fontSize: 18, color: t.text, marginTop: 6 }}>{s.v}</div><div style={{ color: t.soft, fontSize: 11.5, marginTop: 2 }}>{s.l}</div></div>
        ))}
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ ...card, overflow: "hidden", padding: 0 }}>
          {[
            { l: "Előzmények", i: History, a: () => setScreen("history") }, { l: "Személyes adatok", i: User, a: () => fire("Adatok szerkesztése…", t.active) },
            { l: "Akadálymentesség", i: Accessibility, a: () => setScreen("a11y") }, { l: "Értesítések", i: Bell, a: () => fire("Értesítések…", t.active) },
            { l: "Segítő & V-Buddy", i: MessageCircle, a: () => setScreen("support") }, { l: dark ? "Világos mód" : "Sötét mód", i: dark ? Sun : Moon, a: () => setDark((d) => !d) },
            { l: "Kijelentkezés", i: LogOut, a: () => setScreen("login"), red: true },
          ].map((m, i, arr) => (
            <Ripple key={m.l} onClick={m.a} aria={m.l} color="rgba(120,120,120,0.15)" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : "none", cursor: "pointer", color: m.red ? C.red : t.text }}>
              <m.i size={18} color={m.red ? C.red : t.soft} /><span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{m.l}</span><ChevronRight size={16} color={t.soft} />
            </Ripple>
          ))}
        </div>
      </div>
    </Scroll>
  );

  const renderA11y = () => {
    const rows = [
      { k: "contrast", n: "Magas kontraszt", d: "Erősebb színek és körvonalak a jobb olvashatóságért", i: Contrast, c: t.active },
      { k: "big", n: "Nagyobb szöveg", d: "Az egész felület megnő a könnyebb leolvasáshoz", i: Type, c: C.green },
      { k: "reduce", n: "Mozgás csökkentése", d: "Kikapcsolja az animációkat és a ripple-effektet", i: Wind, c: C.coral },
    ];
    return (
      <Scroll>
        <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Akadálymentesség" back="profile" />
        <div style={{ padding: "8px 18px 0", color: t.soft, fontSize: 13.5 }}>Állítsd be úgy az appot, ahogy a legkényelmesebb. A beállítások azonnal érvénybe lépnek.</div>
        <div style={{ padding: "16px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r) => (
            <div key={r.k} style={{ ...card, padding: 15, display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: `${r.c}1f`, display: "grid", placeItems: "center", flex: "0 0 auto" }}><r.i size={21} color={r.c} /></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{r.n}</div><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.35, marginTop: 2 }}>{r.d}</div></div>
              <Switch on={a[r.k]} t={t} onChange={() => setA((s) => ({ ...s, [r.k]: !s[r.k] }))} />
            </div>
          ))}
          <div style={{ ...card, padding: 14, display: "flex", gap: 11, alignItems: "flex-start" }}><Info size={18} color={t.active} style={{ marginTop: 1, flex: "0 0 auto" }} /><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.5 }}>A gombok és ikonok képernyőolvasó-feliratokkal (aria-label) vannak ellátva, és a fő szövegek WCAG-kontrasztra törekednek.</div></div>
        </div>
      </Scroll>
    );
  };

  const renderTechniques = () => (
    <Scroll>
      <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Tanulási technikák" back="support" />
      <div style={{ padding: "8px 18px 0", color: t.soft, fontSize: 13.5 }}>Bevált módszerek, kamuzás nélkül. Koppints egyre a részletekért. 👇</div>
      <div style={{ padding: "16px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {techniques.map((tech) => {
          const open = openTech === tech.n;
          return (
            <div key={tech.n} style={{ ...card, overflow: "hidden" }}>
              <Ripple onClick={() => setOpenTech(open ? null : tech.n)} aria={tech.n} color="rgba(120,120,120,0.15)" style={{ display: "flex", alignItems: "center", gap: 13, padding: 14, cursor: "pointer" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${tech.c}22`, display: "grid", placeItems: "center", fontSize: 24, flex: "0 0 auto" }}>{tech.e}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 800, color: t.text, fontSize: 15.5 }}>{tech.n}</span><Pill bg={`${tech.c}22`} fg={tech.c}>{tech.tag}</Pill></div><div style={{ color: t.soft, fontSize: 12.8, marginTop: 3, lineHeight: 1.35 }}>{tech.hook}</div></div>
                <ChevronDown size={18} color={t.soft} style={{ transform: open ? "rotate(180deg)" : "none", transition: a.reduce ? "none" : "transform .2s", flex: "0 0 auto" }} />
              </Ripple>
              {open && (
                <div style={{ padding: "0 16px 16px 73px" }}>
                  <div style={{ marginBottom: 10 }}><div style={{ fontWeight: 800, color: tech.c, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Hogyan</div><div style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginTop: 2 }}>{tech.how}</div></div>
                  <div style={{ marginBottom: 10 }}><div style={{ fontWeight: 800, color: tech.c, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Mikor jó</div><div style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginTop: 2 }}>{tech.when}</div></div>
                  <div style={{ display: "flex", gap: 9, alignItems: "flex-start", background: t.chip, borderRadius: 12, padding: "10px 12px" }}><span style={{ fontSize: 15 }}>💡</span><div style={{ color: t.text, fontSize: 13, lineHeight: 1.45 }}>{tech.tip}</div></div>
                  {tech.go && <div style={{ marginTop: 12 }}>{fbtn("Indítsd a Fókusz Órát", () => setScreen("focus"), { icon: Timer })}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Scroll>
  );

  const renderStudy = () => (
    <Scroll>
      <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Továbbtanulás" back="support" />
      <div style={{ padding: "8px 18px 0", color: t.soft, fontSize: 13.5 }}>Megbízható oldalak a középiskolai és felsőoktatási döntésekhez. A linkek külső oldalt nyitnak.</div>
      <div style={{ padding: "16px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {studyLinks.map((s) => (
          <a key={s.n} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: `${s.c}1f`, display: "grid", placeItems: "center", flex: "0 0 auto" }}><s.icon size={22} color={s.c} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{s.n}</div><div style={{ color: t.soft, fontSize: 12.5 }}>{s.d}</div></div>
              <ExternalLink size={18} color={t.soft} />
            </div>
          </a>
        ))}
        <div style={{ ...card, padding: 14, display: "flex", gap: 11, alignItems: "flex-start" }}><Info size={18} color={t.active} style={{ marginTop: 1, flex: "0 0 auto" }} /><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.5 }}>Tipp: a felvi.hu keresőjébe írd be, hogy „Veszprém", és máris látod a helyi szakokat.</div></div>
        <Ripple onClick={() => setScreen("chat")} aria="V-Buddy" color="rgba(255,255,255,0.3)" style={{ borderRadius: 18, padding: 16, color: "#fff", cursor: "pointer", background: `linear-gradient(120deg, ${C.blue}, ${C.cyan})`, display: "flex", alignItems: "center", gap: 12 }}>
          <Bot size={24} /><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>Nem tudod, mihez kezdj?</div><div style={{ fontSize: 12.5, opacity: 0.9 }}>Kérdezd meg V-Buddyt a lehetőségeidről!</div></div><ChevronRight size={20} />
        </Ripple>
      </div>
    </Scroll>
  );

  const renderSupport = () => (
    <Scroll>
      <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Segítő" />
      <div style={{ padding: "0 18px 2px", color: t.soft, fontSize: 13.5 }}>Minden eszköz, ami a tanuláshoz és a mindennapokhoz kell.</div>
      <div style={{ padding: "12px 18px 0" }}>
        <div style={{ borderRadius: 18, padding: 16, border: `1px solid ${C.red}66`, background: dangerBg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: C.red, display: "grid", placeItems: "center" }}><Phone size={20} color="#fff" /></div><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>Sürgős segítségre van szükséged?</div></div>
          <div style={{ color: t.soft, fontSize: 12.5, margin: "10px 0 12px" }}>Ingyenes, névtelen, éjjel-nappal hívható segélyvonalak.</div>
          <a href="tel:116111" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", background: C.red, color: "#fff", borderRadius: 13, padding: "12px 16px", fontWeight: 800, fontSize: 14, marginBottom: 9 }}><span><Phone size={15} style={{ verticalAlign: -2 }} /> Kék Vonal · 116-111</span><span style={{ fontSize: 12, opacity: 0.85 }}>24 év alatt</span></a>
          <a href="tel:116123" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", border: `1px solid ${C.red}`, color: C.red, borderRadius: 13, padding: "11px 16px", fontWeight: 800, fontSize: 14 }}><span><Phone size={15} style={{ verticalAlign: -2 }} /> Lelki Elsősegély · 116-123</span><span style={{ fontSize: 12, opacity: 0.75 }}>0–24</span></a>
        </div>
      </div>
      <div style={{ padding: "14px 18px 0" }}>
        <Ripple onClick={() => setScreen("chat")} aria="AI Asszisztens" color="rgba(255,255,255,0.3)" style={{ borderRadius: 18, padding: 18, color: "#fff", cursor: "pointer", background: `linear-gradient(120deg, ${C.blue}, ${C.cyan})`, boxShadow: a.contrast ? "none" : elev[2] }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "grid", placeItems: "center" }}><Bot size={26} /></div><div style={{ flex: 1 }}><div style={{ fontWeight: 900, fontSize: 17 }}>AI Asszisztens</div><div style={{ fontSize: 12.5, opacity: 0.9 }}>Kérdezz bármit a várossal vagy tanulással kapcsolatban.</div></div><ChevronRight size={20} /></div>
        </Ripple>
      </div>
      <div style={{ padding: "14px 18px 0" }}><ToolGrid items={toolsList} /></div>
    </Scroll>
  );

  const renderChat = () => {
    const prompts = ["Mit csináljak ma Veszprémben?", "Segíts a tanulásban", "Rosszul érzem magam"];
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.app }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", boxShadow: a.contrast ? "none" : elev[1], borderBottom: a.contrast ? `1px solid ${t.line}` : "none", background: t.nav, zIndex: 2 }}>
          <IconBtn icon={ChevronLeft} t={t} label="Vissza" onClick={() => setScreen("support")} />
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(120deg, ${C.blue}, ${C.cyan})`, display: "grid", placeItems: "center", color: "#fff" }}><Bot size={20} /></div>
          <div><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>V-Buddy</div><div style={{ color: C.green, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: C.green, display: "inline-block" }} /> Online</div></div>
        </div>
        <div className="nobar" style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {chat.map((m, i) => <div key={i} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "82%", background: m.from === "me" ? t.active : t.card, color: m.from === "me" ? "#fff" : t.text, border: m.from === "me" ? "none" : cardBorder, borderRadius: 18, borderBottomRightRadius: m.from === "me" ? 5 : 18, borderBottomLeftRadius: m.from === "me" ? 18 : 5, padding: "11px 14px", fontSize: 14, lineHeight: 1.45 }}>{m.text}</div>)}
          <div ref={chatEnd} />
        </div>
        <div style={{ padding: "0 14px 8px", display: "flex", gap: 8, overflowX: "auto" }} className="nobar">
          {prompts.map((p) => <Ripple key={p} onClick={() => sendMsg(p)} aria={p} color="rgba(120,120,120,0.18)" style={{ flex: "0 0 auto", background: t.chip, border: `1px solid ${t.line}`, borderRadius: 999, padding: "7px 13px", color: t.text, fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{p}</Ripple>)}
        </div>
        <div style={{ padding: "8px 14px 14px", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${t.line}` }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: t.inputBg, borderRadius: 999, padding: "4px 6px 4px 14px" }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder="Írj egy üzenetet…" style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: t.text, fontSize: 14, padding: "8px 0" }} />
            <Mic size={20} color={t.soft} style={{ cursor: "pointer" }} />
          </div>
          <IconBtn icon={Send} t={t} color="#fff" label="Küldés" onClick={() => sendMsg()} />
        </div>
      </div>
    );
  };

  const renderFocus = () => {
    const mm = String(Math.floor(focusLeft / 60)).padStart(2, "0"), ss = String(focusLeft % 60).padStart(2, "0");
    const total = focusMin * 60, prog = total ? 1 - focusLeft / total : 0;
    return (
      <Scroll>
        <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Fókusz Óra" back="support" />
        <div style={{ padding: "10px 18px 0", color: t.soft, fontSize: 13.5 }}>Pomodoro időzítő az önálló tanuláshoz.</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 9, padding: "18px 18px 0" }}>
          {[15, 25, 40].map((m) => <Ripple key={m} onClick={() => { if (focusRun) return; setFocusMin(m); setFocusLeft(m * 60); }} aria={`${m} perc`} color="rgba(120,120,120,0.18)" style={{ padding: "9px 18px", borderRadius: 999, border: `1px solid ${focusMin === m ? t.active : t.line}`, background: focusMin === m ? t.active : t.card, color: focusMin === m ? "#fff" : t.text, fontWeight: 800, fontSize: 14, cursor: focusRun ? "default" : "pointer", opacity: focusRun ? 0.5 : 1 }}>{m} perc</Ripple>)}
        </div>
        <div style={{ display: "grid", placeItems: "center", padding: "28px 0 18px" }}>
          <div style={{ position: "relative", width: 210, height: 210, display: "grid", placeItems: "center" }}>
            <svg width="210" height="210" style={{ position: "absolute", transform: "rotate(-90deg)" }}><circle cx="105" cy="105" r="92" fill="none" stroke={t.chip} strokeWidth="14" /><circle cx="105" cy="105" r="92" fill="none" stroke={t.active} strokeWidth="14" strokeLinecap="round" strokeDasharray={2 * Math.PI * 92} strokeDashoffset={2 * Math.PI * 92 * (1 - prog)} style={{ transition: a.reduce ? "none" : "stroke-dashoffset 1s linear" }} /></svg>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 46, fontWeight: 900, color: t.text, fontFamily: "monospace" }}>{mm}:{ss}</div><div style={{ color: t.soft, fontSize: 13, fontWeight: 700 }}>{focusRun ? "Fókuszálj! 🎯" : "Készen állsz?"}</div></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, padding: "0 18px" }}>
          <Ripple onClick={() => setFocusRun((r) => !r)} aria={focusRun ? "Szünet" : "Indítás"} color="rgba(255,255,255,0.4)" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, borderRadius: 999, background: focusRun ? C.gold : C.green, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>{focusRun ? <><Pause size={18} /> Szünet</> : <><Play size={18} /> Indítás</>}</Ripple>
          <Ripple onClick={() => { setFocusRun(false); setFocusLeft(focusMin * 60); }} aria="Visszaállítás" color="rgba(120,120,120,0.18)" style={{ width: 56, display: "grid", placeItems: "center", borderRadius: 999, border: `1px solid ${t.line}`, background: t.card, color: t.text, cursor: "pointer" }}><RotateCcw size={20} /></Ripple>
        </div>
      </Scroll>
    );
  };

  const renderIdeabox = () => (
    <Scroll>
      <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Ötletláda" back="support" />
      <div style={{ padding: "10px 18px 0", color: t.soft, fontSize: 13.5 }}>Küldj be névtelenül ötletet a városnak, a közösségnek vagy az apphoz.</div>
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ ...card, padding: 14 }}>
          <textarea value={ideaText} onChange={(e) => setIdeaText(e.target.value)} maxLength={1000} placeholder="Mi járna jót Veszprémben? Írd le bátran…" style={{ width: "100%", boxSizing: "border-box", minHeight: 140, resize: "none", border: "none", outline: "none", background: "transparent", color: t.text, fontSize: 14.5, lineHeight: 1.5, fontFamily: "inherit" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}><span style={{ color: t.soft, fontSize: 12 }}>{ideaText.length}/1000</span>{fbtn("Beküldöm", () => { if (!ideaText.trim()) { fire("Írj előbb egy ötletet 🙂", C.gold); return; } setIdeaText(""); fire("Köszönjük az ötleted! 💡", C.green); })}</div>
        </div>
        <div style={{ ...card, padding: 14, marginTop: 12, display: "flex", gap: 11, alignItems: "flex-start" }}><Sparkles size={18} color={C.gold} style={{ marginTop: 2 }} /><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.5 }}>A beküldés névtelen. Az admin válaszát itt látnád viszont az ötleted alatt.</div></div>
      </div>
    </Scroll>
  );

  const renderServices = () => {
    const Section = ({ title, items, icon: Ic }) => (
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Ic size={18} color={t.active} /><span style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{title}</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {items.map((it) => (
            <div key={it.n} style={{ ...card, padding: 14 }}>
              <div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{it.n}</div><div style={{ color: t.soft, fontSize: 12.5, marginTop: 3 }}>{it.s} · {it.m}</div>
              <div style={{ display: "flex", gap: 9, marginTop: 11 }}>{fbtn("Telefon", () => fire("Hívás indítása (külső csatorna)…", C.green), { bg: t.chip, fg: t.text, icon: Phone, full: true, ripple: "rgba(120,120,120,0.18)" })}{fbtn("E-mail", () => fire("E-mail megnyitása (külső csatorna)…", t.active), { bg: t.chip, fg: t.text, icon: Send, full: true, ripple: "rgba(120,120,120,0.18)" })}</div>
            </div>
          ))}
        </div>
      </div>
    );
    return (
      <Scroll>
        <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Szolgáltatások" back="support" />
        <div style={{ padding: "10px 18px 0", color: t.soft, fontSize: 13.5 }}>Tájékoztató lista – a kapcsolatfelvétel külső csatornán történik.</div>
        <Section title="Magántanárok" items={teachers} icon={BookOpen} /><Section title="Autósiskolák" items={schools} icon={School} />
      </Scroll>
    );
  };

  const renderBudget = () => {
    const LIMIT = 3, used = myVotes.length;
    const toggle = (id) => {
      if (myVotes.includes(id)) setMyVotes((v) => v.filter((x) => x !== id));
      else if (used >= LIMIT) fire(`Legfeljebb ${LIMIT} projektet támogathatsz 🙂`, C.coral);
      else { setMyVotes((v) => [...v, id]); fire("Szavazat hozzáadva! ✅", C.green); }
    };
    const supportBtn = (p) => { const mine = myVotes.includes(p.id), locked = !mine && used >= LIMIT; return fbtn(mine ? "✓ Támogatod" : "Támogatom", () => toggle(p.id), { full: true, bg: mine ? C.green : locked ? t.chip : t.active, fg: mine ? "#fff" : locked ? t.soft : "#fff", ripple: locked ? "rgba(120,120,120,0.1)" : "rgba(255,255,255,0.4)" }); };

    if (projSel) {
      const p = projects.find((x) => x.id === projSel) || projects[0];
      const mine = myVotes.includes(p.id), total = p.v + (mine ? 1 : 0);
      return (
        <Scroll>
          <div style={{ position: "relative", height: 210, overflow: "hidden", background: `linear-gradient(150deg, ${p.c} 0%, ${C.coral} 70%, ${C.dark} 100%)` }}>
            <p.icon size={120} color="rgba(255,255,255,0.14)" style={{ position: "absolute", right: -8, top: 42 }} />
            <Skyline color="rgba(255,255,255,0.16)" opacity={1} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 40%, rgba(14,42,51,0.85))" }} />
            <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
              <IconBtn icon={ArrowLeft} t={t} scrim label="Vissza" onClick={() => setProjSel(null)} />
              <IconBtn icon={Share2} t={t} scrim label="Megosztás" onClick={() => fire("Megosztás…", C.cyan)} />
            </div>
            <div style={{ position: "absolute", bottom: 14, left: 18, right: 18, zIndex: 2 }}><span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1.5, color: "#fff", opacity: 0.9 }}>{p.cat.toUpperCase()}</span><div style={{ fontSize: 23, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginTop: 5 }}>{p.name}</div></div>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Pill bg={t.chip} fg={t.text}>📍 {p.district}</Pill><Pill bg={t.chip} fg={t.text}>💰 {p.cost}</Pill>{total >= 300 && <Pill bg={okBg} fg={C.green}>Finanszírozható</Pill>}</div>
            <div style={{ ...card, padding: 13, marginTop: 14, display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: `${p.c}1f`, display: "grid", placeItems: "center", flex: "0 0 auto" }}><User size={19} color={p.c} /></div>
              <div><div style={{ fontSize: 11.5, color: t.soft }}>Beküldő</div><div style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{p.by}</div></div>
            </div>
            <div style={{ marginTop: 16 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 16, marginBottom: 7 }}>A projektről</div><div style={{ color: t.soft, fontSize: 14, lineHeight: 1.55 }}>{p.long}</div></div>
            <div style={{ marginTop: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><PieChart size={18} color={p.c} /><span style={{ fontWeight: 800, color: t.text, fontSize: 16 }}>Tervezett költségbontás</span></div>
              <div style={{ ...card, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                {p.bd.map((b) => (
                  <div key={b.l}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ color: t.text, fontWeight: 600 }}>{b.l}</span><span style={{ color: t.soft, fontWeight: 700 }}>{b.pct}%</span></div>
                    <div style={{ height: 7, borderRadius: 99, background: t.chip, overflow: "hidden" }}><div style={{ width: `${b.pct}%`, height: "100%", background: p.c, borderRadius: 99 }} /></div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${t.line}`, paddingTop: 10, fontWeight: 800, color: t.text, fontSize: 14 }}><span>Becsült összköltség</span><span>{p.cost}</span></div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}><MapPin size={18} color={p.c} /><span style={{ fontWeight: 800, color: t.text, fontSize: 16 }}>Helyszín</span></div><MapPreview onClick={() => fire("Útvonaltervezés megnyitása…", C.blue)} /></div>
            <div style={{ marginTop: 18, height: 8, borderRadius: 99, background: t.chip, overflow: "hidden" }}><div style={{ width: `${Math.min(100, total / 5)}%`, height: "100%", background: mine ? C.green : p.c, borderRadius: 99, transition: a.reduce ? "none" : "width .4s" }} /></div>
            <div style={{ color: t.soft, fontSize: 12.5, marginTop: 6 }}>{total} szavazat · {used}/{LIMIT} szavazatod felhasználva</div>
            <div style={{ marginTop: 12 }}>{supportBtn(p)}</div>
          </div>
        </Scroll>
      );
    }

    const phases = [{ n: "Ötletek", st: "done" }, { n: "Szavazás", st: "active" }, { n: "Eredmény", st: "next" }];
    return (
      <Scroll>
        <TopBar t={t} dark={dark} setDark={setDark} setScreen={setScreen} title="Költségvetés" back="support" />
        <div style={{ padding: "10px 18px 0" }}>
          <div style={{ ...card, padding: 16, position: "relative", overflow: "hidden", background: `linear-gradient(125deg, ${C.coral}, ${C.red})`, border: "none", color: "#fff", boxShadow: a.contrast ? "none" : elev[2] }}>
            <Skyline color="rgba(255,255,255,0.16)" opacity={1} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><PieChart size={22} /><span style={{ fontWeight: 700, fontSize: 12, letterSpacing: 1, opacity: 0.9 }}>RÉSZVÉTELI KÖLTSÉGVETÉS 2026</span></div>
              <div style={{ fontWeight: 900, fontSize: 19, marginTop: 8, lineHeight: 1.15 }}>Dönts te, mire költsön a város!</div>
              <div style={{ display: "flex", gap: 18, marginTop: 14 }}>
                {[{ l: "Keret", v: "20 M Ft" }, { l: "Szavazás vége", v: "Júl. 31." }, { l: "Projektek", v: String(projects.length) }].map((s) => (
                  <div key={s.l}><div style={{ fontWeight: 900, fontSize: 16 }}>{s.v}</div><div style={{ fontSize: 11, opacity: 0.85 }}>{s.l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 24px 0", display: "flex", alignItems: "flex-start" }}>
          {phases.map((ph, i) => (
            <div key={ph.n} style={{ display: "flex", alignItems: "center", flex: i < phases.length - 1 ? 1 : "0 0 auto" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 64 }}>
                <div style={{ width: 26, height: 26, borderRadius: 999, display: "grid", placeItems: "center", background: ph.st === "next" ? t.chip : C.green, color: "#fff" }}>{ph.st === "done" ? <Check size={15} /> : ph.st === "active" ? <span style={{ width: 9, height: 9, borderRadius: 99, background: "#fff" }} /> : <span style={{ color: t.soft, fontWeight: 800, fontSize: 12 }}>{i + 1}</span>}</div>
                <span style={{ fontSize: 11, fontWeight: ph.st === "active" ? 800 : 600, color: ph.st === "next" ? t.soft : t.text }}>{ph.n}</span>
              </div>
              {i < phases.length - 1 && <div style={{ flex: 1, height: 2, background: ph.st === "done" ? C.green : t.line, marginBottom: 18 }} />}
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <Award size={20} color={C.green} />
            <div style={{ flex: 1, fontWeight: 700, color: t.text, fontSize: 13.5 }}>Támogass max. {LIMIT} projektet</div>
            <div style={{ display: "flex", gap: 6 }}>{Array.from({ length: LIMIT }).map((_, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 99, background: i < used ? C.green : "transparent", border: `1.5px solid ${i < used ? C.green : t.line}` }} />)}</div>
          </div>
        </div>
        <div style={{ padding: "14px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.map((p) => {
            const mine = myVotes.includes(p.id), total = p.v + (mine ? 1 : 0), funded = total >= 300;
            return (
              <div key={p.id} style={{ ...card, padding: 14, ...(mine ? { border: `1.5px solid ${C.green}` } : {}) }}>
                <Ripple onClick={() => setProjSel(p.id)} aria={p.name} color="rgba(120,120,120,0.12)" style={{ cursor: "pointer", borderRadius: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: `${p.c}1f`, display: "grid", placeItems: "center", flex: "0 0 auto" }}><p.icon size={22} color={p.c} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15, lineHeight: 1.2 }}>{p.name}</div><div style={{ color: t.soft, fontSize: 12, marginTop: 3, display: "flex", flexWrap: "wrap", gap: "2px 10px" }}><span>{p.cat}</span><span><MapPin size={11} style={{ verticalAlign: -1 }} /> {p.district}</span></div></div>
                    <ChevronRight size={18} color={t.soft} style={{ flex: "0 0 auto" }} />
                  </div>
                  <div style={{ color: t.soft, fontSize: 13, lineHeight: 1.5, marginTop: 10 }}>{p.desc}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}><Pill bg={t.chip} fg={t.text}>💰 {p.cost}</Pill>{funded && <Pill bg={okBg} fg={C.green}>Finanszírozható</Pill>}</div>
                  <div style={{ marginTop: 12, height: 8, borderRadius: 99, background: t.chip, overflow: "hidden" }}><div style={{ width: `${Math.min(100, total / 5)}%`, height: "100%", background: mine ? C.green : p.c, borderRadius: 99, transition: a.reduce ? "none" : "width .4s" }} /></div>
                  <div style={{ color: t.soft, fontSize: 12.5, fontWeight: 600, marginTop: 8 }}>{total} szavazat</div>
                </Ripple>
                <div style={{ marginTop: 12 }}>{supportBtn(p)}</div>
              </div>
            );
          })}
        </div>
      </Scroll>
    );
  };

  const views = { login: renderLogin, register: renderRegister, home: renderHome, explore: renderExplore, event: renderEvent, qr: renderScanner, points: renderPoints, profile: renderProfile, support: renderSupport, chat: renderChat, focus: renderFocus, ideabox: renderIdeabox, services: renderServices, budget: renderBudget, a11y: renderA11y, study: renderStudy, techniques: renderTechniques, history: renderHistory };
  const navItems = [{ id: "home", icon: Home, label: "Főoldal" }, { id: "explore", icon: Compass, label: "Felfedezés" }, { id: "points", icon: Coins, label: "Pontok" }, { id: "profile", icon: User, label: "Profil" }, { id: "support", icon: HelpCircle, label: "Segítő" }];
  const showNav = ["home", "explore", "event", "points", "profile", "support"].includes(screen);
  const navActive = (id) => screen === id || (id === "explore" && screen === "event") || (id === "profile" && ["a11y", "history"].includes(screen)) || (id === "support" && ["study", "techniques", "focus", "ideabox", "services", "budget", "chat"].includes(screen));
  const ages = ["Mind", "Felső tagozat", "Középiskola", "Egyetem"];
  const showSkyline = !["login", "qr"].includes(screen) && !a.contrast;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 560, padding: "20px 10px", background: dark ? "#061319" : "#D7DEE7", fontFamily: "Roboto, 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        .nobar::-webkit-scrollbar{display:none}.nobar{scrollbar-width:none;-ms-overflow-style:none}
        @keyframes laser{0%{top:8%}50%{top:88%}100%{top:8%}}.laser{animation:laser 2s ease-in-out infinite}
        @keyframes holo{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.holo{animation:holo 6s ease infinite}
        @keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fade{animation:fadein .28s ease}
        @keyframes rip{to{transform:scale(2.6);opacity:0}}.ripple{animation:rip .6s ease-out forwards}
      `}</style>
      <div style={{ width: 392, maxWidth: "100%", height: 800, maxHeight: "92vh", background: t.app, borderRadius: 40, overflow: "hidden", position: "relative", boxShadow: dark ? "0 30px 70px rgba(0,0,0,0.6), 0 0 0 9px #0d161c" : "0 30px 70px rgba(14,42,51,0.28), 0 0 0 9px #15323c" }}>
        {showSkyline && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden><Skyline color={dark ? "rgba(255,255,255,0.06)" : "rgba(28,94,126,0.10)"} opacity={1} h={150} /></div>}
        <div key={screen} className={anim("fade")} style={{ height: "100%", position: "relative", zIndex: 1, zoom: a.big && screen !== "login" ? 1.12 : 1 }}>{views[screen] && views[screen]()}</div>

        {toast && <div className={anim("fade")} style={{ position: "absolute", top: 16, left: 16, right: 16, zIndex: 40, background: toast.color, color: "#fff", borderRadius: 14, padding: "12px 16px", fontWeight: 700, fontSize: 13.5, textAlign: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}>{toast.msg}</div>}

        {filterOpen && screen === "explore" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div onClick={() => setFilterOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
            <div style={{ position: "relative", background: t.app, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, boxShadow: "0 -10px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ width: 40, height: 4, borderRadius: 99, background: t.line, margin: "0 auto 14px" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontWeight: 800, fontSize: 18, color: t.text }}>Szűrők</span>{fbtn("Törlés", () => setFlt({ age: "Mind", price: "Mind", place: "Mind", pts: false }), { bg: t.chip, fg: t.text, ripple: "rgba(120,120,120,0.18)" })}</div>
              {[{ k: "age", t: "Korosztály", opt: ages }, { k: "price", t: "Ár", opt: ["Mind", "Ingyenes", "Fizetős"] }, { k: "place", t: "Helyszín", opt: ["Mind", "Kültéri", "Beltéri"] }].map((g) => (
                <div key={g.k} style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 700, color: t.soft, fontSize: 12.5, marginBottom: 8 }}>{g.t}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{g.opt.map((o) => { const on = flt[g.k] === o; return <Ripple key={o} onClick={() => setFlt((s) => ({ ...s, [g.k]: o }))} aria={o} color="rgba(120,120,120,0.18)" style={{ padding: "8px 14px", borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: "pointer", background: on ? t.active : t.chip, color: on ? "#fff" : t.text }}>{o}</Ripple>; })}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", ...card, padding: "12px 14px" }}><span style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>Csak ahol pont jár</span><Switch on={flt.pts} t={t} onChange={() => setFlt((s) => ({ ...s, pts: !s.pts }))} /></div>
              <div style={{ marginTop: 16 }}>{fbtn("Alkalmaz", () => setFilterOpen(false), { full: true })}</div>
            </div>
          </div>
        )}

        {showNav && (
          <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, height: 66, background: t.nav, backdropFilter: a.contrast ? "none" : "blur(16px)", border: dark || a.contrast ? `1px solid ${t.line}` : "none", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "space-around", boxShadow: a.contrast ? "none" : elev[3], zIndex: 10 }}>
            {navItems.map((n) => {
              const active = navActive(n.id);
              return (
                <Ripple key={n.id} onClick={() => setScreen(n.id)} aria={n.label} color="rgba(120,120,120,0.18)" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", width: 62, paddingTop: 6, paddingBottom: 6, borderRadius: 16 }}>
                  <div style={{ width: 50, height: 28, borderRadius: 999, display: "grid", placeItems: "center", background: active ? t.indicator : "transparent", transition: a.reduce ? "none" : "background .2s" }}><n.icon size={a.big ? 23 : 21} color={active ? t.active : t.soft} strokeWidth={active ? 2.6 : 2} /></div>
                  <span style={{ fontSize: a.big ? 11.5 : 10.5, fontWeight: active ? 800 : 600, color: active ? t.active : t.soft }}>{n.label}</span>
                </Ripple>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
