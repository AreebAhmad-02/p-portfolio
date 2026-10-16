import { TECH_ICON_PATHS } from "@/lib/tech-icons";
import { Ornament } from "@/components/ui/ornaments";
import { cn } from "@/lib/utils";

/** Display names (from portfolio.json) → vendored simple-icons slugs. */
const NAME_TO_SLUG: Record<string, string> = {
  typescript: "typescript",
  javascript: "javascript",
  python: "python",
  react: "react",
  "react native": "react",
  "next.js": "nextdotjs",
  "node.js": "nodedotjs",
  express: "express",
  "express.js": "express",
  fastapi: "fastapi",
  django: "django",
  postgresql: "postgresql",
  mongodb: "mongodb",
  mysql: "mysql",
  "tailwind css": "tailwindcss",
  "material ui": "mui",
  redux: "redux",
  vite: "vite",
  "three.js": "threedotjs",
  graphql: "graphql",
  prisma: "prisma",
  docker: "docker",
  nginx: "nginx",
  figma: "figma",
  redis: "redis",
  git: "git",
  vercel: "vercel",
  motion: "framer",
  "ci/cd": "githubactions",
  aws: "amazonwebservices",
  langchain: "langchain",
  langgraph: "langgraph",
  openai: "openai",
  claude: "claude",
  "claude (anthropic)": "claude",
  gemini: "googlegemini",
  livekit: "livekit",
  twilio: "twilio",
  kafka: "apachekafka",
  rabbitmq: "rabbitmq",
  celery: "celery",
  pytorch: "pytorch",
  "hugging face": "huggingface",
  opencv: "opencv",
  elasticsearch: "elasticsearch",
  opensearch: "opensearch",
  "apache airflow": "apacheairflow",
  qdrant: "qdrant",
  "github actions": "githubactions",
};

interface TechIconProps {
  name: string;
  className?: string;
}

/**
 * Brand logo for a technology name; unknown names degrade to a sparkle
 * so swapped-in JSON never breaks the layout.
 */
export function TechIcon({ name, className }: TechIconProps) {
  const path = TECH_ICON_PATHS[NAME_TO_SLUG[name.toLowerCase()] ?? ""];

  if (!path) {
    return <Ornament kind="sparkle" className={cn("scale-75", className)} />;
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={path} />
    </svg>
  );
}
