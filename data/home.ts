// Home page content. Edit text, links and items here; the components in
// src/components/home/* only render this data.
//
// Projects (work section) come from `@/data/projects` and blog posts from
// `@/data/posts`; this file only holds home-specific extras.

import EnvelopeOutline from "@/components/icons/EnvelopeOutline.vue";
import GithubMark from "@/components/icons/GithubMark.vue";
import InstagramOutline from "@/components/icons/InstagramOutline.vue";
import LinkedinBox from "@/components/icons/LinkedinBox.vue";
import TelegramOutline from "@/components/icons/TelegramOutline.vue";
import type { IconComponent } from "@/data/navigation";
import { latestProjects, type WorkProject } from "@/data/projects";
import { site } from "@/lib/site";

// ---------------------------------------------------------------------------
// Hero ("Hi 👋, I'm DanRotaru, a full-stack engineer with a creative edge")
// ---------------------------------------------------------------------------

/** One animated word (or phrase) of the hero title; words fade in one after another. */
type HeroWord = {
  text: string;
  /** `name` = grey gradient, `highlight` = animated blue gradient italic. */
  tone?: "name" | "highlight";
  /** Plain text glued right after the word (e.g. a comma outside the gradient). */
  after?: string;
};

export type HeroSocial = {
  label: string;
  href: string;
  icon: IconComponent;
};

export type HeroNavCard = {
  label: string;
  href: string;
  /** Status-dot colour. */
  dot: "emerald" | "orange" | "sky" | "rose";
  title?: string;
  meta?: string;
  /** Pill CTA instead of title/meta (the "Reach out" card). */
  cta?: string;
  /** Only show from the lg breakpoint. */
  desktopOnly?: boolean;
  /** List of links instead of title/meta (the "Featured projects" card). */
  links?: { label: string; href: string }[];
};

/** Hand-picked projects for the "Featured projects" card, in display order (slugs from data/projects.ts). */
const featuredSlugs = ["eihai", "cepret", "movie-shuffle", "quickcconverter", "freezeit"];
const featuredProjects = featuredSlugs.flatMap((slug) => {
  const item = latestProjects.find(({ project }) => project.slug === slug);
  return item ? [{ label: item.project.title, href: `/projects#project-${slug}` }] : [];
});

export const homeHero = {
  /** Full sentence read by screen readers (the animated words are aria-hidden). */
  srTitle: "Hi, I'm Dan Rotaru, a full-stack engineer with a creative edge.",
  headline: [
    { text: "Hi 👋," },
    { text: "I'm" },
    { text: "DanRotaru", tone: "name", after: "," },
    { text: "a" },
    { text: "full-stack" },
    { text: "engineer" },
    { text: "with" },
    { text: "a" },
    { text: "creative edge", tone: "highlight" },
  ] satisfies HeroWord[] as HeroWord[],
  avatar: { src: "/static/images/dan-rotaru-avatar.jpg", alt: "Dan Rotaru sitting by a fountain in Genoa" },
  cta: { label: "More about me", href: "/about" },
  socials: [
    { label: "My Telegram", href: "https://t.me/danrotaru", icon: TelegramOutline },
    { label: "My GitHub", href: "https://github.com/DanRotaru/", icon: GithubMark },
    { label: "My LinkedIn", href: "https://www.linkedin.com/in/dan-rotaru/", icon: LinkedinBox },
    { label: "My Instagram", href: "https://www.instagram.com/dan.rotaru13/", icon: InstagramOutline },
    { label: "My email", href: "mailto:hello@dan13.me", icon: EnvelopeOutline },
  ] satisfies HeroSocial[] as HeroSocial[],
  navCards: [
    { label: "Featured projects", href: "/projects", dot: "emerald", links: featuredProjects },
    {
      label: "Connect",
      href: "/links",
      dot: "orange",
      title: "All my links",
      meta: "Socials, profiles & more",
      desktopOnly: true,
    },
    { label: "Writing", href: "/blog", dot: "sky", title: "Engineering reads", meta: "Process & patterns" },
    { label: "Reach out", href: "/contact", dot: "rose", cta: "Start a conversation" },
  ] satisfies HeroNavCard[] as HeroNavCard[],
};

// ---------------------------------------------------------------------------
// Features bento (How I Work / Daily Drivers / What You Get / Remote / Workstation)
// ---------------------------------------------------------------------------

export type HomeSkill = {
  title: string;
  /** Icon URL (sprite fragment or image). */
  icon: string;
  /** Alternative icon for the dark theme. */
  darkIcon?: string;
  /** Monochrome black icon: inverted in the dark theme. */
  themeAdaptive?: boolean;
  /** Stand-out chip: full-strength text and border. */
  highlight?: boolean;
};

export type HomeSkillCategory = string;

const sprite = (id: string) => `/static/icons/sprite.svg#${id}`;
const stack = (name: string) => `/static/icons/stack/${name}.svg`;

/** Marquee rows / filter categories of the "Daily Drivers" card (one row per category). */
export const homeSkills: Record<HomeSkillCategory, HomeSkill[]> = {
  Frontend: [
    { title: "Nuxt.js", icon: stack("nuxt") },
    { title: "Vue", icon: stack("vue") },
    { title: "Next.js", icon: sprite("nextjs") },
    { title: "React", icon: sprite("react") },
    { title: "Vite", icon: stack("vite") },
    { title: "JavaScript", icon: stack("javascript") },
    { title: "TypeScript", icon: sprite("typescript") },
    { title: "SASS", icon: stack("sass") },
    { title: "SCSS", icon: stack("sass") },
    { title: "Less", icon: stack("less") },
    { title: "Gulp", icon: stack("gulp") },
    { title: "Webpack", icon: stack("webpack") },
    { title: "BEM Styles", icon: stack("bem"), themeAdaptive: true },
    { title: "Tailwind CSS", icon: sprite("tailwindcss") },
    { title: "Figma", icon: sprite("figma") },
    { title: "Adobe XD", icon: stack("adobe-xd") },
    { title: "Progressive Web Apps (PWA)", icon: stack("pwa") },
    { title: "SPA / SSR / SSG", icon: stack("rendering"), themeAdaptive: true },
    { title: "ESLint", icon: stack("eslint") },
    { title: "Prettier", icon: stack("prettier") },
    { title: "shadcn/ui", icon: sprite("shadcn-ui"), themeAdaptive: true },
    { title: "Vuetify", icon: stack("vuetify") },
    { title: "Bootstrap", icon: stack("bootstrap") },
    { title: "GSAP", icon: stack("gsap"), themeAdaptive: true },
    { title: "Chart.js", icon: stack("chartjs") },
    { title: "Driver.js", icon: stack("driverjs"), themeAdaptive: true },
    { title: "Vitest", icon: stack("vitest") },
    { title: "Playwright", icon: sprite("playwright") },
    { title: "jQuery", icon: stack("jquery") },
  ],
  Backend: [
    { title: "Node.js", icon: sprite("nodejs") },
    { title: "JavaScript", icon: stack("javascript") },
    { title: "TypeScript", icon: sprite("typescript") },
    { title: "Express.js", icon: sprite("expressjs"), themeAdaptive: true },
    { title: "Fastify", icon: stack("fastify"), themeAdaptive: true },
    { title: "Nuxt.js", icon: stack("nuxt") },
    { title: "Next.js", icon: sprite("nextjs") },
    { title: "Socket.IO", icon: stack("socketio"), themeAdaptive: true },
    { title: "PHP", icon: stack("php") },
    { title: "WordPress", icon: stack("wordpress") },
    { title: "MongoDB", icon: sprite("mongodb") },
    { title: "Mongoose", icon: stack("mongoose"), themeAdaptive: true },
    { title: "PostgreSQL", icon: sprite("postgresql") },
    { title: "Clerk", icon: stack("clerk") },
    { title: "REST API", icon: stack("rest-api"), themeAdaptive: true },
    { title: "WebSockets", icon: stack("websockets"), themeAdaptive: true },
    { title: "JWT", icon: stack("jwt") },
    { title: "OAuth 2.0", icon: stack("oauth") },
    { title: "Passport.js", icon: stack("passport") },
    { title: "Axios", icon: stack("axios"), themeAdaptive: true },
    { title: "SQLite", icon: stack("sqlite") },
    { title: "Supabase", icon: sprite("supabase") },
    { title: "Puppeteer", icon: stack("puppeteer") },
    { title: "Playwright", icon: sprite("playwright") },
    { title: "Cheerio", icon: stack("cheerio"), themeAdaptive: true },
    { title: "Swagger / OpenAPI", icon: stack("swagger") },
  ],
  "AI & LLM": [
    { title: "EiHAI", icon: stack("eihai"), highlight: true },
    { title: "Claude", icon: sprite("claude") },
    { title: "Codex", icon: stack("codex"), themeAdaptive: true },
    { title: "Gemini", icon: sprite("gemini") },
    { title: "Grok", icon: sprite("grok"), themeAdaptive: true },
    { title: "OpenCode", icon: stack("opencode"), themeAdaptive: true },
    { title: "Cursor", icon: stack("cursor"), themeAdaptive: true },
    { title: "ChatGPT", icon: sprite("chatgpt"), themeAdaptive: true },
    { title: "OpenRouter", icon: stack("openrouter"), themeAdaptive: true },
    { title: "DeepSeek", icon: stack("deepseek") },
    { title: "Copilot", icon: stack("copilot"), themeAdaptive: true },
    { title: "Ollama", icon: stack("ollama"), themeAdaptive: true },
    { title: "LM Studio", icon: stack("lmstudio"), themeAdaptive: true },
    { title: "MCP", icon: sprite("mcp"), themeAdaptive: true },
    { title: "Prompt Engineering", icon: stack("prompt"), themeAdaptive: true },
    { title: "AI Orchestrator", icon: stack("orchestrator"), themeAdaptive: true },
  ],
  "Infra & Deploy": [
    { title: "Git", icon: sprite("git") },
    { title: "GitHub", icon: sprite("github"), themeAdaptive: true },
    { title: "GitHub Actions", icon: sprite("github-actions") },
    { title: "Cloudflare", icon: sprite("cloudflare") },
    { title: "Vercel", icon: sprite("vercel"), themeAdaptive: true },
    { title: "Zomro", icon: stack("zomro"), themeAdaptive: true },
    { title: "Docker", icon: sprite("docker") },
    { title: "Nginx", icon: stack("nginx") },
    { title: "Apache", icon: stack("apache") },
    { title: "PM2", icon: stack("pm2") },
    { title: "SSH", icon: stack("ssh"), themeAdaptive: true },
    { title: "FTP / SFTP", icon: stack("ftp"), themeAdaptive: true },
    { title: "Cloudflare Pages", icon: stack("cloudflare-pages"), themeAdaptive: true },
    { title: "Cloudflare Workers", icon: stack("cloudflare-workers") },
    { title: "Cloudflare DNS", icon: sprite("cloudflare") },
    { title: "CI/CD", icon: stack("cicd"), themeAdaptive: true },
    { title: "CloudPanel", icon: stack("cloudpanel"), themeAdaptive: true },
    { title: "aaPanel", icon: stack("aapanel"), themeAdaptive: true },
    { title: "cPanel", icon: stack("cpanel") },
    { title: "Ubuntu Server", icon: stack("ubuntu") },
    { title: "Debian", icon: stack("debian") },
    { title: "Linux VPS", icon: sprite("linux") },
    { title: "SSL/TLS", icon: stack("ssl"), themeAdaptive: true },
    { title: "Cron Jobs", icon: stack("cron"), themeAdaptive: true },
    { title: "ClickUp", icon: stack("clickup") },
  ],
  Apps: [
    { title: "WPF", icon: stack("csharp") },
    { title: "C#", icon: stack("csharp") },
    { title: ".NET", icon: stack("dotnet") },
    { title: "AutoHotkey v2", icon: stack("autohotkey"), themeAdaptive: true },
    { title: "Electron", icon: stack("electron") },
    { title: "Tauri", icon: stack("tauri") },
    { title: "Chrome Extensions API", icon: stack("chrome") },
    { title: "C++", icon: stack("cpp") },
    { title: "Manifest V3", icon: stack("manifest"), themeAdaptive: true },
    { title: "Browser Extensions API", icon: stack("browser-extensions"), themeAdaptive: true },
    { title: "Service Workers", icon: stack("service-workers"), themeAdaptive: true },
    { title: "Content Scripts", icon: stack("content-scripts"), themeAdaptive: true },
    { title: "Native Messaging", icon: stack("native-messaging"), themeAdaptive: true },
    { title: "localStorage", icon: stack("local-storage"), themeAdaptive: true },
    { title: "sessionStorage", icon: stack("session-storage"), themeAdaptive: true },
    { title: "Kotlin", icon: stack("kotlin") },
    { title: "Java", icon: stack("java") },
    { title: "AdMob", icon: stack("admob"), themeAdaptive: true },
  ],
  Tools: [
    { title: "Visual Studio Code", icon: stack("vscode") },
    { title: "WebStorm", icon: stack("webstorm") },
    { title: "Terminal", icon: stack("terminal"), themeAdaptive: true },
    { title: "Bash", icon: sprite("bash"), themeAdaptive: true },
    { title: "WSL", icon: stack("wsl") },
    { title: "Notepad++", icon: stack("notepadpp"), themeAdaptive: true },
    { title: "Notepad3", icon: stack("notepad3"), themeAdaptive: true },
    { title: "Notion", icon: sprite("notion") },
    { title: "AWS", icon: sprite("aws-logo"), darkIcon: sprite("aws-logo-dark") },
    { title: "Windhawk", icon: stack("windhawk"), themeAdaptive: true },
    { title: "Everything", icon: stack("everything"), themeAdaptive: true },
    { title: "Spotify", icon: stack("spotify") },
    { title: "npm", icon: stack("npm") },
    { title: "pnpm", icon: sprite("pnpm") },
    { title: "nvm", icon: stack("nvm"), themeAdaptive: true },
    { title: "PowerShell", icon: stack("powershell") },
    { title: "Command Prompt (CMD)", icon: stack("cmd"), themeAdaptive: true },
    { title: "Postman", icon: stack("postman") },
    { title: "Bruno", icon: stack("bruno"), themeAdaptive: true },
    { title: "cURL", icon: stack("curl"), themeAdaptive: true },
    { title: "WinSCP", icon: stack("winscp"), themeAdaptive: true },
    { title: "MongoDB Compass", icon: sprite("mongodb") },
    { title: "ADB & Fastboot", icon: stack("adb") },
  ],
};

export type HomeDockApp = {
  title: string;
  /** Icon image; without one the app gets a lettered tile in `color`. */
  icon?: string;
  /** Letter(s) for the tile when there is no icon. */
  mono?: string;
  /** Tile colour for lettered apps. */
  color?: string;
  /** Icon scale inside its slot (logos with built-in padding need less). */
  fit?: number;
  /** Open window: shows the small indicator under the icon. */
  running?: boolean;
  /** The focused app (wide accent indicator). */
  active?: boolean;
  /** Draw a separator before this app. */
  divider?: boolean;
};

type HomeTimezoneOption = {
  label: string;
  /** IANA zone; omitted = the visitor's local zone. */
  timeZone?: string;
};

export const homeFeatures = {
  skills: {
    eyebrow: "Daily Drivers",
    title: "The stack behind everything I ship",
    legend: "Filter skills by category",
    allLabel: "All",
  },
  timezone: {
    eyebrow: "Remote, Worldwide",
    title: "Based in Chisinau, Moldova, overlapping with your hours",
    legend: "Compare with timezone",
    sameLabel: "Same timezone",
    /** Zone used before the visitor's own zone is known (server render). */
    fallbackTimeZone: "Europe/London",
    home: { label: "Chisinau", lat: 47.01, lon: 28.86, timeZone: "Europe/Chisinau" },
    options: [
      { label: "Local" },
      { label: "US", timeZone: "America/New_York" },
      { label: "UK", timeZone: "Europe/London" },
    ] satisfies HomeTimezoneOption[] as HomeTimezoneOption[],
  },
  workstation: {
    eyebrow: "Workstation",
    title: "Everything pinned to my taskbar",
    href: "/toolbox",
    caption: "Windows 11 · my daily setup",
    /** App whose tooltip shows while the taskbar is idle. */
    idleApp: "EiHAI",
    apps: [
      { title: "File Explorer", mono: "▤", color: "#e8b339" },
      { title: "EiHAI", mono: "Ei", color: "#3b82f6", running: true, active: true },
      { title: "Zen", icon: "/static/tools/zen_logo.png", fit: 0.82, running: true },
      { title: "Zed", icon: "/static/tools/zed_logo.jpg", fit: 0.82, running: true },
      { title: "Cursor", mono: "Cu", color: "#1f1f24" },
      { title: "VS Code", mono: "VS", color: "#2b7bd6" },
      { title: "Claude Code", icon: "/static/tools/claude_code_logo.webp", fit: 0.83, running: true },
      { title: "Notion", icon: "/static/tools/notion_logo.jpg", fit: 0.82 },
      { title: "Postman", mono: "Pm", color: "#ef6c35" },
      { title: "OBS Studio", mono: "OBS", color: "#2a2a33" },
    ] satisfies HomeDockApp[] as HomeDockApp[],
  },
};

// ---------------------------------------------------------------------------
// Shipping cadence card ("Small PRs, merged daily").
// ---------------------------------------------------------------------------

export const homeShippingCards = {
  cadence: {
    eyebrow: "Shipping Cadence",
    title: "Small PRs, merged daily, never a big-bang release",
    caption: "Last 20 weeks",
    weeks: 20,
  },
};

// ---------------------------------------------------------------------------
// Focus cards: "On Repeat" (now playing) and keyboard shortcuts.
// ---------------------------------------------------------------------------

export const homeFocusCards = {
  nowPlaying: {
    eyebrow: "On Repeat",
    title: "The soundtrack of my focus hours",
    track: "Fireflies",
    artist: "Martin Garrix & U2",
    caption: "Looping all week",
  },
  shortcuts: {
    eyebrow: "Muscle Memory",
    title: "Shortcuts my fingers know better than I do",
    caption: "Most pressed today",
    combos: [
      { keys: ["⌘", "K"], label: "Command palette" },
      { keys: ["⌘", "P"], label: "Go to file" },
      { keys: ["⌃", "`"], label: "Terminal" },
      { keys: ["⌘", "⇧", "F"], label: "Search project" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Local time card: the time in Chișinău and a playful guess at what I am doing.
// ---------------------------------------------------------------------------

export type HomeDayBlock = {
  /** Start hour (0-23); a block runs until the next one starts. */
  from: number;
  /** Hand-written guess at what I'm doing; `weekend` overrides it on Sat/Sun. */
  label: string;
  weekend?: string;
  /** Bar shade, 0 (dim) to 1 (full blue). */
  level: number;
};

export const homeLocalTimeCards = {
  clock: {
    eyebrow: "Local Time",
    title: "What I'm probably up to right now",
    timeZone: "Europe/Chisinau",
    caption: "Chișinău, Moldova",
    /** Rough, playful guesses (not a real schedule). */
    blocks: [
      { from: 0, label: "probably asleep", level: 0.15 },
      { from: 7, label: "coffee first, then code", level: 0.45 },
      { from: 9, label: "Deep Work", weekend: "out on the bike", level: 1 },
      { from: 18, label: "on a side project", level: 0.7 },
      { from: 23, label: "should be asleep", level: 0.3 },
    ] satisfies HomeDayBlock[] as HomeDayBlock[],
  },
};

// Languages card: one row per language (greeting, code, level) with a
// phone-signal style fluency meter.

export type HomeLanguageRow = { code: string; lang: string; word: string; level: string; bars: number };

export const homeLanguageCards = {
  languages: {
    eyebrow: "Languages",
    title: "Thinking in three, dreaming in code",
    caption: "Native · fluent · fluent",
    /** Bars out of this many. */
    maxBars: 5,
    rows: [
      { code: "ro", lang: "Romanian", word: "Salut", level: "native", bars: 5 },
      { code: "ru", lang: "Russian", word: "Привет", level: "fluent", bars: 4 },
      { code: "en", lang: "English", word: "Hello", level: "fluent", bars: 4 },
    ] satisfies HomeLanguageRow[] as HomeLanguageRow[],
  },
};

// ---------------------------------------------------------------------------
// Principles card: rules I try to live and build by.
// ---------------------------------------------------------------------------

export const homePrinciplesCards = {
  principles: {
    eyebrow: "Principles",
    title: "Rules I try to live and build by",
    items: [
      "Make it work, then make it beautiful",
      "Write it down, future me will thank me",
      "Small steps, every single day",
      "Simple beats clever, every time",
    ],
  },
};

// ---------------------------------------------------------------------------
// Work section ("Curated work")
// ---------------------------------------------------------------------------

/** Accent used for the ticker mark and highlight stars of a project. */
export type HomeWorkAccent = "pink" | "blue" | "purple" | "gray";

/**
 * How the screenshots are arranged inside the card:
 * - `single` / `single-left`: one browser screenshot, slightly tilted right / left
 * - `duo`: two overlapping desktop screenshots (second fans out on hover)
 * - `phones`: three phone screenshots fanned out
 * - `stack`: two screenshots stacked diagonally
 */
/** `slides`: one framed screenshot that auto-cycles through all images, with dots. */
export type HomeWorkLayout = "single" | "single-left" | "duo" | "phones" | "stack" | "slides";

export type HomeWorkProject = {
  /** Slug from `@/data/projects`. */
  slug: string;
  accent: HomeWorkAccent;
  /** Card background gradient (CSS `background` value). */
  gradient: string;
  layout: HomeWorkLayout;
  /** Intrinsic [width, height] of each screenshot in `project.images` (same order). */
  imageSizes: [number, number][];
  /** Bullet points shown next to the card on large screens. */
  highlights: string[];
  // TODO(projects.ts): move `highlights`, `liveUrl` and `repoUrl` to the Project type.
  liveUrl?: string;
  repoUrl?: string;
  /** Label of the main link when the work list links out (e.g. "Chrome Web Store"). */
  linkLabel?: string;
};

/** One entry of the "Curated work" layout: the project plus how its card looks. */
export type WorkItem = { project: WorkProject; config: HomeWorkProject };

export const homeWork = {
  eyebrow: "CASE STUDIES",
  title: "Curated",
  highlight: "work",
  caseStudyLabel: "Read case study",
  projects: [] as HomeWorkProject[],
};

// ---------------------------------------------------------------------------
// Reading card: "Highlights", the sentences I underline twice.
// ---------------------------------------------------------------------------

export const homeReadingCards = {
  highlights: {
    eyebrow: "Highlights",
    title: "The sentences I underline twice",
    source: "A Philosophy of Software Design",
    /** Text segments; `mark: true` ones get highlighted on hover. */
    segments: [
      { text: "The most fundamental problem in computer science is ", mark: false },
      { text: "problem decomposition", mark: true },
      { text: ": how to take a complex problem and divide it into pieces. ", mark: false },
      { text: "Modules should be deep", mark: true },
      { text: ", with simple interfaces hiding a lot of functionality. ", mark: false },
      { text: "Complexity is incremental", mark: true },
      { text: ", it piles up in small chunks.", mark: false },
    ],
  },
};

// ---------------------------------------------------------------------------
// Fitness cards: the bike commute.
// ---------------------------------------------------------------------------

export const homeFitnessCards = {
  commute: {
    eyebrow: "Bike Riding",
    title: "Faster than the car, every single rush hour",
    caption: "Minutes saved this month",
    saved: "184",
    bikeLabel: "Bike · 18 min",
    carLabel: "Car · 31 min",
  },
};

// ---------------------------------------------------------------------------
// Education card: self-taught first, then a Bachelor's in IT.
// ---------------------------------------------------------------------------

export const homeEducationCards = {
  degree: {
    eyebrow: "Degree",
    title: "Self-taught first, then a Bachelor's in IT",
    university: "Technical University of Moldova",
    degree: "Bachelor's degree in IT",
    years: "2019 – 2023",
    caption: "Self-taught first",
  },
};

// ---------------------------------------------------------------------------
// "Questions Before Code" card: how I start every piece of work, from my
// principle "Start with the problem" (data/about.ts aboutPrinciples).
// ---------------------------------------------------------------------------

export const homeProblemFirstCards = {
  questions: {
    eyebrow: "Questions Before Code",
    title: "I ask these before I open the editor",
    caption: "Every project, every time",
    items: [
      "Who is this for?",
      "What hurts today?",
      "How will we know it worked?",
      "What can we not build?",
    ],
  },
};

// ---------------------------------------------------------------------------
// Feedback loop card ("Build, ship, learn, adjust"). Principle from /about:
// "Short loops beat big reveals. Frequent releases, clear updates and honest
// trade-offs keep everyone pointed the same way."
// ---------------------------------------------------------------------------

export const homeFeedbackLoopCards = {
  feedbackLoop: {
    eyebrow: "Feedback Loop",
    title: "Build, ship, learn, adjust, then again",
    caption: "Short loops beat big reveals",
    steps: ["Build", "Ship", "Learn", "Adjust"],
  },
};

// Agent tooling cards (Git worktrees, skills): the setup that makes agents useful
// day to day. Tools are real (Claude Code, MCP, herdr, Git worktrees, Zed, Ghostty,
// tmux); server names, file contents, paths and command names are illustrative.

export type HomeAiTreeEntry = {
  path: string;
  branch: string;
  /** Indent depth. */
  depth: number;
  owner?: string;
};

export type HomeAiCommand = {
  name: string;
  hint: string;
};

export const homeAgentToolingCards = {
  worktrees: {
    eyebrow: "Git Worktrees",
    title: "Parallel branches, one per agent",
    caption: "Same repo, separate folders",
    entries: [
      { path: "site/", branch: "main", depth: 0, owner: "me" },
      { path: "site-pricing/", branch: "feat/pricing", depth: 1, owner: "agent-1" },
      { path: "site-images/", branch: "chore/images", depth: 1, owner: "agent-2" },
      { path: "site-tests/", branch: "test/locale", depth: 1, owner: "agent-3" },
    ] satisfies HomeAiTreeEntry[] as HomeAiTreeEntry[],
  },
  skills: {
    eyebrow: "Skills & Commands",
    title: "Repeatable workflows, one slash away",
    caption: "Write it once, reuse it daily",
    query: "/",
    commands: [
      { name: "/commit-message", hint: "Conventional Commit from the diff" },
      { name: "/review", hint: "Check the diff against my list" },
      { name: "/scaffold-block", hint: "New CMS block, schema + UI" },
      { name: "/migrate", hint: "Content migration, dry run first" },
    ] satisfies HomeAiCommand[] as HomeAiCommand[],
  },
};

// "Where The Hours Go" card: how AI shifted my working time.
// Time splits, durations and curves are illustrative impressions, not tracked data.

export type HomeAiTimeSlice = {
  label: string;
  /** Share of a working day, 0–100 (illustrative). */
  before: number;
  now: number;
};

export const homeAiTimeCards = {
  time: {
    eyebrow: "Where The Hours Go",
    title: "Less typing, more reading and deciding",
    caption: "Illustrative, not tracked",
    rows: { before: "Before", now: "Now" },
    slices: [
      { label: "Typing", before: 55, now: 15 },
      { label: "Planning", before: 15, now: 25 },
      { label: "Reviewing", before: 15, now: 40 },
      { label: "Testing", before: 15, now: 20 },
    ] satisfies HomeAiTimeSlice[] as HomeAiTimeSlice[],
  },
};

// Rest days card: recovery is part of the plan.

export const homeRestCards = {
  restDays: {
    eyebrow: "Rest Days",
    title: "Recovery is part of the plan",
    charge: 100,
    caption: "Sunday: fully recharged",
  },
};

// Freelance card: real clients taught me to ship, not just code.

export const homeFreelanceCards = {
  orders: {
    eyebrow: "Freelance",
    title: "Real clients taught me to ship, not just code",
    href: "/about",
    count: 100,
    caption: "Built, shipped and maintained",
  },
};

// "Hobby → Career" card: a short first-person lesson.
// The before/after facts are real; the wording is a draft for Dan to review.

export type HomeExpShift = {
  eyebrow: string;
  title: string;
  href?: string;
  from: string;
  to: string;
  /** Short first-person lesson (draft wording). */
  lesson: string;
  caption: string;
};

export const homeCareerPathCards = {
  hobby: {
    eyebrow: "Hobby → Career",
    title: "I never planned a career, I kept building",
    href: "/about",
    from: "2014 · for fun",
    to: "career",
    lesson: "Curiosity compounds if you keep showing up.",
    caption: "Lesson 01",
  } satisfies HomeExpShift as HomeExpShift,
};

// Birth cards ("Born in Moldova"): my birth date and country, framed in
// original folk-embroidery-inspired drawings (no copies of specific pieces).

interface HomeBirthCertificateCard {
  eyebrow: string;
  title: string;
  label: string;
  name: string;
  date: string;
  country: string;
  caption: string;
}

interface HomeBirthMarchCard {
  eyebrow: string;
  title: string;
  month: string;
  year: number;
  /** Weekday headers, Monday first. */
  weekdays: string[];
  /** Blank cells before day 1 (1 March 2000 was a Wednesday). */
  offset: number;
  days: number;
  /** Day embroidered on the calendar. */
  marked: number;
  /** Mărțișor day (small red-and-white dot). */
  martisor: number;
  caption: string;
}

interface HomeBirthWeaveCard {
  eyebrow: string;
  title: string;
  /** Weft rows woven on the loom. */
  rows: number;
  caption: string;
}

interface HomeBirthCards {
  certificate: HomeBirthCertificateCard;
  march: HomeBirthMarchCard;
  weave: HomeBirthWeaveCard;
}

export const homeBirthCards: HomeBirthCards = {
  certificate: {
    eyebrow: "Born in Moldova",
    title: "Where my story started",
    label: "Născut · Born",
    name: "Dan Rotaru",
    date: "",
    country: "Republic of Moldova",
    caption: "Stitched in red & black on linen",
  },
  march: {
    eyebrow: "Born in Mărțișor month",
    title: "March, when everyone wears red and white",
    month: "Martie",
    year: 2000,
    weekdays: ["L", "M", "M", "J", "V", "S", "D"],
    offset: 2,
    days: 31,
    marked: 13,
    martisor: 1,
    caption: "Mărțișor on the 1st · me on the 13th",
  },
  weave: {
    eyebrow: "Tricolour Weave",
    title: "Blue, yellow and red on the loom",
    rows: 16,
    caption: "Albastru · Galben · Roșu",
  },
};

// Hora card ("Hora, in pixels"): playful pixel-embroidery bands in blue, yellow,
// red and white, with little dancing people. Original motifs, drawn from
// character grids (b = blue, y = yellow, r = red, w = white, . = empty).

export type HomeHoraGrid = string[];

/** Palette shared by every card of the section. */
const homeHoraPalette: Record<string, string> = {
  b: "#1F57C3",
  y: "#F2C318",
  r: "#D4283A",
  w: "#FFFFFF",
  s: "#EAF2FF",
};

interface HomeHoraRect {
  x: number;
  y: number;
  fill: string;
}

/**
 * Turns a character grid into stitches (one rect per non-empty cell).
 * `swap` remaps colour keys, e.g. `{ r: "b" }` draws red cells in blue.
 */
export function homeHoraRects(
  grid: HomeHoraGrid,
  ox = 0,
  oy = 0,
  swap: Record<string, string> = {},
): HomeHoraRect[] {
  const out: HomeHoraRect[] = [];
  grid.forEach((line, y) => {
    [...line].forEach((ch, x) => {
      if (ch === ".") return;
      const key = swap[ch] ?? ch;
      out.push({ x: ox + x, y: oy + y, fill: homeHoraPalette[key] ?? key });
    });
  });
  return out;
}

// Front-view dancers, 9 × 15. Hands sit on row 3, at the outer columns.
const girlYellow: HomeHoraGrid = [
  "....b....",
  "...bbb...",
  "...bbb...",
  "b...b...b",
  ".b.bbb.b.",
  "..bwwwb..",
  "...wrw...",
  "...rrr...",
  "..yyyyy..",
  "..yryry..",
  ".yyyyyyy.",
  ".yryryry.",
  "yyyyyyyyy",
  "..b...b..",
  ".bb...bb.",
];

const girlBlue: HomeHoraGrid = [
  "....b....",
  "...bbb...",
  "...bbb...",
  "b...b...b",
  ".b.bbb.b.",
  "..bwwwb..",
  "...wrw...",
  "...rrr...",
  "..bbbbb..",
  "..bybyb..",
  ".bbbbbbb.",
  ".bybybyb.",
  "bbbbbbbbb",
  "..b...b..",
  ".bb...bb.",
];

const boy: HomeHoraGrid = [
  "...bbb...",
  "..bbbbb..",
  "...bbb...",
  "b...b...b",
  ".b.bbb.b.",
  "..bwwwb..",
  "..bwbwb..",
  "..bwwwb..",
  "..rrrrr..",
  "..bwwrb..",
  "...b.br..",
  "...b.b...",
  "...b.b...",
  "...b.b...",
  "..bb.bb..",
];

// Tiny dancers, 5 × 7 (circle + everyday-object band).

const heart: HomeHoraGrid = [".r.r.", "rrrrr", ".rrr.", "..r.."];

export const homeHoraCards = {
  hora: {
    eyebrow: "Hora",
    title: "There's always room for one more in the circle",
    caption: "Hand in hand · one step to the side",
    sprites: { girlYellow, boy, girlBlue, heart },
  },
};

// Lislex card ("Now at Lislex"): my current full-time job in Chișinău.
// Only known facts: Lislex, Chișinău, full-time employee. Before: remote for UK/US teams.
// No invented product, title, team size, address or start date.

interface HomeLislexRow {
  label: string;
  value: string;
}

interface HomeLislexNowCard {
  eyebrow: string;
  title: string;
  /** Company logo (public path). */
  logo: string;
  company: string;
  holder: string;
  rows: HomeLislexRow[];
  status: string;
  tags: string[];
  caption: string;
}

interface HomeLislexCards {
  now: HomeLislexNowCard;
}

export const homeLislexCards: HomeLislexCards = {
  now: {
    eyebrow: "Day job",
    title: "Now at Lislex",
    logo: "/static/icons/lislex.png",
    company: "Lislex",
    holder: "Dan Rotaru",
    rows: [
      { label: "City", value: "Chișinău" },
      { label: "Type", value: "Full-time" },
    ],
    status: "Now",
    tags: ["Lislex", "Chișinău", "Full-time", "Now"],
    caption: "Where I work these days",
  },
};

// ---------------------------------------------------------------------------
// "Know about me" section: intro copy, social links and a deck of fun-fact
// cards you can draw from.
// ---------------------------------------------------------------------------

export type HomeFactCard = {
  /** Small uppercase label on the card. */
  tag: string;
  text: string;
  /** Short hand-written note in the card corner. */
  note: string;
};

export type HomeFactsLink = {
  label: string;
  /** Handle shown under the label. */
  handle: string;
  href: string;
  icon: "linkedin" | "github" | "instagram";
};

export const homeFacts = {
  eyebrow: "KNOW ABOUT ME",
  title: "Full-Stack Engineer with a",
  highlight: "creative edge",
  paragraphs: [
    "I'm Dan Rotaru, an full-stack engineer who builds complex apps (mostly web) end to end, from pixel-perfect UI to the LLM pipelines that power them. I care about how things look as much as how they work, so I like taking a product from the first sketch to production.",
    "Off the keyboard, I'm on the bike, out for a run, or deep in a playlist.",
    "Currently building at Lislex, in Chișinău.",
  ],
  links: [
    { label: "LinkedIn", handle: "dan-rotaru", href: site.socials.linkedin, icon: "linkedin" },
    { label: "GitHub", handle: "DanRotaru", href: site.socials.github, icon: "github" },
    { label: "Instagram", handle: "@dan.rotaru13", href: site.socials.instagram, icon: "instagram" },
  ] satisfies HomeFactsLink[] as HomeFactsLink[],
  more: { label: "More about me", href: "/about" },
  deck: {
    drawHint: "draw a card ✦",
    drawLabel: "Draw the next fun fact",
    counterLabel: "Fact",
    cards: [
      { tag: "Origin", text: "I built my first website before I knew what HTML stood for.", note: "view-source!" },
      { tag: "Habit", text: "Every new project starts in a paper notebook, never in an editor.", note: "pen > IDE" },
      { tag: "Music", text: "I can code to the same album on repeat for a whole week.", note: "on loop" },
      { tag: "Languages", text: "I switch between Romanian, Russian and English mid-sentence.", note: "salut!" },
      { tag: "Hot take", text: "The best feature is often the one you decide not to build.", note: "less is more" },
      { tag: "Weekends", text: "Saturday mornings are for long runs, Sunday evenings for side projects.", note: "balance" },
    ] satisfies HomeFactCard[] as HomeFactCard[],
  },
};

// ---------------------------------------------------------------------------
// Closing quote at the bottom of the home page. `highlight` gets the gradient.
// ---------------------------------------------------------------------------
export const homeQuote = {
  before: "Design is not just what it looks like and feels like. Design is ",
  highlight: "how it works",
  after: ".",
  author: "Steve Jobs",
};

// ---------------------------------------------------------------------------
// Explore section ("My Site — Explore, experiment && say hello")
// The Workstation card reuses `homeFeatures.workstation`.
// ---------------------------------------------------------------------------

export const homeExplore = {
  eyebrow: "My Site",
  title: "Explore, experiment",
  highlight: "&& say hello",
  behindCode: {
    eyebrow: "Behind The Code",
    title: "Journey, skills & experience",
    href: "/about",
    strapText: "dan13.me · dan13.me · dan13.me · dan13.me · dan13.me · dan13.me",
    photo: { src: "/static/images/dan-rotaru-avatar.jpg", alt: "Dan Rotaru", width: 500, height: 500 },
  },
};
