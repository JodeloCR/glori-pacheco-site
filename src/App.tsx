import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  Disc3,
  Download,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Music2,
  Phone,
  Play,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CompositionsOverlay } from "./components/CompositionsOverlay";
import { RecordCursor } from "./components/RecordCursor";
import {
  artistLinks,
  canteria,
  canteriaGallery,
  chapters,
  copy,
  pressLinks,
  visualStories,
  type Language,
} from "./content";
import { getInitialLanguage, storeLanguage } from "./language";

const reveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function getSpotifyEmbedUrl(href: string) {
  const url = new URL(href);
  const path = url.pathname.split("/").filter(Boolean);
  const typeIndex = path.findIndex((part) => part === "track" || part === "album");
  const type = path[typeIndex];
  const id = path[typeIndex + 1];

  return type && id ? `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0` : href;
}
type AnimatedTitleProps = {
  children: string;
  className?: string;
};

function AnimatedTitle({ children, className }: AnimatedTitleProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  return (
    <h2 className={className} aria-label={children}>
      {words.map((word, index) => {
        const punctuation = word.match(/[.,!?;:]+$/)?.[0] ?? "";
        const wordText = punctuation ? word.slice(0, -punctuation.length) : word;

        return (
          <span className="word-reveal" aria-hidden="true" key={`${word}-${index}`}>
            <motion.span
              initial={false}
              whileInView={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, index % 2 ? 1 : -1, 0] }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.72, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {wordText}
              {punctuation && <span className="title-punctuation">{punctuation}</span>}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compositionsOpen, setCompositionsOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(
    () => !new URLSearchParams(window.location.search).has("skipIntro"),
  );
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const content = copy[language];
  const canteriaContent = canteria[language];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), reduceMotion ? 0 : 1050);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.style.overflow = menuOpen || compositionsOpen ? "hidden" : "";
    const params = new URLSearchParams(window.location.search);
    params.set("lang", language);
    const query = params.toString();
    window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    document.title =
      language === "es"
        ? "Glori Pacheco | Pop emocional de Costa Rica"
        : "Glori Pacheco | Emotional pop from Costa Rica";
    return () => {
      document.body.style.overflow = "";
    };
  }, [language, menuOpen, compositionsOpen]);

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;
    const timer = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  const socialLinks = useMemo(
    () => [
      { label: "Spotify", href: artistLinks.spotify, icon: Music2 },
      { label: "Instagram", href: artistLinks.instagram, icon: Instagram },
      { label: "YouTube", href: artistLinks.youtubeChannel, icon: Youtube },
      { label: "TikTok · Linktree", href: artistLinks.linktree, mark: "♪" },
      { label: "X · Linktree", href: artistLinks.linktree, mark: "X" },
      { label: "Facebook · Linktree", href: artistLinks.linktree, icon: Facebook },
    ] as const,
    [],
  );

  const closeCompositions = useCallback(() => setCompositionsOpen(false), []);

  const chooseLanguage = useCallback((choice: Language) => {
    setLanguage(choice);
    storeLanguage(choice);
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    const wasMenuOpen = menuOpen;
    setMenuOpen(false);
    window.setTimeout(
      () => target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }),
      wasMenuOpen ? 50 : 0,
    );
  };

  const renderSocialLink = (item: (typeof socialLinks)[number], index: number) => {
    let socialIcon;
    if ("icon" in item) {
      const Icon = item.icon;
      socialIcon = <Icon />;
    } else {
      socialIcon = <span className="social-mark">{item.mark}</span>;
    }

    return (
      <motion.a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-label={item.label}
        title={item.label}
        initial={reduceMotion ? false : { opacity: 0, y: -12, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 1.05 + index * 0.06, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={reduceMotion ? undefined : { y: -3, rotate: index % 2 ? 7 : -7, scale: 1.08 }}
      >
        {socialIcon}
      </motion.a>
    );
  };

  return (
    <>
      <RecordCursor />

      <CompositionsOverlay
        isOpen={compositionsOpen}
        language={language}
        onClose={closeCompositions}
      />

      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              Glori Pacheco
            </motion.span>
            <motion.div
              className="intro__line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.55 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <aside className="social-strip" aria-label={content.socialLead}>
        <span>{content.socialLead}</span>
        <div>{socialLinks.map(renderSocialLink)}</div>
      </aside>

      <header className="site-header">
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>
          Glori Pacheco
        </a>

        <nav className="desktop-nav" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          {content.nav.map(([label, href]) => (
            <button type="button" key={href} onClick={() => scrollTo(href)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="Language selector">
            <button className={language === "es" ? "active" : ""} onClick={() => chooseLanguage("es")} type="button">
              ES
            </button>
            <span>/</span>
            <button className={language === "en" ? "active" : ""} onClick={() => chooseLanguage("en")} type="button">
              EN
            </button>
          </div>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? content.closeMenu : content.menu}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label={language === "es" ? "Navegación móvil" : "Mobile navigation"}>
              {content.nav.map(([label, href], index) => (
                <button type="button" key={href} onClick={() => scrollTo(href)}>
                  <span>0{index + 1}</span>
                  {label}
                  <ArrowDown />
                </button>
              ))}
            </nav>
            <div className="mobile-menu__socials">{socialLinks.map(renderSocialLink)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="top" ref={heroRef}>
          <div className="hero__grain" aria-hidden="true" />
          <motion.div
            className="hero__portrait-wrap"
            initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 0.65, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              src="/images/hero-purple.webp"
              alt="Retrato de Glori Pacheco bajo iluminación violeta"
              initial={reduceMotion ? false : { scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.65, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.div
            className="hero__disc"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <Disc3 />
            <svg className="hero__disc-copy" viewBox="0 0 140 140">
              <defs>
                <path id="hero-disc-copy-top" d="M 27,70 A 43,43 0 0,1 113,70" />
                <path id="hero-disc-copy-bottom" d="M 27,70 A 43,43 0 0,0 113,70" />
              </defs>
              <text textAnchor="middle">
                <textPath href="#hero-disc-copy-top" startOffset="50%">
                  GLORI PACHECO · 2024
                </textPath>
              </text>
              <text textAnchor="middle">
                <textPath href="#hero-disc-copy-bottom" startOffset="50%">
                  CAPITULOVES · COSTA RICA
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="hero__content">
            <motion.p
              className="eyebrow hero__eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {content.heroEyebrow}
            </motion.p>

            <h1 className="hero__name" aria-label="Glori Pacheco">
              <motion.span
                initial={reduceMotion ? false : { y: "120%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.85, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                GLORI
              </motion.span>
              <motion.span
                initial={reduceMotion ? false : { y: "120%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.95, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                PACHECO
              </motion.span>
            </h1>

            <motion.div
              className="hero__lower"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <p>{content.heroIntro}</p>
              <div className="hero__buttons">
                <a className="button button--light" href={artistLinks.spotify} target="_blank" rel="noreferrer">
                  <Play />
                  {content.listen}
                </a>
                <button className="text-link" type="button" onClick={() => scrollTo("#music")}>
                  {content.discover}
                  <ArrowDown />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[...content.ticker, ...content.ticker].map((item, index) => (
              <span key={`${item}-${index}`}>
                {item}
                <Sparkles />
              </span>
            ))}
          </div>
        </div>

        <section className="music section section--dark" id="music">
          <div className="section-shell">
            <motion.div className="music__intro" {...reveal}>
              <div>
                <p className="eyebrow">{content.musicKicker}</p>
                <AnimatedTitle>{content.musicTitle}</AnimatedTitle>
              </div>
              <p>{content.musicBody}</p>
            </motion.div>

            <div className="chapter-grid">
              {chapters.map((chapter, index) => (
                <motion.article
                  className="chapter"
                  key={chapter.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 54, rotate: index % 2 ? 2.5 : -2.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -12, rotate: index % 2 ? -1.5 : 1.5 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.58, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    className="chapter__cover-link"
                    href={chapter.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${content.openSpotify}: ${chapter.title}`}
                    data-cursor="play"
                  >
                    <div className="chapter__image">
                      <img src={chapter.image} alt={`Portada de ${chapter.title}`} loading="lazy" />
                      <span className="chapter__number">{chapter.number}</span>
                      <span className="chapter__play">
                        <Play />
                      </span>
                    </div>
                  </a>
                  <div className="chapter__meta">
                    <span>
                      {content.chapterLabel} {chapter.number}
                    </span>
                    <h3>{chapter.title}</h3>
                    {chapter.credit && <p>{chapter.credit}</p>}
                  </div>
                  <iframe
                    className="chapter__embed"
                    src={getSpotifyEmbedUrl(chapter.href)}
                    title={`Spotify: ${chapter.title}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                  <a className="chapter__spotify-link" href={chapter.href} target="_blank" rel="noreferrer">
                    {content.openSpotify}
                    <ArrowUpRight />
                  </a>
                </motion.article>
              ))}
            </div>

            <motion.div className="spotify-block" {...reveal}>
              <iframe
                src={artistLinks.spotifyEmbed}
                title="Glori Pacheco en Spotify"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
              <a href={artistLinks.spotify} target="_blank" rel="noreferrer" className="text-link text-link--light">
                {content.fullProfile}
                <ArrowUpRight />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="about section" id="about">
          <motion.div className="section-shell about__copy" {...reveal}>
            <p className="eyebrow">{content.aboutKicker}</p>
            <AnimatedTitle>{content.aboutTitle}</AnimatedTitle>
            <div className="about__body">
              {content.aboutBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="role-list">
              {content.roles.map((role, index) => (
                <li key={role}>
                  <span>0{index + 1}</span>
                  {role}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.figure
            className="about__image"
            initial={reduceMotion ? false : { clipPath: "inset(12% 0 12% 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/images/portrait-pink.webp"
              alt="Glori Pacheco con vestuario rosa"
              loading="lazy"
              initial={reduceMotion ? false : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
            <figcaption>GLORI · SAN JOSÉ · CR</figcaption>
          </motion.figure>
          <span className="about__handwritten" aria-hidden="true">
            del diario a la canción
          </span>
        </section>

        <section className="visuals section" id="visuals">
          <div className="section-shell visuals__intro">
            <motion.div {...reveal}>
              <p className="eyebrow">{content.visualsKicker}</p>
              <AnimatedTitle>{content.visualsTitle}</AnimatedTitle>
            </motion.div>
            <motion.p {...reveal}>{content.visualsBody}</motion.p>
          </div>

          <div className="visual-stories">
            {visualStories.map((story, index) => {
              const isOverlay = Boolean(story.overlay);
              const motionProps = {
                initial: reduceMotion ? false : { opacity: 0, y: 70, rotate: index === 1 ? 2 : -2 },
                whileInView: { opacity: 1, y: 0, rotate: 0 },
                whileHover: reduceMotion ? undefined : { y: -10 },
                viewport: { once: true, amount: 0.18 },
                transition: { duration: 0.75, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] as const },
              };

              const storyBody = (
                <>
                  <figure>
                    <img src={story.image} alt={story.title[language]} loading="lazy" />
                    <span className="visual-story__play">{isOverlay ? <Sparkles /> : <Play />}</span>
                    <span className="visual-story__stamp">{story.number}</span>
                  </figure>
                  <div>
                    <span>{story.caption[language]}</span>
                    <h3>{story.title[language]}</h3>
                    <p>
                      {isOverlay ? content.openProcess : content.watchVisual}
                      <ArrowUpRight />
                    </p>
                  </div>
                </>
              );

              if (isOverlay) {
                return (
                  <motion.button
                    className="visual-story visual-story--overlay"
                    type="button"
                    key={story.number}
                    onClick={() => setCompositionsOpen(true)}
                    data-cursor="play"
                    {...motionProps}
                  >
                    {storyBody}
                  </motion.button>
                );
              }

              return (
                <motion.a
                  className="visual-story"
                  href={story.href}
                  target="_blank"
                  rel="noreferrer"
                  key={story.number}
                  data-cursor="play"
                  {...motionProps}
                >
                  {storyBody}
                </motion.a>
              );
            })}
          </div>
        </section>

        <section className="press section" id="press">
          <div className="section-shell press__layout">
            <motion.div className="press__intro" {...reveal}>
              <p className="eyebrow">{content.pressKicker}</p>
              <AnimatedTitle>{content.pressTitle}</AnimatedTitle>
              <p>{content.pressBody}</p>
              <div className="press__actions">
                <a className="button button--dark" href={artistLinks.epk[language]} download>
                  <Download />
                  {content.epkCta}
                </a>
                <a className="text-link" href={artistLinks.photos} target="_blank" rel="noreferrer">
                  <Download />
                  {content.resources}
                </a>
              </div>
            </motion.div>

            <div className="awards">
              {content.awards.map(([year, text], index) => (
                <motion.article
                  key={`${year}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <span>{year}</span>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="section-shell press-links">
            {pressLinks.map((item, index) => (
              <motion.a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -8, rotate: index === 1 ? 1 : -1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span>{item.source}</span>
                <h3>{item.title[language]}</h3>
                <p>
                  {content.read}
                  <ArrowUpRight />
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="live section" id="shows">
          <div className="section-shell live__heading">
            <motion.div {...reveal}>
              <p className="eyebrow">{content.liveKicker}</p>
              <AnimatedTitle>{content.liveTitle}</AnimatedTitle>
            </motion.div>
            <motion.div className="live__copy" {...reveal}>
              <p>{content.liveBody}</p>
              <a className="button button--dark" href={artistLinks.youtube} target="_blank" rel="noreferrer">
                <Youtube />
                {content.liveCta}
              </a>
            </motion.div>
          </div>

          <div className="live-gallery">
            <motion.figure {...reveal} whileHover={reduceMotion ? undefined : { scale: 0.985, rotate: -1 }}>
              <img src="/images/festival-day.webp" alt="Glori Pacheco cantando en el festival Cierre de Verano" loading="lazy" />
            </motion.figure>
            <motion.figure {...reveal} whileHover={reduceMotion ? undefined : { scale: 0.985, rotate: 1 }}>
              <img src="/images/live-close.webp" alt="Glori Pacheco interpretando una canción en vivo" loading="lazy" />
            </motion.figure>
            <motion.figure {...reveal} whileHover={reduceMotion ? undefined : { scale: 0.985, rotate: -1 }}>
              <img src="/images/festival-dance.webp" alt="Glori Pacheco y bailarinas sobre el escenario" loading="lazy" />
            </motion.figure>
          </div>
        </section>

        <section className="canteria section" id="canteria">
          <div className="section-shell canteria__layout">
            <motion.div className="canteria__copy" {...reveal}>
              <p className="eyebrow">{canteriaContent.kicker}</p>
              <AnimatedTitle>{canteriaContent.title}</AnimatedTitle>
              <p className="canteria__meta">{canteriaContent.meta}</p>
              {canteriaContent.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <dl className="canteria__stats">
                {canteriaContent.stats.map(([value, label]) => (
                  <div key={label}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
              <p className="canteria__credits">{canteriaContent.credits}</p>
              <a className="button button--light" href={artistLinks.canteria} target="_blank" rel="noreferrer">
                <Youtube />
                {canteriaContent.cta}
              </a>
            </motion.div>

            <div className="canteria__gallery">
              {canteriaGallery.map((item, index) => (
                <motion.figure
                  key={item.src}
                  initial={reduceMotion ? false : { opacity: 0, y: 48, rotate: index === 1 ? 1.5 : -1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={item.src} alt={item.alt[language]} loading="lazy" />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section section--dark" id="contact">
          <div className="contact__media">
            <img src="/images/portrait-neon.webp" alt="Retrato de Glori Pacheco en un espacio de neón" loading="lazy" />
          </div>
          <motion.div className="contact__content" {...reveal}>
            <p className="eyebrow">{content.contactKicker}</p>
            <AnimatedTitle>{content.contactTitle}</AnimatedTitle>
            <div className="contact__links">
              <a href={artistLinks.email}>
                <Mail />
                <span>
                  <small>{content.emailLabel}</small>
                  glorypacheco@gmail.com
                </span>
                <ArrowUpRight />
              </a>
              <a href={artistLinks.phone}>
                <Phone />
                <span>
                  <small>{content.phoneLabel}</small>
                  +506 8628 4449
                </span>
                <ArrowUpRight />
              </a>
              <div>
                <MapPin />
                <span>{content.location}</span>
              </div>
              <a href={artistLinks.linktree} target="_blank" rel="noreferrer">
                <AtSign />
                <span>{content.socialHub}</span>
                <ArrowUpRight />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top">
          Glori Pacheco
        </a>
        <p>{content.footer}</p>
        <p>© {new Date().getFullYear()} GLORI PACHECO</p>
      </footer>
    </>
  );
}

export default App;
