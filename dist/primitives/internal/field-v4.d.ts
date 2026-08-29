/**
 * The metrics and the focus ring shared by the **V4 form-control line** on the
 * web — `CheckboxV4`, `RadioGroupV4`, `SwitchV4`, `SelectV4`, `MultiSelectV4`,
 * `NumberInputV4`, `CurrencyInputV4`, `PasswordInputV4`, `PhoneInputV4`,
 * `PinInputV4` and `TextareaV4`.
 *
 * These are the controls a user touches most, and the single biggest quality
 * signal a form can send is that every control in it agrees. So the values that
 * decide whether two controls look like the same family — height, radius,
 * horizontal padding, the width and colour of the focus ring — are decided
 * **once**, here, rather than eleven times. They match the already-shipped
 * `InputV4`, so a text field, a select and a currency field stacked in one form
 * share an edge.
 *
 * ## Why the ring is a stylesheet and not a utility class
 *
 * The ring is a translucent mix of a custom property that changes with the
 * control's validity — a `color-mix()` over a `var()`, which no static class
 * can express. It is also injected rather than written inline because a CSSOM
 * that does not parse custom properties (jsdom, and SSR extractors built on
 * one) drops such a declaration from an inline `style` outright, silently
 * leaving the control unstyled. `GlassPanel`, the V4 surfaces and `InputV4` all
 * work this way; the form controls follow.
 *
 * Depth is absent on purpose. `design.md` §35.11 asks that gradients stay rare,
 * §8 lists glassmorphism-without-purpose among the tells of generic AI UI, and
 * §16 asks that forms stay minimal — a control the user is trying to type into
 * is the last place to spend a shadow.
 */
import type * as React from 'react';
/** The `<style>` id every V4 form control injects its ring from. Idempotent. */
export declare const FIELD_V4_STYLE_ID = "xen-v4-field-styles";
/**
 * How solid the focus halo sits, in percent.
 *
 * M3's focus state layer, 0.12, from `_md-sys-state.scss` v0_192 — not the 18
 * this file used to pick, which was the third opacity in the kit for the idea
 * "a control is responding". It mixes a **semantic** custom property, never a
 * ramp step: `--xen-primary-400` keeps the light-mode orientation under
 * `[data-theme="dark"]` and would be a near-white halo on a dark page.
 */
export declare const FIELD_HALO_PERCENT: number;
/**
 * How long a control takes to acknowledge a state change, in ms.
 *
 * `design.md` §36.2 puts small state transitions at 160–240ms and micro-feedback
 * at 100–180ms, and a checkbox filling or a switch throwing is the overlap of
 * the two — but a band is not a scale, and 160 was this file's guess inside it
 * while the picker line guessed 180 and the input guessed 140 for the same
 * idea. It is now M3's `standard`, 200ms, from `_md-sys-motion.scss` v0_192.
 */
export declare const FIELD_MOTION: number;
/**
 * Everything the V4 form controls paint that a class cannot say.
 *
 * `data-xen-v4-field` is for a control that takes focus itself (an input, a
 * select, a button trigger); `data-xen-v4-shell` is for a wrapper around a
 * control that takes focus (a currency badge beside its input), which is why
 * the two selectors differ only in `:focus` versus `:focus-within`.
 *
 * The ring is drawn with `box-shadow`, so arming it costs no layout and
 * focusing never nudges the page (§36.11 — do not move a control out from
 * under the finger). Under `prefers-reduced-motion` the transition is dropped
 * and the ring simply appears; the state is never carried by the animation
 * (§36.10).
 */
export declare const FIELD_V4_CSS: string;
/**
 * The ring colour for a control, as an element-scoped custom property.
 *
 * One function so a control can never paint a brand ring around a field it has
 * already outlined in red: the border class and this value read the same
 * `invalid` flag.
 */
export declare function fieldRingVars(invalid: boolean): React.CSSProperties;
/**
 * The shared skin of a full-width V4 control: `2xl` tall, `md` radius, `md`
 * horizontal padding, a hairline border and the surface behind it.
 *
 * Every number is a scale reference, so a `sharp` seed still gets square
 * corners and a re-scaled seed re-scales the whole form together.
 */
export declare const FIELD_V4_SHELL: string;
/** The border colour class for a control, given its validity. */
export declare function fieldBorderClass(invalid: boolean): string;
//# sourceMappingURL=field-v4.d.ts.map