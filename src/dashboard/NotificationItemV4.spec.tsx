/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { NotificationItemV4, type NotificationItemV4Props } from './NotificationItemV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
} from './internal/row-v4';

function row(props: Partial<NotificationItemV4Props> = {}): HTMLElement | null {
  const { container } = render(<NotificationItemV4 title="Invoice paid" {...props} />);
  return container.querySelector('[data-xen-v4-row]');
}

/** The row, asserted present — most tests want the element, not the maybe. */
function present(props: Partial<NotificationItemV4Props> = {}): HTMLElement {
  const el = row(props);
  expect(el).not.toBeNull();
  return el as HTMLElement;
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

/** The row's direct children — its columns, in anatomy order. */
function columns(el: HTMLElement): HTMLElement[] {
  return Array.from(el.children) as HTMLElement[];
}

function leadingSlot(el: HTMLElement): HTMLElement | null {
  return columns(el).find((c) => c.className === ROW_V4_LEADING_CLASS) ?? null;
}

function texts(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-text]'));
}

describe('NotificationItemV4 (web)', () => {
  describe('props', () => {
    it('keeps the base contract: title, body, time, unread, onClick, className', () => {
      const onClick = jest.fn();
      const el = present({
        body: 'Acme Inc · $420.00',
        time: '5m ago',
        unread: true,
        onClick,
        className: 'my-row',
      });
      expect(el.textContent).toContain('Invoice paid');
      expect(el.textContent).toContain('Acme Inc · $420.00');
      expect(el.textContent).toContain('5m ago');
      expect(classes(el)).toContain('my-row');
      fireEvent.click(el);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is a <div> without `onClick` and a <button> with one', () => {
      expect(present().tagName).toBe('DIV');
      expect(present({ onClick: jest.fn() }).tagName).toBe('BUTTON');
      expect(present({ onClick: jest.fn() }).getAttribute('type')).toBe('button');
    });

    it('names itself for a reader, and says "unread" when it is', () => {
      expect(present().getAttribute('aria-label')).toBe('Invoice paid');
      expect(present({ unread: true }).getAttribute('aria-label')).toBe('Invoice paid, unread');
    });

    it('forwards the ref to whichever element it rendered', () => {
      const plain = React.createRef<HTMLElement>();
      render(<NotificationItemV4 ref={plain} title="A" />);
      expect(plain.current?.tagName).toBe('DIV');
      const acting = React.createRef<HTMLElement>();
      render(<NotificationItemV4 ref={acting} title="A" onClick={jest.fn()} />);
      expect(acting.current?.tagName).toBe('BUTTON');
    });
  });

  describe('the row metric is the family’s — §4.3', () => {
    it('wears the shared base class rather than a padding of its own', () => {
      const el = present();
      ROW_V4_BASE_CLASS.split(' ').forEach((c) => expect(classes(el)).toContain(c));
      // The base row's own card is gone: the container owns it (§4.3).
      expect(el.className).not.toMatch(/rounded-/);
      expect(el.className).not.toContain('bg-surface');
    });

    it('takes 56 with a title alone and 72 once a body arrives — composed, never typed', () => {
      expect(classes(present())).toContain(rowHeightClass(false));
      expect(classes(present({ body: 'a line' }))).toContain(rowHeightClass(true));
      // The literals brief §1 names by hand.
      expect(present({ body: 'a line' }).className).not.toMatch(/min-h-\[(56|48)px\]/);
    });

    it('lays out [leading] [text] [trailing] with the module’s three columns', () => {
      const el = present({ body: 'a line', time: '5m' });
      expect(leadingSlot(el)).not.toBeNull();
      const cols = columns(el);
      expect(cols).toHaveLength(3);
      expect(at(cols, 0).className).toBe(ROW_V4_LEADING_CLASS);
      expect(at(cols, 1).className).toBe(ROW_V4_TEXT_CLASS);
      expect(at(cols, 2).className.startsWith(ROW_V4_TRAILING_CLASS)).toBe(true);
    });
  });

  describe('the badge replaces the dot — §4.3 / §4.7', () => {
    it('fills the 44 leading slot with a soft-badged IconV4, not an 8px dot', () => {
      const slot = leadingSlot(present()) as HTMLElement;
      const badge = slot.querySelector('[data-xen-v4-icon]');
      expect(badge).not.toBeNull();
      expect(badge?.getAttribute('data-badge')).toBe('soft');
      expect(badge?.getAttribute('data-shape')).toBe('circle');
      // The three literals the base painted its dot with.
      expect(slot.outerHTML).not.toMatch(/\bh-2\b|\bw-2\b|\bmt-1\.5\b/);
      // The slot is the module's fixed 44 square, spelled once.
      expect(slot.className).toBe(ROW_V4_LEADING_CLASS);
    });

    it('takes a category `icon` and a §4.7 tone', () => {
      const { container } = render(
        <NotificationItemV4 title="Payment" icon="card" iconTone="success" />
      );
      const badge = container.querySelector('[data-xen-v4-icon]') as HTMLElement;
      expect(badge.textContent).toBe('💳');
      expect(badge.getAttribute('data-badge')).toBe('soft');
    });

    it('lets `leading` carry a person, and `leading={null}` empty the slot', () => {
      const custom = present({ leading: <span data-avatar="" /> });
      expect(custom.querySelector('[data-avatar]')).not.toBeNull();
      expect(custom.querySelector('[data-xen-v4-icon]')).toBeNull();

      const bare = present({ leading: null });
      expect(leadingSlot(bare)).toBeNull();
      expect(bare.querySelector('[data-xen-v4-icon]')).toBeNull();
    });
  });

  describe('the unread / selected ground — §4.3', () => {
    it('paints the compiler’s `selected` pair when unread, never `bg-neutral-100`', () => {
      const el = present({ unread: true });
      rowGroundClass(true)
        .split(' ')
        .forEach((c) => expect(classes(el)).toContain(c));
      expect(el.className).not.toContain('bg-neutral-100');
      expect(el.outerHTML).not.toMatch(/neutral-\d/);
    });

    it('is transparent when read — the container owns the card', () => {
      expect(classes(present())).toContain(rowGroundClass(false));
      expect(present().className).not.toContain('bg-selected');
    });

    it('takes the same one token for `selected`, rather than a second tint', () => {
      expect(present({ selected: true }).className).toBe(present({ unread: true }).className);
    });

    it('says unread three ways: bold title, the ground, and a trailing state dot', () => {
      const el = present({ unread: true, time: '5m' });
      expect(classes(at(texts(el), 0))).toContain('font-bold');
      expect(el.querySelector('[data-xen-v4-status-dot="primary"]')).not.toBeNull();
      // Decorative — the row's own label already announces "unread".
      expect(el.querySelector('[data-xen-v4-status-dot]')?.getAttribute('aria-hidden')).toBe(
        'true'
      );
      // Not pulsing: a list of unread rows blinking in unison is noise.
      expect(el.querySelector('[data-xen-v4-status-echo]')).toBeNull();
      // Read rows are semibold and dotless.
      expect(classes(at(texts(present()), 0))).toContain('font-semibold');
      expect(present().querySelector('[data-xen-v4-status-dot]')).toBeNull();
    });
  });

  describe('typography — §4.3', () => {
    it('sets title `base`/semibold `onSurface` and body `sm`/`mutedText`', () => {
      const el = present({ body: 'Acme Inc' });
      const title = at(texts(el), 0);
      const body = at(texts(el), 1);
      expect(classes(title)).toEqual(expect.arrayContaining(['text-base', 'font-semibold']));
      expect(classes(title)).toContain('text-on-surface');
      expect(classes(body)).toEqual(expect.arrayContaining(['text-sm', 'text-muted-text']));
      // `muted` is a FILL. Not one run of text may wear it.
      texts(el).forEach((t) => expect(classes(t)).not.toContain('text-muted'));
    });

    it('truncates both lines rather than letting a long title reflow the row', () => {
      const el = present({ body: 'a very long supporting line' });
      texts(el)
        .slice(0, 2)
        .forEach((t) => {
          // `TextV4 numberOfLines={1}` — the clamp is inline layout, not a
          // token. jsdom drops the vendor-prefixed clamp property it does not
          // implement, so the two declarations it does keep are what we assert.
          expect(t.style.display).toBe('-webkit-box');
          expect(t.style.overflow).toBe('hidden');
        });
    });
  });

  describe('the timestamp — §4.3', () => {
    it('is `xs`/`mutedText`', () => {
      const el = present({ time: '5m ago' });
      const stamp = texts(el).find((t) => t.textContent === '5m ago') as HTMLElement;
      expect(classes(stamp)).toEqual(expect.arrayContaining(['text-xs', 'text-muted-text']));
    });

    it('top-aligns on a two-line row and centres on a one-line row', () => {
      const two = present({ body: 'Acme Inc', time: '5m' });
      expect(classes(at(columns(two), 2))).toContain('self-start');
      const one = present({ time: '5m' });
      expect(at(columns(one), 2).className).toBe(ROW_V4_TRAILING_CLASS);
    });

    it('draws no trailing column at all when there is neither a stamp nor an unread mark', () => {
      expect(present({ body: 'Acme Inc' }).children).toHaveLength(2);
    });
  });

  describe('press feedback is the state layer — §4.3', () => {
    it('marks the row for the shared layer and names the opaque card pair', () => {
      const el = present({ onClick: jest.fn() });
      expect(el.getAttribute('data-xen-v4-state')).toBe('');
      expect(el.getAttribute('style')).toContain('--xen-v4-state-ground');
      expect(el.getAttribute('style')).toContain('--xen-v4-state-ink');
    });

    it('deletes every opacity and hover-ground the base carried', () => {
      const el = present({ onClick: jest.fn(), unread: true });
      expect(el.className).not.toMatch(/hover:opacity-\d+/);
      expect(el.className).not.toMatch(/hover:bg-/);
      expect(el.className).not.toMatch(/\bopacity-\d+/);
      expect(el.className).not.toContain('transition-opacity');
      expect(el.style.opacity).toBe('');
    });

    it('gives an inert row no state hooks at all', () => {
      const el = present();
      expect(el.getAttribute('data-xen-v4-state')).toBeNull();
      expect(el.getAttribute('data-interactive')).toBe('false');
    });
  });

  describe('empty states — §4.5', () => {
    it('renders nothing when there is no title, no body and no time', () => {
      expect(row({ title: '   ' })).toBeNull();
      expect(row({ title: '', body: '', time: '' })).toBeNull();
    });

    it('renders a blank-titled row that still has a body or a stamp', () => {
      expect(row({ title: '', body: 'Acme Inc' })).not.toBeNull();
      expect(row({ title: '', time: '5m' })).not.toBeNull();
      // …and does not paint an empty title line.
      expect(texts(present({ title: '', body: 'Acme Inc' }))).toHaveLength(1);
    });

    it('survives a title alone: one badge, one line, no blank columns', () => {
      const el = present();
      expect(el.children).toHaveLength(2);
      expect(texts(el)).toHaveLength(1);
    });
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = present({
      body: 'Acme Inc · $420.00',
      time: '5m ago',
      unread: true,
      onClick: jest.fn(),
      icon: 'card',
      iconTone: 'success',
    });
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.outerHTML).not.toMatch(/\brgba?\(/);
    expect(el.outerHTML).not.toMatch(/class="[^"]*\[\d+px\]/);
    expect(el.outerHTML).not.toMatch(/neutral-\d/);
  });
});
