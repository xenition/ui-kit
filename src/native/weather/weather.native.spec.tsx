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
  CurrentWeather,
  ForecastStrip,
  HourlyRow,
  AirQualityCard,
  WeatherAlert,
  WindCompass,
  UVIndexCard,
  SunriseSunset,
  PrecipBar,
  RadarCard,
  TemperatureGraph,
  WeatherStat,
  type ForecastDay,
} from './index';

const days: ForecastDay[] = [
  { label: 'Mon', condition: 'clear', high: 24, low: 14, precip: 0 },
  { label: 'Tue', condition: 'rain', high: 19, low: 12, precip: 80 },
  { label: 'Wed', condition: 'partly-cloudy', high: 22, low: 13, precip: 20 },
];

describe('CurrentWeather (native)', () => {
  it('renders the hero temperature and condition label', () => {
    const { getByText } = renderThemed(
      <CurrentWeather
        location="San Francisco"
        temperature={21}
        condition="partly-cloudy"
        feelsLike={20}
        high={23}
        low={15}
      />,
      SEED_LIGHT
    );
    expect(getByText('21°')).toBeTruthy();
    expect(getByText('Partly cloudy')).toBeTruthy();
    expect(getByText('San Francisco')).toBeTruthy();
  });

  it('shows a skeleton while loading', () => {
    const { toJSON } = renderThemed(<CurrentWeather loading />, SEED_DARK);
    expect(toJSON()).toBeTruthy();
  });
});

describe('ForecastStrip (native)', () => {
  it('fires onSelectDay with the tapped day + index', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = renderThemed(
      <ForecastStrip days={days} selectedIndex={0} onSelectDay={onSelectDay} />,
      SEED_LIGHT
    );
    // Accessibility label starts with the day label.
    fireEvent.press(getByLabelText(/^Tue, Rain/));
    expect(onSelectDay).toHaveBeenCalledTimes(1);
    expect(onSelectDay).toHaveBeenCalledWith(days[1], 1);
  });

  it('renders a muted empty state when there are no days', () => {
    const { getByText } = renderThemed(
      <ForecastStrip days={[]} emptyLabel="Nothing yet" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet')).toBeTruthy();
  });
});

describe('HourlyRow (native)', () => {
  it('renders per-hour temperatures', () => {
    const { getByText } = renderThemed(
      <HourlyRow
        hours={[
          { time: '9 AM', condition: 'clear', temperature: 18, precip: 0 },
          { time: '10 AM', condition: 'cloudy', temperature: 20, precip: 10 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('9 AM')).toBeTruthy();
    expect(getByText('20°')).toBeTruthy();
  });
});

describe('AirQualityCard / UVIndexCard (native)', () => {
  it('renders the AQI value and severity band label', () => {
    const { getByText } = renderThemed(
      <AirQualityCard aqi={165} pollutant="PM2.5" advice="Limit time outdoors" />,
      SEED_LIGHT
    );
    expect(getByText('165')).toBeTruthy();
    expect(getByText('Unhealthy')).toBeTruthy();
  });

  it('renders the UV value and band label', () => {
    const { getByText } = renderThemed(<UVIndexCard uv={9} advice="Seek shade" />, SEED_DARK);
    expect(getByText('9')).toBeTruthy();
    expect(getByText('Very high')).toBeTruthy();
  });
});

describe('WeatherAlert (native)', () => {
  it('shows the severity label + title and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WeatherAlert title="Flash Flood Warning" severity="warning" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Warning')).toBeTruthy();
    expect(getByText('Flash Flood Warning')).toBeTruthy();
    fireEvent.press(getByLabelText('Warning: Flash Flood Warning'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('WindCompass / SunriseSunset / PrecipBar / RadarCard / WeatherStat (native)', () => {
  it('WindCompass writes out the cardinal direction', () => {
    const { getByText } = renderThemed(
      <WindCompass direction={90} speed={12} gust={20} unit="mph" />,
      SEED_LIGHT
    );
    expect(getByText('From E (90°)')).toBeTruthy();
  });

  it('SunriseSunset labels sunrise and sunset', () => {
    const { getByText } = renderThemed(
      <SunriseSunset sunrise="6:42 AM" sunset="7:58 PM" progress={0.4} />,
      SEED_DARK
    );
    expect(getByText('6:42 AM')).toBeTruthy();
    expect(getByText('7:58 PM')).toBeTruthy();
  });

  it('PrecipBar renders period labels', () => {
    const { getByText } = renderThemed(
      <PrecipBar
        slots={[
          { label: '9a', chance: 20 },
          { label: '12p', chance: 60 },
        ]}
        showValues
      />,
      SEED_LIGHT
    );
    expect(getByText('12p')).toBeTruthy();
  });

  it('RadarCard mounts as a dependency-free placeholder', () => {
    const { getByText, toJSON } = renderThemed(
      <RadarCard title="Radar" caption="Live" placeholderLabel="Radar preview" />,
      SEED_LIGHT
    );
    expect(getByText('Radar preview')).toBeTruthy();
    expect(toJSON()).toBeTruthy();
  });

  it('TemperatureGraph mounts with a series', () => {
    const { toJSON } = renderThemed(
      <TemperatureGraph data={[12, 15, 18, 16, 14]} labels={['9a', '12p', '3p', '6p', '9p']} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeTruthy();
  });

  it('WeatherStat renders label, value and unit', () => {
    const { getByText } = renderThemed(
      <WeatherStat label="Humidity" value={62} unit="%" glyph="💧" caption="Dew point 12°" />,
      SEED_DARK
    );
    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('62')).toBeTruthy();
  });
});

describe('token purity (native weather, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CurrentWeather
            location="SF"
            temperature={21}
            condition="rain"
            feelsLike={19}
            high={23}
            low={14}
          />
          <ForecastStrip days={days} selectedIndex={1} onSelectDay={() => {}} />
          <ForecastStrip days={[]} />
          <HourlyRow
            hours={[{ time: '9 AM', condition: 'clear', temperature: 18, precip: 0 }]}
          />
          <AirQualityCard aqi={42} pollutant="PM2.5" advice="Good day" />
          <WeatherAlert title="Heat Advisory" severity="advisory" onDismiss={() => {}} />
          <WindCompass direction={215} speed={8} gust={16} />
          <UVIndexCard uv={3} advice="Wear a hat" />
          <SunriseSunset sunrise="6:42 AM" sunset="7:58 PM" progress={0.6} />
          <PrecipBar slots={[{ label: '9a', chance: 30 }]} showValues />
          <RadarCard title="Radar" onPress={() => {}} />
          <TemperatureGraph data={[12, 15, 18]} />
          <WeatherStat label="Pressure" value={1013} unit="hPa" glyph="🧭" />
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
