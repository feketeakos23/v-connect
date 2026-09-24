import { useState } from "react";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { pointHistory } from "../data";
import { Ripple, Scroll, TopBar } from "../components/ui";

const earned = pointHistory.filter((h) => h.type === "earn").reduce((s, h) => s + h.val, 0);
const spent = pointHistory.filter((h) => h.type === "redeem").reduce((s, h) => s + h.val, 0);

export default function PointHistory() {
  const { t, card, okBg, dangerBg, fire } = useApp();
  const [histFilter, setHistFilter] = useState("all");
  const list = histFilter === "all" ? pointHistory : pointHistory.filter((h) => h.type === histFilter);
  return (
    <Scroll>
      <TopBar title="Előzmények" back="profile" />
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
}
