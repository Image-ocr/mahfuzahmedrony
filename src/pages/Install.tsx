import { useEffect, useState } from "react";
import { Download, Smartphone, Share2 } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !/Android/.test(ua));

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferred(null);
  };

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      <section className="container flex min-h-[100svh] flex-col items-center justify-center py-20">
        <div className="glass mx-auto w-full max-w-xl rounded-3xl p-8 text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15">
            <Smartphone className="h-7 w-7 text-accent" />
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight sm:text-5xl">
            Install RONY
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Add this portfolio to your home screen for a fullscreen, app-like experience.
          </p>

          {installed ? (
            <p className="mt-8 rounded-full bg-accent/15 px-4 py-2 text-sm text-accent">
              ✓ Installed — open it from your home screen.
            </p>
          ) : deferred ? (
            <button
              onClick={handleInstall}
              className="glass-button mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em]"
            >
              <Download className="h-4 w-4" />
              Install App
            </button>
          ) : isIOS ? (
            <div className="mt-8 space-y-3 text-left text-sm text-foreground/85">
              <p className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-accent" />
                Tap the <strong>Share</strong> button in Safari.
              </p>
              <p>Then choose <strong>Add to Home Screen</strong>.</p>
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted-foreground">
              Open your browser menu and choose <strong>Install app</strong> /
              <strong> Add to Home Screen</strong>.
            </p>
          )}

          <a
            href="/"
            className="mt-10 inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to portfolio
          </a>
        </div>
      </section>
    </main>
  );
};

export default Install;
