/** @jest-environment jsdom */
/**
 * Alternate agriculture designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of CropCard, FieldCard, HarvestLog, WeatherAdvisory. Each variant
 * keeps the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles beyond geometric widths), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CropCardV2 } from './CropCardV2';
import { CropCardV3 } from './CropCardV3';
import { FieldCardV2 } from './FieldCardV2';
import { FieldCardV3 } from './FieldCardV3';
import { HarvestLogV2 } from './HarvestLogV2';
import { HarvestLogV3 } from './HarvestLogV3';
import { WeatherAdvisoryV2 } from './WeatherAdvisoryV2';
import { WeatherAdvisoryV3 } from './WeatherAdvisoryV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const HARVEST = [
  { id: 'h1', crop: 'Wheat', quantity: 4.2, unit: 't', date: 'Aug 12', field: 'North 40', grade: 'A' },
  { id: 'h2', crop: 'Maize', quantity: 6.1, unit: 't', date: 'Aug 14' },
];

describe('CropCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<CropCardV2 name="Winter Wheat" variety="Skyfall" stage="growing" health="healthy" progress={60} fieldLabel="North 40" onClick={onClick} />);
    expect(getByText('Winter Wheat')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Winter Wheat'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense row', () => {
    const { getByText, container } = render(<CropCardV3 name="Barley" stage="flowering" health="stressed" progress={40} />);
    expect(getByText('Barley')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('FieldCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<FieldCardV2 name="North 40" area={12.5} crop="Maize" soilType="Clay loam" status="planted" onClick={onClick} />);
    expect(getByText('North 40')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('North 40'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense row', () => {
    const { getByText, container } = render(<FieldCardV3 name="South 20" area={8} status="fallow" />);
    expect(getByText('South 20')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('HarvestLog alternates (web)', () => {
  it('V2 renders rows + total', () => {
    const { getByText, container } = render(<HarvestLogV2 entries={HARVEST} total="10.3 t" />);
    expect(getByText('Wheat')).toBeTruthy();
    expect(getByText('10.3 t')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a compact list', () => {
    const { getByText, container } = render(<HarvestLogV3 entries={HARVEST} total="10.3 t" />);
    expect(getByText('Maize')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('WeatherAdvisory alternates (web)', () => {
  it('V2 renders a banner', () => {
    const { getByText, container } = render(<WeatherAdvisoryV2 title="Frost expected" message="Lows near -2°C" kind="frost" severity="warning" timeframe="Tonight → 7am" />);
    expect(getByText('Frost expected')).toBeTruthy();
    expect(getByText('Warning')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a compact line', () => {
    const { getByText, container } = render(<WeatherAdvisoryV3 title="High winds" kind="wind" severity="severe" />);
    expect(getByText('High winds')).toBeTruthy();
    expect(getByText('Severe')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
