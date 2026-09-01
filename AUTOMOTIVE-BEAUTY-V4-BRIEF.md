# `automotive` · `beauty` — the V4 brief

**25 components, two modules, two twins.** `automotive` (13) and `beauty` (12),
both on ❌ **0.7.0** — last touched at the V2/V3 rollout.

Written 2026-08-31 from a read of all 64 source files across the two twins,
against `VERTICALS-V4-BRIEF.md` (whose five defects recur here almost exactly),
`ONBOARDING-DESIGN-SPEC.md` + Addendum, `CHARTS-V4-BRIEF.md` and
`DESIGN-SYSTEM-REVIEW.md`.

One brief for two modules because they are the same shape of product: a
**status enum**, a **money figure**, a **rating** and a **person or object
card**, repeated. Ride-hailing and salon booking are the same anatomy with
different nouns.

---

## 1. The five that carried over

Measured, not assumed — each is a grep across `src/{automotive,beauty}` and
`src/native/{automotive,beauty}`:

| defect | automotive | beauty |
|---|---:|---:|
| raw `<Text>` with `fontSize: tokens.typography.scale.*` in place of the primitive | 20 files | 20 files |
| `colors.muted` / `tone="muted"` used as **ink** | 20 files | 19 files |
| press drawn as `opacity` (M3's *disabled* signal) | 10 files | 12 files |
| a hairline token used as a **surface** | 1 | 0 |
| a status enum typed `keyof SemanticColors`, so a **fill** slot lands on text | 5 enums | 5 enums |

The corrections are the ones the last pass settled: `TextV4`; the `*Text`
slots; `stateMix`/`pressOver`; and `toneInk()`.

`internal/tone-v4` is **promoted out of `agriculture`** in this pass. Three
modules needing the same tone-to-ink table is where a module-local helper stops
being local; `farm-v4` now delegates to it rather than a third copy existing.

## 2. What is wrong that is not on that list

### 2.1 Mismatched `on` pairs — `automotive/TripRoute`

```tsx
backgroundColor: colors[tone],        // 'primary' | 'success' | 'accent'
color: colors.onPrimary,              // …always onPrimary
```

The compiler guarantees `onSuccess` against `success` and `onAccent` against
`accent`. It guarantees **nothing** about `onPrimary` on either. A route's
destination marker is a `success` disc with `primary`'s ink on it, and whether
that is readable is luck. `onPair()` in `tone-v4` is the fix, and it is the
kind of defect a type cannot catch because both sides are `string`.

### 2.2 A comparison slider that cannot be slid — `beauty/BeforeAfter`

`variant="split"` draws a divider at `position` and offers **two −/+ buttons
that step 10% at a time**. There is no drag on native and no slider on web. A
before/after control is *the* gesture-first component in a beauty app, and this
one is a pair of nudge buttons.

V4 adds the real interaction on both twins and **keeps the nudge buttons**:
they are the keyboard and switch-control path, and dropping them to add a drag
would trade one group of users for another. Web gets a real
`<input type="range">` overlay, which brings arrow keys, Home/End and a spoken
value for free.

### 2.3 Ratings are stars and nothing else

`DriverRatingRow`, `StylistCard`, `ReviewCard` and `ProductRecommendation` all
draw `★★★★☆` and stop. The numeral — `4.9` — is what a low-vision user reads,
what a colour-blind user reads, and what everyone actually compares. Five
glyphs at `sm` is not a number.

V4 renders the value beside the stars, tabular, with the count where there is
one, and gives the group one accessible name rather than five loose glyphs.

### 2.4 A skeleton built from translucent ink

```tsx
backgroundColor: withAlpha(colors.muted, 0.25)
```

Six components. A translucent fill borrows whatever is behind it, so the same
skeleton is a different colour on a card, on a tinted band and over an image —
and `muted` is a ramp step to begin with. `skeletonFill()` is an opaque M3
state mix against the card's own ground.

### 2.5 Money is formatted but never aligned

Both modules already take `formatMoney`, which is right. None of them set
tabular figures, so a price list — the *whole* of `beauty/PriceListRow` — has
no shared edge to scan down. `PriceListRow` is also missing the struck
compare-at treatment `PriceTagV4` settled, despite carrying `compareAtCents`.

### 2.6 Hard-coded status vocabulary

`Available` · `Occupied` · `Reserved` · `Out of service` · `Requested` ·
`Arriving` · `In trip` · `Completed` · `Upcoming` · `Due now` · `Overdue` ·
`Cancelled` · `No-show` · `In use` · `Maintenance` · `Offline` · `OK` ·
`Attention` · `Critical` · `Unknown` — twenty words in `automotive` alone,
none reachable from a host that localizes.

## 3. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** The only bare
   numbers are geometric, named, and carry the reason.
2. **A V4 is a new `*V4.tsx` beside its base.** The base file is not edited.
3. **Compose the V4 primitives and the shared internals** — `TextV4`,
   `CardV4`, `BadgeV4`, `IconV4`, `AvatarV4`, `ProgressV4`, `ButtonV4`, and
   `row-v4` / `tone-v4` / `state-v4`.
4. **Web and native twins keep prop parity** — same props, same names, same
   defaults; the permitted splits are `onPress`/`onClick` and
   `style`/`className`.
5. **Status colour is reserved.** A vehicle that is `offline`, a service that
   is `overdue` and a slot that is `booked` genuinely mean bad; a treatment
   *category* does not, and takes the brand slot.
6. **Every component survives its empty state** — no items, no price, no
   rating, no image, zero stars.
7. **Copy is caller-supplied.** Every English string a host cannot reach
   becomes an optional prop with today's string as the default.
8. **`weight` comes from the scale.** `fontWeight: '800'` appears in both
   modules; the scale stops at `bold`.

## 4. Done means

- `npx tsc --noEmit` clean, `npx jest` green.
- One grouped spec per module per twin, covering the new props **and** the
  empty states, and pinning §2.1 and §2.2 as regressions.
- `COMPONENTS.md` reads 13/13 and 12/12 ✅, with the defect tables.
