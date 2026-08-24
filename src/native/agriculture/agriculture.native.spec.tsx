import * as React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { CropCard } from './CropCard';
import { FieldCard } from './FieldCard';
import { LivestockRow } from './LivestockRow';
import { HarvestLog, type HarvestEntry } from './HarvestLog';
import { WeatherAdvisory } from './WeatherAdvisory';
import { SoilMoistureCard } from './SoilMoistureCard';
import { IrrigationSchedule, type IrrigationSlot } from './IrrigationSchedule';
import { YieldChart } from './YieldChart';
import { EquipmentStatus } from './EquipmentStatus';
import { PestAlert } from './PestAlert';
import { MarketPriceRow } from './MarketPriceRow';
import { FarmTaskRow } from './FarmTaskRow';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('CropCard (native)', () => {
  it('renders name + stage and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <CropCard name="Winter Wheat" variety="Skyfall" stage="flowering" health="healthy" progress={62} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Winter Wheat')).toBeTruthy();
    expect(getByText('Flowering')).toBeTruthy();
    expect(getByText('62%')).toBeTruthy();
    fireEvent.press(getByText('Winter Wheat'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a loading placeholder', () => {
    expect(renderThemed(<CropCard name="X" loading />, SEED_DARK).toJSON()).toBeTruthy();
  });
});

describe('FieldCard (native)', () => {
  it('shows area + status label (color paired with text)', () => {
    const { getByText } = renderThemed(
      <FieldCard name="North 40" area={12.5} areaUnit="ha" crop="Maize" status="planted" />,
      SEED_LIGHT
    );
    expect(getByText('12.5 ha')).toBeTruthy();
    expect(getByText('Planted')).toBeTruthy();
  });
});

describe('LivestockRow (native)', () => {
  it('colors the count with the danger token when sick (with text chip)', () => {
    const { getByText } = renderThemed(
      <LivestockRow species="Dairy Cows" count={48} health="sick" location="Barn 2" />,
      SEED_LIGHT
    );
    // Token color assertion: sick count uses the danger slot.
    expect(flatten(getByText('48').props.style).color).toBe(lightColors.danger);
    // Not color-alone: a text status chip is present.
    expect(getByText('Sick')).toBeTruthy();
  });

  it('guards a missing count with an em dash', () => {
    const { getByText } = renderThemed(<LivestockRow species="Hens" />, SEED_DARK);
    expect(getByText('—')).toBeTruthy();
  });
});

describe('HarvestLog (native)', () => {
  const entries: HarvestEntry[] = [
    { id: 'a', crop: 'Wheat', quantity: 4.2, unit: 't', date: 'Aug 12', field: 'North 40' },
    { id: 'b', crop: 'Barley', quantity: 3.1, unit: 't', date: 'Aug 10' },
  ];

  it('lists harvest entries with a total', () => {
    const { getByText } = renderThemed(<HarvestLog entries={entries} total="7.3 t" />, SEED_LIGHT);
    expect(getByText('Wheat')).toBeTruthy();
    expect(getByText('7.3 t')).toBeTruthy();
  });

  it('renders an empty state when there are no entries', () => {
    const { getByText, queryByText } = renderThemed(
      <HarvestLog entries={[]} emptyTitle="Nothing harvested yet" />,
      SEED_DARK
    );
    expect(getByText('Nothing harvested yet')).toBeTruthy();
    expect(queryByText('Wheat')).toBeNull();
  });
});

describe('WeatherAdvisory (native)', () => {
  it('announces via the alert role and states severity as text', () => {
    const { getByText, getByLabelText } = renderThemed(
      <WeatherAdvisory title="Frost expected overnight" message="Lows near -2°C" kind="frost" severity="severe" />,
      SEED_LIGHT
    );
    expect(getByText('Frost expected overnight')).toBeTruthy();
    expect(getByText('Severe')).toBeTruthy();
    expect(getByLabelText(/Severe advisory/)).toBeTruthy();
  });
});

describe('SoilMoistureCard (native)', () => {
  it('derives the optimal band and renders a trend', () => {
    const { getByText } = renderThemed(
      <SoilMoistureCard moisture={55} label="Zone 3" trend={[40, 48, 52, 55]} soilTemp="18°C" />,
      SEED_LIGHT
    );
    expect(getByText('55')).toBeTruthy();
    expect(getByText('Optimal')).toBeTruthy();
  });
});

describe('IrrigationSchedule (native)', () => {
  const slots: IrrigationSlot[] = [
    { id: 'z1', zone: 'Zone 1 · Drip', time: '06:00', duration: '20 min', enabled: true, state: 'scheduled' },
  ];

  it('toggles a slot off', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <IrrigationSchedule slots={slots} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Zone 1 · Drip irrigation'));
    expect(onToggle).toHaveBeenCalledWith('z1', false);
  });

  it('renders an empty state when there are no slots', () => {
    const { getByText } = renderThemed(<IrrigationSchedule slots={[]} emptyTitle="No runs" />, SEED_DARK);
    expect(getByText('No runs')).toBeTruthy();
  });
});

describe('YieldChart (native)', () => {
  it('renders a headline and a muted note when empty', () => {
    const { getByText } = renderThemed(<YieldChart data={[]} headline="4.8" unit="t/ha" />, SEED_LIGHT);
    expect(getByText('4.8')).toBeTruthy();
    expect(getByText('No yield data yet')).toBeTruthy();
  });
});

describe('EquipmentStatus (native)', () => {
  it('flags low fuel and states the operational status as text', () => {
    const { getByText } = renderThemed(
      <EquipmentStatus name="Tractor 04" type="JD 6M" state="maintenance" fuelPct={12} />,
      SEED_LIGHT
    );
    expect(getByText('Maintenance')).toBeTruthy();
    expect(getByText('12% · Low')).toBeTruthy();
  });
});

describe('PestAlert (native)', () => {
  it('fires the action and announces via the alert role', () => {
    const onAction = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PestAlert pest="Aphid infestation" severity="high" affected="Tomatoes" actionLabel="Treat" onAction={onAction} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/High pest alert/)).toBeTruthy();
    fireEvent.press(getByText('Treat'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('MarketPriceRow (native)', () => {
  it('colors a downward change with the danger token and shows a signed glyph', () => {
    const { getByText } = renderThemed(
      <MarketPriceRow commodity="Wheat" price={284.5} unit="€/t" changePct={-0.6} />,
      SEED_LIGHT
    );
    const change = getByText('▼ 0.6%');
    // Token color assertion: a down move uses the danger slot.
    expect(flatten(change.props.style).color).toBe(lightColors.danger);
  });
});

describe('FarmTaskRow (native)', () => {
  it('toggles completion via the check control', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <FarmTaskRow title="Spray north orchard" due="Today" priority="high" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Mark Spray north orchard done'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('token purity (native agriculture, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CropCard name="Wheat" stage="growing" health="stressed" progress={40} fieldLabel="N40" harvestLabel="42 days" />
          <FieldCard name="South 20" area={8} crop="Soy" soilType="Loam" location="B2" status="fallow" />
          <LivestockRow species="Sheep" count={120} health="monitor" location="Paddock 3" />
          <HarvestLog
            entries={[{ id: 'a', crop: 'Rye', quantity: 2.4, unit: 't', date: 'Aug 1', grade: 'A' }]}
            total="2.4 t"
          />
          <HarvestLog entries={[]} />
          <WeatherAdvisory title="Heat" message="35°C" kind="heat" severity="warning" timeframe="Today" />
          <SoilMoistureCard moisture={22} status="dry" trend={[30, 26, 22]} soilTemp="20°C" label="Z1" />
          <IrrigationSchedule
            slots={[{ id: 'z1', zone: 'Zone 1', time: '06:00', duration: '20 min', state: 'running', enabled: true }]}
          />
          <IrrigationSchedule slots={[]} />
          <YieldChart data={[3, 4, 5]} labels={['21', '22', '23']} headline="4.0" unit="t/ha" />
          <EquipmentStatus name="Harvester" type="CX8" state="operational" fuelPct={80} hours="1,204 hrs" />
          <PestAlert pest="Blight" severity="critical" affected="Potatoes" recommendation="Fungicide" detectedAt="2h ago" actionLabel="Log" />
          <MarketPriceRow commodity="Corn" price={192.3} unit="€/t" changePct={1.8} market="today" />
          <FarmTaskRow title="Fertilize" due="Tomorrow" priority="urgent" field="Block C" assignee="Sam" overdue done />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
