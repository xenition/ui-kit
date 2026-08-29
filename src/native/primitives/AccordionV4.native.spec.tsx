import * as React from 'react';
import { AccessibilityInfo, LayoutAnimation, Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { AccordionV4 } from './AccordionV4';

const ITEMS = [
  { value: 'a', title: 'Shipping', content: 'Two to four working days.' },
  { value: 'b', title: 'Returns', content: 'Thirty days, no questions.' },
];

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('AccordionV4 (native)', () => {
  it('opens and closes, one panel at a time by default', () => {
    const { getByText, queryByText } = renderThemed(<AccordionV4 items={ITEMS} />, SEED_LIGHT);
    expect(queryByText('Two to four working days.')).toBeNull();

    fireEvent.press(getByText('Shipping'));
    expect(getByText('Two to four working days.')).toBeTruthy();

    fireEvent.press(getByText('Returns'));
    expect(queryByText('Two to four working days.')).toBeNull();
    expect(getByText('Thirty days, no questions.')).toBeTruthy();
  });

  it('keeps several open when asked', () => {
    const { getByText } = renderThemed(<AccordionV4 items={ITEMS} type="multiple" />, SEED_LIGHT);
    fireEvent.press(getByText('Shipping'));
    fireEvent.press(getByText('Returns'));
    expect(getByText('Two to four working days.')).toBeTruthy();
    expect(getByText('Thirty days, no questions.')).toBeTruthy();
  });

  it('reveals on an ease-OUT curve — a panel arriving decelerates', () => {
    const configure = jest.spyOn(LayoutAnimation, 'configureNext');
    const { getByText } = renderThemed(<AccordionV4 items={ITEMS} />, SEED_LIGHT);
    fireEvent.press(getByText('Shipping'));
    const config = configure.mock.calls[0]?.[0] as {
      duration: number;
      update: { type: string };
    };
    // The base used `easeInEaseOut`, which accelerates into the reveal — the
    // curve for something on its way out.
    expect(config.update.type).toBe(LayoutAnimation.Types.easeOut);
    // §36.2: an enter is 160–240ms.
    expect(config.duration).toBeGreaterThanOrEqual(160);
    expect(config.duration).toBeLessThanOrEqual(240);
  });

  it('animates nothing when the OS asks for reduced motion — §36.10', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const configure = jest.spyOn(LayoutAnimation, 'configureNext');
    const { getByText } = renderThemed(<AccordionV4 items={ITEMS} />, SEED_LIGHT);
    // Let the async accessibility read land.
    await act(async () => undefined);

    fireEvent.press(getByText('Shipping'));
    // `LayoutAnimation` ignores the OS switch on its own; the base animated
    // every expand regardless of it.
    expect(configure).not.toHaveBeenCalled();
    // The interaction is untouched — only the movement went.
    expect(getByText('Two to four working days.')).toBeTruthy();
  });

  it('takes the chevron from the kit’s named icon set, decoratively', () => {
    const { getByText, getAllByText } = renderThemed(<AccordionV4 items={ITEMS} />, SEED_LIGHT);
    const marks = getAllByText(resolveIconGlyph('chevron-down'), { includeHiddenElements: true });
    expect(marks).toHaveLength(2);
    // The state is already on the header's `accessibilityState`.
    expect(marks[0]?.props.importantForAccessibility).toBe('no');
    expect(getByText('Shipping')).toBeTruthy();
  });

  it('reports expansion on the header itself', () => {
    const { getByText, getAllByRole } = renderThemed(<AccordionV4 items={ITEMS} />, SEED_LIGHT);
    const expanded = (): boolean[] =>
      getAllByRole('button').map(
        (n) => (n.props.accessibilityState as { expanded: boolean }).expanded
      );
    expect(expanded()).toEqual([false, false]);
    fireEvent.press(getByText('Shipping'));
    expect(expanded()).toEqual([true, false]);
  });

  it('gives every header the 44pt a finger needs', () => {
    const { getByText } = renderThemed(<AccordionV4 items={ITEMS} />, SEED_LIGHT);
    const header = getByText('Shipping').parent;
    let node = header;
    while (node && flat(node.props?.style).minHeight === undefined) node = node.parent;
    expect(flat(node?.props?.style).minHeight).toBe(44);
  });

  it('measures the body and the chevron against the page, in both schemes', () => {
    ([SEED_LIGHT, SEED_DARK] as const).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const surface = compileTheme(seed)[scheme].surface;
        const { getByText, getAllByText } = renderThemed(
          <AccordionV4 items={ITEMS} defaultValue={['a']} />,
          seed,
          scheme
        );
        // `muted` is `neutral[600]`; the compiler guarantees the on-pairs.
        const body = flat(getByText('Two to four working days.').props.style).color as string;
        expect(contrastRatio(body, surface)).toBeGreaterThanOrEqual(4.5);
        const mark = flat(
          getAllByText(resolveIconGlyph('chevron-down'), { includeHiddenElements: true })[0]?.props
            .style
        ).color as string;
        expect(contrastRatio(mark, surface)).toBeGreaterThanOrEqual(3);
      });
    });
  });

  it('renders rich titles and bodies untouched', () => {
    const { getByText } = renderThemed(
      <AccordionV4
        items={[{ value: 'x', title: <Text>Rich title</Text>, content: <Text>Rich body</Text> }]}
        defaultValue={['x']}
      />,
      SEED_LIGHT
    );
    expect(getByText('Rich title')).toBeTruthy();
    expect(getByText('Rich body')).toBeTruthy();
  });

  it('honours `defaultValue`', () => {
    const { getByText } = renderThemed(
      <AccordionV4 items={ITEMS} defaultValue={['b']} />,
      SEED_LIGHT
    );
    expect(getByText('Thirty days, no questions.')).toBeTruthy();
  });
});
