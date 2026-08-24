/** @jest-environment jsdom */
/**
 * Web-parity wellness blocks: render smoke, token-class purity (semantic
 * `--xen-*` classes, never literal colors), and the core interactions — starting
 * a session, selecting a mood, submitting a gratitude entry, toggling a
 * soundscape, and the empty state. Plain `expect` under jsdom (mirrors
 * `Button.spec.tsx`); no provider needed because every color is a token class
 * string.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  MeditationSessionCard,
  MoodCheckIn,
  MindfulnessStreak,
  GratitudeEntry,
  JournalPrompt,
  WellnessGoalRing,
  SoundscapeRow,
  SessionTimer,
  DailyQuoteCard,
  ProgressCalendar,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('wellness (web) — render + token purity', () => {
  it('renders a full composition free of hex literals in inline styles', () => {
    const { container, getByText } = render(
      <main>
        <MeditationSessionCard title="Morning stillness" category="calm" durationMin={10} level="beginner" progress={0.4} onStart={() => undefined} />
        <MindfulnessStreak count={5} best={12} week={[true, false, true, true, false, true, true]} />
        <JournalPrompt prompt="What went well today?" category="reflection" answered onWrite={() => undefined} onShuffle={() => undefined} />
        <WellnessGoalRing label="Mindful minutes" value={12} goal={20} unit="min" />
        <SessionTimer totalSec={600} remainingSec={240} running phaseLabel="Body scan" onToggle={() => undefined} onReset={() => undefined} />
        <DailyQuoteCard quote="Be here now." author="Ram Dass" category="Presence" onFavorite={() => undefined} onShare={() => undefined} />
        <ProgressCalendar title="August" days={[{ day: 1, level: 2 }, { day: 2, level: 0, today: true }]} onSelectDay={() => undefined} />
      </main>
    );

    expect(getByText('Morning stillness')).toBeTruthy();
    expect(getByText('Be here now.')).toBeTruthy();
    expect(container.querySelector('[data-xen-meditation-session-card]')).not.toBeNull();
    expect(container.querySelector('[data-xen-mindfulness-streak]')).not.toBeNull();
    expect(container.querySelector('[data-xen-progress-calendar]')).not.toBeNull();

    const inlineStyles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(inlineStyles).not.toMatch(HEX_LITERAL);
  });

  it('binds surfaces to the semantic token classes (no literal colors)', () => {
    const { container } = render(<MoodCheckIn prompt="How are you?" />);
    const root = container.querySelector('[data-xen-mood-check-in]')!;
    expect(root.className).toContain('bg-surface');
    expect(root.className).toContain('border-border');
  });

  it('forwards the ref to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<MindfulnessStreak ref={ref} count={3} />);
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current?.getAttribute('data-xen-mindfulness-streak')).not.toBeNull();
  });
});

describe('MeditationSessionCard — start a session', () => {
  it('fires onStart from the CTA and labels it Resume mid-progress', () => {
    const onStart = jest.fn();
    const { getByText } = render(
      <MeditationSessionCard title="Focus flow" category="focus" progress={0.5} onStart={onStart} />
    );
    const cta = getByText('Resume');
    fireEvent.click(cta);
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('swaps the CTA for a locked note when locked', () => {
    const onStart = jest.fn();
    const { queryByText, getByText } = render(
      <MeditationSessionCard title="Deep sleep" category="sleep" locked onStart={onStart} />
    );
    expect(queryByText('Start')).toBeNull();
    expect(getByText('🔒 Unlock with a membership')).toBeTruthy();
  });
});

describe('MoodCheckIn — select a mood + submit', () => {
  it('fires onChange with the tapped mood and marks it via aria-checked', () => {
    const onChange = jest.fn();
    const { getByLabelText, rerender } = render(<MoodCheckIn onChange={onChange} />);
    const good = getByLabelText('Good');
    expect(good.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(good);
    expect(onChange).toHaveBeenCalledWith('good');

    rerender(<MoodCheckIn value="good" onChange={onChange} />);
    expect(getByLabelText('Good').getAttribute('aria-checked')).toBe('true');
  });

  it('disables submit until a mood is chosen, then returns mood + note', () => {
    const onSubmit = jest.fn();
    const { getByText, rerender } = render(
      <MoodCheckIn showNote note="calm day" onSubmit={onSubmit} />
    );
    expect((getByText('Save check-in') as HTMLButtonElement).disabled).toBe(true);

    rerender(<MoodCheckIn showNote note="calm day" value="great" onSubmit={onSubmit} />);
    const submit = getByText('Save check-in') as HTMLButtonElement;
    expect(submit.disabled).toBe(false);
    fireEvent.click(submit);
    expect(onSubmit).toHaveBeenCalledWith({ mood: 'great', note: 'calm day' });
  });
});

describe('GratitudeEntry — submit an entry', () => {
  it('disables Add for a blank draft and fires onSubmit with the trimmed text', () => {
    const onSubmit = jest.fn();
    const { getByText, rerender } = render(<GratitudeEntry value="   " onSubmit={onSubmit} />);
    expect((getByText('Add') as HTMLButtonElement).disabled).toBe(true);

    rerender(<GratitudeEntry value="  sunshine  " onSubmit={onSubmit} />);
    const add = getByText('Add') as HTMLButtonElement;
    expect(add.disabled).toBe(false);
    fireEvent.click(add);
    expect(onSubmit).toHaveBeenCalledWith('sunshine');
  });

  it('renders existing entries and removes one by id', () => {
    const onRemove = jest.fn();
    const { getByLabelText, getByText } = render(
      <GratitudeEntry entries={[{ id: 'e1', text: 'my family' }]} onRemove={onRemove} />
    );
    expect(getByText('my family')).toBeTruthy();
    fireEvent.click(getByLabelText('Remove: my family'));
    expect(onRemove).toHaveBeenCalledWith('e1');
  });
});

describe('SoundscapeRow — toggle playback', () => {
  it('fires onToggle with the next state and shows the volume slider while playing', () => {
    const onToggle = jest.fn();
    const { getByLabelText, rerender, container } = render(
      <SoundscapeRow variant="rain" onToggle={onToggle} onVolumeChange={() => undefined} />
    );
    fireEvent.click(getByLabelText('Play Rain'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(container.querySelector('input[type="range"]')).toBeNull();

    rerender(<SoundscapeRow variant="rain" playing onToggle={onToggle} onVolumeChange={() => undefined} />);
    expect(container.querySelector('input[type="range"]')).not.toBeNull();
    expect(getByLabelText('Stop Rain')).toBeTruthy();
  });
});

describe('SessionTimer — complete state', () => {
  it('shows Complete instead of the toggle when time runs out', () => {
    const { getByText, queryByLabelText } = render(
      <SessionTimer totalSec={300} remainingSec={0} onToggle={() => undefined} />
    );
    expect(getByText('✓ Complete')).toBeTruthy();
    expect(queryByLabelText('Play')).toBeNull();
  });
});

describe('wellness — empty states', () => {
  it('ProgressCalendar shows the empty note with no days', () => {
    const { container, getByText } = render(
      <ProgressCalendar title="August" days={[]} emptyLabel="No activity this month." />
    );
    expect(container.querySelector('[data-xen-progress-calendar]')).not.toBeNull();
    expect(getByText('No activity this month.')).toBeTruthy();
  });

  it('DailyQuoteCard shows the empty note with no quote', () => {
    const { getByText } = render(<DailyQuoteCard emptyLabel="No quote today." />);
    expect(getByText('No quote today.')).toBeTruthy();
  });

  it('WellnessGoalRing degrades to a no-goal state', () => {
    const { getByText } = render(<WellnessGoalRing label="Steps" value={0} goal={0} />);
    expect(getByText('No goal set')).toBeTruthy();
  });
});
