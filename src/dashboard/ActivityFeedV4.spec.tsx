/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  ActivityFeedV4,
  type ActivityFeedV4Props,
  type ActivityItemV4,
} from './ActivityFeedV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
} from './internal/row-v4';

const ITEMS: ActivityItemV4[] = [
  { id: '1', title: 'Invoice paid', meta: 'by Ada · Billing', time: '2h ago' },
  { id: '2', title: 'Seat added', meta: 'by Grace · Team', time: '4h ago' },
  { id: '3', title: 'Plan upgraded', time: 'yesterday' },
];

function feed(props: Partial<ActivityFeedV4Props> = {}): HTMLElement {
  const { container } = render(<ActivityFeedV4 items={ITEMS} {...props} />);
  return container.firstElementChild as HTMLElement;
}

/** Index into a list with the bounds check the strict config wants. */
function at<T>(list: T[], index: number): T {
  const item = list[index];
  expect(item).toBeDefined();
  return item as T;
}

function classes(el: Element): string[] {
  return el.className.split(/\s+/).filter(Boolean);
}

function rows(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-row]'));
}

function texts(el: Element): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-text]'));
}

/** Every 1px rule in the tree — `ListSeparatorV4`'s one and only spelling. */
function separators(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('.h-px'));
}

describe('ActivityFeedV4 (web)', () => {
  describe('props', () => {
    it('keeps the base contract: items, title, emptyMessage, className, DOM props', () => {
      const el = feed({ title: 'Recent activity', className: 'my-feed', id: 'feed' });
      expect(el.textContent).toContain('Recent activity');
      expect(el.textContent).toContain('Invoice paid');
      expect(el.textContent).toContain('by Ada · Billing');
      expect(el.textContent).toContain('2h ago');
      expect(classes(el)).toContain('my-feed');
      expect(el.getAttribute('id')).toBe('feed');
    });

    it('forwards the ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ActivityFeedV4 ref={ref} items={ITEMS} />);
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('renders one row per item, in order, keyed by id', () => {
      const el = feed();
      const list = rows(el);
      expect(list).toHaveLength(3);
      expect(at(list, 0).textContent).toContain('Invoice paid');
      expect(at(list, 2).textContent).toContain('Plan upgraded');
    });

    it('takes a §5 header action beside the heading', () => {
      const el = feed({ title: 'Recent activity', action: <a href="#all">See all</a> });
      expect(el.querySelector('a[href="#all"]')).not.toBeNull();
      // §4.1: `md` between a card header and its body — not the base's `sm`.
      expect(classes(el)).toContain('gap-md');
    });

    it('sets the heading as a real <h3> at the Section ramp', () => {
      const el = feed({ title: 'Recent activity' });
      const h = el.querySelector('h3') as HTMLElement;
      expect(h).not.toBeNull();
      // The user-agent margin would otherwise widen the header gap.
      expect(classes(h)).toContain('m-0');
      expect(classes(at(texts(h), 0))).toEqual(
        expect.arrayContaining(['text-lg', 'font-bold', 'text-on-surface'])
      );
    });
  });

  describe('every entry is a row of the family — §4.3', () => {
    it('wears the module’s base class and composed height, never a literal', () => {
      const el = feed();
      const list = rows(el);
      ROW_V4_BASE_CLASS.split(' ').forEach((c) =>
        expect(classes(at(list, 0))).toContain(c)
      );
      // Two-line rows take 72, the one-line row takes 56 — from the module.
      expect(classes(at(list, 0))).toContain(rowHeightClass(true));
      expect(classes(at(list, 2))).toContain(rowHeightClass(false));
      expect(el.innerHTML).not.toMatch(/min-h-\[(56|48)px\]/);
      expect(el.innerHTML).not.toMatch(/\bgap-0\.5\b/);
    });

    it('lays out [leading] [text] [trailing] in the module’s columns', () => {
      const first = at(rows(feed()), 0);
      const cols = Array.from(first.children) as HTMLElement[];
      expect(cols).toHaveLength(3);
      expect(at(cols, 0).className).toBe(ROW_V4_LEADING_CLASS);
      expect(at(cols, 1).className).toBe(ROW_V4_TEXT_CLASS);
      expect(at(cols, 2).className.startsWith(ROW_V4_TRAILING_CLASS)).toBe(true);
    });

    it('keeps every row’s ground transparent — the container owns the card', () => {
      rows(feed()).forEach((r) => expect(classes(r)).toContain(rowGroundClass(false)));
    });

    it('sets title `base`/semibold, meta `sm`/`mutedText` — never the `muted` fill', () => {
      const first = at(rows(feed()), 0);
      const runs = texts(first);
      expect(classes(at(runs, 0))).toEqual(
        expect.arrayContaining(['text-base', 'font-semibold', 'text-on-surface'])
      );
      expect(classes(at(runs, 1))).toEqual(
        expect.arrayContaining(['text-sm', 'text-muted-text'])
      );
      runs.forEach((t) => expect(classes(t)).not.toContain('text-muted'));
    });
  });

  describe('the badge replaces the dot — §4.3 / §4.7', () => {
    it('gives every row a soft-badged IconV4 in the 44 slot, not an 8px dot', () => {
      const el = feed();
      rows(el).forEach((r) => {
        const slot = at(Array.from(r.children) as HTMLElement[], 0);
        expect(slot.className).toBe(ROW_V4_LEADING_CLASS);
        expect(slot.querySelector('[data-xen-v4-icon]')?.getAttribute('data-badge')).toBe(
          'soft'
        );
      });
      expect(el.innerHTML).not.toMatch(/\bh-2\b|\bw-2\b|\bmt-1\.5\b/);
      // No bare rail of primary dots survives.
      expect(el.innerHTML).not.toMatch(/class="[^"]*\brounded-full\b[^"]*\bbg-primary\b/);
    });

    it('takes a per-item `icon` and §4.7 `tone`', () => {
      const el = feed({
        items: [{ id: '1', title: 'Refund issued', icon: 'card', tone: 'warn' }],
      });
      const badge = el.querySelector('[data-xen-v4-icon]') as HTMLElement;
      expect(badge.textContent).toBe('💳');
      expect(badge.getAttribute('data-badge')).toBe('soft');
    });
  });

  describe('one grouped container with inset separators — §4.3 / §4.4', () => {
    it('puts the rows in a single flush card rather than a stack of cards', () => {
      const el = feed();
      const card = el.querySelector('[data-xen-v4-card]') as HTMLElement;
      expect(card).not.toBeNull();
      expect(classes(card)).toContain('p-0');
      expect(classes(card)).toContain('overflow-hidden');
      expect(classes(card)).toContain('rounded-[var(--xen-radius-lg)]');
      // §4.2: `card`, not `surface` — the page colour on a raised surface is
      // the module's most visible bug, and `CardV4` still paints it.
      expect(classes(card)).toContain('bg-card');
      expect(classes(card)).toContain('text-on-card');
      // Exactly one card in the tree — the rows do not paint their own.
      expect(el.querySelectorAll('[data-xen-v4-card]')).toHaveLength(1);
      expect(el.querySelector('ul')?.getAttribute('role')).toBe('list');
    });

    it('rules between rows only, inset to clear the 44 leading slot', () => {
      const el = feed();
      const seps = separators(el);
      expect(seps).toHaveLength(ITEMS.length - 1);
      seps.forEach((s) => {
        expect(classes(s)).toContain('ml-[calc(44px+var(--xen-space-md))]');
        expect(classes(s)).toContain('bg-border');
        expect(s.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('draws no rule at all for a list of one', () => {
      expect(separators(feed({ items: [at(ITEMS, 0)] }))).toHaveLength(0);
    });
  });

  describe('the timestamp — §4.3', () => {
    it('is `xs`/`mutedText`', () => {
      const first = at(rows(feed()), 0);
      const stamp = texts(first).find((t) => t.textContent === '2h ago') as HTMLElement;
      expect(classes(stamp)).toEqual(expect.arrayContaining(['text-xs', 'text-muted-text']));
    });

    it('top-aligns on a two-line row and centres on a one-line row', () => {
      const list = rows(feed());
      const twoLine = at(Array.from(at(list, 0).children) as HTMLElement[], 2);
      const oneLine = at(Array.from(at(list, 2).children) as HTMLElement[], 2);
      expect(classes(twoLine)).toContain('self-start');
      expect(oneLine.className).toBe(ROW_V4_TRAILING_CLASS);
    });
  });

  describe('press feedback is the state layer — §4.3', () => {
    it('is inert by default: no button, no state hooks', () => {
      rows(feed()).forEach((r) => {
        expect(r.tagName).toBe('DIV');
        expect(r.getAttribute('data-xen-v4-state')).toBeNull();
      });
    });

    it('makes a row a button carrying the shared layer when `onItemClick` is set', () => {
      const onItemClick = jest.fn();
      const el = feed({ onItemClick });
      const first = at(rows(el), 0);
      expect(first.tagName).toBe('BUTTON');
      expect(first.getAttribute('data-xen-v4-state')).toBe('');
      expect(first.getAttribute('style')).toContain('--xen-v4-state-ground');
      fireEvent.click(first);
      expect(onItemClick).toHaveBeenCalledWith(at(ITEMS, 0));
    });

    it('carries no opacity or hover ground anywhere', () => {
      const el = feed({ onItemClick: jest.fn() });
      expect(el.innerHTML).not.toMatch(/hover:opacity-\d+/);
      expect(el.innerHTML).not.toMatch(/hover:bg-/);
      expect(el.innerHTML).not.toMatch(/\bopacity-\d+/);
    });
  });

  describe('empty states — §4.5', () => {
    it('routes zero items through EmptyStateV4, not a hand-rolled block', () => {
      const el = feed({ items: [] });
      const empty = el.querySelector('[data-xen-empty-state]') as HTMLElement;
      expect(empty).not.toBeNull();
      expect(empty.textContent).toContain('No activity yet');
      expect(empty.textContent).toContain('Activity will appear here as things happen.');
      // No rows, no card, no rules — and no blank bordered box.
      expect(rows(el)).toHaveLength(0);
      expect(el.querySelector('[data-xen-v4-card]')).toBeNull();
      expect(separators(el)).toHaveLength(0);
      // The measure is the primitive's job; `max-w-[340px]` is gone.
      expect(el.innerHTML).not.toContain('max-w-[340px]');
      expect(el.innerHTML).not.toMatch(/border-dashed/);
    });

    it('takes the empty state’s headline, illustration and single CTA', () => {
      const el = feed({
        items: [],
        emptyTitle: 'Nothing here yet',
        emptyMessage: 'Invite a teammate to get things moving.',
        emptyIcon: <span data-empty-icon="" />,
        emptyAction: <button type="button">Invite</button>,
      });
      const empty = el.querySelector('[data-xen-empty-state]') as HTMLElement;
      expect(empty.textContent).toContain('Nothing here yet');
      expect(empty.textContent).toContain('Invite a teammate to get things moving.');
      expect(empty.querySelector('[data-empty-icon]')).not.toBeNull();
      expect(empty.querySelectorAll('button')).toHaveLength(1);
    });

    it('keeps the heading above an empty feed', () => {
      const el = feed({ items: [], title: 'Recent activity' });
      expect(el.querySelector('h3')?.textContent).toBe('Recent activity');
      expect(el.querySelector('[data-xen-empty-state]')).not.toBeNull();
    });

    it('renders no header at all when there is neither a title nor an action', () => {
      expect(feed().querySelector('h3')).toBeNull();
      expect(feed({ items: [] }).querySelector('h3')).toBeNull();
    });

    it('survives an item with nothing but a title', () => {
      const el = feed({ items: [{ id: '1', title: 'Something happened' }] });
      const row = at(rows(el), 0);
      expect(row.children).toHaveLength(2);
      expect(texts(row)).toHaveLength(1);
    });
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = feed({ title: 'Recent activity', onItemClick: jest.fn() });
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.outerHTML).not.toMatch(/\brgba?\(/);
    expect(el.outerHTML).not.toMatch(/neutral-\d/);
    // The one bracketed pixel value allowed is the separator's composed inset,
    // whose 44 is the leading slot the rule is clearing (§4.4).
    const bracketed = el.outerHTML.match(/\[[^\]"]*\d+px[^\]"]*\]/g) ?? [];
    bracketed.forEach((v) => expect(v).toBe('[calc(44px+var(--xen-space-md))]'));
  });
});
