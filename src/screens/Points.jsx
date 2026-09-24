import { Wallet, MapPin, QrCode } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { earnSpots, rewards } from "../data";
import { Coin, Pill, Ripple, Scroll, TopBar, Button } from "../components/ui";

export default function Points() {
  const { t, dark, a, elev, card, okBg, points, setPoints, redeemed, setRedeemed, pointsTab, setPointsTab, openQR, fire } = useApp();
  function redeem(item) {
    if (points < item.cost) { fire("Nincs elég pontod ehhez 😕", C.red); return; }
    setPoints((p) => p - item.cost);
    setRedeemed((r) => [...r, item.id]);
    fire(`Beváltva: ${item.name}`, C.coral);
  }
  return (
    <Scroll>
      <TopBar title="Pontok" />
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
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}><Pill bg={okBg} fg={C.green}>+{s.pts}p</Pill><Button label="Gyűjtés" onClick={openQR} icon={QrCode} /></div>
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
}
