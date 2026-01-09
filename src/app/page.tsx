export default function Home() {
  return (
    <div className="min-h-svh w-full overflow-y-auto bg-black p-8 text-white md:p-16">
      <div className="mx-auto max-w-2xl space-y-12 py-8">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="font-regular text-2xl">유환준</h1>
          <p className="text-sm text-white/80">그래픽 디자인, 프론트엔드 웹 개발, 2D&3D모션</p>
          <div className="space-y-1 text-sm text-white/60">
            <p>fshwanjun@gmail.com</p>
            <p>010-5572-9540</p>
          </div>
        </header>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-xs tracking-wider text-white/40 uppercase">Projects</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="https://www.studio-for.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-white/60">
                ↘ FOR creative 웹사이트 디자인 및 개발
              </a>
            </li>
            <li>
              <a
                href="https://kukjeacf.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-white/60">
                ↘ 국제문화예술재단 웹사이트 디자인 및 개발
              </a>
            </li>
            <li>
              <a
                href="https://buldak.com/kr/ko/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-white/60">
                ↘ 불닭 웹사이트 메인페이지 인터랙션 개발
              </a>
            </li>
            <li>
              <a
                href="https://campaign.naver.com/hanguel/2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-white/60">
                ↘ 네이버 2024 한글날 캠페인 웹사이트 개발 참여
              </a>
            </li>
            <li>
              <a
                href="https://fshwanjun.github.io/KMU.Spatial24/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-white/60">
                ↘ 국민대 공간디자인과 졸업전시 웹사이트 디자인 및 개발
              </a>
            </li>
            <li>
              <a
                href="https://bukjanggu-chigo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-white/60">
                ↘ 온라인 사물놀이
              </a>
            </li>
          </ul>
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

        {/* Other */}
        <section className="space-y-4">
          <h2 className="text-xs tracking-wider text-white/40 uppercase">Portfolio</h2>
          <a
            href="https://drive.google.com/file/d/1LwEnIzelXc_S0zv_u_-Q9VKIQCwq-mwS/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm transition-colors hover:text-white/60">
            ↘ PDF Download
          </a>
        </section>
      </div>
    </div>
  );
}
