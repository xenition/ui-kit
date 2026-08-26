/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { DescriptionsV4 } from './DescriptionsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS = [
  { label: 'Status', value: 'Active' },
  { label: 'Balance', value: '$1,204.50' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('DescriptionsV4 (web)', () => {
  it('makes the value the content and the label the caption', () => {
    const { getByText } = renderThemed(<DescriptionsV4 items={ITEMS} />);
    const value = getByText('Active');
    const label = getByText('Status');
    expect(value.tagName).toBe('DD');
    expect(value.className).toContain('text-base');
    expect(value.className).toContain('font-semibold');
    expect(value.className).toContain('text-on-surface');
    expect(label.tagName).toBe('DT');
    expect(label.className).toContain('text-xs');
    expect(label.className).toContain('text-muted');
  });

  it('stops the label shouting — no uppercase, no tracking', () => {
    const { getByText } = renderThemed(<DescriptionsV4 items={ITEMS} />);
    expect(getByText('Status').className).not.toContain('uppercase');
    expect(getByText('Status').className).not.toContain('tracking');
  });

  it('separates pairs by more than it separates a label from its value', () => {
    const { container } = renderThemed(<DescriptionsV4 items={ITEMS} />);
    const dl = container.querySelector('dl') as HTMLElement;
    expect(dl.className).toContain('gap-y-[var(--xen-space-lg)]');
    const pair = container.querySelector('dl > div') as HTMLElement;
    expect(pair.className).toContain('gap-0.5');
  });

  it('sets a quantity in tabular figures and leaves prose alone', () => {
    const { getByText } = renderThemed(<DescriptionsV4 items={ITEMS} />);
    expect(getByText('$1,204.50').className).toContain('[font-variant-numeric:tabular-nums]');
    expect(getByText('Active').className).not.toContain('tabular-nums');
  });

  it('lays out one or two columns', () => {
    const one = renderThemed(<DescriptionsV4 items={ITEMS} />);
    expect((one.container.querySelector('dl') as HTMLElement).className).toContain('grid-cols-1');
    const two = renderThemed(<DescriptionsV4 items={ITEMS} columns={2} />);
    expect((two.container.querySelector('dl') as HTMLElement).className).toContain(
      'sm:grid-cols-2'
    );
  });

  it('wraps nothing in a container — §11', () => {
    const { container } = renderThemed(<DescriptionsV4 items={ITEMS} />);
    const dl = container.querySelector('dl') as HTMLElement;
    expect(dl.className).not.toContain('border');
    expect(dl.className).not.toContain('rounded');
    expect(dl.className).not.toContain('shadow');
    container.querySelectorAll('dl > div').forEach((pair) => {
      expect(pair.className).not.toContain('border');
      expect(pair.className).not.toContain('shadow');
    });
  });

  it('renders a node value untouched', () => {
    const { getByText } = renderThemed(
      <DescriptionsV4 items={[{ label: 'Owner', value: <b>Ada</b> }]} />
    );
    expect(getByText('Ada').tagName).toBe('B');
  });
});
