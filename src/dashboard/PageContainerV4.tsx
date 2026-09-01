import * as React from 'react';
import { cn } from '../primitives/cn';
import { PageHeaderV4, type PageHeaderV4Size } from '../layout/PageHeaderV4';
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

export interface PageContainerV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    PageContainerBase {
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
 * The custom property {@link PageContainerV4Props.bottomInset} is spent
 * through, so the caller's number is *added to* the gutter and the safe-area
 * inset in one `calc()` rather than fighting them as a second declaration.
 *
 * A custom property rather than an inline `padding-bottom`, because a CSSOM
 * that does not parse custom properties — jsdom, and any SSR extractor built
 * on one — drops a `calc(var(…))` from a `style` attribute outright, leaving
 * the page with no bottom padding at all. A bare number in a custom property
 * survives every CSSOM.
 */
const INSET_VAR = '--xen-v4-page-inset';

/*
  The four padding maps, written out per key rather than built from a template
  literal because Tailwind's scanner is static and cannot see an interpolated
  string — the same reason `_tokens.ts` and `ContainerV4` spell theirs out in
  full.

  Every length is a `--xen-*` token, the caller's own inset, or the browser's
  `env()`. The `0px` is the fallback an `env()` needs so the whole declaration
  does not drop on a browser with no safe-area support, and zero is not a
  spacing decision.
*/

const PAD_X: Record<SpaceKey, string> = {
  xs: 'px-[var(--xen-space-xs)]',
  sm: 'px-[var(--xen-space-sm)]',
  md: 'px-[var(--xen-space-md)]',
  lg: 'px-[var(--xen-space-lg)]',
  xl: 'px-[var(--xen-space-xl)]',
  '2xl': 'px-[var(--xen-space-2xl)]',
};

const PAD_X_SAFE: Record<SpaceKey, string> = {
  xs: 'pl-[calc(var(--xen-space-xs)_+_env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-xs)_+_env(safe-area-inset-right,0px))]',
  sm: 'pl-[calc(var(--xen-space-sm)_+_env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-sm)_+_env(safe-area-inset-right,0px))]',
  md: 'pl-[calc(var(--xen-space-md)_+_env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-md)_+_env(safe-area-inset-right,0px))]',
  lg: 'pl-[calc(var(--xen-space-lg)_+_env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-lg)_+_env(safe-area-inset-right,0px))]',
  xl: 'pl-[calc(var(--xen-space-xl)_+_env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-xl)_+_env(safe-area-inset-right,0px))]',
  '2xl':
    'pl-[calc(var(--xen-space-2xl)_+_env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-2xl)_+_env(safe-area-inset-right,0px))]',
};

const PAD_TOP: Record<SpaceKey, string> = {
  xs: 'pt-[var(--xen-space-xs)]',
  sm: 'pt-[var(--xen-space-sm)]',
  md: 'pt-[var(--xen-space-md)]',
  lg: 'pt-[var(--xen-space-lg)]',
  xl: 'pt-[var(--xen-space-xl)]',
  '2xl': 'pt-[var(--xen-space-2xl)]',
};

const PAD_TOP_SAFE: Record<SpaceKey, string> = {
  xs: 'pt-[calc(var(--xen-space-xs)_+_env(safe-area-inset-top,0px))]',
  sm: 'pt-[calc(var(--xen-space-sm)_+_env(safe-area-inset-top,0px))]',
  md: 'pt-[calc(var(--xen-space-md)_+_env(safe-area-inset-top,0px))]',
  lg: 'pt-[calc(var(--xen-space-lg)_+_env(safe-area-inset-top,0px))]',
  xl: 'pt-[calc(var(--xen-space-xl)_+_env(safe-area-inset-top,0px))]',
  '2xl': 'pt-[calc(var(--xen-space-2xl)_+_env(safe-area-inset-top,0px))]',
};

const PAD_BOTTOM: Record<SpaceKey, string> = {
  xs: 'pb-[calc(var(--xen-space-xs)_+_var(--xen-v4-page-inset,0px))]',
  sm: 'pb-[calc(var(--xen-space-sm)_+_var(--xen-v4-page-inset,0px))]',
  md: 'pb-[calc(var(--xen-space-md)_+_var(--xen-v4-page-inset,0px))]',
  lg: 'pb-[calc(var(--xen-space-lg)_+_var(--xen-v4-page-inset,0px))]',
  xl: 'pb-[calc(var(--xen-space-xl)_+_var(--xen-v4-page-inset,0px))]',
  '2xl': 'pb-[calc(var(--xen-space-2xl)_+_var(--xen-v4-page-inset,0px))]',
};

const PAD_BOTTOM_SAFE: Record<SpaceKey, string> = {
  xs: 'pb-[calc(var(--xen-space-xs)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]',
  sm: 'pb-[calc(var(--xen-space-sm)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]',
  md: 'pb-[calc(var(--xen-space-md)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]',
  lg: 'pb-[calc(var(--xen-space-lg)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]',
  xl: 'pb-[calc(var(--xen-space-xl)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]',
  '2xl':
    'pb-[calc(var(--xen-space-2xl)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]',
};

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
export const PageContainerV4 = React.forwardRef<HTMLDivElement, PageContainerV4Props>(
  function PageContainerV4(
    {
      title,
      subtitle,
      headerAction,
      scroll = true,
      bottomInset = 0,
      safeArea = true,
      padding = 'lg',
      divided = false,
      headerSize = '3xl',
      icon,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-xen-v4-page=""
        data-scroll={scroll ? '' : undefined}
        className={cn(
          'bg-surface text-on-surface',
          // A scrolling page owns its own viewport; a static one grows the
          // document, which is what the base did.
          scroll ? 'h-full overflow-y-auto overflow-x-hidden' : 'min-h-full',
          safeArea ? PAD_X_SAFE[padding] : PAD_X[padding],
          safeArea ? PAD_TOP_SAFE[padding] : PAD_TOP[padding],
          safeArea ? PAD_BOTTOM_SAFE[padding] : PAD_BOTTOM[padding],
          className
        )}
        style={
          bottomInset > 0
            ? ({ [INSET_VAR]: `${bottomInset}px`, ...style } as React.CSSProperties)
            : style
        }
        {...rest}
      >
        <PageHeaderV4
          // `PageHeaderV4` types `title` as required and reads `''` as absent
          // (it renders `null` with nothing to show), so an untitled page pays
          // for no header block at all.
          title={title ?? ''}
          subtitle={subtitle}
          actions={headerAction}
          divided={divided}
          size={headerSize}
          icon={icon}
        />
        {children}
      </div>
    );
  }
);
