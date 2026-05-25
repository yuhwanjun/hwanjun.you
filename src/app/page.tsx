"use client";

import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { education, certifications, careers } from "@/data/about";
import ProjectList from "@/components/ProjectList";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectDualView from "@/components/ProjectDualView";

type View = "list" | "grid" | "dual";

function parseHash(hash: string): { view: View; id: string | null } {
  const raw = hash.replace(/^#/, "");
  const [viewPart, idPart] = raw.split(":");
  const view: View = viewPart === "list" ? "list" : viewPart === "dual" ? "dual" : "grid";
  return { view, id: idPart || null };
}

export default function Home() {
  const [view, setView] = useState<View>("grid");
  const [openId, setOpenId] = useState<string | null>(null);

  // 해시 → 상태 동기화 (마운트 시 초기값 읽기 + hashchange 구독)
  useEffect(() => {
    const sync = () => {
      const { view, id } = parseHash(window.location.hash);
      setView(view);
      setOpenId(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 상태 → 해시 동기화
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = openId ? `${view}:${openId}` : view;
    if (window.location.hash !== `#${hash}`) {
      window.history.replaceState(null, "", `#${hash}`);
    }
  }, [view, openId]);

  const handleSetView = (next: View) => {
    setOpenId(null);
    setView(next);
  };

  return (
    <div className="min-h-svh w-full overflow-y-auto bg-black text-white">

      {/* Projects */}
      {view === "dual" ? (
        <ProjectDualView projects={projects} selectedId={openId} onSelectId={setOpenId} />
      ) : (
        <div className={view === "list" ? "mx-auto max-w-2xl px-8 py-8 md:px-16" : "px-8 py-8 md:px-16"}>
          {view === "list" ? (
            <ProjectList projects={projects} openId={openId} onOpenId={setOpenId} />
          ) : (
            <ProjectGrid projects={projects} selectedId={openId} onSelectId={setOpenId} />
          )}
        </div>
      )}

      {/* 우상단 고정 프로필 */}
      <div className="fixed top-8 right-8 space-y-3 text-right">
        <div>
          <h1 className="text-sm text-white/80">유환준</h1>
          <p className="text-xs text-white/40">그래픽 디자인, 프론트엔드 웹 개발, 2D&3D모션</p>
        </div>

        <div className="space-y-0.5">
          {careers.map((c) => (
            <p key={c.period} className="text-xs text-white/40">
              <span className="text-white/20">{c.period}</span>
              {"  "}
              {c.organizationUrl ? (
                <a
                  href={c.organizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-white/60">
                  {c.organization}
                </a>
              ) : (
                c.organization
              )}
            </p>
          ))}
          {education.map((e) => (
            <p key={e.period} className="text-xs text-white/40">
              <span className="text-white/20">{e.period}</span>
              {"  "}
              {e.description}
            </p>
          ))}
          {certifications.map((c) => (
            <p key={c.period} className="text-xs text-white/40">
              <span className="text-white/20">{c.period}</span>
              {"  "}
              {c.description}
            </p>
          ))}
        </div>

        <div className="space-y-0.5 text-xs text-white/30">
          <p>fshwanjun@gmail.com</p>
          <p>010-5572-9540</p>
        </div>
      </div>

      {/* 뷰 토글 버튼 — 좌중단 */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        {(["grid", "list", "dual"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => handleSetView(v)}
            className={`flex flex-col items-center gap-1.5 transition-colors ${view === v ? "text-white/70" : "text-white/25 hover:text-white/50"}`}>
            {v === "grid" && (
              <span className="grid grid-cols-2 gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 bg-current" />
                ))}
              </span>
            )}
            {v === "list" && (
              <span className="flex flex-col gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="h-px w-4 bg-current" />
                ))}
              </span>
            )}
            {v === "dual" && (
              <span className="flex gap-0.5">
                <span className="flex flex-col gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="h-px w-2 bg-current" />
                  ))}
                </span>
                <span className="grid grid-cols-1 gap-0.5">
                  {[...Array(2)].map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 bg-current" />
                  ))}
                </span>
              </span>
            )}
            <span className="text-[9px] tracking-wider uppercase">{v}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
