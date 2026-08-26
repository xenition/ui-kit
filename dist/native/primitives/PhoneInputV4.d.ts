import * as React from 'react';
import type { PhoneInputProps } from './PhoneInput';
export type { PhoneInputProps as PhoneInputV4Props };
/**
 * **V4 phone field** — the same props as {@link PhoneInput}, a different design
 * line.
 *
 * The mask is the good idea the base already had: the field shows
 * `(555) 123-4567` while `onChangeText` reports only `5551234567`, so the
 * caller never has to strip punctuation it did not ask for. §31 asks for
 * familiar interactions, and a phone number that formats itself as you type is
 * the most familiar input mask there is. V4 keeps it exactly.
 *
 * What changes:
 *
 * 1. **It is a field like the others.** `2xl` tall, `md` radius, `md`
 *    horizontal padding from the shared `fieldMetrics`, so a phone number under
 *    an email field shares its edge (§13).
 * 2. **Tabular figures.** A masked number is read in groups, and equal-width
 *    figures keep the groups the same width as the digits change — the number
 *    stops shuffling under the caret while it is being typed (§36.11), and a
 *    column of them scans (§33).
 * 3. **A real focus ring, and a divider that is a divider.** The halo rings the
 *    whole control, country code included, because the code is part of the
 *    control. The code is separated by a hairline in `border` — the same
 *    hairline the field's own edge uses — rather than by whitespace alone, so
 *    the two parts read as one control with two jobs (§9, spacing as
 *    structure).
 *
 * The country code is `muted`: it is context, not content, and the number is
 * the thing being read (§6). No gradient, no glass, no shadow — §16 asks that
 * forms stay minimal.
 */
export declare function PhoneInputV4({ value, onChangeText, countryCode, placeholder, invalid, disabled, accessibilityLabel, containerStyle, }: PhoneInputProps): React.ReactElement;
//# sourceMappingURL=PhoneInputV4.d.ts.map