export const acts = [
  { id: 1, title: "The First Imbalance" },
  { id: 2, title: "The Cosmic Cascade" },
  { id: 3, title: "The Birth of Twilight" },
];

export const chapters = {
  "1.0": {
    id: "1.0",
    act: 1,
    title: "The Original Heartbeat",
    gods: ["Light", "Darkness"],
  },
  1.1: {
    id: "1.1",
    act: 1,
    title: "The Early Age",
    gods: [
      "Light",
      "Order",
      "Unity",
      "Creation",
      "Growth",
      "Eternity",
      "Darkness",
      "Chaos",
      "Division",
      "Destruction",
      "Decay",
      "Oblivion",
    ],
  },
  1.2: {
    id: "1.2",
    act: 1,
    title: "Too Much of Everything",
    gods: [
      "Chaos",
      "Creation",
      "Destruction",
      "Order",
      "Growth",
      "Unity",
      "Oblivion",
      "Division",
    ],
  },
  1.3: {
    id: "1.3",
    act: 1,
    title: "The Question That Had No Answer",
    gods: ["Chaos", "Creation", "Destruction"],
  },
  E1: {
    id: "E1",
    act: 1,
    title: "The Quiet Three (I)",
    gods: ["Darkness", "Decay", "Oblivion"],
  },
  "2.0": {
    id: "2.0",
    act: 2,
    title: "Destruction & Chaos",
    gods: ["Chaos", "Destruction", "Creation"],
  },
  2.1: {
    id: "2.1",
    act: 2,
    title: "The Gods Break",
    gods: ["Order", "Growth", "Unity", "Division", "Eternity", "Oblivion"],
  },
  2.2: {
    id: "2.2",
    act: 2,
    title: "The Call of the Void",
    gods: ["Darkness", "Oblivion", "Decay"],
  },
  E2: {
    id: "E2",
    act: 2,
    title: "The Quiet Three (II)",
    gods: ["Darkness", "Decay", "Oblivion", "Creation"],
  },
  "3.0": {
    id: "3.0",
    act: 3,
    title: "Creation Finds Darkness",
    gods: ["Creation", "Darkness", "Oblivion"],
  },
  3.1: {
    id: "3.1",
    act: 3,
    title: "Stars and Shadows",
    gods: ["Darkness", "Light", "Creation", "Order", "Oblivion"],
  },
  3.2: {
    id: "3.2",
    act: 3,
    title: "The First Sunset",
    gods: [
      "Chaos",
      "Darkness",
      "Creation",
      "Destruction",
      "Order",
      "Unity",
      "Division",
    ],
  },
  3.3: {
    id: "3.3",
    act: 3,
    title: "The New Balance",
    gods: [
      "Light",
      "Order",
      "Unity",
      "Creation",
      "Growth",
      "Eternity",
      "Darkness",
      "Chaos",
      "Division",
      "Destruction",
      "Decay",
      "Oblivion",
    ],
  },
  E3: {
    id: "E3",
    act: 3,
    title: "The Quiet Three (III)",
    gods: ["Darkness", "Decay", "Oblivion", "Creation", "Chaos"],
  },
};

export const chapterOrder = [
  "1.0",
  "1.1",
  "1.2",
  "1.3",
  "E1",
  "2.0",
  "2.1",
  "2.2",
  "E2",
  "3.0",
  "3.1",
  "3.2",
  "3.3",
  "E3",
];

export function getChaptersForGod(name) {
  return chapterOrder
    .map((id) => chapters[id])
    .filter((ch) => ch.gods.includes(name));
}

export function getReadTime(chapterId, storyChapters) {
  const content = storyChapters[chapterId];
  if (!content) return 0;
  const words = content.reduce((sum, block) => {
    if (block.text) return sum + block.text.split(/\s+/).length;
    return sum;
  }, 0);
  return Math.max(1, Math.round(words / 230));
}

export function getAdjacentChapter(id, dir) {
  const idx = chapterOrder.indexOf(id);
  if (idx === -1) return null;
  const nextIdx = idx + dir;
  if (nextIdx < 0 || nextIdx >= chapterOrder.length) return null;
  return chapters[chapterOrder[nextIdx]];
}
