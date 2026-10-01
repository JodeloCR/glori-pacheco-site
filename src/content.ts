export type Language = "es" | "en";

export const artistLinks = {
  spotify: "https://open.spotify.com/artist/2Ny1WFS3B1IgnIvmNxntrK",
  spotifyEmbed: "https://open.spotify.com/embed/artist/2Ny1WFS3B1IgnIvmNxntrK?utm_source=generator&theme=0",
  instagram: "https://www.instagram.com/glorianapacheco/",
  youtube: "https://www.youtube.com/playlist?list=PLQJA9fV5BXGcwKxntNT2aYZIUaB-5Q9wc",
  youtubeChannel: "https://www.youtube.com/@gloripacheco/videos",
  canteria: "https://www.youtube.com/playlist?list=PLBLhSCmwkacs",
  linktree: "https://linktr.ee/GloriPacheco",
  photos: "https://drive.google.com/drive/folders/1JD2HNNjEh9AAA-8XNj6xCxqSvmT6DBzr?usp=drive_link",
  email: "mailto:glorypacheco@gmail.com",
  phone: "tel:+50686284449",
  epk: {
    es: "/press/Glori-Pacheco-EPK-ES.pdf",
    en: "/press/Glori-Pacheco-EPK-EN.pdf",
  },
};

export type VisualStory = {
  number: string;
  image: string;
  title: Record<Language, string>;
  caption: Record<Language, string>;
  href?: string;
  overlay?: "compositions";
};

export const visualStories: readonly VisualStory[] = [
  {
    number: "01",
    image: "/images/portrait-journal.webp",
    title: { es: "Universo visual de Capituloves", en: "Capituloves visual universe" },
    caption: { es: "Narrativa, color y dirección artística.", en: "Storytelling, color, and art direction." },
    href: "https://www.youtube.com/playlist?list=PLQJA9fV5BXGfCA28Q8f-7SoAeOQx4vSZj",
  },
  {
    number: "02",
    image: "/images/live-stage.webp",
    title: { es: "Festivales", en: "Festivals" },
    caption: { es: "Canciones llevadas a escena.", en: "Songs brought to the stage." },
    href: "https://www.youtube.com/playlist?list=PLQJA9fV5BXGcwKxntNT2aYZIUaB-5Q9wc",
  },
  {
    number: "03",
    image: "/images/camm-session.webp",
    title: { es: "Composiciones", en: "Songwriting" },
    caption: { es: "Salas de composición y colaboración.", en: "Writing rooms and collaboration." },
    overlay: "compositions",
  },
];

export const chapters = [
  {
    number: "01",
    title: "Fuckboy",
    credit: "con Chris Neil",
    image: "/images/chapter-01-fuckboy.webp",
    href: "https://open.spotify.com/intl-es/track/0jBbd1MvFzj5fPqVevTbYO",
  },
  {
    number: "02",
    title: "Tóxico",
    credit: "con Maul On The Mix",
    image: "/images/chapter-02-toxico.webp",
    href: "https://open.spotify.com/album/4WOlfCMmnJy3FjAXcDD7Iv",
  },
  {
    number: "03",
    title: "Perdón",
    credit: "",
    image: "/images/chapter-03-perdon.webp",
    href: "https://open.spotify.com/album/4EZMeuGnrbnHpnP988bFhf",
  },
  {
    number: "04",
    title: "Todo Menos Amigos",
    credit: "",
    image: "/images/chapter-04-todo-menos-amigos.webp",
    href: "https://open.spotify.com/album/2INxW1x4kofBJGCYeRT2ZF",
  },
  {
    number: "05",
    title: "Bang Bang",
    credit: "",
    image: "/images/chapter-05-bang-bang.webp",
    href: "https://open.spotify.com/album/5JMYjqGB4VuxUA477AahaN",
  },
  {
    number: "06",
    title: "Quiero Llorar Todo el Tiempo",
    credit: "",
    image: "/images/chapter-06-quiero-llorar.webp",
    href: "https://open.spotify.com/album/5nY7pvqvmWpOzTgyWGab1K",
  },
  {
    number: "07",
    title: "No Me Arrepiento de Nada",
    credit: "",
    image: "/images/chapter-07-no-me-arrepiento.webp",
    href: "https://open.spotify.com/album/73XY2JFO3bMkrPlnb1n7ek",
  },
  {
    number: "08",
    title: "Mejor Sola Que Mal Acompañada",
    credit: "",
    image: "/images/chapter-08-mejor-sola.webp",
    href: "https://open.spotify.com/intl-es/track/2SNHZo6r6j1z7cxQmYtTRi",
  },
] as const;

export const pressLinks = [
  {
    source: "Teletica",
    title: {
      es: "Le escribió una canción a cada ex y las convirtió en su álbum debut",
      en: "She wrote a song for every ex and turned them into her debut album",
    },
    href: "https://www.teletica.com/entretenimiento/le-escribio-una-cancion-a-cada-ex-y-las-convirtio-en-su-album-debut-conozca-a-gloriana-pacheco_380073",
  },
  {
    source: "Al Borde del Tiempo",
    title: {
      es: "Glori Pacheco vuelve a la carga sola y sin malas compañías",
      en: "Glori Pacheco returns on her own terms",
    },
    href: "https://albordedeltiempo.com.ar/2025/01/21/glori-pacheco-vuelve-a-la-carga-sola-y-sin-malas-companias/",
  },
  {
    source: "La Caverna",
    title: {
      es: "Quiero Llorar Todo el Tiempo captura el desamor",
      en: "Quiero Llorar Todo el Tiempo captures heartbreak",
    },
    href: "https://lacaverna.net/quiero-llorar-todo-el-tiempo-el-sencillo-de-glori-pacheco-que-captura-el-desamor/",
  },
] as const;

export const canteriaGallery = [
  {
    src: "/images/canteria-london-room.webp",
    alt: {
      es: "Glori Pacheco y su banda en el escenario de London Room bajo la marquesina de bombillos",
      en: "Glori Pacheco and her band on the London Room stage under the bulb marquee",
    },
  },
  {
    src: "/images/canteria-live.webp",
    alt: {
      es: "Glori Pacheco cantando bajo luz azul durante la Cantería Live Session",
      en: "Glori Pacheco singing under blue light during the Cantería Live Session",
    },
  },
  {
    src: "/images/canteria-cohorte.webp",
    alt: {
      es: "Artistas de la cohorte fundacional de Cantería Music con el público al cierre del microfestival",
      en: "Artists from Cantería Music's founding cohort with the audience at the end of the micro-festival",
    },
  },
] as const;

export const canteria = {
  es: {
    kicker: "CANTERÍA LIVE SESSIONS",
    title: "Siete artistas en London Room.",
    meta: "Junio 2026 · San José, Costa Rica",
    body: [
      "En junio de 2026, Glori formó parte de la primera edición de Cantería Live Sessions, un microfestival que presentó en vivo a siete artistas emergentes de la cohorte fundacional de Cantería Music.",
      "La presentación le permitió llevar su propuesta original a un formato de show en vivo, fortalecer su experiencia escénica y generar material audiovisual profesional para la proyección de su carrera.",
    ],
    stats: [
      ["1.ª", "edición del microfestival"],
      ["7", "artistas emergentes"],
    ],
    credits: "London Room · Coproducido con Nueva Ola · Con el respaldo de ACAM y AIE",
    cta: "Ver las Live Sessions",
  },
  en: {
    kicker: "CANTERÍA LIVE SESSIONS",
    title: "Seven artists at London Room.",
    meta: "June 2026 · San José, Costa Rica",
    body: [
      "In June 2026, Glori took part in the inaugural edition of Cantería Live Sessions, a micro-festival featuring seven emerging artists from Cantería Music's founding cohort.",
      "The performance gave her the chance to bring her original project to a live setting, strengthen her stage experience, and generate professional audiovisual material to support the next stage of her career.",
    ],
    stats: [
      ["1st", "edition of the micro-festival"],
      ["7", "emerging artists"],
    ],
    credits: "London Room · Co-produced with Nueva Ola · Supported by ACAM and AIE",
    cta: "Watch the Live Sessions",
  },
} as const;

export const compositionGalleries = {
  camm: [
    {
      src: "/images/camm-session.webp",
      alt: {
        es: "Glori Pacheco revisando una sesión en la computadora junto a una mentora del camp",
        en: "Glori Pacheco reviewing a session on the computer with a camp mentor",
      },
    },
    {
      src: "/images/camm-team.webp",
      alt: {
        es: "Glori Pacheco con el equipo de composición en el estudio del camp",
        en: "Glori Pacheco with her writing team at the camp studio",
      },
    },
  ],
  autoras: [
    {
      src: "/images/autoras-grupo.webp",
      alt: {
        es: "Compositoras de CO-LAB de Autoras reunidas en el estudio",
        en: "CO-LAB de Autoras songwriters gathered in the studio",
      },
    },
    {
      src: "/images/autoras-taller.webp",
      alt: {
        es: "Sesión de CO-LAB de Autoras con las participantes tomando notas",
        en: "CO-LAB de Autoras session with participants taking notes",
      },
    },
    {
      src: "/images/autoras-porque.webp",
      alt: {
        es: "Pieza gráfica del programa: ¿Por qué entraste a Autoras Colab?",
        en: "Program graphic: why did you join Autoras Colab?",
      },
    },
    {
      src: "/images/autoras-fondo.webp",
      alt: {
        es: "Crédito del Ministerio de Cultura y Juventud y el Fondo Puntos de Cultura 2026",
        en: "Credit for the Ministry of Culture and Youth and the Puntos de Cultura 2026 fund",
      },
    },
  ],
} as const;

export const compositions = {
  es: {
    kicker: "COMPOSICIÓN",
    title: "Dónde aprendió a componer.",
    lead: "Capituloves nació de un diario, pero el oficio se afina en sala. Estos son los programas y campamentos donde Glori escribe junto a otras personas.",
    close: "Todo eso vuelve a las canciones.",
    closeCta: "Escuchar Capituloves",
    blocks: [
      {
        tag: "CAMM 2026 · SONY MUSIC PUBLISHING",
        heading: "Songwriting camp en Ciudad de Panamá",
        meta: "Agosto 2026",
        gallery: "camm",
        body: [
          "En agosto de 2026 Glori fue seleccionada para participar en un songwriting camp de Sony Music Publishing en Panamá, donde trabajó en una sesión de composición colaborativa junto a artistas y productores de la región, fortaleciendo su experiencia en procesos creativos bajo dinámicas profesionales de la industria musical latinoamericana.",
          "El camp formó parte del Centroamérica Mercado Musical (CAMM), el encuentro más grande de la industria musical de la región, que en su tercera edición reunió en Ciudad de Panamá a más de 800 asistentes y 89 artistas centroamericanos invitados.",
        ],
        stats: [
          ["3.ª", "edición del CAMM"],
          ["800+", "asistentes"],
          ["89", "artistas invitados"],
          ["60+", "compositores y productores"],
        ],
      },
      {
        tag: "CO-LAB DE AUTORAS 2026",
        heading: "Programa intensivo de composición",
        meta: "Seis meses · We Could Be Music",
        gallery: "autoras",
        body: [
          "Glori fue seleccionada para formar parte de CO-LAB de Autoras 2026, un programa intensivo de seis meses desarrollado por We Could Be Music con el apoyo del Fondo Puntos de Cultura 2026 del Ministerio de Cultura y Juventud de Costa Rica.",
          "La iniciativa reúne a 15 compositoras seleccionadas entre más de 100 postulantes, y está enfocada en songwriting, topline, construcción de hooks, composición colaborativa, desarrollo de demos y dinámicas profesionales de coautoría.",
        ],
        stats: [
          ["6", "meses de programa"],
          ["15", "compositoras"],
          ["100+", "postulantes"],
        ],
      },
      {
        tag: "WE MAKE NOISE",
        heading: "Formación en producción musical",
        meta: "2026",
        gallery: null,
        body: [
          "Ese mismo año resultó ganadora de un programa de formación en producción musical de We Make Noise, ampliando sus herramientas creativas y técnicas para comprender y participar de manera más activa en el desarrollo sonoro de sus propias canciones.",
        ],
        stats: [],
      },
    ],
  },
  en: {
    kicker: "SONGWRITING",
    title: "Where she learned to write.",
    lead: "Capituloves started in a journal, but the craft gets sharpened in the room. These are the programs and camps where Glori writes alongside other people.",
    close: "All of it finds its way back into the songs.",
    closeCta: "Listen to Capituloves",
    blocks: [
      {
        tag: "CAMM 2026 · SONY MUSIC PUBLISHING",
        heading: "Songwriting camp in Panama City",
        meta: "August 2026",
        gallery: "camm",
        body: [
          "In August 2026 Glori was selected to take part in a Sony Music Publishing songwriting camp in Panama, where she joined a collaborative writing session alongside artists and producers from across the region, strengthening her experience in creative processes within the professional dynamics of the Latin American music industry.",
          "The camp was part of Centroamérica Mercado Musical (CAMM), the largest music industry gathering in the region, whose third edition brought more than 800 attendees and 89 invited Central American artists to Panama City.",
        ],
        stats: [
          ["3rd", "CAMM edition"],
          ["800+", "attendees"],
          ["89", "invited artists"],
          ["60+", "writers and producers"],
        ],
      },
      {
        tag: "CO-LAB DE AUTORAS 2026",
        heading: "Six-month songwriting intensive",
        meta: "Six months · We Could Be Music",
        gallery: "autoras",
        body: [
          "Glori was selected to take part in CO-LAB de Autoras 2026, a six-month intensive program developed by We Could Be Music with support from the 2026 Puntos de Cultura Fund of Costa Rica's Ministry of Culture and Youth.",
          "The initiative brings together 15 songwriters selected from more than 100 applicants, and focuses on songwriting, toplining, hook development, collaborative writing, demo creation, and professional co-writing practices.",
        ],
        stats: [
          ["6", "months"],
          ["15", "songwriters"],
          ["100+", "applicants"],
        ],
      },
      {
        tag: "WE MAKE NOISE",
        heading: "Music production training",
        meta: "2026",
        gallery: null,
        body: [
          "That same year she was selected as a winner of a music production training program by We Make Noise, expanding her creative and technical skills so she can take a more active role in shaping the sonic development of her own songs.",
        ],
        stats: [],
      },
    ],
  },
} as const;

export const copy = {
  es: {
    nav: [
      ["Inicio", "#top"],
      ["Música", "#music"],
      ["Sobre Glori", "#about"],
      ["Videos / Visuales", "#visuals"],
      ["Prensa / EPK", "#press"],
      ["Shows", "#shows"],
      ["Cantería", "#canteria"],
      ["Contacto", "#contact"],
    ],
    socialLead: "ESCUCHA · SIGUE",
    heroEyebrow: "CANTAUTORA POP · COSTA RICA",
    heroIntro: "Pop emocional, nostalgia dosmilera y narrativa cinematográfica.",
    listen: "Escuchar Capituloves",
    discover: "Descubrir el universo",
    ticker: ["CANTANTE", "COMPOSITORA", "ACTRIZ", "CREADORA VISUAL"],
    aboutKicker: "SOBRE GLORI",
    aboutTitle: "Recuerdos convertidos en canciones.",
    aboutBody: [
      "Glori Pacheco es una cantautora pop costarricense que mezcla pop emocional, nostalgia dosmilera y narrativa cinematográfica.",
      "Con formación en Artes Dramáticas, Producción Audiovisual y Fotografía, construye un universo donde la música, la imagen y la puesta en escena cuentan historias de amor, duelo, amistad y reconstrucción personal.",
    ],
    roles: ["Cantautora", "Actriz", "Fotógrafa", "Productora audiovisual"],
    musicKicker: "ÁLBUM DEBUT · 2024",
    musicTitle: "CAPITULOVES",
    musicBody: "Ocho canciones inspiradas en experiencias afectivas que recorren la adolescencia y la adultez joven. Cada track abre un capítulo distinto de una misma historia emocional.",
    chapterLabel: "CAPÍTULO",
    openSpotify: "Abrir en Spotify",
    fullProfile: "Perfil completo en Spotify",
    visualsKicker: "VIDEOS / VISUALES",
    visualsTitle: "Pop que también se mira.",
    visualsBody: "Cada canción se extiende en imágenes, dirección artística y performance. Una mirada al universo audiovisual de Glori.",
    watchVisual: "Ver video",
    openProcess: "Conocer el proceso",
    closeOverlay: "Cerrar",
    liveKicker: "EN VIVO",
    liveTitle: "La historia también se vive en escena.",
    liveBody: "En 2025, Glori presentó Capituloves completo en el festival Cierre de Verano de San Vicente de Moravia, invitada por La Kuarta y sus amigos junto a la Municipalidad de Moravia.",
    liveCta: "Ver videos en vivo",
    pressKicker: "TRAYECTORIA",
    pressTitle: "Una voz pop de Costa Rica para Latinoamérica.",
    pressBody: "Su música ha aparecido en televisión, radio y medios digitales de Costa Rica, México, Perú, Argentina, Guatemala e Italia.",
    awards: [
      ["2024", "Nominaciones en Premios Música 503 por Todo Menos Amigos y Bang Bang. Bang Bang también fue nominada a Mejor Sencillo Pop en los Premios ACAM."],
      ["2025", "Capituloves fue nominado a Álbum del Año en Premios Música 506 y a Mejor Álbum Pop en Premios ACAM."],
      ["2025", "Quiero Llorar Todo el Tiempo fue nominada a Canción del Año, y Mejor Sola Que Mal Acompañada recibió nominación en Premios Estela de Guatemala."],
    ],
    read: "Leer nota",
    resources: "Fotografías oficiales",
    epkCta: "Descargar EPK",
    contactKicker: "CONTACTO",
    contactTitle: "Contrataciones, prensa y colaboraciones.",
    location: "San José, Costa Rica",
    socialHub: "Todos los enlaces",
    emailLabel: "Correo",
    phoneLabel: "Teléfono",
    footer: "Pop emocional desde Costa Rica.",
    menu: "Menú",
    closeMenu: "Cerrar menú",
  },
  en: {
    nav: [
      ["Home", "#top"],
      ["Music", "#music"],
      ["About", "#about"],
      ["Videos / Visuals", "#visuals"],
      ["Press / EPK", "#press"],
      ["Shows", "#shows"],
      ["Cantería", "#canteria"],
      ["Contact", "#contact"],
    ],
    socialLead: "LISTEN · FOLLOW",
    heroEyebrow: "POP SINGER-SONGWRITER · COSTA RICA",
    heroIntro: "Emotional pop, 2000s nostalgia, and cinematic storytelling.",
    listen: "Listen to Capituloves",
    discover: "Enter the universe",
    ticker: ["SINGER", "SONGWRITER", "ACTRESS", "VISUAL CREATOR"],
    aboutKicker: "ABOUT GLORI",
    aboutTitle: "Memories turned into songs.",
    aboutBody: [
      "Glori Pacheco is a Costa Rican pop singer-songwriter blending emotional pop, 2000s nostalgia, and cinematic storytelling.",
      "With a background in Performing Arts, Audiovisual Production, and Photography, she builds a world where music, image, and performance tell stories of love, heartbreak, friendship, healing, and personal growth.",
    ],
    roles: ["Singer-songwriter", "Actress", "Photographer", "Audiovisual producer"],
    musicKicker: "DEBUT ALBUM · 2024",
    musicTitle: "CAPITULOVES",
    musicBody: "Eight songs inspired by emotional experiences from adolescence through young adulthood. Each track opens a different chapter of the same intimate story.",
    chapterLabel: "CHAPTER",
    openSpotify: "Open on Spotify",
    fullProfile: "Full Spotify profile",
    visualsKicker: "VIDEOS / VISUALS",
    visualsTitle: "Pop made to be seen.",
    visualsBody: "Every song expands through imagery, art direction, and performance. A look inside Glori's visual universe.",
    watchVisual: "Watch video",
    openProcess: "Inside the process",
    closeOverlay: "Close",
    liveKicker: "LIVE",
    liveTitle: "The story comes alive on stage.",
    liveBody: "In 2025, Glori performed Capituloves in full at the Cierre de Verano festival in San Vicente de Moravia, invited by La Kuarta y sus amigos and the Municipality of Moravia.",
    liveCta: "Watch live videos",
    pressKicker: "CAREER",
    pressTitle: "A Costa Rican pop voice reaching Latin America.",
    pressBody: "Her music has appeared on television, radio, and digital media across Costa Rica, Mexico, Peru, Argentina, Guatemala, and Italy.",
    awards: [
      ["2024", "Todo Menos Amigos and Bang Bang earned nominations at Premios Música 503. Bang Bang was also nominated for Best Pop Single at the ACAM Awards."],
      ["2025", "Capituloves was nominated for Album of the Year at Premios Música 506 and Best Pop Album at the ACAM Awards."],
      ["2025", "Quiero Llorar Todo el Tiempo was nominated for Song of the Year, while Mejor Sola Que Mal Acompañada received a Premios Estela nomination in Guatemala."],
    ],
    read: "Read article",
    resources: "Official photography",
    epkCta: "Download EPK",
    contactKicker: "CONTACT",
    contactTitle: "Bookings, press, and collaborations.",
    location: "San José, Costa Rica",
    socialHub: "All artist links",
    emailLabel: "Email",
    phoneLabel: "Phone",
    footer: "Emotional pop from Costa Rica.",
    menu: "Menu",
    closeMenu: "Close menu",
  },
} as const;
