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
  MeditationSessionCardV2,
  MeditationSessionCardV3,
  MoodCheckInV2,
  MoodCheckInV3,
  SleepStoryCardV2,
  SleepStoryCardV3,
  MindfulnessStreakV2,
  MindfulnessStreakV3,
} from './index';
import type { Mood } from './MoodCheckIn';

/** Render every V2/V3 wellness variant once, exercising empty & filled states. */
function AllVariants(): React.ReactElement {
  return (
    <>
      <MeditationSessionCardV2
        title="Morning stillness"
        category="calm"
        durationMin={10}
        level="beginner"
        instructor="Ava"
        description="Ease into the day"
        progress={0.3}
        onStart={() => {}}
      />
      <MeditationSessionCardV2 title="Premium sleep" category="sleep" locked onStart={() => {}} />
      <MeditationSessionCardV3
        title="Deep focus"
        category="focus"
        durationMin={20}
        level="intermediate"
        progress={0.4}
        onStart={() => {}}
      />
      <MeditationSessionCardV3 title="Locked" category="breathing" locked onStart={() => {}} />

      <MoodCheckInV2 value="good" showNote note="calm day" onChange={() => {}} onSubmit={() => {}} />
      <MoodCheckInV2 onChange={() => {}} onSubmit={() => {}} />
      <MoodCheckInV3 value="great" onChange={() => {}} onSubmit={() => {}} />
      <MoodCheckInV3 showNote onChange={() => {}} onSubmit={() => {}} />

      <SleepStoryCardV2 title="Ocean drift" category="nature" narrator="Ava" durationMin={45} playing onPlay={() => {}} />
      <SleepStoryCardV2 title="Locked tale" category="fiction" locked onPlay={() => {}} />
      <SleepStoryCardV3 title="Rainforest" category="asmr" narrator="Sam" durationMin={30} onPlay={() => {}} />
      <SleepStoryCardV3 title="Late train" category="travel" locked onPlay={() => {}} />

      <MindfulnessStreakV2 count={9} best={30} week={[true, true, false, true, true, false, true]} tone="warn" />
      <MindfulnessStreakV2 count={0} />
      <MindfulnessStreakV3 count={5} best={12} week={[true, false, true, true, false, true, true]} tone="success" />
      <MindfulnessStreakV3 count={0} />
    </>
  );
}

describe('wellness design variants (native) — mount', () => {
  it('renders every V2/V3 variant in the light seed', () => {
    const { getByText, getAllByText } = renderThemed(<AllVariants />, SEED_LIGHT);
    expect(getByText('Morning stillness')).toBeTruthy();
    expect(getByText('Deep focus')).toBeTruthy();
    expect(getByText('Ocean drift')).toBeTruthy();
    expect(getByText('Rainforest')).toBeTruthy();
    expect(getByText('9')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    // Both a V2 and a V3 mood card fall back to the default prompt.
    expect(getAllByText('How are you feeling?').length).toBeGreaterThan(0);
    // Empty streak states show the prompt (V2 + V3).
    expect(getAllByText('Start your streak').length).toBe(2);
  });

  it('renders every V2/V3 variant in the dark seed', () => {
    const { getByText } = renderThemed(<AllVariants />, SEED_DARK);
    expect(getByText('Morning stillness')).toBeTruthy();
    expect(getByText('Late train')).toBeTruthy();
  });
});

describe('wellness design variants (native) — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(<AllVariants />, seed);
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

describe('wellness design variants (native) — interaction', () => {
  it('MeditationSessionCardV2 starts a session from the big play', () => {
    const onStart = jest.fn();
    const { getByLabelText } = renderThemed(
      <MeditationSessionCardV2 title="Stillness" category="calm" progress={0.3} onStart={onStart} />,
      SEED_LIGHT
    );
    const play = getByLabelText('Resume');
    fireEvent(play, 'pressIn');
    fireEvent.press(play);
    fireEvent(play, 'pressOut');
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('MeditationSessionCardV3 starts a session from the trailing control', () => {
    const onStart = jest.fn();
    const { getByLabelText } = renderThemed(
      <MeditationSessionCardV3 title="Focus" category="focus" durationMin={15} onStart={onStart} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('MoodCheckInV2 selects a mood and submits it', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    function Harness(): React.ReactElement {
      const [mood, setMood] = React.useState<Mood | undefined>(undefined);
      return (
        <MoodCheckInV2
          value={mood}
          onChange={(m) => {
            onChange(m);
            setMood(m);
          }}
          onSubmit={onSubmit}
        />
      );
    }
    const { getByLabelText, getByText } = renderThemed(<Harness />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Great'));
    expect(onChange).toHaveBeenCalledWith('great');
    fireEvent.press(getByText('Save check-in'));
    expect(onSubmit).toHaveBeenCalledWith({ mood: 'great', note: undefined });
  });

  it('MoodCheckInV3 selects a mood and submits it', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    function Harness(): React.ReactElement {
      const [mood, setMood] = React.useState<Mood | undefined>(undefined);
      return (
        <MoodCheckInV3
          value={mood}
          onChange={(m) => {
            onChange(m);
            setMood(m);
          }}
          onSubmit={onSubmit}
        />
      );
    }
    const { getByLabelText, getByText } = renderThemed(<Harness />, SEED_DARK);
    fireEvent.press(getByLabelText('Okay'));
    expect(onChange).toHaveBeenCalledWith('okay');
    fireEvent.press(getByText('Save check-in'));
    expect(onSubmit).toHaveBeenCalledWith({ mood: 'okay', note: undefined });
  });

  it('SleepStoryCardV2 fires play and SleepStoryCardV3 respects a lock', () => {
    const onPlay = jest.fn();
    const { getByLabelText } = renderThemed(
      <SleepStoryCardV2 title="Ocean" category="nature" narrator="Ava" durationMin={45} onPlay={onPlay} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlay).toHaveBeenCalledTimes(1);

    const locked = jest.fn();
    const row = renderThemed(
      <SleepStoryCardV3 title="Locked" category="fiction" locked onPlay={locked} />,
      SEED_DARK
    );
    fireEvent.press(row.getByLabelText('Locked'));
    expect(locked).not.toHaveBeenCalled();
  });
});
