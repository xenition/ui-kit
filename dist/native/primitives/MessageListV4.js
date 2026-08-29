"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListV4 = MessageListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * `MessageList`, V4 — the same props, and a thread that reads as one
 * conversation.
 *
 * ## Rhythm
 *
 * The base separates messages by `spacing.md` here and `gap-3` on the web —
 * two different numbers, neither of them the same idea twice. V4 uses `sm` on
 * both.
 *
 * Tighter is the design decision, not just the smaller number: a bubble already
 * carries its own padding, so the visible space between two turns is the gap
 * *plus* two paddings. At the base's spacing that reads as a column of separate
 * blocks; at `sm` it reads as one conversation with turns in it, which is what
 * a thread is (§9 — let spacing say the structure).
 *
 * The viewport keeps `lg` of padding.
 *
 * ## No ground
 *
 * The list paints nothing. It is the page the bubbles are on, and a chat
 * viewport that fills itself with `surface` puts a second surface behind
 * bubbles that are already `surface` — §11's container that has not earned
 * itself, and §8's nesting.
 *
 * ## One behaviour worth naming
 *
 * `keyboardShouldPersistTaps="handled"`. Without it, the first tap on a message
 * while the keyboard is up is swallowed dismissing the keyboard, and the thing
 * the user actually pressed — a link in a message, a retry on a failed send,
 * the bubble's own `onPress` — needs a second tap that most people never make,
 * because the first one *looked* like it did something. §31 asks for familiar
 * interactions, and every chat app on both platforms behaves this way.
 *
 * There is no React Native equivalent of the web twin's `role="log"`, so this
 * twin does not claim one. Naming the gap is better than inventing a role that
 * announces nothing.
 */
function MessageListV4({ style, contentContainerStyle, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: [{ flex: 1 }, style], contentContainerStyle: [
            { gap: tokens.spacing.sm, padding: tokens.spacing.lg },
            contentContainerStyle,
        ], 
        // Let a tap reach the message it landed on rather than spending itself
        // dismissing the keyboard.
        keyboardShouldPersistTaps: "handled", ...rest, children: children }));
}
//# sourceMappingURL=MessageListV4.js.map