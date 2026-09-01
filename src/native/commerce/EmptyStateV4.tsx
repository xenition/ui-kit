import * as React from 'react';
import { EmptyStateV4 as EmptyStatePrimitiveV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { COMMERCE_EMPTY_PRESETS } from '../../commerce/internal/empty-v4';
import type { CommerceEmptyKind, CommerceEmptyPreset } from '../../commerce/internal/empty-v4';
import type { EmptyStateProps } from '../primitives/EmptyState';

export { COMMERCE_EMPTY_PRESETS };
export type { CommerceEmptyKind, CommerceEmptyPreset };

/**
 * ## Two different components share this name — read this before editing
 *
 * - `native/primitives/EmptyState` and `native/primitives/EmptyStateV4` are
 *   **the** empty state: centred icon, headline, supporting line, one action.
 *   Every module in the kit renders one.
 * - `native/commerce/EmptyState` is a **re-export** of that primitive, left
 *   behind when it moved out of this module so old import paths kept
 *   resolving.
 * - `native/commerce/EmptyStateV4` — this file — is a **different thing**: a
 *   thin commerce skin over the primitive, and it draws none of the layout
 *   itself.
 *
 * The prop types are named to keep them apart in a stack trace:
 * `EmptyStateV4Props` here, `EmptyStatePrimitiveV4Props` for the thing it
 * composes.
 */
export type EmptyStatePrimitiveV4Props = EmptyStateProps;

export interface EmptyStateV4Props extends Omit<EmptyStateProps, 'title'> {
  /**
   * Which of a store's five empty screens this is. Supplies the glyph, the
   * headline and the supporting line — see `COMMERCE_EMPTY_PRESETS`.
   *
   * Everything it supplies is overridable: pass `title`, `description` or
   * `icon` and yours wins. Omit `kind` entirely and this component is the
   * primitive with a different import path.
   */
  kind?: CommerceEmptyKind;
  /**
   * Headline. **Optional here** where the primitive requires it, because
   * `kind` can supply one. With neither, the component renders nothing.
   */
  title?: React.ReactNode;
}

/**
 * **V4 commerce empty state (native)** — same props as the web
 * `EmptyStateV4`, including defaults. Composes `EmptyStateV4` from
 * `native/primitives` rather than re-drawing it, and adds the one thing a
 * domain module can usefully add: the words.
 *
 * ## Why it composes rather than redraws
 *
 * The base `native/commerce/EmptyState` predates `EmptyStateV4` and is a
 * re-export of an older primitive, so a store built on it gets the dashed
 * placeholder rectangle §11 and §8 both argue against, an icon that outranks
 * the action, and a headline at body size. All three are already fixed, once,
 * in `native/primitives/EmptyStateV4`. Redrawing any of it here would be a
 * second empty state to keep in step with the first.
 *
 * So this file owns exactly two decisions, and no layout at all.
 *
 * ## 1. The copy
 *
 * §15's argument is that an empty state is made of its three sentences — what
 * belongs here, why it matters, what to do next — and the third is the only
 * one that changes anything. A kit that ships the layout and leaves the
 * sentences to the caller ships `title="No data"`, which is the failure mode
 * §15 names. `kind` names the five empty screens a store actually has and
 * supplies all three, from the table both twins read, so an empty cart says
 * the same thing on a phone and on the web.
 *
 * ## 2. The glyph
 *
 * A **categorical** leading mark — it names *a kind of thing* — which §4.7
 * says is a soft tinted circular badge. `IconV4 badge="soft"` already owns the
 * wash, the circle and the glyph's measured contrast against that wash. A
 * caller's own `icon` is passed straight through untouched: a store's
 * illustration is the store's to colour.
 *
 * **Renders nothing when there is no headline** — no `title`, no `kind`. §4.5:
 * a component with nothing to say is not a box with nothing in it.
 */
export function EmptyStateV4({
  kind,
  icon,
  title,
  description,
  action,
  style,
}: EmptyStateV4Props): React.ReactElement | null {
  const preset = kind ? COMMERCE_EMPTY_PRESETS[kind] : undefined;

  const resolvedTitle = title ?? preset?.title;
  if (resolvedTitle === undefined || resolvedTitle === null || resolvedTitle === '') return null;

  const resolvedIcon =
    icon ?? (preset ? <IconV4 name={preset.icon} badge="soft" color="primary" /> : undefined);

  return (
    <EmptyStatePrimitiveV4
      icon={resolvedIcon}
      title={resolvedTitle}
      description={description ?? preset?.description}
      action={action}
      style={style}
    />
  );
}
