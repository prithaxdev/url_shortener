# Zap — URL Shortener

A fast, client-side URL shortener with a playful geometric design. No backend, no account required — everything lives in your browser.

**Live:** [https://zap-it.vercel.app/]

---

## Features

### URL Shortening

Paste any URL and get a short `zap.io/{code}` link instantly. The app validates the URL, generates a short code, and saves it to localStorage.

**What counts as a valid URL:**
- Must have `http://` or `https://` protocol (auto-added if missing)
- Must have a valid domain with a 2+ character TLD (e.g. `.com`, `.io`)
- `localhost` and IP addresses are also accepted
- Bare words like `hello` or `notadomain` are rejected

**Example:**
```
Input:  github.com/syntax/url-shortener
Output: https://zap.io/k3mP9x
```

---

### Custom Aliases

Instead of a random code, set a memorable slug for your link.

- 3–20 characters
- Letters, numbers, hyphens, and underscores only
- Duplicate aliases are detected and rejected with a warning

**Example:**
```
Input:  https://github.com/syntax/url-shortener
Alias:  my-repo
Output: https://zap.io/my-repo
```

---

### Code Length

When not using a custom alias, choose how long the random code should be: **4, 6, 8, or 10 characters**. Default is 6.

| Length | Example code  | Notes                           |
|--------|---------------|---------------------------------|
| 4      | `aB3x`        | Good for private personal lists |
| 6      | `k3mP9x`      | Default, good balance           |
| 8      | `k3mP9xQz`    | Higher collision resistance     |
| 10     | `k3mP9xQzW2`  | Very high collision resistance  |

---

### Link Expiry

Set an automatic expiry for any link.

| Option  | Expires at              |
|---------|-------------------------|
| Never   | No expiry (default)     |
| 1 day   | 24 hours after creation |
| 7 days  | 1 week after creation   |
| 30 days | 30 days after creation  |

**Expiry indicators on each card:**
- **Expired** — pink badge, card shown at 60% opacity
- **Expires in Xd** — amber badge when within 3 days
- **Date** — exact expiry date shown otherwise
- Visiting an expired link shows a warning toast instead of navigating

---

### Private Notes

Attach a personal memo to any link — visible only to you, never included in the short URL.

**Example use cases:**
- `"Campaign landing page for March newsletter"`
- `"Sharing with team on Slack"`
- `"Expires after product launch"`

Notes are displayed on the card in a subtle gray box with a document icon.

---

### UTM Tracking

Append UTM parameters to the original URL automatically. Useful for tracking traffic sources in analytics tools like Google Analytics or Plausible.

| Field    | Example value  | Appended as          |
|----------|----------------|----------------------|
| Source   | `twitter`      | `utm_source=twitter` |
| Medium   | `social`       | `utm_medium=social`  |
| Campaign | `launch`       | `utm_campaign=launch`|

**Example:**
```
Original:  https://mysite.com/blog/post
With UTM:  https://mysite.com/blog/post?utm_source=twitter&utm_medium=social&utm_campaign=launch
Shortened: https://zap.io/aBc123
```

The UTM toggle shows an **"on"** indicator when parameters are active.

---

### Copy, Visit & Delete

Each URL card has three actions:

| Action              | What it does                                              |
|---------------------|-----------------------------------------------------------|
| **Copy** (short URL)    | Copies `https://zap.io/{code}` to clipboard           |
| **Copy** (original URL) | Copies the full destination URL to clipboard          |
| **Visit**               | Opens the original URL in a new tab, increments click count |
| **Delete**              | Shows a confirmation dialog, then permanently removes the link |

---

### Click Tracking

Every time you click **Visit** on a card, the click count increments. This gives a rough idea of how often you've used a link.

- Per-link count shown in a colored badge on each card
- Total clicks summed across all links in the stats bar
- Stored locally in `localStorage` — not real traffic data

---

### Stats Bar

Shown above the link list when at least one link exists.

```
4 links shortened     ·     12 total clicks
```

---

### Toast Notifications

Every action triggers a contextual toast notification.

| Trigger              | Type    | Title                        | Message                                  |
|----------------------|---------|------------------------------|------------------------------------------|
| Link created         | Success | "Link zapped!"               | Short URL is ready to share              |
| Short URL copied     | Success | "Short URL copied"           | URL is on your clipboard                 |
| Original URL copied  | Info    | "Original URL copied"        | Full destination link copied             |
| Link deleted         | Success | "Link permanently deleted"   | Link removed from your list              |
| Invalid URL          | Error   | "Couldn't zap that"          | Explains what's wrong                    |
| Duplicate URL        | Warning | "Already shortened"          | Find it in your links below              |
| Alias taken          | Warning | "Already shortened"          | Pick a different alias                   |
| Expired link visited | Warning | "This link has expired"      | Shorten again for a fresh link           |
| Clipboard blocked    | Error   | "Copy failed"                | Browser blocked clipboard access         |

---

## Tech Stack

| Category       | Technology                                   |
|----------------|----------------------------------------------|
| Framework      | React 19 + TypeScript                        |
| Build tool     | Vite 7                                       |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)    |
| UI primitives  | Radix UI + `class-variance-authority`        |
| Icons          | Lucide React                                 |
| Toasts         | Sileo + Sonner                               |
| Persistence    | Browser `localStorage`                       |
| Deployment     | Vercel                                       |

No backend. No database. No authentication.

---

## Data Persistence

All links are stored in `localStorage` under the key `"shortened-urls"`. The data is:

- **Local to your browser** — not synced across devices
- **Permanent until cleared** — survives page reloads and browser restarts
- **Lost if you clear site data** — no recovery mechanism

Each stored link contains:

```typescript
{
  id: string;           // Unique ID from Date.now()
  originalUrl: string;  // Full destination URL (with UTM params if set)
  shortUrl: string;     // e.g. "https://zap.io/k3mP9x"
  shortCode: string;    // e.g. "k3mP9x" or "my-alias"
  createdAt: Date;
  clickCount: number;
  isActive: boolean;
  expiresAt?: Date | null;
  note?: string;
}
```

---

## Design System

**Fonts:** [Outfit](https://fonts.google.com/specimen/Outfit) (headings) · [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (body)

**Palette:**

| Token      | Value     | Use                              |
|------------|-----------|----------------------------------|
| Background | `#FFFDF5` | Warm cream page background       |
| Foreground | `#1E293B` | Text, borders                    |
| Violet     | `#8B5CF6` | Primary actions, short URLs      |
| Pink       | `#F472B6` | Destructive actions, expired badges |
| Amber      | `#FBBF24` | Secondary hover, expiry warnings |
| Mint       | `#34D399` | Accents                          |

Cards use hard-offset shadows with no blur (e.g. `4px 4px 0px 0px #8B5CF6`) and rotate slightly on hover. Buttons are pill-shaped. All animations respect `prefers-reduced-motion`.

---

## Running Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type-check and build
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

Requires Node 18+ and [pnpm](https://pnpm.io).

---

## Deployment

The project is deployed on **Vercel**. `vercel.json` includes a catch-all rewrite rule so the SPA handles all routes:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

To deploy your own instance, fork the repo and import it into Vercel — no environment variables needed.

---

## Project Structure

```
src/
├── App.tsx                        # Root layout (Header + UrlsPage + Footer)
├── index.css                      # Tailwind setup, theme variables, keyframes
├── features/urls/
│   ├── UrlsPage.tsx               # Hero section, stats bar, URL list
│   ├── types.ts                   # ShortenedUrl interface
│   ├── utils.ts                   # validateUrl, generateShortCode, copyToClipboard
│   ├── hooks/useUrls.ts           # All CRUD logic, localStorage persistence
│   └── components/
│       ├── UrlForm.tsx            # Input form + advanced options panel
│       ├── UrlCard.tsx            # Individual link card with actions
│       └── UrlList.tsx            # List container + empty state
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Sticky header
│   │   └── Footer.tsx             # Footer
│   └── ui/                        # Shared primitives (Button, Input, Dialog, etc.)
├── hooks/
│   └── useLocalStorage.ts         # Generic localStorage hook
└── lib/
    └── utils.ts                   # cn() class merging utility
```

---

## Limitations

- **No real redirects** — `zap.io` short URLs are display-only and don't redirect anywhere
- **No cross-device sync** — data lives only in the browser that created it
- **No real analytics** — click count only tracks your own "visit" button clicks
- **No account system** — anyone with access to your browser can see your links

This is intentional. The app is a personal local-first tool, not a production link management service.
