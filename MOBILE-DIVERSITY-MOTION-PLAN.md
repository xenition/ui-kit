# Mobile diversity + motion overnight plan (from COMPONENT-ISSUES-AND-IMPROVEMENTS.md)

Goal (user, 2026-08-24 night → 10am): make same-type generated apps look **different**, not
identical — every domain component gets **multiple visual styles** — and add the **motion** the
audit says is 98.3% absent. **Mobile / React Native first, fully.** Web parity later.

Status: ⬜ not started · 🟨 in progress · 🟩 done

## The three levers (from the audit)
- **Part B — design sameness / classic-flat.** Fix by an `appearance` system + an elevation scale.
- **Part C — no motion.** Fix by reusable reduced-motion-aware hooks on the tapped/appearing components.
- **Part A — fill-as-text (~125 left in domain modules).** Fix opportunistically as agents touch each module: `color: colors.X` → `colors.XText` (the 0.4.0 tokens: primaryText/accentText/successText/warnText/dangerText).

## 🟩 Wave 0 — shared vocabulary (foundation, done: commit pending)
`src/native/primitives/internal/`:
- `elevation.ts` — `shadow('sm'|'md'|'lg'|'xl', tokens)` token-derived RN shadow (the E3 "depth is a token" scale).
- `appearance.ts` — `Appearance = classic|elevated|soft|outline|minimal|filled` + `appearanceStyle(appearance, colors, tokens)`. Default `classic` == old look (backward compatible).
- `motion.ts` — `usePressScale()` (tap spring) + `useEnter()` (fade/rise), both `useReducedMotion`-aware.
- `vocabulary.native.spec.tsx` — token-purity of every appearance + elevation + motion mount. 3/3 green.

## Per-module contract (every wave, native only)
For each domain module an agent owns, ADDITIVELY and backward-compatibly:
1. **Diversity:** add `appearance?: Appearance` (default `'classic'`) to the module's card/row/tile
   components; spread `appearanceStyle(appearance, colors, tokens)` onto the container (keep the
   component's own radius/padding). Where a component has a distinct layout choice, also add a
   `layout?`/`density?` variant (2–3 options) so the same data renders as genuinely different screens.
2. **Motion:** interactive cards/rows use `usePressScale`; list/feed items + banners/toasts use
   `useEnter`; expand/collapse uses `LayoutAnimation` or height transition. All via the shared hooks
   (never hand-rolled) so reduced-motion is automatic.
3. **Fill-as-text sweep:** any `color: colors.{primary,accent,success,warn,danger}` used as TEXT →
   the `*Text` token. Fills stay as-is.
4. Keep every existing prop/default identical. Update the module spec: assert a new appearance mounts +
   stays token-pure, and that press/enter motion mounts. Never weaken existing assertions.
5. Verify: `npx jest --selectProjects native --testPathPattern 'native/<module>'` green.


## ⚡ PIVOT (user, 2026-08-24 night): SEPARATE v2/v3 DESIGNS, not a param
The user does NOT want an `appearance` param on the same component. They want the frequently-used
domain/composed components to have **2-3 COMPLETELY DIFFERENT designs shipped as SEPARATE components**
(`<Name>` = v1, `<Name>V2`, `<Name>V3`) — same Props contract, drop-in swappable — so the generator
picks an entirely different component and same-type apps look genuinely different (chat page, cart,
post card, product card, …). The Wave-0 `appearance`/`elevation`/`motion` helpers stay (they're the
building blocks each new design composes) + the in-flight Wave-1 motion/fill-as-text fixes stay
(pure wins), but the PRIMARY deliverable is now the separate v2/v3 redesigns.

### v2/v3 contract (per frequently-used component)
- New files `src/native/<module>/<Name>V2.tsx` + `<Name>V3.tsx`. Original `<Name>.tsx` UNTOUCHED.
- SAME exported Props (`export type <Name>V2Props = <Name>Props` or identical shape) so they're
  drop-in — the generator swaps the import, nothing else.
- Each is a genuinely DIFFERENT design: different layout/hierarchy/structure/imagery/elevation —
  not a recolor. e.g. a card v1=bordered list row, v2=elevated media-hero card, v3=minimal
  borderless with a left accent. Use the shared appearance/elevation/motion helpers.
- Token-pure, RN-valid a11y, empty/loading states, guarded indexing. Export V2/V3 from the module index.
- Spec: render V2 + V3, assert mount + token purity (both seeds) + a key interaction.

## (superseded) appearance-param waves (native, ~6 modules each) — integrate each: full tsc+jest+build, commit, push develop, sync main
- ⬜ W1: social, chat, finance, health, productivity, travel
- ⬜ W2: learning, food, realestate, events, jobs, content
- ⬜ W3: streaming, onboarding, dating, gaming, crypto, smarthome
- ⬜ W4: weather, sports, marketplace, medical, crm, support
- ⬜ W5: automotive, insurance, pets, beauty, fieldservice, agriculture
- ⬜ W6: government, hr, survey, calendar, email, music
- ⬜ W7: photography, kids, wellness, legal, nonprofit, pos
- ⬜ W8 (core primitives motion, E4): Checkbox, RadioGroup, Segmented, ToggleGroup, Tabs, Accordion — state-change transitions (currently snap). + Toast/Banner/Alert enter-exit; Modal/ActionSheet rise.

## Release cadence
Bump the patch/minor and push periodically so it publishes via the mirror pipeline (publish-ui.yml →
public xenition/ui-kit → npm-publish). Generated apps pin `^0.3.0`/`^0.4.0` so minor/patch bumps flow.

## COMPLETE (2026-08-24 night)
**v2/v3 alternate designs shipped for ALL 45 native modules** — ~358 drop-in components (each `<Name>V2`/`<Name>V3` = a genuinely different layout, same Props). Published `@xenition/ui@0.6.0`. develop==main synced every wave. 2510 tests green. 8 waves (A–H): commerce/food/learning/content/marketplace/realestate · chat/social/finance/health/dating/streaming · travel/jobs/events/crm/medical/booking · onboarding/gaming/crypto/weather/sports/insurance · smarthome/automotive/pets/beauty/calendar/email · pos/support/hr/kids/wellness/music · government/survey/photography/legal/nonprofit/agriculture · fieldservice/logistics/utilities. Plus the shared appearance/elevation/motion vocabulary + the 0.4.0-audit contrast/motion fixes on 6 core modules.

## PHASE 2 — WEB PARITY of v2/v3 + cortex wiring (user, 2026-08-25: "complete Honest scope notes fully; do NOT bump version per wave — publish ONE final version after everything")
Native has ~358 v2/v3 designs; web has 0. Bring web to parity, then wire the generator to pick variants.
Release discipline this phase: integrate+test+commit+push develop+sync main every wave, but **NO version bump until the very end** — one final 0.7.0 publish after ALL work lands.
Brief: `$SP/web-variant-brief.md`.
- Web v2/v3 for 43 existing web modules + legal (44 mods × 3–4 components × V2/V3). Waves W1–W8.
- logistics + utilities: native-only, NO web module → build the FULL web module (12 base comps each) + v2/v3.
- productivity: no v2/v3 on EITHER side → add native + web v2/v3 (completeness).
- cortex `routes_assist.py`: tell web+native gen prompts to pick a V2/V3 for visual variety.
- FINAL: bump package.json → 0.7.0, publish via pipeline, bump cortex `_UI_VERSION` → ^0.7.0.

Wave assignments (web v2/v3, 1 agent/module):
- W1: social chat commerce finance food content
- W2: crm crypto dating email events fieldservice
- W3: health hr insurance jobs kids learning
- W4: marketplace medical music nonprofit onboarding pets
- W5: photography pos realestate smarthome sports streaming
- W6: support survey travel weather wellness gaming
- W7: agriculture automotive beauty booking calendar government
- W8: legal + logistics(full web) + utilities(full web) + productivity(native+web)

## Log
- 2026-08-24 night — synced develop→main (dev had left develop 16 behind at 0.4.0); Wave 0 vocabulary built + green (1984 tests).
- 2026-08-25 — Phase 2 web-parity started. develop==main==448d1bb, v0.6.0 live. No further version bump until final 0.7.0.

## PHASE 2 COMPLETE (2026-08-25) — WEB PARITY + cortex wiring + v0.7.0
- **Web v2/v3 for ALL 44 domain modules + logistics/utilities web modules built from scratch** — 366 web `<Name>V2`/`<Name>V3` drop-in alternate designs (same Props, genuinely different DOM/Tailwind, token-pure), each module with a `design-variants.spec.tsx`. Waves W1–W8 (W1–W2 + logistics/utilities via agents before the 200-agent session cap; W3 onward hand-authored).
- **productivity** got v2/v3 on BOTH native + web (it previously had none anywhere) → the native kit is now 100% v2/v3 across all 45 domain modules.
- **cortex `routes_assist.py`** — added a "VISUAL VARIETY … pick ONE design tier (base/V2/V3)" sentence to all 4 domain-module prompts (2 native + 2 web) so generated apps of the same type don't look identical.
- **Released `@xenition/ui@0.7.0`**; bumped cortex `scaffold.py` `_UI_VERSION` → `^0.7.0` (was `^0.3.0`, which under 0.x caret would NOT have allowed 0.4.0+). 2910 tests green, tsc clean, build OK. develop==main synced each wave.
