import * as React from 'react';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { BarChart } from './BarChart';
import { ColumnChart } from './ColumnChart';
import { MiniBar } from './MiniBar';
import { Sparkline } from './Sparkline';
import { StackedBar } from './StackedBar';
import { Histogram } from './Histogram';
import { Heatmap } from './Heatmap';
import { RangeBar } from './RangeBar';
import { TrendCard } from './TrendCard';
import { Legend } from './Legend';
import { ProgressBars } from './ProgressBars';
import { ComparisonBars } from './ComparisonBars';

describe('charts (native)', () => {
  it('BarChart mounts with sample data and labels', () => {
    const { getByText, toJSON } = renderThemed(
      <BarChart data={[3, 7, 4, 9]} labels={['Q1', 'Q2', 'Q3', 'Q4']} />,
      SEED_LIGHT
    );
    expect(getByText('Q2')).toBeTruthy();
    expect(toJSON()).toBeTruthy();
  });

  it('ColumnChart renders labelled horizontal bars with values', () => {
    const { getByText } = renderThemed(
      <ColumnChart
        data={[
          { label: 'Alpha', value: 12 },
          { label: 'Beta', value: 30 },
        ]}
        showValues
      />,
      SEED_LIGHT
    );
    expect(getByText('Beta')).toBeTruthy();
    expect(getByText('30')).toBeTruthy();
  });

  it('Heatmap mounts a grid without crashing', () => {
    const { toJSON } = renderThemed(
      <Heatmap
        data={[
          [0, 2, 5],
          [3, 8, 1],
        ]}
      />,
      SEED_DARK
    );
    expect(toJSON()).toBeTruthy();
  });

  it('TrendCard shows label, value, delta and an inline sparkline', () => {
    const { getByText } = renderThemed(
      <TrendCard label="Revenue" value="$4.2k" delta="+12%" data={[1, 3, 2, 5, 4]} />,
      SEED_LIGHT
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$4.2k')).toBeTruthy();
    expect(getByText('+12%')).toBeTruthy();
  });

  it('ComparisonBars renders grouped bars and group labels', () => {
    const { getByText } = renderThemed(
      <ComparisonBars
        data={[
          { label: 'Jan', values: [4, 6] },
          { label: 'Feb', values: [8, 3] },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Jan')).toBeTruthy();
    expect(getByText('Feb')).toBeTruthy();
  });

  it('the simple View-based charts mount', () => {
    expect(
      renderThemed(<MiniBar value={40} max={100} />, SEED_LIGHT).toJSON()
    ).toBeTruthy();
    expect(
      renderThemed(<Sparkline data={[2, 4, 3, 6, 5, 7]} />, SEED_LIGHT).toJSON()
    ).toBeTruthy();
    expect(
      renderThemed(
        <StackedBar
          segments={[
            { value: 3, color: 'primary' },
            { value: 5, color: 'primary', opacity: 0.5 },
          ]}
        />,
        SEED_LIGHT
      ).toJSON()
    ).toBeTruthy();
    expect(
      renderThemed(<Histogram bins={[1, 4, 9, 6, 2]} />, SEED_LIGHT).toJSON()
    ).toBeTruthy();
    expect(
      renderThemed(<RangeBar start={20} end={65} />, SEED_LIGHT).toJSON()
    ).toBeTruthy();
    expect(
      renderThemed(
        <Legend items={[{ label: 'Sales' }, { label: 'Costs', opacity: 0.5 }]} />,
        SEED_LIGHT
      ).getByText('Sales')
    ).toBeTruthy();
    expect(
      renderThemed(
        <ProgressBars items={[{ label: 'A', value: 30 }, { label: 'B', value: 70 }]} />,
        SEED_LIGHT
      ).getByText('A')
    ).toBeTruthy();
  });

  it('every chart renders its empty state without crashing', () => {
    expect(renderThemed(<BarChart data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<ColumnChart data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<Sparkline data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<Histogram bins={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<StackedBar segments={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<Heatmap data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<Legend items={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<ProgressBars items={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    expect(renderThemed(<ComparisonBars data={[]} />, SEED_LIGHT).getByText('No data')).toBeTruthy();
    // MiniBar/RangeBar/TrendCard have no list input — they simply mount.
    expect(renderThemed(<MiniBar value={0} max={0} />, SEED_LIGHT).toJSON()).toBeTruthy();
  });
});
