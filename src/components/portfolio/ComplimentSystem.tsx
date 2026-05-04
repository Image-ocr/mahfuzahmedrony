import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Menu, X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import cosmicBg from "@/assets/cosmic-red.png";

type Compliment = {
  id: string;
  name: string;
  rating: number;
  compliment: string;
  created_at: string;
};

type View =
  | "closed"
  | "form"
  | "thanks"
  | "menu-password"
  | "list";

const BUTTON_TEXT = "Give Compliment";

const ComplimentSystem = () => {
  const [view, setView] = useState<View>("closed");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastName, setLastName] = useState("");

  // Password
  const [pwd, setPwd] = useState<number[]>([]);
  const [pwdError, setPwdError] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  // List
  const [compliments, setCompliments] = useState<Compliment[]>([]);
  const [average, setAverage] = useState(0);

  const close = () => {
    setView("closed");
    setName("");
    setRating(0);
    setHoverRating(0);
    setText("");
    setPwd([]);
    setPwdError(false);
  };

  const submit = async () => {
    if (!name.trim() || !text.trim() || rating < 1) return;
    setSubmitting(true);
    const { error } = await supabase.from("compliments").insert({
      name: name.trim().slice(0, 100),
      rating,
      compliment: text.trim().slice(0, 1000),
    });
    setSubmitting(false);
    if (!error) {
      setLastName(name.trim());
      setName("");
      setText("");
      setRating(0);
      setView("thanks");
    }
  };

  const tryPassword = async (next: number[]) => {
    const code = next.join("");
    if (next.length < 4) return;
    setPwdLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "list-compliments",
        { body: { password: code } }
      );
      if (error || !data || (data as any).error) {
        setPwdError(true);
        setTimeout(() => {
          setPwd([]);
          setPwdError(false);
        }, 600);
      } else {
        const payload = data as {
          compliments: Compliment[];
          average: number;
        };
        setCompliments(payload.compliments);
        setAverage(payload.average);
        setView("list");
        setPwd([]);
      }
    } catch {
      setPwdError(true);
      setTimeout(() => {
        setPwd([]);
        setPwdError(false);
      }, 600);
    } finally {
      setPwdLoading(false);
    }
  };

  const pressNum = (n: number) => {
    if (pwdLoading) return;
    const next = [...pwd, n].slice(0, 4);
    setPwd(next);
    if (next.length === 4) tryPassword(next);
  };

  // Lock body scroll on overlay
  useEffect(() => {
    if (view === "closed") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [view]);

  return (
    <>
      {/* Trigger button */}
      <div className="container flex justify-center pb-10 pt-2">
        <motion.button
          type="button"
          onClick={() => setView("form")}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_hsl(0_85%_55%/0.6)] transition-shadow hover:shadow-[0_14px_50px_-10px_hsl(20_95%_60%/0.85)]"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 85% 55%) 0%, hsl(20 95% 55%) 50%, hsl(355 85% 50%) 100%)",
          }}
          aria-label="Give a compliment"
        >
          <Sparkles className="h-4 w-4" />
          <span className="flex">
            {BUTTON_TEXT.split("").map((ch, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.06,
                }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {view !== "closed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60"
              style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
              onClick={close}
              aria-hidden
            />

            {/* Hidden hamburger top-right */}
            {(view === "form" || view === "thanks") && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setView("menu-password");
                }}
                aria-label="Open hidden menu"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/15"
              >
                <Menu className="h-4 w-4" />
              </button>
            )}

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>

            {/* FORM */}
            {view === "form" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl"
                style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-1 text-center font-display text-2xl font-bold tracking-tight">
                  Leave a Compliment
                </h3>
                <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/60">
                  Your words matter
                </p>

                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/70">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Your name"
                  className="mb-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/15"
                />

                <div className="mb-4 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const active = (hoverRating || rating) >= n;
                    return (
                      <motion.button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        whileHover={{ scale: 1.18 }}
                        whileTap={{ scale: 0.92 }}
                        aria-label={`${n} stars`}
                      >
                        <Star
                          className={`h-7 w-7 transition-all duration-200 ${
                            active
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]"
                              : "text-white/30"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/70">
                  Compliment
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={1000}
                  rows={4}
                  placeholder="Write something kind..."
                  className="mb-5 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/15"
                />

                <motion.button
                  type="button"
                  onClick={submit}
                  disabled={
                    submitting || !name.trim() || !text.trim() || rating < 1
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_hsl(20_95%_55%/0.7)] transition-shadow hover:shadow-[0_14px_40px_-10px_hsl(20_95%_60%/0.95)] disabled:opacity-50"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(0 85% 55%) 0%, hsl(20 95% 55%) 100%)",
                  }}
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send"}
                </motion.button>
              </motion.div>
            )}

            {/* THANKS — cosmic red themed (avatar + signature already in bg image) */}
            {view === "thanks" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="relative flex aspect-square w-full flex-col items-center justify-start"
                  style={{
                    backgroundImage: `url(${cosmicBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Spacer for embedded avatar in background (~32% of height) */}
                  <div className="h-[32%] w-full shrink-0" aria-hidden />

                  {/* Stars — centered under avatar */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.55, ease: "easeOut" }}
                    className="flex justify-center gap-1.5"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.95)] sm:h-7 sm:w-7"
                      />
                    ))}
                  </motion.div>

                  {/* Glass box — centered under stars, equal side margins */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
                    className="mx-auto mt-5 w-[85%] max-w-md rounded-2xl border border-white/45 px-5 py-5 text-center text-[15px] font-semibold leading-[1.55] text-white sm:px-6 sm:py-6 sm:text-base"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      textShadow: "0 1px 3px rgba(0,0,0,0.45)",
                    }}
                  >
                    Thank you, <span className="font-bold">{lastName}</span>, for your thoughtful compliment. Your words not only encourage but also motivate us to do even better.
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* PASSWORD */}
            {view === "menu-password" && (
              <motion.div
                key="pwd"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={
                  pwdError
                    ? { x: [-10, 10, -8, 8, -4, 4, 0], opacity: 1, scale: 1 }
                    : { scale: 1, opacity: 1, x: 0 }
                }
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl"
                style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-2 text-center font-display text-2xl font-bold tracking-tight">
                  Password
                </h3>
                <div className="mb-6 flex items-center justify-center gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        pwd[i] != null
                          ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <motion.button
                      key={n}
                      type="button"
                      onClick={() => pressNum(n)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      className="aspect-square rounded-full border border-white/25 bg-white/5 text-base font-semibold text-white transition-all hover:bg-white/15 hover:shadow-[0_0_18px_hsl(20_95%_55%/0.7)] active:bg-white/25 active:shadow-[0_0_22px_hsl(20_95%_55%/0.9)]"
                    >
                      {n}
                    </motion.button>
                  ))}
                </div>
                {pwdError && (
                  <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-red-300">
                    Wrong code
                  </p>
                )}
              </motion.div>
            )}

            {/* LIST */}
            {view === "list" && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 text-white shadow-2xl"
                style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <h3 className="font-display text-lg font-bold">
                    Compliments ({compliments.length})
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-white/60">Avg</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{average.toFixed(1)}</span>
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-1 gap-3 overflow-y-auto p-5 sm:grid-cols-2">
                  {compliments.length === 0 && (
                    <p className="col-span-full py-10 text-center text-sm text-white/60">
                      No compliments yet.
                    </p>
                  )}
                  {compliments.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold">{c.name}</span>
                        <span className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < c.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-white/20"
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/85">
                        {c.compliment}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComplimentSystem;
