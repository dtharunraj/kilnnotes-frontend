import React from "react";

export default function BrandPanel() {
  return (
    <aside className="relative hidden min-h-screen w-[45%] overflow-hidden border-r border-white/[0.06] bg-[#0d0d0c] lg:flex">

      <div className="absolute inset-0">
        <div className="absolute left-[-180px] top-[15%] h-[500px] w-[500px] rounded-full bg-[#c9a96e]/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[#8b6b42]/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a96e]/30 bg-[#c9a96e]/10">
            <span className="text-xl font-semibold text-[#d8bb82]">
              K
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-[#f5f1e8]">
              KILN
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-[#68655f]">
              Private workspace
            </p>
          </div>
        </div>

        <div className="max-w-lg">

          <div className="mb-10">
            <div className="mb-5 h-px w-16 bg-[#c9a96e]" />

            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a96e]">
              Think. Create. Remember.
            </p>
          </div>

          <h2 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#f5f1e8] xl:text-6xl">
            Your ideas
            <br />
            deserve a
            <br />
            <span className="text-[#c9a96e]">better space.</span>
          </h2>

          <p className="mt-8 max-w-md text-sm leading-7 text-[#77746e]">
            A private workspace designed to keep your thoughts organized,
            focused and always within reach.
          </p>

          <div className="mt-12 flex gap-10">
            <div>
              <p className="text-2xl font-semibold text-[#e8ddc6]">
                01
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#5f5c57]">
                Private
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-[#e8ddc6]">
                02
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#5f5c57]">
                Focused
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-[#e8ddc6]">
                03
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#5f5c57]">
                Simple
              </p>
            </div>
          </div>

        </div>

        <div className="flex items-end justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#4f4d49]">
            KILN / 2026
          </p>

          <div className="h-10 w-10 rounded-full border border-[#c9a96e]/20" />
        </div>

      </div>
    </aside>
  );
}