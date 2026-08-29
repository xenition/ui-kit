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
exports.SelectV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const field_v4_1 = require("./internal/field-v4");
/**
 * **V4 select** — the same props as {@link Select}, a different design line.
 *
 * It is still a real `<select>` with real `<option>` children, and the caret is
 * still the platform's. That is a decision, not an omission: an
 * `appearance: none` select has to redraw the caret from an asset, re-teach the
 * listbox to a keyboard, and re-implement the OS picker every mobile browser
 * already opens for it — three regressions bought with one arrow. §31 asks for
 * familiar interactions and §46 puts accessibility before styling, so the part
 * of this control the platform does better than we would is left alone.
 *
 * What changes is the field it sits in. The trigger takes `FIELD_V4_SHELL` —
 * `2xl` tall, `md` radius, `md` horizontal padding — which are the same numbers
 * `InputV4` takes, from the same shared constant. That is the whole point. A
 * form where the text field is 48px and the select is 38px reads as two
 * components that happen to be near each other; matching them is the single
 * cheapest thing a kit can do to make a screen look considered (§13).
 *
 * §8 bans excessive pill-shaped controls, so unlike `SwitchV4` this takes
 * `--xen-radius-md` straight off the seed and a `sharp` brand gets a square
 * select. A select is a box; only the switch is a pill.
 *
 * Focus is the shared V4 halo rather than the base's `ring-1`, which was a
 * hairline that read as a second border. It is drawn with `box-shadow`, so
 * arming it costs no layout (§36.11), and `invalid` retints the border and the
 * ring from the same flag so the two can never disagree.
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal.
 */
exports.SelectV4 = React.forwardRef(function SelectV4({ className, invalid = false, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    return ((0, jsx_runtime_1.jsx)("select", { ref: ref, "data-xen-v4-field": "", "aria-invalid": invalid || undefined, className: (0, cn_1.cn)(field_v4_1.FIELD_V4_SHELL, (0, field_v4_1.fieldBorderClass)(invalid), className), style: { ...(0, field_v4_1.fieldRingVars)(invalid), ...style }, ...rest, children: children }));
});
//# sourceMappingURL=SelectV4.js.map