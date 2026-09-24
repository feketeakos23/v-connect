import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { Crown, Skyline, Ripple, IconBtn, DarkToggle, Button } from "../components/ui";

function Req({ ok, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, color: ok ? C.green : "#9aa4ad", fontSize: 12 }}>
      <span style={{ width: 16, height: 16, borderRadius: 99, background: ok ? C.green : "transparent", border: `1.5px solid ${ok ? C.green : "#cfd6dd"}`, display: "grid", placeItems: "center", flex: "0 0 auto" }}>{ok && <Check size={11} color="#fff" />}</span>{children}
    </div>
  );
}

export default function Register() {
  const { setScreen, fire } = useApp();
  const [reg, setReg] = useState({ name: "", email: "", dob: "", pw: "", pw2: "", consent: false });
  const [regTried, setRegTried] = useState(false);
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
  return (
    <div className="nobar" style={{ height: "100%", overflowY: "auto", position: "relative", background: `linear-gradient(160deg, ${C.blue} 0%, #0F3A4A 55%, ${C.dark} 100%)` }}>
      <Skyline color="rgba(255,255,255,0.16)" opacity={1} />
      <div style={{ position: "relative", zIndex: 1, padding: "14px 22px 34px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconBtn icon={ArrowLeft} scrim label="Vissza" onClick={() => setScreen("login")} />
          <DarkToggle scrim />
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
          <div style={{ marginTop: 10 }}><Button label="Regisztráció" onClick={submit} full bg={allOk ? C.blue : "#B6C2CC"} /></div>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.85)", fontSize: 13 }}>Már van fiókod? <span onClick={() => setScreen("login")} style={{ color: C.goldHi, fontWeight: 800, cursor: "pointer" }}>Belépés</span></div>
      </div>
    </div>
  );
}
