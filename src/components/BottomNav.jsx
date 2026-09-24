import { Home, Compass, Coins, User, HelpCircle } from "lucide-react";
import { useApp } from "../context";
import { Ripple } from "./ui";

const navItems = [{ id: "home", icon: Home, label: "Főoldal" }, { id: "explore", icon: Compass, label: "Felfedezés" }, { id: "points", icon: Coins, label: "Pontok" }, { id: "profile", icon: User, label: "Profil" }, { id: "support", icon: HelpCircle, label: "Segítő" }];

const isActive = (id, screen) => screen === id || (id === "explore" && screen === "event") || (id === "profile" && ["a11y", "history"].includes(screen)) || (id === "support" && ["study", "techniques", "focus", "ideabox", "services", "budget", "chat"].includes(screen));

export default function BottomNav() {
  const { screen, setScreen, dark, a, t, elev } = useApp();
  return (
    <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, height: 66, background: t.nav, backdropFilter: a.contrast ? "none" : "blur(16px)", border: dark || a.contrast ? `1px solid ${t.line}` : "none", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "space-around", boxShadow: a.contrast ? "none" : elev[3], zIndex: 10 }}>
      {navItems.map((n) => {
        const active = isActive(n.id, screen);
        return (
          <Ripple key={n.id} onClick={() => setScreen(n.id)} aria={n.label} color="rgba(120,120,120,0.18)" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", width: 62, paddingTop: 6, paddingBottom: 6, borderRadius: 16 }}>
            <div style={{ width: 50, height: 28, borderRadius: 999, display: "grid", placeItems: "center", background: active ? t.indicator : "transparent", transition: a.reduce ? "none" : "background .2s" }}><n.icon size={a.big ? 23 : 21} color={active ? t.active : t.soft} strokeWidth={active ? 2.6 : 2} /></div>
            <span style={{ fontSize: a.big ? 11.5 : 10.5, fontWeight: active ? 800 : 600, color: active ? t.active : t.soft }}>{n.label}</span>
          </Ripple>
        );
      })}
    </div>
  );
}
