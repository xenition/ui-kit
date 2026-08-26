/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TimelineV4 } from './TimelineV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS = [
  { time: '09:05', title: 'Order placed', description: 'by Ada' },
  { time: '11:42', title: 'Shipped', description: 'DHL', tone: 'success' as const },
  { time: '14:20', title: 'Delivered', tone: 'neutral' as const },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('TimelineV4 (web)', () => {
  it('leads with the time, in tabular figures', () => {
    const { container, getByText } = renderThemed(<TimelineV4 items={ITEMS} />);
    const content = container.querySelector('li > div:nth-child(2)') as HTMLElement;
    expect(content.firstElementChild?.textContent).toBe('09:05');
    expect(getByText('09:05').className).toContain('[font-variant-numeric:tabular-nums]');
  });

  it('ranks the title above the description by size and weight, not colour alone', () => {
    const { getByText } = renderThemed(<TimelineV4 items={ITEMS} />);
    expect(getByText('Order placed').className).toContain('text-base');
    expect(getByText('Order placed').className).toContain('font-semibold');
    expect(getByText('by Ada').className).toContain('text-xs');
    expect(getByText('by Ada').className).toContain('text-muted');
  });

  it('runs the rail dot-to-dot: the padding is on the content, not the row', () => {
    const { container } = renderThemed(<TimelineV4 items={ITEMS} />);
    const items = Array.from(container.querySelectorAll('li'));
    items.forEach((li) => expect(li.className).not.toContain('pb-'));
    const contents = items.map((li) => li.children[1] as HTMLElement);
    expect(contents[0]?.className).toContain('pb-[var(--xen-space-lg)]');
    expect(contents[2]?.className).toContain('pb-0');
    // The connector fills what is left of that height.
    const connectors = container.querySelectorAll('li > div:first-child > span:nth-child(2)');
    expect(connectors).toHaveLength(2); // not on the last item
    connectors.forEach((c) => expect(c.className).toContain('flex-1'));
  });

  it('sizes the dot from the spacing scale, not a Tailwind step', () => {
    const { container } = renderThemed(<TimelineV4 items={ITEMS} />);
    const dot = container.querySelector('li > div:first-child > span') as HTMLElement;
    expect(dot.className).toContain('h-sm');
    expect(dot.className).toContain('w-sm');
    expect(dot.className).toContain('mt-xs');
    expect(dot.className).not.toContain('h-2.5');
  });

  it('paints a neutral dot from the semantic slot, never a ramp step', () => {
    const { container } = renderThemed(<TimelineV4 items={ITEMS} />);
    const dots = Array.from(container.querySelectorAll('li > div:first-child > span:first-child'));
    expect(dots[0]?.className).toContain('bg-primary');
    expect(dots[1]?.className).toContain('bg-success');
    // `bg-neutral-300` mirrors with the scheme; `bg-muted` is checked in both.
    expect(dots[2]?.className).toContain('bg-muted');
    dots.forEach((d) => expect(d.className).not.toContain('bg-neutral-'));
  });

  it('wraps no entry in a card and lifts nothing — §11, §8', () => {
    const { container } = renderThemed(<TimelineV4 items={ITEMS} />);
    container.querySelectorAll('li, li > div').forEach((el) => {
      expect(el.className).not.toContain('border');
      expect(el.className).not.toContain('shadow');
      expect(el.className).not.toContain('rounded-[var(--xen-radius-md)]');
    });
  });

  it('renders without a time or a description', () => {
    const { getByText, container } = renderThemed(<TimelineV4 items={[{ title: 'Only' }]} />);
    expect(getByText('Only')).toBeTruthy();
    expect(container.querySelectorAll('li')).toHaveLength(1);
  });
});
