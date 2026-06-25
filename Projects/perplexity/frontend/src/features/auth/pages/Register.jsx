import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../hook/useAuth";
import { toggleTheme } from "../../theme/theme.slice";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4L4 11.5l14 7 14-7L18 4z" fill="currentColor" opacity=".9" />
    <path
      d="M4 24.5l14 7 14-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 18l14 7 14-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState("");

  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((s) => s.theme?.mode || "dark");
  const isDark = themeMode === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await handleRegister({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess("Account created! Taking you to sign in…");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const pwLen = form.password.length;
  const strength = pwLen === 0 ? 0 : pwLen < 6 ? 1 : pwLen < 10 ? 2 : 3;
  const strLabel = ["", "Weak", "Fair", "Strong"][strength];
  const strColor = ["", "var(--str1)", "var(--str2)", "var(--str3)"][strength];

  const textFields = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "basak_07",
      autoComplete: "username",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "pramanik@gmail.com",
      autoComplete: "email",
    },
  ];

  return (
    <div className={`root ${isDark ? "dark" : "light"}`}>
      <div className="grid" aria-hidden />
      <div className="vignette" aria-hidden />

      <button
        className="tgl"
        onClick={() => dispatch(toggleTheme())}
        title="Toggle theme"
      >
        {isDark ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      <div className="wrap">
        {/* Brand */}
        <div className="brand">
          <div className="logo-ring">
            <Logo />
          </div>
          <div>
            <h2 className="brand-name">Perplexity</h2>
            <p className="brand-tag">AI-powered search & chat</p>
          </div>
        </div>

        {/* Card */}
        <div className="card">
          <div className="card-head">
            <h1 className="title">Create an account</h1>
            <p className="sub">Free forever. No credit card required.</p>
          </div>

          {error && (
            <div className="err" role="alert">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="suc" role="status">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={onSubmit} className="form" noValidate>
            {textFields.map((f) => (
              <div
                key={f.id}
                className={`fld ${focused === f.id ? "fld-f" : ""}`}
              >
                <label htmlFor={f.id} className="lbl">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  value={form[f.id]}
                  onChange={onChange}
                  onFocus={() => setFocused(f.id)}
                  onBlur={() => setFocused("")}
                  className="inp"
                  placeholder={f.placeholder}
                />
                <div className="line" />
              </div>
            ))}

            {/* Password */}
            <div className={`fld ${focused === "password" ? "fld-f" : ""}`}>
              <label htmlFor="password" className="lbl">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={onChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="inp"
                  style={{ paddingRight: 34 }}
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  className="eye"
                  onClick={() => setShowPw((p) => !p)}
                  tabIndex={-1}
                >
                  {showPw ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="line" />
            </div>

            {/* Strength */}
            {pwLen > 0 && (
              <div className="str-row">
                <div className="str-bars">
                  {[1, 2, 3].map((l) => (
                    <div
                      key={l}
                      className="str-bar"
                      style={{
                        background: strength >= l ? strColor : "var(--ln)",
                      }}
                    />
                  ))}
                </div>
                <span className="str-lbl" style={{ color: strColor }}>
                  {strLabel}
                </span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn">
              {loading ? (
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="foot">
            Already have an account?{" "}
            <Link to="/login" className="lnk">
              Sign in →
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .dark{--bg:#111113;--bg2:#18181b;--b:rgba(255,255,255,.09);--b2:rgba(255,255,255,.15);
          --t:#ececec;--t2:rgba(255,255,255,.45);--t3:rgba(255,255,255,.22);
          --lbl:rgba(255,255,255,.32);--lbl-f:rgba(255,255,255,.72);
          --ln:rgba(255,255,255,.12);--ln-f:#e0e0e0;
          --sbg:#e0e0e0;--sfg:#000;--dot:rgba(255,255,255,.1);
          --ib:rgba(255,255,255,.07);--ic:rgba(255,255,255,.4);
          --err-bg:rgba(255,255,255,.05);--err-b:rgba(255,255,255,.13);--err-c:rgba(255,255,255,.65);
          --suc-bg:rgba(255,255,255,.06);--suc-b:rgba(255,255,255,.15);--suc-c:rgba(255,255,255,.75);
          --str1:rgba(255,255,255,.35);--str2:rgba(255,255,255,.65);--str3:rgba(255,255,255,.9)}
        .light{--bg:#f5f5f5;--bg2:#fff;--b:rgba(0,0,0,.09);--b2:rgba(0,0,0,.14);
          --t:#111;--t2:rgba(0,0,0,.45);--t3:rgba(0,0,0,.25);
          --lbl:rgba(0,0,0,.35);--lbl-f:rgba(0,0,0,.75);
          --ln:rgba(0,0,0,.12);--ln-f:#111;
          --sbg:#111;--sfg:#fff;--dot:rgba(0,0,0,.08);
          --ib:rgba(0,0,0,.06);--ic:rgba(0,0,0,.4);
          --err-bg:rgba(0,0,0,.04);--err-b:rgba(0,0,0,.12);--err-c:rgba(0,0,0,.65);
          --suc-bg:rgba(0,0,0,.04);--suc-b:rgba(0,0,0,.12);--suc-c:rgba(0,0,0,.65);
          --str1:rgba(0,0,0,.25);--str2:rgba(0,0,0,.5);--str3:rgba(0,0,0,.8)}

        .root{min-height:100vh;background:var(--bg);display:flex;align-items:center;
          justify-content:center;padding:24px;position:relative;overflow:hidden;
          font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',system-ui,sans-serif;
          transition:background .22s}
        .grid{position:absolute;inset:0;pointer-events:none;
          background-image:radial-gradient(circle,var(--dot) 1px,transparent 1px);
          background-size:28px 28px}
        .vignette{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 75% 65% at 50% 50%,transparent 25%,var(--bg) 100%)}
        .tgl{position:fixed;top:18px;right:20px;z-index:10;background:var(--ib);
          border:1px solid var(--b);border-radius:8px;padding:7px;cursor:pointer;
          color:var(--ic);display:flex;transition:background .14s,color .14s}
        .tgl:hover{background:var(--b2);color:var(--t)}

        .wrap{position:relative;z-index:1;width:100%;max-width:400px;
          display:flex;flex-direction:column;align-items:center;gap:24px;
          animation:up .45s cubic-bezier(.22,1,.36,1) both}
        @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        .brand{display:flex;align-items:center;gap:14px}
        .logo-ring{width:52px;height:52px;border-radius:14px;border:1px solid var(--b2);
          background:var(--bg2);display:flex;align-items:center;justify-content:center;
          color:var(--t);animation:logoIn .6s cubic-bezier(.22,1,.36,1) .1s both}
        @keyframes logoIn{from{opacity:0;transform:scale(.7) rotate(-15deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
        .brand-name{font-size:20px;font-weight:700;color:var(--t);letter-spacing:-.03em}
        .brand-tag{font-size:12px;color:var(--t2);margin-top:2px}

        .card{width:100%;background:var(--bg2);border:1px solid var(--b);
          border-radius:16px;padding:32px 28px 28px;transition:background .22s,border-color .22s}
        .card-head{margin-bottom:24px}
        .title{font-size:21px;font-weight:700;color:var(--t);letter-spacing:-.03em}
        .sub{margin-top:5px;font-size:13px;color:var(--t2)}

        .err,.suc{display:flex;align-items:center;gap:7px;border-radius:9px;
          padding:10px 12px;font-size:13px;margin-bottom:20px;animation:shake .3s ease}
        .err{background:var(--err-bg);border:1px solid var(--err-b);color:var(--err-c)}
        .suc{background:var(--suc-bg);border:1px solid var(--suc-b);color:var(--suc-c)}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}

        .form{display:flex;flex-direction:column;gap:20px}
        .fld{display:flex;flex-direction:column;gap:6px}
        .lbl{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;
          color:var(--lbl);transition:color .18s}
        .fld-f .lbl{color:var(--lbl-f)}
        .inp{width:100%;background:transparent;border:none;outline:none;font-size:14px;
          color:var(--t);padding:7px 0;caret-color:var(--t);font-family:inherit}
        .inp::placeholder{color:var(--t3)}
        .line{height:1px;background:var(--ln);position:relative;overflow:hidden}
        .line::after{content:'';position:absolute;inset:0;background:var(--ln-f);
          transform:scaleX(0);transform-origin:left;transition:transform .24s cubic-bezier(.22,1,.36,1)}
        .fld-f .line::after{transform:scaleX(1)}
        .eye{position:absolute;right:0;top:50%;transform:translateY(-50%);background:none;
          border:none;cursor:pointer;color:var(--t3);padding:4px;display:flex;transition:color .15s}
        .eye:hover{color:var(--t2)}

        .str-row{display:flex;align-items:center;gap:8px}
        .str-bars{display:flex;gap:5px;flex:1}
        .str-bar{flex:1;height:3px;border-radius:99px;transition:background .3s}
        .str-lbl{font-size:11px;font-weight:500;white-space:nowrap;transition:color .3s}

        .btn{margin-top:4px;width:100%;background:var(--sbg);color:var(--sfg);border:none;
          border-radius:10px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;
          display:flex;align-items:center;justify-content:center;min-height:46px;
          transition:opacity .15s,transform .15s}
        .btn:hover:not(:disabled){opacity:.86;transform:translateY(-1px)}
        .btn:active:not(:disabled){opacity:.75;transform:translateY(0)}
        .btn:disabled{opacity:.35;cursor:not-allowed}

        .dots{display:flex;gap:5px;align-items:center}
        .dots span{width:5px;height:5px;border-radius:50%;background:var(--sfg);
          animation:dp .9s ease-in-out infinite}
        .dots span:nth-child(2){animation-delay:.15s}
        .dots span:nth-child(3){animation-delay:.3s}
        @keyframes dp{0%,80%,100%{transform:scale(.6);opacity:.35}40%{transform:scale(1);opacity:1}}

        .foot{margin-top:20px;font-size:13px;color:var(--t2);text-align:center}
        .lnk{color:var(--t);font-weight:500;text-decoration:none;transition:opacity .15s}
        .lnk:hover{opacity:.7}
        @media(max-width:480px){.card{padding:24px 18px 20px;border-radius:13px}}
      `}</style>
    </div>
  );
}
