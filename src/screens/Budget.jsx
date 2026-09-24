import { useState } from "react";
import { ArrowLeft, Share2, User, PieChart, MapPin, Check, Award, ChevronRight } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { projects } from "../data";
import { Skyline, Pill, Ripple, IconBtn, Scroll, TopBar, MapPreview, Button } from "../components/ui";

const LIMIT = 3;
const phases = [{ n: "Ötletek", st: "done" }, { n: "Szavazás", st: "active" }, { n: "Eredmény", st: "next" }];

export default function Budget() {
  const { t, a, elev, card, okBg, myVotes, setMyVotes, fire } = useApp();
  const [projSel, setProjSel] = useState(null);
  const used = myVotes.length;
  const toggle = (id) => {
    if (myVotes.includes(id)) setMyVotes((v) => v.filter((x) => x !== id));
    else if (used >= LIMIT) fire(`Legfeljebb ${LIMIT} projektet támogathatsz 🙂`, C.coral);
    else { setMyVotes((v) => [...v, id]); fire("Szavazat hozzáadva! ✅", C.green); }
  };
  const supportBtn = (p) => {
    const mine = myVotes.includes(p.id), locked = !mine && used >= LIMIT;
    return <Button label={mine ? "✓ Támogatod" : "Támogatom"} onClick={() => toggle(p.id)} full bg={mine ? C.green : locked ? t.chip : t.active} fg={mine ? "#fff" : locked ? t.soft : "#fff"} ripple={locked ? "rgba(120,120,120,0.1)" : "rgba(255,255,255,0.4)"} />;
  };

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
            <IconBtn icon={ArrowLeft} scrim label="Vissza" onClick={() => setProjSel(null)} />
            <IconBtn icon={Share2} scrim label="Megosztás" onClick={() => fire("Megosztás…", C.cyan)} />
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

  return (
    <Scroll>
      <TopBar title="Költségvetés" back="support" />
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
}
