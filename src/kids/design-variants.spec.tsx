/** @jest-environment jsdom */
/**
 * Alternate kids designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of ChoreCard, RewardStar, ChildProfileCard, AllowanceTracker. Each variant
 * keeps the base props, so these specs prove they (a) mount, (b) stay token-pure
 * (no literal hex in any inline style), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { ChoreCardV2 } from './ChoreCardV2';
import { ChoreCardV3 } from './ChoreCardV3';
import { RewardStarV2 } from './RewardStarV2';
import { RewardStarV3 } from './RewardStarV3';
import { ChildProfileCardV2 } from './ChildProfileCardV2';
import { ChildProfileCardV3 } from './ChildProfileCardV3';
import { AllowanceTrackerV2 } from './AllowanceTrackerV2';
import { AllowanceTrackerV3 } from './AllowanceTrackerV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('ChoreCard alternates (web)', () => {
  it('V2 renders a quest card and fires onComplete', () => {
    const onComplete = jest.fn();
    const { getByText, container } = render(
      <ChoreCardV2 title="Make the bed" points={5} status="todo" onComplete={onComplete} />
    );
    expect(getByText('Make the bed')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Mark done'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line and fires onComplete', () => {
    const onComplete = jest.fn();
    const { getByText, container } = render(
      <ChoreCardV3 title="Feed the dog" status="todo" onComplete={onComplete} />
    );
    expect(getByText('Feed the dog')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Done'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

describe('RewardStar alternates (web)', () => {
  it('V2 awards the next star on press', () => {
    const onReward = jest.fn();
    const { getByRole, container } = render(<RewardStarV2 value={2} max={5} onReward={onReward} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button'));
    expect(onReward).toHaveBeenCalledWith(3);
  });

  it('V3 emits the tapped star count', () => {
    const onReward = jest.fn();
    const { getByLabelText, container } = render(<RewardStarV3 value={1} max={3} onReward={onReward} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Give 3 stars'));
    expect(onReward).toHaveBeenCalledWith(3);
  });
});

describe('ChildProfileCard alternates (web)', () => {
  it('V2 renders a banner hero and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <ChildProfileCardV2 name="Mia" age="6 yrs" grade="Grade 1" mood="happy" onClick={onClick} />
    );
    expect(getByText('Mia')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Mia'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<ChildProfileCardV3 name="Leo" age="8 yrs" mood="calm" />);
    expect(getByText('Leo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('AllowanceTracker alternates (web)', () => {
  it('V2 renders a wallet hero and fires onAdd', () => {
    const onAdd = jest.fn();
    const { getByText, container } = render(
      <AllowanceTrackerV2 balance={42} earned={10} spent={4} goal={{ label: 'Bike', target: 100 }} onAdd={onAdd} />
    );
    expect(getByText('Add')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact balance row with a goal chip', () => {
    const { getByText, container } = render(
      <AllowanceTrackerV3 balance={50} goal={{ label: 'Bike', target: 100 }} />
    );
    expect(getByText('50%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
