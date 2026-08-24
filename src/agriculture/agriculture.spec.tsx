/** @jest-environment jsdom */
/**
 * Agriculture (web / React DOM) components: render smoke for the full farm
 * composition, token-purity (no hex literals in inline styles or SVG paint),
 * the color-independent alert affordance (`role="alert"`), the empty / no-data
 * affordances, and the two interaction contracts — irrigation Switch toggle
 * (`onToggle(id, next)`) and farm-task checkbox toggle (`onToggle(next)`),
 * plus interactive-card activation via click + keyboard.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { CropCard } from './CropCard';
import { FieldCard } from './FieldCard';
import { LivestockRow } from './LivestockRow';
import { HarvestLog } from './HarvestLog';
import { WeatherAdvisory } from './WeatherAdvisory';
import { SoilMoistureCard } from './SoilMoistureCard';
import { IrrigationSchedule } from './IrrigationSchedule';
import { YieldChart } from './YieldChart';
import { EquipmentStatus } from './EquipmentStatus';
import { PestAlert } from './PestAlert';
import { MarketPriceRow } from './MarketPriceRow';
import { FarmTaskRow } from './FarmTaskRow';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const paintAttrs = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<SVGElement>('[fill], [stroke]'))
    .flatMap((el) => [el.getAttribute('fill') ?? '', el.getAttribute('stroke') ?? ''])
    .join('\n');

function Showcase(): React.ReactElement {
  return (
    <main>
      <CropCard name="Winter Wheat" variety="Skyfall" stage="growing" health="stressed" progress={64} fieldLabel="North 40" harvestLabel="42 days" />
      <FieldCard name="North 40" area={12.5} crop="Maize" soilType="Clay loam" location="Sector B" status="planted" />
      <LivestockRow species="Dairy Cows" count={48} location="Barn 2" health="monitor" detail="avg 640 kg" />
      <SoilMoistureCard moisture={58} label="Zone 3 · 30cm" trend={[40, 45, 52, 58, 55]} soilTemp="18°C" />
      <YieldChart data={[3.2, 4.1, 4.8, 4.2]} labels={['S1', 'S2', 'S3', 'S4']} headline="4.8 t/ha" unit="avg" />
      <EquipmentStatus name="Tractor 04" type="John Deere 6M" state="maintenance" fuelPct={14} hours="1,204 hrs" />
      <MarketPriceRow commodity="Wheat" price={284.5} unit="€/t" changePct={1.8} market="Chicago · today" />
      <WeatherAdvisory title="Frost expected overnight" message="Lows near -2°C" kind="frost" severity="severe" timeframe="Tonight → 7am" />
      <PestAlert pest="Aphid infestation" severity="high" affected="Tomatoes · GH2" recommendation="Scout & treat" actionLabel="Log treatment" onAction={() => undefined} />
    </main>
  );
}

describe('agriculture web composition', () => {
  it('renders the full farm composition with token-bound surfaces', () => {
    const { container, getByText } = render(<Showcase />);
    expect(getByText('Winter Wheat')).toBeTruthy();
    expect(getByText('North 40')).toBeTruthy();
    expect(getByText('Dairy Cows')).toBeTruthy();
    expect(getByText('Tractor 04')).toBeTruthy();
    // Card surfaces carry the token classes (no literal colors).
    const card = container.querySelector('[data-xen-crop-card]');
    expect(card).not.toBeNull();
    expect(card?.className).toContain('bg-surface');
    expect(card?.className).toContain('text-on-surface');
    // Charts present.
    expect(container.querySelector('[data-xen-soil-moisture-card] svg')).not.toBeNull();
    expect(container.querySelector('[data-xen-yield-chart] svg')).not.toBeNull();
  });

  it('stays token-pure: no hex literals in inline styles or SVG paint', () => {
    const { container } = render(<Showcase />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(paintAttrs(container)).not.toMatch(HEX_LITERAL);
  });

  it('announces advisories and pest alerts via role="alert"', () => {
    const { getAllByRole, getByText } = render(<Showcase />);
    const alerts = getAllByRole('alert');
    expect(alerts.length).toBe(2);
    // Severity is stated as text, not color alone.
    expect(getByText('Severe')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
  });
});

describe('empty / no-data affordances', () => {
  it('HarvestLog shows an EmptyState when there are no entries', () => {
    const { getByText, container } = render(
      <HarvestLog entries={[]} emptyTitle="No harvests logged" />
    );
    expect(getByText('No harvests logged')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
  });

  it('IrrigationSchedule shows an EmptyState when there are no slots', () => {
    const { getByText } = render(
      <IrrigationSchedule slots={[]} emptyTitle="No irrigation scheduled" />
    );
    expect(getByText('No irrigation scheduled')).toBeTruthy();
  });

  it('YieldChart shows a muted note when data is empty', () => {
    const { getByText, container } = render(<YieldChart data={[]} />);
    expect(getByText('No yield data yet')).toBeTruthy();
    expect(container.querySelector('svg')).toBeNull();
  });
});

describe('IrrigationSchedule toggle', () => {
  it('fires onToggle(id, next) from the zone Switch', () => {
    const onToggle = jest.fn();
    const { getAllByRole, getByLabelText } = render(
      <IrrigationSchedule
        slots={[
          { id: 'z1', zone: 'Zone 1 · Drip', time: '06:00', duration: '20 min', state: 'scheduled', enabled: true },
          { id: 'z2', zone: 'Zone 2 · Spray', time: '07:00', state: 'scheduled', enabled: false },
        ]}
        onToggle={onToggle}
      />
    );
    expect(getAllByRole('switch')).toHaveLength(2);
    fireEvent.click(getByLabelText('Zone 1 · Drip irrigation'));
    expect(onToggle).toHaveBeenCalledWith('z1', false);
    fireEvent.click(getByLabelText('Zone 2 · Spray irrigation'));
    expect(onToggle).toHaveBeenCalledWith('z2', true);
  });
});

describe('FarmTaskRow toggle', () => {
  it('fires onToggle(next) from the check control and reflects done state', () => {
    const onToggle = jest.fn();
    const { getByRole, rerender } = render(
      <FarmTaskRow title="Spray north orchard" priority="high" due="Today" onToggle={onToggle} />
    );
    const check = getByRole('checkbox');
    expect(check.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(check);
    expect(onToggle).toHaveBeenCalledWith(true);

    rerender(<FarmTaskRow title="Spray north orchard" done onToggle={onToggle} />);
    expect(getByRole('checkbox').getAttribute('aria-checked')).toBe('true');
  });

  it('fires onClick from the task body and marks overdue with a text chip', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText } = render(
      <FarmTaskRow title="Fix fence" overdue due="Aug 10" onClick={onClick} />
    );
    fireEvent.click(getByLabelText('Fix fence'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getByText('Overdue')).toBeTruthy();
  });
});

describe('interactive cards', () => {
  it('CropCard exposes role="button" and activates via click and keyboard', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<CropCard name="Barley" stage="mature" onClick={onClick} />);
    const btn = getByRole('button');
    expect(btn.getAttribute('tabindex')).toBe('0');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(btn, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(btn, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('CropCard renders a muted placeholder while loading', () => {
    const { container, queryByText } = render(<CropCard name="Barley" loading />);
    expect(queryByText('Barley')).toBeNull();
    expect(container.querySelector('.bg-neutral-200')).not.toBeNull();
  });

  it('forwards a ref to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<FieldCard ref={ref} name="South 12" status="fallow" />);
    expect(ref.current?.getAttribute('data-xen-field-card')).toBe('');
  });
});
