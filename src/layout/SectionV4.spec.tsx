/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { SectionV4, type SectionV4Props } from './SectionV4';

function block(props: SectionV4Props = {}): HTMLElement {
  const { container } = render(<SectionV4 {...props} />);
  const el = container.querySelector('[data-xen-v4-section]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

function header(el: HTMLElement): HTMLElement | null {
  return el.querySelector('[data-xen-v4-section-header]');
}

function runs(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-text]')) as HTMLElement[];
}

describe('SectionV4 (web)', () => {
  it('is a <section> with a token-bound header-to-body gap', () => {
    const el = block({ title: 'Overview', children: <p>body</p> });
    expect(el.tagName).toBe('SECTION');
    expect(el.className).toContain('flex');
    expect(el.className).toContain('flex-col');
    // §4.1: between a card header and its body — `md` (16).
    expect(el.className).toContain('gap-[var(--xen-space-md)]');
  });

  it('takes any step of the spacing scale for that gap', () => {
    expect(block({ title: 'a', spacing: 'xs' }).className).toContain('gap-[var(--xen-space-xs)]');
    expect(block({ title: 'a', spacing: 'xl' }).className).toContain('gap-[var(--xen-space-xl)]');
    expect(block({ title: 'a', spacing: '2xl' }).className).toContain(
      'gap-[var(--xen-space-2xl)]'
    );
  });

  it('sets the §5 type ramp: title `xl`/bold in the seed’s HEADING face', () => {
    // The base was `text-lg font-semibold` here and `lg`/`600` on native — the
    // same intent expressed twice and free to drift. Both twins now read the
    // ramp through `TextV4`.
    const el = block({ title: 'Overview' });
    const title = runs(el)[0]!;
    expect(title.textContent).toBe('Overview');
    expect(title.getAttribute('data-xen-v4-text')).toBe('xl');
    expect(title.className).toContain('text-xl');
    expect(title.className).toContain('font-bold');
    expect(title.className).toContain('text-on-surface');
    expect(title.className).toContain('font-heading');
  });

  it('keeps the heading semantic, with the user-agent margin killed', () => {
    const el = block({ title: 'Overview' });
    const h2 = el.querySelector('h2') as HTMLElement;
    expect(h2).not.toBeNull();
    expect(h2.textContent).toBe('Overview');
    // A default `h2` margin would sit inside the `gap-xs` and widen it.
    expect(h2.className).toContain('m-0');
  });

  it('sets the subtitle in `mutedText`, not the decorative `muted` fill', () => {
    // `muted` is a fill and carries no contrast promise; `mutedText` is the
    // same quietness walked until it clears AA. This is the bug the shadcn
    // pass closed elsewhere and the base `Section` still ships.
    const el = block({ title: 'Overview', subtitle: 'A quick summary' });
    const sub = runs(el)[1]!;
    expect(sub.textContent).toBe('A quick summary');
    expect(sub.className).toContain('text-muted-text');
    expect(sub.className).not.toMatch(/text-muted(?![-\w])/);
    // §5: `base`, not the base component's `sm` — this is copy, not a caption.
    expect(sub.className).toContain('text-base');
    expect(sub.className).toContain('font-body');
  });

  it('puts §4.1’s `xs` between the title and its supporting line', () => {
    const el = block({ title: 'Overview', subtitle: 'A quick summary' });
    const column = header(el)!.firstElementChild as HTMLElement;
    expect(column.className).toContain('gap-[var(--xen-space-xs)]');
    expect(column.className).toContain('flex-col');
  });

  it('renders a trailing `action` beside the title — the shadcn CardAction slot', () => {
    const el = block({
      title: 'Recent activity',
      subtitle: 'Last 7 days',
      action: <a href="#all">See all</a>,
    });
    const head = header(el)!;
    expect(head.className).toContain('flex-row');
    expect(head.className).toContain('justify-between');
    // A long title must not shove the action off the end, and the action must
    // not compress to make room for it.
    const column = head.firstElementChild as HTMLElement;
    expect(column.className).toContain('flex-1');
    expect(column.className).toContain('min-w-0');
    const slot = el.querySelector('[data-xen-v4-section-action]') as HTMLElement;
    expect(slot.className).toContain('shrink-0');
    expect(slot.textContent).toBe('See all');
  });

  it('renders an action with no title or subtitle', () => {
    const el = block({ action: <button type="button">Filter</button> });
    const head = header(el)!;
    expect(head).not.toBeNull();
    // No text column at all — just the action.
    expect(runs(el)).toHaveLength(0);
    expect(head.childElementCount).toBe(1);
    expect(el.textContent).toBe('Filter');
  });

  it('renders a title with no subtitle, and a subtitle with no title, cleanly', () => {
    const titleOnly = block({ title: 'Overview' });
    expect(runs(titleOnly)).toHaveLength(1);
    expect(titleOnly.querySelector('p')).toBeNull();

    const subOnly = block({ subtitle: 'A quick summary' });
    expect(runs(subOnly)).toHaveLength(1);
    expect(subOnly.querySelector('h2')).toBeNull();
  });

  it('survives its empty case: no header at all, nothing painted', () => {
    // §4.5 — an empty header row would leave a `gap` where two lines would be.
    const el = block();
    expect(header(el)).toBeNull();
    expect(el.childElementCount).toBe(0);
    expect(el.textContent).toBe('');
    expect(el.className).not.toContain('border');
    expect(el.className).not.toContain('bg-');
    expect(el.className).not.toContain('shadow');
  });

  it('renders children with no header when it was given no header content', () => {
    const el = block({ children: <p>just the body</p> });
    expect(header(el)).toBeNull();
    expect(el.textContent).toBe('just the body');
    expect(el.childElementCount).toBe(1);
  });

  it('renders the header above the children, in that order', () => {
    const el = block({ title: 'Overview', children: <p>body</p> });
    expect(el.children).toHaveLength(2);
    expect(el.children[0]!.getAttribute('data-xen-v4-section-header')).toBe('');
    expect(el.children[1]!.textContent).toBe('body');
  });

  it('forwards the ref, merges a className and passes DOM props through', () => {
    const ref = createRef<HTMLElement>();
    const { getByTestId } = render(
      <SectionV4 ref={ref} data-testid="s" id="overview" className="mb-xl" title="Overview" />
    );
    const el = getByTestId('s');
    expect(ref.current).toBe(el);
    expect(el.id).toBe('overview');
    expect(el.className).toContain('mb-xl');
    expect(el.className).toContain('flex-col');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = block({
      title: 'Overview',
      subtitle: 'A quick summary',
      action: <a href="#all">See all</a>,
      children: <p>body</p>,
    });
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.outerHTML).not.toMatch(/rgba?\(/);
    expect(el.outerHTML).not.toMatch(/class="[^"]*\[\d+px\]/);
  });
});
