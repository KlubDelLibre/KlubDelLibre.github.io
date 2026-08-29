(() => {
  const storageKey = "kdl-language-v1";

  const mainEntries = [
    {
      selector: 'meta[name="description"]',
      attrs: { content: "KLUB DEL LIBRE presents an experimental universe based on Conway's Game of Life." },
    },
    {
      selector: 'meta[name="keywords"]',
      attrs: {
        content: "Klub del Libre, book club, Valencia, accelerationism, free software, technopolitics, cyberfeminism, reading, research, collective creation",
      },
    },
    {
      selector: 'meta[property="og:description"]',
      attrs: {
        content: "A book club and collective research and creation laboratory for redirecting the acceleration of our technosocial present.",
      },
    },
    { selector: ".skip-link", text: "Skip to content" },
    { selector: ".site-header", attrs: { "aria-label": "Main header" } },
    { selector: ".site-nav", attrs: { "aria-label": "Sections" } },
    { selector: '.site-nav a[href="#inicio"]', text: "HOME" },
    { selector: '.site-nav a[href="#manifiesto"]', text: "MANIFESTO" },
    { selector: '.site-nav a[href="#en-curso"]', text: "OPEN ENROLMENT!!!!" },
    { selector: '.site-nav a[href="#actividades"]', text: "ACTIVITIES" },
    { selector: '.site-nav a[href="#ciclos"]', text: "PAST CYCLES" },
    { selector: '.site-nav a[href="#publicaciones"]', text: "PUBLICATIONS" },
    { selector: '.site-nav a[href="#curaduria"]', text: "CURATION" },
    { selector: '.site-nav a[href="#contacto"]', text: "CONTACT" },
    { selector: ".nav-partner span", text: "PROYECTO JUBY · LINKTREE" },
    {
      selector: "[data-life-canvas]",
      attrs: { "aria-label": "Interactive Game of Life universe" },
    },
    {
      selector: "[data-neon-toggle]",
      attrs: {
        "aria-label": "Enable dark neon mode",
        title: "Enable dark neon mode",
      },
    },
    {
      selector: "[data-life-toolbar]",
      attrs: { "aria-label": "Universe controls" },
    },
    {
      selector: "[data-life-drag-handle]",
      attrs: { title: "Drag panel" },
    },
    {
      selector: "[data-life-info-button]",
      attrs: { title: "About the Game of Life" },
    },
    {
      selector: "[data-life-minimize]",
      attrs: {
        "aria-label": "Minimise panel",
        title: "Minimise panel",
      },
    },
    {
      selector: "[data-life-info-panel]",
      attrs: { "aria-label": "About the Game of Life" },
    },
    {
      selector: "[data-life-info-panel] p:nth-child(1)",
      text: "The Game of Life was devised in 1970 by British mathematician John Horton Conway. It has no players: it is a cellular automaton in which each cell lives or dies according to the state of its eight neighbours.",
    },
    {
      selector: "[data-life-info-panel] p:nth-child(2)",
      text: "This website faithfully borrows its classic B3/S23 rules. A cell is born with three neighbours, survives with two or three, and disappears in every other case. Minimal rules give rise to stable forms, cycles, moving patterns and structures capable of self-replication.",
    },
    {
      selector: "[data-life-info-panel] p:nth-child(3)",
      text: "This is where its strangeness lies: it suggests that life, depending on how we understand it, could be a succession of organisms replicating and transforming within a universe governed by preset rules. Conway turned a grid into an experiment about the boundaries of our existence and a question that remains open: what is life?",
    },
    {
      selector: ".life-tool-row",
      attrs: { "aria-label": "Drawing tools" },
    },
    {
      selector: '[data-life-tool="pencil"]',
      attrs: { "aria-label": "Draw cells", title: "Draw cells" },
    },
    {
      selector: '[data-life-tool="eraser"]',
      attrs: { "aria-label": "Erase cells", title: "Erase cells" },
    },
    {
      selector: "[data-life-color-trigger]",
      attrs: { "aria-label": "Choose cell colour", title: "Choose cell colour" },
    },
    {
      selector: "[data-life-color-surface]",
      attrs: { "aria-label": "Saturation and brightness" },
    },
    { selector: ".life-hue-control span", text: "HUE" },
    { selector: "[data-life-hue]", attrs: { "aria-label": "Hue" } },
    { selector: ".life-color-value > span", text: "COLOUR" },
    { selector: ".life-select-field > span", text: "SEED" },
    { selector: '[data-life-seed] option[value="invitation"]', text: "INVITATION" },
    { selector: '[data-life-seed] option[value="random"]', text: "NOISE" },
    { selector: '[data-life-seed] option[value="acorn"]', text: "ACORN" },
    { selector: '[data-life-seed] option[value="glider-gun"]', text: "GOSPER GUN" },
    { selector: '[data-life-seed] option[value="pulsar"]', text: "PULSAR" },
    { selector: ".life-field:has([data-life-density]) > span", text: "DENSITY" },
    { selector: ".life-field:has([data-life-speed]) > span", text: "SPEED" },
    { selector: ".life-field:has([data-life-scale]) > span", text: "SCALE" },
    { selector: ".life-toggle:has([data-life-wrap]) span", text: "TORUS" },
    { selector: ".life-toggle:has([data-life-trails]) span", text: "TRAIL" },
    {
      selector: ".life-action-row",
      attrs: { "aria-label": "Simulation controls" },
    },
    {
      selector: '[data-life-action="play"]',
      attrs: { "aria-label": "Start", title: "Start" },
    },
    {
      selector: '[data-life-action="pause"]',
      attrs: { "aria-label": "Pause", title: "Pause" },
    },
    {
      selector: '[data-life-action="step"]',
      attrs: { "aria-label": "Advance one generation", title: "Advance one generation" },
    },
    {
      selector: '[data-life-action="randomize"]',
      attrs: { "aria-label": "Random universe", title: "Random universe" },
    },
    {
      selector: '[data-life-action="reset"]',
      attrs: { "aria-label": "Reset seed", title: "Reset seed" },
    },
    {
      selector: '[data-life-action="clear"]',
      attrs: { "aria-label": "Clear universe", title: "Clear universe" },
    },
    { selector: ".life-population-label", text: "POP" },
    {
      selector: ".hero-wordmark",
      attrs: { alt: "KDL. Reading groups, research and collective creation" },
    },
    {
      selector: ".manifesto-unified",
      attrs: { "aria-label": "Klub del Libre manifesto" },
    },
    {
      selector: ".manifesto-intro > p:nth-child(1)",
      html: '<strong>KLUB DEL LIBRE</strong> is a book club hosted at <a href="https://www.instagram.com/cc.juby_/" target="_blank" rel="noopener noreferrer">Centro Cultural Proyecto Juby</a>, a self-managed space in Valencia\'s La Petxina neighbourhood dedicated to counterculture and communal learning. <strong>KLUB DEL LIBRE</strong> is also a citizen activation initiative. In addition, <strong>KLUB DEL LIBRE</strong> is a collective research and creation laboratory devoted to analysing technosocial phenomena and their political, economic and cultural implications. Finally, <strong>KLUB DEL LIBRE</strong> is a symptom of postmodernity, a response to the future emerging on the horizon for which we want to be prepared.',
    },
    {
      selector: ".manifesto-intro > p:nth-child(2)",
      html: 'This project follows the path opened more than a decade ago by <a href="https://es.wikipedia.org/wiki/Nick_Srnicek" target="_blank" rel="noopener noreferrer">Nick Srnicek</a> and <a href="https://www.versobooks.com/blogs/authors/williams-alex" target="_blank" rel="noopener noreferrer">Alex Williams</a> in their <a class="ref-link" href="https://archive.org/details/accelerate_201809/page/n3/mode/2up" target="_blank" rel="noopener noreferrer"><em>Manifesto for an Accelerationist Politics</em></a> (2013). Many of the ideas condensed in this web manifesto result from connections drawn between their proposals and later developments by other authors. References to these works can be found throughout the text that follows.',
    },
    { selector: ".manifesto-copy > p:nth-of-type(1)", text: "We are witnessing the dawn of a new regime." },
    {
      selector: ".manifesto-copy > p:nth-of-type(2)",
      html: 'Public authorities are paralysed by the present\'s rapid mutability and are abandoning their duty to protect us, outsourcing their most essential functions, including their responsibility to guarantee our <a class="crisis-link" href="https://www.euronews.com/my-europe/2025/05/25/tens-of-thousands-protest-in-madrid-against-healthcare-privatisation?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">healthcare</a>, our <a class="crisis-link" href="https://brokenchalk.org/educational-challenges-in-spain/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">education</a> and our <a class="crisis-link" href="https://www.npr.org/2025/05/05/nx-s1-5387514/palantir-workers-letter-trump" target="_blank" rel="noopener noreferrer">security</a>.',
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(3)",
      text: "Major corporations and technology platforms are progressively entering the resulting vacuum, consolidating themselves as the new empires of the twenty-first century.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(4)",
      text: "The public realm is retreating while the private realm expands; as a result, we are enveloped by technological capital wielding unprecedented power.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(5)",
      text: "Technological developments, automatically captured by the privatisation of the capitalist axiom, are rendered incapable of operating as neutral, free instruments at the service of the majority.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(6)",
      html: 'As legal scholar and geoeconomic strategist <a href="https://www.geoeconomics.fi/jens-hillebrand-pohl/" target="_blank" rel="noopener noreferrer">Dr Jens Hillebrand Pohl</a>, director of the Helsinki Geoeconomics Consortium, argues in his report for 032c, <a class="ref-link" href="https://032c.com/magazine/issue-47-techno-feudalism-summer-2025" target="_blank" rel="noopener noreferrer">Techno-Feudalism: I’m Sorry, But You Do Not Have Enough Coins for Democracy</a>, the liberating potential of technological innovation is reduced, <em>“through control over digital infrastructure, data and algorithms”</em>, to a network of infrastructures serving the accumulation of power and influence by a tiny minority now capable of bending the thoughts and desires of the peoples of the Earth.',
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(7)",
      text: "The tools that could change the world are hoarded and corrupted, devoted exclusively to mass surveillance, ideological manipulation, the infantilisation of life and the commodification of people.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(8)",
      html: 'Artist and technologist <a href="https://mindyseu.com/" target="_blank" rel="noopener noreferrer">Mindy Seu</a>, in her <a class="ref-link" href="https://cyberfeminismindex.com/" target="_blank" rel="noopener noreferrer">Cyberfeminism Index</a> (2023), sums up the present situation so clearly and efficiently that her own words are worth repeating: <em>“[the Cyberfeminism Index] is being operated in a specific context, one in which platform oligopolies reign supreme, surveillance capitalism commodifies us, and techno-dystopia looms. Its existence reflects that reality.”</em>',
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(9)",
      text: "Like Seu's work, the existence of this project also reflects that same situation, one we all share.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(10)",
      text: "And yet, how different might a world be in which technical developments were understood as genuine achievements of humankind as a whole?",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(11)",
      html: 'A world in which technology, as the common heritage of humanity, gave us the key to a door never opened before, leading towards <em>“futures of space exploration, futurist shock and revolutionary potential”</em>.',
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(12)",
      html: 'As Srnicek and Williams wrote, <em>“we still do not know what a modern technosocial body can do”</em>, and the day is yet to come when mastering and overcoming the limits of reality brings about a genuine <em>“change in the very essence of the human”</em>.',
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(13)",
      text: "We must therefore remember that technology belongs to no one and denaturalise it, breaking the bond that keeps it tied to its captors.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(14)",
      text: "We must reclaim its true nature as a neutral medium, a mere tool whose outcomes depend largely on the collective conditions and power relations under which it is used.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(15)",
      text: "What truly matters is who uses technological tools, how they use them and to what ends.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(16)",
      html: 'As <a href="https://edicionesholobionte.com/armen-avanessian/" target="_blank" rel="noopener noreferrer">Armen Avanessian</a> and <a href="https://cajanegraeditora.com.ar/tags/mauro-reis/" target="_blank" rel="noopener noreferrer">Mauro Reis</a> observed in their introduction to the anthology <a class="ref-link" href="https://cajanegraeditora.com.ar/libros/aceleracionismo/" target="_blank" rel="noopener noreferrer">Accelerationism: Strategies for a Transition towards Post-Capitalism</a> (2017), <em>“contemporary acceleration appears ambivalently: as a process inherent to globalisation and technological advance, and as a possible emancipatory praxis.”</em>',
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(17)",
      html: "<strong>Far from being merely a system to demolish, technological infrastructures can act as a lever for transformation, a launch pad towards a future freed from the value system, the structures of control and the limiting pathologies of the late capitalism we inhabit</strong>.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(18)",
      html: "Faced with this situation, KDL focuses on <strong>technopolitical literacy</strong>. We defend the importance of gaining sociotechnical knowledge about the infrastructures of contemporary society so that we can reclaim and subvert them, placing them at the service of cooperation, emancipation and the creation of common futures. Beyond this, we believe in the transformative power of strengthening bonds between people and the communities to which we belong. Only through this collective process can we become less vulnerable to the manipulation, fragmentation and narcissistic exploitation imposed by the contemporary techno-industrial complex, thereby gaining genuine agency over our destiny as a species.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(19)",
      html: "With this mission, KDL understands itself as one more node in the ecology of organisations imagined by Srnicek and Williams over a decade ago. <strong>A network of networks, made up of initiatives operating in unison towards the shared goal of strengthening the distributed collective intelligence needed to redirect the acceleration of the present towards freedom and social justice</strong>. Within that strategic whole, we are one more contribution, with a distinctly cooperative and creative vocation.",
    },
    {
      selector: ".manifesto-copy > p:nth-of-type(20)",
      html: '<strong>ETHOS</strong> — Situated within the sociopolitical and ethical dimension of technological development, we are connected to the principles of freedom and democratisation upheld by the <a class="ref-link" href="https://www.gnu.org/philosophy/free-sw.es.html#mission-statement" target="_blank" rel="noopener noreferrer">Free Software</a> movement, as well as to the practical, collaborative philosophies of DIY (Do It Yourself) and DIWO (Do It With Others).',
    },
    {
      selector: ".manifesto-refrain",
      html: "We want to read and learn.<br>We want to play, explore, reclaim and subvert.<br>We want to help.<br>We want to open our time to cooperation, care and affection.<br>We want to have fun.",
    },
    { selector: "#en-curso h2", text: "Open enrolment 2026/2027" },
    { selector: "#en-curso .title-action a", text: "Propose a cycle" },
    {
      selector: "#en-curso .archive-intro .prose p",
      text: "These cycles are open for the 2026/2027 academic year. You can request a place directly through the call that interests you.",
    },
    { selector: "#en-curso .cycle-register", attrs: { "aria-label": "Cycles currently open for enrolment" } },
    { selector: "#en-curso .cycle-register-row:nth-child(1) h3", text: "Speculative thought" },
    { selector: "#en-curso .cycle-register-row:nth-child(2) h3", text: "Accelerationism and common futures (New Edition)" },
    { selector: "#en-curso .cycle-register-period", text: "Autumn 2026 — Spring 2027" },
    { selector: "#en-curso .cycle-register-action a", text: "Open enrolment" },
    { selector: "#actividades h2", text: "Activities — Encounters and practices beyond reading" },
    { selector: "#actividades .title-action a", text: "Propose an activity" },
    {
      selector: "#actividades .archive-intro .prose p:nth-child(1)",
      text: "Presentations, conversations, workshops, open sessions and collaborations will find their calendar and documentary memory here.",
    },
    {
      selector: "#actividades .archive-intro .prose p:nth-child(2)",
      text: "This section distinguishes forthcoming activities from completed ones, making it easy to take part and return to what happened.",
    },
    { selector: "#actividades .activity-index-list", attrs: { "aria-label": "Forthcoming activities" } },
    {
      selector: "#actividades .archive-card-media",
      attrs: { "aria-label": "View the 1st Conference on Accelerationism and Speculative Thought" },
    },
    { selector: "#actividades .archive-card-media img", attrs: { alt: "Orbital diagram for the conference" } },
    { selector: "#actividades .card-label", text: "Activity 01 · 2–3 October 2026" },
    { selector: "#actividades .archive-card h3", text: "1st Conference on Accelerationism and Speculative Thought" },
    {
      selector: "#actividades .archive-card > p:not(.card-label, .cycle-actions)",
      text: "An urgent laboratory for theoretical inquiry and radical creativity, created to speculate on the contingent futures already operating in our present.",
    },
    { selector: "#actividades .cycle-actions a:nth-child(1)", text: "View conference" },
    { selector: "#actividades .cycle-actions a:nth-child(2)", text: "Submit a proposal" },
    { selector: "#ciclos h2", text: "Past cycles" },
    {
      selector: "#ciclos .archive-intro .prose p",
      text: "Below is a record of the cycles explored by our study groups. Open each one to consult its details.",
    },
    { selector: "#ciclos .cycle-register", attrs: { "aria-label": "Record of KDL cycles" } },
    { selector: "#ciclos .cycle-register-row h3", text: "Inaugural cycle: accelerationism and common futures" },
    { selector: "#ciclos .cycle-register-period", text: "Winter 2025 — Summer 2026" },
    { selector: "#ciclos .cycle-register-action a", text: "View contents" },
    { selector: "#publicaciones h2", text: "Publications" },
    { selector: "#publicaciones .title-action a", text: "Propose a publication" },
    {
      selector: "#publicaciones .archive-intro .prose p:nth-child(1)",
      text: "This archive brings together essays, fiction, videos, conversations, images and pieces created by club members and people close to the project.",
    },
    {
      selector: "#publicaciones .archive-intro .prose p:nth-child(2)",
      text: "Publications may respond to a cycle or open their own lines of inquiry. The collection will grow as a collaborative press and a public memory of the thinking circulating around KDL.",
    },
    { selector: "#publicaciones .publication-index-list", attrs: { "aria-label": "KDL publications" } },
    { selector: "#publicaciones .publication-index-list > li:nth-child(1) img", attrs: { alt: "Cover of KDL's inaugural-cycle zine" } },
    { selector: "#publicaciones .publication-index-list > li:nth-child(1) .card-label", text: "Publication 01 · 2026" },
    { selector: "#publicaciones .publication-index-list > li:nth-child(1) h3", text: "Inaugural cycle zine" },
    {
      selector: "#publicaciones .publication-index-list > li:nth-child(1) .publication-register-description",
      text: "The dossier-zine from the first cycle: a meeting point for texts, references, images, ideas and people.",
    },
    { selector: "#publicaciones .publication-index-list > li:nth-child(2) img", attrs: { alt: "First page of the essay Bodies and minds in the city of things" } },
    { selector: "#publicaciones .publication-index-list > li:nth-child(2) .card-label", text: "Publication 02 · 2026" },
    { selector: "#publicaciones .publication-index-list > li:nth-child(2) h3", text: "Bodies and minds in the city of things" },
    {
      selector: "#publicaciones .publication-index-list > li:nth-child(2) .publication-register-description",
      text: "An essay by Joan Carbonell on the contemporary city, material culture and the opaque infrastructures of consumption.",
    },
    { selector: "#publicaciones .publication-register-action a", text: "Download" },
    { selector: "#curaduria h2", text: "Curation — Connecting ideas, practices and infrastructures" },
    { selector: "#curaduria .title-action a", text: "Open our Are.na" },
    {
      selector: "#curaduria .archive-intro .prose p:nth-child(1)",
      html: "<strong>KLUB DEL LIBRE understands itself as a node within an ecology of organisations, a distributed collective-intelligence network sustained by constant feedback and the heterogeneity it contains.</strong>",
    },
    {
      selector: "#curaduria .archive-intro .prose p:nth-child(2)",
      text: "We understand curation as a practice of shared orientation. We select and connect texts, tools, interventions, infrastructures, initiatives and experiments spanning network culture, technopolitics, free software, artistic research and emerging forms of cooperation.",
    },
    {
      selector: "#curaduria .archive-intro .prose p:nth-child(3)",
      html: 'We use <a href="https://www.are.na/about" target="_blank" rel="noopener noreferrer">Are.na</a> as the public infrastructure for this memory: an independent, advertising-free space where content can be saved, collections called channels can be built, and connections between ideas can emerge without being subjected to the algorithmic chronology of a <span lang="en">feed</span>. Its API and its <span lang="en">open source by default</span> philosophy allow these collections to circulate beyond the platform itself.',
    },
    { selector: "[data-arena-channels]", attrs: { "aria-label": "Curated Are.na channels" } },
    { selector: "[data-arena-status]", text: "Loading channel…" },
    { selector: "#contacto h2", text: "Contact and collaboration — We are open to working together" },
    {
      selector: "#contacto .wide-heading p",
      text: "We welcome literary proposals, artistic disciplines, open and free-culture initiatives, and projects in countercultural experimentation.",
    },
    { selector: '#contacto a[href^="mailto:"] span', text: "Email" },
    {
      selector: ".life-page > .site-footer p",
      html: 'This website is constantly evolving. This version was updated on 31 July 2026; you can also <a href="archive/2025-10-27/">view the previous version from 27 October 2025</a>. All its content is protected under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International licence</a>. You do not need permission to use its content, but please remember to give appropriate credit to its authors.',
    },
  ];

  const jornadasEntries = [
    {
      selector: 'meta[name="description"]',
      attrs: {
        content: "Programme for the 1st Conference on Accelerationism and Speculative Thought organised by KLUB DEL LIBRE, 2 and 3 October 2026.",
      },
    },
    { selector: "title", text: "1st Conference on Accelerationism and Speculative Thought — KLUB DEL LIBRE" },
    { selector: ".skip-link", text: "Skip to content" },
    { selector: ".jornadas-kicker", text: "ACTIVITY 01 · 2–3 OCTOBER 2026" },
    { selector: ".jornadas-title", text: "1ST CONFERENCE ON ACCELERATIONISM AND SPECULATIVE THOUGHT" },
    {
      selector: ".jornadas-meta",
      html: "2–3 OCTOBER 2026<br>UNIVERSITAT DE VALÈNCIA · CENTRO CULTURAL PROYECTO JUBY",
    },
    {
      selector: ".jornadas-lead p:nth-child(1)",
      text: "The conference emerges as an urgent laboratory for theoretical inquiry: a space for radical creativity designed to speculate on the contingent futures already operating in our present.",
    },
    {
      selector: ".jornadas-lead p:nth-child(2)",
      text: "Its aim is to move beyond the formal constraints of academicism and make room for nomadic, dispersed and avant-garde thinking from every field of knowledge.",
    },
    { selector: ".jornadas-actions a:nth-child(1)", text: "Submit a proposal" },
    { selector: ".jornadas-actions a:nth-child(2)", text: "Proyecto Juby" },
    { selector: ".jornadas-program h2", text: "SCHEDULED TALKS" },
    {
      selector: ".jornadas-program-intro",
      text: "FRIDAY 2 OCTOBER · 17:00–21:00 · FACULTAT DE FILOSOFIA I CIÈNCIES DE L’EDUCACIÓ · SALÓN DE GRADOS",
    },
    { selector: ".jornadas-talks li:nth-child(1) .talk-title", text: "Intelligence, spirit and anonymity: pedagogical implications" },
    { selector: ".jornadas-talks li:nth-child(2) .talk-title", html: "Presentation of the book <em>Homo Noumenon</em>" },
    { selector: ".jornadas-talks li:nth-child(3) .talk-title", text: "Ascetic accelerationism" },
    { selector: ".jornadas-talks li:nth-child(4) .talk-title", text: "Acceleration movement for a lost cause" },
    { selector: ".jornadas-talks li:nth-child(5) .talk-title", text: "Robotina will be a whore too" },
    { selector: ".jornadas-talks li:nth-child(6) .talk-title", text: "Manifesto for a disintegrationist aesthetics" },
    {
      selector: ".jornadas-saturday p:nth-child(1)",
      html: "<strong>SATURDAY 3 OCTOBER · 10:00–13:00 · CENTRO CULTURAL PROYECTO JUBY</strong><br>Presentation of the proposals received and an open mic for anyone who wishes to take part, with no formal, academic or structural requirements.",
    },
    {
      selector: ".jornadas-saturday p:nth-child(2)",
      html: "<strong>SATURDAY 3 OCTOBER · 18:00–22:00 · CLOSING SESSION</strong><br>Because speculative thought cannot be separated from sensitive, embodied experience, the conference closes by crossing the line between theory and flesh through bodily dispersion and sonic excess: an afternoon session with DJ set and performance.",
    },
    { selector: ".jornadas-partners", attrs: { "aria-label": "Collaborating institutions" } },
    { selector: ".jornadas-partners a:nth-child(1)", attrs: { "aria-label": "Universitat de València" } },
    { selector: ".jornadas-partners a:nth-child(2)", attrs: { "aria-label": "Centro Cultural Proyecto Juby" } },
    {
      selector: ".jornadas-footer .footer-copy",
      html: 'This website is constantly evolving. This version was updated on 31 July 2026; you can also <a href="../../archive/2025-10-27/">view the previous version from 27 October 2025</a>. All its content is protected under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International licence</a>. You do not need permission to use its content, but please remember to give appropriate credit to its authors.',
    },
    { selector: ".jornadas-back", text: "← Back to KDL activities" },
  ];

  const dynamicEnglish = {
    "neon.enable": "Enable dark neon mode",
    "neon.disable": "Disable dark neon mode",
    "neon.return": "Return to light mode",
    "life.minimise": "Minimise panel",
    "life.expand": "Expand panel",
    "arena.untitled": "Untitled archive item",
    "arena.file": "File",
    "arena.link": "Link",
    "arena.block": "Block",
    "arena.open": "Open in Are.na",
    "arena.unavailable": "This channel is currently unavailable. You can open it from its title.",
  };

  const pageEntries = {
    main: mainEntries,
    jornadas: jornadasEntries,
  };

  const page = document.body.dataset.page || "main";
  const entries = pageEntries[page] || [];
  const records = [];
  let currentLanguage = "es";

  entries.forEach((entry) => {
    document.querySelectorAll(entry.selector).forEach((element) => {
      const originalAttributes = {};
      Object.keys(entry.attrs || {}).forEach((name) => {
        originalAttributes[name] = element.getAttribute(name);
      });

      records.push({
        element,
        entry,
        originalText: element.textContent,
        originalHtml: element.innerHTML,
        originalAttributes,
      });
    });
  });

  const translate = (key, spanishFallback = "") => {
    if (currentLanguage !== "en") return spanishFallback;
    return dynamicEnglish[key] || spanishFallback;
  };

  const applyLanguage = (language, remember = true) => {
    currentLanguage = language === "en" ? "en" : "es";
    document.documentElement.lang = currentLanguage;
    document.body.classList.toggle("is-english", currentLanguage === "en");

    records.forEach(({ element, entry, originalText, originalHtml, originalAttributes }) => {
      if (currentLanguage === "en") {
        if (Object.hasOwn(entry, "html")) element.innerHTML = entry.html;
        else if (Object.hasOwn(entry, "text")) element.textContent = entry.text;

        Object.entries(entry.attrs || {}).forEach(([name, value]) => {
          element.setAttribute(name, value);
        });
      } else {
        if (Object.hasOwn(entry, "html")) element.innerHTML = originalHtml;
        else if (Object.hasOwn(entry, "text")) element.textContent = originalText;

        Object.entries(originalAttributes).forEach(([name, value]) => {
          if (value === null) element.removeAttribute(name);
          else element.setAttribute(name, value);
        });
      }
    });

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      const englishActive = currentLanguage === "en";
      button.textContent = englishActive ? "[ESPAÑOL]" : "[ENGLISH]";
      button.setAttribute(
        "aria-label",
        englishActive ? "Cambiar la web a español" : "Switch the website to English",
      );
      button.setAttribute("aria-pressed", String(englishActive));
    });

    if (remember) {
      try {
        window.localStorage.setItem(storageKey, currentLanguage);
      } catch {
        // Language switching still works when storage is unavailable.
      }
    }

    window.dispatchEvent(
      new CustomEvent("kdl:languagechange", { detail: { language: currentLanguage } }),
    );
  };

  window.KDLI18n = {
    get language() {
      return currentLanguage;
    },
    setLanguage: applyLanguage,
    t: translate,
  };

  let savedLanguage = "es";
  try {
    savedLanguage = window.localStorage.getItem(storageKey) || "es";
  } catch {
    savedLanguage = "es";
  }

  applyLanguage(savedLanguage, false);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(currentLanguage === "en" ? "es" : "en");
    });
  });
})();
