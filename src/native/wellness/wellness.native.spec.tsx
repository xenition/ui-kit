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
  MeditationSessionCard,
  BreathingGuide,
  MoodCheckIn,
  MindfulnessStreak,
  SleepStoryCard,
  GratitudeEntry,
  JournalPrompt,
  WellnessGoalRing,
  SoundscapeRow,
  SessionTimer,
  DailyQuoteCard,
  ProgressCalendar,
} from './index';

describe('MeditationSessionCard (native)', () => {
  it('renders the tag, title, and starts a session', () => {
    const onStart = jest.fn();
    const { getByText } = renderThemed(
      <MeditationSessionCard
        title="Morning stillness"
        category="calm"
        durationMin={10}
        level="beginner"
        onStart={onStart}
      />,
      SEED_LIGHT
    );
    expect(getByText('Morning stillness')).toBeTruthy();
    expect(getByText('Calm')).toBeTruthy();
    expect(getByText('10 min')).toBeTruthy();
    fireEvent.press(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('resumes and locks', () => {
    const resume = renderThemed(
      <MeditationSessionCard title="Deep focus" category="focus" progress={0.4} onStart={() => {}} />,
      SEED_DARK
    );
    expect(resume.getByText('Resume')).toBeTruthy();

    const locked = renderThemed(
      <MeditationSessionCard title="Premium" category="sleep" locked onStart={() => {}} />,
      SEED_LIGHT
    );
    expect(locked.getByText('🔒 Unlock with a membership')).toBeTruthy();
  });

  it('renders a loading skeleton', () => {
    const { getByLabelText } = renderThemed(
      <MeditationSessionCard title="x" category="calm" loading />,
      SEED_DARK
    );
    expect(getByLabelText('Loading session')).toBeTruthy();
  });
});

describe('BreathingGuide (native)', () => {
  it('mounts at rest with a paused a11y label and a phase caption', () => {
    const { getByText, getByLabelText } = renderThemed(<BreathingGuide pattern="box" />, SEED_LIGHT);
    expect(getByText('Breathe in')).toBeTruthy();
    expect(getByLabelText(/Breathing guide, paused/)).toBeTruthy();
  });
});

describe('MoodCheckIn (native)', () => {
  it('selects a mood and submits it', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    function Harness(): React.ReactElement {
      const [mood, setMood] = React.useState<undefined | 'great'>(undefined);
      return (
        <MoodCheckIn
          value={mood}
          onChange={(m) => {
            onChange(m);
            setMood(m as 'great');
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
});

describe('MindfulnessStreak (native)', () => {
  it('shows the count in a token color and an empty prompt at zero', () => {
    const { getByText } = renderThemed(
      <MindfulnessStreak count={7} best={20} week={[true, false, true, true, false, true, true]} tone="warn" />,
      SEED_LIGHT
    );
    const number = getByText('7');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (number.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);

    const zero = renderThemed(<MindfulnessStreak count={0} />, SEED_DARK);
    expect(zero.getByText('Start your streak')).toBeTruthy();
  });
});

describe('SleepStoryCard (native)', () => {
  it('toggles play and shows a loading state', () => {
    const onPlay = jest.fn();
    const { getByLabelText } = renderThemed(
      <SleepStoryCard title="Rainforest" category="nature" narrator="Ava" durationMin={30} onPlay={onPlay} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlay).toHaveBeenCalledTimes(1);

    const loading = renderThemed(<SleepStoryCard title="x" category="fiction" loading />, SEED_LIGHT);
    expect(loading.getByLabelText('Loading story')).toBeTruthy();
  });
});

describe('GratitudeEntry (native)', () => {
  it('submits a trimmed entry and disables when blank', () => {
    const onSubmit = jest.fn();
    const withText = renderThemed(
      <GratitudeEntry value="  warm coffee  " onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(withText.getByText('Add'));
    expect(onSubmit).toHaveBeenCalledWith('warm coffee');

    // Empty draft: submit is disabled, so pressing does nothing.
    const blank = jest.fn();
    const empty = renderThemed(<GratitudeEntry value="" onSubmit={blank} />, SEED_DARK);
    fireEvent.press(empty.getByText('Add'));
    expect(blank).not.toHaveBeenCalled();
    expect(empty.getByText('No entries yet — add your first.')).toBeTruthy();
  });
});

describe('JournalPrompt (native)', () => {
  it('fires write and marks answered', () => {
    const onWrite = jest.fn();
    const { getByText } = renderThemed(
      <JournalPrompt prompt="What went well today?" category="reflection" answered onWrite={onWrite} />,
      SEED_LIGHT
    );
    expect(getByText('✓ Done')).toBeTruthy();
    fireEvent.press(getByText('Continue'));
    expect(onWrite).toHaveBeenCalledTimes(1);
  });
});

describe('WellnessGoalRing (native)', () => {
  it('labels progress and degrades with no goal', () => {
    const { getByLabelText } = renderThemed(
      <WellnessGoalRing label="Mindful minutes" value={12} goal={20} unit="min" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Mindful minutes: 12 of 20 min, 60%/)).toBeTruthy();

    const none = renderThemed(<WellnessGoalRing label="Mindful minutes" value={0} goal={0} />, SEED_DARK);
    expect(none.getByText('No goal set')).toBeTruthy();
  });
});

describe('SoundscapeRow (native)', () => {
  it('toggles playback', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <SoundscapeRow variant="rain" playing={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Play Rain'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('SessionTimer (native)', () => {
  it('formats the remaining time and pauses', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SessionTimer totalSec={600} remainingSec={125} running phaseLabel="Body scan" onToggle={onToggle} />,
      SEED_DARK
    );
    expect(getByText('2:05')).toBeTruthy();
    fireEvent.press(getByLabelText('Pause'));
    expect(onToggle).toHaveBeenCalledWith(false);

    const done = renderThemed(<SessionTimer totalSec={600} remainingSec={0} />, SEED_LIGHT);
    expect(done.getByText('✓ Complete')).toBeTruthy();
  });
});

describe('DailyQuoteCard (native)', () => {
  it('favorites, shows loading, and shows empty', () => {
    const onFavorite = jest.fn();
    const { getByLabelText } = renderThemed(
      <DailyQuoteCard quote="Be here now." author="Ram Dass" category="Presence" onFavorite={onFavorite} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Add to favorites'));
    expect(onFavorite).toHaveBeenCalledWith(true);

    const loading = renderThemed(<DailyQuoteCard loading />, SEED_DARK);
    expect(loading.getByLabelText('Loading quote')).toBeTruthy();

    const empty = renderThemed(<DailyQuoteCard />, SEED_LIGHT);
    expect(empty.getByText('No quote today.')).toBeTruthy();
  });
});

describe('ProgressCalendar (native)', () => {
  it('selects a day and renders an empty note', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = renderThemed(
      <ProgressCalendar
        title="August"
        startWeekday={2}
        days={[
          { day: 1, level: 0 },
          { day: 2, level: 2 },
          { day: 3, level: 3, today: true },
        ]}
        onSelectDay={onSelectDay}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Day 2, level 2'));
    expect(onSelectDay).toHaveBeenCalledWith({ day: 2, level: 2 });

    const empty = renderThemed(<ProgressCalendar title="August" days={[]} />, SEED_DARK);
    expect(empty.getByText('No activity this month.')).toBeTruthy();
  });
});

describe('token purity (native wellness, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <MeditationSessionCard title="Stillness" category="calm" durationMin={10} progress={0.3} onStart={() => {}} />
          <BreathingGuide pattern="4-7-8" />
          <MoodCheckIn value="good" showNote note="calm day" onChange={() => {}} onSubmit={() => {}} />
          <MindfulnessStreak count={9} best={30} week={[true, true, false, true, true, false, true]} />
          <SleepStoryCard title="Ocean" category="nature" narrator="Ava" durationMin={45} playing onPlay={() => {}} />
          <GratitudeEntry
            value="sunshine"
            entries={[{ id: '1', text: 'family' }]}
            maxLength={120}
            onSubmit={() => {}}
            onRemove={() => {}}
          />
          <JournalPrompt prompt="What are you letting go of?" category="growth" response="Old worries." onWrite={() => {}} onShuffle={() => {}} />
          <WellnessGoalRing label="Mindful minutes" value={14} goal={20} unit="min" color="success" />
          <SoundscapeRow variant="fire" playing volume={0.6} onToggle={() => {}} onVolumeChange={() => {}} />
          <SessionTimer totalSec={600} remainingSec={240} running phaseLabel="Focus" onToggle={() => {}} onReset={() => {}} />
          <DailyQuoteCard quote="Breathe." author="Anon" category="Calm" favorited onFavorite={() => {}} onShare={() => {}} />
          <ProgressCalendar
            title="August"
            startWeekday={3}
            days={[
              { day: 1, level: 1 },
              { day: 2, level: 2, today: true },
              { day: 3, level: 3 },
            ]}
            onSelectDay={() => {}}
          />
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
