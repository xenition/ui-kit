import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { MIN_CONTRAST, compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { EmptyStateV4 } from './EmptyStateV4';
import type { VirtualListProps } from './VirtualList';
import { VirtualListV4 } from './VirtualListV4';

const ROWS = ['Ada', 'Grace', 'Alan'];

function mount(props: Partial<VirtualListProps<string>> = {}) {
  return renderThemed(
    <VirtualListV4<string>
      data={ROWS}
      renderItem={({ item }) => <Text>{item}</Text>}
      keyExtractor={(item) => item}
      {...props}
    />,
    SEED_LIGHT
  );
}

function styles(root: ReactTestInstance): Array<Record<string, unknown>> {
  return root.findAll(() => true).map((n) => flatStyle(n.props?.style));
}

describe('VirtualListV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: VirtualListProps<string> = {
      data: ROWS,
      renderItem: ({ item }) => <Text>{item}</Text>,
      keyExtractor: (item) => item,
      estimatedItemSize: 40,
      separators: true,
      emptyText: 'Nothing here yet',
      loading: false,
    };
    const asV4: React.ComponentProps<typeof VirtualListV4<string>> = same;
    expect(asV4).toBe(same);
  });

  it('renders every row with the caller’s renderer', () => {
    const { getByText } = mount();
    for (const row of ROWS) expect(getByText(row)).toBeTruthy();
  });

  it('names the spinner, so system status reaches a screen reader too', () => {
    const { UNSAFE_root } = mount({ loading: true });
    // §37 asks that status be visible — to everyone, not only to people
    // looking at the pixels.
    expect(
      UNSAFE_root.findAll((n) => n.props?.accessibilityLabel === 'Loading').length
    ).toBeGreaterThan(0);
  });

  it('writes the empty line in the AA-promising muted slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = mount({ data: [] });
    const line = getByText('Nothing here yet').props.style;
    expect(line.color).toBe(theme.light.mutedText);
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(
      MIN_CONTRAST
    );
  });

  it('lets a caller pass a full empty state, because emptyText is a node', () => {
    // §15 wants an empty state that helps the user progress. This component can
    // only render what it is handed, so the escape hatch is the point.
    const { getByText } = mount({
      data: [],
      emptyText: <EmptyStateV4 title="No people yet" description="Invite someone to start." />,
    });
    expect(getByText('No people yet')).toBeTruthy();
    expect(getByText('Invite someone to start.')).toBeTruthy();
  });

  it('honours separators rather than quietly dropping them', () => {
    // §9 would rather spacing than rules, but this is a prop the caller set.
    const theme = compileTheme(SEED_LIGHT);
    const on = mount();
    expect(
      styles(on.UNSAFE_root).some((s) => s.height === 1 && s.backgroundColor === theme.light.border)
    ).toBe(true);
    const off = mount({ separators: false });
    expect(
      styles(off.UNSAFE_root).some(
        (s) => s.height === 1 && s.backgroundColor === theme.light.border
      )
    ).toBe(false);
  });

  it('keeps the list on the surface token', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(styles(mount().UNSAFE_root).some((s) => s.backgroundColor === theme.light.surface)).toBe(
      true
    );
  });

  it('survives its empty state with no emptyText given', () => {
    const { getByText } = mount({ data: [], emptyText: undefined });
    expect(getByText('Nothing here yet')).toBeTruthy();
  });
});
