/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import type { ThemeSeed } from '../theme/types';
import { PageHeaderV4 } from './PageHeaderV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

/** The `<header>` the component owns. */
function header(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const { container } = renderThemed(ui, seed);
  const el = container.querySelector('[data-xen-v4-page-header]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The provider's own wrapper — everything the component actually rendered. */
function host(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-theme]') as HTMLElement;
}

/** The headline's styled run, inside the `h1`. */
function titleSpan(el: HTMLElement): HTMLElement {
  return el.querySelector('h1 [data-xen-v4-text]') as HTMLElement;
}

/** Every styled run in the block, in document order. */
function runs(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-text]')) as HTMLElement[];
}

describe('PageHeaderV4 (web)', () => {
  // ── the headline decision: the hairline is gone ─────────────────────

  it('draws NO bottom border by default — §4.4’s change to the base', () => {
    // The base paints `border-b border-border` unconditionally. §4.4: between
    // free-standing blocks the structuring device is space, not a rule.
    const el = header(<PageHeaderV4 title="Today" subtitle="Tuesday, 29 August" />);
    expect(el.className).not.toContain('border-b');
    expect(el.className).not.toContain('border-border');
    expect(el.hasAttribute('data-divided')).toBe(false);
  });

  it('puts the hairline back, verbatim, on `divided`', () => {
    const el = header(<PageHeaderV4 title="Today" divided />);
    expect(el.className).toContain('border-b');
    expect(el.className).toContain('border-border');
    expect(el.getAttribute('data-divided')).toBe('');
  });

  it('takes `divided={false}` explicitly and still draws nothing', () => {
    const el = header(<PageHeaderV4 title="Today" divided={false} />);
    expect(el.className).not.toContain('border-b');
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders NOTHING with no title, no subtitle, no actions and no icon', () => {
    const { container } = renderThemed(<PageHeaderV4 title="" />);
    expect(container.querySelector('[data-xen-v4-page-header]')).toBeNull();
    expect(host(container).childElementCount).toBe(0);
    expect(host(container).innerHTML).toBe('');
  });

  it('renders a title on its own cleanly — no empty subtitle row, no actions slot', () => {
    const el = header(<PageHeaderV4 title="Dashboard" />);
    expect(el.tagName).toBe('HEADER');
    expect(el.textContent).toBe('Dashboard');
    expect(runs(el)).toHaveLength(1);
    // The title column and nothing else.
    expect(el.childElementCount).toBe(1);
  });

  it('still renders when it has only actions to show', () => {
    const el = header(<PageHeaderV4 title="" actions={<button data-cta>New</button>} />);
    expect(el.querySelector('[data-cta]')).not.toBeNull();
    expect(el.querySelector('h1')).toBeNull();
    expect(runs(el)).toHaveLength(0);
  });

  it('renders a subtitle with no title, and no `h1` for a headline it does not have', () => {
    const el = header(<PageHeaderV4 title="" subtitle="Nothing scheduled" />);
    expect(el.querySelector('h1')).toBeNull();
    expect(el.textContent).toBe('Nothing scheduled');
    expect(runs(el)).toHaveLength(1);
  });

  // ── typography (§5, matching `AuthHeadingV4`) ──────────────────────

  it('sets the title at `3xl`, bold, `onSurface`, in the seed’s HEADING face', () => {
    const el = header(<PageHeaderV4 title="Good morning" />);
    const span = titleSpan(el);
    expect(span.textContent).toBe('Good morning');
    expect(span.getAttribute('data-xen-v4-text')).toBe('3xl');
    expect(span.className).toContain('text-3xl');
    expect(span.className).toContain('font-bold');
    expect(span.className).toContain('text-on-surface');
    // Asked for by prop, exactly as `AuthHeadingV4` does — not painted over.
    expect(span.className).toContain('font-heading');
    // The `h1`'s user-agent margin would sit inside the `gap-xs` and widen it.
    expect((el.querySelector('h1') as HTMLElement).className).toContain('m-0');
  });

  it('takes a smaller headline step when asked', () => {
    const el = header(<PageHeaderV4 title="Settings" size="2xl" />);
    expect(titleSpan(el).getAttribute('data-xen-v4-text')).toBe('2xl');
    expect(titleSpan(el).className).toContain('text-2xl');
    expect(titleSpan(el).className).toContain('font-heading');
  });

  it('sets the subtitle at `base` in `mutedText`, not the decorative `muted` slot', () => {
    // `muted` carries no contrast promise against `surface`; `mutedText` is
    // the same quietness walked until it clears AA, and a subtitle is a
    // sentence the user is meant to read. The base used `sm` + `muted`.
    const el = header(<PageHeaderV4 title="Today" subtitle="Tuesday, 29 August" />);
    const sub = runs(el)[1] as HTMLElement;
    expect(sub.textContent).toBe('Tuesday, 29 August');
    expect(sub.className).toContain('text-base');
    expect(sub.className).toContain('text-muted-text');
    expect(sub.className).not.toMatch(/text-muted(?![-\w])/);
    expect(sub.className).not.toContain('text-sm');
    expect(sub.className).toContain('font-body');
  });

  // ── rhythm (§4.1) ──────────────────────────────────────────────────

  it('pads the block by `spacing.lg` below and keeps `spacing.md` beside the actions', () => {
    const el = header(<PageHeaderV4 title="Today" actions={<button>New</button>} />);
    expect(el.className).toContain('pb-[var(--xen-space-lg)]');
    // The base padded by `md`; §5 asks for `lg`.
    expect(el.className).not.toContain('pb-[var(--xen-space-md)]');
    expect(el.className).toContain('gap-[var(--xen-space-md)]');
  });

  it('sets `spacing.xs` between the title and its supporting line — §4.1', () => {
    const el = header(<PageHeaderV4 title="Today" subtitle="Tuesday" />);
    const column = el.querySelector('.flex-col') as HTMLElement;
    expect(column.className).toContain('gap-[var(--xen-space-xs)]');
  });

  // ── actions (§5) ───────────────────────────────────────────────────

  it('renders actions in a slot that does not shrink', () => {
    const el = header(<PageHeaderV4 title="Today" actions={<button data-cta>New</button>} />);
    const slot = el.lastElementChild as HTMLElement;
    expect(slot.className).toContain('shrink-0');
    expect(slot.querySelector('[data-cta]')).not.toBeNull();
  });

  it('lets a wide actions node wrap below the title instead of crushing it', () => {
    // §5. The row wraps, and the title column asks for a basis composed from
    // the spacing scale — `2xl × 4` is 192 at the default scale.
    expect(compileTheme(SEED).spacing['2xl'] * 4).toBe(192);
    const el = header(<PageHeaderV4 title="Today" actions={<button>New</button>} />);
    expect(el.className).toContain('flex-wrap');
    const column = el.firstElementChild as HTMLElement;
    expect(column.className).toContain('basis-[calc(var(--xen-space-2xl)*4)]');
    expect(column.className).toContain('grow');
    // …and it can still truncate once it is alone on its line.
    expect(column.className).toContain('min-w-0');
  });

  // ── the leading badge (§4.7) ───────────────────────────────────────

  it('renders a named `icon` as §4.7’s soft circular badge', () => {
    const el = header(<PageHeaderV4 title="Notifications" icon="bell" />);
    const mark = el.querySelector('[data-xen-v4-icon]') as HTMLElement;
    expect(mark).not.toBeNull();
    expect(mark.getAttribute('data-badge')).toBe('soft');
    expect(mark.getAttribute('data-shape')).toBe('circle');
    // Decorative — the title already says what the screen is.
    expect(mark.getAttribute('aria-hidden')).toBe('true');
  });

  it('passes any other icon node through exactly as given', () => {
    const el = header(<PageHeaderV4 title="Team" icon={<span data-custom-mark>AB</span>} />);
    expect(el.querySelector('[data-custom-mark]')).not.toBeNull();
    expect(el.querySelector('[data-xen-v4-icon]')).toBeNull();
  });

  it('draws no badge at all when there is no icon', () => {
    const el = header(<PageHeaderV4 title="Team" />);
    expect(el.querySelector('[data-xen-v4-icon]')).toBeNull();
  });

  // ── clamping ───────────────────────────────────────────────────────

  it('never clamps unasked', () => {
    const el = header(
      <PageHeaderV4 title="A screen title long enough to wrap" subtitle="And a subtitle too" />
    );
    runs(el).forEach((span) => {
      expect(span.style.display).toBe('');
      expect(span.style.overflow).toBe('');
    });
  });

  it('clamps each line independently when the caller does ask', () => {
    const el = header(
      <PageHeaderV4
        title="A screen title long enough to wrap"
        subtitle="And a subtitle long enough to wrap too"
        titleLines={2}
        subtitleLines={1}
      />
    );
    const [t, s] = runs(el) as [HTMLElement, HTMLElement];
    expect(t.style.display).toBe('-webkit-box');
    expect(s.style.display).toBe('-webkit-box');

    // Asking for one does not silently clamp the other.
    const one = header(<PageHeaderV4 title="Title" subtitle="Subtitle" subtitleLines={1} />);
    const [t2, s2] = runs(one) as [HTMLElement, HTMLElement];
    expect(t2.style.display).toBe('');
    expect(s2.style.display).toBe('-webkit-box');
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a className for layout and forwards the rest of its props', () => {
    const el = header(<PageHeaderV4 title="Today" className="mb-lg" id="screen-header" />);
    expect(el.className).toContain('mb-lg');
    expect(el.className).toContain('flex-row');
    expect(el.id).toBe('screen-header');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    // No `icon` here on purpose: a badged `IconV4` stamps compiled colours as
    // inline custom properties, which is the theme, not a literal.
    const el = header(
      <PageHeaderV4 title="Today" subtitle="Tuesday, 29 August" divided actions={<button>New</button>} />
    );
    const markup = el.outerHTML;
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
