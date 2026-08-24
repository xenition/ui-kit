/** @jest-environment jsdom */
/**
 * Alternate wellness designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of MeditationSessionCard, MindfulnessStreak, MoodCheckIn, SleepStoryCard. Each
 * variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex in inline styles beyond geometric widths), and (c)
 * honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { MeditationSessionCardV2 } from './MeditationSessionCardV2';
import { MeditationSessionCardV3 } from './MeditationSessionCardV3';
import { MindfulnessStreakV2 } from './MindfulnessStreakV2';
import { MindfulnessStreakV3 } from './MindfulnessStreakV3';
import { MoodCheckInV2 } from './MoodCheckInV2';
import { MoodCheckInV3 } from './MoodCheckInV3';
import { SleepStoryCardV2 } from './SleepStoryCardV2';
import { SleepStoryCardV3 } from './SleepStoryCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('MeditationSessionCard alternates (web)', () => {
  it('V2 fires onStart', () => {
    const onStart = jest.fn();
    const { getByText, container } = render(<MeditationSessionCardV2 title="Morning Stillness" category="calm" durationMin={10} onStart={onStart} />);
    expect(getByText('Morning Stillness')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
  it('V3 resumes when in progress', () => {
    const onStart = jest.fn();
    const { getByText, container } = render(<MeditationSessionCardV3 title="Focus" category="focus" durationMin={20} progress={0.4} onStart={onStart} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Resume'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});

describe('MindfulnessStreak alternates (web)', () => {
  it('V2 shows the count', () => {
    const { getByText, container } = render(<MindfulnessStreakV2 count={7} best={12} week={[true, false, true, true, true, false, true]} />);
    expect(getByText('7')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 shows the empty prompt', () => {
    const { getByText, container } = render(<MindfulnessStreakV3 count={0} />);
    expect(getByText('Start your streak')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('MoodCheckIn alternates (web)', () => {
  it('V2 selects a mood + submits', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const { getByLabelText, getByText, container } = render(<MoodCheckInV2 value="good" onChange={onChange} onSubmit={onSubmit} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Great'));
    expect(onChange).toHaveBeenCalledWith('great');
    fireEvent.click(getByText('Save check-in'));
    expect(onSubmit).toHaveBeenCalled();
  });
  it('V3 selects a mood', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<MoodCheckInV3 onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Okay'));
    expect(onChange).toHaveBeenCalledWith('okay');
  });
});

describe('SleepStoryCard alternates (web)', () => {
  it('V2 fires onPlay', () => {
    const onPlay = jest.fn();
    const { getByText, getByLabelText, container } = render(<SleepStoryCardV2 title="Forest Rain" category="nature" narrator="Ada" durationMin={30} onPlay={onPlay} />);
    expect(getByText('Forest Rain')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Play'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onPlay', () => {
    const onPlay = jest.fn();
    const { getByLabelText, container } = render(<SleepStoryCardV3 title="Night Train" category="fiction" onPlay={onPlay} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Play'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
});
