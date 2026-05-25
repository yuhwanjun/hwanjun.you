"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { getProjectId } from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";

// ── 타입 ──────────────────────────────────────────────────────
type CardData =
  | { id: "showreel"; type: "showreel" }
  | { id: string; type: "project"; project: Project };

type Phase = "idle" | "discarding" | "drawing";

// ── 상수 ──────────────────────────────────────────────────────
const CARD_W   = 200;
const CARD_H   = CARD_W * 88 / 63;   // ≈ 279.4
const HAND_SIZE = 5;
const SPACING  = 145;
const CURVE    = 12;
const ROT_DEG  = 5;
const LIFT     = 200;

// ── 유틸 ──────────────────────────────────────────────────────
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const toCards = (projects: Project[]): CardData[] => [
  { id: "showreel", type: "showreel" },
  ...projects.map((p) => ({ id: getProjectId(p), type: "project" as const, project: p })),
];

const cardTitle = (c: CardData) => c.type === "showreel" ? "Showreel" : c.project.title;
const cardImage = (c: CardData): string | undefined =>
  c.type === "showreel" ? "https://vumbnail.com/1044879197.jpg" : c.project.image;

// ── 갤러리 모달 ───────────────────────────────────────────────
function PileGallery({ cards, label, onClose }: { cards: CardData[]; label: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-8"
      onClick={onClose}>
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl max-h-[80svh] overflow-y-auto space-y-4"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-widest text-white/40 uppercase">{label} · {cards.length}장</p>
          <button onClick={onClose} className="text-sm text-white/30 hover:text-white/60">✕</button>
        </div>
        {cards.length === 0 ? (
          <p className="py-8 text-center text-xs text-white/20">비어있음</p>
        ) : (
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}>
            {cards.map((card) => (
              <div key={card.id} className="relative aspect-[63/88] overflow-hidden rounded-sm border border-white/10 bg-neutral-900">
                {cardImage(card) && <Image src={cardImage(card)!} alt={cardTitle(card)} fill className="object-cover" sizes="80px" />}
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5">
                  <p className="text-[8px] leading-snug text-white/70">{cardTitle(card)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── 파일 더미 ─────────────────────────────────────────────────
function CardPile({ count, label, topCard, pileRef, onClick }: {
  count: number; label: string; topCard?: CardData;
  pileRef: React.RefObject<HTMLDivElement>; onClick: () => void;
}) {
  const n = Math.min(4, count);
  const img = topCard ? cardImage(topCard) : undefined;
  return (
    <button onClick={onClick} className="group flex flex-col items-center gap-2 transition-opacity hover:opacity-80">
      <div ref={pileRef} className="relative" style={{ width: 60, height: 84 }}>
        {count === 0
          ? <div className="absolute inset-0 rounded-sm border border-dashed border-white/10" />
          : [...Array(n)].map((_, i) => (
              <div key={i} className="absolute overflow-hidden rounded-sm border border-white/10 bg-neutral-900"
                style={{ width: 60, height: 84, bottom: i * 2, left: i * 1, zIndex: i }}>
                {i === n - 1 && img && <Image src={img} alt="" fill className="object-cover opacity-60" sizes="60px" />}
              </div>
            ))}
        <span className="absolute -top-5 left-0 text-xs text-white/40">{count}</span>
      </div>
      <span className="text-[9px] tracking-widest text-white/30 uppercase transition-colors group-hover:text-white/50">{label}</span>
    </button>
  );
}

// ── 손패 카드 ─────────────────────────────────────────────────
function HandCard({ card, offset, zIndex, isSelected, onClick, phase, graveTarget, deckSource, index }: {
  card: CardData; offset: number; zIndex: number; isSelected: boolean; onClick: () => void;
  phase: Phase; graveTarget: { x: number; y: number }; deckSource: { x: number; y: number }; index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const x      = offset * SPACING;
  const baseY  = offset * offset * CURVE;
  const rot    = offset * ROT_DEG;
  const active = hovered && phase === "idle";

  const idleAnimate = {
    x, y: (isSelected || active) ? baseY - LIFT : baseY,
    rotate: (isSelected || active) ? 0 : rot,
    scale: (isSelected || active) ? 1.18 : 1, opacity: 1,
  };

  const discardAnimate = {
    x: graveTarget.x, y: graveTarget.y,
    scale: 0.3, opacity: 0, rotate: -15,
  };

  const drawAnimate    = { x, y: baseY, rotate: rot, scale: 1, opacity: 1 };
  const drawInitial    = { x: deckSource.x, y: deckSource.y, scale: 0.3, opacity: 0, rotate: 10 };

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => phase === "idle" && onClick()}
      key={phase === "drawing" ? `draw-${card.id}` : card.id}
      initial={phase === "drawing" ? drawInitial : false}
      animate={phase === "idle" ? idleAnimate : phase === "discarding" ? discardAnimate : drawAnimate}
      transition={
        phase === "discarding"
          ? { duration: 0.28, delay: index * 0.055, ease: "easeIn" }
          : phase === "drawing"
          ? { type: "spring", stiffness: 240, damping: 22, delay: index * 0.07 }
          : { type: "spring", stiffness: 360, damping: 28 }
      }
      style={{
        position: "absolute",
        left: `calc(50% - ${CARD_W / 2}px)`,
        bottom: 0,
        width: CARD_W,
        transformOrigin: "bottom center",
        zIndex: active ? 100 : zIndex,
        pointerEvents: phase === "idle" ? "auto" : "none",
      }}>
      <div className="relative aspect-[63/88] w-full overflow-hidden rounded-sm border border-white/10 bg-neutral-900">
        {cardImage(card)
          ? <Image src={cardImage(card)!} alt={cardTitle(card)} fill className="object-cover" sizes="200px" />
          : <div className="flex h-full w-full items-center justify-center"><span className="text-[9px] text-white/20">no image</span></div>}
        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2">
          <p className="text-left text-[9px] leading-snug text-white/80">{cardTitle(card)}</p>
          {card.type === "project" && card.project.tags && card.project.tags.length > 0 && (
            <div className="mt-0.5 flex flex-wrap gap-0.5">
              {card.project.tags.slice(0, 2).map((t) => <span key={t} className="text-[7px] text-white/40">{t}</span>)}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ── 메인 ──────────────────────────────────────────────────────
export default function ProjectDualView({ projects, selectedId, onSelectId }: {
  projects: Project[]; selectedId: string | null; onSelectId: (id: string | null) => void;
}) {
  const all = toCards(projects);

  const [deck,      setDeck]      = useState<CardData[]>(() => shuffle(all).slice(HAND_SIZE));
  const [hand,      setHand]      = useState<CardData[]>(() => shuffle(all).slice(0, HAND_SIZE));
  const [graveyard, setGraveyard] = useState<CardData[]>([]);
  const [phase,     setPhase]     = useState<Phase>("idle");
  const [graveTarget, setGraveTarget] = useState({ x: 0, y: 0 });
  const [deckSource,  setDeckSource]  = useState({ x: 0, y: 0 });
  const [gallery, setGallery] = useState<{ cards: CardData[]; label: string } | null>(null);

  const deckRef  = useRef<HTMLDivElement>(null);
  const graveRef = useRef<HTMLDivElement>(null);

  // 자연 위치 기준점: CSS상 카드 중앙 (x transform, y transform 모두 0일 때)
  // left: calc(50% - CARD_W/2) + y from bottom container bottom-[-20px]
  const getNaturalCenter = () => ({
    cx: window.innerWidth / 2,
    cy: window.innerHeight + 70 - CARD_H / 2,
  });

  const handleNext = useCallback(() => {
    if (phase !== "idle") return;
    onSelectId(null);

    const { cx, cy } = getNaturalCenter();

    const gr = graveRef.current?.getBoundingClientRect();
    const dr = deckRef.current?.getBoundingClientRect();

    setGraveTarget({
      x: gr ? (gr.left + gr.width  / 2) - cx : window.innerWidth  - 70 - cx,
      y: gr ? (gr.top  + gr.height / 2) - cy : 80 - cy,
    });
    setDeckSource({
      x: dr ? (dr.left + dr.width  / 2) - cx : 70 - cx,
      y: dr ? (dr.top  + dr.height / 2) - cy : 80 - cy,
    });

    setPhase("discarding");

    const discardMs = 280 + (HAND_SIZE - 1) * 55 + 120; // last card + buffer
    setTimeout(() => {
      let newGrave = [...graveyard, ...hand];
      let newDeck  = [...deck];
      if (newDeck.length === 0) { newDeck = shuffle(newGrave); newGrave = []; }

      const newHand = newDeck.slice(0, HAND_SIZE);
      newDeck = newDeck.slice(HAND_SIZE);

      setHand(newHand);
      setDeck(newDeck);
      setGraveyard(newGrave);
      setPhase("drawing");

      const drawMs = 400 + (HAND_SIZE - 1) * 70 + 200;
      setTimeout(() => setPhase("idle"), drawMs);
    }, discardMs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, hand, deck, graveyard]);

  const center = (hand.length - 1) / 2;

  const selectedProject =
    selectedId && selectedId !== "showreel"
      ? projects.find((p) => getProjectId(p) === selectedId) ?? null
      : null;

  return (
    <>
      {/* 상단 바: 덱 · NEXT · 묘지 */}
      <div className="fixed top-8 left-0 right-0 z-30 flex items-start justify-between px-10">
        <CardPile count={deck.length} label="DECK" topCard={deck.at(-1)} pileRef={deckRef}
          onClick={() => setGallery({ cards: deck, label: "DECK" })} />

        <button onClick={handleNext} disabled={phase !== "idle"}
          className="text-[9px] tracking-widest uppercase transition-colors disabled:opacity-30 mt-2">
          <span className={phase === "idle" ? "text-white/40 hover:text-white/70" : "text-white/20"}>
            NEXT →
          </span>
        </button>

        <CardPile count={graveyard.length} label="GRAVE" topCard={graveyard.at(-1)} pileRef={graveRef}
          onClick={() => setGallery({ cards: graveyard, label: "GRAVE" })} />
      </div>

      {/* 손패 */}
      <div className="pointer-events-none fixed left-0 right-0 z-20 h-[340px]" style={{ bottom: -70 }}>
        <div className="relative h-full w-full pointer-events-auto">
          {hand.map((card, i) => (
            <HandCard
              key={card.id}
              card={card}
              index={i}
              offset={i - center}
              zIndex={i + 1}
              isSelected={selectedId === card.id}
              onClick={() => onSelectId(selectedId === card.id ? null : card.id)}
              phase={phase}
              graveTarget={graveTarget}
              deckSource={deckSource}
            />
          ))}
        </div>
      </div>

      {/* 갤러리 */}
      <AnimatePresence>
        {gallery && <PileGallery cards={gallery.cards} label={gallery.label} onClose={() => setGallery(null)} />}
      </AnimatePresence>

      {/* 프로젝트 모달 */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => onSelectId(null)} />}
      </AnimatePresence>

      {/* Showreel 모달 */}
      <AnimatePresence>
        {selectedId === "showreel" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
            onClick={() => onSelectId(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-square w-full">
                <iframe src="https://player.vimeo.com/video/1044879197?title=0&byline=0&portrait=0&autoplay=1"
                  className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
