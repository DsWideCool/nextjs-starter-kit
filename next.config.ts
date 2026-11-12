import type { NextConfig } from "next";

// GitHub Pages 배포 시에만 저장소 이름을 basePath로 사용
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "nextjs-starter-kit";

const nextConfig: NextConfig = {
  // 정적 HTML로 내보내기 (GitHub Pages는 정적 파일만 호스팅)
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  // 정적 호스팅에서 /dashboard → /dashboard/index.html 로 접근되도록 설정
  trailingSlash: true,
  // 정적 export에서는 이미지 최적화 서버를 사용할 수 없음
  images: { unoptimized: true },
};

export default nextConfig;
