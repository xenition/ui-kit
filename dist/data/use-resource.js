"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRIENDLY_ERROR = void 0;
exports.useResource = useResource;
const React = __importStar(require("react"));
/**
 * The single message shown for ANY load failure. Data-layer errors (network,
 * 5xx, thrown `AppClientError`) are collapsed to this — pages never surface
 * raw internals, and there's one string to translate/brand.
 */
exports.FRIENDLY_ERROR = 'We could not load this content right now. Please check your connection and try again.';
/**
 * Minimal data-loading hook for template pages. Runs `fetcher` on mount (and
 * whenever `deps` change), tracking `{ data, loading, error }`. Any rejection
 * is collapsed into {@link FRIENDLY_ERROR}. The in-flight result is dropped on
 * unmount / deps-change so a late resolve can't set state on a gone component.
 *
 *   const { data, loading, error } = useResource(() => api.cms.items('posts'), []);
 *
 * This is the framework half of the moved template data layer: pair it with
 * `@xenition/sdk/client` and a template writes zero hand-rolled fetch/hook code.
 */
function useResource(fetcher, deps = []) {
    const [state, setState] = React.useState({
        data: null,
        loading: true,
        error: null,
    });
    const [tick, setTick] = React.useState(0);
    const refetch = React.useCallback(() => setTick((t) => t + 1), []);
    React.useEffect(() => {
        let cancelled = false;
        setState({ data: null, loading: true, error: null });
        fetcher().then((data) => {
            if (!cancelled)
                setState({ data, loading: false, error: null });
        }, () => {
            if (!cancelled)
                setState({ data: null, loading: false, error: exports.FRIENDLY_ERROR });
        });
        return () => {
            cancelled = true;
        };
        // The fetcher identity is intentionally NOT a dep — callers pass an inline
        // closure and control re-runs through `deps` (+ `tick` from refetch()),
        // matching useEffect ergonomics.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, tick]);
    return { ...state, refetch };
}
//# sourceMappingURL=use-resource.js.map