import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dtharunraj-kilnnotes-backend.vercel.app/api/notes";

export default function Notes({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    axios
      .get(API_URL, {
        params: { email: user.email },
      })
      .then(({ data }) => {
        if (!cancelled) {
          setNotes(data.notes);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load your notes.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user.email]);

  async function handleAdd(e) {
    e.preventDefault();

    if (!title.trim()) return;

    setError("");

    try {
      const { data } = await axios.post(API_URL, {
        email: user.email,
        title,
        content,
      });

      setNotes((prev) => [data.note, ...prev]);
      setTitle("");
      setContent("");
    } catch {
      setError("Couldn't save that note.");
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`, {
        data: {
          email: user.email,
        },
      });

      setNotes(data.notes);
    } catch {
      setError("Couldn't delete that note.");
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] text-[#f5f1e8]">

      <header className="border-b border-white/[0.07] bg-[#0c0c0b]/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c9a96e]/30 bg-[#c9a96e]/10">
              <span className="font-semibold text-[#d8bb82]">
                K
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.22em]">
                KILN
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#55524d]">
                Workspace
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg border border-white/[0.09] px-4 py-2 text-xs font-medium text-[#aaa69e] transition hover:border-[#c9a96e]/40 hover:text-[#e0d7c5]"
          >
            Sign out
          </button>

        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-6 py-12">

        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#c9a96e]/5 blur-[100px]" />

        <div className="relative">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
              Personal workspace
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {user.name}&rsquo;s notes
            </h1>

            <p className="mt-2 text-sm text-[#68655f]">
              {user.email}
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleAdd}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
                  New note
                </p>

                <p className="mt-1 text-xs text-[#55524d]">
                  Capture something worth remembering.
                </p>
              </div>

              <span className="text-2xl text-[#c9a96e]/40">
                +
              </span>
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title"
              className="w-full border-b border-white/[0.08] bg-transparent px-0 py-3 text-xl font-medium text-[#eee8dc] outline-none placeholder:text-[#45423e] focus:border-[#c9a96e]/50"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing..."
              rows={5}
              className="mt-4 w-full resize-none bg-transparent px-0 py-2 text-sm leading-7 text-[#bdb8ae] outline-none placeholder:text-[#45423e]"
            />

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#d8bb82] px-6 py-3 text-sm font-semibold text-[#11100e] transition hover:bg-[#e5cc99] hover:shadow-[0_0_30px_rgba(216,187,130,0.15)]"
              >
                Save note
              </button>
            </div>
          </form>

          <div className="mt-12">

            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-[#68655f]">
                Your collection
              </p>

              <span className="text-xs text-[#4f4c47]">
                {notes.length} notes
              </span>
            </div>

            {loading && (
              <p className="text-sm text-[#66625c]">
                Loading your notes...
              </p>
            )}

            {!loading && notes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/[0.08] px-6 py-14 text-center">
                <p className="text-sm text-[#66625c]">
                  Your workspace is empty.
                </p>

                <p className="mt-2 text-xs text-[#45423e]">
                  Create your first note above.
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">

              {notes.map((note) => (
                <article
                  key={note.id}
                  className="group rounded-2xl border border-white/[0.07] bg-[#0d0d0c] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/25 hover:shadow-xl hover:shadow-black/30"
                >

                  <div className="mb-5 flex items-start justify-between gap-4">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c9a96e]/10 text-xs text-[#c9a96e]">
                      N
                    </div>

                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-[10px] uppercase tracking-[0.15em] text-[#4f4c47] transition hover:text-red-400"
                    >
                      Delete
                    </button>

                  </div>

                  <h3 className="text-lg font-medium text-[#e9e2d5]">
                    {note.title}
                  </h3>

                  {note.content && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#77736b]">
                      {note.content}
                    </p>
                  )}

                  <div className="mt-6 h-px bg-white/[0.05]" />

                  <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-[#45423e]">
                    Kiln note
                  </p>

                </article>
              ))}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}