# V4 Redesign Playbook

How we redesign a domain category into a **V4 design line** + **new components**, on **web and native**, fully token-driven. Follow this end-to-end to reproduce today's results. One category = roughly one focused session.

---

## 0. What "done" means for a category

A category is ✅ done when it has, on **both** `src/<cat>` (web) and `src/native/<cat>` (native):

1. A **V4 design line** — one drop-in `XxxV4` variant for **every** original component (the 12–14 base components; the ones that already have V2/V3 get a V4 too).
2. **6 new components** (travel shipped 3; pick ~6 for parity) — 3 of them **gradient "hero"** moments, 3 utility/composed pieces.
3. Native **internal helpers**: `internal/GradientSurface.tsx` + a ramp-derived palette file (e.g. `journey.ts`, `focus.ts`, `console.ts`, `register.ts`).
4. Both **`index.ts` barrels** export the V4 line + new components.
5. **design-variants specs** (web + native) extended with V4 mount + interaction + **dual-seed token-purity** coverage.
6. **COMPONENTS.md** row updated to the ✅/0.9.0 state.
7. A **demo tab** in `examples/native-demo` (its own `*_SEED` hue) — *gitignored, not committed.*
8. Verified: **full-library `tsc` clean**, **category tests pass**, **no hard-coded colors**.

Non-negotiables: **base/V2/V3 are never touched** — V4 is purely additive. Every color is a token. Web ↔ native prop parity.

---

## 1. The per-section recipe (the order that works)

Track it with the task tools — one task per step. The sequence below is deliberate: **validate the reference before fanning out**, so a convention error isn't replicated 15×.

### Step 1 — Examine
```
ls src/<cat> ; ls src/native/<cat>
grep -n "### \`<cat>\`" COMPONENTS.md      # count + variants + status
```
Read the **core component** (native) — the anchor you'll build the reference from (e.g. `TaskRow`, `PropertyCard`, `ProductGridTile`, `MatchScore`, `DeviceTile`). Note its imports, its own `internal.ts`/helpers, whether native `useXenitionTheme` comes from `'../theme'` or `'../primitives'` (**varies by module — always check**).

### Step 2 — Pick the identity + the 6 new pieces
Give the category a **one-word design identity** and a distinct visual signature (see §3). Choose 6 new components: **3 gradient heroes** (a header/dashboard, a results/summary, a peak/celebration) + **3 utility** (composer, strip/selector, feed/bar).

### Step 3 — Foundation (native helpers)
Create `src/native/<cat>/internal/GradientSurface.tsx` (copy verbatim from any existing category — only the doc comment changes) and `src/native/<cat>/internal/<palette>.ts` (copy `journey.ts`/`focus.ts` shape; rename functions). The palette exports: `xGradient(r)` `[500,600,700]`, an optional 2-hue `xCelebrate/xGlow(r)` `[accent400, primary600]`, `xInk`=`primary[50]`, `xInkSoft`=`primary[100]`, `xTile(r,α)`, `xBorder(r,α)`. Import `withAlpha` from `'../../primitives/internal/color'`.
> If the category already has a file named `internal.ts`, the `internal/` folder can coexist — `./internal` still resolves to `internal.ts`, and `./internal/<palette>` resolves into the folder. No conflict.

### Step 4 — Build ONE reference pair (web + native) yourself
Pick the anchor component, build `XxxV4` on both platforms. This is the template every subagent mirrors, so make the identity concrete. Then:
```
npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "<cat>|error TS"
```
**Do not proceed until this is clean.** (Run it in the background; wait for the notification.)

### Step 5 — Fan out with subagents
Spawn ~6 `general-purpose` subagents **in parallel**, each building a coherent group (2–3 V4 variants, or 3 new components) as web+native pairs. Each prompt MUST include:
- the exact **reference pair paths** to mirror,
- the **native import paths** (`useXenitionTheme` from `'../theme'` or `'../primitives'`; palette from `'./internal/<palette>'`; `GradientSurface` from `'./internal/GradientSurface'`; `withAlpha` location),
- the **base component paths** to read for exact props (`V4Props = BaseProps`, drop-in),
- the identity rules + the hard rules (token-only, forwardRef+cn on web, function+Pressable on native, a11y, ≥44px, gradient reserved for heroes),
- **"do NOT edit index.ts or any spec; do NOT run tsc/tests."**

Group them so no two agents write the same file. Agents read props themselves — never hand them guessed props.

### Step 6 — Wire the barrels
Confirm all files exist and grab exact export names (incl. sub-types) with web/native parity:
```
grep -hoE "export (interface|type|const) [A-Za-z0-9_]+" src/<cat>/<New>.tsx
```
**Check for type-name collisions** against the existing barrel before wiring (see §5). Append a V4 block + a "new components" block to **both** `index.ts` files.

### Step 7 — Verify gate
```
npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "error TS"          # must be empty
npx jest src/<cat> src/native/<cat>                                  # all pass
# color audit — see §4
```
Fix anything (see §5 gotchas), re-run.

### Step 8 — Specs + demo (parallel subagents)
One agent appends V4 spec coverage (mount + interaction + dual-seed token-purity, gradient pieces MUST be in the both-seeds aggregate). One agent builds `examples/native-demo/<Cat>Screen.tsx` + wires the tab in `App.tsx` (own `*_SEED`, runs the demo `tsc` clean). Both agents run their own checks and iterate until green.

### Step 9 — Update COMPONENTS.md, final gate, commit
Update the category row to the ✅/0.9.0 format. Run the **final consolidated gate** (full `tsc` + category jest). Then commit (see §6).

---

## 2. Verification gates (never skip)

- **`tsc --noEmit -p tsconfig.json`** — the whole library must typecheck. Run after the reference, after wiring, and finally. It's slow → run in background, wait for the notification.
- **`jest src/<cat> src/native/<cat>`** — 4 suites (base + design-variants, web + native). A suite that "fails to run" with N tests still passing = a **compile/import error** in a file the spec imports (usually a barrel type collision) — go read the TS error.
- **Color audit** (§4) — zero hex/rgb/hsl/literal-palette in the new files.
- **Token-purity spec** (native) — the strongest proof: every rendered hex traces to a compiled token, in **both** light and dark seeds. Gradient components must be in that aggregate render.

---

## 3. Identity conventions (what makes each V4 distinct)

Every category gets its own **one-word identity** + signature, but the mechanics are shared:
- **One accent** (`primary`); semantics only where meaning requires (success/warn/danger).
- **Elevated rounded cards**, generous 8-pt spacing, big legible numerals, ≥44px tap targets.
- **Status by glyph + color**, never color alone.
- **Gradient reserved for hero moments only** (headers, results, peaks) — rows/cards/lists stay clean surface. Web gradient = `bg-gradient-to-br from-primary-500 to-primary-700`, near-white ink `text-primary-50`/`text-primary-100`, frosted tiles `bg-primary-50/15 border border-primary-50/30`. Native = `GradientSurface` + palette helpers.

Identities used so far (pick a fresh word for the next one): wellness *calm* · weather *sky* · utilities (trust-first) · travel *journey* (boarding-pass) · survey *focus* (clean form) · support *console* (agent workspace) · streaming *spotlight* (artwork-forward) · sports *broadcast* (matchday) · social *feed* · smarthome *ambient* (active device glows) · realestate *listing* (editorial) · productivity *flow* (soft-success on complete) · pos *register* (tactile checkout, bold totals).

---

## 4. Color audit command (run on the new files only)

```bash
NEW=$(ls src/<cat>/*V4.tsx src/<cat>/<New1..6>.tsx \
         src/native/<cat>/*V4.tsx src/native/<cat>/<New1..6>.tsx \
         src/native/<cat>/internal/*.ts src/native/<cat>/internal/*.tsx 2>/dev/null)
grep -nE "#[0-9A-Fa-f]{3}\b|#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{8}\b" $NEW | grep -viE "radius|shadow"   # hex
grep -lE "\b(rgb|rgba|hsl|hsla)\(" $NEW                                                              # rgb/hsl
grep -lnE "(bg|text|border|from|to|via|ring|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|stone)-[0-9]" $NEW   # literal Tailwind palette
```
All three must be empty. **Excluded on purpose:** `primary`/`accent`/`neutral` are the kit's own token ramps (`bg-neutral-100`, `text-primary-50`, etc. are tokens, not literals). A `#4821`-style hit is usually a ticket-id example in a JSDoc comment, not a color — verify context.

---

## 5. Gotchas we actually hit (and the fixes)

- **Type-name collision in the barrel** (`TS2300 Duplicate identifier`). A new component's sub-type clashes with an existing one (`PlayerStat` from a new header vs `PlayerStatCard`'s `PlayerStat`; `ProfileStat`). **Fix:** alias it in the barrel — `export type { XProps, PlayerStat as PlayerProfileStat } from './X'`. Always grep the barrel for the sub-type names before wiring.
- **`HTMLAttributes` prop clash** (`TS2430 incorrectly extends`). React's `HTMLAttributes<HTMLDivElement>` already declares `onSelect`, `title`, `results`, `color`, `content`. A new component that extends it and declares its own `onSelect`/`title`/`results` collides. **Fix:** `extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'>`.
- **`Icon size="md"` is invalid.** Icon sizes are the type scale: `xs · sm · base · lg · xl · 2xl · 3xl` — there is **no `md`**. Use `base`.
- **`accessibilityRole="listitem"` doesn't exist in RN.** Valid list role is `"list"` only; drop the item role (or omit it).
- **Slider prop differs per platform.** Web `Slider` uses `onChange={(v)=>…}` + `disabled` (no `aria-label`, no `onValueChange`); native `Slider` uses `onValueChange`. Copy the base's per-platform usage.
- **Native type scale tops out at `3xl`** — no `4xl`/`xxl`. Web can use Tailwind `text-4xl` freely (independent of the token scale).
- **`Checkbox` differs:** web `onChange={(e)=>onToggle?.(e.currentTarget.checked)}`, native `onCheckedChange`.
- **Missing exported helper.** A new hero imported `clamp01` from a native `types.ts` that never exported it. **Fix:** add the export (additive). Grep imports vs exports if in doubt.
- **Stale Metro after adding an `internal/` folder.** New directories added while `expo start` is running aren't picked up. **Fix (dev-only):** `npx expo start -c --web` (clears the Metro cache and re-scans the tree). Not a code bug — `tsc`/tests are the source of truth.
- **`PriceTag` hardcodes `text-on-surface`**, so it can't render near-white on a gradient hero — use `formatMoney` + your own near-white text there.
- **`TONE_SOFT_BG.success/.danger` may fall back to a neutral tint** (no success/danger light ramp) — carry meaning with a glyph + `text-success`/`text-danger`, never color alone.

---

## 6. Commit convention (two commits per section)

Components first, docs second. Never commit the demo (it's gitignored).
```
git add src/<cat> src/native/<cat>
git commit -m "feat(<cat>): V4 \"<identity>\" line for all N components + 6 new components (web + native)"
git add COMPONENTS.md
git commit -m "docs(components): mark <cat> V4 line done in COMPONENTS.md"
```
Feature-commit body lists the V4 line, the new components, the native internal helpers, any collision/Omit fixes, and the passing test count. Every commit ends with:
```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```
On branch `feature/hasib` (not the default `develop`). Verify before each commit; nothing is pushed unless asked.

---

## 7. Demo tab seed colors already used (pick a new one)

weather `#0EA5E9` sky · wellness `#7C3AED` violet · utilities `#0D9488` teal · travel `#4F46E5` indigo · survey `#E11D48` rose · support `#475569` steel-blue · streaming `#DB2777` magenta · sports `#EA580C` orange · social `#2563EB` blue · smarthome `#D97706` amber · realestate `#047857` emerald · productivity `#6366F1` indigo-violet · pos `#DC2626` crimson.
Each `*_SEED` also sets `accent`, `neutral:'cool'`, `font: { heading:'System', body:'System' }`, `shape:'rounded'`, `mode:'both'`. Add the new tab to `TABS` + the render chain in `examples/native-demo/App.tsx`.

---

## 8. Status — done vs remaining

**Redesigned to V4 (✅):** wellness, weather, utilities, travel, survey, support, streaming, sports, social, smarthome, realestate, productivity, pos.
*(charts/commerce/marketplace/onboarding/primitives/layout/dashboard/motion/marketing are separate infra/large sections, not part of this domain-V4 sweep.)*

**Remaining domain categories (the same 12–13 components + 4 V2/V3 shape) — do these next, one per session:**
agriculture · automotive · beauty · calendar · chat · content · crm · crypto · dating · email · events · fieldservice · finance · food · gaming · government · health · hr · insurance · jobs · kids · learning · legal · logistics · medical · music · nonprofit · pets · photography.
**Odd shapes (handle separately):** `booking` (3 comps, 3 variants), `media` (3 comps), `marketing` (37 comps).

Pick the next category, then follow §1 top to bottom. The whole thing is mechanical once the reference pair is green — the risk is always in Step 4 (get the reference right) and Step 6 (barrel collisions).
