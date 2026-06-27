import { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hook/useAuth";
import { toggleTheme } from "../../theme/theme.slice";

/* ── Typing dots ─────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        alignItems: "center",
        padding: "4px 0",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--t3)",
            animation: `tdot 1.1s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Copy button ─────────────────────────────────────────────────── */
function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      className="abt"
      title="Copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {}
      }}
    >
      {ok ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
    </button>
  );
}

/* ── Message bubble ──────────────────────────────────────────────── */
function Bubble({ msg, chatId, onFeedback, onRegen, isLast }) {
  const isUser = msg.role === "user";
  return (
    <div className={`mrow ${isUser ? "mrow-u" : "mrow-a"}`}>
      {!isUser && (
        <div className="av">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      )}
      <div className="mcol">
        <div className={isUser ? "bu" : "ba"}>
          {msg.isStreaming ? (
            <TypingDots />
          ) : isUser ? (
            <p style={{ margin: 0, lineHeight: 1.65 }}>{msg.content}</p>
          ) : (
            <div className="md">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p>{children}</p>,
                  ul: ({ children }) => <ul>{children}</ul>,
                  ol: ({ children }) => <ol>{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  code: ({ node, className, children, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="ic" {...props}>{children}</code>
                    ) : (
                      <code {...props}>{children}</code>
                    );
                  },
                  pre: ({ children }) => <pre className="cb">{children}</pre>,
                  blockquote: ({ children }) => (
                    <blockquote className="bq">{children}</blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong style={{ fontWeight: 600 }}>{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml"
                    >
                      {children}
                    </a>
                  ),
                  h1: ({ children }) => (
                    <h1
                      style={{
                        fontSize: "1.18em",
                        fontWeight: 700,
                        margin: ".55em 0 .28em",
                      }}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2
                      style={{
                        fontSize: "1.07em",
                        fontWeight: 600,
                        margin: ".5em 0 .25em",
                      }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      style={{
                        fontSize: "1em",
                        fontWeight: 600,
                        margin: ".45em 0 .22em",
                      }}
                    >
                      {children}
                    </h3>
                  ),
                  table: ({ children }) => (
                    <div style={{ overflowX: "auto", margin: ".6em 0" }}>
                      <table className="mt">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => <th className="mth">{children}</th>,
                  td: ({ children }) => <td className="mtd">{children}</td>,
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && !msg.isStreaming && (
          <div className="acts">
            <button
              className={`abt ${msg.feedback === "like" ? "abt-on" : ""}`}
              onClick={() =>
                onFeedback({ chatId, messageId: msg.id, feedback: "like" })
              }
              title="Helpful"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={msg.feedback === "like" ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </button>
            <button
              className={`abt ${msg.feedback === "dislike" ? "abt-on" : ""}`}
              onClick={() =>
                onFeedback({ chatId, messageId: msg.id, feedback: "dislike" })
              }
              title="Not helpful"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={msg.feedback === "dislike" ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
            </button>
            {isLast && (
              <button className="abt" onClick={onRegen} title="Regenerate">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            )}
            <CopyBtn text={msg.content} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Delete modal ────────────────────────────────────────────────── */
function DelModal({ title, onOk, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>
        <h3 className="modal-h">Delete conversation?</h3>
        <p className="modal-p">
          <em>"{title}"</em> will be permanently removed.
        </p>
        <div className="modal-row">
          <button className="modal-no" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-yes" onClick={onOk}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── User avatar menu ────────────────────────────────────────────── */
function UserMenu({ user, onLogout, onToggleTheme, isDark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const initials = (user?.username || user?.email || "U")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="um-wrap" ref={ref}>
      {open && (
        <div className="um-popup">
          <div className="um-info">
            <div className="um-av-lg">{initials}</div>
            <div style={{ minWidth: 0 }}>
              <p className="um-name">{user?.username || "User"}</p>
              <p className="um-email">{user?.email || ""}</p>
            </div>
          </div>
          <div className="um-divider" />
          <button
            className="um-item"
            onClick={() => {
              onToggleTheme();
              setOpen(false);
            }}
          >
            {isDark ? (
              <svg
                width="14"
                height="14"
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
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
          <div className="um-divider" />
          <button
            className="um-item um-out"
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        </div>
      )}
      <button className="um-btn" onClick={() => setOpen((o) => !o)}>
        <div className="um-av">{initials}</div>
        <span className="um-uname">{user?.username || "User"}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ flexShrink: 0, opacity: 0.4 }}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────────── */
const Dashboard = () => {
  const {
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleRegenerateResponse,
    handleMessageFeedback,
    handleNewChat,
    initializeSocketConnection,
  } = useChat();

  const { handleLogout } = useAuth();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loadingId, setLoadingId] = useState(null); // which chat is being loaded
  const [delTarget, setDelTarget] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const chats = useSelector((s) => s.chat.chats);
  const currentChatId = useSelector((s) => s.chat.currentChatId);
  const isLoading = useSelector((s) => s.chat.isLoading);
  const isStreaming = useSelector((s) => s.chat.isStreaming);
  const themeMode = useSelector((s) => s.theme?.mode || "dark");
  const user = useSelector((s) => s.auth.user);
  const isDark = themeMode === "dark";

  const messages = currentChatId ? chats[currentChatId]?.messages || [] : [];
  const endRef = useRef(null);
  const textareaRef = useRef(null);
  const busy = isLoading || isStreaming;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Boot: connect socket + load sidebar
  useEffect(() => {
    const socket = initializeSocketConnection();
    handleGetChats();
    return () => socket?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isStreaming]);

  // ✨ Auto-clear and reset input field when active chat switches
  useEffect(() => {
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus(); // UI convenience: automatic cursor focus on new chat
    }
  }, [currentChatId]);

  // ── Open chat ─────────────────────────────────────────────────────
  const openChat = async (chatId) => {
    setLoadingId(chatId);
    try {
      await handleOpenChat(chatId);
    } finally {
      setLoadingId(null);
    }
  };

  const submit = useCallback(
    async (e) => {
      e?.preventDefault();
      const t = input.trim();
      if (!t || busy) return;
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      await handleSendMessage({ message: t, chatId: currentChatId || null });
    },
    [input, currentChatId, busy, handleSendMessage],
  );

  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit(e);
  };

  const lastAiIdx = messages
    .map((m, i) => (m.role === "assistant" || m.role === "ai" ? i : -1))
    .filter((i) => i !== -1)
    .at(-1);

  const sorted = Object.values(chats).sort(
    (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated),
  );

  const suggestions = [
    "Explain quantum computing simply",
    "Write a Python web scraper",
    "What's in the news today?",
    "Review my code for bugs",
    "Plan a 7-day trip to Japan",
    "Help me write a cover letter",
  ];

  const ThemeIcon = () =>
    isDark ? (
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
    );

  return (
    <div className={`root ${isDark ? "dark" : "light"}`}>
      {/* ── SIDEBAR ────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <aside className="sb">
          <div className="sb-top">
            <div className="brand">
              <div className="brand-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="brand-name">Perplexity</span>
            </div>
            <button
              className="ib"
              onClick={() => setSidebarOpen(false)}
              title="Collapse"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <button className="new-btn" onClick={handleNewChat}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New chat
          </button>

          <div className="clist">
            {sorted.length === 0 ? (
              <p className="empty-sb">No conversations yet</p>
            ) : (
              sorted.map((chat) => (
                <div
                  key={chat.id}
                  className="crow"
                  onMouseEnter={() => setHoverId(chat.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <button
                    className={`cb ${currentChatId === chat.id ? "cb-active" : ""}`}
                    onClick={() => openChat(chat.id)}
                  >
                    {loadingId === chat.id ? (
                      <svg
                        className="spin-s"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeOpacity=".25"
                        />
                        <path
                          d="M12 3a9 9 0 019 9"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ flexShrink: 0, opacity: 0.35 }}
                      >
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    )}
                    <span className="ctitle">{chat.title}</span>
                  </button>
                  {(hoverId === chat.id || currentChatId === chat.id) && (
                    <button
                      className="del-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDelTarget({ id: chat.id, title: chat.title });
                      }}
                      title="Delete"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <UserMenu
            user={user}
            onLogout={handleLogout}
            onToggleTheme={() => dispatch(toggleTheme())}
            isDark={isDark}
          />
        </aside>
      )}

      {/* ── MAIN ───────────────────────────────────────────────────── */}
      <main className="main">
        <header className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {!sidebarOpen && (
              <>
                <button className="ib" onClick={() => setSidebarOpen(true)}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                <button className="ib" onClick={() => dispatch(toggleTheme())}>
                  <ThemeIcon />
                </button>
              </>
            )}
            <span className="topbar-title">
              {currentChatId && chats[currentChatId]
                ? chats[currentChatId].title
                : "New conversation"}
            </span>
          </div>
          {(busy || loadingId) && (
            <div className="thinking">
              <svg
                className="spin-s"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeOpacity=".25"
                />
                <path
                  d="M12 3a9 9 0 019 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              {loadingId ? "Loading…" : "Thinking…"}
            </div>
          )}
        </header>

        {/* Messages with loading overlay */}
        <div className="msgs-wrap">
          {/* Loading overlay */}
          {loadingId && (
            <div className="msgs-loading">
              <div className="msgs-loading-inner">
                <svg
                  className="spin"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity=".2"
                  />
                  <path
                    d="M12 3a9 9 0 019 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Loading conversation…</span>
              </div>
            </div>
          )}

          <div className="msgs">
            {messages.length === 0 && !busy && !loadingId ? (
              <div className="empty">
                <div className="empty-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h2 className="empty-h">How can I help you today?</h2>
                <p className="empty-p">
                  Ask anything — research, writing, code, analysis.
                </p>
                <div className="chips">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      className="chip"
                      onClick={() => {
                        setInput(s);
                        textareaRef.current?.focus();
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <Bubble
                  key={msg.id || i}
                  msg={msg}
                  chatId={currentChatId}
                  onFeedback={handleMessageFeedback}
                  onRegen={handleRegenerateResponse}
                  isLast={i === lastAiIdx}
                />
              ))
            )}
            <div ref={endRef} />
          </div>
        </div>

        {/* Input */}
        <div className="inp-wrap">
          <form onSubmit={submit} className="inp-box">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 160) + "px";
              }}
              onKeyDown={onKey}
              placeholder="Ask anything…"
              rows={1}
              className="ta"
            />
            <div className="inp-foot">
              <span className="kbd">⌘↵ to send</span>
              <button
                type="submit"
                disabled={!input.trim() || busy}
                className="send"
              >
                {busy ? (
                  <svg
                    className="spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeOpacity=".25"
                    />
                    <path
                      d="M12 3a9 9 0 019 9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </div>
          </form>
          <p className="disc">
            Perplexity can make mistakes — verify important information.
          </p>
        </div>
      </main>

      {delTarget && (
        <DelModal
          title={delTarget.title}
          onOk={async () => {
            await handleDeleteChat(delTarget.id);
            setDelTarget(null);
          }}
          onCancel={() => setDelTarget(null)}
        />
      )}
  
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .dark{
          --bg:#111111;--bg2:#181819;
          --b:rgba(255,255,255,.1);--b2:rgba(255,255,255,.4);
          --t:#ececec;--t2:rgba(255,255,255,.5);--t3:rgba(255,255,255,.28);
          --ub:#222226;--ut:#ececec;--ab:#18181b;
          --sbg:#e2e2e2;--sfg:#000;
          --ic-bg:rgba(255,255,255,.07);--av-bg:rgba(255,255,255,.1);
          --hov:rgba(255,255,255,.055);--act:rgba(255,255,255,.1);
          --sc:rgba(255,255,255,.07);--cb-bg:#0e0e10;
        }
        .light{
          --bg:#f4f4f5;--bg2:#fff;
          --b:rgba(0,0,0,.08);--b2:rgba(0,0,0,.13);
          --t:#141414;--t2:rgba(0,0,0,.5);--t3:rgba(0,0,0,.28);
          --ub:#111;--ut:#fff;--ab:#fff;
          --sbg:#111;--sfg:#fff;
          --ic-bg:rgba(0,0,0,.05);--av-bg:rgba(0,0,0,.08);
          --hov:rgba(0,0,0,.04);--act:rgba(0,0,0,.08);
          --sc:rgba(0,0,0,.1);--cb-bg:#f0f0f0;
        }

        .root{display:flex;height:100vh;width:100vw;overflow:hidden;
          background:var(--bg);color:var(--t);
          font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',system-ui,sans-serif;
          font-size:14px;line-height:1.6;transition:background .22s,color .22s}

        /* Sidebar */
        .sb{width:252px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--b);
          display:flex;flex-direction:column;padding:14px 10px;gap:6px;
          animation:slin .3s cubic-bezier(.22,1,.36,1) both}
        @keyframes slin{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
        .sb-top{display:flex;align-items:center;justify-content:space-between;
          padding:4px 4px 12px;border-bottom:1px solid var(--b);margin-bottom:2px}
        .brand{display:flex;align-items:center;gap:9px}
        .brand-icon{width:30px;height:30px;border-radius:8px;border:1px solid var(--b2);
          background:var(--ic-bg);display:flex;align-items:center;justify-content:center;color:var(--t)}
        .brand-name{font-size:14px;font-weight:700;letter-spacing:-.025em;color:var(--t)}

        .ib{background:none;border:none;cursor:pointer;color:var(--t3);padding:6px;
          border-radius:7px;display:flex;transition:background .14s,color .14s}
        .ib:hover{background:var(--hov);color:var(--t)}

        .new-btn{display:flex;align-items:center;gap:8px;width:100%;background:var(--ic-bg);
          border:1px solid var(--b2);border-radius:9px;padding:9px 12px;color:var(--t2);
          font-size:13px;font-weight:500;cursor:pointer;transition:background .14s,color .14s}
        .new-btn:hover{background:var(--hov);color:var(--t)}

        .clist{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:1px;
          scrollbar-width:thin;scrollbar-color:var(--sc) transparent;padding-right:2px}
        .clist::-webkit-scrollbar{width:3px}
        .clist::-webkit-scrollbar-thumb{background:var(--sc);border-radius:99px}
        .empty-sb{font-size:12px;color:var(--t3);text-align:center;padding:20px 0}

        .crow{display:flex;align-items:center;gap:2px}
        .cb{display:flex;align-items:center;gap:8px;flex:1;min-width:0;background:none;
          border:none;cursor:pointer;border-radius:8px;padding:7px 8px;
          color:var(--t2);text-align:left;transition:background .12s,color .12s}
        .cb:hover{background:var(--hov);color:var(--t)}
        .cb-active{background:var(--act)!important;color:var(--t)!important;font-weight:500}
        .ctitle{font-size:13px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}

        .del-btn{flex-shrink:0;background:none;border:none;cursor:pointer;color:var(--t3);
          padding:5px;border-radius:6px;display:flex;animation:fi .15s ease;
          transition:background .12s,color .12s}
        .del-btn:hover{background:rgba(239,68,68,.12);color:#ef4444}
        @keyframes fi{from{opacity:0}to{opacity:1}}

        /* User menu */
        .um-wrap{border-top:1px solid var(--b);padding-top:10px;position:relative}
        .um-btn{display:flex;align-items:center;gap:9px;width:100%;background:none;
          border:none;cursor:pointer;padding:7px 8px;border-radius:10px;
          transition:background .14s;text-align:left}
        .um-btn:hover{background:var(--hov)}
        .um-av{width:30px;height:30px;border-radius:50%;background:var(--av-bg);
          border:1px solid var(--b2);color:var(--t);font-size:11px;font-weight:700;
          display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .um-uname{flex:1;font-size:13px;font-weight:500;color:var(--t);
          overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
        .um-popup{position:absolute;bottom:calc(100% + 6px);left:0;right:0;
          background:var(--bg2);border:1px solid var(--b2);border-radius:12px;
          padding:8px;box-shadow:0 8px 32px rgba(0,0,0,.18);z-index:50;
          animation:popUp .2s cubic-bezier(.22,1,.36,1) both}
        @keyframes popUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .um-info{display:flex;align-items:center;gap:10px;padding:8px 10px 10px}
        .um-av-lg{width:36px;height:36px;border-radius:50%;background:var(--av-bg);
          border:1px solid var(--b2);color:var(--t);font-size:13px;font-weight:700;
          display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .um-name{font-size:13px;font-weight:600;color:var(--t)}
        .um-email{font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:150px}
        .um-divider{height:1px;background:var(--b);margin:4px 0}
        .um-item{display:flex;align-items:center;gap:9px;width:100%;background:none;
          border:none;cursor:pointer;color:var(--t2);font-size:13px;padding:8px 10px;
          border-radius:8px;transition:background .12s,color .12s;text-align:left}
        .um-item:hover{background:var(--hov);color:var(--t)}
        .um-out:hover{background:rgba(239,68,68,.1)!important;color:#ef4444!important}

        /* Main */
        .main{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden}

        .topbar{display:flex;align-items:center;justify-content:space-between;
          padding:13px 22px;border-bottom:1px solid var(--b);background:var(--bg);
          flex-shrink:0;min-height:52px}
        .topbar-title{font-size:13px;color:var(--t2);font-weight:500;
          overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:500px}
        .thinking{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--t2);
          background:var(--ic-bg);border:1px solid var(--b);border-radius:20px;padding:4px 11px}

        /* Messages wrap — position:relative for the overlay */
        .msgs-wrap{flex:1;position:relative;overflow:hidden;display:flex;flex-direction:column}

        /* Translucent overlay shown while loading a chat */
        .msgs-loading{
          position:absolute;inset:0;z-index:10;
          background:var(--bg2);
          display:flex;align-items:center;justify-content:center;
          animation:fi .15s ease;
        }
        .msgs-loading-inner{display:flex;align-items:center;gap:10px;
          color:var(--t2);font-size:13px}

        .msgs{flex:1;overflow-y:auto;padding:20px 0 8px;display:flex;flex-direction:column;
          scrollbar-width:thin;scrollbar-color:var(--sc) transparent}
        .msgs::-webkit-scrollbar{width:4px}
        .msgs::-webkit-scrollbar-thumb{background:var(--sc);border-radius:99px}

        .empty{flex:1;display:flex;flex-direction:column;align-items:center;
          justify-content:center;gap:10px;text-align:center;padding:32px 24px;
          animation:fadeUp .35s ease both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .empty-icon{width:52px;height:52px;border-radius:14px;border:1px solid var(--b2);
          background:var(--ic-bg);display:flex;align-items:center;justify-content:center;
          color:var(--t2);margin-bottom:6px}
        .empty-h{font-size:20px;font-weight:600;color:var(--t);letter-spacing:-.03em}
        .empty-p{font-size:13px;color:var(--t2);max-width:300px}
        .chips{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:500px;margin-top:18px}
        .chip{background:var(--bg2);border:1px solid var(--b2);border-radius:10px;
          color:var(--t2);font-size:13px;padding:10px 14px;cursor:pointer;text-align:left;
          line-height:1.4;transition:background .14s,color .14s}
        .chip:hover{background:var(--hov);color:var(--t)}

        /* Message rows */
        .mrow{display:flex;gap:10px;padding:6px 22px;
          animation:msgIn .25s cubic-bezier(.22,1,.36,1) both}
        @keyframes msgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .mrow-u{flex-direction:row-reverse}
        .av{width:30px;height:30px;border-radius:8px;flex-shrink:0;
          background:var(--ic-bg);border:1px solid var(--b);
          display:flex;align-items:center;justify-content:center;color:var(--t2);margin-top:2px}
        .mcol{display:flex;flex-direction:column;gap:4px;max-width:min(78%,680px)}
        .bu{background:var(--ub);color:var(--ut);border-radius:16px 16px 3px 16px;
          padding:10px 14px;font-size:14px;border:1px solid var(--b)}
        .ba{background:var(--ab);color:var(--t);border-radius:3px 16px 16px 16px;
          padding:12px 15px;font-size:14px;border:1px solid var(--b)}

        /* Markdown */
        .md p{margin-bottom:.5em;line-height:1.72}
        .md p:last-child{margin-bottom:0}
        .md ul,.md ol{padding-left:1.4em;margin-bottom:.55em}
        .md li{margin-bottom:3px}
        .ic{background:var(--ic-bg);padding:2px 6px;border-radius:5px;
          font-family:'SF Mono','Fira Code',monospace;font-size:.84em;border:1px solid var(--b)}
        .cb{background:var(--cb-bg);border:1px solid var(--b);border-radius:10px;
          padding:14px 16px;overflow-x:auto;font-family:'SF Mono','Fira Code',monospace;
          font-size:.82em;line-height:1.65;margin:.6em 0}
        .bq{border-left:3px solid var(--b2);padding-left:12px;color:var(--t2);font-style:italic;margin:.4em 0}
        .ml{color:var(--t);text-decoration:underline;text-underline-offset:2px}
        .mt{border-collapse:collapse;width:100%;font-size:.9em}
        .mth,.mtd{border:1px solid var(--b2);padding:6px 10px;text-align:left}
        .mth{background:var(--ic-bg);font-weight:600}

        .acts{display:flex;align-items:center;gap:2px;padding-left:2px}
        .abt{background:none;border:none;cursor:pointer;color:var(--t3);
          padding:5px;border-radius:6px;display:flex;transition:background .12s,color .12s}
        .abt:hover{background:var(--hov);color:var(--t2)}
        .abt-on{color:var(--t)!important}

        @keyframes tdot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-6px);opacity:1}}

        /* Input */
        .inp-wrap{flex-shrink:0;padding:12px 22px 16px;border-top:1px solid var(--b);background:var(--bg2)}
        .inp-box{border:1.5px solid var(--b2);border-radius:13px;padding:12px 14px 10px;
          background:var(--bg);transition:border-color .2s}
        .inp-box:focus-within{border-color:var(--t2)}
        .ta{width:100%;background:transparent;border:none;outline:none;resize:none;
          font-size:14px;color:var(--t);line-height:1.6;font-family:inherit;
          caret-color:var(--t);display:block;max-height:160px;overflow-y:auto;scrollbar-width:none}
        .ta::placeholder{color:var(--t3)}
        .ta::-webkit-scrollbar{display:none}
        .inp-foot{display:flex;align-items:center;justify-content:space-between;margin-top:9px}
        .kbd{font-size:11px;color:var(--t3)}
        .send{background:var(--sbg);color:var(--sfg);border:none;border-radius:8px;
          width:32px;height:32px;display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:opacity .15s,transform .15s}
        .send:hover:not(:disabled){opacity:.82;transform:translateY(-1px)}
        .send:disabled{opacity:.22;cursor:not-allowed}
        .spin{animation:spn .7s linear infinite}
        .spin-s{animation:spn .7s linear infinite}
        @keyframes spn{to{transform:rotate(360deg)}}
        .disc{margin-top:8px;font-size:11px;color:var(--t3);text-align:center}

        /* Delete modal */
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);
          display:flex;align-items:center;justify-content:center;z-index:100;animation:fi .2s ease}
        .modal{background:var(--bg2);border:1px solid var(--b2);border-radius:16px;
          padding:28px 28px 24px;width:340px;display:flex;flex-direction:column;
          align-items:center;gap:10px;text-align:center;
          animation:popUp .25s cubic-bezier(.22,1,.36,1) both}
        .modal-icon{width:44px;height:44px;border-radius:12px;background:rgba(239,68,68,.1);
          border:1px solid rgba(239,68,68,.2);display:flex;align-items:center;
          justify-content:center;color:#ef4444;margin-bottom:4px}
        .modal-h{font-size:16px;font-weight:600;color:var(--t)}
        .modal-p{font-size:13px;color:var(--t2);line-height:1.6;max-width:270px}
        .modal-row{display:flex;gap:10px;width:100%;margin-top:6px}
        .modal-no{flex:1;background:var(--ic-bg);border:1px solid var(--b2);border-radius:9px;
          color:var(--t2);font-size:13px;font-weight:500;padding:10px;cursor:pointer;
          transition:background .14s,color .14s}
        .modal-no:hover{background:var(--hov);color:var(--t)}
        .modal-yes{flex:1;background:#ef4444;border:none;border-radius:9px;color:#fff;
          font-size:13px;font-weight:600;padding:10px;cursor:pointer;
          transition:opacity .14s,transform .14s}
        .modal-yes:hover{opacity:.88;transform:translateY(-1px)}

        @media(max-width:640px){
          .sb{display:none}
          .mrow{padding:6px 12px}
          .inp-wrap{padding:10px 12px 14px}
          .topbar{padding:11px 14px}
          .chips{grid-template-columns:1fr}
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
