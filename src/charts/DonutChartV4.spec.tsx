/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { DonutChartV4 } from './DonutChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

const SEED: ThemeSeed = {
  primary: '#0D9488',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as unknown as HTMLElement;
}

function pathData(root: HTMLElement): string[] {
  return Array.from(root.querySelectorAll('path')).map((p) => p.getAttribute('d') ?? '');
}

const SPLIT = [
  { label: 'Used', value: 70 },
  { label: 'Free', value: 30 },
];

describe('DonutChartV4 (web)', () => {
  // ── §5: the ring itself ────────────────────────────────────────────

  it('draws real annuli, not pie wedges with a surface disc punched over them', () => {
    const root = draw(<DonutChartV4 data={SPLIT} />);
    // The base drew wedges then covered the middle with a <circle fill=surface>,
    // which appears as a surface-coloured disc the moment the chart sits on a
    // card. There is no such circle here.
    expect(root.querySelectorAll('circle').length).toBe(0);
    const ds = pathData(root);
    expect(ds.length).toBe(2);
    // An annulus walks out along one radius and back along the other, so each
    // segment carries two arc commands, not one.
    for (const d of ds) expect(d.match(/A/g)?.length).toBe(2);
  });

  it('takes the family’s derived thickness, and a fraction of the radius when told', () => {
    const derived = draw(<DonutChartV4 data={SPLIT} size={200} />);
    // 200 * 0.1 = 20, which is well over the dotSize floor.
    expect(radialThicknessV4(200)).toBe(20);
    expect(pathData(derived)[0]).toContain(
      `A${(200 / 2 - CHART_MARK.gap / 2 - 20).toFixed(2)}`
    );

    // A fraction of the OUTER RADIUS — never the base's px on native and
    // fraction on web for the same prop name.
    const thick = draw(<DonutChartV4 data={SPLIT} size={200} thickness={0.5} />);
    const rOuter = 200 / 2 - CHART_MARK.gap / 2;
    expect(pathData(thick)[0]).toContain(`A${(rOuter - rOuter * 0.5).toFixed(2)}`);
  });

  it('separates segments with CHART_MARK.gap of surface', () => {
    const root = draw(<DonutChartV4 data={SPLIT} />);
    const first = root.querySelector('path') as SVGPathElement;
    expect(first.getAttribute('stroke')).toBe('var(--xen-surface)');
    expect(first.getAttribute('stroke-width')).toBe(String(CHART_MARK.gap));
  });

  it('paints from the palette in assignment order and reaches status only via tone', () => {
    const root = draw(<DonutChartV4 data={SPLIT} />);
    expect(Array.from(root.querySelectorAll('path')).map((p) => p.getAttribute('fill'))).toEqual([
      'var(--xen-chart-1)',
      'var(--xen-chart-2)',
    ]);
    const toned = draw(
      <DonutChartV4
        data={[
          { label: 'Within budget', value: 80, tone: 'success' },
          { label: 'Overspend', value: 20, tone: 'danger' },
        ]}
      />
    );
    expect(Array.from(toned.querySelectorAll('path')).map((p) => p.getAttribute('fill'))).toEqual([
      'var(--xen-success)',
      'var(--xen-danger)',
    ]);
  });

  // ── §5: the centre is a slot for `summary` ─────────────────────────

  it('puts `summary` in the hole and hides the duplicate from assistive tech', () => {
    const root = draw(<DonutChartV4 data={SPLIT} summary="70%" title="Storage" />);
    const centre = root.querySelector('[data-xen-v4-donut-center]') as HTMLElement;
    expect(centre.textContent).toBe('70%');
    expect(centre.getAttribute('aria-hidden')).toBe('true');
    // …and the svg says it out loud instead, once.
    expect(root.querySelector('svg')?.getAttribute('aria-label')).toContain('70%');
  });

  it('renders no centre slot when there is no summary', () => {
    const root = draw(<DonutChartV4 data={SPLIT} />);
    expect(root.querySelector('[data-xen-v4-donut-center]')).toBeNull();
  });

  // ── §7 open question 2: the fold ───────────────────────────────────

  it('folds a six-segment donut and says so in the legend', () => {
    const root = draw(
      <DonutChartV4
        data={[
          { label: 'A', value: 9 },
          { label: 'B', value: 8 },
          { label: 'C', value: 7 },
          { label: 'D', value: 6 },
          { label: 'E', value: 2 },
          { label: 'F', value: 1 },
        ]}
      />
    );
    expect(root.querySelectorAll('path').length).toBe(5);
    expect(root.textContent).toContain('Other (2 categories)');
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders title, caption and a legend of names and shares', () => {
    const root = draw(<DonutChartV4 data={SPLIT} title="Storage" caption="of 2 TB" />);
    expect(root.textContent).toContain('Storage');
    expect(root.textContent).toContain('of 2 TB');
    expect(root.textContent).toContain('Used');
    expect(root.textContent).toContain('70%');
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the plot’s footprint', () => {
    const root = draw(<DonutChartV4 data={[]} size={180} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('180px');
  });

  it('draws a single datum as a whole ring with a real hole, and no NaN', () => {
    const root = draw(<DonutChartV4 data={[{ label: 'Only', value: 7 }]} size={160} />);
    const only = root.querySelector('path') as SVGPathElement;
    expect(only.getAttribute('fill-rule')).toBe('evenodd');
    expect(only.getAttribute('fill')).toBe('var(--xen-chart-1)');
    // Two full circles in one path: four arc commands, no 360° arc anywhere.
    expect(only.getAttribute('d')?.match(/A/g)?.length).toBe(4);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('emits no NaN when the ring is thick enough to close the hole entirely', () => {
    const root = draw(<DonutChartV4 data={SPLIT} thickness={1} />);
    for (const d of pathData(root)) expect(d).not.toContain('NaN');
  });

  it('swaps the plot for a skeleton when loading, keeping the title', () => {
    const root = draw(<DonutChartV4 data={SPLIT} loading title="Storage" />);
    expect(root.querySelector('svg')).toBeNull();
    expect(root.textContent).toContain('Storage');
  });

  // ── §1 rule 6: it says its value in words ──────────────────────────

  it('derives the accessible sentence, and folds into it', () => {
    const root = draw(<DonutChartV4 data={SPLIT} summary="70%" />);
    expect(root.querySelector('svg')?.getAttribute('aria-label')).toBe(
      'Donut chart, 2 segments, 70%, largest Used at 70%'
    );
  });
});
