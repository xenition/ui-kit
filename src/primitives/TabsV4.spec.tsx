/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TabsV4 } from './TabsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS = [
  { value: 'a', label: 'Overview' },
  { value: 'b', label: 'Activity' },
  { value: 'c', label: 'Settings' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('TabsV4 (web)', () => {
  it('renders a tablist of tabs and reports the selected one', () => {
    const { getAllByRole } = renderThemed(<TabsV4 items={ITEMS} value="b" onChange={() => {}} />);
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('false');
  });

  it('says "selected" in colour AND weight, so neither channel is load-bearing alone', () => {
    const { getAllByRole } = renderThemed(<TabsV4 items={ITEMS} value="b" onChange={() => {}} />);
    const [inactive, active] = getAllByRole('tab');
    expect(active!.className).toContain('font-semibold');
    expect(active!.className).toContain('text-primary-text');
    expect(inactive!.className).toContain('font-medium');
    expect(inactive!.className).toContain('text-muted');
  });

  it('labels the selected tab with `primary-text`, never the bare fill slot', () => {
    const { getAllByRole } = renderThemed(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    // `text-primary` is a FILL colour with no contrast promise as text; the
    // selected tab must not be the least readable thing in the row.
    expect(getAllByRole('tab')[0]!.className).not.toMatch(/\btext-primary(?![-\w])/);
  });

  it('gives every tab a 44px target composed from the spacing scale', () => {
    const { getAllByRole } = renderThemed(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    getAllByRole('tab').forEach((tab) => {
      expect(tab.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    });
  });

  it('emits through `onValueChange`, and lets it win over `onChange`', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onValueChange={onValueChange} onChange={onChange} />
    );
    fireEvent.click(getAllByRole('tab')[2]!);
    expect(onValueChange).toHaveBeenCalledWith('c');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('falls back to `onChange` when that is the only spelling passed', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={onChange} />
    );
    fireEvent.click(getAllByRole('tab')[1]!);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('omits the indicator entirely when there is no layout to measure', () => {
    // jsdom reports every box as 0×0. The indicator has no honest position, so
    // it is not rendered — the colour and weight still say which tab is live.
    const { container } = renderThemed(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    expect(container.querySelector('[data-xen-v4-nav-indicator]')).toBeNull();
    expect(within(container).getAllByRole('tab')[0]!.className).toContain('font-semibold');
  });

  it('injects the navigation sheet once, with a moving indicator and a reduced-motion escape', () => {
    renderThemed(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    renderThemed(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    expect(document.querySelectorAll('#xen-v4-nav-styles')).toHaveLength(1);
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-indicator]');
    expect(css).toContain('transition: transform');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('names no literal colour — every value is a token', () => {
    // The provider's own `<style>` block is where the resolved hexes live; the
    // component's markup must name none of them.
    const { getByRole } = renderThemed(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    expect(getByRole('tablist').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { getByTestId } = renderThemed(
      <TabsV4
        items={ITEMS}
        value="a"
        onChange={() => {}}
        data-testid="tabs"
        ref={(n) => {
          node = n;
        }}
        id="sections"
      />
    );
    const el = getByTestId('tabs');
    expect(node).toBe(el);
    expect(el.getAttribute('id')).toBe('sections');
    expect(el.getAttribute('role')).toBe('tablist');
  });

  it('degrades without a provider rather than throwing', () => {
    const { getAllByRole } = render(<TabsV4 items={ITEMS} value="a" onChange={() => {}} />);
    expect(getAllByRole('tab')).toHaveLength(3);
  });
});
