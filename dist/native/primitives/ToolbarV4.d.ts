import * as React from 'react';
import type { ToolbarAction, ToolbarProps } from './Toolbar';
export type { ToolbarProps as ToolbarV4Props, ToolbarAction };
/**
 * **V4 toolbar** — same props as {@link Toolbar}, a different design line.
 *
 * ## A toolbar is not a pill
 *
 * §8 lists excessive pill-shaped controls among the tells of generic AI UI. A
 * `Segmented` thumb is a pill because the capsule IS that control; a toolbar is
 * a bar, and it keeps `radius.md` — the seed's own corner, 0 on a `sharp`
 * brand. Nothing inside it is capsuled either.
 *
 * ## Actions that are legible as actions
 *
 * The base painted every action with `colors.primary` — a FILL slot with no
 * contrast promise as text, so on a light-primary seed the toolbar's controls
 * were the least readable thing in it. V4 uses `primaryText`, the same hue
 * walked until it clears AA on the surface, and `dangerText` for a destructive
 * one. That leaves exactly two colours in the bar: the actions, and the one
 * that will delete something — different, not louder (§32).
 *
 * A disabled action drops to `muted` AND loses half its opacity, so the state
 * survives a reader who cannot separate the two colours.
 *
 * ## Reach
 *
 * Every action and the `⋯` toggle are 44pt targets composed from the spacing
 * scale. The base gave them `spacing.sm` of padding around a 14pt label —
 * about 30pt, and the `⋯` was the smallest target in the kit (§30).
 *
 * ## The overflow panel is a menu
 *
 * So it is skinned like one: `elevation.sheet` and the shared `panelSkin`, the
 * same altitude as `MenuV4` and the V4 sheets, because a kit where an overflow
 * menu and a dropdown menu look different has two answers to one question.
 * Glass applies only at `depth: 'glass'`; elevation is consumed
 * unconditionally, so a flat seed lands flat with no branch here.
 */
export declare function ToolbarV4({ title, actions, overflowActions, style, }: ToolbarProps): React.ReactElement;
//# sourceMappingURL=ToolbarV4.d.ts.map