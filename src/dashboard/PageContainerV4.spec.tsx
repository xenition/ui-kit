/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { PageContainerV4 } from './PageContainerV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** The page surface the component owns. */
function page(ui: ReactElement): HTMLElement {
  const { container } = renderThemed(ui);
  const el = container.querySelector('[data-xen-v4-page]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The composed `PageHeaderV4`, or `null` when it rendered nothing. */
function header(el: HTMLElement): HTMLElement | null {
  return el.querySelector('[data-xen-v4-page-header]');
}

/** Every styled `TextV4` run inside the block, in document order. */
function runs(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-text]')) as HTMLElement[];
}

describe('PageContainerV4 (web)', () => {
  // ── the ground (§4.2) ──────────────────────────────────────────────

  it('paints the warm page ground — `surface`, not `card`', () => {
    // §4.2's split is page = surface, cards = card. This is the page.
    const el = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('text-on-surface');
    expect(el.className).not.toContain('bg-card');
  });

  it('carries no shadow, no radius and no border — a page is not a card', () => {
    // §4.6: a card, a sheet and the one dominant action. A page is none.
    const el = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(el.className).not.toMatch(/shadow/);
    expect(el.className).not.toMatch(/rounded/);
    expect(el.className).not.toMatch(/\bborder\b/);
  });

  // ── the screen header is `PageHeaderV4` (§5) ───────────────────────

  it('composes `PageHeaderV4` rather than re-implementing a title block', () => {
    const el = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(header(el)).not.toBeNull();
    // The base rendered a bare `h1.text-2xl` of its own.
    expect(el.querySelector('h1')?.className).not.toContain('text-2xl');
  });

  it('sets the title at `3xl` bold in the heading face — up from the base’s `2xl`', () => {
    // §5: the same screen header existed twice at two type ramps. One now.
    const el = page(<PageContainerV4 title="Good morning">body</PageContainerV4>);
    const title = runs(el)[0] as HTMLElement;
    expect(title.getAttribute('data-xen-v4-text')).toBe('3xl');
    expect(title.className).toContain('font-bold');
    expect(title.className).toContain('text-on-surface');
    expect(title.className).toContain('font-heading');
  });

  it('sets the subtitle at `base` in `mutedText`, never the decorative `muted` fill', () => {
    const el = page(
      <PageContainerV4 title="Today" subtitle="Tuesday, 29 August">
        body
      </PageContainerV4>
    );
    const sub = runs(el)[1] as HTMLElement;
    expect(sub.textContent).toBe('Tuesday, 29 August');
    expect(sub.className).toContain('text-base');
    expect(sub.className).toContain('text-muted-text');
    expect(sub.className).not.toMatch(/text-muted(?![-\w])/);
  });

  it('takes a smaller headline step through `headerSize`', () => {
    const el = page(
      <PageContainerV4 title="Settings" headerSize="xl">
        body
      </PageContainerV4>
    );
    expect(runs(el)[0]?.getAttribute('data-xen-v4-text')).toBe('xl');
  });

  it('renders `headerAction` in the header’s trailing slot', () => {
    const el = page(
      <PageContainerV4 title="Today" headerAction={<button data-cta>New</button>}>
        body
      </PageContainerV4>
    );
    expect(header(el)?.querySelector('[data-cta]')).not.toBeNull();
  });

  it('forwards a named `icon` to the header’s §4.7 badge', () => {
    const el = page(
      <PageContainerV4 title="Notifications" icon="bell">
        body
      </PageContainerV4>
    );
    const mark = header(el)?.querySelector('[data-xen-v4-icon]') as HTMLElement;
    expect(mark).not.toBeNull();
    expect(mark.getAttribute('data-badge')).toBe('soft');
  });

  // ── the border default (§4.4) ──────────────────────────────────────

  it('draws NO hairline under the title by default — §4.4', () => {
    const el = page(
      <PageContainerV4 title="Today" subtitle="Tuesday">
        body
      </PageContainerV4>
    );
    expect(header(el)?.className).not.toContain('border-b');
    expect(header(el)?.hasAttribute('data-divided')).toBe(false);
  });

  it('puts the hairline back, verbatim, on `divided`', () => {
    const el = page(
      <PageContainerV4 title="Today" divided>
        body
      </PageContainerV4>
    );
    expect(header(el)?.className).toContain('border-b');
    expect(header(el)?.className).toContain('border-border');
  });

  // ── scrolling — parity with native (§5) ────────────────────────────

  it('scrolls its own content by default, matching the native base', () => {
    const el = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(el.className).toContain('overflow-y-auto');
    expect(el.className).toContain('h-full');
    expect(el.getAttribute('data-scroll')).toBe('');
  });

  it('grows the document instead when `scroll` is off', () => {
    const el = page(
      <PageContainerV4 title="Today" scroll={false}>
        body
      </PageContainerV4>
    );
    expect(el.className).toContain('min-h-full');
    expect(el.className).not.toContain('overflow-y-auto');
    expect(el.hasAttribute('data-scroll')).toBe(false);
  });

  // ── safe areas (§5, HIG) ───────────────────────────────────────────

  it('pays every safe-area inset ON TOP OF the gutter by default', () => {
    // `ContainerV4`'s arithmetic exactly: gutter + inset, never max().
    const el = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(el.className).toContain(
      'pl-[calc(var(--xen-space-lg)_+_env(safe-area-inset-left,0px))]'
    );
    expect(el.className).toContain(
      'pr-[calc(var(--xen-space-lg)_+_env(safe-area-inset-right,0px))]'
    );
    expect(el.className).toContain(
      'pt-[calc(var(--xen-space-lg)_+_env(safe-area-inset-top,0px))]'
    );
    expect(el.className).toContain('env(safe-area-inset-bottom,0px)');
  });

  it('gives the insets back to an ancestor with `safeArea={false}`', () => {
    const el = page(
      <PageContainerV4 title="Today" safeArea={false}>
        body
      </PageContainerV4>
    );
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
    expect(el.className).toContain('pt-[var(--xen-space-lg)]');
    expect(el.className).not.toContain('env(');
  });

  it('takes the gutter off the spacing scale — §4.1’s page gutter, and nothing else', () => {
    const lg = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(lg.className).toContain('var(--xen-space-lg)');

    const none = page(
      <PageContainerV4 title="Today" padding="md" safeArea={false}>
        body
      </PageContainerV4>
    );
    expect(none.className).toContain('px-[var(--xen-space-md)]');
    expect(none.className).not.toContain('px-[var(--xen-space-lg)]');
  });

  // ── bottomInset — parity with native (§5) ──────────────────────────

  it('adds `bottomInset` to the bottom padding rather than replacing it', () => {
    const el = page(
      <PageContainerV4 title="Today" bottomInset={64}>
        body
      </PageContainerV4>
    );
    // One `calc()`: gutter + the caller's inset + the safe area.
    expect(el.className).toContain(
      'pb-[calc(var(--xen-space-lg)_+_var(--xen-v4-page-inset,0px)_+_env(safe-area-inset-bottom,0px))]'
    );
    expect(el.style.getPropertyValue('--xen-v4-page-inset')).toBe('64px');
  });

  it('sets no inset property at all when there is none to pay', () => {
    const el = page(<PageContainerV4 title="Today">body</PageContainerV4>);
    expect(el.style.getPropertyValue('--xen-v4-page-inset')).toBe('');
    // …and the `calc()` still resolves, because the fallback is `0px`.
    expect(el.className).toContain('var(--xen-v4-page-inset,0px)');
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders the ground and the gutter with NOTHING to show — a page never collapses', () => {
    const el = page(<PageContainerV4 />);
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('var(--xen-space-lg)');
    // …but it holds no empty header block open above the content.
    expect(header(el)).toBeNull();
    expect(el.childElementCount).toBe(0);
  });

  it('renders children with no title, and a title with no children', () => {
    const withChildren = page(<PageContainerV4>just content</PageContainerV4>);
    expect(withChildren.textContent).toBe('just content');
    expect(header(withChildren)).toBeNull();

    const withTitle = page(<PageContainerV4 title="Empty screen" />);
    expect(header(withTitle)).not.toBeNull();
    expect(withTitle.textContent).toBe('Empty screen');
  });

  it('drops the header for an empty-string title, as `PageHeaderV4` does', () => {
    const el = page(<PageContainerV4 title="" subtitle="">body</PageContainerV4>);
    expect(header(el)).toBeNull();
    expect(el.textContent).toBe('body');
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a className and forwards the rest of its props', () => {
    const el = page(
      <PageContainerV4 title="Today" className="pb-0" id="screen" aria-label="Today">
        body
      </PageContainerV4>
    );
    expect(el.className).toContain('pb-0');
    expect(el.className).toContain('bg-surface');
    expect(el.id).toBe('screen');
    expect(el.getAttribute('aria-label')).toBe('Today');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = page(
      <PageContainerV4
        title="Today"
        subtitle="Tuesday, 29 August"
        divided
        headerAction={<button>New</button>}
      >
        body
      </PageContainerV4>
    );
    const markup = el.outerHTML;
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    // No bare pixel arithmetic in a class: the one number this component can
    // carry is the caller's own `bottomInset`, and it rides a custom property.
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
