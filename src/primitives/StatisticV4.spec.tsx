/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { StatisticV4 } from './StatisticV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('StatisticV4 (web)', () => {
  it('sets the hero number in tabular figures on the display face', () => {
    const { getByText } = renderThemed(<StatisticV4 label="Revenue" value="1,204" />);
    const hero = getByText('1,204');
    expect(hero.className).toContain('[font-variant-numeric:tabular-nums]');
    expect(hero.className).toContain('font-heading');
    expect(hero.className).toContain('text-3xl');
    expect(hero.className).toContain('leading-none');
  });

  it('demotes the label to a caption so the number grows without growing', () => {
    const { getByText } = renderThemed(<StatisticV4 label="Revenue" value="1,204" />);
    expect(getByText('Revenue').className).toContain('text-xs');
    expect(getByText('Revenue').className).toContain('text-muted');
    expect(getByText('Revenue').className).not.toContain('text-sm');
  });

  it('sits the suffix on the number baseline instead of nudging it', () => {
    const { getByText, container } = renderThemed(
      <StatisticV4 label="Storage" value="12" suffix="GB" />
    );
    const row = container.querySelector('span.flex') as HTMLElement;
    expect(row.className).toContain('items-baseline');
    expect(row.className).not.toContain('items-end');
    expect(getByText('GB').className).not.toContain('pb-');
  });

  it('inks the delta with the contrast-safe TEXT slot, not the fill colour', () => {
    const up = renderThemed(<StatisticV4 label="a" value="1" delta={12} />);
    const upDelta = up.container.querySelector('span.font-semibold') as HTMLElement;
    expect(upDelta.className).toContain('text-success-text');
    // …and not the fill class, which carries no contrast promise as ink.
    expect(upDelta.className.split(' ')).not.toContain('text-success');

    const down = renderThemed(<StatisticV4 label="a" value="1" delta={-3} />);
    const downDelta = down.container.querySelector('span.font-semibold') as HTMLElement;
    expect(downDelta.className).toContain('text-danger-text');
    expect(downDelta.className.split(' ')).not.toContain('text-danger');

    const flat = renderThemed(<StatisticV4 label="a" value="1" delta={0} />);
    expect((flat.container.querySelector('span.font-semibold') as HTMLElement).className).toContain(
      'text-muted'
    );
  });

  it('sets the delta in tabular figures too and hides the arrow from AT', () => {
    const { container } = renderThemed(<StatisticV4 label="a" value="1" delta="12%" trend="up" />);
    const delta = container.querySelector('span.font-semibold') as HTMLElement;
    expect(delta.className).toContain('[font-variant-numeric:tabular-nums]');
    expect(delta.querySelector('[aria-hidden="true"]')?.textContent).toBe('▲');
  });

  it('infers the trend from a numeric delta and honours an explicit one', () => {
    const inferred = renderThemed(<StatisticV4 label="a" value="1" delta={-5} />);
    expect(inferred.container.textContent).toContain('▼');
    const forced = renderThemed(<StatisticV4 label="a" value="1" delta={-5} trend="up" />);
    expect(forced.container.textContent).toContain('▲');
  });

  it('renders bare — no card, no border, no shadow (§11)', () => {
    const { container } = renderThemed(<StatisticV4 label="a" value="1" delta={1} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).not.toContain('border');
    expect(root.className).not.toContain('shadow');
    expect(root.className).not.toContain('bg-');
    expect(root.className).not.toContain('rounded');
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { container } = renderThemed(
      <StatisticV4
        label="a"
        value="1"
        id="kpi"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(container.querySelector('#kpi'));
  });

  it('renders a node value untouched', () => {
    const { getByText } = renderThemed(<StatisticV4 label="a" value={<b>Live</b>} />);
    expect(getByText('Live').tagName).toBe('B');
  });
});
