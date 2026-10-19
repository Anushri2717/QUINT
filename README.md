# QUINT.

**Five actives, one drop at a time.**

Pre-launch landing site for QUINT, a skincare brand that sells five face serums, each built around one active ingredient. The look, layout rhythm and tone follow [CHAPTER III](https://chp3.club/): a warm near-black base, heavy wide uppercase headlines, bold colour accents and a single "Get first access" call to action.

| Serum | Strength | Colour | When |
|---|---|---|---|
| Hyaluronic Acid | 2% + B5 | `#7cc6d6` aqua | AM + PM |
| Vitamin C | 10% | `#f28a26` orange | AM only |
| Niacinamide | 10% + Zinc 1% | `#a8c57c` sage | AM + PM |
| Alpha Arbutin | 2% + HA | `#eb9fae` blush | AM + PM |
| Retinol | 0.3% in Squalane | `#a184e6` violet | PM only |

## Pages

**`index.html`: home**

- Sticky nav with a Serums dropdown, a "Your picks" bag and the Get first access button
- Hero: light card over five serum-coloured stripes; hover a stripe to swap the bottle (it also rotates on its own)
- Scrolling marquee of the five actives
- The whole range in five lines (each % links to that serum)
- The idea: one ingredient, one dose, one answer
- Serum finder: pick a skin concern, get the matching serum
- Ritual: Cleanse. Drop. Seal.
- Line-up of all five bottles, with Niacinamide featured
- Measured dosing
- What's inside: an auto-rotating dial of the five actives
- AM / PM routine and the one rule (Vitamin C in the morning, Retinol at night)
- Retinol starter plan (week grid)
- Footer with the waitlist form

**Serum detail views.** The five product details are hidden on the home page and open one at a time from any serum link, e.g. `index.html#niacinamide`. Each view has a back link, a switcher for the other serums, and its own page title. The browser back button works too.

**`about.html`: about**

- The name: "Five is all your skin ever asked for." with five glowing bars
- Three chapters (Guessed, Overloaded, Chosen) and a closing call to action

## Project structure

```
QUINT/
├── index.html          Home page and serum detail views
├── about.html          About page (same nav, footer and styles)
├── css/styles.css      All styles: design tokens, layout, every section
├── js/main.js          All behaviour (one file, shared by both pages)
└── images/
    ├── *.jpg           Original Google Labs (ImageFX) product photos, 896 × 1200
    └── cutout/*.png    Same bottles cut out on transparent backgrounds (used on the site)
```

There is no build step and there are no dependencies. Fonts load from Google Fonts: Days One (headlines), Outfit (labels, nav and buttons), Instrument Sans (body text), Instrument Serif italic (taglines) and DM Mono (small data).

## Run it locally

Open `index.html` in a browser. To serve it over HTTP instead (closer to production):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Before launch

1. **Connect the waitlist.** The form posts to Formspree. Create a form at [formspree.io](https://formspree.io), then replace `YOUR_FORM_ID` in the footer form of **both** `index.html` and `about.html`. Until then the form validates the email and shows the thank-you message, but it sends nothing (the browser console logs a warning). Each signup also carries the visitor's "Your picks" selection in a `picks` field.
2. **Check the copy.** Some section copy was written for the site and is not from the brief. Review it before launch, along with the "30 ml" printed on the bottle labels.
3. **Check image terms.** The product photos were generated with Google Labs. Check Google's terms for commercial use and any AI-disclosure requirements.

## Updating product images

The site shows the transparent cut-outs in `images/cutout/`, not the original `.jpg` files. To replace a bottle, generate a new 3:4 portrait image on a plain dark background, save it as `images/<serum>.jpg`, and make a matching transparent PNG at `images/cutout/<serum>.png`.

File names: `hyaluronic-acid`, `vitamin-c`, `niacinamide`, `alpha-arbutin`, `retinol`.

## Notes

- **Responsive.** Layouts stack to one column on phones. The nav collapses into a menu below 1280px.
- **Reduced motion.** With reduced motion turned on, the hero rotation, marquee, dial rotation, bar animations and scroll fades are all switched off.
- **Accessibility.** The site has real alt text, visible keyboard focus, a skip link, and keyboard-operable dropdown, drawer and dial.
- **Caching.** CSS and JS links carry a `?v=` version tag. Bump it after editing either file so browsers load the new version.
