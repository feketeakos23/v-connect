import {
  Trophy, Music, Sparkles, Bot, Activity, Film, UtensilsCrossed, GraduationCap, BookOpen, Camera, MapPin,
  Coffee, Waves, Ticket, Brain, Timer, School, Lightbulb, PieChart, Leaf, Wifi, TreePine, Compass,
} from "lucide-react";
import { C } from "./theme";

export const cats = [{ n: "Zene", c: C.cyan }, { n: "Kultúra", c: C.blue }, { n: "Sport", c: C.green }, { n: "Tech", c: C.gold }, { n: "Gasztro", c: C.coral }];
export const catColor = (n) => (cats.find((c) => c.n === n) || { c: C.blue }).c;
export const ages = ["Mind", "Felső tagozat", "Középiskola", "Egyetem"];
export const DEFAULT_FILTER = { age: "Mind", price: "Mind", place: "Mind", pts: false };

export const events = [
  { id: "meccs", name: "Telekom Veszprém Meccs", cat: "Sport", icon: Trophy, pts: 30, place: "Veszprém Aréna", date: "2026. Máj. 25., Szombat", time: "18:00 – 20:00", partner: "Veszprém Handball", age: "Mind", free: false, outdoor: false, desc: "Bajnokok Ligája rangadó a Veszprém Arénában. Szurkolj együtt a várossal, és gyűjts pontot a belépőd QR-kódjával a helyszínen!" },
  { id: "utcazene", name: "Utcazene Fesztivál", cat: "Zene", icon: Music, pts: 50, place: "Óváros tér", date: "2026. Jún. 21., Vasárnap", time: "17:00 – 23:00", partner: "VEB Kulturális Kft.", age: "Mind", free: true, outdoor: true, desc: "Élő koncertek a belváros utcáin – több színpad, ingyenes belépés, jó hangulat estig." },
  { id: "muzeum", name: "Múzeumok Éjszakája", cat: "Kultúra", icon: Sparkles, pts: 40, place: "Vár", date: "2026. Jún. 22., Hétfő", time: "18:00 – 24:00", partner: "Laczkó Dezső Múzeum", age: "Mind", free: false, outdoor: false, desc: "Éjszakai tárlatvezetések, workshopok és fény-installációk a Várnegyedben." },
  { id: "robot", name: "AI & Robotika Workshop", cat: "Tech", icon: Bot, pts: 60, place: "Hangvilla", date: "2026. Jún. 27., Szombat", time: "10:00 – 14:00", partner: "Code Creator", age: "Középiskola", free: true, outdoor: false, desc: "Ozobot, Matatalab és gépi tanulás – építsd és programozd a saját robotodat!" },
  { id: "skate", name: "Skate Jam a Várkútnál", cat: "Sport", icon: Activity, pts: 30, place: "Várkút", date: "2026. Jún. 25., Csütörtök", time: "15:00 – 19:00", partner: "Veszprém SE", age: "Mind", free: true, outdoor: true, desc: "Gördeszka- és roller-verseny minden szinten, DJ-vel és díjakkal." },
  { id: "film", name: "Filmklub a Hangvillában", cat: "Kultúra", icon: Film, pts: 25, place: "Hangvilla", date: "2026. Jún. 28., Vasárnap", time: "19:00", partner: "Hangvilla", age: "Középiskola", free: false, outdoor: false, desc: "Kultikus filmek nagyvásznon, beszélgetéssel a vetítés után." },
  { id: "food", name: "Nyári Streetfood Piknik", cat: "Gasztro", icon: UtensilsCrossed, pts: 20, place: "Erzsébet-liget", date: "2026. Júl. 5., Vasárnap", time: "11:00 – 20:00", partner: "Streetfood VESZ", age: "Mind", free: true, outdoor: true, desc: "Helyi food truckok, kézműves limonádé és élőzene a ligetben." },
  { id: "egyetem", name: "Pannon Egyetem Nyílt Nap", cat: "Tech", icon: GraduationCap, pts: 35, place: "Pannon Egyetem", date: "2026. Júl. 10., Péntek", time: "09:00 – 15:00", partner: "Pannon Egyetem", age: "Középiskola", free: true, outdoor: false, desc: "Ismerd meg a szakokat, a kampuszt és a diákéletet – kérdezz a hallgatóktól!" },
];

export const challenges = [
  { name: "Könyvmoly", desc: "Látogass el a könyvtárba, és olvass egy órát.", pts: 15, icon: BookOpen },
  { name: "Szigeti Futás", desc: "Teljesíts egy kört a Szigeti sétányon.", pts: 40, icon: Activity },
  { name: "Tűztorony Szelfi", desc: "Készíts egy képet a városról a Tűztoronynál.", pts: 25, icon: Camera },
  { name: "Várnegyed Túra", desc: "Csekkolj be a Hősök Kapujánál.", pts: 20, icon: MapPin },
];

export const earnSpots = [
  { name: "Veszprémi Vár QR", place: "Vár, főbejárat", pts: 20, icon: MapPin }, { name: "Könyvtár látogatás", place: "Eötvös Károly Könyvtár", pts: 15, icon: BookOpen },
  { name: "Múzeumok Éjszakája", place: "belépő QR-kód", pts: 40, icon: Sparkles }, { name: "Tűztorony kilátó", place: "belépés", pts: 25, icon: Camera },
];

export const rewards = [
  { id: "mozi", name: "Mozijegy -50%", cost: 100, icon: Film, c: C.blue }, { id: "kave", name: "Ingyen kávé", cost: 50, icon: Coffee, c: C.gold },
  { id: "koncert", name: "Koncert sorsolás", cost: 200, icon: Music, c: C.cyan }, { id: "uszoda", name: "Uszoda belépő", cost: 80, icon: Waves, c: C.green },
  { id: "konyv", name: "Könyvesbolt kupon", cost: 60, icon: BookOpen, c: C.coral }, { id: "food", name: "Streetfood -20%", cost: 40, icon: Ticket, c: C.gold },
];

export const toolsList = [
  { n: "Tanulási technikák", d: "Gen Z-barát módszerek", icon: Brain, c: C.cyan, go: "techniques" }, { n: "Fókusz Óra", d: "Pomodoro időzítő", icon: Timer, c: C.blue, go: "focus" },
  { n: "Továbbtanulás", d: "Felvi, KIFIR, szakok", icon: GraduationCap, c: C.green, go: "study" }, { n: "Szolgáltatások", d: "Tanárok, autósiskolák", icon: School, c: C.gold, go: "services" },
  { n: "Ötletláda", d: "Küldj be ötleteket", icon: Lightbulb, c: C.coral, go: "ideabox" }, { n: "Költségvetés", d: "Dönts a fejlesztésekről", icon: PieChart, c: C.red, go: "budget" },
];

export const teachers = [{ n: "Kovács Eszter", s: "Matematika · középiskola", m: "online / személyes" }, { n: "Nagy Péter", s: "Angol nyelv · felső tagozat", m: "személyes" }];
export const schools = [{ n: "Veszprém Drive", s: "B, AM kategória", m: "elmélet online" }, { n: "Gyorsuló Kft.", s: "A, A2, B kategória", m: "személyes" }];

export const projects = [
  { id: "p1", name: "Új gördeszkapálya a Séd-völgyben", cat: "Sport & szabadidő", district: "Jutas", icon: Activity, c: C.green, cost: "4,5 M Ft", v: 312, by: "Veszprémi Gördeszkás Egyesület", desc: "Modern betonos skatepark a Séd patak mentén, esti világítással és pihenőzónával.", long: "A Séd-völgy alulhasznosított részén minden korosztálynak szóló, biztonságos betonpálya épülne street- és bowl-elemekkel, esti LED-világítással, ivókúttal és árnyékos pihenőzónával. A helyszín gyalog és bringával is jól megközelíthető.", bd: [{ l: "Beton és burkolat", pct: 55 }, { l: "Pályaelemek", pct: 30 }, { l: "Világítás & padok", pct: 15 }] },
  { id: "p2", name: "Közösségi kert a Jutasi úton", cat: "Zöld város", district: "Jutasi út", icon: Leaf, c: C.cyan, cost: "2,8 M Ft", v: 248, by: "Jutasi úti Lakóközösség", desc: "Magaságyásos közösségi kert, ahol a lakók együtt kertészkednek.", long: "Egy elhanyagolt zöldterületből közösségi kert lenne magaságyásokkal, amelyeket a környékbeli családok és diákok gondoznának. Lenne szerszámtároló, komposztáló és esővízgyűjtő, valamint havi kertészkedő-workshopok.", bd: [{ l: "Magaságyások, talaj", pct: 45 }, { l: "Kerítés & tároló", pct: 35 }, { l: "Komposztáló & vízgyűjtő", pct: 20 }] },
  { id: "p3", name: "Ingyenes wifi a belvárosban", cat: "Digitális város", district: "Belváros", icon: Wifi, c: C.blue, cost: "3,2 M Ft", v: 401, by: "Veszprémi Ifjúsági Kerekasztal", desc: "Szabadon elérhető, gyors wifi az Óváros téren és a sétálóutcán.", long: "Ingyenes, regisztráció utáni gyors wifi-lefedettség az Óváros téren, a sétálóutcán és a buszpályaudvar környékén. Segíti a tanulást, a turistákat és a városi appok használatát is.", bd: [{ l: "Access pointok", pct: 50 }, { l: "Telepítés & kábelezés", pct: 30 }, { l: "1 éves üzemeltetés", pct: 20 }] },
  { id: "p4", name: "Fásítás a Cholnoky lakótelepen", cat: "Zöld város", district: "Cholnoky", icon: TreePine, c: C.coral, cost: "1,9 M Ft", v: 177, by: "Cholnoky Lakóközösség", desc: "100 új fa és árnyékot adó padok a lakótelepi tereken.", long: "Száz őshonos fa és árnyékot adó padok telepítése a lakótelep betonos tereire a nyári hőszigetek mérséklésére. A fák gondozását a lakók és egy helyi iskola közösen vállalná.", bd: [{ l: "Facsemeték (100 db)", pct: 60 }, { l: "Ültetés & öntözés", pct: 25 }, { l: "Padok", pct: 15 }] },
];

export const studyLinks = [
  { n: "Felvi.hu", d: "Egyetemek, szakok, pontszámítás", url: "https://www.felvi.hu", c: C.blue, icon: GraduationCap },
  { n: "Pannon Egyetem szakok", d: "A veszprémi egyetem képzései", url: "https://www.felvi.hu/felveteli/meghirdetesek_a/!FFT_Megjelenito_A/intezmenyek/41/kepzesek", c: C.cyan, icon: School },
  { n: "KIFIR", d: "Középiskolai felvételi rendszer", url: "https://kifir2.kir.hu", c: C.green, icon: BookOpen },
  { n: "Sulinavigátor", d: "Iskolakereső – ált. és középiskolák", url: "https://sulinavigator.hu", c: C.gold, icon: Compass },
];

export const techniques = [
  { n: "Pomodoro", e: "🍅", c: C.red, tag: "Fókusz", hook: "25 perc nyomás, 5 perc lazsa. A telód is kibírja addig.", how: "Állíts be 25 perc fókuszt, majd 5 perc szünetet. 4 kör után jöhet egy hosszabb, ~20 perces pihi.", when: "Ha szétesik a figyelmed, vagy halogatsz.", tip: "Indítsd egyből a Fókusz Órát az appban!", go: "focus" },
  { n: "Aktív felidézés", e: "🧠", c: C.cyan, tag: "Memória", hook: "Ne olvasd újra 5x – kérdezd ki magad. Sokkal durvábban beég.", how: "Csukd be a füzetet, és FEJBŐL idézd fel az anyagot, csak utána ellenőrizd. A flashcard a legjobb haver.", when: "Definíciók, évszámok, képletek tanulásakor.", tip: "Kérdezd ki magad fennhangon – még jobban rögzül." },
  { n: "Feynman-módszer", e: "🗣️", c: C.green, tag: "Megértés", hook: "Magyarázd el úgy, mintha egy 10 évesnek mesélnéd.", how: "Mondd el a témát egyszerű szavakkal, hangosan vagy papíron. Ahol elakadsz vagy bonyolítasz → ott a lyuk a tudásodban.", when: "Amikor 'értem, csak nem tudom elmondani'.", tip: "Vedd fel hangüzenetként magadnak, és hallgasd vissza." },
  { n: "Időzített ismétlés", e: "📆", c: C.blue, tag: "Hosszú táv", hook: "Ismételj egyre ritkábban: 1 nap → 3 nap → 1 hét.", how: "Ne magolj be mindent egyszerre. Oszd el az ismétléseket napokra – az agyad így rakja hosszú távú tárba.", when: "Nagy anyag, vizsgaidőszak, nyelvtanulás.", tip: "Egy ingyenes flashcard app (pl. Anki) automatikusan időzít." },
  { n: "Brain dump", e: "🧹", c: C.gold, tag: "Stresszoldó", hook: "Vizsga előtt 5 perc: ürítsd ki az agyad egy lapra.", how: "Írj le MINDENT, ami az anyagból vagy a teendőkből kavarog – rendezetlenül is. Felszabadul a 'RAM', csökken a szorongás.", when: "Dolgozat előtt, vagy ha ezer dolog jár a fejedben.", tip: "Utána húzd ki, ami nem fontos – marad a lényeg." },
  { n: "Body doubling", e: "👯", c: C.coral, tag: "Motiváció", hook: "Tanulj valakivel együtt – akár néma videóhívásban.", how: "A puszta jelenlét (élőben vagy online) elkötelez és beindít. Nem kell beszélni, csak együtt csináljátok a sajátotokat.", when: "Ha egyedül sehogy nem tudsz nekiállni.", tip: "Beszéljetek meg egy közös Pomodoro-kört." },
];

export const pointHistory = [
  { type: "earn", n: "Várséta QR", place: "Veszprémi Vár", dt: "Ma, 16:42", val: 50 },
  { type: "redeem", n: "Ingyen kávé", place: "Café Frei", dt: "Ma, 11:08", val: 50 },
  { type: "earn", n: "Múzeumok Éjszakája", place: "Vár", dt: "Jún. 18., 19:20", val: 40 },
  { type: "earn", n: "Könyvtár látogatás", place: "Eötvös K. Könyvtár", dt: "Jún. 17., 14:05", val: 15 },
  { type: "redeem", n: "Mozijegy -50%", place: "Cinema Veszprém", dt: "Jún. 15., 20:30", val: 100 },
  { type: "earn", n: "Skate Jam", place: "Várkút", dt: "Jún. 14., 17:50", val: 30 },
  { type: "earn", n: "Tűztorony szelfi", place: "Tűztorony", dt: "Jún. 12., 10:15", val: 25 },
];
