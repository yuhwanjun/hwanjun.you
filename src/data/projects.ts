export const getProjectId = (project: { url: string }) => {
  try {
    const url = new URL(project.url);
    return (url.hostname + url.pathname)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  } catch {
    return "";
  }
};

export type Project = {
  title: string;
  url: string;
  image?: string;
  links?: { label: string; url: string }[];
  organization?: string;
  organizationUrl?: string;
  teamSize?: number | string;
  tags?: string[];
  roles?: string[];
};

export const projects: Project[] = [
  {
    title: "국제문화예술재단 웹사이트",
    url: "https://kukjeacf.com/",
    image: "/images/0.jpg",
    organization: "일상의실천",
    organizationUrl: "https://everyday-practice.com/",
    teamSize: 2,
    tags: ["프론트엔드", "기획", "UI/UX"],
    roles: ["와이어프레임 및 기획", "UI/UX 설계", "전체 웹사이트 디자인 및 개발"],
  },
  {
    title: "불닭 웹사이트 메인페이지 인터랙션 개발",
    url: "https://buldak.com/kr/ko/",
    image: "/images/1.jpg",
    organization: "일상의실천",
    organizationUrl: "https://everyday-practice.com/buldak-brand-website/",
    teamSize: 5,
    tags: ["프론트엔드", "2D&3D모션", "기획"],
    roles: ["와이어프레임 및 기획", "메인페이지 인터랙션 개발"],
  },
  {
    title: "네이버 2024 한글날 캠페인 웹사이트 개발 참여",
    url: "https://campaign.naver.com/hanguel/2024/",
    image: "/images/2.jpg",
    organization: "일상의실천",
    organizationUrl: "https://everyday-practice.com/naver-beautiful-hangul-campaign/",
    teamSize: 5,
    tags: ["프론트엔드", "2D&3D모션", "기획", "3D모션"],
    roles: ["와이어프레임 및 기획", "일러스트 모션 제작", "메인페이지 인터랙션 개발"],
  },
  {
    title: "국민대 공간디자인과 졸업전시 웹사이트",
    url: "https://fshwanjun.github.io/KMU.Spatial24/",
    image: "/images/3.jpg",
    teamSize: "개인",
    tags: ["프론트엔드", "기획", "UI/UX", "그래픽 디자인"],
    roles: ["전체 전시 그래픽 디자인", "UI/UX 설계", "전체 웹사이트 디자인 및 개발"],
  },
  {
    title: "국립중앙박물관 모두!ABCD 웹플랫폼",
    url: "https://commoners.co.kr/work/nm-abcd",
    image: "/images/4.jpg",
    organization: "커머너즈",
    teamSize: 6,
    tags: ["프론트엔드", "2D&3D모션", "기획", "UI/UX"],
    roles: ["와이어프레임 및 기획", "UI/UX 설계", "모션그래픽"],
  },
  {
    title: "국립고궁박물관 온라인 꾸러미",
    url: "https://commoners.co.kr/work/gogung-edu",
    image: "/images/5.jpg",
    organization: "커머너즈",
    teamSize: 4,
    tags: ["프론트엔드", "2D&3D모션", "기획", "UI/UX"],
    roles: ["와이어프레임 및 기획", "UI/UX 설계", "모션그래픽"],
  },
  {
    title: "국립경주박물관 신라 ON: 신라의 보물을 깨워라!",
    url: "https://commoners.co.kr/work/gjnm-sillaon",
    image: "/images/6.jpg",
    organization: "커머너즈",
    teamSize: 3,
    tags: ["프론트엔드", "2D&3D모션", "기획", "UI/UX"],
    roles: ["와이어프레임 및 기획", "UI/UX 설계", "웹페이지 디자인 및 개발"],
  },
  {
    title: "홍익대학교 시각디자인과 졸업전시 웹사이트 2024",
    url: "https://hongiksidi.com/gs/2024/",
    image: "/images/7.jpg",
    links: [
      { label: "티저", url: "https://hongiksidi.com/gs/2024-teaser/" },
      { label: "메인", url: "https://hongiksidi.com/gs/2024/" },
    ],
    teamSize: "개인",
    tags: ["프론트엔드", "UI/UX"],
    roles: ["웹사이트 개발", "인터랙션 디자인"],
  },
  {
    title: "국민대 미술학부 회화전공 졸업전시 웹사이트 2025",
    url: "https://kookminfinearts.com/2025_graduation_exhibition/",
    image: "/images/8.jpg",
    teamSize: "개인",
    tags: ["프론트엔드", "그래픽 디자인"],
    roles: ["전체 웹사이트 디자인 및 개발"],
  },
  {
    title: "국민대 미술학부 회화전공 졸업전시 웹사이트 2024",
    url: "https://kookminfinearts.com/2024_graduation_exhibition/",
    image: "/images/9.jpg",
    teamSize: "개인",
    tags: ["프론트엔드", "그래픽 디자인"],
    roles: ["전체 웹사이트 디자인 및 개발"],
  },
  {
    title: "국민대 미술학부 회화전공 졸업전시 웹사이트 2023",
    url: "https://kookminfinearts.com/2023_graduation_exhibition/",
    image: "/images/10.jpg",
    teamSize: "개인",
    tags: ["프론트엔드", "그래픽 디자인"],
    roles: ["전체 웹사이트 디자인 및 개발"],
  },
  {
    title: "우왕좌왕 세종대왕",
    url: "https://crossejong.io/",
    image: "/images/11.jpg",
    teamSize: 3,
    tags: ["프론트엔드", "게임 기획", "제품 디자인"],
    roles: ["보드게임 기획 및 개발", "웹사이트 제작 (아임웹)"],
  },
  {
    title: "온라인 사물놀이",
    url: "https://bukjanggu-chigo.vercel.app/",
    image: "/images/12.jpg",
    teamSize: "개인",
    tags: ["프론트엔드", "2D&3D모션", "기획", "UI/UX"],
    roles: [],
  },
];
