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
  CurrentWeatherV2,
  CurrentWeatherV3,
  CurrentWeatherV4,
  ForecastStripV2,
  ForecastStripV3,
  ForecastStripV4,
  HourlyRowV2,
  HourlyRowV3,
  HourlyRowV4,
  AirQualityCardV2,
  AirQualityCardV3,
  TemperatureGraphV4,
  type ForecastDay,
  type HourlyPoint,
} from './index';

const days: ForecastDay[] = [
  { label: 'Mon', condition: 'clear', high: 24, low: 14, precip: 0 },
  { label: 'Tue', condition: 'rain', high: 19, low: 12, precip: 80 },
  { label: 'Wed', condition: 'partly-cloudy', high: 22, low: 13, precip: 20 },
];

const hours: HourlyPoint[] = [
  { time: '9 AM', condition: 'clear', temperature: 18, precip: 0 },
  { time: '10 AM', condition: 'cloudy', temperature: 20, precip: 10 },
];

describe('CurrentWeather V2/V3 (native)', () => {
  it('V2 renders the hero temperature + condition label', () => {
    const { getByText } = renderThemed(
      <CurrentWeatherV2 location="San Francisco" temperature={21} condition="partly-cloudy" feelsLike={20} high={23} low={15} />,
      SEED_LIGHT
    );
    expect(getByText('21°')).toBeTruthy();
    expect(getByText('Partly cloudy')).toBeTruthy();
  });

  it('V3 renders compact temperature + inline hi/lo', () => {
    const { getByText } = renderThemed(
      <CurrentWeatherV3 location="SF" temperature={17} condition="rain" high={19} low={11} />,
      SEED_DARK
    );
    expect(getByText('17°')).toBeTruthy();
    expect(getByText('H 19°  ·  L 11°')).toBeTruthy();
  });

  it('V2 shows a skeleton while loading', () => {
    const { toJSON } = renderThemed(<CurrentWeatherV2 loading />, SEED_DARK);
    expect(toJSON()).toBeTruthy();
  });

  it('V3 shows a placeholder when temperature is absent', () => {
    const { getByText } = renderThemed(<CurrentWeatherV3 condition="clear" />, SEED_LIGHT);
    expect(getByText('—')).toBeTruthy();
  });
});

describe('ForecastStrip V2/V3 (native)', () => {
  it('V2 fires onSelectDay with the tapped day + index', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = renderThemed(
      <ForecastStripV2 days={days} selectedIndex={0} onSelectDay={onSelectDay} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/^Tue, Rain/));
    expect(onSelectDay).toHaveBeenCalledTimes(1);
    expect(onSelectDay).toHaveBeenCalledWith(days[1], 1);
  });

  it('V3 fires onSelectDay with the tapped day + index', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = renderThemed(
      <ForecastStripV3 days={days} selectedIndex={1} onSelectDay={onSelectDay} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/^Wed, Partly cloudy/));
    expect(onSelectDay).toHaveBeenCalledTimes(1);
    expect(onSelectDay).toHaveBeenCalledWith(days[2], 2);
  });

  it('renders a muted empty state when there are no days', () => {
    const v2 = renderThemed(<ForecastStripV2 days={[]} emptyLabel="Nothing yet" />, SEED_LIGHT);
    expect(v2.getByText('Nothing yet')).toBeTruthy();
    const v3 = renderThemed(<ForecastStripV3 days={[]} emptyLabel="Nothing here" />, SEED_DARK);
    expect(v3.getByText('Nothing here')).toBeTruthy();
  });
});

describe('HourlyRow V2/V3 (native)', () => {
  it('V2 renders per-hour temperatures', () => {
    const { getByText } = renderThemed(<HourlyRowV2 hours={hours} />, SEED_LIGHT);
    expect(getByText('20°')).toBeTruthy();
  });

  it('V3 renders a dense strip + empty state', () => {
    const { getByText } = renderThemed(<HourlyRowV3 hours={hours} />, SEED_DARK);
    expect(getByText('9 AM')).toBeTruthy();
    const empty = renderThemed(<HourlyRowV3 hours={[]} emptyLabel="No hours" />, SEED_LIGHT);
    expect(empty.getByText('No hours')).toBeTruthy();
  });
});

describe('AirQualityCard V2/V3 (native)', () => {
  it('V2 renders the AQI value + severity band label', () => {
    const { getByText } = renderThemed(
      <AirQualityCardV2 aqi={165} pollutant="PM2.5" advice="Limit time outdoors" />,
      SEED_LIGHT
    );
    expect(getByText('165')).toBeTruthy();
    expect(getByText('Unhealthy')).toBeTruthy();
  });

  it('V3 renders the AQI value + band chip', () => {
    const { getByText } = renderThemed(<AirQualityCardV3 aqi={42} pollutant="PM2.5" advice="Good day" />, SEED_DARK);
    expect(getByText('42')).toBeTruthy();
    expect(getByText('🟢 Good')).toBeTruthy();
  });

  it('V2 shows a skeleton while loading and an empty state', () => {
    const loading = renderThemed(<AirQualityCardV2 loading />, SEED_LIGHT);
    expect(loading.toJSON()).toBeTruthy();
    const empty = renderThemed(<AirQualityCardV3 emptyLabel="No AQI" />, SEED_DARK);
    expect(empty.getByText('No AQI')).toBeTruthy();
  });
});

describe('weather V4 — saturated hero line (native)', () => {
  it('CurrentWeatherV4 renders the hero temperature + condition on the brand ground', () => {
    const { getByText } = renderThemed(
      <CurrentWeatherV4 location="San Francisco" temperature={23} condition="clear" feelsLike={22} high={24} low={15} />,
      SEED_LIGHT
    );
    expect(getByText('23°')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
    expect(getByText('Feels 22°')).toBeTruthy();
  });

  it('CurrentWeatherV4 shows a placeholder when temperature is absent and a skeleton when loading', () => {
    const { getByText } = renderThemed(<CurrentWeatherV4 condition="rain" />, SEED_DARK);
    expect(getByText('—')).toBeTruthy();
    const loading = renderThemed(<CurrentWeatherV4 loading />, SEED_LIGHT);
    expect(loading.toJSON()).toBeTruthy();
  });

  it('ForecastStripV4 fires onSelectDay with the tapped day + index', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = renderThemed(
      <ForecastStripV4 days={days} selectedIndex={0} onSelectDay={onSelectDay} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/^Tue, Rain/));
    expect(onSelectDay).toHaveBeenCalledWith(days[1], 1);
  });

  it('HourlyRowV4 renders per-hour temperatures and fires onSelectHour', () => {
    const onSelectHour = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <HourlyRowV4 hours={hours} onSelectHour={onSelectHour} />,
      SEED_DARK
    );
    expect(getByText('20°')).toBeTruthy();
    fireEvent.press(getByLabelText(/^10 AM, Cloudy/));
    expect(onSelectHour).toHaveBeenCalledTimes(1);
  });

  it('TemperatureGraphV4 renders its title + H/L annotation and an empty state', () => {
    const { getByText } = renderThemed(
      <TemperatureGraphV4 data={[14, 18, 23, 19]} labels={['6a', '12p', '3p', '9p']} title="Today" />,
      SEED_LIGHT
    );
    expect(getByText('Today')).toBeTruthy();
    const empty = renderThemed(<TemperatureGraphV4 data={[]} emptyLabel="No temp" />, SEED_DARK);
    expect(empty.getByText('No temp')).toBeTruthy();
  });
});

describe('token purity (native weather design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CurrentWeatherV2 location="SF" temperature={21} condition="rain" feelsLike={19} high={23} low={14} onPress={() => {}} />
          <CurrentWeatherV3 location="SF" temperature={21} condition="snow" high={5} low={-2} onPress={() => {}} />
          <ForecastStripV2 days={days} selectedIndex={1} onSelectDay={() => {}} />
          <ForecastStripV2 days={[]} />
          <ForecastStripV3 days={days} selectedIndex={0} onSelectDay={() => {}} />
          <ForecastStripV3 days={[]} />
          <HourlyRowV2 hours={hours} onSelectHour={() => {}} />
          <HourlyRowV2 hours={[]} />
          <HourlyRowV3 hours={hours} onSelectHour={() => {}} />
          <AirQualityCardV2 aqi={210} pollutant="PM2.5" advice="Stay indoors" />
          <AirQualityCardV2 loading />
          <AirQualityCardV3 aqi={42} pollutant="O₃" advice="Good day" />
          <CurrentWeatherV4 location="SF" temperature={23} condition="clear" feelsLike={22} high={24} low={15} onPress={() => {}} />
          <CurrentWeatherV4 loading />
          <ForecastStripV4 days={days} selectedIndex={1} onSelectDay={() => {}} />
          <ForecastStripV4 days={[]} />
          <HourlyRowV4 hours={hours} onSelectHour={() => {}} />
          <TemperatureGraphV4 data={[12, 18, 23, 19]} labels={['6a', '12p', '3p', '9p']} title="Today" />
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
