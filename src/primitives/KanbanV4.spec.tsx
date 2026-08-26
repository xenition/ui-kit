/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { Kanban, KanbanColumn } from './Kanban';
import { KanbanV4 } from './KanbanV4';
import { CHROME_V4_STYLE_ID } from './internal/chrome-v4';
import { ZEBRA_MIX, zebraCss } from './internal/v4-data';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const COLUMNS: KanbanColumn[] = [
  {
    key: 'todo',
    title: 'To do',
    cards: [
      { id: '1', title: 'Draft the brief', description: 'Two paragraphs, no more.' },
      { id: '2', title: 'Book the room' },
    ],
  },
  { key: 'done', title: 'Done', cards: [] },
];

function mount(props: Partial<React.ComponentProps<typeof KanbanV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <KanbanV4 columns={COLUMNS} {...props} />
    </XenitionUIProvider>
  );
}

const chromeCss = (): string => document.getElementById(CHROME_V4_STYLE_ID)?.textContent ?? '';
const navCss = (): string => document.getElementById('xen-v4-nav-styles')?.textContent ?? '';

describe('KanbanV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Kanban> = {
      columns: COLUMNS,
      onCardPress: () => {},
      columnWidth: 300,
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof KanbanV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders columns, counts and cards', () => {
    const { getByText, container } = mount();
    expect(getByText('To do')).toBeTruthy();
    expect(getByText('Draft the brief')).toBeTruthy();
    expect(container.querySelectorAll('[data-xen-v4-kanban-column]')).toHaveLength(2);
  });

  it('separates the two levels by GROUND, not by two nested outlines', () => {
    // §8's "cards inside cards inside cards": the base gives the column a
    // border and a `surface` fill, then does the same to every card inside it.
    const { container, getByText } = mount();
    const column = container.querySelector('[data-xen-v4-kanban-column]') as HTMLElement;
    expect(column.className).not.toContain('border');
    expect(column.getAttribute('data-xen-v4-tray')).toBe('');
    expect(chromeCss()).toContain(`[data-xen-v4-tray] {\n  background-color: ${zebraCss(ZEBRA_MIX)};`);

    const card = getByText('Draft the brief').closest('button')!;
    expect(card.className).toContain('border-border');
    expect(card.className).toContain('bg-surface');
    // Neither level is a layer.
    expect(column.className).not.toMatch(/shadow/);
    expect(card.className).not.toMatch(/shadow/);
  });

  it('gives the count chip a pair the compiler actually guarantees', () => {
    const { container } = mount();
    const chip = container.querySelector('[data-xen-v4-nav-badge]')!;
    // `bg-muted` + `text-surface` is a decorative slot filled with a page
    // colour: nothing measured that pair, and both move per scheme.
    expect(chip.className).not.toContain('bg-muted');
    expect(chip.className).not.toContain('text-surface');
    expect(navCss()).toContain('var(--xen-on-surface) 12%, var(--xen-surface)');
    expect(chip.textContent).toBe('2');
  });

  it('hovers and rings a card from the shared recipes', () => {
    const { getByText } = mount();
    const card = getByText('Draft the brief').closest('button')!;
    expect(card.getAttribute('data-xen-v4-chrome')).toBe('on-surface');
    // The base's `hover:bg-neutral-50` is a light-oriented ramp step, and
    // `ring-primary-300` inverts the same way.
    expect(card.className).not.toContain('neutral-50');
    expect(card.className).not.toContain('primary-300');
    expect(chromeCss()).toContain('outline: 2px solid var(--xen-ring);');
  });

  it('writes secondary copy in the AA-promising muted slot', () => {
    const { getByText } = mount();
    expect(getByText('Two paragraphs, no more.').className).toContain('text-muted-text');
    expect(getByText('No cards').className).toContain('text-muted-text');
  });

  it('fires onCardPress with the card and its column', () => {
    const onCardPress = jest.fn();
    const { getByText } = mount({ onCardPress });
    fireEvent.click(getByText('Book the room'));
    expect(onCardPress).toHaveBeenCalledWith(COLUMNS[0]!.cards[1], COLUMNS[0]);
  });

  it('honours columnWidth on every column', () => {
    const { container } = mount({ columnWidth: 300 });
    for (const col of Array.from(
      container.querySelectorAll<HTMLElement>('[data-xen-v4-kanban-column]')
    )) {
      expect(col.style.width).toBe('300px');
      expect(col.style.minWidth).toBe('300px');
    }
  });

  it('survives its empty states: an empty column and an empty board', () => {
    const { getByText } = mount();
    expect(getByText('No cards')).toBeTruthy();
    const bare = mount({ columns: [] });
    expect(bare.container.querySelectorAll('[data-xen-v4-kanban-column]')).toHaveLength(0);
  });

  it('introduces no literal colours', () => {
    const { container } = mount();
    expect(chromeCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
