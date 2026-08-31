# Teradata x SpaceXAI

A password-protected customer leave-behind for Teradata.

## What it is

Three sample account workflows on one page. Each story follows an agent from
the trigger to a draft artifact. The interactive demo keeps the chat on the
left and the agent's computer on the right.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The shared password is
configured through `SITE_PASSWORD`.

## Deploy

Deploy under the `jasonwiker` Vercel team with `SITE_PASSWORD` set. The
production alias is `teradata-grokbot.vercel.app`.
