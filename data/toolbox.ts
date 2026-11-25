// Content for the /toolbox page: favourite software + the grouped toolkit I reinstall first.

export type ToolboxItem = {
  name: string;
  /** Short uppercase label under the name, e.g. "Browser". */
  kind: string;
  href: string;
  logo: string;
};

export const toolbox: ToolboxItem[] = [
  { name: "Google Chrome", kind: "Browser", href: "https://www.google.com/chrome/", logo: "/static/images/toolbox/chrome.png" },
  { name: "Spotify", kind: "Music", href: "https://open.spotify.com/", logo: "/static/images/toolbox/spotify.png" },
  { name: "PowerToys", kind: "Utilities", href: "https://learn.microsoft.com/en-us/windows/powertoys/", logo: "/static/images/toolbox/powertoys.png" },
  { name: "EiHAI", kind: "AI workspace", href: "https://eihai.cc", logo: "/static/images/toolbox/eihai.png" },
  { name: "1Password", kind: "Passwords", href: "https://1password.com/", logo: "/static/images/toolbox/1password.png" },
  { name: "Windows Terminal", kind: "Terminal", href: "https://github.com/microsoft/terminal", logo: "/static/images/toolbox/wt.png" },
  { name: "VS Code", kind: "Editor", href: "https://code.visualstudio.com/", logo: "/static/images/toolbox/vscode.png" },
  { name: "WebStorm", kind: "IDE", href: "https://www.jetbrains.com/webstorm/", logo: "/static/images/toolbox/webstorm.png" },
  { name: "PhpStorm", kind: "IDE", href: "https://www.jetbrains.com/phpstorm/", logo: "/static/images/toolbox/phpstorm.png" },
  { name: "MongoDB Compass", kind: "Database", href: "https://www.mongodb.com/products/tools/compass", logo: "/static/images/toolbox/mongodb-compass.png" },
  { name: "RunJS", kind: "Playground", href: "https://runjs.app/", logo: "/static/images/toolbox/runjs.png" },
  { name: "Nilesoft Shell", kind: "Context menu", href: "https://nilesoft.org/", logo: "/static/images/toolbox/nilesoft.png" },
  { name: "Mailspring", kind: "Email", href: "https://www.getmailspring.com/", logo: "/static/images/toolbox/mailspring.png" },
  { name: "Slack", kind: "Chat", href: "https://slack.com/", logo: "/static/images/toolbox/slack.png" },
  { name: "Notion", kind: "Docs", href: "https://www.notion.so/", logo: "/static/images/toolbox/notion.png" },
  { name: "Figma", kind: "Design", href: "https://www.figma.com/", logo: "/static/images/toolbox/figma.png" },
  { name: "ImageGlass", kind: "Image viewer", href: "https://imageglass.org/", logo: "/static/images/toolbox/imageglass.jpg" },
  { name: "Telegram", kind: "Messenger", href: "https://telegram.org/", logo: "/static/images/toolbox/telegram.png" },
  { name: "Notepad3", kind: "Fast editor", href: "https://www.rizonesoft.com/downloads/notepad3/", logo: "/static/images/toolbox/notepad3.png" },
  { name: "Notepad++", kind: "Tabbed mini IDE", href: "https://notepad-plus-plus.org/", logo: "/static/images/toolbox/notepad-plus-plus.png" },
  { name: "Everything", kind: "File search", href: "https://www.voidtools.com/", logo: "/static/images/toolbox/everything.png" },
  { name: "AutoHotkey v2", kind: "Automation", href: "https://www.autohotkey.com/", logo: "/static/images/toolbox/autohotkey.png" },
];

// The "N tools I'd reinstall first" section: grouped dev / CLI / app toolkit.

export type ToolCategory = "Dev" | "CLI" | "Apps";

export type Tool = {
  name: string;
  /** Short label shown in its own column on larger screens, e.g. "Editor". */
  kind: string;
  description: string;
  href: string;
  logo: string;
};

export type ToolGroup = {
  category: ToolCategory;
  /** Group header label. */
  title: string;
  tools: Tool[];
};

export const toolGroups: ToolGroup[] = [
  {
    category: "Dev",
    title: "Dev Tools",
    tools: [
      { name: "Zed", kind: "Editor", description: "Fast, native editor with AI built in", href: "https://zed.dev/", logo: "/static/tools/zed_logo.jpg" },
      { name: "Claude Code", kind: "Agent", description: "Pair programmer that ships whole features", href: "https://claude.ai/code", logo: "/static/tools/claude_code_logo.webp" },
      { name: "Ghostty", kind: "Terminal", description: "GPU-fast terminal that needs no config", href: "https://ghostty.org/", logo: "/static/tools/ghostty_logo.jpg" },
      { name: "Zen", kind: "Browser", description: "Calm, Firefox-based, vertical tabs", href: "https://zen-browser.app/", logo: "/static/tools/zen_logo.png" },
      { name: "Linear", kind: "Issues", description: "Planning that keeps up with shipping", href: "https://linear.app/", logo: "/static/tools/linear_logo.webp" },
      { name: "Figma", kind: "Design", description: "Where interfaces start before code", href: "https://www.figma.com/", logo: "/static/tools/figma_logo.jpg" },
      { name: "Docker", kind: "Containers", description: "The same environment on every machine", href: "https://www.docker.com/", logo: "/static/icons/docker.svg" },
      { name: "PostHog", kind: "Analytics", description: "Analytics, flags and replays in one place", href: "https://posthog.com/", logo: "/static/icons/posthog.svg" },
    ],
  },
  {
    category: "CLI",
    title: "CLI Tools",
    tools: [
      { name: "Zsh", kind: "Shell", description: "The shell everything else plugs into", href: "https://www.zsh.org/", logo: "/static/tools/zsh_logo.svg" },
      { name: "tmux", kind: "Multiplexer", description: "Sessions that survive closing the terminal", href: "https://github.com/tmux/tmux", logo: "/static/tools/tmux_logo.png" },
      { name: "LazyGit", kind: "Git UI", description: "Staging and rebasing at keyboard speed", href: "https://github.com/jesseduffield/lazygit", logo: "/static/tools/lazygit_logo.png" },
      { name: "herdr", kind: "Agents", description: "One terminal for my whole agent fleet", href: "https://herdr.dev/", logo: "/static/icons/herdr.png" },
      { name: "zoxide", kind: "Navigation", description: "Jump to any folder in a few keystrokes", href: "https://github.com/ajeetdsouza/zoxide", logo: "/static/tools/zoxide_logo.png" },
      { name: "eza", kind: "Listing", description: "A readable ls, with git status", href: "https://github.com/eza-community/eza", logo: "/static/tools/eza_logo.webp" },
      { name: "Starship", kind: "Prompt", description: "A fast prompt with just the context I need", href: "https://starship.rs/", logo: "/static/tools/starship_logo.png" },
      { name: "GitHub CLI", kind: "GitHub", description: "PRs and reviews without leaving the terminal", href: "https://cli.github.com/", logo: "/static/icons/github.svg" },
      { name: "Homebrew", kind: "Packages", description: "How everything on this page gets installed", href: "https://brew.sh/", logo: "/static/tools/homebrew_logo.png" },
      { name: "Git Worktrees", kind: "Branches", description: "Parallel branches, one per agent", href: "https://git-scm.com/docs/git-worktree", logo: "/static/icons/git.svg" },
    ],
  },
  {
    category: "Apps",
    title: "Apps",
    tools: [
      { name: "Raycast", kind: "Launcher", description: "Launcher, snippets and windows on one key", href: "https://raycast.com/", logo: "/static/tools/raycast_logo.jpg" },
      { name: "Obsidian", kind: "Notes", description: "Local Markdown notes I actually own", href: "https://obsidian.md/", logo: "/static/tools/obsidian_logo.webp" },
      { name: "Vorssaint", kind: "Utilities", description: "A dozen menu-bar utilities in one free app", href: "https://github.com/vorssaint/vorssaint-utils", logo: "/static/tools/vorssaint_logo.png" },
      { name: "Notion", kind: "Docs", description: "Shared docs and plans with clients", href: "https://www.notion.so/", logo: "/static/tools/notion_logo.jpg" },
      { name: "Cleanshot X", kind: "Screenshots", description: "Screenshots and annotations in seconds", href: "https://getcleanshot.com/", logo: "/static/tools/cleanshotx_logo.webp" },
      { name: "Screen Studio", kind: "Recording", description: "Polished product demos without editing", href: "https://screenstudio.lemonsqueezy.com/", logo: "/static/tools/screen_studio_logo.jpg" },
      { name: "Cap", kind: "Recording", description: "Quick, shareable screen recordings", href: "https://cap.so/", logo: "/static/tools/cap_logo.png" },
      { name: "1Password", kind: "Passwords", description: "Passwords, keys and SSH in one vault", href: "https://1password.com/", logo: "/static/tools/1password_logo.jpg" },
      { name: "Karabiner-Elements", kind: "Keyboard", description: "Custom key remaps for faster shortcuts", href: "https://karabiner-elements.pqrs.org/", logo: "/static/tools/karabiner_logo.png" },
      { name: "Spotify", kind: "Music", description: "Focus playlists while I build", href: "https://www.spotify.com/", logo: "/static/tools/spotify_logo.webp" },
    ],
  },
];

export const toolCount = toolGroups.reduce((sum, group) => sum + group.tools.length, 0);
