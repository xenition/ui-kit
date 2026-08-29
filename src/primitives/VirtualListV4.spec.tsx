/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { EmptyStateV4 } from './EmptyStateV4';
import type { VirtualList } from './VirtualList';
import { VirtualListV4 } from './VirtualListV4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ROWS = ['Ada', 'Grace', 'Alan'];

function mount(props: Partial<React.ComponentProps<typeof VirtualListV4<string>>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <VirtualListV4<string>
        data={ROWS}
        renderItem={(row) => <span>{row}</span>}
        keyExtractor={(row) => row}
        {...props}
      />
    </XenitionUIProvider>
  );
}

describe('VirtualListV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof VirtualList<string>> = {
      data: ROWS,
      renderItem: (row) => <span>{row}</span>,
      keyExtractor: (row) => row,
      estimatedItemSize: 40,
      separators: true,
      emptyText: 'Nothing here yet',
      loading: false,
      maxHeight: 480,
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof VirtualListV4<string>> = same;
    expect(asV4).toBe(same);
  });

  it('renders every row with the caller’s renderer', () => {
    const { getByText, container } = mount();
    for (const row of ROWS) expect(getByText(row)).toBeTruthy();
    expect(container.querySelectorAll('[role="listitem"]')).toHaveLength(3);
  });

  it('rings the spinner in the scheme-resolved hairline, not a ramp step', () => {
    const { container } = mount({ loading: true });
    const spinner = container.querySelector('[role="status"]')!;
    // The base's `border-neutral-300` is a LIGHT-oriented ramp step, so its
    // track is a bright ring on a dark page.
    expect(spinner.className).not.toContain('neutral-300');
    expect(spinner.className).toContain('border-border');
    expect(spinner.className).toContain('border-t-primary');
    expect(spinner.getAttribute('aria-label')).toBe('Loading');
  });

  it('writes the empty line in the AA-promising muted slot', () => {
    const { getByText } = mount({ data: [] });
    const line = getByText('Nothing here yet');
    expect(line.className).toContain('text-muted-text');
    expect(line.className).not.toMatch(/text-muted(?!-text)/);
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
    const on = mount();
    expect(on.container.querySelector('[role="list"]')!.className).toContain('divide-y');
    const off = mount({ separators: false });
    expect(off.container.querySelector('[role="list"]')!.className).not.toContain('divide-y');
  });

  it('keeps the windowing contract: maxHeight caps a scrolling box', () => {
    const { container } = mount({ maxHeight: 200, estimatedItemSize: 40 });
    const list = container.querySelector('[role="list"]') as HTMLElement;
    expect(list.style.maxHeight).toBe('200px');
    expect(list.className).toContain('overflow-auto');
    expect((container.querySelector('[role="listitem"]') as HTMLElement).style.minHeight).toBe(
      '40px'
    );
  });

  it('survives its empty state with no emptyText given', () => {
    const { getByText } = mount({ data: [], emptyText: undefined });
    expect(getByText('Nothing here yet')).toBeTruthy();
  });

  it('introduces no literal colours', () => {
    const { container } = mount({ loading: true });
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
