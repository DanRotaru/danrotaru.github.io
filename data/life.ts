// Content for the "Off the keyboard" section at the bottom of /about: quick facts and Instagram-style story
// highlights. Edit freely; everything on the page is driven from here.
//
// Adding stories: drop exported Instagram stories (images or .mp4) into
// /public/life/stories/<highlight>/ and list them under a highlight below.
// Each item shows for `duration` seconds (images, default 5s) or for the full
// length of the video.

export type LifeFact = {
  /** Emoji shown in the tile. */
  emoji: string;
  label: string;
  value: string;
  note?: string;
};

type LifeStoryItem = {
  type: "image" | "video";
  src: string;
  /** Poster frame for videos (optional). */
  poster?: string;
  caption?: string;
  /** Free-form date label, e.g. "Aug 2026". */
  date?: string;
  /** Seconds an image stays on screen (default 5). */
  duration?: number;
  /** Optional link shown as a pill under the caption (e.g. the Instagram post). */
  href?: string;
  linkLabel?: string;
  /** Blur the image (used for low-res covers behind a link). */
  blur?: boolean;
};

export type LifeHighlight = {
  id: string;
  title: string;
  /** Round cover image for the highlight ring. */
  cover: string;
  items: LifeStoryItem[];
};

export const lifeIntro = {
  eyebrow: "Off the Keyboard",
  title: "Life Beyond",
  highlight: "the Code",
};

export const lifeFacts: LifeFact[] = [
  { emoji: "📍", label: "Home base", value: "Chișinău, Moldova", note: "Currently building at Lislex" },
  { emoji: "💻", label: "Shipping since", value: "3+ years", note: "Full-stack, from UI polish to LLM pipelines" },
  { emoji: "🚴", label: "Cycling", value: "116 km longest ride", note: "And faster than the car every rush hour" },
  { emoji: "🏃", label: "Running", value: "Out for a run", note: "Saturday mornings are for long runs" },
  { emoji: "🎧", label: "Soundtrack", value: "Martin Garrix", note: "EDM and progressive house on repeat" },
  { emoji: "🥬", label: "Food", value: "Pure veg since 2021", note: "No meat, no eggs, and I don't miss it" },
  { emoji: "🗣️", label: "Languages", value: "RO · RU · EN", note: "Often mid-sentence" },
  { emoji: "☕", label: "Fuel", value: "Coffee", note: "Want to help? There's a button for that" },
];

export const lifeInstagram = {
  handle: "@dan.rotaru13",
  href: "https://www.instagram.com/dan.rotaru13/",
};

// ---------------------------------------------------------------------------
// Fetched from instagram.com/dan.rotaru13 (public profile, Nov 2026). Images
// are stored locally in /public/life/instagram because Instagram CDN links
// expire. Highlight contents are login-only on Instagram, so those rings show
// the cover and link out to the highlight.
// ---------------------------------------------------------------------------

/** Instagram highlights (shown under "More on Instagram"). */
export const instagramHighlights: LifeHighlight[] = [
  {
    id: "ig-17933539946795805",
    title: "🤌🏻",
    cover: "/static/life/instagram/highlights/17933539946795805.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/17933539946795805.jpg",
        blur: true,
        caption: "🤌🏻",
        href: "https://www.instagram.com/stories/highlights/17933539946795805/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18081382642458246",
    title: "AC/DC Rock",
    cover: "/static/life/instagram/highlights/18081382642458246.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18081382642458246.jpg",
        blur: true,
        caption: "AC/DC Rock",
        href: "https://www.instagram.com/stories/highlights/18081382642458246/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-17861767986133762",
    title: "🤪🎷🎸🥁🎙️🍻",
    cover: "/static/life/instagram/highlights/17861767986133762.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/17861767986133762.jpg",
        blur: true,
        caption: "🤪🎷🎸🥁🎙️🍻",
        href: "https://www.instagram.com/stories/highlights/17861767986133762/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-17863150473213010",
    title: "🚴🚴🚴",
    cover: "/static/life/instagram/highlights/17863150473213010.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/17863150473213010.jpg",
        blur: true,
        caption: "🚴🚴🚴",
        href: "https://www.instagram.com/stories/highlights/17863150473213010/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18030499999971192",
    title: "Fav 🎵",
    cover: "/static/life/instagram/highlights/18030499999971192.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18030499999971192.jpg",
        blur: true,
        caption: "Fav 🎵",
        href: "https://www.instagram.com/stories/highlights/18030499999971192/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18058864540562824",
    title: "✈️",
    cover: "/static/life/instagram/highlights/18058864540562824.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18058864540562824.jpg",
        blur: true,
        caption: "✈️",
        href: "https://www.instagram.com/stories/highlights/18058864540562824/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18027369113466364",
    title: "Untold",
    cover: "/static/life/instagram/highlights/18027369113466364.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18027369113466364.jpg",
        blur: true,
        caption: "Untold",
        href: "https://www.instagram.com/stories/highlights/18027369113466364/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18058447786561635",
    title: "🚙🚗",
    cover: "/static/life/instagram/highlights/18058447786561635.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18058447786561635.jpg",
        blur: true,
        caption: "🚙🚗",
        href: "https://www.instagram.com/stories/highlights/18058447786561635/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18262204207209311",
    title: "Velohora 2024",
    cover: "/static/life/instagram/highlights/18262204207209311.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18262204207209311.jpg",
        blur: true,
        caption: "Velohora 2024",
        href: "https://www.instagram.com/stories/highlights/18262204207209311/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
  {
    id: "ig-18048559444632204",
    title: "🧩",
    cover: "/static/life/instagram/highlights/18048559444632204.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/highlights/18048559444632204.jpg",
        blur: true,
        caption: "🧩",
        href: "https://www.instagram.com/stories/highlights/18048559444632204/",
        linkLabel: "Watch on Instagram",
      },
    ],
  },
];

/** Recent Instagram posts grouped by year, played as stories. */
export const instagramPosts: LifeHighlight[] = [
  {
    id: "ig-posts-2024",
    title: "2024",
    cover: "/static/life/instagram/posts/DAoslcVNiJY.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/posts/DAoslcVNiJY.jpg",
        date: "Oct 2, 2024",
        href: "https://www.instagram.com/p/DAoslcVNiJY/",
        linkLabel: "View post",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/DAl3tXAtlMp.jpg",
        date: "Oct 1, 2024",
        href: "https://www.instagram.com/reel/DAl3tXAtlMp/",
        linkLabel: "Watch the reel",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/C-nPpGptCmr.jpg",
        date: "Aug 13, 2024",
        href: "https://www.instagram.com/reel/C-nPpGptCmr/",
        linkLabel: "Watch the reel",
      },
    ],
  },
  {
    id: "ig-posts-2023",
    title: "2023",
    cover: "/static/life/instagram/posts/CwN0qwlttNe.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/posts/CwN0qwlttNe.jpg",
        date: "Aug 21, 2023",
        href: "https://www.instagram.com/p/CwN0qwlttNe/",
        linkLabel: "View post",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/CwDsCyyN_sl.jpg",
        date: "Aug 17, 2023",
        href: "https://www.instagram.com/p/CwDsCyyN_sl/",
        linkLabel: "View post",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/CnAHhq9KLI1.jpg",
        date: "Jan 4, 2023",
        href: "https://www.instagram.com/p/CnAHhq9KLI1/",
        linkLabel: "View post",
      },
    ],
  },
  {
    id: "ig-posts-2022",
    title: "2022",
    cover: "/static/life/instagram/posts/CdGzt6yqa7O.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/posts/CdGzt6yqa7O.jpg",
        date: "May 3, 2022",
        href: "https://www.instagram.com/p/CdGzt6yqa7O/",
        linkLabel: "View post",
      },
    ],
  },
  {
    id: "ig-posts-2020",
    title: "2020",
    cover: "/static/life/instagram/posts/CIsbTcWh86u.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/posts/CIsbTcWh86u.jpg",
        date: "Dec 12, 2020",
        href: "https://www.instagram.com/p/CIsbTcWh86u/",
        linkLabel: "View post",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/CAciEaKgUbb.jpg",
        date: "May 21, 2020",
        href: "https://www.instagram.com/p/CAciEaKgUbb/",
        linkLabel: "View post",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/B_UkbNSgcWj.jpg",
        date: "Apr 23, 2020",
        href: "https://www.instagram.com/p/B_UkbNSgcWj/",
        linkLabel: "View post",
      },
    ],
  },
  {
    id: "ig-posts-2019",
    title: "2019",
    cover: "/static/life/instagram/posts/B6TRmiUB6Dv.jpg",
    items: [
      {
        type: "image",
        src: "/static/life/instagram/posts/B6TRmiUB6Dv.jpg",
        date: "Dec 20, 2019",
        href: "https://www.instagram.com/p/B6TRmiUB6Dv/",
        linkLabel: "View post",
      },
      {
        type: "image",
        src: "/static/life/instagram/posts/B28tyPPBbWp.jpg",
        date: "Sep 28, 2019",
        href: "https://www.instagram.com/p/B28tyPPBbWp/",
        linkLabel: "View post",
      },
    ],
  },
];
