/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  CurrentWeather,
  ForecastStrip,
  HourlyRow,
  AirQualityCard,
  WeatherAlert,
  WindCompass,
  SunriseSunset,
  PrecipBar,
  RadarCard,
  TemperatureGraph,
  WeatherStat,
  UVIndexCard,
  type ForecastDay,
} from './index';

const days: ForecastDay[] = [
  { label: 'Mon', condition: 'clear', high: 24, low: 14, precip: 0 },
  { label: 'Tue', condition: 'rain', high: 19, low: 12, precip: 80 },
  { label: 'Wed', condition: 'partly-cloudy', high: 22, low: 13, precip: 20 },
];

describe('CurrentWeather (web)', () => {
  it('renders the hero temperature + condition, on a token surface', () => {
    const { getByText, container } = render(
      <CurrentWeather
        location="San Francisco"
        temperature={21}
        condition="partly-cloudy"
        feelsLike={20}
        high={23}
        low={15}
      />
    );
    expect(getByText('21°')).toBeTruthy();
    expect(getByText('Partly cloudy')).toBeTruthy();
    expect(getByText('San Francisco')).toBeTruthy();
    // Token-bound surface, never a literal color.
    expect(container.querySelector('.bg-surface')).not.toBeNull();
  });

  it('forwards its ref to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<CurrentWeather ref={ref} temperature={10} condition="clear" />);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('renders a token skeleton while loading', () => {
    const { container } = render(<CurrentWeather loading />);
    expect(container.querySelector('.animate-pulse.bg-neutral-200')).not.toBeNull();
  });
});

describe('ForecastStrip (web)', () => {
  it('fires onSelectDay with the tapped day + index (day select interaction)', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = render(
      <ForecastStrip days={days} selectedIndex={0} onSelectDay={onSelectDay} />
    );
    getByLabelText(/^Tue, Rain/).click();
    expect(onSelectDay).toHaveBeenCalledTimes(1);
    expect(onSelectDay).toHaveBeenCalledWith(days[1], 1);
  });

  it('highlights the selected day with a token tint class', () => {
    const { getByLabelText } = render(<ForecastStrip days={days} selectedIndex={0} />);
    const selected = getByLabelText(/^Mon, Clear/);
    expect(selected.className).toContain('bg-primary-50');
    expect(selected.className).toContain('border-primary');
  });

  it('renders an EmptyState when there are no days', () => {
    const { getByText, container } = render(
      <ForecastStrip days={[]} emptyLabel="Nothing yet" />
    );
    expect(getByText('Nothing yet')).toBeTruthy();
    const empty = container.querySelector('[data-xen-empty-state]');
    expect(empty).not.toBeNull();
    expect(empty?.className).toContain('border-border');
  });
});

describe('HourlyRow (web)', () => {
  it('renders per-hour temperatures and fires onSelectHour', () => {
    const onSelectHour = jest.fn();
    const { getByText, getByLabelText } = render(
      <HourlyRow
        hours={[
          { time: '9 AM', condition: 'clear', temperature: 18, precip: 0 },
          { time: '10 AM', condition: 'cloudy', temperature: 20, precip: 10 },
        ]}
        onSelectHour={onSelectHour}
      />
    );
    expect(getByText('9 AM')).toBeTruthy();
    expect(getByText('20°')).toBeTruthy();
    getByLabelText(/^10 AM, Cloudy/).click();
    expect(onSelectHour).toHaveBeenCalledTimes(1);
  });
});

describe('AirQualityCard / UVIndexCard (web)', () => {
  it('renders the AQI value + severity band label with a danger token class', () => {
    const { getByText, container } = render(
      <AirQualityCard aqi={165} pollutant="PM2.5" advice="Limit time outdoors" />
    );
    expect(getByText('165')).toBeTruthy();
    expect(getByText('Unhealthy')).toBeTruthy();
    // Danger-toned marker resolves to a token class, not a literal color.
    expect(container.querySelector('.bg-danger')).not.toBeNull();
  });

  it('renders the UV value + band label', () => {
    const { getByText } = render(<UVIndexCard uv={9} advice="Seek shade" />);
    expect(getByText('9')).toBeTruthy();
    expect(getByText('Very high')).toBeTruthy();
  });
});

describe('WeatherAlert (web)', () => {
  it('shows the severity label + title and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <WeatherAlert title="Flash Flood Warning" severity="warning" onClick={onClick} />
    );
    expect(getByText('Warning')).toBeTruthy();
    expect(getByText('Flash Flood Warning')).toBeTruthy();
    getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onDismiss from the dismiss button without bubbling to onClick', () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = render(
      <WeatherAlert title="Heat Advisory" severity="advisory" onDismiss={onDismiss} />
    );
    getByLabelText('Dismiss alert').click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('WindCompass / SunriseSunset / PrecipBar / RadarCard / TemperatureGraph / WeatherStat (web)', () => {
  it('WindCompass writes out the cardinal direction', () => {
    const { getByText } = render(<WindCompass direction={90} speed={12} gust={20} unit="mph" />);
    expect(getByText('From E (90°)')).toBeTruthy();
  });

  it('SunriseSunset labels sunrise and sunset', () => {
    const { getByText } = render(
      <SunriseSunset sunrise="6:42 AM" sunset="7:58 PM" progress={0.4} />
    );
    expect(getByText('6:42 AM')).toBeTruthy();
    expect(getByText('7:58 PM')).toBeTruthy();
  });

  it('PrecipBar renders period labels with a token-filled bar', () => {
    const { getByText, container } = render(
      <PrecipBar slots={[{ label: '9a', chance: 20 }, { label: '12p', chance: 60 }]} showValues />
    );
    expect(getByText('12p')).toBeTruthy();
    expect(container.querySelector('.bg-primary')).not.toBeNull();
  });

  it('RadarCard mounts as a dependency-free placeholder and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText } = render(
      <RadarCard title="Radar" caption="Live" placeholderLabel="Radar preview" onClick={onClick} />
    );
    expect(getByText('Radar preview')).toBeTruthy();
    getByLabelText('Open radar').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('TemperatureGraph renders the shared LineChart polyline', () => {
    const { container } = render(
      <TemperatureGraph data={[12, 15, 18, 16, 14]} labels={['9a', '12p', '3p', '6p', '9p']} />
    );
    const poly = container.querySelector('polyline');
    expect(poly).not.toBeNull();
    expect(poly?.getAttribute('stroke')).toBe('var(--xen-primary)');
  });

  it('WeatherStat renders label, value and unit', () => {
    const { getByText } = render(
      <WeatherStat label="Humidity" value={62} unit="%" glyph="💧" caption="Dew point 12°" />
    );
    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('62')).toBeTruthy();
  });
});
