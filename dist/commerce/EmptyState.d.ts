/**
 * `EmptyState` moved to `../primitives` — it is a primitive, not a commerce
 * concept: an empty cart is one of its cases, not its definition, and nearly
 * every screen in the kit renders one. This file stays behind as a re-export so
 * every `import { EmptyState } from '.../commerce/EmptyState'` already in the
 * wild keeps resolving. New code should import from `primitives`.
 */
export { EmptyState } from '../primitives/EmptyState';
export type { EmptyStateProps } from '../primitives/EmptyState';
//# sourceMappingURL=EmptyState.d.ts.map