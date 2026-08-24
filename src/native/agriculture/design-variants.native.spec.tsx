/**
 * Alternate-design (V2 / V3) coverage for the most-used native agriculture
 * components. Each variant is asserted to: mount, stay token-pure under both
 * seeds (every rendered hex traces to a compiled token), and — for the
 * interactive cards — fire its press handler.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  CropCardV2,
  CropCardV3,
  FieldCardV2,
  FieldCardV3,
  HarvestLogV2,
  HarvestLogV3,
  WeatherAdvisoryV2,
  WeatherAdvisoryV3,
  type HarvestEntry,
} from './index';

const ENTRIES: HarvestEntry[] = [
  { id: '1', crop: 'Winter Wheat', quantity: 4.2, unit: 't', field: 'North 40', date: 'Aug 12', grade: 'A' },
  { id: '2', crop: 'Maize', quantity: 6.1, unit: 't', field: 'Sector B', date: 'Aug 14' },
  { id: '3', crop: 'Barley', quantity: 3.3, unit: 't', field: 'East', date: 'Aug 16' },
];

describe('CropCard V2/V3 (native)', () => {
  it('CropCardV2 mounts with name, maturity ring, health, and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <CropCardV2 name="Winter Wheat" variety="Skyfall" stage="growing" health="healthy" progress={62} fieldLabel="North 40" harvestLabel="42 days" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Winter Wheat')).toBeTruthy();
    expect(getByText('62%')).toBeTruthy();
    expect(getByText('Healthy')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('CropCardV2 renders a loading skeleton', () => {
    expect(renderThemed(<CropCardV2 name="X" loading />, SEED_DARK).getByLabelText('Loading crop')).toBeTruthy();
  });

  it('CropCardV3 mounts as a dense line with stage + maturity', () => {
    const { getByText } = renderThemed(
      <CropCardV3 name="Barley" variety="Planet" stage="mature" health="stressed" progress={88} />,
      SEED_LIGHT
    );
    expect(getByText('88%')).toBeTruthy();
    expect(getByText('Mature')).toBeTruthy();
  });
});

describe('FieldCard V2/V3 (native)', () => {
  it('FieldCardV2 mounts with area hero + status and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <FieldCardV2 name="North 40" area={12.5} areaUnit="ha" crop="Maize" soilType="Clay loam" location="Sector B" status="planted" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('North 40')).toBeTruthy();
    expect(getByText('12.5')).toBeTruthy();
    expect(getByText('Planted')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('FieldCardV3 mounts as a compact row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <FieldCardV3 name="South Field" area={8} status="preparing" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('South Field')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('HarvestLog V2/V3 (native)', () => {
  it('HarvestLogV2 mounts a total hero + record rows', () => {
    const { getByText } = renderThemed(
      <HarvestLogV2 entries={ENTRIES} total="13.6 t" maxRows={2} />,
      SEED_LIGHT
    );
    expect(getByText('13.6 t')).toBeTruthy();
    expect(getByText('Winter Wheat')).toBeTruthy();
    expect(getByText('+1 more')).toBeTruthy();
  });

  it('HarvestLogV2 renders an empty state', () => {
    const { getByText } = renderThemed(
      <HarvestLogV2 entries={[]} emptyTitle="Nothing logged" />,
      SEED_DARK
    );
    expect(getByText('Nothing logged')).toBeTruthy();
  });

  it('HarvestLogV3 mounts a minimal log and collapses when empty', () => {
    const { getByText } = renderThemed(<HarvestLogV3 entries={ENTRIES} total="13.6 t" />, SEED_LIGHT);
    expect(getByText('13.6 t')).toBeTruthy();
    expect(renderThemed(<HarvestLogV3 entries={[]} emptyTitle="No harvests" />, SEED_DARK).getByText('No harvests')).toBeTruthy();
  });
});

describe('WeatherAdvisory V2/V3 (native)', () => {
  it('WeatherAdvisoryV2 mounts as an alert with severity text', () => {
    const { getByLabelText, getByText } = renderThemed(
      <WeatherAdvisoryV2 title="Frost expected overnight" message="Lows near -2°C" kind="frost" severity="severe" timeframe="Tonight → 7am" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Severe advisory/)).toBeTruthy();
    expect(getByText('Frost expected overnight')).toBeTruthy();
    expect(getByText('Severe')).toBeTruthy();
  });

  it('WeatherAdvisoryV3 mounts as a compact inline alert', () => {
    const { getByLabelText, getByText } = renderThemed(
      <WeatherAdvisoryV3 title="High winds" kind="wind" severity="watch" timeframe="14:00–18:00" />,
      SEED_DARK
    );
    expect(getByLabelText(/Watch advisory/)).toBeTruthy();
    expect(getByText('Watch')).toBeTruthy();
  });
});

describe('token purity (native agriculture design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CropCardV2 name="Winter Wheat" variety="Skyfall" stage="flowering" health="critical" progress={40} fieldLabel="North 40" harvestLabel="42 days" onPress={() => undefined} />
          <CropCardV3 name="Barley" variety="Planet" stage="seeding" health="healthy" progress={12} />
          <FieldCardV2 name="North 40" area={12.5} crop="Maize" soilType="Clay loam" location="Sector B" status="harvested" onPress={() => undefined} />
          <FieldCardV3 name="South Field" area={8} status="fallow" />
          <HarvestLogV2 entries={ENTRIES} total="13.6 t" maxRows={2} />
          <HarvestLogV2 entries={[]} />
          <HarvestLogV3 entries={ENTRIES} total="13.6 t" />
          <WeatherAdvisoryV2 title="Frost tonight" message="Lows near -2°C" kind="frost" severity="warning" timeframe="Tonight" />
          <WeatherAdvisoryV3 title="High winds" kind="wind" severity="info" timeframe="14:00" />
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
