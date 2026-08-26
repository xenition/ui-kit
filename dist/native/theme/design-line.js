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
exports.DesignLineProvider = DesignLineProvider;
exports.useDesignLine = useDesignLine;
exports.resolveDesign = resolveDesign;
exports.designed = designed;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
/** Newest first. `resolveDesign` walks this in order and takes the first hit. */
const NEWEST_FIRST = ['v4', 'v3', 'v2', 'base'];
const DesignLineContext = React.createContext('base');
/**
 * Usually mounted for you by `XenitionUIProvider`. Nest it to override the
 * line for one flow — a marketing splash on `'v4'` inside an app that is
 * otherwise `'base'` — without touching the rest.
 */
function DesignLineProvider({ design = 'base', children, }) {
    return (0, jsx_runtime_1.jsx)(DesignLineContext.Provider, { value: design, children: children });
}
/**
 * The app's design line. Defaults to `'base'` rather than `'latest'` on
 * purpose: an app that never opts in must keep rendering exactly what it
 * rendered before, or a kit upgrade silently redesigns someone's product.
 */
function useDesignLine() {
    return React.useContext(DesignLineContext);
}
/**
 * Pick a component from its family for the given line.
 *
 * Falls back rather than throwing: asking for `'v4'` from a family that stops
 * at V2 gives you the V2, not a crash and not a blank screen. A missing design
 * is a gap in the kit, and an app should degrade to the nearest thing rather
 * than break because the kit has not caught up.
 */
function resolveDesign(set, line) {
    if (line === 'latest') {
        for (const candidate of NEWEST_FIRST) {
            const found = set[candidate];
            if (found)
                return found;
        }
        return set.base;
    }
    if (line !== 'base' && set[line])
        return set[line];
    // Walk DOWN from the requested line, so 'v4' on a family that stops at v2
    // lands on v2 rather than dropping all the way to base.
    const from = NEWEST_FIRST.indexOf(line);
    for (let i = from; i < NEWEST_FIRST.length; i += 1) {
        const step = NEWEST_FIRST[i];
        const found = step ? set[step] : undefined;
        if (found)
            return found;
    }
    return set.base;
}
/**
 * Build one component that follows the app's line.
 *
 * ```tsx
 * export const SignIn = designed({ base: SignInScreen, v2: SignInScreenV2, v3: SignInScreenV3 })
 * // <SignIn /> renders V3 under design="latest", base under design="base"
 * ```
 *
 * The explicit exports stay exported. An app that wants one exact design
 * imports it by name and is unaffected by the provider — which is what a
 * design system that is also a product dependency has to allow.
 */
function designed(set) {
    function Designed({ design, ...props }) {
        const line = useDesignLine();
        const Component = resolveDesign(set, design ?? line);
        return (0, jsx_runtime_1.jsx)(Component, { ...props });
    }
    const name = set.base.displayName ?? set.base.name ?? 'Component';
    Designed.displayName = `Designed(${name})`;
    return Designed;
}
//# sourceMappingURL=design-line.js.map