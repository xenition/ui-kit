/** @jest-environment jsdom */
/**
 * Kids (web / React DOM) components: render smoke, token-purity (no hex
 * literals in inline styles), the empty-state affordance, and the interaction
 * contracts — chore "Mark done" (`onComplete`), routine checkbox toggle
 * (`onToggle(next)`), and star reward (`onReward(n)`). Plain jsdom via the
 * docblock; no provider needed since token colors are static utility classes.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  ChildProfileCard,
  ChoreCard,
  AllowanceTracker,
  MilestoneCard,
  RewardStar,
  ScreenTimeBar,
  GrowthChart,
  RoutineRow,
  BehaviorBadge,
  SchoolEventRow,
  FamilyMemberRow,
  StickerReward,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('ChildProfileCard (web)', () => {
  it('renders identity, paints a token surface, and activates via role="button"', () => {
    const onClick = jest.fn();
    const { getByText, getByRole, container } = render(
      <ChildProfileCard name="Mia" age="6 yrs" grade="Grade 1" mood="happy" interests={['Dinosaurs']} onClick={onClick} />
    );
    expect(getByText('Mia')).toBeTruthy();
    const card = container.querySelector('[data-xen-child-profile-card]');
    expect(card?.className).toContain('bg-surface');
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows a loading skeleton', () => {
    const { getByLabelText } = render(<ChildProfileCard name="Mia" loading />);
    expect(getByLabelText('Loading child profile')).toBeTruthy();
  });
});

describe('ChoreCard (web)', () => {
  it('renders the title in a token color and fires onComplete', () => {
    const onComplete = jest.fn();
    const { getByText, container } = render(
      <ChoreCard title="Make the bed" assignee="Mia" points={5} due="Today" status="todo" onComplete={onComplete} />
    );
    const title = getByText('Make the bed');
    expect(title.className).toContain('text-on-surface');
    expect(container.querySelector('[data-xen-chore-card]')?.className).toContain('bg-surface');
    fireEvent.click(getByText('Mark done'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('hides the action once done', () => {
    const { queryByText } = render(<ChoreCard title="Feed the cat" status="done" onComplete={() => {}} />);
    expect(queryByText('Mark done')).toBeNull();
  });
});

describe('AllowanceTracker (web)', () => {
  it('renders a balance and an explicit empty state', () => {
    const filled = render(
      <AllowanceTracker balance={24.5} earned={10} spent={3} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />
    );
    expect(filled.getByText('$24.5')).toBeTruthy();
    expect(filled.getByText('Add')).toBeTruthy();

    const empty = render(<AllowanceTracker balance={NaN} />);
    expect(empty.getByText('No allowance set up yet')).toBeTruthy();
    expect(empty.container.querySelector('[data-xen-empty-state]')).not.toBeNull();
  });
});

describe('RewardStar (web)', () => {
  it('paints filled stars in a token color and reports the tapped count', () => {
    const onReward = jest.fn();
    const { getByLabelText, container } = render(
      <RewardStar value={2} max={5} label="Great job!" onReward={onReward} />
    );
    expect(getByLabelText(/Reward: 2 of 5 stars/)).toBeTruthy();
    // Filled stars use the `warn` slot → `text-warn` token class.
    expect(container.querySelector('.text-warn')).not.toBeNull();
    fireEvent.click(getByLabelText('Give 4 stars'));
    expect(onReward).toHaveBeenCalledWith(4);
  });
});

describe('ScreenTimeBar (web)', () => {
  it('flags the over-limit state and renders a no-limit empty state', () => {
    const over = render(<ScreenTimeBar used={150} limit={120} />);
    expect(over.getByLabelText(/over by/)).toBeTruthy();

    const noLimit = render(<ScreenTimeBar used={30} limit={0} />);
    expect(noLimit.getByText('No screen-time limit set')).toBeTruthy();
  });
});

describe('GrowthChart (web)', () => {
  it('renders a series and an explicit empty state', () => {
    const filled = render(<GrowthChart data={[104, 108, 112]} metric="height" unit="cm" percentile="75th percentile" />);
    expect(filled.getByText(/112/)).toBeTruthy();

    const empty = render(<GrowthChart data={[]} metric="weight" />);
    expect(empty.getByText('No measurements logged yet')).toBeTruthy();
  });
});

describe('RoutineRow (web)', () => {
  it('toggles done state via a real checkbox button', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <RoutineRow label="Brush teeth" slot="morning" time="7:30 AM" done={false} onToggle={onToggle} />
    );
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(box);
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('BehaviorBadge (web)', () => {
  it('mounts positive variant with a signed point value', () => {
    const { getByLabelText, getByText } = render(<BehaviorBadge label="Shared toys" tone="positive" points={2} />);
    expect(getByLabelText(/positive behavior: Shared toys/)).toBeTruthy();
    expect(getByText(/👍 Shared toys \(\+2\)/)).toBeTruthy();
  });
});

describe('SchoolEventRow + FamilyMemberRow (web)', () => {
  it('render row identity and role/type chips', () => {
    const evt = render(<SchoolEventRow title="Parent-teacher conference" type="meeting" date="Mon, Sep 4" />);
    expect(evt.getByText('Parent-teacher conference')).toBeTruthy();
    expect(evt.getByText('Meeting')).toBeTruthy();

    const fam = render(<FamilyMemberRow name="Dad" role="parent" relationLabel="Father" online />);
    expect(fam.getByText('Dad')).toBeTruthy();
    expect(fam.getByText('Online')).toBeTruthy();
  });
});

describe('MilestoneCard (web)', () => {
  it('renders an achieved milestone chip', () => {
    const { getByText } = render(
      <MilestoneCard title="First steps" category="physical" ageLabel="12–15 mo" achieved />
    );
    expect(getByText('First steps')).toBeTruthy();
    expect(getByText('✓ Achieved')).toBeTruthy();
  });
});

describe('StickerReward (web)', () => {
  it('collects a sticker, shows the earned count, and renders an empty state', () => {
    const onCollect = jest.fn();
    const filled = render(
      <StickerReward
        stickers={[
          { glyph: '🌟', label: 'Star', earned: true },
          { glyph: '🎈', label: 'Balloon', earned: false },
        ]}
        onCollect={onCollect}
      />
    );
    expect(filled.getByText('1/2')).toBeTruthy();
    fireEvent.click(filled.getByLabelText(/Balloon, locked/));
    expect(onCollect).toHaveBeenCalledWith(1);

    const empty = render(<StickerReward stickers={[]} />);
    expect(empty.getByText('No stickers yet')).toBeTruthy();
  });
});

describe('kids web — ref forwarding + token purity', () => {
  it('forwards a ref to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ChildProfileCard ref={ref} name="Mia" />);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('emits no hex color literals in inline styles across the module', () => {
    const { container } = render(
      <div>
        <ChildProfileCard name="Mia" photoUrl="x" age="6 yrs" grade="Grade 1" birthday="May 4" mood="excited" interests={['Art', 'Soccer']} onClick={() => {}} />
        <ChoreCard title="Make the bed" assignee="Mia" points={5} due="Today" status="in-progress" onComplete={() => {}} onClick={() => {}} />
        <AllowanceTracker balance={24.5} earned={10} spent={3} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />
        <MilestoneCard title="First steps" category="physical" date="Jan 2025" ageLabel="12–15 mo" description="Walked across the room" achieved onClick={() => {}} />
        <RewardStar value={3} max={5} label="Great job!" onReward={() => {}} />
        <ScreenTimeBar used={150} limit={120} />
        <GrowthChart data={[104, 108, 112]} metric="height" unit="cm" percentile="75th" />
        <RoutineRow label="Brush teeth" slot="bedtime" time="8:00 PM" done onToggle={() => {}} />
        <BehaviorBadge label="Shared toys" tone="positive" points={2} onClick={() => {}} />
        <SchoolEventRow title="Parent-teacher conference" type="meeting" date="Mon, Sep 4" time="3:00 PM" location="Room 12" childName="Mia" onClick={() => {}} />
        <FamilyMemberRow name="Leo" role="child" relationLabel="Age 6" online={false} />
        <StickerReward stickers={[{ glyph: '🌟', label: 'Star', earned: true }, { glyph: '🎈', label: 'Balloon', earned: false }]} onCollect={() => {}} />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
