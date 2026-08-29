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
exports.AvatarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_depth_1 = require("./internal/v4-depth");
const identity_v4_1 = require("./internal/identity-v4");
const color_1 = require("../theme/color");
const compile_1 = require("../theme/compile");
const types_1 = require("../theme/types");
/**
 * The ring gap, the status-dot geometry and the two-scheme ground all need
 * either `calc()` or a `[data-theme="dark"]` switch, and none of the three is
 * expressible as a utility class bound to a token. Every colour in the sheet is
 * a custom property — a `--xen-*` token, or a `--xen-v4-*` this component
 * derived from the compiled theme — so the no-literal-colours rule holds.
 */
const AVATAR_V4_CSS = `
[data-xen-v4-avatar] {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: var(--xen-v4-d);
  height: var(--xen-v4-d);
}
[data-xen-v4-avatar-ring] {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: var(--xen-surface);
}
[data-xen-v4-avatar][data-ring="true"] [data-xen-v4-avatar-ring] {
  border: 2px solid var(--xen-v4-ring-l, var(--xen-primary));
  padding: calc(var(--xen-space-xs) / 2);
}
[data-theme="dark"] [data-xen-v4-avatar][data-ring="true"] [data-xen-v4-avatar-ring] {
  border-color: var(--xen-v4-ring-d, var(--xen-primary));
}
[data-xen-v4-avatar-face] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--xen-v4-ground-l);
  color: var(--xen-v4-ink-l, var(--xen-on-surface));
}
[data-theme="dark"] [data-xen-v4-avatar-face] {
  background-color: var(--xen-v4-ground-d);
  color: var(--xen-v4-ink-d, var(--xen-on-surface));
}
[data-xen-v4-avatar-dot] {
  box-sizing: border-box;
  position: absolute;
  right: var(--xen-v4-dot-inset);
  bottom: var(--xen-v4-dot-inset);
  width: var(--xen-v4-dot);
  height: var(--xen-v4-dot);
  border-radius: var(--xen-radius-full);
  border: 2px solid var(--xen-surface);
  background-color: var(--xen-v4-status-l, var(--xen-muted));
}
[data-theme="dark"] [data-xen-v4-avatar-dot] {
  background-color: var(--xen-v4-status-d, var(--xen-muted));
}
`;
const STATUS_SLOT = {
    online: 'success',
    away: 'warn',
    busy: 'danger',
    offline: 'muted',
};
const STATUS_VAR = {
    online: 'var(--xen-success)',
    away: 'var(--xen-warn)',
    busy: 'var(--xen-danger)',
    offline: 'var(--xen-muted)',
};
/** Spoken form of the presence state, so the dot is never colour-only (§46). */
const STATUS_LABEL = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
};
/**
 * Every neutral step spelled out, so Tailwind's scanner sees a real class and
 * the no-provider fallback still varies by name. The web's `--xen-neutral-*`
 * are emitted in the ACTIVE scheme's orientation, so one entry covers both.
 */
const GROUND_VAR = types_1.RAMP_STEPS.reduce((out, step) => ({ ...out, [step]: `var(--xen-neutral-${step})` }), {});
/** Where a circle's 45° edge sits, as a fraction of the diameter. */
const CIRCLE_INSET = (1 - Math.SQRT1_2) / 2;
/**
 * **V4 avatar** — the web twin of the native `AvatarV4`, same props as
 * {@link Avatar}, a different design line.
 *
 * The avatar is the single most-repeated component in a product — a roster, a
 * comment thread, an assignee column, a header — so every flaw in it is a flaw
 * the user meets a hundred times a day. Four things change:
 *
 * 1. **A derived monogram ground.** The base avatar paints every initials
 *    fallback `bg-primary-50 text-primary`, which makes a list of twelve
 *    people twelve identical brand-tinted discs — the accent does no work and
 *    the faces are indistinguishable. V4 derives the ground from the **name**
 *    (`monogramStep`, an FNV hash into the neutral ramp), so the same person is
 *    the same colour on every screen and their neighbour is not. Neutral, not
 *    a rainbow: §35.5 and §35.8 both say a list of twenty accents is noise.
 *    The exact hex is re-derived per scheme from the compiled theme and the
 *    monogram re-measured against it, so the pair is guaranteed rather than
 *    inherited from `primary-50`, whose contrast nobody checked in dark.
 * 2. **A fallback for "no name either".** `?` is what the base renders with
 *    nothing to go on, and a question mark reads as an error, not as an
 *    unknown person. V4 draws a silhouette from two token-coloured spans, so
 *    it tints with the theme instead of borrowing a platform emoji's palette.
 * 3. **A ring that is a halo, not a crop.** The base ring is `ring-2` sitting
 *    ON the portrait's edge. V4 insets the portrait and leaves a `surface` gap
 *    between it and the ring, which is how a ring is drawn when it means
 *    something. Its colour is contrast-checked at 3:1 — a ring is a UI
 *    boundary, judged at 3:1, not text.
 * 4. **A status dot that is not only a colour.** Four presence states told
 *    apart by hue alone fail §46 outright — and `busy` vs `offline` is exactly
 *    the pair a red-green viewer cannot separate. V4 names the state for a
 *    screen reader and contrast-checks the dot at 3:1 against `surface` rather
 *    than trusting the raw semantic slot, which is only ever guaranteed
 *    against its own on-pair. Its position follows the silhouette as well: on
 *    a circle the dot's centre sits on the 45° point of the arc, which is
 *    where the bounding box's corner happens to be at `md` and is not at `xl`.
 *
 * No gradient anywhere. §35.11 keeps those for the hero and the one primary
 * action, and a gradient behind someone's face is decoration on a data point.
 */
exports.AvatarV4 = React.forwardRef(function AvatarV4({ className, style, src, alt, name, size = 'md', shape = 'circle', status, ring = false, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-avatar-styles', AVATAR_V4_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
    const step = (0, v4_depth_1.monogramStep)(name);
    const mono = (0, identity_v4_1.initialsOf)(name);
    const vars = {
        '--xen-v4-d': identity_v4_1.AVATAR_DIAMETER[size],
        '--xen-v4-dot': identity_v4_1.AVATAR_DOT[size],
        // On a circle the corner of the box is empty space; the silhouette's edge
        // is at 45°, which is where a presence dot belongs.
        '--xen-v4-dot-inset': shape === 'circle'
            ? `max(0px, calc(var(--xen-v4-d) * ${CIRCLE_INSET} - var(--xen-v4-dot) / 2))`
            : '0px',
        // Varies by name even with no provider above us.
        '--xen-v4-ground-l': GROUND_VAR[step],
        '--xen-v4-ground-d': GROUND_VAR[step],
    };
    if (theme !== null) {
        // `theme.ramps` is the LIGHT orientation; dark reads the mirrored step, the
        // same inversion the compiler applies before deriving its dark semantics.
        const groundL = theme.ramps.neutral[step];
        const groundD = theme.ramps.neutral[(0, v4_depth_1.mirrorStep)(step)];
        vars['--xen-v4-ground-l'] = groundL;
        vars['--xen-v4-ground-d'] = groundD;
        vars['--xen-v4-ink-l'] = (0, color_1.ensureContrast)(theme.light.onSurface, groundL, compile_1.MIN_CONTRAST);
        vars['--xen-v4-ink-d'] = (0, color_1.ensureContrast)(theme.dark.onSurface, groundD, compile_1.MIN_CONTRAST);
        if (ring) {
            // A ring is a boundary, not text: 3:1 is the bar it has to clear.
            const seedL = status !== undefined ? theme.light[STATUS_SLOT[status]] : theme.light.primary;
            const seedD = status !== undefined ? theme.dark[STATUS_SLOT[status]] : theme.dark.primary;
            vars['--xen-v4-ring-l'] = (0, color_1.ensureContrast)(seedL, theme.light.surface, 3);
            vars['--xen-v4-ring-d'] = (0, color_1.ensureContrast)(seedD, theme.dark.surface, 3);
        }
        if (status !== undefined) {
            vars['--xen-v4-status-l'] = (0, color_1.ensureContrast)(theme.light[STATUS_SLOT[status]], theme.light.surface, 3);
            vars['--xen-v4-status-d'] = (0, color_1.ensureContrast)(theme.dark[STATUS_SLOT[status]], theme.dark.surface, 3);
        }
    }
    else if (status !== undefined) {
        vars['--xen-v4-status-l'] = STATUS_VAR[status];
        vars['--xen-v4-status-d'] = STATUS_VAR[status];
    }
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-v4-avatar": "", "data-ring": ring ? 'true' : 'false', className: (0, cn_1.cn)('align-middle', className), style: { ...vars, ...style }, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-v4-avatar-ring": "", className: identity_v4_1.AVATAR_SHAPE[shape], children: (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-avatar-face": "", className: (0, cn_1.cn)('font-body font-semibold', identity_v4_1.MONOGRAM_CLASS[size], identity_v4_1.AVATAR_SHAPE[shape]), children: src !== undefined ? ((0, jsx_runtime_1.jsx)("img", { src: src, alt: alt ?? name ?? '', className: "h-full w-full object-cover" })) : mono !== '' ? (mono) : ((0, jsx_runtime_1.jsx)(Silhouette, {})) }) }), status !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-avatar-dot": "", role: "img", "aria-label": STATUS_LABEL[status] })) : null] }));
});
/**
 * The "we know nothing about this person" mark: a head and a pair of
 * shoulders, both taking the face's own ink through `currentColor`, so it
 * tints with the theme. Held back to 40% — a placeholder that shouts is a
 * placeholder competing with the real faces beside it.
 */
function Silhouette() {
    return ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": true, className: "relative block h-full w-full opacity-40", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-1/2 top-[20%] h-[30%] w-[30%] -translate-x-1/2 rounded-full bg-current" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-1/2 top-[56%] h-[62%] w-[62%] -translate-x-1/2 rounded-full bg-current" })] }));
}
//# sourceMappingURL=AvatarV4.js.map