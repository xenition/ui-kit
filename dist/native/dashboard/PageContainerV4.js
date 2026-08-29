"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContainerV4 = PageContainerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const PageHeaderV4_1 = require("../layout/PageHeaderV4");
/**
 * `PageContainer`, V4 — the screen's outer wrapper: the warm page ground, the
 * §4.1 gutter, the safe areas, and the screen title block. Native twin of the
 * web `PageContainerV4`, at prop parity.
 *
 * ## ⚠️ The screen title is `PageHeaderV4` now, and it lost its hairline
 *
 * The base has its own title block — a raw `Text` at the `2xl` step with
 * `fontWeight: '700'`, and a subtitle in `colors.muted`, which is a decorative
 * *fill* being used as a text colour. `PageHeader` renders the same header at a
 * different ramp, so **the same screen header exists twice in the kit**, which
 * is §5's complaint about this component by name. V4 does not re-implement it;
 * it composes `PageHeaderV4` (§10.5), so there is one screen header and one
 * place its ramp is decided.
 *
 * Three consequences a caller can see, all intended:
 *
 * 1. **The title is bigger.** `PageHeaderV4` sets it at `3xl`, bold, in the
 *    seed's heading face (§5). The base's `2xl` tied the section headings below
 *    it, so the loudest thing on the screen was not the screen's name.
 *    {@link PageContainerV4Props.headerSize} takes it back down where a sheet
 *    or a secondary screen would rather it whispered.
 * 2. **The subtitle reads as text.** `colors.muted` → `mutedText`: the same
 *    quietness, walked until it clears AA.
 * 3. **There is no hairline under it, and adding one is opt-in.** §4.4: a
 *    separator groups rows *inside* a container, and **between free-standing
 *    blocks the structuring device is space, not a rule** — "a hairline under
 *    every screen title is admin styling", and it fights the warm airy ground
 *    of §3. {@link PageContainerV4Props.divided} defaults to **`false`** and
 *    puts the rule back verbatim when a surface genuinely needs the edge. This
 *    is the same deliberate exception to "additive only, defaults preserve
 *    today's rendering" that `PageHeaderV4` documents, for the same reason and
 *    with the same escape hatch.
 *
 * ## What else V4 changes
 *
 * **Parity, in both directions.** §5: "native has `scroll` and `bottomInset`,
 * web has neither. Close both." Both are on the web twin now with these
 * defaults, so the same screen is written the same way on both platforms.
 *
 * **The safe areas are a decision rather than a fact.** The base always paid
 * the top and bottom insets and never the horizontal pair.
 * {@link PageContainerV4Props.safeArea} pays all four and can be turned off
 * for a screen nested under something that has already paid them — twice-paid
 * insets are the gap under a tab bar nobody can explain.
 *
 * `useSafeAreaInsets()` is called unconditionally — hooks cannot be
 * conditional — and its result is only spent when `safeArea` is on, the same
 * shape `ContainerV4` and `AuthStickyFooterV4` use. It needs a
 * `SafeAreaProvider` above it, which Expo mounts by default.
 *
 * ## What it deliberately does not do
 *
 * **No shadow, no scroll-edge line** (§4.4, §4.6). A page is not a card, a
 * sheet, or the one dominant action.
 *
 * **It always paints.** §4.5's "render nothing when you have nothing" is for a
 * component with nothing to *say*; this one is the page itself, and a page that
 * collapsed because a screen had no title would take the screen with it. With
 * no title, no subtitle, no action and no children it renders exactly the
 * ground and the gutter — and `PageHeaderV4` renders `null` rather than holding
 * an empty block open above them.
 *
 * The ground is `colors.surface`, not `colors.card`: §4.2's split is *page =
 * surface, cards = card*, and this is the page.
 */
function PageContainerV4({ title, subtitle, headerAction, scroll = true, bottomInset = 0, safeArea = true, padding = 'lg', divided = false, headerSize = '3xl', icon, children, style, testID, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const gutter = tokens.spacing[padding];
    const header = (
    // `PageHeaderV4` types `title` as required and reads `''` as absent (it
    // returns `null` with nothing to show), so an untitled screen pays for no
    // header block at all.
    (0, jsx_runtime_1.jsx)(PageHeaderV4_1.PageHeaderV4, { title: title ?? '', subtitle: subtitle, actions: headerAction, divided: divided, size: headerSize, icon: icon }));
    // The gutter is paid on top of each inset, never `max()`ed with it — see
    // `safeArea`. `bottomInset` stacks on afterwards, as it did on the base.
    const pad = {
        paddingLeft: safeArea ? gutter + insets.left : gutter,
        paddingRight: safeArea ? gutter + insets.right : gutter,
        paddingTop: safeArea ? gutter + insets.top : gutter,
        paddingBottom: (safeArea ? gutter + insets.bottom : gutter) + bottomInset,
    };
    const ground = { flex: 1, backgroundColor: colors.surface };
    if (!scroll) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [ground, pad, style], children: [header, children] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { testID: testID, style: [ground, style], contentContainerStyle: pad, keyboardShouldPersistTaps: "handled", children: [header, children] }));
}
//# sourceMappingURL=PageContainerV4.js.map