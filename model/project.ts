export type Project = {
  thumbnail: string;
  title: string;
  category: string;
  date: string;
  id: string;
  mainTech: string;
};

export type ExtendProject = {
  techStack: string[];
  teamSize: number;
  duration: { start: string; end: string };
  isActive: boolean;
  siteUrl: string;
  keyFeatures: string[];
  description: string;
  githubUrl?: string;
};

export type DetailProject = Partial<ExtendProject & Project> & {
  type?: string; // 선택적 문자열로 변경
};
