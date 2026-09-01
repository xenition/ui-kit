# `booking` · `media` · `agriculture` — the V4 brief

**18 components, three modules, two twins.** All three were on ❌ **0.7.0** — last
touched at the V2/V3 rollout, never given the shell, the token vocabulary or
the state model that landed in 0.9.0–0.13.0.

Written 2026-08-31 from a read of all 46 source files across the two twins,
against the house specs (`ONBOARDING-DESIGN-SPEC.md` + Addendum,
`ONBOARDING-V4-BRIEF.md`, `CHARTS-V4-BRIEF.md`,
`COMMERCE-MARKETPLACE-V4-BRIEF.md`, `DESIGN-SYSTEM-REVIEW.md`).

One brief for three modules because they turned out to have **one defect set**.
They are the same five mistakes, made 40-odd times.

---

## 1. The five defects, measured

Every row below is a grep, not an impression.

### 1.1 A raw `<Text>` with literal type, in place of the primitive

The single most common violation, and the reason these modules do not look like
the rest of the kit. `<Text style={{ color: colors.onSurface, fontSize:
tokens.typography.scale.base, fontWeight: '700', fontFamily:
tokens.typography.fontHeading }}>` is `<TextV4 face="heading" size="base"
weight="bold">` written out by hand — and written out by hand it drifts:
`fontWeight: '500'`, `'600'`, `'700'` all appear for what should be one step,
and `lineHeight: 20` is a literal in `media/MediaFigure`.

§10.2: do not hand-roll what `Text size=` already draws.

### 1.2 `colors.muted` used as ink

`muted` is `neutral[600]` and carries **no** contrast promise — the compiler
guarantees `onX`/`X` pairs only. It is the caption colour in all three modules:
every secondary line, every hint, every empty-state message. `mutedText` is
that same colour corrected to AA against `surface`, and it exists precisely
because components were doing this.

### 1.3 A ramp step used as a scheme-dependent fill

`tokens.ramps.neutral[100]` behind media, `tokens.ramps.primary[50]` as a
pressed slot, `tokens.ramps.neutral[950]` as a scrim. The native ramps carry
the **light** orientation in both schemes, so each of these is a pale rectangle
on a dark page. Mix from resolved semantic colours, or use `colors.muted` as
the placeholder ground — which is what `ProductCardV4` settled.

### 1.4 Press drawn as `opacity`

`opacity: pressed ? 0.85` (and `0.7`, and `0.6`, and `0.5` for disabled) fades
the control's **content** — which is the signal M3 spends 0.38 on to mean
*disabled*. A pressed card currently looks unavailable. M3's model is a **state
layer**: the component's own ink over its own container, at a fixed opacity.
`stateMix` / `pressOver` / `rowGround` already implement it.

### 1.5 `colors.border` used as a surface

`agriculture`'s loading skeletons are filled with the **hairline** token. A
divider colour asked to be a block reads as a hard bar on a high-contrast seed
and as nothing at all on a soft one.

## 2. What each module additionally gets wrong

### `booking`

- **The week view's chevrons do nothing.** `shiftView()` moves `viewDate` by a
  *month*; the week row is derived from `selectedDate ?? viewDate`, so with a
  date selected — the normal case — pressing ‹ or › changes nothing on screen.
- **Tap targets are under 44.** Calendar chevrons are 32×32 and day cells are
  36×36, both below the minimum every other module holds.
- **Today is not marked.** A booking calendar that cannot say "today" makes the
  user do the arithmetic.
- **No price anywhere.** `BookingSummary` lists who/when/how long and never what
  it costs, which is the line a confirmation screen exists to show.
- **A day of slots is an undifferentiated wall.** Thirty chips with no morning /
  afternoon / evening grouping.
- Hard-coded English: `'Your booking'`, `'With'`, `'Date'`, `'Time'`,
  `'Duration'`, `'Timezone'`, `'Nothing selected yet.'`, `'No times
  available.'`, `` `${n} left` ``, `` `${n} open` ``.

### `media`

- **The native twin ignores `kind` and `poster` completely.** `MediaItem` has
  carried `kind: 'image' | 'video'` and `poster` since it was written; the web
  twin honours both, and all three native components render `<Image source={{
  uri: item.url }}>` unconditionally. **A video item renders its `.mp4` URL as
  a broken image on every native screen in the kit.** This is a parity break
  and a bug, not a style gap.
- The kit ships no video player and must not. The honest native answer is the
  **poster** with a play affordance over it, and the press handed to the host.
- **Lightbox controls are 40×40** and the previous/next buttons are pinned at
  `top: '45%'` — a magic number that puts them off-centre on every aspect ratio.
- **No position indicator.** A viewer with twelve items never says which one.
- No safe-area inset on a full-screen modal.

### `agriculture`

- **`YieldChart` composes the base charts and passes a semantic colour as an
  identity** — `color: keyof SemanticColors`, defaulting to `success`. That is
  exactly what `CHARTS-V4-BRIEF.md` §2/§3 retired: `success` means *good*, not
  *series one*, and a chart that spends the status colour on identity has none
  left for meaning. V4 composes `BarChartV4`/`LineChartV4` and the validated
  palette.
- **Emoji inside copy** — `📍 {fieldLabel}`, `🗓️ {harvestLabel}` — concatenated
  into the string, so they cannot be tinted, cannot be replaced, and are read
  aloud by a screen reader as their CJK-ish names.
- **Eight of the twelve components are rows or cards** that each re-derive their
  own height, padding and press fill. `dashboard/internal/row-v4.ts` already
  decides all three, and it is what the V4 rows compose.
- Hard-coded English in ten components (`'Maturity'`, `'No yield data yet'`,
  `'No harvests logged'`, …).

## 3. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** Everything from
   `useXenitionTheme()` / the `--xen-*` custom properties. The only bare
   numbers are geometric — aspect ratios, flex factors, `1` for a hairline —
   and each is a named constant with the reason attached.
2. **A V4 is a new `*V4.tsx` beside its base.** The base file is not edited.
3. **Compose the V4 primitives**: `TextV4`, `CardV4`, `BadgeV4`, `IconV4`,
   `ProgressV4`, `CheckboxV4`, `BarChartV4`, `LineChartV4`, and the shared
   internals (`row-v4`, `field-v4`, `state-v4`, `surface-v4`).
4. **Web and native twins keep prop parity** — same props, same names, same
   defaults. The two permitted splits are the ones the base line already makes:
   navigation (`onPress` / `onClick`) and `style` / `className`.
5. **Status colour is reserved.** `success`/`warn`/`danger` mean good, caution
   and bad. Crop health, equipment state and pest severity genuinely *are*
   those meanings and keep them; a chart series is not, and does not.
6. **Every component survives its empty state** — zero slots, zero items, zero
   entries, no caption, no data. Renders nothing, or an empty state; never a
   blank bordered box.
7. **Copy is caller-supplied.** Every English string a host cannot reach becomes
   an optional prop with today's string as the default.

## 4. Done means

- `npx tsc --noEmit` clean, `npx jest` green.
- One grouped spec per module per twin, covering the new props **and** the
  empty states.
- `COMPONENTS.md` reads 3/3, 3/3 and 12/12 ✅, with the defect table.
