/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import {
  CourseCard,
  LessonRow,
  QuizQuestion,
  QuizOption,
  ProgressTracker,
  FlashCard,
  EnrollButton,
  StreakBadge,
  LeaderboardRow,
  AchievementBadge,
} from './index';

describe('CourseCard (web)', () => {
  it('renders title/level tag and fires the CTA with a token class', () => {
    const onCtaClick = jest.fn();
    const { getByText, getByLabelText } = render(
      <CourseCard title="Intro to TypeScript" instructor="Ada L." level="beginner" lessonCount={12} onCtaClick={onCtaClick} />
    );
    expect(getByText('Intro to TypeScript')).toBeTruthy();
    expect(getByText('Beginner')).toBeTruthy();
    // Token-bound surface on the card root.
    expect(getByLabelText(/Course: Intro to TypeScript/).className).toContain('bg-surface');
    fireEvent.click(getByText('Enroll'));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });
});

describe('LessonRow (web)', () => {
  it('is a keyboard-activable button when interactive', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<LessonRow title="Variables" status="available" onSelect={onSelect} />);
    const row = getByRole('button');
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('locked rows are not interactive', () => {
    const onSelect = jest.fn();
    const { queryByRole, getByText } = render(<LessonRow title="Advanced" status="locked" onSelect={onSelect} />);
    expect(queryByRole('button')).toBeNull();
    fireEvent.click(getByText(/Advanced/));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('QuizQuestion / QuizOption (web)', () => {
  it('renders a radiogroup and selects a choice', () => {
    const onSelect = jest.fn();
    const { getAllByRole, getByRole } = render(
      <QuizQuestion
        prompt="2 + 2 = ?"
        questionNumber={1}
        totalQuestions={3}
        choices={[
          { id: 'a', label: '3' },
          { id: 'b', label: '4' },
        ]}
        onSelect={onSelect}
      />
    );
    expect(getByRole('radiogroup')).toBeTruthy();
    const options = getAllByRole('radio');
    expect(options).toHaveLength(2);
    fireEvent.click(options[1] as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith('b');
  });

  it('surfaces correct state with a glyph, not color alone', () => {
    const { getByLabelText } = render(
      <QuizOption label="4" marker="B" state="correct" />
    );
    const opt = getByLabelText(/correct answer/);
    expect(opt.getAttribute('role')).toBe('radio');
    expect(opt.textContent).toContain('✓');
    expect(opt.className).toContain('border-success');
  });

  it('renders the empty state when there are no choices', () => {
    const { getByText } = render(<QuizQuestion prompt="Empty?" choices={[]} />);
    expect(getByText('No choices available')).toBeTruthy();
  });
});

describe('ProgressTracker (web)', () => {
  it('renders the empty state for no steps', () => {
    const { getByText } = render(<ProgressTracker steps={[]} emptyLabel="Nothing yet" />);
    expect(getByText('Nothing yet')).toBeTruthy();
  });

  it('summarizes completion', () => {
    const { getByText } = render(
      <ProgressTracker
        steps={[
          { id: '1', label: 'A', completed: true },
          { id: '2', label: 'B' },
        ]}
      />
    );
    expect(getByText('1 of 2 complete (50%)')).toBeTruthy();
  });
});

describe('FlashCard (web)', () => {
  it('flips on click (uncontrolled)', () => {
    const onFlip = jest.fn();
    const { getByRole, getByText } = render(<FlashCard front="Photosynthesis" back="Light to energy" onFlip={onFlip} />);
    const card = getByRole('button');
    expect(getByText('Photosynthesis')).toBeTruthy();
    fireEvent.click(card);
    expect(onFlip).toHaveBeenCalledWith(true);
    expect(getByText('Light to energy')).toBeTruthy();
  });
});

describe('EnrollButton (web)', () => {
  it('idle fires onEnroll', () => {
    const onEnroll = jest.fn();
    const { getByRole } = render(<EnrollButton state="idle" onEnroll={onEnroll} />);
    fireEvent.click(getByRole('button'));
    expect(onEnroll).toHaveBeenCalledTimes(1);
  });

  it('enrolled reads as a success confirmation with a token class', () => {
    const { getByLabelText } = render(<EnrollButton state="enrolled" />);
    expect(getByLabelText('Enrolled').firstElementChild?.className).toContain('bg-success');
  });
});

describe('StreakBadge (web)', () => {
  it('degrades to a prompt at zero', () => {
    const { getByLabelText } = render(<StreakBadge count={0} />);
    expect(getByLabelText('Start your streak')).toBeTruthy();
  });

  it('pluralizes and tones the count', () => {
    const { getByLabelText } = render(<StreakBadge count={5} tone="primary" />);
    const badge = getByLabelText('5 days streak');
    expect(badge.textContent).toContain('5');
  });
});

describe('LeaderboardRow (web)', () => {
  it('renders an empty placeholder slot', () => {
    const { getByLabelText } = render(<LeaderboardRow rank={4} empty />);
    expect(getByLabelText('Rank 4, empty')).toBeTruthy();
  });

  it('shows a medal glyph for the top three and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<LeaderboardRow rank={1} name="Ada" score={99} onSelect={onSelect} />);
    const row = getByRole('button');
    expect(row.textContent).toContain('🥇');
    fireEvent.click(row);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('AchievementBadge (web)', () => {
  it('locked badges show a lock and dim (state spoken)', () => {
    const { getByLabelText } = render(<AchievementBadge title="First Step" unlocked={false} />);
    const badge = getByLabelText(/locked/);
    expect(badge.textContent).toContain('🔒');
  });
});
