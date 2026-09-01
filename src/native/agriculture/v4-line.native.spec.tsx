/**
 * The **V4 agriculture line** (native) — the props V4 adds and the empty
 * states, across all twelve.
 *
 * The web twin asserts the same things against the same prop names. The one
 * place they deliberately differ is `YieldChartV4`, which replaces the base's
 * `color` with `tone` on both twins alike.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
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
import type { ReactTestInstance } from 'react-test-renderer';

describe('farm-v4 helpers', () => {
  it('clamps a percentage and refuses a non-number', () => {
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(-3)).toBe(0);
    // The guard one of the six inline copies forgot, which rendered `NaN%`.
    expect(clampPercent(Number.NaN)).toBeUndefined();
    expect(clampPercent(undefined)).toBeUndefined();
  });

  it('drops the empty fragments from a caption', () => {
    expect(metaLine(['North field', '', undefined, '12 Aug'])).toBe('North field · 12 Aug');
  });
});

describe('CropCardV4', () => {
  it('renders a skeleton while loading, and nothing without a name', () => {
    const loading = renderThemed(<CropCardV4 name="Wheat" loading />, SEED_LIGHT);
    expect(loading.queryByText('Wheat')).toBeNull();
    loading.unmount();

    const empty = renderThemed(<CropCardV4 name="" />, SEED_LIGHT);
    expect(empty.toJSON()).toBeNull();
  });

  it('lets the host rename the stage and the meter', () => {
    const { getByText } = renderThemed(
      <CropCardV4
        name="Wheat"
        stage="mature"
        progress={72}
        stageLabels={{ mature: 'Reif' }}
        progressLabel="Reifegrad"
      />,
      SEED_LIGHT
    );
    expect(getByText('Reif')).toBeTruthy();
    expect(getByText('Reifegrad')).toBeTruthy();
    expect(getByText('72%')).toBeTruthy();
  });
});

describe('FieldCardV4', () => {
  it('formats the area through the host s formatter', () => {
    const { getByText } = renderThemed(
      <FieldCardV4 name="North" area={12.4} areaUnit="ha" formatArea={(a, u) => `${a}${u}`} />,
      SEED_LIGHT
    );
    expect(getByText('12.4ha')).toBeTruthy();
  });

  it('renders nothing without a name', () => {
    const { toJSON } = renderThemed(<FieldCardV4 name="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('EquipmentStatusV4', () => {
  it('takes the low-fuel threshold as a prop', () => {
    // 25% is fine for a tractor and low for a cold-store generator.
    const { getByText } = renderThemed(
      <EquipmentStatusV4 name="Genset" fuelPct={25} lowFuelThreshold={40} />,
      SEED_LIGHT
    );
    expect(getByText('25%')).toBeTruthy();
  });

  it('renders nothing without a name', () => {
    const { toJSON } = renderThemed(<EquipmentStatusV4 name="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('FarmTaskRowV4', () => {
  it('says overdue in words, not only in red', () => {
    const { getByText } = renderThemed(
      <FarmTaskRowV4 title="Spray block 4" due="Yesterday" overdue />,
      SEED_LIGHT
    );
    expect(getByText('overdue')).toBeTruthy();
  });

  it('drops the overdue badge once the task is done', () => {
    const { queryByText } = renderThemed(
      <FarmTaskRowV4 title="Spray block 4" due="Yesterday" overdue done />,
      SEED_LIGHT
    );
    expect(queryByText('overdue')).toBeNull();
  });

  it('reports the next checkbox value', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <FarmTaskRowV4 title="Spray block 4" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Spray block 4'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('LivestockRowV4', () => {
  it('shows the unknown marker when there is no count', () => {
    const { getByText } = renderThemed(
      <LivestockRowV4 species="Cattle" unknownCountLabel="?" />,
      SEED_LIGHT
    );
    expect(getByText('?')).toBeTruthy();
  });

  it('formats a known count', () => {
    const { getByText } = renderThemed(
      <LivestockRowV4 species="Cattle" count={1240} formatCount={(n) => n.toLocaleString('en-US')} />,
      SEED_LIGHT
    );
    expect(getByText('1,240')).toBeTruthy();
  });
});

describe('MarketPriceRowV4', () => {
  it('derives the direction from the change when it is not given', () => {
    const { getByLabelText } = renderThemed(
      <MarketPriceRowV4 commodity="Wheat" price="£210" changePct={2.4} />,
      SEED_LIGHT
    );
    // The word is what makes direction survive greyscale and CVD.
    expect(getByLabelText(/up \+2\.4%/)).toBeTruthy();
  });

  it('lets the host format the change', () => {
    const { getByText } = renderThemed(
      <MarketPriceRowV4
        commodity="Wheat"
        price="£210"
        changePct={2.4}
        formatChange={(n) => `${n.toFixed(2)} pc`}
      />,
      SEED_LIGHT
    );
    expect(getByText('2.40 pc')).toBeTruthy();
  });
});

describe('PestAlertV4', () => {
  it('labels the recommendation rather than leaving it as loose prose', () => {
    const { getByText } = renderThemed(
      <PestAlertV4 pest="Aphids" recommendation="Scout block 3 within 48h" />,
      SEED_LIGHT
    );
    expect(getByText('Recommended action')).toBeTruthy();
  });

  it('renders nothing without a pest', () => {
    const { toJSON } = renderThemed(<PestAlertV4 pest="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('WeatherAdvisoryV4', () => {
  /*
    `*ByRole` does not reach a View whose accessible ancestor already claimed a
    role, so the house query for this is a host-element scan — the same shape
    `ProgressV4`'s spec uses. `typeof type === 'string'` keeps it to host
    elements, because `findAll` also returns the composite that rendered them.
  */
  const roles = (root: ReactTestInstance, role: string): ReactTestInstance[] =>
    root.findAll((n) => typeof n.type === 'string' && n.props?.accessibilityRole === role);

  it('interrupts only at the severe end', () => {
    const severe = renderThemed(
      <WeatherAdvisoryV4 title="Storm tonight" severity="severe" />,
      SEED_LIGHT
    );
    expect(roles(severe.root, 'alert')).toHaveLength(1);
    severe.unmount();

    // An `info` advisory announcing itself as an alert is how a user learns to
    // ignore all of them.
    const info = renderThemed(<WeatherAdvisoryV4 title="Light rain" severity="info" />, SEED_LIGHT);
    expect(roles(info.root, 'alert')).toHaveLength(0);
    expect(roles(info.root, 'summary')).toHaveLength(1);
  });
});

describe('HarvestLogV4', () => {
  it('labels the total', () => {
    const { getByText } = renderThemed(
      <HarvestLogV4 entries={[]} total="18.4 t" totalLabel="Season" />,
      SEED_LIGHT
    );
    expect(getByText('Season')).toBeTruthy();
  });

  it('says how many rows it hid', () => {
    const entries = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      crop: `Crop ${i}`,
      quantity: i,
    }));
    const { getByText } = renderThemed(
      <HarvestLogV4 entries={entries} maxRows={2} formatRemaining={(n) => `${n} weitere`} />,
      SEED_LIGHT
    );
    expect(getByText('3 weitere')).toBeTruthy();
  });
});

describe('IrrigationScheduleV4', () => {
  it('reports a toggle with the zone id and the next value', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <IrrigationScheduleV4
        slots={[{ id: 'z1', zone: 'Zone 1', enabled: true }]}
        onToggle={onToggle}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Zone 1'));
    expect(onToggle).toHaveBeenCalledWith('z1', false);
  });

  it('explains an empty schedule', () => {
    const { getByText } = renderThemed(
      <IrrigationScheduleV4 slots={[]} emptyDescription="Add a zone to begin." />,
      SEED_LIGHT
    );
    expect(getByText('Add a zone to begin.')).toBeTruthy();
  });
});

describe('SoilMoistureCardV4', () => {
  it('derives the band from the reading', () => {
    const dry = renderThemed(<SoilMoistureCardV4 moisture={12} />, SEED_LIGHT);
    expect(dry.getByText('Dry')).toBeTruthy();
    dry.unmount();

    const wet = renderThemed(<SoilMoistureCardV4 moisture={88} />, SEED_LIGHT);
    expect(wet.getByText('Saturated')).toBeTruthy();
  });

  it('shows the unknown marker with no reading', () => {
    const { getByText } = renderThemed(<SoilMoistureCardV4 unknownLabel="n/a" />, SEED_LIGHT);
    expect(getByText('n/a')).toBeTruthy();
  });
});

describe('YieldChartV4', () => {
  it('composes without a tone — the palette does identity', () => {
    const { getByText } = renderThemed(
      <YieldChartV4 data={[3, 5, 4]} headline="12.4" unit="t/ha" />,
      SEED_LIGHT
    );
    expect(getByText('12.4')).toBeTruthy();
    expect(getByText('t/ha')).toBeTruthy();
  });

  it('shows the chart s own empty state, not a bare sentence', () => {
    const { getByText } = renderThemed(
      <YieldChartV4 data={[]} emptyLabel="Nothing recorded" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing recorded')).toBeTruthy();
  });
});
