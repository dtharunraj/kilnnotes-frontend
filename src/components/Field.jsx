import React from "react";

export default function Field({
  label,
  name,
  error,
  ...inputProps
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-[#a29e96]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        className={`w-full rounded-xl border bg-[#0b0b0b] px-4 py-3.5 text-sm text-[#eee8dc] outline-none transition-all duration-200 placeholder:text-[#4f4c47] ${
          error
            ? "border-red-500/50 focus:border-red-400"
            : "border-white/[0.09] focus:border-[#c9a96e]/60 focus:bg-[#0e0e0d] focus:shadow-[0_0_0_3px_rgba(201,169,110,0.06)]"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${name}-error` : undefined
        }
        {...inputProps}
      />

      {error && (
        <p
          id={`${name}-error`}
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}