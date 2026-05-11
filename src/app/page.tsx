import { projects } from '@/data/projects';
import { education, certifications, careers } from '@/data/about';
import ProjectList from '@/components/ProjectList';

export default function Home() {
  return (
    <div className="overflow-y-autop-8 min-h-svh w-full text-white md:p-16">
      <div className="mx-auto max-w-2xl space-y-12 px-4 py-8">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="font-regular text-2xl">유환준 Yu HwanJun</h1>
          <p className="text-sm text-white/80">그래픽 디자인, 프론트엔드 웹 개발, 2D&3D모션</p>
          <div className="space-y-1 text-sm text-white/60">
            <p>fshwanjun@gmail.com</p>
            <p>010-5572-9540</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <p className="text-xs tracking-wider text-white/30 uppercase">Career</p>
              {careers.map((c) => (
                <p key={c.period} className="text-xs text-white/50">
                  <span className="text-white/30">{c.period}</span>
                  {'  '}
                  <a
                    href={c.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-xs text-white/50 underline underline-offset-2 transition-colors hover:text-white/70">
                    {c.organization}
                  </a>
                  {' — '}
                  {c.role}
                </p>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs tracking-wider text-white/30 uppercase">Education</p>
              {education.map((e) => (
                <p key={e.period} className="text-xs text-white/50">
                  <span className="text-white/30">{e.period}</span>
                  {'  '}
                  {e.description}
                </p>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs tracking-wider text-white/30 uppercase">Certificate</p>
              {certifications.map((c) => (
                <p key={c.period} className="text-xs text-white/50">
                  <span className="text-white/30">{c.period}</span>
                  {'  '}
                  {c.description}
                </p>
              ))}
            </div>
          </div>
        </header>

        {/* Projects */}
        <section className="space-y-6">
          <h2 className="text-xs tracking-wider text-white/40 uppercase">Projects</h2>
          <ProjectList projects={projects} />
        </section>

        <section className="space-y-4">
          <h2 className="text-xs tracking-wider text-white/40 uppercase">Showreel</h2>
          <div className="aspect-square w-full">
            <iframe
              src="https://player.vimeo.com/video/1044879197?title=0&byline=0&portrait=0"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </div>
  );
}
