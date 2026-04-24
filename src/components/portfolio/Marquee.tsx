/**
 * RTL Marquee — infinite, GPU-only, glassmorphism.
 * Word-by-word color cycle. No JS animation — pure CSS for 60fps.
 */
const TEXT =
  "WHAT YOU CREATE TODAY BECOMES THE WORLD SOMEONE LIVES IN TOMORROW · LET'S TALK ·";

const Marquee = () => {
  const words = TEXT.split(" ");
  // Render the row twice for seamless loop (track translates -50%)
  const Row = (
    <div className="flex shrink-0 items-center gap-6 px-6 sm:gap-8 sm:px-8" aria-hidden="false">
      {words.map((w, i) => (
        <span
          key={i}
          className="marquee-word font-display text-2xl font-bold uppercase tracking-[0.08em] sm:text-4xl"
          style={{ animationDelay: `${(i % 8) * 0.25}s` }}
        >
          {w}
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Quote" className="relative my-12">
      <div className="glass relative overflow-hidden rounded-2xl py-5 sm:py-7">
        <div className="marquee-track flex w-max">
          {Row}
          {Row}
        </div>
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};

export default Marquee;
