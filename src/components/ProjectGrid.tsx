"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { getProjectId } from "@/data/projects";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 md:items-center"
      onClick={onClose}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex flex-col aspect-[63/88] h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] max-w-[calc(100vw-4rem)] overflow-hidden rounded-sm bg-[#111]"
        onClick={(e) => e.stopPropagation()}>

        {/* iframe — 남은 공간 채움 */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <iframe
            src={project.url}
            className="h-full w-full"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

        {/* 하단 텍스트 영역 */}
        <div className="shrink-0 space-y-3 bg-[#111] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg text-white">{project.title}</h2>
              {(project.organization || project.teamSize) && (
                <p className="text-sm text-white/40">
                  {project.organization && (
                    <>
                      {"at "}
                      {project.organizationUrl ? (
                        <a
                          href={project.organizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="!text-sm underline underline-offset-2 transition-colors hover:text-white/70">
                          {project.organization}
                        </a>
                      ) : (
                        project.organization
                      )}
                    </>
                  )}
                  {project.organization && project.teamSize && " · "}
                  {project.teamSize &&
                    (typeof project.teamSize === "number"
                      ? `팀 구성 ${project.teamSize}인`
                      : project.teamSize)}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {project.links && project.links.length > 0
                ? project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-sm text-white/40 tracking-wider transition-colors hover:text-white/70">
                      {link.label}→
                    </a>
                  ))
                : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 tracking-wider transition-colors hover:text-white/70">
                    LINK→
                  </a>
                )}
              <button
                onClick={onClose}
                className="text-sm text-white/30 transition-colors hover:text-white/60">
                ✕
              </button>
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-white/20 px-2 py-0.5 text-sm text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.roles && project.roles.length > 0 && (
            <ul className="space-y-0.5">
              {project.roles.map((role) => (
                <li key={role} className="text-sm text-white/40 before:mr-1.5 before:content-['-']">
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [transitioning, setTransitioning] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -22;
    const rotateY = (x - 0.5) * 22;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.18 });
  };

  const handleMouseEnter = () => {
    setTransitioning(false);
  };

  const handleMouseLeave = () => {
    setTransitioning(true);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transitioning ? "transform 0.5s ease-out" : "transform 0.08s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative flex w-full aspect-[63/88] flex-col overflow-hidden rounded-sm border border-white/10 bg-white/5 text-left">

      {/* 썸네일 — 텍스트 영역 제외한 나머지 채움 */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white/5">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="300px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-white/20">no image</span>
          </div>
        )}
      </div>

      {/* 카드 하단 */}
      <div className="shrink-0 space-y-2 p-3">
        <p className="text-sm leading-snug text-white/80">{project.title}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 글레어 */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
          transition: transitioning ? "opacity 0.5s ease-out" : "none",
        }}
      />
    </button>
  );
}

function ShowreelCard({ onClick }: { onClick: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [transitioning, setTransitioning] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -22;
    const rotateY = (x - 0.5) * 22;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.18 });
  };

  const handleMouseLeave = () => {
    setTransitioning(true);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTransitioning(false)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transitioning ? "transform 0.5s ease-out" : "transform 0.08s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative flex w-full aspect-[63/88] flex-col items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-white/5 text-left">

      {/* 썸네일 */}
      <Image
        src="https://vumbnail.com/1044879197.jpg"
        alt="Showreel"
        fill
        className="object-cover"
        sizes="300px"
      />

      {/* 카드 하단 타이틀 */}
      <div className="absolute bottom-0 left-0 right-0 space-y-2 bg-black/60 p-3">
        <p className="text-sm leading-snug text-white/80">Showreel</p>
      </div>

      {/* 글레어 */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
          transition: transitioning ? "opacity 0.5s ease-out" : "none",
        }}
      />
    </button>
  );
}

export default function ProjectGrid({
  projects,
  selectedId,
  onSelectId,
}: {
  projects: Project[];
  selectedId: string | null;
  onSelectId: (id: string | null) => void;
}) {
  const selected = selectedId === "showreel" ? null : projects.find((p) => getProjectId(p) === selectedId) ?? null;
  const showreel = selectedId === "showreel";

  return (
    <>
      <div className="grid grid-cols-2 gap-3 justify-center md:grid-cols-[repeat(auto-fill,minmax(180px,300px))]">
        <ShowreelCard onClick={() => onSelectId("showreel")} />
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} onClick={() => onSelectId(getProjectId(project))} />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => onSelectId(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
            onClick={() => onSelectId(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="aspect-square w-full">
                <iframe
                  src="https://player.vimeo.com/video/1044879197?title=0&byline=0&portrait=0&autoplay=1"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
