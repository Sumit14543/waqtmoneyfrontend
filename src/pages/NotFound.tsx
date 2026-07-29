import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The requested page could not be found. Return to Waqt Money homepage to access instant loans."
        robots="noindex, nofollow"
      />
      <Navbar />

      <main className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24">
        <section className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto bg-white p-8 rounded-3xl border border-purple-100 shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertCircle size={32} />
            </div>

            <h1 className="text-5xl font-black text-slate-900 tracking-tight">404</h1>
            <h2 className="mt-4 text-xl font-bold text-slate-800">Oops! Page Not Found</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              We couldn't find the page you were looking for. It might have been moved, deleted, or the URL might have a typo.
            </p>

            <div className="mt-8">
              <Link to="/">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-700 w-full">
                  <Home className="h-4 w-4" />
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
