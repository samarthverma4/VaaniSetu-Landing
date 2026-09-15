import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Globe, Monitor } from "lucide-react";

import {
  ART,
  CombBorder,
  JharkhandMap,
  KhovarFrame,
  LineArt,
  Reveal,
  SectionLabel,
  StatCircle,
} from "@/components/vanisetu/motifs";
import logoAsset from "@/assets/vanisetu-logo.png.asset.json";
import { cn } from "@/lib/utils";

const TITLE = "VaaniSetu: Mother-tongue teaching for every Jharkhand classroom";
const DESCRIPTION =
  "VaaniSetu is an offline AI translation and curriculum toolkit that lets Hindi-medium teachers teach in Ho, Mundari and Santhali. Download the APK.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const APK_URL = "https://github.com/samarthverma4/VaaniSetu/releases/download/V1.0/app-release.apk";
const WINDOWS_URL = "https://github.com/samarthverma4/VaaniSetu/releases/download/Windows/vaanisetu.exe";

type Lang = "en" | "hi";

const COPY = {
  en: {
      hero: {
      title: "VaaniSetu",
      subtitle: "वाणी सेतु · the voice bridge",
      body: "Bringing mother-tongue teaching to every classroom in Jharkhand, with no language training required.",
      cta: "Download APK",
      windowsCta: "Download for Windows",
      team: "Team EKATRA · SIH 2026 · PS 26042",
    },
    problem: {
      label: "The Problem",
      heading: "A proven pedagogy, stalled at the classroom door",
      p1: "Jharkhand's PALASH Mother Tongue-Based Multilingual Education programme has proven that children learn best in the language they speak at home.",
      p2a: "But ",
      p2strong: "1,080+ primary schools",
      p2b: " in Jharkhand's tribal belts are part of the state's own mother-tongue programme because most of their students do not speak Hindi at home, while their teachers are trained to teach in Hindi.",
      p3: "The result: children are taught in a language they don't understand, and a proven pedagogy stalls at the classroom door.",
      stats: [
        "primary schools where children do not speak Hindi at home",
        "major tribal languages with minimal NLP resources: Ho, Mundari, Santhali",
        "reliable internet in most target schools",
      ],
      sources: [
        {
          label: "Times of India, 2025",
          url: "https://timesofindia.indiatimes.com/city/ranchi/empowering-tribal-education-jharkhand-launches-multilingual-education-in-1080-schools-unicef-and-llf-support-enhances-learning-in-native-languages/articleshow/125936902.cms",
        },
        {
          label: "LLF Annual Report 2023-24",
          url: "https://languageandlearningfoundation.org/wp-content/uploads/2025/02/LLF-Annual-Report-2023-24.pdf",
        },
      ],
    },
    bridge: {
      label: "The Bridge We're Building",
      heading: "Any Hindi-speaking teacher, teaching in the mother tongue",
      p1: "VaaniSetu is an AI-assisted translation and curriculum toolkit that lets any Hindi-speaking teacher deliver mother-tongue instruction instantly, and entirely offline.",
      p2: "No language fluency required. No internet required after setup. Just a low-cost Android tablet and the will to teach.",
    },
    features: {
      label: "What It Does",
      items: [
        {
          title: "Real-Time Voice-to-Voice Translation",
          hindi: "आवाज़ से आवाज़",
          body: "A teacher speaks Hindi; students hear it in their mother tongue, in under 3 seconds. Live classroom dialogue, not just static content.",
        },
        {
          title: "Bilingual Worksheets & Flashcards",
          hindi: "द्विभाषी कार्यपत्रक",
          body: "Printable bilingual worksheets and visual flashcard sets aligned to the NIPUN Bharat learning outcomes framework, ready for the classroom.",
        },
        {
          title: "Fully Offline, Low-Cost Hardware",
          hindi: "बिना इंटरनेट",
          body: "Works completely offline after a one-time content sync. Built to run on ₹5,000-class Android tablets with 2 GB RAM, Android 9 and above.",
        },
      ],
    },
    steps: {
      label: "How a Class Actually Runs",
      heading: "Five steps, start to bell",
      items: [
        ["Teacher opens today's lesson", "Pulled from the synced Hindi FLN curriculum."],
        ["VaaniSetu translates it", "Text and audio, in the students' language."],
        [
          "Live dialogue happens naturally",
          "Voice-to-voice translation keeps the conversation flowing both ways.",
        ],
        [
          "Worksheets print or display",
          "Bilingual, NIPUN Bharat-aligned, ready before the bell rings.",
        ],
        ["All of it, offline", "No signal, no problem."],
      ] as [string, string][],
    },
    ground: {
      label: "Built for Jharkhand's Classrooms, Not a Lab",
      hi: "ज़मीन पर",
      items: [
        "Prototype language: Santhali",
        "Tested for sub-3-second voice latency on constrained hardware",
        "Designed around the realities of rural Jharkhand: patchy power, patchy signal, high teacher turnover",
      ],
    },
    demo: {
      label: "Demo",
      heading: "Hindi in, mother tongue out",
      body: "See VaaniSetu in a real classroom scenario, in real time.",
      soon: "Demo video coming soon",
    },
    download: {
      heading: "Bring VaaniSetu into your classroom",
      body: "Download the APK for Android tablets, or the Windows build for laptops. Sync once, then teach offline, every day after.",
      cta: "Download APK",
      windowsCta: "Download for Windows",
      watch: "Watch the Demo",
      note: "Prototype build: Santhali · Version 0.1 · File sizes to be confirmed",
    },
    footer: {
      team: "Team EKATRA, Smart India Hackathon 2026, PS 26042",
      note: "Built for the PALASH Mother Tongue-Based Multilingual Education programme, Government of Jharkhand.",
      contact: "Contact",
      demo: "Demo Video",
    },
  },
  hi: {
    hero: {
      title: "वाणी सेतु",
      subtitle: "VaaniSetu · भाषा का सेतु",
      body: "झारखंड की हर कक्षा में मातृभाषा में पढ़ाने का समाधान, बिना किसी भाषा प्रशिक्षण के।",
      cta: "एपीके डाउनलोड करें",
      windowsCta: "विंडोज़ के लिए डाउनलोड करें",
      team: "टीम एकत्र · एसआईएच 2026 · पीएस 26042",
    },
    problem: {
      label: "समस्या",
      heading: "एक सिद्ध शिक्षण पद्धति, जो कक्षा के दरवाज़े पर रुक गई",
      p1: "झारखंड के पलाश मातृभाषा आधारित बहुभाषी शिक्षा कार्यक्रम ने साबित किया है कि बच्चे उसी भाषा में सबसे अच्छा सीखते हैं जो वे घर पर बोलते हैं।",
      p2a: "लेकिन झारखंड के जनजातीय क्षेत्रों में ",
      p2strong: "1,080 से अधिक प्राथमिक विद्यालय",
      p2b: " राज्य के मातृभाषा कार्यक्रम का हिस्सा हैं, क्योंकि इनमें अधिकांश छात्र घर पर हिंदी नहीं बोलते, जबकि शिक्षकों को हिंदी माध्यम में पढ़ाने के लिए प्रशिक्षित किया गया है।",
      p3: "नतीजा: बच्चों को ऐसी भाषा में पढ़ाया जाता है जो वे समझते नहीं, और एक सिद्ध पद्धति कक्षा के दरवाज़े पर ही रुक जाती है।",
      stats: [
        "प्राथमिक विद्यालय जहाँ बच्चे घर पर हिंदी नहीं बोलते",
        "प्रमुख जनजातीय भाषाएँ जिनके डिजिटल संसाधन बेहद सीमित हैं: हो, मुंडारी, संताली",
        "अधिकांश लक्षित विद्यालयों में भरोसेमंद इंटरनेट",
      ],
      sources: [
        {
          label: "टाइम्स ऑफ इंडिया, 2025",
          url: "https://timesofindia.indiatimes.com/city/ranchi/empowering-tribal-education-jharkhand-launches-multilingual-education-in-1080-schools-unicef-and-llf-support-enhances-learning-in-native-languages/articleshow/125936902.cms",
        },
        {
          label: "LLF वार्षिक रिपोर्ट 2023-24",
          url: "https://languageandlearningfoundation.org/wp-content/uploads/2025/02/LLF-Annual-Report-2023-24.pdf",
        },
      ],
    },
    bridge: {
      label: "हम जो सेतु बना रहे हैं",
      heading: "कोई भी हिंदी भाषी शिक्षक, मातृभाषा में पढ़ाए",
      p1: "वाणी सेतु एक एआई आधारित अनुवाद और पाठ्यक्रम टूलकिट है, जो किसी भी हिंदी भाषी शिक्षक को तुरंत और पूरी तरह ऑफ़लाइन मातृभाषा में पढ़ाने में सक्षम बनाता है।",
      p2: "किसी भाषा में दक्षता की ज़रूरत नहीं। सेटअप के बाद इंटरनेट की ज़रूरत नहीं। बस एक सस्ता एंड्रॉइड टैबलेट और पढ़ाने की इच्छा।",
    },
    features: {
      label: "विशेषताएँ",
      items: [
        {
          title: "रीयल-टाइम आवाज़ से आवाज़ अनुवाद",
          hindi: "आवाज़ से आवाज़",
          body: "शिक्षक हिंदी बोलते हैं; बच्चे उसे अपनी मातृभाषा में सुनते हैं, 3 सेकंड से कम में। जीवंत कक्षा संवाद, केवल स्थिर सामग्री नहीं।",
        },
        {
          title: "द्विभाषी कार्यपत्रक और फ्लैशकार्ड",
          hindi: "द्विभाषी कार्यपत्रक",
          body: "प्रिंट योग्य द्विभाषी कार्यपत्रक और चित्र फ्लैशकार्ड, निपुण भारत के अधिगम लक्ष्यों के अनुरूप, कक्षा के लिए तैयार।",
        },
        {
          title: "पूरी तरह ऑफ़लाइन, कम लागत वाला हार्डवेयर",
          hindi: "बिना इंटरनेट",
          body: "एक बार सामग्री सिंक करने के बाद पूरी तरह ऑफ़लाइन काम करता है। ₹5,000 श्रेणी के 2 जीबी रैम, एंड्रॉइड 9 या उससे ऊपर वाले टैबलेट पर चलता है।",
        },
      ],
    },
    steps: {
      label: "कक्षा में",
      heading: "पाँच चरण, शुरू से घंटी तक",
      items: [
        ["शिक्षक आज का पाठ खोलते हैं", "सिंक किए गए हिंदी एफएलएन पाठ्यक्रम से।"],
        ["वाणी सेतु उसका अनुवाद करता है", "बच्चों की भाषा में, पाठ और ऑडियो दोनों।"],
        ["संवाद सहज रूप से होता है", "आवाज़ से आवाज़ अनुवाद बातचीत को दोनों ओर चलाए रखता है।"],
        ["कार्यपत्रक प्रिंट या प्रदर्शित करें", "द्विभाषी, निपुण भारत के अनुरूप, घंटी बजने से पहले तैयार।"],
        ["यह सब, ऑफ़लाइन", "नेटवर्क नहीं, फिर भी कोई दिक्कत नहीं।"],
      ] as [string, string][],
    },
    ground: {
      label: "झारखंड की कक्षाओं के लिए बना, किसी लैब के लिए नहीं",
      hi: "ज़मीन पर",
      items: [
        "प्रोटोटाइप भाषा: संताली",
        "सीमित क्षमता वाले हार्डवेयर पर 3 सेकंड से कम आवाज़ विलंब पर परखा गया",
        "ग्रामीण झारखंड की सच्चाइयों को ध्यान में रखकर बनाया गया: अनियमित बिजली, कमज़ोर नेटवर्क, शिक्षकों का बार-बार बदलना",
      ],
    },
    demo: {
      label: "प्रदर्शन",
      heading: "हिंदी अंदर, मातृभाषा बाहर",
      body: "वाणी सेतु को असली कक्षा की स्थिति में, रीयल टाइम में देखें।",
      soon: "प्रदर्शन वीडियो जल्द आ रहा है",
    },
    download: {
      heading: "वाणी सेतु को अपनी कक्षा में लाएँ",
      body: "एंड्रॉइड टैबलेट के लिए एपीके या लैपटॉप के लिए विंडोज़ बिल्ड डाउनलोड करें। एक बार सिंक करें, फिर हर दिन ऑफ़लाइन पढ़ाएँ।",
      cta: "एपीके डाउनलोड करें",
      windowsCta: "विंडोज़ के लिए डाउनलोड करें",
      watch: "प्रदर्शन देखें",
      note: "प्रोटोटाइप बिल्ड: संताली · संस्करण 0.1 · फ़ाइल आकार शीघ्र घोषित",
    },
    footer: {
      team: "टीम एकत्र, स्मार्ट इंडिया हैकाथॉन 2026, पीएस 26042",
      note: "पलाश मातृभाषा आधारित बहुभाषी शिक्षा कार्यक्रम, झारखंड सरकार के लिए निर्मित।",
      contact: "संपर्क",
      demo: "प्रदर्शन वीडियो",
    },
  },
} as const;

const FEATURE_ART = [ART.voice, ART.sheet, ART.tablet] as const;

function PrimaryCta({
  href,
  icon: Icon = Download,
  children,
}: {
  href: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-sm bg-clay-red px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground uppercase shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
    >
      <Icon size={18} strokeWidth={2.5} />
      {children}
    </a>
  );
}

function WindowsCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-ink bg-card px-7 py-3.5 text-sm font-semibold tracking-wide text-ink uppercase shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
    >
      <Monitor size={18} strokeWidth={2.5} />
      {children}
    </a>
  );
}

function Feature({
  index,
  title,
  hindi,
  body,
  art,
  flip = false,
}: {
  index: string;
  title: string;
  hindi: string;
  body: React.ReactNode;
  art: readonly string[];
  flip?: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
      <Reveal className={flip ? "md:order-2" : undefined}>
        <p className="font-display text-sm text-clay-terracotta">{index}</p>
        <h3 className="mt-2 text-3xl leading-tight md:text-4xl">{title}</h3>
        <p className="font-devanagari mt-1 text-lg text-clay-green">{hindi}</p>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/80">{body}</p>
      </Reveal>
      <div className={flip ? "md:order-1" : undefined}>
        <LineArt paths={[...art]} className="mx-auto h-56 w-56 md:h-64 md:w-64" />
      </div>
    </div>
  );
}

/** Auto-advancing marquee of the five classroom steps. */
function StepsCarousel({ steps }: { steps: readonly [string, string][] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else el.scrollLeft += 1;
    }, 24);
    return () => window.clearInterval(id);
  }, [paused, steps]);

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mt-12 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {[...steps, ...steps].map(([title, body], i) => (
        <div key={`${title}-${i}`} className="min-h-48 w-[min(82vw,32rem)] shrink-0">
          <div className="flex h-full flex-col justify-center rounded-sm border border-ink/30 bg-card px-8 py-7 shadow-[4px_4px_0_0_color-mix(in_oklab,var(--ink)_18%,transparent)]">
            <span className="font-display text-4xl text-clay-yellow">
              {String((i % steps.length) + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg leading-snug">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
] as const;

function LanguageSwitcher({ value, onChange }: { value: Lang; onChange: (code: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-ink/30 bg-card px-4 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-card/80"
        aria-expanded={open}
        aria-label="Change language"
      >
        <Globe size={16} />
        <span>{selected.label}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[8rem] overflow-hidden rounded-2xl border border-ink/20 bg-card shadow-lg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                onChange(lang.code as Lang);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-ink/5",
                value === lang.code && "bg-ink/5 font-medium",
              )}
            >
              <span>{lang.label}</span>
              {value === lang.code && <span className="text-clay-red">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];
  const hero = t.hero;

  return (
    <main className={cn("clay-grain bg-clay text-ink", lang === "hi" && "font-devanagari")}>
      {/* 1. Hero */}
      <section className="relative flex min-h-screen flex-col justify-center">
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <LanguageSwitcher value={lang} onChange={setLang} />
        </div>
        <CombBorder className="absolute top-0 left-0" />
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <Reveal>
            <img
              src={logoAsset.url}
              alt="VaaniSetu logo"
              className="mx-auto mb-8 h-auto w-48 md:w-64"
              loading="eager"
            />
            <h1 className="text-6xl leading-none md:text-8xl">{hero.title}</h1>
            <p className="font-devanagari mt-4 text-xl text-clay-red md:text-2xl">
              {hero.subtitle}
            </p>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink/80">{hero.body}</p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <PrimaryCta href={APK_URL}>{hero.cta}</PrimaryCta>
              <WindowsCta href={WINDOWS_URL}>{hero.windowsCta}</WindowsCta>
            </div>

            <p className="mt-10 text-xs tracking-[0.3em] text-ink/50 uppercase">{hero.team}</p>
          </Reveal>
        </div>
        <CombBorder className="absolute bottom-0 left-0" flip />
      </section>

      {/* 2. The Problem */}
      <section className="mural-wash">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <Reveal className="flex justify-center">
            <JharkhandMap />
          </Reveal>
          <Reveal delay={120}>
            <SectionLabel en={t.problem.label} hi={COPY.hi.problem.label} />
            <h2 className="text-3xl leading-tight md:text-4xl">{t.problem.heading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/80">
              <p>{t.problem.p1}</p>
              <p>
                {t.problem.p2a}
                <strong className="text-clay-red">{t.problem.p2strong}</strong>
                {t.problem.p2b}
              </p>
              <p>{t.problem.p3}</p>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/60">
              <span>{lang === "hi" ? "स्रोत:" : "Sources:"}</span>
              {t.problem.sources.map((source, i) => (
                <span key={source.url} className="inline-flex items-center gap-x-3">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-clay-red"
                  >
                    {source.label}
                  </a>
                  {i < t.problem.sources.length - 1 && <span aria-hidden="true">·</span>}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-12 px-6 pb-24">
          <StatCircle value="1,080+" label={t.problem.stats[0]} />
          <StatCircle value="3" label={t.problem.stats[1]} delay={150} />
          <StatCircle value="0" label={t.problem.stats[2]} delay={300} />
        </div>
        <CombBorder />
      </section>

      {/* 3. The Bridge */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <Reveal>
          <SectionLabel en={t.bridge.label} hi="सेतु" />
          <h2 className="text-3xl leading-tight md:text-4xl">{t.bridge.heading}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/80">
            <p>{t.bridge.p1}</p>
            <p>{t.bridge.p2}</p>
          </div>
        </Reveal>
        <LineArt
          paths={[...ART.speech]}
          className="mx-auto h-56 w-full max-w-sm"
          viewBox="0 0 120 96"
        />
      </section>

      {/* 4. What it does */}
      <section className="mural-wash">
        <CombBorder />
        <div className="mx-auto max-w-5xl px-6 pt-16 text-center">
          <SectionLabel en={t.features.label} hi={COPY.hi.features.label} />
        </div>
        {t.features.items.map((item, i) => (
          <Feature
            key={item.title}
            index={`4${"abcd"[i]}`}
            flip={i % 2 === 1}
            title={item.title}
            hindi={item.hindi}
            art={FEATURE_ART[i] ?? ART.book}
            body={item.body}
          />
        ))}
        <CombBorder flip />
      </section>

      {/* 5. How a class runs */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <SectionLabel en={t.steps.label} hi={COPY.hi.steps.label} />
            <h2 className="text-3xl leading-tight md:text-4xl">{t.steps.heading}</h2>
          </Reveal>
          <StepsCarousel steps={t.steps.items} />
        </div>
      </section>

      {/* 6. Built for Jharkhand */}
      <section className="bg-clay-green/10">
        <CombBorder />
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-24 md:grid-cols-[1fr_auto]">
          <Reveal>
            <SectionLabel en={t.ground.label} hi={t.ground.hi} />
            <ul className="mt-6 space-y-5 text-base leading-relaxed text-ink/85">
              {t.ground.items.map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-clay-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <LineArt paths={[...ART.classroom]} className="mx-auto h-56 w-64 text-clay-green" />
        </div>
        <CombBorder flip />
      </section>

      {/* 7. Demo */}
      <section id="demo" className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel en={t.demo.label} hi={COPY.hi.demo.label} />
          <h2 className="text-3xl leading-tight md:text-4xl">{t.demo.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/80">
            {t.demo.body}
          </p>
          <Reveal className="mt-10">
            <KhovarFrame>
              <div className="aspect-video w-full bg-clay-deep">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/_iSc7zdFXjc"
                  title="VaaniSetu demo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </KhovarFrame>
          </Reveal>
        </div>
      </section>

      {/* 8. Download */}
      <section id="download" className="mural-wash px-6 py-24">
        <Reveal className="mx-auto max-w-2xl">
          <div className="relative border-2 border-ink bg-card p-8 text-center md:p-12">
            <CombBorder className="absolute -top-3 left-0 px-6" />
            <h2 className="mt-4 text-3xl leading-tight md:text-4xl">{t.download.heading}</h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink/80">
              {t.download.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryCta href={APK_URL}>{t.download.cta}</PrimaryCta>
              <WindowsCta href={WINDOWS_URL}>{t.download.windowsCta}</WindowsCta>
            </div>

            <a
              href="#demo"
              className="mt-6 inline-block text-sm font-medium text-clay-terracotta underline underline-offset-4"
            >
              {t.download.watch}
            </a>
            <p className="mt-8 text-xs tracking-wide text-ink/55">{t.download.note}</p>
          </div>
        </Reveal>
      </section>

      {/* 9. Footer */}
      <footer className="bg-clay">
        <CombBorder />
        <div className="mx-auto max-w-4xl px-6 py-12 text-center text-sm leading-relaxed text-ink/75">
          <p className="font-display text-base text-ink">{t.footer.team}</p>
          <p className="mt-2">{t.footer.note}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-6 text-clay-terracotta">
            <a className="underline underline-offset-4" href="mailto:team@ekatra.dev">
              {t.footer.contact}
            </a>
            <a className="underline underline-offset-4" href="#demo">
              {t.footer.demo}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
