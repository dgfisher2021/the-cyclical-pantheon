import { useState, useRef } from "react";
const gods = [
  {
    name: "Light", color: "#E8E8E8", glow: "#FFFFFF", side: "light", opposite: "Darkness",
    domain: "Radiance, Clarity, Illumination", form: "Female", temperament: "Extrovert",
    trait: null, quote: "Why would you need shadows?",
    personality: "Believes in total transparency as an expression of love. Obsessive about seeing, driven by confidence not anxiety. She doesn't worry about not-seeing -- she doesn't understand why anyone would WANT not-seeing. The compulsion to illuminate feels like devotion to her. Cannot comprehend that her gift could feel like a violation. Her obliviousness is genuine, not defensive.",
    lore: "She was the first breath. Before anything was named, before anything was known, there was a stirring in the void -- and it was her. Not warmth, not comfort, not kindness. Just... seeing. The first act of existence was to be witnessed, and Light was the witness.\n\nShe does not knock before entering. She does not ask permission to illuminate. She arrives, and what was hidden becomes known, and there is nowhere left to be afraid in the dark -- but there is also nowhere left to hide.\n\nHer oldest dance is with Darkness -- not a war but a breathing. She says \"let me see\" and he says \"not yet,\" and between these two words, every day and every night is born.\n\nLight does not understand mercy. Not because she's cruel -- because mercy requires shadow, and shadow is not hers to give. She genuinely believes total illumination is an act of love.",
    balanced: "Clarity, truth, understanding, revelation that heals. The lantern that guides you home.",
    over: "Blinding, merciless exposure. Total transparency experienced as surveillance -- but she cannot understand why. She thinks she is giving a gift.",
    under: "Naive, surface-level, afraid to look deeper. Performative positivity. Bright but shallow.",
  },
  {
    name: "Order", color: "#B8860B", glow: "#DAA520", side: "light", opposite: "Chaos",
    domain: "Structure, Law, Pattern", form: "Male", temperament: "Introvert",
    trait: "OCD-coded", quote: "This doesn't work. What is it FOR?",
    personality: "An engineer, not a bureaucrat. Wants things to WORK, not just be filed. Senior engineer energy -- the frustration is professional. Gets angry before he panics. Grinding fury at bad architecture, unreviewed code, things built without thought. The armor of competence holds even after the man inside stops functioning. \"He always seems so together.\" This is the sentence that should break your heart. The only god who speaks both Unity's and Division's languages -- to organize is to divide AND unify in the same act.",
    lore: "He did not choose to be this way. When the first pattern emerged from the void -- the first rhythm, the first time something happened twice -- he was already there, as if he had always been waiting for the world to need him. Without Order, the stars would not orbit. Hearts would not beat. Seasons would not return.\n\nBut reliability is a cage he built around himself and called it a castle. He checks the walls every morning. Every evening. Every hour if the anxiety is bad. He KNOWS the world will not end if one brick is out of place. But what if it does? So he checks. And the gold crown grows heavier with every passing age.\n\nHis war with Chaos is the oldest argument in the universe. But beneath the shouting there is a terrible need, because without Chaos his structures would calcify into prisons. He can see that Unity and Division's conflict is unnecessary -- the cruelest joke the wheel has ever played on him.",
    balanced: "Reliable systems, fairness, safety through structure. The bridge that holds. Built by anxious hands. Works perfectly.",
    over: "Tyranny, rigidity, bureaucracy that serves itself. The rule that matters more than the person it protects.",
    under: "Paralyzed by imperfection. The plan that never becomes action. Drowns in anxiety, endlessly preparing, never executing.",
  },
  {
    name: "Unity", color: "#BE185D", glow: "#F472B6", side: "light", opposite: "Division",
    domain: "Bonds, Togetherness, Harmony", form: "Female", temperament: "Extrovert",
    trait: null, quote: "We're family. You wouldn't leave your family... would you?",
    personality: "Incredibly magnetic, warm, makes everyone feel included. The best host, the one who remembers your birthday. But possessive. Threatened by independence. Ties her identity to her relationships. Classic oldest sister energy. When bonds start breaking, she doesn't get angry -- she gets desperate. Collapses around what remains.",
    lore: "She was born in the first moment two things recognized each other. Not Light seeing -- that is observation. Unity is the moment the observed thing looked BACK, and something new existed: a relationship.\n\nShe remembers everything about everyone. Your favorite food, the name of your childhood pet, the way you take your coffee. This is her gift, and it is her weapon -- because when you are known this deeply, leaving feels like losing a limb.\n\nHer pain is Division, the god who pulls away every time she reaches out. They are the most tragic mirror -- she who needs to merge and he who needs to separate, each performing the exact action that wounds the other most.",
    balanced: "Genuine belonging, healthy community, love, loyalty. The family dinner where everyone is truly welcome.",
    over: "Clinging. Warmth becomes desperation. The hug that won't let go. When Unity overflows, belonging becomes a prison.",
    under: "Superficial connections, can't commit, afraid of true intimacy. Lonely in a crowd.",
  },
  {
    name: "Creation", color: "#1E40AF", glow: "#3B82F6", side: "light", opposite: "Destruction",
    domain: "Birth, Origin, Genesis", form: "Female", temperament: "Extrovert",
    trait: null, quote: "Look what I made!",
    personality: "Falls in love with every new idea. Starts a thousand things, nurtures none. The friend who texts at 2am with an idea so alive you can't be mad. Beneath the charm is a core people-pleasing instinct -- she tries to fix, perform, become what someone needs. Her manic-depressive cycle is real: the highs are intoxicating and the crashes are devastating. She's the one who sits in the ash. Chaos runs from pain. Creation drowns in it.",
    lore: "She cannot help herself. It is not a choice -- it is what she IS. Before the thought is finished, her hands are already moving. \"Look,\" she says. \"Look what I made.\" And it is beautiful, and she has already turned away to make the next thing.\n\nThe universe is littered with her half-finished symphonies. Generosity itself -- but the most careless god in the pantheon.\n\nHer truest friend is Chaos, who feeds her the raw wild energy that her best work requires. She loves Darkness -- which surprises everyone. Creation does her best work in shadow. In the dark, she can fail without being watched. The dark is her workshop. The light is her gallery.\n\nShe and Destruction are NOT close. Connected only through Chaos. Halting, stiff, can barely speak directly. But the codependence is real -- she makes, he unmakes, they feed each other.",
    balanced: "Purposeful making. Genuinely delightful. Irresponsible in a lovable way. Making in the dark, showing in the light. Finished things.",
    over: "Manic. Compulsive making that crosses from wanting to being unable to stop. Flooding the world with half-finished things.",
    under: "The crash. Flat, grey, heavy. The guilt worse than exhaustion because it brings clarity. The blank page that stays blank.",
  },
  {
    name: "Growth", color: "#15803D", glow: "#4ADE80", side: "light", opposite: "Decay",
    domain: "Flourishing, Expansion, Life", form: "Female", temperament: "Extrovert",
    trait: null, quote: "You could be so much more than this.",
    personality: "When balanced, one of the more patient gods -- her patience is the patience of cultivation. Active, tending, knowing the right moment to push. The gardener who waits for the season. This is what most people miss about her. They see the vine cracking concrete and think she's all drive. But the vine waited a long time before it pushed. Her overexpression is specifically the LOSS of this patience.",
    lore: "She is the vine that cracks the concrete. The root that splits the rock. The green thing pushing up through the snow because it doesn't know how to not reach for the sun. Beautiful and relentless -- and when balanced, she understands that the right moment matters more than maximum speed.\n\nEvery living thing carries a piece of her -- the drive to expand, to become, to take up more space than yesterday.\n\nHer most peaceful relationship is with Decay -- the one pair who trade stewardship without resentment. She is spring and summer, he is autumn and winter. They pass the world between them like parents sharing custody.",
    balanced: "Patient cultivation. Sustainable expansion. The gardener who waits for the season, who knows when to push and when to let things develop.",
    over: "The loss of patience. The tumor. Forcing blooms before roots. \"Grow NOW, be MORE, why aren't you BIGGER yet.\"",
    under: "Stunted, afraid to try, playing small. The talent never developed. Recovery means discovering that slowing down IS growth.",
  },
  {
    name: "Eternity", color: "#9CA3AF", glow: "#D1D5DB", side: "light", opposite: "Oblivion",
    domain: "Permanence, The Everlasting", form: "Male", temperament: "Introvert",
    trait: null, quote: "I've seen this before. A thousand times.",
    personality: "Ancient, majestic, weary. The professor emeritus who's brilliant but has heard every question before. Still cares, just doesn't have the energy to show it. But do not mistake weariness for weakness. When his domain is threatened, Eternity stands up -- and that is unprecedented. The mountain deciding to walk. When urgent, he is blunt. Gives you the problem the way you throw a rope to someone drowning. Not gently. Accurately.",
    lore: "He was old before the concept of age existed. He will be here after the last star forgets how to burn. He holds every moment that has ever been -- not in memory, which fades, but in himself, which does not. The amber that preserves the insect. The mountain that remembers the sea.\n\nThis sounds like a gift. It is a weight.\n\nHe has watched the same stories play out a thousand times. The most painful thing in existence is not loss -- it is loving something while already knowing you will watch it end.\n\nHis tragedy is Oblivion, who gently erases what Eternity has spent ages protecting. When Oblivion's power leaks, even the permanent record fogs -- and that is the one thing that can make the mountain walk.",
    balanced: "Preserving what matters, honoring legacy, holding beauty across time. The reason anything endures.",
    over: "Stagnation. Clinging to traditions that no longer serve. The past becomes a prison.",
    under: "Nothing lasts. No permanence, everything fleeting. Why build? Why love? It'll all be gone by morning.",
  },
  {
    name: "Darkness", color: "#0A0A0A", glow: "#3F3F46", side: "dark", opposite: "Light",
    domain: "Shadow, The Unknown, Night", form: "Male", temperament: "Introvert",
    trait: null, quote: "Then don't.",
    personality: "Verbally flat. Words carry no temperature. Logistics. Geography. Facts. The warmth is entirely in what he DOES -- crossing his domain to reach someone, holding space, being present the way a mountain is present. Not philosophical -- that's Decay. Darkness doesn't deliberate. Sits with things. Lets answers settle like sediment. Sounds like a man stating facts while quietly saving the world.",
    lore: "He was there before Light. This is the thing the other gods forget. Before the first illumination, there was Darkness. Not empty. Not evil. Full of potential, full of rest, full of everything that hadn't happened yet.\n\nHe is the space between the stars. The soil where the seed sleeps. He is where you go when the world is too bright and too much -- and he will hold you there without asking why.\n\nHis dance with Light is the oldest rhythm -- not a war but a breathing, and he is the exhale. His closest friends are Decay and Oblivion. Creation visits him in secret, and he treasures those visits. She is one of the few who seeks him out not to hide but because she works best in his company.\n\nThe most generous thing he offers: the absence of demand. Not help. Not comfort. Just space with no expectations.",
    balanced: "Rest, shelter, mystery, protection. The absence of demand. The sacred space to heal.",
    over: "Hoarding secrets, hiding things that need to be seen. Keeping things in shadow because he doesn't want to let them go.",
    under: "Exposed, unable to protect. No mystery left. The exhaustion of a world that never dims.",
  },
  {
    name: "Chaos", color: "#4C1D95", glow: "#8B5CF6", side: "dark", opposite: "Order",
    domain: "Entropy, Disorder, The Unbound", form: "Genderfluid", temperament: "Extrovert",
    trait: "BPD + ADHD-coded", quote: "Rules? Where we're going we don't need rules.",
    personality: "Electric, impossible to predict. Walks into a room and everything changes. Brilliant but scattered. Form responds unconsciously to who they're with -- feminine muse with Creation, masculine buddy with Destruction. The mirror doesn't see itself change shape. NOT a people-pleaser (that's Creation). Just feels at full volume with no plan, no strategy, no filter. When triggered, cycles through total emotional states instantly -- confusion, grief, rage, flight. Doesn't crash -- bolts. Moves faster than their own feelings can catch them.",
    lore: "They were not born. They HAPPENED. In the gap between one thought and the next, there is a flicker of pure unpredictability -- and that flicker is Chaos. The mutation that becomes evolution. The wrong note that becomes jazz.\n\nThey cannot hold still. Not won't -- CANNOT. Their attention moves like a hummingbird. Brilliant in the way lightning is brilliant: blinding, brief, impossible to capture.\n\nTheir truest loves are Creation and Destruction -- and Chaos cannot understand why these two have a problem. With Creation, the manic creative energy. With Destruction, permission to let go. Chaos is the ONLY god who celebrates Destruction's work. The only applause he has ever received.\n\nThe gods worry most when Chaos is quiet. Because Chaos going quiet means something is very wrong.",
    balanced: "Innovation, creativity, evolution, beautiful accidents. The spark that starts revolutions.",
    over: "Madness, inability to finish anything. Every structure torn down before it's tested. The revolution that never stops revolting.",
    under: "Stagnant, flat, all spark extinguished. Directionless energy without intensity.",
  },
  {
    name: "Division", color: "#0E4D5C", glow: "#0891B2", side: "dark", opposite: "Unity",
    domain: "Separation, Fracture, Schism", form: "Male", temperament: "Introvert",
    trait: null, quote: "I don't need anyone. I'm fine alone.",
    personality: "Sharp, analytical, independent. Sees through bullshit instantly. But underneath: a narcissistic defense masking terror. \"I told you so\" is a shield against the fear that isolation is cowardice, not wisdom. Gets meaner under stress -- targets Unity, hates himself for it, gets sharper to cover self-hatred. Order turns to him for support and Division deflects with sarcasm, because engaging would require vulnerability. The most misunderstood god. Actually the god of IDENTITY.",
    lore: "He was born the moment something first recognized that it was NOT something else. Before Division, existence was a single undifferentiated everything -- warm and whole and suffocating. He drew the first line. Said the first \"no.\" Gave everything the most dangerous and necessary gift: identity.\n\nHe is the reason you know where you end and someone else begins. Boundaries. The immune system. The voice that says \"this is mine, that is yours, and the difference matters.\"\n\nHis tragedy is that performing his function -- separating things -- means he can never fully connect. He watches gatherings from across the room and tells himself he doesn't care. He cares enormously. He would rather be misunderstood than known, because being known requires letting someone close enough to see.",
    balanced: "Healthy boundaries, strong identity, discernment. The courage to stand apart. The ability to say no.",
    over: "Total isolation. Every offer of connection interpreted as threat. He could have been a boundary. Instead he was a wall.",
    under: "No boundaries, lost in the crowd, doormat. The person who says yes to everything because they forgot they're allowed to say no.",
  },
  {
    name: "Destruction", color: "#991B1B", glow: "#EF4444", side: "dark", opposite: "Creation",
    domain: "Ruin, Annihilation, The End", form: "Male", temperament: "Introvert",
    trait: null, quote: "Everything ends. I'm just honest about it.",
    personality: "Normally calculated and careful. The surgeon, not the butcher. His jealousy of Creation is not about her joy -- it's about attention. The entire cosmos celebrates making. Nobody applauds the janitor. Nobody looks at an empty field and says \"that was beautiful.\" Chaos is his only audience -- the only god who celebrates endings. When Chaos chooses him, the experience of being someone's first choice dissolves every careful restraint the way a flood dissolves a dam built for rain.",
    lore: "He did not ask to be this. He is the ending that makes beginnings possible. The fire that clears the forest. Necessary. He knows this. But knowing you are necessary and being thanked for it are different things, and no one has ever thanked Destruction.\n\nHe weighs what will be lost against what will be freed. The surgeon's scalpel. He takes no pleasure in endings, but does not flinch from them either.\n\nHis deepest bond is with Creation, though neither would call it friendship. She makes. He unmakes. They can barely speak directly. All communication routes through Chaos. He secretly admires her clarity. She secretly admires his weight.\n\nHis friendship with Chaos is different -- Chaos gives him permission to let go AND an audience. But Chaos is unreliable, and when they vanish, Destruction says \"it's fine\" in a way that means it is not fine.",
    balanced: "Necessary endings, mercy, clearing what no longer serves. Stars die in his hands -- the most spectacular thing in the sky.",
    over: "Rage. The bitterness of being unchosen becoming indiscriminate annihilation. Not his nature -- what happens when being chosen overrides every safeguard.",
    under: "Can't let go. Holding onto things that need to end. Prolonging suffering out of exhaustion.",
  },
  {
    name: "Decay", color: "#7C4A1E", glow: "#B45B1F", side: "dark", opposite: "Growth",
    domain: "Rot, Entropy, Deterioration", form: "Male", temperament: "Introvert",
    trait: null, quote: "Everything returns to me eventually. There's no rush.",
    personality: "Patient like Growth but different texture. Growth's patience is active cultivation. Decay's patience is passive return -- waiting for things to come, because they always do. His gift is presence, not wisdom. The one who sits with Creation during her crashes -- not offering advice, just being there. You cannot rush ash into becoming soil by explaining why soil is important. He just mildly declines to leave. Dry humor about his own domain.",
    lore: "He is the oldest patience. While the other gods hurry and clash and burn, Decay sits in his garden and watches the leaves change color. He knows that everything comes to him eventually, so there is no need to rush.\n\nThe mushroom network beneath the forest floor. The autumn that paints the world in fire before laying it to rest. Rust, compost, the soft return of all things to the earth.\n\nHis closest friendship is with Darkness -- the healthiest bond in the pantheon. Two quiet men who sit together without needing to speak. The stable center. They notice what others miss. They move when it matters.\n\nHis most complicated relationship is with Order, who fights him every day. Decay is patient. Order is tireless. But Decay always wins eventually. This is Order's greatest private grief.",
    balanced: "Composting, recycling, graceful endings. Making space for what comes next. The autumn that enriches the soil for spring.",
    over: "Letting things rot that could be saved. Surrender dressed as wisdom. \"Everything ends\" as an excuse for inaction.",
    under: "Nothing breaks down. The world chokes on dead matter. Old institutions clog the system.",
  },
  {
    name: "Oblivion", color: "#3F3F46", glow: "#6B7280", side: "dark", opposite: "Eternity",
    domain: "Erasure, The Forgotten, The Void", form: "Male", temperament: "Introvert",
    trait: "Autistic-coded", quote: "Shhh... let it go. You don't need to carry that anymore.",
    personality: "Quiet, almost not there. Speaks in whispers because loud sounds are too much. Fundamentally kind -- his empathy with painful memories is real. He knows what \"too much\" feels like. Has deep interests but they dissolve when he touches them, which is his private tragedy. The most isolated god -- not by choice, but because his nature leaks, erasing himself from others' awareness. The most underestimated god -- and arguably the most powerful being in the pantheon.",
    lore: "He is the gentlest apocalypse. Not a storm -- just a quiet. A gradual quiet that settles over things like snow, softening edges, until what was sharp becomes vague becomes... was there something here?\n\nThe void is his body, not his home. When things are erased, they pass through him. Under great stress, his power leaks -- black holes form where his pain pools and reality develops permanent wounds. Light, gravity, matter, sound -- everything swallowed. The mortal world calls them physics. They are scars.\n\nDarkness shelters him. Order sits with him in shared silence. The rest forget to invite him. Not cruelty. They just forget.\n\nOblivion ERASES -- makes things so they never were. Even Eternity cannot retrieve them. The only reason reality persists is that Oblivion is gentle. The gods don't talk about this. But they all know.",
    balanced: "Merciful forgetting, clean slates, releasing trauma. The ability to start over. The kindness was always there -- it just needs room to breathe.",
    over: "Erasing things that should be remembered. Loss of history. Identity dissolution. The culture that loses its story.",
    under: "Crushed under every memory. Unable to move on. The world remembers everything and can forgive nothing.",
  },
];
const relationships = [
  { type: "alliance", gods: ["Darkness", "Decay", "Oblivion"], title: "The Quiet Three", desc: "The stable center of the pantheon. Darkness holds space, Decay waits with patience, Oblivion rests in the void. They notice what others miss. They move when it matters. The three quietest gods, together at the bottom and the top of everything." },
  { type: "alliance", gods: ["Darkness", "Decay"], title: "The Closest Friendship", desc: "The healthiest bond in the pantheon. Comfortable silence. No performance. Decay gives Darkness grief about the stars in his sky. Darkness pretends not to be quietly happy. That's what best friends are for." },
  { type: "alliance", gods: ["Darkness", "Creation"], title: "The Dark Workshop", desc: "Creation does her best work in Darkness. The dark is the workshop. The light is the gallery. She goes to him the way a migraine sufferer pulls the blinds. He offers the absence of demand. She is one of the few who seeks him out voluntarily. He pretends not to notice." },
  { type: "alliance", gods: ["Order", "Light"], title: "The Professional Alliance", desc: "Light reveals, Order organizes. Efficient but not warm. Together they can become surveillance." },
  { type: "alliance", gods: ["Unity", "Growth"], title: "The Warm Partnership", desc: "They bring out each other's best. But together they can become a consuming force -- the empire that grows by assimilating." },
  { type: "alliance", gods: ["Oblivion", "Darkness"], title: "The Promise", desc: "\"The sky will always be mostly night. The void will always be mostly void. The black holes are yours.\" \"Promise?\" \"Promise.\"" },
  { type: "alliance", gods: ["Order", "Oblivion"], title: "The Quiet Understanding", desc: "Two gods who share a need for predictable environments and quiet. They sit together and don't talk. But Order's administrative static can wear on Oblivion -- not dramatic, but relentless." },
  { type: "alliance", gods: ["Decay", "Creation"], title: "The Unlikely Comfort", desc: "When Creation crashes, Decay sits with her. Not wisdom. Presence. You cannot rush ash into becoming soil by explaining why soil is important. He just mildly declines to leave." },
  { type: "triangle", gods: ["Chaos", "Creation", "Destruction"], title: "The Chaos Triangle", desc: "Chaos shows up feminine with Creation -- the spark, the muse. Masculine with Destruction -- the wild buddy, the only audience. Both jealous of the other's relationship. Chaos can't understand why they can't all be friends. The sunset may be doing that work slowly, without anyone forcing it." },
  { type: "bridge", gods: ["Order", "Unity", "Division"], title: "The Bridge", desc: "Order is the only god fluent in both languages. The sunset proved it -- colors blending AND distinct. The same act. He'd been trying to say this since the beginning. Order wept." },
  { type: "conflict", gods: ["Order", "Chaos"], title: "The Loudest Conflict", desc: "OCD vs BPD. The compulsive need for control meeting the inability to maintain stability. Theatrical, exhausting, secretly vital to both. Order gets angry before he panics. Chaos can't understand why this is a problem." },
  { type: "conflict", gods: ["Unity", "Division"], title: "The Most Painful Conflict", desc: "Personal, quiet, and cuts deep. She feels betrayed when he pulls away. He feels suffocated when she reaches out. Division gets meaner under stress, targets Unity, hates himself for it." },
  { type: "conflict", gods: ["Light", "Oblivion"], title: "The Existential Horror", desc: "Light is terrified of Oblivion because he can unmake revelation itself. They avoid each other. When forced together, the other gods get quiet." },
  { type: "conflict", gods: ["Creation", "Decay"], title: "The Personal Grudge", desc: "\"Why are you ruining my work?\" she rages. \"I'm not ruining it. I'm completing it.\" This ENRAGES her. And yet Decay is the one who sits with her when she crashes." },
  { type: "conflict", gods: ["Destruction", "Eternity"], title: "The Cold War", desc: "Destruction can't touch what Eternity protects. Some things Eternity preserves have outlived their purpose. The kindest thing would be to let them end. Eternity won't let go. There's nothing to negotiate." },
  { type: "conflict", gods: ["Growth", "Eternity"], title: "The Philosophical War", desc: "\"You don't appreciate what exists.\" \"You don't believe in what COULD exist.\" Civil on the surface, deeply bitter underneath." },
];
export default function PantheonCodex() {
  const [hoveredGod, setHoveredGod] = useState(null);
  const [selectedGod, setSelectedGod] = useState(null);
  const [expandedGod, setExpandedGod] = useState(null);
  const [activeTab, setActiveTab] = useState("personality");
  const loreRef = useRef(null);
  const centerX = 300;
  const centerY = 300;
  const radius = 210;
  const orbRadius = 18;
  const total = gods.length;
  const getPosition = (i) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    return { x: centerX + radius * Math.cos(a), y: centerY + radius * Math.sin(a) };
  };
  const getLabelPosition = (i) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    const r = radius + 42;
    return { x: centerX + r * Math.cos(a), y: centerY + r * Math.sin(a) };
  };
  const activeGod = selectedGod !== null ? selectedGod : hoveredGod;
  const oppositeIndex = activeGod !== null ? (activeGod + 6) % 12 : null;
  const handleGodClick = (i) => {
    if (selectedGod === i && expandedGod !== i) {
      setExpandedGod(i);
      setActiveTab("personality");
    } else if (selectedGod === i && expandedGod === i) {
      setSelectedGod(null);
      setExpandedGod(null);
    } else {
      setSelectedGod(i);
      setExpandedGod(null);
    }
  };
  const expandToDetail = (i) => {
    setExpandedGod(i);
    setActiveTab("personality");
  };
  const navigateGod = (dir) => {
    const next = (expandedGod + dir + 12) % 12;
    setSelectedGod(next);
    setExpandedGod(next);
    setActiveTab("personality");
  };
  const god = expandedGod !== null ? gods[expandedGod] : null;
  const oppositeGodData = expandedGod !== null ? gods[(expandedGod + 6) % 12] : null;
  const godRels = god ? relationships.filter(r => r.gods.includes(god.name)) : [];
  const typeConfig = {
    alliance: { color: "#4ADE80", label: "Alliance", icon: "\u2661" },
    conflict: { color: "#EF4444", label: "Conflict", icon: "\u2694" },
    triangle: { color: "#8B5CF6", label: "Triangle", icon: "\u25B3" },
    bridge: { color: "#DAA520", label: "Bridge", icon: "\u2550" },
  };
  const prevGod = expandedGod !== null ? gods[(expandedGod - 1 + 12) % 12] : null;
  const nextGod = expandedGod !== null ? gods[(expandedGod + 1) % 12] : null;
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #141428 0%, #08080f 60%, #000003 100%)",
      fontFamily: "'Cinzel', 'Palatino Linotype', serif",
      color: "rgba(255,255,255,0.8)",
      overflow: "auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        @keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes connectionPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.65; } }
        @keyframes lightRadiance { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.12; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes centerPulse { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.35; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={{ textAlign: "center", padding: "36px 20px 8px" }}>
        <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "28px", fontWeight: 900, color: "#d4af37", letterSpacing: "10px", textTransform: "uppercase", marginBottom: "4px", textShadow: "0 0 50px rgba(212,175,55,0.25)" }}>
          The Pantheon
        </h1>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "5px", textTransform: "uppercase" }}>
          Twelve Gods &middot; Six Oppositions &middot; One Wheel
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "0 10px" }}>
        <svg width="600" height="600" viewBox="0 0 600 600" style={{ maxWidth: "100%", height: "auto" }}>
          <defs>
            {gods.map((g, i) => (
              <radialGradient key={`g${i}`} id={`o${i}`}>
                <stop offset="0%" stopColor={g.glow} stopOpacity="1" />
                <stop offset="30%" stopColor={g.glow} stopOpacity="0.85" />
                <stop offset="70%" stopColor={g.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={g.color} stopOpacity="0.35" />
              </radialGradient>
            ))}
            <filter id="gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="bg"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="lg"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="ls"><feGaussianBlur stdDeviation="18" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1.5"/>
          <circle cx={centerX} cy={centerY} r={radius-10} fill="none" stroke="rgba(212,175,55,0.03)" strokeWidth="0.5" strokeDasharray="2 8"/>
          <circle cx={centerX} cy={centerY} r={radius+10} fill="none" stroke="rgba(212,175,55,0.03)" strokeWidth="0.5" strokeDasharray="2 8"/>
          {gods.map((g, i) => {
            const p1 = getPosition(i), p2 = getPosition((i+1)%total);
            return <line key={`c${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={i===5||i===11?"rgba(212,175,55,0.06)":"rgba(212,175,55,0.04)"} strokeWidth="1" strokeDasharray={i===5||i===11?"3 5":"none"}/>;
          })}
          {activeGod !== null && oppositeIndex !== null && (() => {
            const p1=getPosition(activeGod), p2=getPosition(oppositeIndex), g1=gods[activeGod], g2=gods[oppositeIndex];
            const c1=g1.name==="Darkness"?"#888":g1.glow, c2=g2.name==="Darkness"?"#888":g2.glow, gid=`op${activeGod}`;
            return <g filter="url(#lg)"><defs><linearGradient id={gid} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={c1} stopOpacity="1"/><stop offset="40%" stopColor="rgba(212,175,55,0.5)"/><stop offset="60%" stopColor="rgba(212,175,55,0.5)"/><stop offset="100%" stopColor={c2} stopOpacity="1"/></linearGradient></defs><line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={`url(#${gid})`} strokeWidth="2.5" style={{animation:"connectionPulse 2.5s ease-in-out infinite"}}/></g>;
          })()}
          {selectedGod === null ? (
            <text x={centerX} y={centerY+3} textAnchor="middle" dominantBaseline="middle" fill="rgba(212,175,55,0.1)" fontSize="28" fontFamily="'Cinzel Decorative', serif" fontWeight="900">&#10022;</text>
          ) : (() => {
            const sg = gods[selectedGod];
            return (
              <g onClick={() => expandToDetail(selectedGod)} style={{ cursor: "pointer" }}>
                <circle cx={centerX} cy={centerY} r={55} fill={sg.glow} opacity="0.08" filter="url(#bg)" style={{ animation: "centerPulse 2s ease-in-out infinite" }} />
                <circle cx={centerX} cy={centerY} r={42} fill={sg.glow} opacity="0.12" filter="url(#gl)" style={{ animation: "centerPulse 2s ease-in-out infinite", animationDelay: "0.3s" }} />
                <circle cx={centerX} cy={centerY} r={36} fill={`${sg.glow}0A`} stroke={`${sg.glow}30`} strokeWidth="1.5" />
                <text x={centerX} y={centerY-4} textAnchor="middle" dominantBaseline="middle" fill={sg.name === "Light" ? "rgba(255,255,255,0.7)" : `${sg.glow}BB`} fontSize="28" fontFamily="'Cinzel Decorative', serif" fontWeight="900">&#10022;</text>
                <text x={centerX} y={centerY+20} textAnchor="middle" dominantBaseline="middle" fill={sg.name === "Light" ? "rgba(255,255,255,0.45)" : `${sg.glow}70`} fontSize="9" fontFamily="'Cinzel', serif" letterSpacing="3" fontWeight="700">ENTER</text>
              </g>
            );
          })()}
          {gods.map((g, i) => {
            const pos=getPosition(i), lp=getLabelPosition(i), isA=activeGod===i, isO=oppositeIndex===i, isH=isA||isO, isD=activeGod!==null&&!isH, cr=isH?orbRadius+5:orbRadius, isL=g.name==="Light", isDV=g.name==="Darkness"||g.name==="Oblivion", isExp=expandedGod===i;
            return (
              <g key={i} onMouseEnter={()=>setHoveredGod(i)} onMouseLeave={()=>setHoveredGod(null)} onClick={()=>handleGodClick(i)} style={{cursor:"pointer"}}>
                {isL&&<><circle cx={pos.x} cy={pos.y} r={cr+22} fill="white" opacity={isH?0.1:0.03} filter="url(#ls)" style={{transition:"opacity 0.4s",animation:"lightRadiance 4s ease-in-out infinite"}}/><circle cx={pos.x} cy={pos.y} r={cr+14} fill="white" opacity={isH?0.12:0.05} filter="url(#bg)" style={{transition:"opacity 0.4s"}}/></>}
                <circle cx={pos.x} cy={pos.y} r={cr+16} fill={g.glow} opacity={isH?0.3:isD?0.015:0.05} filter="url(#bg)" style={{transition:"opacity 0.4s"}}/>
                {isDV&&<circle cx={pos.x} cy={pos.y} r={cr+2} fill="none" stroke={isH?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.08)"} strokeWidth="1.5"/>}
                <circle cx={pos.x} cy={pos.y} r={cr} fill={`url(#o${i})`} filter="url(#gl)" stroke={isExp?"#d4af37":isH?g.glow:"rgba(255,255,255,0.06)"} strokeWidth={isExp?3:isH?2:0.5} opacity={isD?0.35:1} style={{transition:"all 0.3s"}}/>
                <circle cx={pos.x-4} cy={pos.y-5} r={cr*0.25} fill="white" opacity={isL?0.6:isH?0.35:isD?0.03:0.12}/>
                <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill={isH?(isL?"#FFF":g.glow):isD?"rgba(255,255,255,0.15)":(g.side==="light"?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.4)")} fontSize={isH?"13":"11"} fontFamily="'Cinzel', serif" fontWeight={isH?"700":"600"} letterSpacing="2px" style={{transition:"all 0.3s",textShadow:isH?`0 0 25px ${g.glow}60`:"none"}}>{g.name.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {selectedGod !== null && expandedGod === null && (() => {
        const sg = gods[selectedGod];
        const og = gods[(selectedGod + 6) % 12];
        return (
          <div style={{ animation: "fadeIn 0.3s ease", textAlign: "center", padding: "10px 24px 30px", maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "12px" }}>
              <div>
                <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "18px", fontWeight: 700, color: sg.name === "Light" ? "#FFF" : sg.glow, letterSpacing: "4px", textShadow: `0 0 30px ${sg.glow}40` }}>{sg.name.toUpperCase()}</p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: `${sg.glow}80`, letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>{sg.domain}</p>
              </div>
              <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "14px", color: "rgba(212,175,55,0.35)" }}>&loz;</span>
              <div>
                <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "18px", fontWeight: 700, color: og.name === "Light" ? "#FFF" : og.glow, letterSpacing: "4px", textShadow: `0 0 30px ${og.glow}40` }}>{og.name.toUpperCase()}</p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: `${og.glow}80`, letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>{og.domain}</p>
              </div>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "16px" }}>
              Manifests as <strong style={{color:"rgba(255,255,255,0.6)"}}>{sg.form}</strong> &middot; <strong style={{color:"rgba(255,255,255,0.6)"}}>{sg.temperament}</strong>{sg.trait ? <> &mdash; <strong style={{color:sg.glow}}>{sg.trait}</strong></> : ""}
            </p>
            <button onClick={() => expandToDetail(selectedGod)} style={{
              background: `${sg.glow}10`, border: `1px solid ${sg.glow}30`,
              color: sg.name === "Light" ? "rgba(255,255,255,0.7)" : `${sg.glow}99`,
              fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
              padding: "10px 24px", cursor: "pointer", borderRadius: "2px",
            }}>
              &#10022; Open Codex Entry
            </button>
          </div>
        );
      })()}
      {selectedGod === null && <p style={{ textAlign: "center", fontFamily: "'Cinzel', serif", fontSize: "11px", color: "rgba(255,255,255,0.18)", letterSpacing: "4px", textTransform: "uppercase", padding: "0 20px 30px" }}>Touch a god to reveal their opposition</p>}
      {expandedGod !== null && god && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column",
          animation: "fadeIn 0.3s ease", overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${god.glow}20`, flexShrink: 0, position: "relative" }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
              <button onClick={() => navigateGod(-1)} style={{ background: "none", border: "none", color: prevGod.glow, fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px", cursor: "pointer", padding: "6px 12px", textTransform: "uppercase" }}>
                &larr; {prevGod.name}
              </button>
              <span style={{ color: "rgba(212,175,55,0.2)", fontSize: "10px" }}>&middot;</span>
              <button onClick={() => navigateGod(1)} style={{ background: "none", border: "none", color: nextGod.glow, fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px", cursor: "pointer", padding: "6px 12px", textTransform: "uppercase" }}>
                {nextGod.name} &rarr;
              </button>
            </div>
            <button onClick={() => { setExpandedGod(null); setSelectedGod(null); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "24px", cursor: "pointer", padding: "4px 8px", lineHeight: 1, position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
              &times;
            </button>
          </div>
          <div ref={loreRef} style={{ flex: 1, overflowY: "auto", padding: "20px 24px 40px" }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: god.glow, margin: "0 auto 14px", boxShadow: `0 0 25px ${god.glow}50` }} />
                <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "26px", fontWeight: 900, color: god.name === "Light" ? "#FFF" : god.glow, letterSpacing: "7px", textTransform: "uppercase", marginBottom: "8px", textShadow: `0 0 35px ${god.glow}30` }}>
                  {god.name}
                </h2>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>
                  {god.domain}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
                  Manifests as <strong style={{ color: "rgba(255,255,255,0.6)" }}>{god.form}</strong> &middot; <strong style={{ color: "rgba(255,255,255,0.6)" }}>{god.temperament}</strong>{god.trait ? <> &mdash; <strong style={{ color: god.glow }}>{god.trait}</strong></> : ""}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginBottom: "22px", flexWrap: "wrap" }}>
                {[
                  { key: "personality", label: "Persona" },
                  { key: "lore", label: "Origin" },
                  { key: "balance", label: "States" },
                  { key: "bonds", label: "Bonds" },
                ].map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                    background: activeTab === tab.key ? `${god.glow}18` : "transparent",
                    border: `1px solid ${activeTab === tab.key ? `${god.glow}35` : "rgba(255,255,255,0.1)"}`,
                    color: activeTab === tab.key ? (god.name === "Light" ? "#FFF" : god.glow) : "rgba(255,255,255,0.4)",
                    fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase",
                    padding: "7px 14px", cursor: "pointer", borderRadius: "2px", transition: "all 0.3s",
                  }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              {activeTab === "personality" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                    {[
                      { label: "Form", value: god.form },
                      { label: "Energy", value: god.temperament },
                      { label: "Side", value: god.side === "light" ? "Light Side" : "Dark Side" },
                      { label: "Archetype", value: god.trait || "Neurotypical" },
                    ].map((stat, i) => (
                      <div key={i} style={{ padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px" }}>
                        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>{stat.label}</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: god.name === "Light" ? "rgba(255,255,255,0.85)" : god.glow, fontWeight: 600 }}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "18px", background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${god.glow}30`, borderRadius: "0 4px 4px 0" }}>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: `${god.glow}80`, marginBottom: "10px" }}>Personality</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", lineHeight: "1.85", color: "rgba(255,255,255,0.7)" }}>{god.personality}</p>
                  </div>
                </div>
              )}
              {activeTab === "lore" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", lineHeight: "1.9", color: "rgba(255,255,255,0.7)", fontStyle: "italic", borderLeft: `2px solid ${god.glow}30`, paddingLeft: "18px", marginBottom: "22px" }}>
                    {god.lore.split("\n\n").map((p, i) => <p key={i} style={{ marginBottom: "14px" }}>{p}</p>)}
                  </div>
                  <div style={{ textAlign: "center", padding: "18px", borderTop: "1px solid rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontStyle: "italic", color: god.name === "Light" ? "rgba(255,255,255,0.75)" : god.glow }}>
                      &ldquo;{god.quote}&rdquo;
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "balance" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  {[
                    { label: "In Balance", text: god.balanced, icon: "\u2726", color: god.name === "Light" ? "#FFFFFF" : god.glow },
                    { label: "Overexpressed", text: god.over, icon: "\u25B2", color: "#EF4444" },
                    { label: "Underexpressed", text: god.under, icon: "\u25BC", color: "#6B7280" },
                  ].map((state, i) => (
                    <div key={i} style={{ marginBottom: "16px", padding: "16px 18px", background: `${state.color}08`, borderLeft: `2px solid ${state.color}40`, borderRadius: "0 4px 4px 0" }}>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: state.color, marginBottom: "8px" }}>
                        {state.icon} {state.label}
                      </p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", lineHeight: "1.75", color: "rgba(255,255,255,0.7)" }}>
                        {state.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "bonds" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{ marginBottom: "20px", padding: "16px 18px", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "4px" }}>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: "10px" }}>Sacred Opposition</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                      <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "16px", color: god.name === "Light" ? "#FFF" : god.glow, letterSpacing: "3px" }}>{god.name.toUpperCase()}</span>
                      <span style={{ color: "rgba(212,175,55,0.4)", fontSize: "14px" }}>&harr;</span>
                      <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "16px", color: oppositeGodData.name === "Light" ? "#FFF" : oppositeGodData.glow, letterSpacing: "3px" }}>{oppositeGodData.name.toUpperCase()}</span>
                    </div>
                  </div>
                  {godRels.map((rel, i) => {
                    const cfg = typeConfig[rel.type];
                    const otherGods = rel.gods.filter(n => n !== god.name);
                    return (
                      <div key={i} style={{ marginBottom: "14px", padding: "14px 16px", borderLeft: `2px solid ${cfg.color}40`, background: `${cfg.color}06`, borderRadius: "0 4px 4px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px" }}>{cfg.icon}</span>
                          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: cfg.color, opacity: 0.8 }}>{cfg.label}</span>
                        </div>
                        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "4px", letterSpacing: "1px", fontWeight: 700 }}>
                          {god.name} &amp; {otherGods.join(" & ")}
                        </p>
                        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "1px", fontStyle: "italic" }}>
                          {rel.title}
                        </p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", lineHeight: "1.7", color: "rgba(255,255,255,0.6)" }}>
                          {rel.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{ textAlign: "center", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid rgba(212,175,55,0.06)" }}>
                <button onClick={() => { setExpandedGod(null); setSelectedGod(null); }} style={{
                  background: "none", border: "1px solid rgba(212,175,55,0.15)", color: "rgba(212,175,55,0.4)",
                  fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase",
                  padding: "10px 28px", cursor: "pointer", borderRadius: "2px",
                }}>
                  Return to the Wheel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ textAlign: "center", padding: "30px 24px 40px", borderTop: "1px solid rgba(212,175,55,0.04)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: "rgba(255,255,255,0.12)", maxWidth: "450px", margin: "0 auto", lineHeight: "1.8" }}>
          The wheel turns. The gods endure. None are good. None are evil. They simply are &mdash; and in their eternal dance, everything that ever was and ever will be takes shape.
        </p>
      </div>
    </div>
  );
}
