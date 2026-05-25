"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { getProjectId } from "@/data/projects";

function ProjectItem({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasDetails =
    project.organization ||
    project.teamSize ||
    (project.tags && project.tags.length > 0) ||
    (project.roles && project.roles.length > 0);

  return (
    <li className="space-y-2">
      <div className="flex items-baseline gap-2">
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="shrink-0 text-sm text-white/60 inline-block">
          ↘
        </motion.span>

        {hasDetails ? (
          <button
            onClick={onToggle}
            className="text-left text-base transition-colors hover:text-white/60">
            {project.title}
          </button>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base transition-colors hover:text-white/60">
            {project.title}
          </a>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.15 }}
              className="shrink-0 text-base text-white/40 tracking-wider transition-colors hover:text-white/70">
              LINK→
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden pl-5 space-y-2">
            {project.links && project.links.length > 0 && (
              <div className="flex gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-xs text-white/40 tracking-wider transition-colors hover:text-white/70">
                    {link.label}→
                  </a>
                ))}
              </div>
            )}

            {(project.organization || project.teamSize) && (
              <p className="text-xs text-white/40">
                {project.organization && (
                  <>
                    {"at "}
                    {project.organizationUrl ? (
                      <a
                        href={project.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!text-xs underline underline-offset-2 transition-colors hover:text-white/70">
                        {project.organization}
                      </a>
                    ) : (
                      project.organization
                    )}
                  </>
                )}
                {project.organization && project.teamSize && " · "}
                {project.teamSize &&
                  (typeof project.teamSize === "number" ? `팀 구성 ${project.teamSize}인` : project.teamSize)}
              </p>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 px-2 py-0.5 text-xs text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.roles && project.roles.length > 0 && (
              <ul className="space-y-0.5">
                {project.roles.map((role) => (
                  <li key={role} className="text-xs text-white/40 before:mr-1.5 before:content-['-']">
                    {role}
                  </li>
                ))}
              </ul>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function ShowreelItem() {
  return (
    <li className="space-y-2">
      <div className="flex items-baseline gap-2">
        <span className="shrink-0 text-sm text-white/60">↘</span>
        <span className="text-base">Showreel</span>
        <a
          href="https://vimeo.com/1044879197"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-base text-white/40 tracking-wider transition-colors hover:text-white/70">
          LINK→
        </a>
      </div>
      <div className="pl-5">
        <div className="aspect-video w-full">
          <iframe
            src="https://player.vimeo.com/video/1044879197?title=0&byline=0&portrait=0"
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </li>
  );
}

export default function ProjectList({
  projects,
  openId,
  onOpenId,
}: {
  projects: Project[];
  openId: string | null;
  onOpenId: (id: string | null) => void;
}) {
  return (
    <ul className="space-y-4">
      <ShowreelItem />
      {projects.map((project) => {
        const id = getProjectId(project);
        return (
          <ProjectItem
            key={project.url}
            project={project}
            isOpen={openId === id}
            onToggle={() => onOpenId(openId === id ? null : id)}
          />
        );
      })}
    </ul>
  );
}
