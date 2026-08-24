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
exports.ConditionBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
// The web `Badge` has no `accent` tone; `refurb` maps to `primary` (mirrors the
// "Icon has no accent → primary" web rule).
const CONDITION_TONE = {
    new: 'success',
    'like-new': 'primary',
    used: 'neutral',
    refurb: 'primary',
};
const CONDITION_LABEL = {
    new: 'New',
    'like-new': 'Like New',
    used: 'Used',
    refurb: 'Refurbished',
};
/**
 * A themed condition chip for a marketplace listing — `new` / `like-new` /
 * `used` / `refurb`. A thin, presentational wrapper over the shared `Badge` that
 * maps each grade to a semantic tone and a readable label, so condition is
 * conveyed by text (never color alone). Token-only colors via `Badge`.
 */
exports.ConditionBadge = React.forwardRef(function ConditionBadge({ condition, variant: _variant = 'soft', size: _size = 'md', label, ...rest }, ref) {
    const tone = CONDITION_TONE[condition] ?? 'neutral';
    const text = label ?? CONDITION_LABEL[condition] ?? String(condition);
    return ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { ref: ref, tone: tone, ...rest, children: text }));
});
//# sourceMappingURL=ConditionBadge.js.map