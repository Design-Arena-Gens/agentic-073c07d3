"use client";

import { useMemo, useState } from "react";
import { analyzeString, type EncodingAttempt } from "@/lib/string-analysis";

const DEFAULT_VALUE = "l_ldMXP89q-m";

const statFormatter = new Intl.NumberFormat();
const percentageFormatter = new Intl.NumberFormat(undefined, {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const StatCard = ({
  label,
  value,
  subtle,
}: {
  label: string;
  value: string;
  subtle?: string;
}) => (
  <div className="rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
      {label}
    </div>
    <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
      {value}
    </div>
    {subtle ? (
      <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        {subtle}
      </div>
    ) : null}
  </div>
);

const EncodingCard = ({ attempt }: { attempt: EncodingAttempt }) => (
  <div className="rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-zinc-900 dark:bg-zinc-900/60">
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {attempt.label}
      </h3>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${attempt.success ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"}`}
      >
        {attempt.success ? "decoded" : "not decoded"}
      </span>
    </div>
    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {attempt.message}
    </p>
    {attempt.success && attempt.byteLength ? (
      <div className="mt-3 rounded-xl bg-zinc-100/80 p-3 text-xs font-mono text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300">
        <div className="flex flex-wrap items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-100">
            Bytes:
          </span>
          <span>{attempt.byteLength}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-zinc-700 dark:text-zinc-100">
            Hex:
          </span>
          <div className="mt-1 overflow-x-auto text-nowrap text-zinc-600 dark:text-zinc-300">
            {attempt.hex}
          </div>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-zinc-700 dark:text-zinc-100">
            Preview:
          </span>
          <div className="mt-1 overflow-x-auto text-nowrap text-zinc-600 dark:text-zinc-300">
            {attempt.decodedPreview}
          </div>
        </div>
      </div>
    ) : null}
  </div>
);

export default function Home() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  const analysis = useMemo(() => analyzeString(value), [value]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-12 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3rem] text-sky-500">
              Signal Decoder
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Deep dive into opaque identifiers
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Paste any string to reveal its structure, entropy, and potential
              encoding hints. Useful when you stumble across mysterious tokens
              like{" "}
              <span className="rounded-md bg-sky-100 px-1.5 py-0.5 font-mono text-xs text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                l_ldMXP89q-m
              </span>
              .
            </p>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Analyzed string
            </span>
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-zinc-200 bg-white/90 p-4 font-mono text-sm leading-relaxed text-zinc-800 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-100 dark:focus:border-sky-400/70 dark:focus:ring-sky-500/20"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Paste a string, token, hash, or identifier..."
            />
          </label>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Length"
            value={statFormatter.format(analysis.length)}
            subtle="Total characters"
          />
          <StatCard
            label="Unique characters"
            value={statFormatter.format(analysis.uniqueCharacters)}
            subtle="Distinct symbols observed"
          />
          <StatCard
            label="Entropy"
            value={`${analysis.entropy.toFixed(3)} bits`}
            subtle="Shannon entropy per symbol"
          />
          <StatCard
            label="Printable coverage"
            value={percentageFormatter.format(analysis.printableRatio)}
            subtle="Printable characters vs total"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Composition
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Character classes present in the current selection.
            </p>
            <dl className="mt-4 grid gap-3">
              {(Object.entries(analysis.categories) as [
                string,
                number,
              ][]).map(([key, count]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-2xl bg-zinc-100/80 px-4 py-2 text-sm font-medium text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300"
                >
                  <dt>{key}</dt>
                  <dd className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {statFormatter.format(count)}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 p-4 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              <p>
                ASCII range:{" "}
                {analysis.minCodePoint !== null && analysis.maxCodePoint !== null
                  ? `${analysis.minCodePoint}–${analysis.maxCodePoint}`
                  : "n/a"}
              </p>
              <p className="mt-1">
                {analysis.asciiOnly
                  ? "All characters fall within the ASCII range."
                  : "Contains characters above the ASCII range."}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Frequencies
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Most common characters present in the analyzed string.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="min-w-full divide-y divide-zinc-200 text-left text-sm dark:divide-zinc-800">
                <thead className="bg-zinc-100/60 text-xs uppercase text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Char</th>
                    <th className="px-4 py-2 font-medium">Code</th>
                    <th className="px-4 py-2 font-medium">Count</th>
                    <th className="px-4 py-2 font-medium">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white/70 font-mono text-xs dark:divide-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200">
                  {analysis.frequencies.slice(0, 8).map((entry) => (
                    <tr key={`${entry.char}-${entry.count}`}>
                      <td className="px-4 py-2 text-base font-semibold">
                        {entry.display}
                      </td>
                      <td className="px-4 py-2">{entry.char.codePointAt(0)}</td>
                      <td className="px-4 py-2">
                        {statFormatter.format(entry.count)}
                      </td>
                      <td className="px-4 py-2">
                        {percentageFormatter.format(entry.percentage / 100)}
                      </td>
                    </tr>
                  ))}
                  {analysis.frequencies.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-center text-zinc-500 dark:text-zinc-400"
                      >
                        Provide a string to see frequency details.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Character map
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Detailed per-character breakdown with Unicode metadata.
            </p>
            <div className="mt-4 max-h-[320px] overflow-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="min-w-full divide-y divide-zinc-200 text-left text-xs dark:divide-zinc-800">
                <thead className="bg-zinc-100/60 uppercase text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Char</th>
                    <th className="px-4 py-2 font-medium">Code</th>
                    <th className="px-4 py-2 font-medium">Hex</th>
                    <th className="px-4 py-2 font-medium">Binary</th>
                    <th className="px-4 py-2 font-medium">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white/80 font-mono text-[0.7rem] dark:divide-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200">
                  {analysis.characters.map((detail) => (
                    <tr key={`${detail.index}-${detail.codePoint}`}>
                      <td className="px-4 py-2 font-semibold text-zinc-500">
                        {detail.index}
                      </td>
                      <td className="px-4 py-2 text-lg font-semibold text-zinc-800 dark:text-zinc-50">
                        {detail.display}
                      </td>
                      <td className="px-4 py-2">{detail.codePoint}</td>
                      <td className="px-4 py-2">{detail.hex}</td>
                      <td className="px-4 py-2">{detail.binary}</td>
                      <td className="px-4 py-2 text-left">{detail.category}</td>
                    </tr>
                  ))}
                  {analysis.characters.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-3 text-center text-zinc-500 dark:text-zinc-400"
                      >
                        Nothing to visualize yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Insights
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {analysis.insights.length ? (
                  analysis.insights.map((insight) => (
                    <li
                      key={insight}
                      className="flex items-start gap-2 rounded-2xl bg-zinc-100/80 px-3 py-2 dark:bg-zinc-800/60"
                    >
                      <span className="mt-[2px] text-sky-500">●</span>
                      <span>{insight}</span>
                    </li>
                  ))
                ) : (
                  <li className="rounded-2xl bg-zinc-100/80 px-3 py-2 text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">
                    Add characters to generate insight hints.
                  </li>
                )}
              </ul>
              {analysis.repeatingPatterns.length ? (
                <div className="mt-4 rounded-2xl border border-dashed border-zinc-200 p-3 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  <p className="font-semibold text-zinc-600 dark:text-zinc-200">
                    Repeating fragments detected
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 font-mono text-sm text-sky-600 dark:text-sky-300">
                    {analysis.repeatingPatterns.map((pattern) => (
                      <span
                        key={pattern}
                        className="rounded-xl bg-sky-100 px-3 py-1 dark:bg-sky-500/20"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Decoding attempts
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Quick experiments across common encodings to surface useful
                interpretations.
              </p>
              <div className="mt-4 space-y-3">
                {analysis.encodings.map((attempt) => (
                  <EncodingCard key={attempt.label} attempt={attempt} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
