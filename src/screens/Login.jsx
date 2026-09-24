import { C } from "../theme";
import { useApp } from "../context";
import { Crown, Skyline, ColorBlocks, DarkToggle, Button } from "../components/ui";

const inputStyle = { width: "100%", boxSizing: "border-box", marginTop: 5, padding: "12px 14px", borderRadius: 13, border: "1px solid #E2E8EE", background: "#F6F8FB", fontSize: 14, outline: "none" };

export default function Login() {
  const { setScreen } = useApp();
  return (
    <div className="nobar" style={{ position: "relative", height: "100%", overflowY: "auto", background: `linear-gradient(160deg, ${C.blue} 0%, #0F3A4A 55%, ${C.dark} 100%)` }}>
      <div style={{ position: "absolute", top: 14, right: 16, zIndex: 2 }}><DarkToggle scrim /></div>
      <Skyline color="rgba(255,255,255,0.18)" opacity={1} />
      <div style={{ minHeight: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", padding: 26, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
          <Crown size={60} /><div style={{ color: "#fff", fontWeight: 900, fontSize: 30, letterSpacing: 1, marginTop: 8 }}>V-CONNECT</div>
          <div style={{ color: C.goldHi, fontSize: 14, fontWeight: 700 }}>Kezedben a város!</div>
          <ColorBlocks />
        </div>
        <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 24, padding: 20, boxShadow: "0 18px 50px rgba(0,0,0,0.35)" }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey }}>E-mail</label>
          <input placeholder="anna@pelda.hu" inputMode="email" style={{ ...inputStyle, marginBottom: 12 }} />
          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey }}>Jelszó</label>
          <input type="password" placeholder="••••••••" style={{ ...inputStyle, marginBottom: 16 }} />
          <Button label="Bejelentkezés" onClick={() => setScreen("home")} full />
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0", color: "#A7B2BC", fontSize: 11 }}><div style={{ flex: 1, height: 1, background: "#E2E8EE" }} /> VAGY <div style={{ flex: 1, height: 1, background: "#E2E8EE" }} /></div>
          <div style={{ display: "flex", gap: 10 }}>{["Google", "Apple"].map((p) => <Button key={p} label={p} onClick={() => setScreen("home")} bg="#fff" fg="#0E2A33" full ripple="rgba(0,0,0,0.08)" outlined />)}</div>
        </div>
        <div style={{ marginTop: 16 }}><Button label="Regisztrálok" onClick={() => setScreen("register")} full bg={C.goldHi} fg="#3a2a10" ripple="rgba(0,0,0,0.1)" /></div>
      </div>
    </div>
  );
}
