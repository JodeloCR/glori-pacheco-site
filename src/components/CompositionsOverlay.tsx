import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { artistLinks, compositionGalleries, compositions, copy, type Language } from "../content";

type CompositionsOverlayProps = {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The Risopop display face is a demo build that stamps a "personal use only" watermark
// over punctuation glyphs, so every non-alphanumeric run falls back to Nunito Sans.
// Same treatment the section titles already use via .title-punctuation.
function Display({ children }: { children: string }) {
  const runs = children.match(/[\p{L}\p{N}\s]+|[^\p{L}\p{N}\s]+/gu) ?? [children];

  return (
    <>
      {runs.map((run, index) =>
        /[\p{L}\p{N}\s]/u.test(run[0]) ? (
          <span key={`${run}-${index}`}>{run}</span>
        ) : (
          <span className="title-punctuation" key={`${run}-${index}`}>
            {run}
          </span>
        ),
      )}
    </>
  );
}

export function CompositionsOverlay({ isOpen, language, onClose }: CompositionsOverlayProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const content = compositions[language];
  const labels = copy[language];

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="comp-overlay"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="comp-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="comp-title"
            initial={reduceMotion ? false : { y: 56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 36, opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="comp-panel__close"
              type="button"
              ref={closeRef}
              onClick={onClose}
              aria-label={labels.closeOverlay}
            >
              <X />
            </button>

            <header className="comp-panel__head">
              <p className="eyebrow">{content.kicker}</p>
              <h2 id="comp-title">
                <Display>{content.title}</Display>
              </h2>
              <p className="comp-panel__lead">{content.lead}</p>
            </header>

            {content.blocks.map((block) => {
              const gallery = block.gallery ? compositionGalleries[block.gallery] : null;
              const stats = block.stats as readonly (readonly [string, string])[];

              return (
                <section className={`comp-block${gallery ? "" : " comp-block--solo"}`} key={block.tag}>
                  <div className="comp-block__text">
                    <span className="comp-block__tag">{block.tag}</span>
                    <h3>
                      <Display>{block.heading}</Display>
                    </h3>
                    <p className="comp-block__meta">{block.meta}</p>
                    {block.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {stats.length > 0 && (
                      <dl className="comp-stats">
                        {stats.map(([value, label]) => (
                          <div key={label}>
                            <dt>{value}</dt>
                            <dd>{label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>

                  {gallery && (
                    <div className={`comp-gallery comp-gallery--${block.gallery}`}>
                      {gallery.map((item) => (
                        <figure key={item.src}>
                          <img src={item.src} alt={item.alt[language]} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            <div className="comp-panel__foot">
              <p>{content.close}</p>
              <a className="button button--light" href={artistLinks.spotify} target="_blank" rel="noreferrer">
                {content.closeCta}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
