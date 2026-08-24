/**
 * `@xenition/ui/data` — the React half of the moved template data layer.
 *
 * A tiny, unstyled loading/error/empty layer that pairs with
 * `@xenition/sdk/client` (the browser data client): the SDK fetches + types,
 * this hook tracks the request lifecycle and collapses failures to a friendly
 * message. Together a template renders SDK data with zero hand-rolled
 * fetch/hook/state code.
 */
export { useResource, FRIENDLY_ERROR } from './use-resource';
export type { ResourceState } from './use-resource';
export { Resource } from './Resource';
export type { ResourceProps } from './Resource';
//# sourceMappingURL=index.d.ts.map