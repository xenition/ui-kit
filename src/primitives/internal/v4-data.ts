/**
 * Shared plumbing for the **V4 data-display line** (`TableV4`, `DataTableV4`,
 * `ListV4`, `DescriptionsV4`, `TreeV4`, `StatisticV4`, `CodeBlockV4`, …).
 *
 * Dense data is where premium design most often goes wrong: it gets prettier
 * and slower to read. `design.md` §33 asks that a screen be scannable before it
 * is readable, and §34 that density match the product — a table IS the dense
 * product, so the V4 answer is never "more air and a card around every row".
 * It is alignment, a consistent baseline, and spacing doing the work borders
 * were doing (§9).
 *
 * Three things live here because every table-shaped component needs the same
 * answer and must not each invent one:
 *
 * 1. **Which column is a quantity** — {@link isNumericText},
 *    {@link isNumericColumn}. Right-aligned, tabular numerals. A column of
 *    numbers whose decimal points do not line up cannot be compared by eye at
 *    all, and that comparison is the entire reason the column is on screen.
 * 2. **A zebra that survives dark mode** — {@link ZEBRA_MIX} and the web
 *    recipe {@link zebraCss}. Derived from the two scheme-resolved neutral
 *    slots (`surface` → `onSurface`), never from `tokens.ramps`, which carries
 *    the LIGHT orientation in both schemes and would paint a near-white band
 *    across a dark page.
 * 3. **How faint a structural rule may be** — {@link RULE_MIX}, the one
 *    hairline a V4 table keeps.
 *
 * Everything here is pure and is imported by the **native** twins as well as
 * the web ones, exactly as `v4-depth`'s pure half already is.
 */

import { V4_STATE } from './v4-state';

/**
 * A cell's text, matched against what a formatted quantity actually looks
 * like: an optional short prefix (a currency mark), a sign, digits with
 * thousands separators, an optional decimal tail, and an optional short suffix
 * (`%`, a unit).
 *
 * The affixes are capped at three characters on purpose. Without the cap
 * `Order #A12` reads as a number, and the whole column swings right — a
 * mis-detection is worse than no detection, because the reader stops trusting
 * the alignment as a signal.
 */
const NUMERIC = /^[^\d]{0,3}[+-]?\d[\d\s,_]*(\.\d+)?\s*[^\d]{0,3}$/;

/**
 * Does this cell text read as a quantity?
 *
 * Deliberately conservative: an ISO date (`2026-08-26`) is not a quantity —
 * its parts are not comparable by magnitude — and neither is an ID that
 * happens to end in digits.
 */
export function isNumericText(text: string): boolean {
  const t = text.trim();
  if (t === '') return false;
  return NUMERIC.test(t);
}

/**
 * Is this whole column a quantity?
 *
 * `values` is the column's cell text for the rows actually on screen. A column
 * qualifies when at least one cell carries a value and **every** value that is
 * present reads as a quantity — one stray label is enough to disqualify it,
 * because a half-aligned column is noise rather than structure.
 *
 * The point of deriving this rather than taking an `align` prop: a V4 twin
 * takes exactly the base component's props, and alignment is a fact about the
 * data, not a decision the caller should have to repeat per column. A column
 * with a custom `render` opts out on its own — its content is a node, not
 * text, and the component never guesses at it.
 */
export function isNumericColumn(values: readonly string[]): boolean {
  let seen = false;
  for (const v of values) {
    if (v.trim() === '') continue;
    if (!isNumericText(v)) return false;
    seen = true;
  }
  return seen;
}

/**
 * How much `onSurface` a zebra band carries.
 *
 * Small enough that a band is a tracking aid rather than a second surface —
 * §7, reduce visual noise — and derived rather than picked so it inverts with
 * the scheme for free: in light it darkens the row, in dark it lightens it.
 */
export const ZEBRA_MIX = 0.04;
/**
 * Is this a **control** column rather than a data column?
 *
 * A column with no header and a custom renderer is the row-actions column
 * every CRUD table grows: Edit, Delete, a kebab. It carries no heading because
 * there is nothing to call it, and no text because it is buttons.
 *
 * The base tables give it `flex: 1` — the same width as Name or Amount — so on
 * a four-column table a quarter of the width goes to two ghost buttons and the
 * data gets squeezed. §33 says the data is what the reader is scanning; a
 * control column should take the width its controls need and not one pixel
 * more. Derived, not declared: a V4 twin takes exactly the base props, and
 * "unlabelled column of rendered controls" is already visible in the column
 * definition.
 */
export function isControlColumn(header: unknown, hasRender: boolean): boolean {
  if (!hasRender) return false;
  return header === '' || header === null || header === undefined || header === false;
}


/**
 * How much `onSurface` the one structural rule under a header carries.
 *
 * A V4 table keeps exactly one horizontal rule — the one that separates the
 * labels from the data. Every other separation is spacing and alignment (§9),
 * because a grid of borders costs a line of ink per row and buys nothing the
 * eye was not already getting from the baseline.
 */
export const RULE_MIX = 0.18;

/**
 * The web spelling of a derived neutral tint: `color-mix` over the two
 * scheme-resolved custom properties.
 *
 * `--xen-surface` and `--xen-on-surface` are both re-emitted under
 * `[data-theme="dark"]`, so a value mixed from them follows the scheme with no
 * dark-mode rule of its own — which is the whole reason a V4 table never
 * reaches for `--xen-neutral-50`.
 */
export function zebraCss(mix: number): string {
  return `color-mix(in srgb, var(--xen-on-surface) ${Math.round(mix * 100)}%, var(--xen-surface))`;
}

/**
 * The web spelling of a derived **brand** tint: `color-mix` of `--xen-primary`
 * into `--xen-surface`.
 *
 * Both are re-emitted under `[data-theme="dark"]`, so a selected row follows
 * the scheme with no dark rule of its own — and because the mix is composited
 * against `surface` rather than laid over it with alpha, the row owns its
 * colour instead of borrowing whatever it happens to sit on.
 */
export function primaryTintCss(mix: number): string {
  return `color-mix(in srgb, var(--xen-primary) ${Math.round(mix * 100)}%, var(--xen-surface))`;
}

/**
 * How much `onSurface` a hovered row carries — M3's hover state layer.
 *
 * Not a number this file picked. `V4_STATE.hover` is `0.08`, from
 * `material-components/material-web`,
 * `tokens/versions/v0_192/_md-sys-state.scss` (fetched 2026-08-26). It happens
 * to be twice the zebra, which is why a row under the pointer reads as *this
 * one* against banded neighbours rather than merging into the next band — but
 * the reason it is 0.08 is that every hover in the kit is now 0.08.
 *
 * Focus is a **different** layer at `0.12`; see {@link FOCUS_MIX}. The two used
 * to share this constant, which is why a keyboard user could not tell a focused
 * row from a hovered one.
 */
export const HOVER_MIX = V4_STATE.hover;

/**
 * M3's focus state layer, `0.12` — stronger than hover on purpose, so a
 * keyboard-driven row is distinguishable from a pointed-at one.
 */
export const FOCUS_MIX = V4_STATE.focus;

/**
 * How much `primary` a **selected** row carries.
 *
 * Enough to read as chosen against its neighbours, nowhere near enough to
 * repaint the row. A tree or a list that fills the selected row with solid
 * `primary` wins the "which one" question and loses the structure with it —
 * the indentation, the caret and the label all disappear under a brand bar.
 * §35.6 asks that colour create hierarchy rather than noise, and a tint plus a
 * weight change says "this one" without shouting it.
 */
export const SELECT_MIX = 0.12;

/** The one `<style>` id every V4 **row**-shaped component shares. */
export const V4_ROW_STYLE_ID = 'xen-v4-row-styles';

/**
 * The web sheet behind every V4 row list — `ListV4`, `DescriptionsV4`,
 * `TreeV4`, `TimelineV4`.
 *
 * One rule, and it exists because the base row lists all reach for
 * `hover:bg-neutral-50`. That class is the light-oriented ramp: under
 * `[data-theme="dark"]` the emitted `--xen-neutral-50` is mirrored to the far
 * end, so the hover is a near-white slab across a dark row. Mixing
 * `--xen-on-surface` into `--xen-surface` instead follows the scheme by
 * construction — it darkens a light row and lightens a dark one, with no dark
 * rule to keep in step.
 *
 * A hovered or focused row **tints**; it never lifts. Depth marks a layer, and
 * a row in a list is not a layer.
 */
export const V4_ROW_CSS = `
[data-xen-v4-row][data-interactive="true"]:hover {
  background-color: ${zebraCss(HOVER_MIX)};
}
[data-xen-v4-row][data-interactive="true"]:focus-visible {
  background-color: ${zebraCss(FOCUS_MIX)};
}
[data-xen-v4-row][data-interactive="true"] { cursor: pointer; }
/* Selection wins over hover: pointing at the chosen row must not un-choose it. */
[data-xen-v4-row][data-selected="true"],
[data-xen-v4-row][data-selected="true"]:hover {
  background-color: ${primaryTintCss(SELECT_MIX)};
}
`;

/** The one `<style>` id every V4 **monospace surface** shares. */
export const V4_CODE_STYLE_ID = 'xen-v4-code-styles';

/**
 * The web sheet behind the V4 monospace surfaces — `CodeBlockV4`,
 * `JsonViewerV4`.
 *
 * Code wants a **calm ground**: recessed just enough to read as quoted rather
 * than as more page, and never brand-tinted. It takes the same 4% neutral step
 * the tables band with, so the whole data-display line is recessed by one
 * amount instead of each surface picking its own — and because the step is
 * mixed from the two scheme-resolved slots it darkens a light page and
 * lightens a dark one with no dark rule.
 *
 * The gutter gets the one rule on the surface. A line number the reader is
 * counting to needs an edge to stop at; without it the numbers read as a first
 * column of code. Everything else is spacing (§9).
 *
 * **No gradient goes near a monospace surface.** §35.11 keeps gradients for a
 * hero and one primary action; a brand sweep behind code is decoration laid
 * over the one content in the kit that is read character by character.
 */
export const V4_CODE_CSS = `
[data-xen-v4-code-body] { background-color: ${zebraCss(ZEBRA_MIX)}; }
[data-xen-v4-code] [data-xen-v4-gutter] { border-right: 1px solid ${zebraCss(RULE_MIX)}; }
[data-xen-v4-code] [data-xen-v4-copy]:hover { background-color: ${zebraCss(HOVER_MIX)}; }
[data-xen-v4-code] [data-xen-v4-copy]:focus-visible { background-color: ${zebraCss(FOCUS_MIX)}; }
/* One guide per nesting level in a JSON tree — see JsonViewerV4 for why this
   is the one rule that earns itself against §9. */
[data-xen-v4-json-level] { border-left: 1px solid ${zebraCss(RULE_MIX)}; }
[data-xen-v4-json-branch]:hover { background-color: ${zebraCss(HOVER_MIX)}; }
[data-xen-v4-json-branch]:focus-visible { background-color: ${zebraCss(FOCUS_MIX)}; }
`;

/** The one `<style>` id every V4 table-shaped component shares. */
export const V4_TABLE_STYLE_ID = 'xen-v4-table-styles';

/**
 * The web sheet behind every V4 table: the single rule, the band, the sticky
 * header lift, and numeral alignment.
 *
 * It lives here rather than in one component because `TableV4`, `DataTableV4`
 * and `CrudTableV4` are one design line and must not each re-guess it — the
 * whole reason V4 exists is that the base line let each component pick its own
 * neutral. Every element that opts in carries `data-xen-v4-table`.
 *
 * None of these can be said as a utility class bound to a token: `color-mix`
 * over two custom properties, `position: sticky` on a `<th>`, a
 * scheme-switched `box-shadow`, and a structural `nth-child` selector that has
 * no per-element home. Every colour is still a `--xen-*` token or a mix of
 * two — the same recipe `BadgeV4` and `GlassPanel` use.
 */
export const V4_TABLE_CSS = `
[data-xen-v4-table] {
  --xen-v4-rule: ${zebraCss(RULE_MIX)};
  --xen-v4-zebra: ${zebraCss(ZEBRA_MIX)};
  --xen-v4-hover: ${zebraCss(HOVER_MIX)};
  --xen-v4-focus: ${zebraCss(FOCUS_MIX)};
}
[data-xen-v4-table] thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--xen-surface);
  border-bottom: 1px solid var(--xen-v4-rule);
  box-shadow: var(--xen-v4-lift-l, none);
}
[data-theme="dark"] [data-xen-v4-table] thead th { box-shadow: var(--xen-v4-lift-d, none); }
[data-xen-v4-table] tbody tr:nth-child(even) { background-color: var(--xen-v4-zebra); }
[data-xen-v4-table] tbody tr[data-clickable="true"] { cursor: pointer; }
[data-xen-v4-table] tbody tr[data-clickable="true"]:hover {
  background-color: var(--xen-v4-hover);
}
[data-xen-v4-table] tbody tr[data-clickable="true"]:focus-visible {
  background-color: var(--xen-v4-focus);
}
[data-xen-v4-table] th[data-numeric="true"],
[data-xen-v4-table] td[data-numeric="true"] {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
`;
