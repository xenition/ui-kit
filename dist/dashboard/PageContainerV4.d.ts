import * as React from 'react';
import { type PageHeaderV4Size } from '../layout/PageHeaderV4';
import type { SpaceKey } from '../layout/_tokens';
import type { IconName } from '../primitives/icon-names';
import type { PageContainerProps } from './PageContainer';
export type { PageHeaderV4Size };
/**
 * The base's props, minus the DOM attributes it inherits and minus `children`,
 * which V4 widens to optional (a page with a title and nothing under it yet is
 * a real screen, not a type error).
 *
 * `title` is declared here rather than inherited because
 * `React.HTMLAttributes` carries a `title` of its own — the tooltip attribute —
 * and the two would collide.
 */
type PageContainerBase = Omit<PageContainerProps, keyof React.HTMLAttributes<HTMLDivElement> | 'children'>;
export interface PageContainerV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, PageContainerBase {
    /** Optional page title rendered at the top, through `PageHeaderV4`. */
    title?: string;
    /** Optional subtitle under the title. */
    subtitle?: string;
    /** Trailing header slot next to the title (e.g. a primary action). */
    headerAction?: React.ReactNode;
    /**
     * Scroll the page's own content. Default `true` — the native base already
     * scrolled by default and the twins have to agree (§1.3).
     *
     * On the web this needs a height-constrained parent to mean anything, the
     * same way `overflow-y: auto` always has; `scroll={false}` gives back the
     * base's `min-h-full` behaviour, where the document scrolls instead.
     */
    scroll?: boolean;
    /**
     * Extra room under the content, in px — for a tab bar, a sticky CTA band, or
     * anything else pinned over the bottom of the screen. Default `0`.
     *
     * A caller's own number, like `ContainerV4`'s `maxWidth`, not a value this
     * file chose. It is spent as a custom property folded into the bottom
     * padding rather than as a second `padding-bottom`, so it **adds to**
     * `padding` and the safe-area inset instead of replacing either.
     */
    bottomInset?: number;
    /**
     * Respect the device's safe areas on all four edges. Default `true`.
     *
     * The native base already paid the top and bottom insets unconditionally, so
     * `true` is what preserves today's rendering there (§1.4); the web twin had
     * no notion of an inset at all and gains one, which is HIG's "respect the
     * system-defined safe areas" and the brief's §5 note for this component.
     *
     * The mechanism is `ContainerV4`'s exactly — the gutter is paid **on top of**
     * the inset (`gutter + inset`), never `max(gutter, inset)`, so content keeps
     * its breathing room against a safe edge instead of sitting flush with it.
     * Turn it off when an ancestor has already consumed the insets.
     */
    safeArea?: boolean;
    /**
     * The page gutter, from the spacing scale. Default `lg` (24) — §4.1's screen
     * edge → content distance, which is also M3's medium-window margin.
     */
    padding?: SpaceKey;
    /**
     * Draw a hairline under the title block. **Default `false`** — see the note
     * on the component. Forwarded to `PageHeaderV4`.
     */
    divided?: boolean;
    /** Headline step, forwarded to `PageHeaderV4`. Default `'3xl'`. */
    headerSize?: PageHeaderV4Size;
    /**
     * Optional leading mark for the title, in §4.7's 44 tinted circular badge. A
     * string is read as a name from the kit's icon set; any other node is
     * rendered exactly as given. Forwarded to `PageHeaderV4`.
     */
    icon?: IconName | React.ReactElement | null;
    children?: React.ReactNode;
}
/**
 * `PageContainer`, V4 — the screen's outer wrapper: the warm page ground, the
 * §4.1 gutter, the safe areas, and the screen title block.
 *
 * ## ⚠️ The screen title is `PageHeaderV4` now, and it lost its hairline
 *
 * The base has its own title block: `text-2xl` + `text-base` here,
 * `text-2xl` + `text-sm` in `PageHeader` — **the same screen header existing
 * twice at two type ramps**, which is §5's complaint about this component by
 * name. V4 does not re-implement it; it composes `PageHeaderV4` (§10.5), so
 * there is one screen header in the kit and one place its ramp is decided.
 *
 * Two consequences a caller can see, both intended:
 *
 * 1. **The title is bigger.** `PageHeaderV4` sets it at `3xl`, bold, in the
 *    seed's heading face (§5). The base's `2xl` tied the section headings
 *    below it, so the loudest thing on the screen was not the screen's name.
 *    {@link PageContainerV4Props.headerSize} takes it back down where a sheet
 *    or a secondary screen would rather it whispered.
 * 2. **There is no hairline under it, and adding one is opt-in.** §4.4: a
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
 * web has neither. Close both." They are here, with the native defaults, so
 * the same screen is written the same way on both platforms.
 *
 * **It respects the safe areas.** The native base paid the top and bottom
 * insets; the web twin paid none, so a web build on a notched phone put its
 * first line under the status bar and its last under the home indicator.
 * `safeArea` is on by default and reads the insets through CSS `env()` here
 * and `useSafeAreaInsets()` on native — the same mechanism `ContainerV4` and
 * `AuthStickyFooterV4` settled on, and the same arithmetic: gutter **plus**
 * inset.
 *
 * **The gutter is a token choice, not a constant.** `padding` defaults to `lg`
 * (24), §4.1's page gutter.
 *
 * ## What it deliberately does not do
 *
 * **No shadow, no scroll-edge line** (§4.4, §4.6). A page is not a card, a
 * sheet, or the one dominant action.
 *
 * **It always paints.** §4.5's "render nothing when you have nothing" is for a
 * component with nothing to *say*; this one is the page itself, and a page
 * that collapsed because a screen had no title would take the screen with it.
 * With no title, no subtitle, no action and no children it renders exactly the
 * ground and the gutter — and `PageHeaderV4` renders `null` rather than
 * holding an empty block open above them.
 *
 * The ground is `colors.surface`, not `colors.card`: §4.2's split is *page =
 * surface, cards = card*, and this is the page.
 */
export declare const PageContainerV4: React.ForwardRefExoticComponent<PageContainerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PageContainerV4.d.ts.map