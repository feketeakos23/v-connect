import { useState, useEffect } from "react";
import { C, makeTheme } from "./theme";
import { AppContext } from "./context";
import { Skyline } from "./components/ui";
import BottomNav from "./components/BottomNav";
import FilterSheet from "./components/FilterSheet";
import { DEFAULT_FILTER } from "./data";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Explore from "./screens/Explore";
import EventDetail from "./screens/EventDetail";
import Scanner from "./screens/Scanner";
import Points from "./screens/Points";
import PointHistory from "./screens/PointHistory";
import Profile from "./screens/Profile";
import A11y from "./screens/A11y";
import Support from "./screens/Support";
import Chat from "./screens/Chat";
import Focus from "./screens/Focus";
import Ideabox from "./screens/Ideabox";
import Services from "./screens/Services";
import Budget from "./screens/Budget";
import Study from "./screens/Study";
import Techniques from "./screens/Techniques";

const views = { login: Login, register: Register, home: Home, explore: Explore, event: EventDetail, qr: Scanner, points: Points, profile: Profile, support: Support, chat: Chat, focus: Focus, ideabox: Ideabox, services: Services, budget: Budget, a11y: A11y, study: Study, techniques: Techniques, history: PointHistory };
const NAV_SCREENS = ["home", "explore", "event", "points", "profile", "support"];

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
  .nobar::-webkit-scrollbar{display:none}.nobar{scrollbar-width:none;-ms-overflow-style:none}
  @keyframes laser{0%{top:8%}50%{top:88%}100%{top:8%}}.laser{animation:laser 2s ease-in-out infinite}
  @keyframes holo{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.holo{animation:holo 6s ease infinite}
  @keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fade{animation:fadein .28s ease}
  @keyframes rip{to{transform:scale(2.6);opacity:0}}.ripple{animation:rip .6s ease-out forwards}
`;

export default function VConnect() {
  const [dark, setDark] = useState(false);
  const [screen, setScreen] = useState("login");
  const [points, setPoints] = useState(450);
  const [toast, setToast] = useState(null);
  const [redeemed, setRedeemed] = useState([]);
  const [pointsTab, setPointsTab] = useState("earn");
  const [qrBack, setQrBack] = useState("home");
  const [evId, setEvId] = useState("meccs");
  const [chat, setChat] = useState([{ from: "bot", text: "Szia! Miben segíthetek ma? Kockulnál valahol, vagy valami komolyabb dolog érdekel? 🙂" }]);
  const [focusMin, setFocusMin] = useState(25);
  const [focusLeft, setFocusLeft] = useState(25 * 60);
  const [focusRun, setFocusRun] = useState(false);
  const [myVotes, setMyVotes] = useState([]);
  const [cat, setCat] = useState("Mind");
  const [filterOpen, setFilterOpen] = useState(false);
  const [flt, setFlt] = useState(DEFAULT_FILTER);
  const [a, setA] = useState({ contrast: false, big: false, reduce: false });

  const theme = makeTheme(dark, a.contrast);
  const { t } = theme;
  const anim = (cls) => (a.reduce ? "" : cls);

  function fire(msg, color = C.green) { setToast({ msg, color }); }
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2200); return () => clearTimeout(id); }, [toast]);
  // The focus timer lives here so it keeps running while the user is on other screens.
  useEffect(() => {
    if (!focusRun) return;
    if (focusLeft <= 0) { setFocusRun(false); setToast({ msg: "A tanulási idő letelt – tarts szünetet! ☕", color: C.green }); return; }
    const id = setTimeout(() => setFocusLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [focusRun, focusLeft]);

  function openQR() { setQrBack(screen); setScreen("qr"); }
  function goPoints(tab) { setPointsTab(tab); setScreen("points"); }
  function openEvent(id) { setEvId(id); setScreen("event"); }

  const ctx = {
    ...theme, dark, setDark, a, setA, anim, fire,
    screen, setScreen, openQR, goPoints, openEvent, qrBack, evId,
    points, setPoints, redeemed, setRedeemed, pointsTab, setPointsTab,
    chat, setChat, myVotes, setMyVotes,
    focusMin, setFocusMin, focusLeft, setFocusLeft, focusRun, setFocusRun,
    cat, setCat, flt, setFlt, setFilterOpen,
  };

  const View = views[screen];
  const showNav = NAV_SCREENS.includes(screen);
  const showSkyline = !["login", "qr"].includes(screen) && !a.contrast;

  return (
    <AppContext value={ctx}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 560, padding: "20px 10px", background: dark ? "#061319" : "#D7DEE7", fontFamily: "Roboto, 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
        <style>{globalCss}</style>
        <div style={{ width: 392, maxWidth: "100%", height: 800, maxHeight: "92vh", background: t.app, borderRadius: 40, overflow: "hidden", position: "relative", boxShadow: dark ? "0 30px 70px rgba(0,0,0,0.6), 0 0 0 9px #0d161c" : "0 30px 70px rgba(14,42,51,0.28), 0 0 0 9px #15323c" }}>
          {showSkyline && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden><Skyline color={dark ? "rgba(255,255,255,0.06)" : "rgba(28,94,126,0.10)"} opacity={1} h={150} /></div>}
          <div key={screen} className={anim("fade")} style={{ height: "100%", position: "relative", zIndex: 1, zoom: a.big && screen !== "login" ? 1.12 : 1 }}>{View && <View />}</div>

          {toast && <div className={anim("fade")} style={{ position: "absolute", top: 16, left: 16, right: 16, zIndex: 40, background: toast.color, color: "#fff", borderRadius: 14, padding: "12px 16px", fontWeight: 700, fontSize: 13.5, textAlign: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}>{toast.msg}</div>}
          {filterOpen && screen === "explore" && <FilterSheet />}
          {showNav && <BottomNav />}
        </div>
      </div>
    </AppContext>
  );
}
