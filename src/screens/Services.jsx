import { Phone, Send, BookOpen, School } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { teachers, schools } from "../data";
import { Scroll, TopBar, Button } from "../components/ui";

function Section({ title, items, icon: Ic }) {
  const { t, card, fire } = useApp();
  return (
    <div style={{ padding: "16px 18px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Ic size={18} color={t.active} /><span style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{title}</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {items.map((it) => (
          <div key={it.n} style={{ ...card, padding: 14 }}>
            <div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{it.n}</div><div style={{ color: t.soft, fontSize: 12.5, marginTop: 3 }}>{it.s} · {it.m}</div>
            <div style={{ display: "flex", gap: 9, marginTop: 11 }}>
              <Button label="Telefon" onClick={() => fire("Hívás indítása (külső csatorna)…", C.green)} bg={t.chip} fg={t.text} icon={Phone} full ripple="rgba(120,120,120,0.18)" />
              <Button label="E-mail" onClick={() => fire("E-mail megnyitása (külső csatorna)…", t.active)} bg={t.chip} fg={t.text} icon={Send} full ripple="rgba(120,120,120,0.18)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useApp();
  return (
    <Scroll>
      <TopBar title="Szolgáltatások" back="support" />
      <div style={{ padding: "10px 18px 0", color: t.soft, fontSize: 13.5 }}>Tájékoztató lista – a kapcsolatfelvétel külső csatornán történik.</div>
      <Section title="Magántanárok" items={teachers} icon={BookOpen} /><Section title="Autósiskolák" items={schools} icon={School} />
    </Scroll>
  );
}
