/**
 * `Spacer`, V4 (native) — **the base component, unchanged, under a V4 name.**
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5: *"Spacer — Structure only. Token-pure,
 * `aria-hidden` already correct. No visual change."*
 *
 * The native twin renders one inert `<View>` whose width and height come from
 * `tokens.spacing[size]` — read through `useXenitionTheme()`, so a re-scaled
 * seed re-scales every spacer with no V4 involved. The `'flex'` size spends
 * `flexGrow: 1, flexShrink: 1`, which are flex factors: geometric, and
 * correctly bare. No colour, no border, no radius, no type, no state.
 *
 * A `SpacerV4` that differed could only differ by changing what `size="md"`
 * means, which would silently move the layout of every caller who upgraded.
 * That change belongs in the compiled spacing scale, not in a second spacer.
 * So this is an alias — and it holds prop parity with the web twin for free,
 * because both sides alias a pair that was already at parity.
 *
 * Accessibility note carried forward: the view is hidden from the
 * accessibility tree (`accessibilityElementsHidden` on iOS,
 * `importantForAccessibility="no-hide-descendants"` on Android). A spacer is
 * furniture; VoiceOver reading the layout aloud is a defect.
 */
export { Spacer as SpacerV4 } from './Spacer';
export type { SpacerProps as SpacerV4Props } from './Spacer';
//# sourceMappingURL=SpacerV4.d.ts.map