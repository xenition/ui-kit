/** @jest-environment jsdom */
/**
 * Alternate weather designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of AirQualityCard, CurrentWeather, ForecastStrip, HourlyRow. Each variant keeps
 * the base props; these specs prove they (a) mount, (b) keep colors token-bound
 * (no color hex in inline styles — bar heights/widths are geometry), and (c)
 * honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AirQualityCardV2 } from './AirQualityCardV2';
import { AirQualityCardV3 } from './AirQualityCardV3';
import { CurrentWeatherV2 } from './CurrentWeatherV2';
import { CurrentWeatherV3 } from './CurrentWeatherV3';
import { ForecastStripV2 } from './ForecastStripV2';
import { ForecastStripV3 } from './ForecastStripV3';
import { HourlyRowV2 } from './HourlyRowV2';
import { HourlyRowV3 } from './HourlyRowV3';

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

const DAYS = [
  { label: 'Mon', condition: 'clear' as const, high: 24, low: 15, precip: 10 },
  { label: 'Tue', condition: 'rain' as const, high: 19, low: 12, precip: 80 },
];
const HOURS = [
  { time: '1 PM', condition: 'clear' as const, temperature: 22, precip: 5 },
  { time: '2 PM', condition: 'cloudy' as const, temperature: 21, precip: 20 },
];

describe('CurrentWeather alternates (web)', () => {
  it('V2 renders the hero', () => {
    const { getByText, container } = render(<CurrentWeatherV2 location="SF" temperature={21} condition="clear" high={24} low={15} feelsLike={20} />);
    expect(getByText('21°')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
  it('V3 renders a compact bar', () => {
    const { getByText, container } = render(<CurrentWeatherV3 location="NY" temperature={18} condition="cloudy" high={20} low={12} />);
    expect(getByText(/18°/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('AirQualityCard alternates (web)', () => {
  it('V2 shows the index + band', () => {
    const { getByText, container } = render(<AirQualityCardV2 aqi={82} pollutant="PM2.5" advice="OK for most" />);
    expect(getByText('82')).toBeTruthy();
    expect(getByText('Moderate')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
  it('V3 shows a compact line', () => {
    const { getByText, container } = render(<AirQualityCardV3 aqi={30} pollutant="O3" />);
    expect(getByText('Good')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('ForecastStrip alternates (web)', () => {
  it('V2 selects a day', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText, container } = render(<ForecastStripV2 days={DAYS} onSelectDay={onSelectDay} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText(/Tue/));
    expect(onSelectDay).toHaveBeenCalled();
  });
  it('V3 selects a day', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText, container } = render(<ForecastStripV3 days={DAYS} onSelectDay={onSelectDay} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText(/Mon/));
    expect(onSelectDay).toHaveBeenCalled();
  });
});

describe('HourlyRow alternates (web)', () => {
  it('V2 selects an hour', () => {
    const onSelectHour = jest.fn();
    const { getByLabelText, container } = render(<HourlyRowV2 hours={HOURS} onSelectHour={onSelectHour} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText(/1 PM/));
    expect(onSelectHour).toHaveBeenCalled();
  });
  it('V3 selects an hour', () => {
    const onSelectHour = jest.fn();
    const { getByLabelText, container } = render(<HourlyRowV3 hours={HOURS} onSelectHour={onSelectHour} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText(/2 PM/));
    expect(onSelectHour).toHaveBeenCalled();
  });
});
