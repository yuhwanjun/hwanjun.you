"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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

        <div className="min-h-0 flex-1 overflow-hidden">
          <iframe
            src={project.url}
            className="h-full w-full"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

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
                        <a href={project.organizationUrl} target="_blank" rel="noopener noreferrer"
                          className="!text-sm underline underline-offset-2 transition-colors hover:text-white/70">
                          {project.organization}
                        </a>
                      ) : project.organization}
                    </>
                  )}
                  {project.organization && project.teamSize && " · "}
                  {project.teamSize && (typeof project.teamSize === "number" ? `팀 구성 ${project.teamSize}인` : project.teamSize)}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {project.links && project.links.length > 0
                ? project.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="!text-sm text-white/40 tracking-wider transition-colors hover:text-white/70">
                      {link.label}→
                    </a>
                  ))
                : <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-white/40 tracking-wider transition-colors hover:text-white/70">
                    LINK→
                  </a>}
              <button onClick={onClose} className="text-sm text-white/30 transition-colors hover:text-white/60">✕</button>
            </div>
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-white/20 px-2 py-0.5 text-sm text-white/50">{tag}</span>
              ))}
            </div>
          )}
          {project.roles && project.roles.length > 0 && (
            <ul className="space-y-0.5">
              {project.roles.map((role) => (
                <li key={role} className="text-sm text-white/40 before:mr-1.5 before:content-['-']">{role}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
