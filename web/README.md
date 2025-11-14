# Signal Decoder

Signal Decoder is a lightweight Next.js workbench for interrogating mysterious strings, hashes, and opaque identifiers. Paste any token to instantly reveal its composition, entropy, per-character metadata, and likely encodings.

## Features

- Character-by-character breakdown with Unicode code points, hex, and binary views
- Frequency and entropy analysis to gauge randomness and pattern density
- Automatic Base64, Base64URL, and Base58 decoding attempts with previews
- Insight hints that flag common formats (UUIDs, slugs, numeric IDs, URL-safe tokens)
- Responsive Tailwind UI designed for fast inspection on desktop or mobile

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and paste any string into the analyzer to explore it.

## Available Scripts

- `npm run dev` – start the local development server
- `npm run build` – create an optimized production build
- `npm run start` – run the production build locally
- `npm run lint` – lint the codebase with ESLint

## Deployment

The project is ready for Vercel. You can deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-073c07d3
```

Ensure the `VERCEL_TOKEN` environment variable is already configured in your shell session.
