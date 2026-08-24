import * as React from 'react';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { LineChart } from './LineChart';
import { AreaChart } from './AreaChart';
import { PieChart } from './PieChart';
import { DonutChart } from './DonutChart';
import { RadarChart } from './RadarChart';
import { GaugeChart } from './GaugeChart';
import { ProgressRing } from './ProgressRing';
import { ScatterChart } from './ScatterChart';

describe('svg charts (native)', () => {
  it('LineChart mounts with bare numbers and dots', () => {
    const { toJSON } = renderThemed(
      <LineChart data={[3, 7, 4, 9, 6]} showDots color="accent" />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeTruthy();
  });

  it('AreaChart mounts with {x,y} points', () => {
    const { toJSON } = renderThemed(
      <AreaChart
        data={[
          { x: 0, y: 2 },
          { x: 1, y: 5 },
          { x: 2, y: 3 },
          { x: 3, y: 8 },
        ]}
      />,
      SEED_DARK
    );
    expect(toJSON()).toBeTruthy();
  });

  it('PieChart mounts with a legend and renders labels', () => {
    const { getByText } = renderThemed(
      <PieChart
        data={[
          { label: 'Alpha', value: 5 },
          { label: 'Beta', value: 3 },
          { label: 'Gamma', value: 2, color: 'success' },
        ]}
        showLegend
      />,
      SEED_LIGHT
    );
    expect(getByText('Alpha')).toBeTruthy();
    expect(getByText('Gamma')).toBeTruthy();
  });

  it('DonutChart mounts with a center label', () => {
    const { getByText } = renderThemed(
      <DonutChart
        data={[
          { label: 'Used', value: 70 },
          { label: 'Free', value: 30 },
        ]}
        centerLabel="70%"
      />,
      SEED_LIGHT
    );
    expect(getByText('70%')).toBeTruthy();
  });

  it('RadarChart mounts with multiple series', () => {
    const { toJSON } = renderThemed(
      <RadarChart
        axes={['Speed', 'Power', 'Range', 'Cost', 'Weight']}
        series={[
          [3, 5, 2, 4, 1],
          [4, 2, 5, 1, 3],
        ]}
      />,
      SEED_DARK
    );
    expect(toJSON()).toBeTruthy();
  });

  it('GaugeChart mounts and shows a clamped value', () => {
    const { getByText } = renderThemed(
      <GaugeChart value={150} max={100} />,
      SEED_LIGHT
    );
    // 150 clamped to max 100.
    expect(getByText('100')).toBeTruthy();
  });

  it('ProgressRing mounts and shows a percentage', () => {
    const { getByText } = renderThemed(
      <ProgressRing value={45} max={90} />,
      SEED_LIGHT
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('ScatterChart mounts with points and axes', () => {
    const { toJSON } = renderThemed(
      <ScatterChart
        points={[
          { x: 1, y: 2 },
          { x: 3, y: 5 },
          { x: 5, y: 1 },
          { x: 2, y: 4 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeTruthy();
  });

  it('every svg chart renders its empty / degenerate state without crashing', () => {
    expect(renderThemed(<LineChart data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<AreaChart data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<PieChart data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(
      renderThemed(<PieChart data={[{ label: 'z', value: 0 }]} />, SEED_LIGHT).getByText('No data')
    ).toBeTruthy();
    expect(renderThemed(<DonutChart data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(
      renderThemed(<RadarChart axes={[]} series={[]} />, SEED_LIGHT).getByText('No data')
    ).toBeTruthy();
    expect(
      renderThemed(<GaugeChart value={1} max={0} />, SEED_LIGHT).getByText('No data')
    ).toBeTruthy();
    expect(
      renderThemed(<ProgressRing value={1} max={0} />, SEED_LIGHT).getByText('No data')
    ).toBeTruthy();
    expect(renderThemed(<ScatterChart points={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
  });

  it('single-slice pie and donut fall back to a full circle', () => {
    expect(
      renderThemed(<PieChart data={[{ label: 'Only', value: 5 }]} />, SEED_LIGHT).toJSON()
    ).toBeTruthy();
    expect(
      renderThemed(<DonutChart data={[{ label: 'Only', value: 5 }]} />, SEED_DARK).toJSON()
    ).toBeTruthy();
  });
});
