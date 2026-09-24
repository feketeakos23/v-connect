import { Contrast, Type, Wind, Info } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { Scroll, TopBar, Switch } from "../components/ui";

export default function A11y() {
  const { t, card, a, setA } = useApp();
  const rows = [
    { k: "contrast", n: "Magas kontraszt", d: "Erősebb színek és körvonalak a jobb olvashatóságért", i: Contrast, c: t.active },
    { k: "big", n: "Nagyobb szöveg", d: "Az egész felület megnő a könnyebb leolvasáshoz", i: Type, c: C.green },
    { k: "reduce", n: "Mozgás csökkentése", d: "Kikapcsolja az animációkat és a ripple-effektet", i: Wind, c: C.coral },
  ];
  return (
    <Scroll>
      <TopBar title="Akadálymentesség" back="profile" />
      <div style={{ padding: "8px 18px 0", color: t.soft, fontSize: 13.5 }}>Állítsd be úgy az appot, ahogy a legkényelmesebb. A beállítások azonnal érvénybe lépnek.</div>
      <div style={{ padding: "16px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((r) => (
          <div key={r.k} style={{ ...card, padding: 15, display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: `${r.c}1f`, display: "grid", placeItems: "center", flex: "0 0 auto" }}><r.i size={21} color={r.c} /></div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{r.n}</div><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.35, marginTop: 2 }}>{r.d}</div></div>
            <Switch on={a[r.k]} onChange={() => setA((s) => ({ ...s, [r.k]: !s[r.k] }))} />
          </div>
        ))}
        <div style={{ ...card, padding: 14, display: "flex", gap: 11, alignItems: "flex-start" }}><Info size={18} color={t.active} style={{ marginTop: 1, flex: "0 0 auto" }} /><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.5 }}>A gombok és ikonok képernyőolvasó-feliratokkal (aria-label) vannak ellátva, és a fő szövegek WCAG-kontrasztra törekednek.</div></div>
      </div>
    </Scroll>
  );
}
