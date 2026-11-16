
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090f] px-5 py-10 text-white">

      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#11111c] shadow-2xl shadow-purple-950/30 lg:grid-cols-2">

        <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gradient-to-br from-purple-950 via-[#211044] to-[#100d20] p-12 lg:flex">

          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full border border-purple-400/20" />
          <div className="absolute -right-12 top-32 h-56 w-56 rounded-full border border-purple-400/20" />

          <div className="relative flex items-center gap-3">
            <div className="rounded-xl bg-purple-500 p-3">
              <Gamepad2 size={25} />
            </div>
            <span className="text-2xl font-black tracking-tight">
              GAME<span className="text-purple-400">VAULT</span>
            </span>
          </div>

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-xs font-semibold text-purple-200">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              YOUR GAMING UNIVERSE
            </span>

            <h1 className="text-5xl font-black leading-tight">
              Manage your
              <span className="block text-purple-400">
                gaming world.
              </span>
            </h1>

            <p className="max-w-sm leading-7 text-gray-300">
              Your central hub for managing games, tracking players
              and keeping your gaming community connected.
            </p>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=12" alt="Player" className="h-10 w-10 rounded-full border-2 border-[#211044]" />
                <img src="https://i.pravatar.cc/100?img=47" alt="Player" className="h-10 w-10 rounded-full border-2 border-[#211044]" />
                <img src="https://i.pravatar.cc/100?img=33" alt="Player" className="h-10 w-10 rounded-full border-2 border-[#211044]" />
              </div>
              <p className="text-sm text-gray-300">
                One platform. Endless possibilities.
              </p>
            </div>
          </div>

          <p className="relative text-xs text-gray-400">
            © 2026 GameVault Management System
          </p>
        </section>

        <section className="flex items-center justify-center px-7 py-14 sm:px-12">
          <div className="w-full max-w-md space-y-8">

            <div className="space-y-3">
              <div className="mb-6 inline-flex rounded-xl bg-purple-500/15 p-3 text-purple-400 lg:hidden">
                <Gamepad2 size={30} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight">
                Sign in to your account
              </h2>

              <p className="text-sm text-gray-400">
                Enter your credentials to access your gaming dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@gms.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#191925] px-4 py-3.5 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#191925] px-4 py-3.5 pr-12 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-4 font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:from-purple-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in to dashboard"}
              </button>
            </form>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-300">
                <ShieldCheck size={18} />
                Demo access credentials
              </div>

              <p className="text-sm text-gray-300">
                Email: <span className="text-white">admin@gms.com</span>
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Password: <span className="text-white">GameAdmin123</span>
              </p>
            </div>

            <p className="text-center text-xs text-gray-500">
              Secure access to your gaming management workspace.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
