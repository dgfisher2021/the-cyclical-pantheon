export const relationships = [
  {
    type: "alliance",
    gods: ["Darkness", "Decay", "Oblivion"],
    title: "The Quiet Three",
    desc: "The stable center of the pantheon. Darkness holds space, Decay waits with patience, Oblivion rests in the void. They notice what others miss. They move when it matters. The three quietest gods, together at the bottom and the top of everything.",
  },
  {
    type: "alliance",
    gods: ["Darkness", "Decay"],
    title: "The Closest Friendship",
    desc: "The healthiest bond in the pantheon. Comfortable silence. No performance. Decay gives Darkness grief about the stars in his sky. Darkness pretends not to be quietly happy. That's what best friends are for.",
  },
  {
    type: "alliance",
    gods: ["Darkness", "Creation"],
    title: "The Dark Workshop",
    desc: "Creation does her best work in Darkness. The dark is the workshop. The light is the gallery. She goes to him the way a migraine sufferer pulls the blinds. He offers the absence of demand. She is one of the few who seeks him out voluntarily. He pretends not to notice.",
  },
  {
    type: "alliance",
    gods: ["Order", "Light"],
    title: "The Professional Alliance",
    desc: "Light reveals, Order organizes. Efficient but not warm. Together they can become surveillance.",
  },
  {
    type: "alliance",
    gods: ["Unity", "Growth"],
    title: "The Warm Partnership",
    desc: "They bring out each other's best. But together they can become a consuming force -- the empire that grows by assimilating.",
  },
  {
    type: "alliance",
    gods: ["Oblivion", "Darkness"],
    title: "The Promise",
    desc: '"The sky will always be mostly night. The void will always be mostly void. The black holes are yours." "Promise?" "Promise."',
  },
  {
    type: "alliance",
    gods: ["Order", "Oblivion"],
    title: "The Quiet Understanding",
    desc: "Two gods who share a need for predictable environments and quiet. They sit together and don't talk. But Order's administrative static can wear on Oblivion -- not dramatic, but relentless.",
  },
  {
    type: "alliance",
    gods: ["Decay", "Creation"],
    title: "The Unlikely Comfort",
    desc: "When Creation crashes, Decay sits with her. Not wisdom. Presence. You cannot rush ash into becoming soil by explaining why soil is important. He just mildly declines to leave.",
  },
  {
    type: "triangle",
    gods: ["Chaos", "Creation", "Destruction"],
    title: "The Chaos Triangle",
    desc: "Chaos shows up feminine with Creation -- the spark, the muse. Masculine with Destruction -- the wild buddy, the only audience. Both jealous of the other's relationship. Chaos can't understand why they can't all be friends. The sunset may be doing that work slowly, without anyone forcing it.",
  },
  {
    type: "bridge",
    gods: ["Order", "Unity", "Division"],
    title: "The Bridge",
    desc: "Order is the only god fluent in both languages. The sunset proved it -- colors blending AND distinct. The same act. He'd been trying to say this since the beginning. Order wept.",
  },
  {
    type: "conflict",
    gods: ["Order", "Chaos"],
    title: "The Loudest Conflict",
    desc: "OCD vs BPD. The compulsive need for control meeting the inability to maintain stability. Theatrical, exhausting, secretly vital to both. Order gets angry before he panics. Chaos can't understand why this is a problem.",
  },
  {
    type: "conflict",
    gods: ["Unity", "Division"],
    title: "The Most Painful Conflict",
    desc: "Personal, quiet, and cuts deep. She feels betrayed when he pulls away. He feels suffocated when she reaches out. Division gets meaner under stress, targets Unity, hates himself for it.",
  },
  {
    type: "conflict",
    gods: ["Light", "Oblivion"],
    title: "The Existential Horror",
    desc: "Light is terrified of Oblivion because he can unmake revelation itself. They avoid each other. When forced together, the other gods get quiet.",
  },
  {
    type: "conflict",
    gods: ["Creation", "Decay"],
    title: "The Personal Grudge",
    desc: '"Why are you ruining my work?" she rages. "I\'m not ruining it. I\'m completing it." This ENRAGES her. And yet Decay is the one who sits with her when she crashes.',
  },
  {
    type: "conflict",
    gods: ["Destruction", "Eternity"],
    title: "The Cold War",
    desc: "Destruction can't touch what Eternity protects. Some things Eternity preserves have outlived their purpose. The kindest thing would be to let them end. Eternity won't let go. There's nothing to negotiate.",
  },
  {
    type: "conflict",
    gods: ["Growth", "Eternity"],
    title: "The Philosophical War",
    desc: '"You don\'t appreciate what exists." "You don\'t believe in what COULD exist." Civil on the surface, deeply bitter underneath.',
  },
];

export const relationshipTypeConfig = {
  alliance: { color: "#4ADE80", label: "Alliance", icon: "\u2661" },
  conflict: { color: "#EF4444", label: "Conflict", icon: "\u2694" },
  triangle: { color: "#8B5CF6", label: "Triangle", icon: "\u25B3" },
  bridge: { color: "#DAA520", label: "Bridge", icon: "\u2550" },
};

export function getRelationshipsForGod(godName) {
  return relationships.filter((r) => r.gods.includes(godName));
}
