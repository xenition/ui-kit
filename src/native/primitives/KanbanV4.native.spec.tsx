import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { SELECT_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import { stateMix } from '../../primitives/internal/v4-state';
import type { KanbanColumn, KanbanProps } from './Kanban';
import { KanbanV4 } from './KanbanV4';

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

function mount(props: Partial<KanbanProps> = {}, seed = SEED_LIGHT, scheme?: 'light' | 'dark') {
  return renderThemed(<KanbanV4 columns={COLUMNS} {...props} />, seed, scheme);
}

function styles(root: ReactTestInstance): Array<Record<string, unknown>> {
  return root.findAll(() => true).map((n) => flatStyle(n.props?.style));
}

function cardOf(root: ReactTestInstance, index: number): ReactTestInstance | undefined {
  return root.findAll(
    (n) => n.props?.accessibilityRole === 'button' && typeof n.props?.style === 'function'
  )[index * 2];
}

function styleAt(node: ReactTestInstance | undefined, pressed: boolean): Record<string, unknown> {
  const style = node?.props?.style;
  return flatStyle(typeof style === 'function' ? style({ pressed }) : style);
}

describe('KanbanV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: KanbanProps = {
      columns: COLUMNS,
      onCardPress: () => {},
      columnWidth: 300,
    };
    const asV4: React.ComponentProps<typeof KanbanV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders columns, counts and cards', () => {
    const { getByText } = mount();
    expect(getByText('To do')).toBeTruthy();
    expect(getByText('Draft the brief')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
  });

  it('separates the two levels by GROUND, not by two nested outlines', () => {
    // §8's "cards inside cards inside cards": the base gives the column a
    // border and a `surface` fill, then does the same to every card inside it.
    const theme = compileTheme(SEED_LIGHT);
    const tray = mixToken(theme.light.surface, theme.light.onSurface, ZEBRA_MIX);
    const { UNSAFE_root } = mount();
    const column = styles(UNSAFE_root).find((s) => s.backgroundColor === tray)!;
    expect(column).toBeDefined();
    expect(column.borderWidth).toBeUndefined();

    const card = styleAt(cardOf(UNSAFE_root, 0), false);
    expect(card.backgroundColor).toBe(theme.light.surface);
    expect(card.borderWidth).toBe(1);
    // Neither level is a layer.
    for (const s of styles(UNSAFE_root)) expect(s.shadowOpacity).toBeUndefined();
  });

  it('derives both grounds from the SCHEME-RESOLVED slots', () => {
    const theme = compileTheme(SEED_DARK);
    const { UNSAFE_root } = mount({}, SEED_DARK, 'dark');
    const tray = mixToken(theme.dark.surface, theme.dark.onSurface, ZEBRA_MIX);
    expect(styles(UNSAFE_root).some((s) => s.backgroundColor === tray)).toBe(true);
    // Never a ramp step: the ramps carry the light orientation in both schemes.
    expect(styles(UNSAFE_root).some((s) => s.backgroundColor === theme.ramps.neutral[50])).toBe(
      false
    );
  });

  it('gives the count chip a pair the compiler actually guarantees', () => {
    const theme = compileTheme(SEED_LIGHT);
    const chip = mixToken(theme.light.surface, theme.light.onSurface, SELECT_MIX);
    const { UNSAFE_root, getByText } = mount();
    // The base filled it with `muted` and inked it with `surface`: a decorative
    // slot under a page colour, a pair nothing had measured.
    expect(styles(UNSAFE_root).some((s) => s.backgroundColor === chip)).toBe(true);
    expect(styles(UNSAFE_root).some((s) => s.backgroundColor === theme.light.muted)).toBe(false);
    expect(getByText('2').props.style.color).toBe(theme.light.onSurface);
  });

  it('presses a card, which the base never did', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    // A tappable card with no press feedback is indistinguishable from a static
    // one until something happens elsewhere on the screen (§14).
    expect(styleAt(cardOf(UNSAFE_root, 0), true).backgroundColor).toBe(
      stateMix(theme.light.surface, theme.light.onSurface, 'pressed', theme.state)
    );
  });

  it('writes secondary copy in the AA-promising muted slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = mount();
    expect(getByText('Two paragraphs, no more.').props.style.color).toBe(theme.light.mutedText);
    expect(getByText('No cards').props.style.color).toBe(theme.light.mutedText);
  });

  it('fires onCardPress with the card and its column', () => {
    const onCardPress = jest.fn();
    const { getByText } = mount({ onCardPress });
    fireEvent.press(getByText('Book the room'));
    expect(onCardPress).toHaveBeenCalledWith(COLUMNS[0]!.cards[1], COLUMNS[0]);
  });

  it('honours columnWidth on every column', () => {
    const { UNSAFE_root } = mount({ columnWidth: 300 });
    // RN renders each View as a composite plus a host node, so every column
    // style appears twice; what matters is that no column carries any other width.
    const widths = styles(UNSAFE_root).filter((s) => typeof s.width === 'number');
    expect(widths.length).toBeGreaterThan(0);
    for (const s of widths) expect(s.width).toBe(300);
  });

  it('survives its empty states: an empty column and an empty board', () => {
    const { getByText } = mount();
    expect(getByText('No cards')).toBeTruthy();
    const bare = renderThemed(<KanbanV4 columns={[]} />, SEED_LIGHT);
    expect(bare.toJSON()).toBeTruthy();
  });

  it('paints only colours that exist in — or are mixed from — the compiled theme', () => {
    const theme = compileTheme(SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    for (const mix of [ZEBRA_MIX, SELECT_MIX]) {
      allowed.add(mixToken(theme.light.surface, theme.light.onSurface, mix).toLowerCase());
    }
    const { UNSAFE_root } = mount();
    for (const hex of renderedStyleHexes(UNSAFE_root)) {
      expect(allowed.has(hex) || allowed.has(hex.slice(0, 7))).toBe(true);
    }
  });
});
