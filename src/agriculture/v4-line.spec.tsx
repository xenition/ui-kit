/** @jest-environment jsdom */
/**
 * The **V4 agriculture line** (web) — the twin of
 * `native/agriculture/v4-line.native.spec.tsx`, plus the defect this twin had
 * and native did not: an interactive card was a `<div>` with `role="button"`,
 * `tabIndex` and a hand-written Enter/Space handler.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CropCardV4 } from './CropCardV4';
import { FieldCardV4 } from './FieldCardV4';
import { EquipmentStatusV4 } from './EquipmentStatusV4';
import { FarmTaskRowV4 } from './FarmTaskRowV4';
import { LivestockRowV4 } from './LivestockRowV4';
import { MarketPriceRowV4 } from './MarketPriceRowV4';
import { PestAlertV4 } from './PestAlertV4';
import { WeatherAdvisoryV4 } from './WeatherAdvisoryV4';
import { HarvestLogV4 } from './HarvestLogV4';
import { IrrigationScheduleV4 } from './IrrigationScheduleV4';
import { SoilMoistureCardV4 } from './SoilMoistureCardV4';
import { YieldChartV4 } from './YieldChartV4';
import { clampPercent, metaLine } from './internal/farm-v4';

describe('farm-v4 helpers', () => {
  it('clamps a percentage and refuses a non-number', () => {
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(-3)).toBe(0);
    expect(clampPercent(Number.NaN)).toBeUndefined();
  });

  it('drops the empty fragments from a caption', () => {
    expect(metaLine(['North field', '', undefined, '12 Aug'])).toBe('North field · 12 Aug');
  });
});

describe('the interactive cards are real buttons', () => {
  it.each([
    ['CropCardV4', <CropCardV4 key="c" name="Wheat" onClick={jest.fn()} />],
    ['FieldCardV4', <FieldCardV4 key="f" name="North" onClick={jest.fn()} />],
    ['EquipmentStatusV4', <EquipmentStatusV4 key="e" name="Tractor" onClick={jest.fn()} />],
  ])('%s renders a <button>, not a div with role=button', (_name, element) => {
    const { container } = render(element);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    // The base's approximation: role + tabIndex + a key handler on a div.
    expect(container.querySelector('div[role="button"]')).toBeNull();
  });

  it('fires on click', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<CropCardV4 name="Wheat" onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('CropCardV4', () => {
  it('renders a skeleton while loading, and nothing without a name', () => {
    const loading = render(<CropCardV4 name="Wheat" loading />);
    expect(loading.queryByText('Wheat')).toBeNull();
    loading.unmount();

    const empty = render(<CropCardV4 name="" />);
    expect(empty.container.firstChild).toBeNull();
  });

  it('lets the host rename the stage and the meter', () => {
    const { getByText } = render(
      <CropCardV4
        name="Wheat"
        stage="mature"
        progress={72}
        stageLabels={{ mature: 'Reif' }}
        progressLabel="Reifegrad"
      />
    );
    expect(getByText('Reif')).toBeTruthy();
    expect(getByText('Reifegrad')).toBeTruthy();
    expect(getByText('72%')).toBeTruthy();
  });
});

describe('FieldCardV4', () => {
  it('formats the area through the host s formatter', () => {
    const { getByText } = render(
      <FieldCardV4 name="North" area={12.4} areaUnit="ha" formatArea={(a, u) => `${a}${u}`} />
    );
    expect(getByText('12.4ha')).toBeTruthy();
  });
});

describe('EquipmentStatusV4', () => {
  it('takes the low-fuel threshold as a prop', () => {
    const { getByText } = render(
      <EquipmentStatusV4 name="Genset" fuelPct={25} lowFuelThreshold={40} />
    );
    expect(getByText('25%')).toBeTruthy();
  });
});

describe('FarmTaskRowV4', () => {
  it('says overdue in words, not only in red', () => {
    const { getByText } = render(
      <FarmTaskRowV4 title="Spray block 4" due="Yesterday" overdue />
    );
    expect(getByText('overdue')).toBeTruthy();
  });

  it('reports the next checkbox value', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <FarmTaskRowV4 title="Spray block 4" onToggle={onToggle} />
    );
    fireEvent.click(getByLabelText('Spray block 4'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('LivestockRowV4', () => {
  it('formats a known count and marks an unknown one', () => {
    const known = render(
      <LivestockRowV4 species="Cattle" count={1240} formatCount={(n) => n.toLocaleString('en-US')} />
    );
    expect(known.getByText('1,240')).toBeTruthy();
    known.unmount();

    const unknown = render(<LivestockRowV4 species="Cattle" unknownCountLabel="?" />);
    expect(unknown.getByText('?')).toBeTruthy();
  });
});

describe('MarketPriceRowV4', () => {
  it('names the direction, so it is never colour alone', () => {
    const { getByLabelText } = render(
      <MarketPriceRowV4 commodity="Wheat" price="£210" changePct={2.4} />
    );
    expect(getByLabelText(/up \+2\.4%/)).toBeTruthy();
  });

  it('lets the host format the change', () => {
    const { getByText } = render(
      <MarketPriceRowV4
        commodity="Wheat"
        price="£210"
        changePct={2.4}
        formatChange={(n) => `${n.toFixed(2)} pc`}
      />
    );
    expect(getByText('2.40 pc')).toBeTruthy();
  });
});

describe('PestAlertV4', () => {
  it('labels the recommendation rather than leaving it as loose prose', () => {
    const { getByText } = render(
      <PestAlertV4 pest="Aphids" recommendation="Scout block 3 within 48h" />
    );
    expect(getByText('Recommended action')).toBeTruthy();
  });

  it('renders nothing without a pest', () => {
    const { container } = render(<PestAlertV4 pest="" />);
    expect(container.firstChild).toBeNull();
  });
});

describe('WeatherAdvisoryV4', () => {
  it('interrupts only at the severe end', () => {
    const severe = render(<WeatherAdvisoryV4 title="Storm tonight" severity="severe" />);
    expect(severe.getByRole('alert')).toBeTruthy();
    severe.unmount();

    const info = render(<WeatherAdvisoryV4 title="Light rain" severity="info" />);
    expect(info.queryByRole('alert')).toBeNull();
    expect(info.getByRole('status')).toBeTruthy();
  });
});

describe('HarvestLogV4', () => {
  it('labels the total and announces the rows as a list', () => {
    const entries = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      crop: `Crop ${i}`,
      quantity: i,
    }));
    const { getByText, getAllByRole } = render(
      <HarvestLogV4 entries={entries} total="18.4 t" totalLabel="Season" maxRows={2} />
    );
    expect(getByText('Season')).toBeTruthy();
    expect(getAllByRole('listitem')).toHaveLength(2);
    expect(getByText('+3 more')).toBeTruthy();
  });
});

describe('IrrigationScheduleV4', () => {
  it('reports a toggle with the zone id and the next value', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <IrrigationScheduleV4
        slots={[{ id: 'z1', zone: 'Zone 1', enabled: true }]}
        onToggle={onToggle}
      />
    );
    fireEvent.click(getByLabelText('Zone 1'));
    expect(onToggle).toHaveBeenCalledWith('z1', false);
  });

  it('explains an empty schedule', () => {
    const { getByText } = render(
      <IrrigationScheduleV4 slots={[]} emptyDescription="Add a zone to begin." />
    );
    expect(getByText('Add a zone to begin.')).toBeTruthy();
  });
});

describe('SoilMoistureCardV4', () => {
  it('derives the band from the reading', () => {
    const dry = render(<SoilMoistureCardV4 moisture={12} />);
    expect(dry.getByText('Dry')).toBeTruthy();
    dry.unmount();

    const wet = render(<SoilMoistureCardV4 moisture={88} />);
    expect(wet.getByText('Saturated')).toBeTruthy();
  });

  it('shows the unknown marker with no reading', () => {
    const { getByText } = render(<SoilMoistureCardV4 unknownLabel="n/a" />);
    expect(getByText('n/a')).toBeTruthy();
  });
});

describe('YieldChartV4', () => {
  it('composes without a tone — the palette does identity', () => {
    const { getByText } = render(<YieldChartV4 data={[3, 5, 4]} headline="12.4" unit="t/ha" />);
    expect(getByText('12.4')).toBeTruthy();
    expect(getByText('t/ha')).toBeTruthy();
  });

  it('shows the chart s own empty state, not a bare sentence', () => {
    const { getByText } = render(<YieldChartV4 data={[]} emptyLabel="Nothing recorded" />);
    expect(getByText('Nothing recorded')).toBeTruthy();
  });
});
