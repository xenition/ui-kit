# Motion — the V4 brief

**Six components on web, four on native, and the module is not four.** Every
build agent works against this file.

Written 2026-08-30 from a read of all 13 source files plus the shared motion
internals, immediately after the charts pass.

---

## 0. What the checklist gets wrong

`COMPONENTS.md` says **`motion` — 4 components**. That is the *native* count.
Web ships **six**: `Reveal`, `Stagger`, `Parallax`, `AnimatedCounter`,
`Marquee`, `TiltCard`. Native ships four — `Parallax` and `TiltCard` are
web-only.

This is the **same bookkeeping defect the charts pass just found, inverted**:
that table is generated from `src/native/*/index.ts`, so a module is counted at
whichever twin the generator walks. Charts had four components on native that
web lacked and the table over-counted web; motion has two on web that native
lacks and the table under-counts it. One generator, two silent miscounts. Fix
the row, and note the direction of the gap in it.

---

## 1. The finding that matters

**The motion module does not use the kit's motion scale.**

`src/primitives/internal/v4-motion.ts` exists because the V4 line had *seven
durations for four ideas* and three easings for one. It fixed that everywhere
except the module whose entire subject is motion:

| file | what it picked | what the scale says |
|---|---|---|
| `motion/Reveal.tsx` | `duration = 600`, `ease` | an arrival → `enter` 400, `EASE_ENTER` |
| `native/motion/Reveal.tsx` | `duration = 500` | the same arrival → the same 400 |
| `motion/Stagger.tsx` | `interval = 100` | `quick` — right number, typed by hand |
| `native/motion/Stagger.tsx` | `interval = 100` | same |
| `motion/TiltCard.tsx` | `200ms ease-out` | `standard` + `EASE_STANDARD` |
| `native/motion/AnimatedCounter.tsx` | `Easing.out(Easing.cubic)` | `EASING_ENTER` |

The `Reveal` row is the loud one: **the same component has a different default
duration on each twin — 600 on web, 500 on native.** A marketing page and its
app screen do not animate alike, and nothing in either file admits the other
exists. `v4-motion.ts` names `Easing.out(Easing.cubic)` explicitly as "what the
line reached for when it needed something decelerating", and it is still here.

The distances diverge too: web reveals from `24px` up, slides `32px`, zooms
from `0.92`, blurs `8px`; native reveals from `16`. Five literals and a twin
mismatch, in a file whose job is to be the one place motion is decided.

---

## 2. The ruling the scale needs before it can be applied

The M3 scale tops out at `enter` (400ms). `AnimatedCounter` runs 1500ms and
`Marquee` runs ~24 seconds. Neither is a violation, and forcing them onto the
scale would be wrong.

**The scale governs a *transition*: a thing moving from one state to another.
It does not govern *playback*: content that runs for as long as the content
takes.**

- `Reveal`, `Stagger`, `TiltCard` are transitions. They take the scale —
  duration *and* easing, no exceptions.
- `Marquee` is playback. Its duration is already derived correctly (content
  width ÷ speed) and stays that way. Its easing is `linear`, which is right:
  a loop that eases is a loop that visibly restarts.
- `AnimatedCounter` is playback with an easing. The duration stays a caller
  decision — a count from 0 to 12 and a count from 0 to 4,000,000 are not the
  same event — but the **easing comes from the scale** (`EASE_ENTER` /
  `EASING_ENTER`: a number arriving at its value is an arrival).
- `Parallax` is neither. It is a continuous mapping from scroll position to
  offset, with no duration at all.

State that ruling in `v4-motion.ts` as well as here, because it is the question
every future component will hit.

---

## 3. Rules that do not bend

Everything in `LAYOUT-DASHBOARD-V4-BRIEF.md` §1 and `ONBOARDING-DESIGN-SPEC.md`
§10 still applies. On top of it, for this module:

1. **Every duration and easing comes from `v4-motion.ts` / `motion-v4.ts`**,
   except the two playback cases named in §2, which say why in a comment.
2. **Distances come from the spacing scale.** `translate3d(0, 24px, 0)` becomes
   `spacing.lg`; the `32px` slide becomes `spacing.xl`; and the two twins use
   the same one. A scale factor (`0.92`) and a blur radius (`8px`) are
   geometry and may stay as named constants with a comment.
3. **Reduced motion is never "no transition".** The house rule from
   `design.md` §36.10 and the V4 surfaces: a large spatial move is replaced by
   a fade, not removed — an element that appears with no transition at all
   reads as a glitch. The current module *removes* it (`Reveal` renders
   instantly, `Marquee` sets `animation: none`). For `Marquee` that is correct
   — a loop has no still frame to fade to and an endless scroll is exactly what
   the setting is about. For `Reveal` it is not: it should fade at
   `V4_MOTION.standard`. Say which each one does and why.
4. **Prop parity across the twins, including defaults.** The `Reveal`
   600/500 split is the bug this rule exists to catch.
5. **Additive only.** A V4 is a new `*V4.tsx` beside its base, with a spec on
   both twins. The bases are not edited.
6. **SSR-safe and dependency-free.** No animation library, no `framer-motion`.
   The module's whole premise is CSS transitions plus one
   `IntersectionObserver` on web, and `Animated` on native.
7. **`Stagger` has no web spec at all.** Every V4 in this pass ships one on
   both twins.

---

## 4. Per-component

### `RevealV4` — both twins

The scale (`enter` 400 / `EASE_ENTER`), distances from `spacing`, and the same
defaults on both twins. Under reduced motion it **fades** at `standard` rather
than snapping. Keeps `once`, `threshold`, `effect`, and the `Stagger` context
it already reads.

### `StaggerV4` — both twins

`interval` defaults to `V4_MOTION.quick` — the number it already uses, said
properly. Worth one guard the base lacks: a stagger over a long list runs the
last child's delay past a second (`interval * index` is unbounded), so cap the
accumulated delay and document the cap. A list of forty items should not take
four seconds to finish arriving.

### `AnimatedCounterV4` — both twins

Easing from the scale (§2). Two things the base gets wrong beyond that:
the value is not announced to assistive tech at all, and a counter ticking
through hundreds of intermediate values is exactly the case for
`aria-live="off"` plus a final announced value — a screen reader should hear
"4,182", once, not four thousand numbers. Native's equivalent is
`accessibilityLiveRegion` and an `accessibilityLabel` carrying the final value.

### `MarqueeV4` — both twins

Playback, so the duration stays derived. Two real gaps: the web copy duplicates
`children` and marks the copy `aria-hidden` (correct) but native does not, and
`pauseOnHover` has no native counterpart — touch has no hover, so the native
twin takes `pauseOnPress`, which is the honest translation and also the
accessibility answer for a moving element a reader needs to stop.

### `ParallaxV4` — **and it gains a native twin**

The native barrel says `Parallax` is web-only because it "depends on scroll
position … with no direct React Native analogue". That is not true: an
`Animated.ScrollView` with `onScroll` mapped through `useNativeDriver` is the
canonical RN parallax and is the single most common scroll effect on mobile.
Build `ParallaxV4` on native, taking the scroll offset as an `Animated.Value`
prop so the caller owns the `ScrollView` — the component must not try to own
the scroll container it lives inside.

Clamp stays at ±0.5 with the reason kept: past it, content detaches from the
page.

### `TiltCardV4` — web only, and that stays true

Pointer tilt has no touch analogue — there is no hover, and a device-tilt
version driven by the accelerometer needs a peer dep and is a different
component with a different name. Document the exclusion in the native barrel
**with this reason**, replacing the current blanket sentence that also wrongly
covers `Parallax`.

Take `standard` + `EASE_STANDARD` for the reset; `perspective(800px)` and the
15° clamp are geometry and stay as named constants.

---

## 5. Done means

- `npx tsc --noEmit` clean, `npx jest` green.
- Every V4 has a spec on both twins covering: the new props, the reduced-motion
  path, and the SSR/no-`IntersectionObserver` path.
- No duration or easing in the module is a literal, except the two playback
  cases, which carry a comment saying why.
- The two twins agree on every default.
- `COMPONENTS.md`'s `motion` row says **6 web / 5 native** (after `ParallaxV4`)
  and names `TiltCard` as the deliberate web-only one.
