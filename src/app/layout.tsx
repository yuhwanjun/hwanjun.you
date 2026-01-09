import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import './globals.css';

// const abcrom = localFont({
//   src: [
//     { path: '../../public/fonts/ABCROM-NormalRegular.woff2', weight: '400', style: 'normal' },
//     { path: '../../public/fonts/ABCROM-NormalMedium.woff2', weight: '500', style: 'normal' },
//     { path: '../../public/fonts/ABCROM-NormalBook.woff2', weight: '600', style: 'normal' },
//     { path: '../../public/fonts/ABCROM-NormalBold.woff2', weight: '700', style: 'normal' },
//   ],
//   display: 'swap',
//   variable: '--font-abcrom',
//   fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
//   adjustFontFallback: 'Arial', // 폰트 메트릭 조정으로 레이아웃 시프트 방지
//   preload: true, // 중요한 폰트 파일 자동 preload
// });

export const metadata: Metadata = {
  title: 'yuhwanjun',
  description: 'yuhwanjun',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d) {
                var config = {
                  kitId: 'zfi3uik',
                  scriptTimeout: 3000,
                  async: true
                },
                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
              })(document);
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
    // <html lang="ko" className={abcrom.variable}>
    //   <body className={abcrom.className}>{children}</body>
    // </html>
  );
}
