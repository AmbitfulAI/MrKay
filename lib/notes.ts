export interface Note {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: "headshot" | "exec" | "facecard" | "upperbody";
  body: string[];
}

export const notes: Note[] = [
  {
    slug: "the-cost-of-unclear-leadership",
    date: "May 2026",
    category: "Leadership",
    title: "The Cost of Unclear Leadership",
    excerpt:
      "When executives avoid defining what they stand for, organisations fill the vacuum — rarely well. Clarity of position is not a luxury. It is the precondition for everything else.",
    image: "exec",
    body: [
      "There is a particular kind of damage that unclear leadership does — not dramatic, not sudden, but cumulative and, in the end, very expensive. It happens when the person at the top of an organisation has not decided what they actually stand for.",
      "I have sat across from enough CEOs to know that this ambiguity is rarely accidental. It is usually protective. If you do not define your position, you cannot be held to it. If you do not commit to a direction, you cannot be accused of choosing the wrong one. The logic is understandable. The cost is significant.",
      "When leadership is unclear, organisations make up the difference. Teams interpret the gap. Cultures form around assumptions rather than intentions. The most capable people — the ones with the clearest sense of their own values — begin to leave, because they cannot anchor their work to anything they understand.",
      "Clarity is not rigidity. A leader who knows what they stand for can still adapt, still listen, still be surprised. But they do so from a defined centre — and that centre is what everything else in the organisation orients around.",
      "The work I find most urgent, in almost every engagement, is helping leaders get honest about what they actually believe. Not what they think they should believe. Not what the board wants to hear. What they genuinely hold to be true about their organisation, their people, and the direction they are responsible for.",
      "That clarity — once found — changes everything. Not overnight. But durably.",
    ],
  },
  {
    slug: "governance-is-not-compliance",
    date: "April 2026",
    category: "Board Work",
    title: "Governance Is Not Compliance",
    excerpt:
      "Too many boards conflate the two. Compliance is a floor, not a ceiling. The boards that navigate genuine complexity are those that treat governance as a thinking discipline, not an audit exercise.",
    body: [
      "Every board I have worked with knows how to comply. They complete the checklists. They file what needs to be filed. They read the reports that are put in front of them and ask the questions they are expected to ask. This is compliance — and it is necessary, but it is not governance.",
      "Governance, properly understood, is a thinking discipline. It asks not just whether the organisation is within the rules, but whether it is heading in the right direction, whether the risks it is carrying are the risks it intends to carry, and whether the people leading it are the right people for where it needs to go.",
      "The boards that perform this function well share a few characteristics. They ask uncomfortable questions even when the answers will be inconvenient. They distinguish between their role — oversight and strategic stewardship — and management's role. And they have built, over time, a level of trust with the executive team that allows for honest exchange without tipping into micromanagement.",
      "That trust is harder to build than any governance framework. It requires chair leadership of real quality, board members who are genuinely engaged rather than collecting a directorship, and a CEO who understands that a strong board is an asset and not a threat.",
      "I have seen what happens when boards confuse compliance for governance. The company looks fine on paper right up until it doesn't. The warning signs were there — they just weren't the kind of thing the checklist captured.",
    ],
  },
  {
    slug: "succession-the-conversation-nobody-wants",
    date: "March 2026",
    category: "Strategy",
    title: "Succession: The Conversation Nobody Wants",
    excerpt:
      "Organisations that plan for succession only when forced to are organisations that have already lost. The real work — identifying, developing, and preparing successors — happens years before the transition.",
    body: [
      "I have never met a leader who genuinely looked forward to succession planning. Most treat it the way people treat estate planning — something that obviously needs to be done, that they keep finding reasons to defer.",
      "The deferral is understandable at a psychological level. Planning for your successor means confronting your own finitude in a role, and for leaders who have anchored their identity strongly to that role, this is not a comfortable exercise. But organisations pay for that discomfort in real and measurable ways.",
      "The transitions that go badly — the ones that result in talent departure, shareholder concern, or cultural fracture — almost always involve organisations that treated succession as a crisis to be managed rather than a process to be designed. They had not identified candidates. They had not developed them. They had not had the honest conversations with the board about what kind of leader the next chapter actually required.",
      "Good succession work is, at its core, an act of generosity toward the organisation. It says: I care enough about this place to ensure it survives and grows after I am no longer the one responsible for it.",
      "The leaders I have seen handle this well tend to share a quality that I can only describe as a kind of freedom — a settled enough sense of their own contribution that they can genuinely focus on what comes next, rather than protecting what is current.",
      "That freedom is worth pursuing. The organisation that inherits it will remember them well.",
    ],
  },
  {
    slug: "what-media-ready-actually-means",
    date: "February 2026",
    category: "Media & Speaking",
    title: "What 'Media Ready' Actually Means",
    excerpt:
      "It is not polish. It is not a set of rehearsed answers. It is knowing what you believe, why you believe it, and how to hold that position under pressure — in any room, with any audience.",
    image: "upperbody",
    body: [
      "Media training, in its conventional form, produces a particular kind of executive: smooth, cautious, and entirely forgettable. They have learned to stay on message. They have practised bridging techniques. They know how to run out the clock on a hostile question without appearing to. And audiences, who have spent their entire lives listening to people, know immediately.",
      "What audiences respond to — what actually moves them, reassures them, or persuades them — is belief. Not confidence in the performative sense, but the unmistakable quality of a person who knows what they think and is willing to say it.",
      "The media-ready executive I work toward developing is not one who has memorised talking points. It is one who has done the harder prior work: getting clear on what they actually believe about their organisation, their strategy, and the role they are asking people to trust them in.",
      "When that clarity is present, the preparation is different. We are not managing risk so much as we are sharpening expression. The answers under pressure are consistent not because they have been drilled but because they flow from a settled view.",
      "The camera does not lie. Neither does a live audience of five hundred. Both reward the same thing: a point of view worth having, held by someone who means it.",
    ],
  },
  {
    slug: "the-difference-between-authority-and-position",
    date: "January 2026",
    category: "Leadership",
    title: "The Difference Between Authority and Position",
    excerpt:
      "Position is granted. Authority is earned — through consistency, competence, and the willingness to make decisions others defer. The executives who last understand this distinction early.",
    body: [
      "The title arrives on a specific day. The authority — the real kind, the kind that makes people follow you into difficult terrain — takes considerably longer, and cannot be conferred by anyone.",
      "I have worked with leaders who held significant positions but wielded almost no authority. Their reports did what was required and not a step more. Their peers listened politely and then did what they had already decided to do. Their boards received their presentations and formed their own conclusions. The position was intact. The authority was absent.",
      "Authority is built through a pattern of behaviour over time. It accumulates through the decisions a leader makes when the pressure is highest and the right answer is least obvious. It accumulates through the consistency between what a leader says in the boardroom and what they say in the corridor. It accumulates — and this is the part leaders most often underestimate — through what a leader is willing not to do: the credit they decline to take, the decisions they give away, the acknowledgement they extend to others' contributions.",
      "The leaders I have seen build genuine authority tend to be curious rather than certain, direct rather than careful, and interested in the people around them in a way that reads as entirely genuine — because it is.",
      "Position can be lost overnight. Authority, once built, is remarkably durable. I have seen leaders transition out of senior roles and retain the trust and engagement of the people they led for years afterward. That is not a function of what their title said. It is a function of how they occupied it.",
    ],
  },
  {
    slug: "what-the-psalms-taught-me-about-pressure",
    date: "December 2025",
    category: "Faith & Life",
    image: "facecard",
    title: "What the Psalms Taught Me About Pressure",
    excerpt:
      "I have read the Psalms at every difficult point in my career. They have never given me easy answers. What they have given me is permission to be honest — and a reminder that I was not the first to sit in the dark wondering what comes next.",
    body: [
      "There is a board meeting I think of sometimes. Contentious shareholder. Fragile management team. A chair who had run out of answers. I was in the room as an advisor, and I remember sitting very still while the conversation deteriorated, thinking: I have nothing useful to add right now.",
      "Later that evening I read Psalm 46. Not for the first time. I have read it dozens of times. \"God is our refuge and strength, a very present help in trouble. Therefore we will not fear, though the earth gives way.\" I have read those words in hotel rooms across four continents. They have never solved a specific problem. They have always done something more important — reoriented me.",
      "The Psalms are remarkable documents to bring to professional life, because they are relentlessly honest about the experience of being overwhelmed. David — who was, by any measure, a significant leader operating under extraordinary pressure — does not pretend. He laments. He pleads. He argues with God. He admits confusion. And then, somewhere in the movement of the poem, something shifts.",
      "I have tried to carry that pattern into the way I advise. Not the theology — that is personal and I do not impose it — but the honesty. The willingness to say: I do not know yet. The discipline of sitting with complexity before reaching for a solution.",
      "Faith has not made me a more comfortable advisor. I think it has made me a more honest one. And in my experience, honest counsel, carefully given, is the only kind that actually helps.",
    ],
  },
  {
    slug: "on-stillness-a-note-to-myself",
    date: "November 2025",
    category: "Faith & Life",
    image: "headshot",
    title: "On Stillness: A Note to Myself",
    excerpt:
      "Every important decision I have made well was made from a place of stillness. Every decision I regret was made in a hurry. I keep relearning this.",
    body: [
      "I wrote this for myself, which is why I am sharing it. The things I need to remember tend to be the things I am most tempted to forget.",
      "I am not naturally still. I am wired for activity — for analysis, for conversation, for the particular satisfaction of a problem defined and engaged with. Stillness, for me, has always been a discipline rather than an instinct. It does not arrive naturally. It has to be chosen, and choosing it has to happen before the pressure arrives, because once the pressure arrives, the instinct for motion takes over.",
      "What I know, from watching myself over thirty years of professional life, is this: every important decision I have made well was made from a place of stillness. Not paralysis — I am not talking about delay. I am talking about the quality of attention that comes from having quieted the noise before engaging the question.",
      "My faith has a great deal to say about this. \"Be still, and know that I am God.\" Psalm 46:10 — the same psalm I always return to. The instruction is not passive. It is an act of will: be still. Choose it. Create the conditions for it.",
      "In practical terms, for me, this means mornings before anything else. It means prayer that is more listening than asking. It means, before a significant engagement, sitting with the question rather than immediately reaching for the answer.",
      "I do not always manage it. But when I do, the quality of what follows — the counsel, the questions, the presence I bring to the room — is different. I know the difference. My clients feel it, even if they cannot name it.",
      "This is a note to myself: slow down first. Everything else follows from that.",
    ],
  },
  {
    slug: "a-letter-i-never-sent",
    date: "October 2025",
    category: "Creative",
    title: "A Letter I Never Sent",
    excerpt:
      "To the version of me who thought that getting the title was the same thing as earning the right to lead. It was not. Here is what I wish someone had said earlier.",
    body: [
      "I have been meaning to write this for a while.",
      "To the version of me who arrived at his first significant leadership role and promptly confused the appointment with the authority — I want to tell you something gently: the people in that room the day you walked in had already decided how much of themselves they were going to give you. You had not earned their trust yet. The title did not do that for you.",
      "I want to tell you that the instinct to establish yourself quickly, to demonstrate capability, to remove any doubt about whether you deserved the role — that instinct, though understandable, was expensive. It cost you relationships that would have made the work better. It cost you information that only comes to leaders people trust.",
      "I want to tell you that the colleague you dismissed in your third month because his ideas moved too slowly — he was right about three things you subsequently got wrong. You would have known that, if you had been more interested in what he knew than in confirming what you already believed.",
      "I want to tell you that the loneliness of leadership at that level is real, and that the correct response to it is not to pretend it isn't there. Find your people — the ones who will tell you the truth, who will sit with you in the uncertainty, who will pray with you when the situation calls for it and argue with you when you need the challenge.",
      "I also want to tell you that you will get better. That the capacity for honest self-examination you eventually develop will become the most valuable thing you bring to any room. That the leaders who will trust you most deeply will do so precisely because they sense that you have been through something — and that you know what it costs.",
      "It costs a lot. It was worth it.",
    ],
  },
];

export const categories = [
  "All",
  "Leadership",
  "Board Work",
  "Strategy",
  "Media & Speaking",
  "Faith & Life",
  "Creative",
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export function getRelatedNotes(slug: string, count = 3): Note[] {
  const current = getNoteBySlug(slug);
  if (!current) return [];
  const same = notes.filter((n) => n.slug !== slug && n.category === current.category);
  const others = notes.filter((n) => n.slug !== slug && n.category !== current.category);
  return [...same, ...others].slice(0, count);
}
