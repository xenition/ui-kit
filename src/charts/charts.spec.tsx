/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  AreaChart,
  BarChart,
  ColumnChart,
  DonutChart,
  GaugeChart,
  Heatmap,
  Histogram,
  Legend,
  LineChart,
  PieChart,
  ProgressRing,
  RadarChart,
  ScatterChart,
  Sparkline,
  StackedBar,
  TrendCard,
} from './index';

describe('charts (web)', () => {
  it('LineChart renders a polyline from data', () => {
    const { container } = render(<LineChart data={[3, 7, 4, 9, 6]} />);
    const poly = container.querySelector('polyline');
    expect(poly).not.toBeNull();
    // Token-bound stroke, never a literal color.
    expect(poly?.getAttribute('stroke')).toBe('var(--xen-primary)');
  });

  it('AreaChart renders a filled path plus the line', () => {
    const { container } = render(<AreaChart data={[1, 5, 2, 8]} color="accent" />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(2);
    expect(paths[0]?.getAttribute('fill')).toBe('var(--xen-accent)');
  });

  it('BarChart renders one rect per datum with labels', () => {
    const { container, getByText } = render(
      <BarChart data={[3, 7, 4]} labels={['A', 'B', 'C']} />
    );
    expect(container.querySelectorAll('rect').length).toBe(3);
    expect(getByText('B')).toBeTruthy();
  });

  it('ColumnChart renders labelled rows and values', () => {
    const { getByText } = render(
      <ColumnChart
        data={[
          { label: 'Alpha', value: 12 },
          { label: 'Beta', value: 30 },
        ]}
        showValues
      />
    );
    expect(getByText('Beta')).toBeTruthy();
    expect(getByText('30')).toBeTruthy();
  });

  it('PieChart renders one arc path per slice and cycles token colors', () => {
    const { container } = render(<PieChart data={[{ value: 3 }, { value: 5 }, { value: 2 }]} />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(3);
    expect(paths[0]?.getAttribute('fill')).toBe('var(--xen-primary)');
    expect(paths[1]?.getAttribute('fill')).toBe('var(--xen-accent)');
  });

  it('DonutChart punches a surface-filled hole and shows a center label', () => {
    const { container, getByText } = render(
      <DonutChart data={[{ value: 1 }, { value: 1 }]} centerLabel="2" />
    );
    const circles = container.querySelectorAll('circle');
    expect(circles[circles.length - 1]?.getAttribute('fill')).toBe('var(--xen-surface)');
    expect(getByText('2')).toBeTruthy();
  });

  it('RadarChart renders a polygon for a single series', () => {
    const { container } = render(<RadarChart data={[4, 8, 6, 9, 5]} labels={['a', 'b', 'c', 'd', 'e']} />);
    // 4 grid rings + 1 series polygon.
    expect(container.querySelectorAll('polygon').length).toBe(5);
  });

  it('GaugeChart clamps out-of-range values without throwing', () => {
    const { container } = render(<GaugeChart value={250} max={100} />);
    expect(container.querySelector('path')).not.toBeNull();
  });

  it('ProgressRing renders a percentage label', () => {
    const { getByText } = render(<ProgressRing value={40} max={80} />);
    expect(getByText('50%')).toBeTruthy();
  });

  it('ScatterChart plots one circle per point', () => {
    const { container } = render(
      <ScatterChart data={[{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 4, y: 1 }]} />
    );
    // 3 point circles (axes are lines, not circles).
    expect(container.querySelectorAll('circle').length).toBe(3);
  });

  it('Sparkline renders a polyline for a multi-point series', () => {
    const { container } = render(<Sparkline data={[2, 4, 3, 6]} />);
    expect(container.querySelector('polyline')).not.toBeNull();
  });

  it('StackedBar sizes segments by share of total', () => {
    const { container } = render(
      <StackedBar segments={[{ value: 1 }, { value: 3, opacity: 0.6 }]} />
    );
    // track + 2 segments.
    expect(container.querySelectorAll('rect').length).toBe(3);
  });

  it('Histogram renders one bar per bin', () => {
    const { container } = render(<Histogram bins={[1, 4, 6, 3, 2]} />);
    expect(container.querySelectorAll('rect').length).toBe(5);
  });

  it('Heatmap paints a grid varying only opacity', () => {
    const { container } = render(
      <Heatmap
        data={[
          [0, 1, 2],
          [3, 4, 5],
        ]}
      />
    );
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(6);
    // Every cell uses the same token color.
    rects.forEach((r) => expect(r.getAttribute('fill')).toBe('var(--xen-primary)'));
  });

  it('TrendCard shows the stat, delta, and an inline sparkline', () => {
    const { getByText, container } = render(
      <TrendCard label="Revenue" value="$1.2k" delta="+12%" data={[1, 2, 3, 4]} />
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$1.2k')).toBeTruthy();
    expect(getByText('+12%')).toBeTruthy();
    expect(container.querySelector('polyline')).not.toBeNull();
  });

  it('Legend renders a swatch + label per item', () => {
    const { getByText } = render(<Legend items={[{ label: 'One' }, { label: 'Two' }]} />);
    expect(getByText('One')).toBeTruthy();
    expect(getByText('Two')).toBeTruthy();
  });

  it('forwards a ref to the root SVG', () => {
    const ref = createRef<SVGSVGElement>();
    render(<LineChart ref={ref} data={[1, 2, 3]} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('svg');
  });

  describe('empty-data guards render the empty state, not a crash', () => {
    it.each([
      ['LineChart', <LineChart key="l" data={[]} />],
      ['AreaChart', <AreaChart key="a" data={[]} />],
      ['BarChart', <BarChart key="b" data={[]} />],
      ['ColumnChart', <ColumnChart key="c" data={[]} />],
      ['PieChart', <PieChart key="p" data={[]} />],
      ['DonutChart', <DonutChart key="d" data={[]} />],
      ['RadarChart', <RadarChart key="r" data={[]} />],
      ['ScatterChart', <ScatterChart key="s" data={[]} />],
      ['Sparkline', <Sparkline key="sp" data={[]} />],
      ['StackedBar', <StackedBar key="st" segments={[]} />],
      ['Histogram', <Histogram key="h" bins={[]} />],
      ['Heatmap', <Heatmap key="hm" data={[]} />],
      ['Legend', <Legend key="lg" items={[]} />],
    ])('%s shows "No data"', (_name, element) => {
      const { getByText } = render(element);
      expect(getByText('No data')).toBeTruthy();
    });

    it('PieChart/DonutChart also guard an all-zero total', () => {
      const { getByText } = render(<PieChart data={[{ value: 0 }, { value: 0 }]} />);
      expect(getByText('No data')).toBeTruthy();
    });
  });
});
