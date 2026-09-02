# Spark Services — Design System (shortcut for any new site for this user)

> Visual style to reuse every time: **clean, minimal, techy, dark blue/black, FULLY rounded corners.**
> Just the look — no project/business info.

## 1. Look & feel
- Dark, flat, techy. Near-black backgrounds, single blue accent, thin translucent white borders, mono technical details. Everything rounded.
- Selection color: blue bg, white text. `::selection { background: var(--blue); color: #fff; }`.

## 2. Colors (CSS vars)
```
--bg: #09090b            (page background)
--bg-soft: #0e0e10       (alternate section bg)
--bg-card: #121215       (cards)
--bg-card-hover: #17171b
--border: rgba(255,255,255,.08)
--border-strong: rgba(255,255,255,.16)
--text: #ececef
--text-muted: #9d9da6
--text-dim: #62626b
--blue: #3b5eff
--blue-strong: #2b42d6
--blue-soft: #6b8aff
--shadow-card: 0 10px 30px rgba(0,0,0,.45)
--shadow-hover: 0 18px 44px rgba(0,0,0,.55)
--transition: 0.2s ease
```

## 3. Typography — ONE font per language, per whole page
- EN: **Space Grotesk** / AR: **IBM Plex Sans Arabic** / mono accents: **JetBrains Mono**.
- Google Fonts (one link loads all three, weights 400–700):
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  ```
- Hard overrides (never per-element font overrides):
  ```css
  html[dir="rtl"] body, html[dir="rtl"] body * { font-family: "IBM Plex Sans Arabic", ...; }
  html[lang="en"] body, html[lang="en"] body * { font-family: "Space Grotesk", ...; }
  ```
- Gradient headline word: `linear-gradient(100deg, var(--blue-soft) 0%, var(--blue) 55%, var(--blue-strong) 100%)` + `background-clip: text` (class `.gradient-text`).

## 4. Shape = FULLY ROUNDED
- Radius tokens: `--radius: 22px` (cards), `--radius-sm: 12px` (small), `--radius-lg: 32px`.
- Pill (999px): all buttons, tabs, badges, language switcher.
- Cards: bg `--bg-card`, 1px `--border`, radius `--radius`, hover = `translateY(-3px)` + `--border-strong` + `--shadow-hover`.
- Layout: `.container { width: min(1140px, 92%); margin-inline: auto; }`, sections `padding: 110px 0`, smooth scroll, `scroll-padding-top: 84px`.

## 5. Section head pattern (every section)
- `.section-tag`: JetBrains Mono, uppercase, `// ` prefix, blue, letter-spacing 0.08em.
- `.section-title`: `clamp(1.7rem,3.6vw,2.5rem)`, weight 700, `-0.02em`, optional `<span class="gradient-text">`.
- `.section-subtitle`: `--text-muted`, ~1.02rem.

## 6. Components
- **Buttons (.btn)**: pill 999px, `13px 26px`, weight 600. Variants: solid blue (white text), outline (transparent + border), ghost.
- **Badges**: pill, JetBrains Mono, uppercase, small (e.g. `★ Most Popular` = blue fill).
- **Sticky header**: transparent → blurred dark on scroll, logo left, pill nav, flag dropdown, CTA button; mobile hamburger.
- **Hero**: big bilingual headline with gradient span, subtitle, 2 CTAs, stats row (mono numbers + muted labels).
- **Feature cards**: icon + mono label + title + muted description.
- **Pricing**: tabbed Bot / Minecraft (pill tabs), 3–5 cards, featured card = blue border + ring + badge; price renders as `0.5$` using `.currency{order:2}` + `.amount{order:1}`.
- **Location featured card**: full-width, blue ring + `radial-gradient` blue glow top-right; flag image 22×15 (radius 3px, thin border) next to mono code `DE · FRA`; pill badge underneath.
- **Team card**: 44px round avatar (img `object-fit: cover`; letter fallback on error) + name (600) + muted server name.
- **Footer**: logo + link columns + a highlighted "Join the Discord" card + mirrored flag switcher.
- **Back-to-top**: circular button, bottom-right, shows on scroll.

## 7. Language / RTL (design behavior)
- Custom language dropdown (NOT native `<select>`, NOT emoji): pill button + menu list, real flag images (`assets/united.png` EN / `assets/saudi.png` AR), chevron SVG, click-outside closes.
- RTL: `<html lang="ar" dir="rtl">`; right-align body, section-head, hero subtitle, stats.
- Logo text must never flip in RTL: `direction: ltr; unicode-bidi: isolate;`.

## 8. Language switching — implementation to save & reuse
- Mark translatable text with `data-i18n="key"` (plain text) or `data-i18n-html="key"` (HTML allowed, e.g. `<span class="gradient-text">`). The English value is the default content in the markup, so the page works even without JS.
- Keep a `translations = { en: { key: value }, ar: { key: value } }` dictionary keyed by the same `data-i18n` keys.
- `applyLanguage(lang)`: loop `[data-i18n]` → `el.textContent = dict[key]`; loop `[data-i18n-html]` → `el.innerHTML = dict[key]`; swap flag image + label; toggle `.active` on the selected `.lang-option`; set `htmlEl.lang` and `htmlEl.dir` (`rtl` for ar / `ltr` otherwise); persist to `localStorage`.
- Persist the choice in `localStorage` under a site-scoped key (e.g. `spark-lang`), restore on page load inside try/catch, fall back to `en`.
- Fire `document.dispatchEvent(new CustomEvent("spark:lang"))` after applying, so dynamic content (team cards, server stats, …) can re-render on language change.
- Flag assets: `assets/united.png` (EN) and `assets/saudi.png` (AR), displayed 22×15, radius 3px.

## 9. Icon / logo style
- Mini creeper service icon: blue rounded SVG face (gradient `#6b8aff→#3b5eff` head, `#0a1a3d` pixel eyes/mouth).
- Logo shown as fixed 40×40 rounded square (radius 12px, subtle border).