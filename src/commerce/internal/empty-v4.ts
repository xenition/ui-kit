/**
 * The commerce empty-state presets, shared by **both twins**.
 *
 * Copy, not markup — no React and no platform in here, so the native twin can
 * read it without dragging a web component into its bundle.
 *
 * ## Why a component ships copy at all
 *
 * Normally it should not. The exception §15 argues for is that an empty state
 * is *made of* its copy: "what belongs here, why it matters, and what to do
 * next" is the component, and a kit that ships the layout but leaves the three
 * sentences to the caller ships `title="No data"` in every app that uses it —
 * which is the exact failure mode §15 names.
 *
 * There are five of these because there are five empty screens a store
 * actually has. Every string is overridable per call, and `kind` is optional,
 * so nothing here is a ceiling.
 */

import type { IconName } from '../../primitives/icon-names';

/** The empty screens a store actually has. */
export type CommerceEmptyKind = 'cart' | 'orders' | 'catalog' | 'search' | 'wishlist';

export interface CommerceEmptyPreset {
  /** The categorical glyph, from the kit's named set. */
  icon: IconName;
  /** What belongs here. */
  title: string;
  /** Why it matters, and what to do next. */
  description: string;
}

/**
 * Preset per kind.
 *
 * Each description ends on the **action**, because that is the only one of the
 * three sentences that changes anything (§15) — and each is written as a fact
 * about the store rather than an apology, which is the register the reference
 * screens use.
 */
export const COMMERCE_EMPTY_PRESETS: Record<CommerceEmptyKind, CommerceEmptyPreset> = {
  cart: {
    icon: 'cart',
    title: 'Your cart is empty',
    description: 'Anything you add will show up here, ready to check out.',
  },
  orders: {
    icon: 'document',
    title: 'No orders yet',
    description: 'Once you place an order, you can track it from here.',
  },
  catalog: {
    icon: 'tag',
    title: 'Nothing in this collection',
    description: 'New products land here as soon as they are published.',
  },
  search: {
    icon: 'search',
    title: 'No matching products',
    description: 'Try a shorter search, or clear a filter to widen the results.',
  },
  wishlist: {
    icon: 'heart',
    title: 'Nothing saved yet',
    description: 'Save a product and it will be waiting here when you come back.',
  },
};
