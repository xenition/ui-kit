import * as React from 'react';
import type { CastButtonProps, CastButtonSize, CastButtonVariant } from './CastButton';
export type { CastButtonSize, CastButtonVariant };
/** Drop-in for {@link CastButtonProps} — same props, the V4 "spotlight" design. */
export type CastButtonV4Props = CastButtonProps;
/**
 * CastButton — **V4** "spotlight" design (web parity of the native V4). A
 * polished cast control: the glyph (plus a "Cast" / device-name label in the
 * `labeled` variant) sits in a ≥44px rounded tap target that lights up with a
 * soft `bg-primary/10` tint and a `primary` accent when **connected**, staying
 * plain otherwise. Keeps the base's variants (`icon` / `labeled`) and sizes,
 * and reports clicks via `onClick`. The `connected` state is reflected in the
 * color, `aria-pressed`, and accessible label ("Cast to a device" vs. "Casting
 * to <device>. Disconnect"). Token-only colors via `--xen-*` — no literal hex.
 */
export declare const CastButtonV4: React.ForwardRefExoticComponent<CastButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=CastButtonV4.d.ts.map