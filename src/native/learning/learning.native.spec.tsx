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
  CourseCard,
  LessonRow,
  QuizQuestion,
  QuizOption,
  ProgressTracker,
  FlashCard,
  CertificateCard,
  ModuleAccordion,
  EnrollButton,
  StreakBadge,
  VideoLessonRow,
  LeaderboardRow,
  AchievementBadge,
} from './index';

describe('CourseCard (native)', () => {
  it('renders title/level tag and fires the CTA', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <CourseCard title="Intro to TypeScript" instructor="Ada L." level="beginner" lessonCount={12} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Intro to TypeScript')).toBeTruthy();
    expect(getByText('Beginner')).toBeTruthy();
    fireEvent.press(getByText('Enroll'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('QuizQuestion / QuizOption (native)', () => {
  it('selecting a choice fires onSelect with its id', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuizQuestion
        prompt="What is 2 + 2?"
        questionNumber={1}
        totalQuestions={5}
        choices={[
          { id: 'a', label: 'Three' },
          { id: 'b', label: 'Four', correct: true },
        ]}
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    // Radio a11y role + label (marker prefix from the question).
    const four = getByLabelText('B. Four');
    expect(four.props.accessibilityRole).toBe('radio');
    fireEvent.press(four);
    expect(onSelect).toHaveBeenCalledWith('b');
  });

  it('review mode marks correct/incorrect without relying on color alone', () => {
    const { getByLabelText } = renderThemed(
      <QuizOption label="Four" marker="B" state="correct" />,
      SEED_DARK
    );
    // The correctness is spoken in the a11y label, and a ✓ glyph is drawn.
    expect(getByLabelText('B. Four, correct answer')).toBeTruthy();
  });
});

describe('ProgressTracker (native)', () => {
  it('renders an empty state when there are no steps', () => {
    const { getByText } = renderThemed(<ProgressTracker steps={[]} />, SEED_LIGHT);
    expect(getByText('No modules yet')).toBeTruthy();
  });

  it('summarizes completion in a token color', () => {
    const { getByLabelText, getByText } = renderThemed(
      <ProgressTracker
        steps={[
          { id: '1', label: 'Basics', completed: true },
          { id: '2', label: 'Advanced' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/1 of 2 complete, 50%/)).toBeTruthy();
    // The heading uses the onSurface token color.
    const heading = getByText('Your progress');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (heading.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);
  });
});

describe('FlashCard (native)', () => {
  it('flips from front to back on press', () => {
    const onFlip = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FlashCard front="Photosynthesis" back="Light → energy" onFlip={onFlip} />,
      SEED_LIGHT
    );
    expect(getByText('Photosynthesis')).toBeTruthy();
    fireEvent.press(getByLabelText(/Flashcard, Term: Photosynthesis/));
    expect(onFlip).toHaveBeenCalledWith(true);
    expect(getByText('Light → energy')).toBeTruthy();
  });
});

describe('EnrollButton (native)', () => {
  it('fires onEnroll when idle and confirms when enrolled', () => {
    const onEnroll = jest.fn();
    const { getByText } = renderThemed(<EnrollButton state="idle" onEnroll={onEnroll} />, SEED_LIGHT);
    fireEvent.press(getByText('Enroll now'));
    expect(onEnroll).toHaveBeenCalledTimes(1);

    const enrolled = renderThemed(<EnrollButton state="enrolled" />, SEED_DARK);
    expect(enrolled.getByText('Enrolled')).toBeTruthy();
  });
});

describe('LeaderboardRow (native)', () => {
  it('renders an empty placeholder slot', () => {
    const { getByLabelText, getByText } = renderThemed(<LeaderboardRow rank={4} empty />, SEED_LIGHT);
    expect(getByLabelText('Rank 4, empty')).toBeTruthy();
    expect(getByText('—')).toBeTruthy();
  });

  it('highlights the current user with a token background color', () => {
    const { getByLabelText } = renderThemed(
      <LeaderboardRow rank={2} name="Grace H." score={980} highlighted />,
      SEED_LIGHT
    );
    const row = getByLabelText(/Rank 2, Grace H\., 980 pts, you/);
    const allowed = tokenHexSet(SEED_LIGHT);
    const found = renderedStyleHexes(row);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('LessonRow / StreakBadge / AchievementBadge (native)', () => {
  it('locks a lesson, prompts a zero streak, and locks an achievement', () => {
    const locked = renderThemed(<LessonRow title="Final exam" status="locked" />, SEED_LIGHT);
    expect(locked.getByLabelText(/Final exam, locked/)).toBeTruthy();

    const streak = renderThemed(<StreakBadge count={0} />, SEED_DARK);
    expect(streak.getByText('Start your streak')).toBeTruthy();

    const ach = renderThemed(<AchievementBadge title="First steps" tier="bronze" unlocked={false} />, SEED_LIGHT);
    expect(ach.getByLabelText(/First steps achievement, bronze tier, locked/)).toBeTruthy();
  });
});

describe('token purity (native learning, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CourseCard
            title="React Native Deep Dive"
            instructor="Linus T."
            level="advanced"
            category="Mobile"
            lessonCount={24}
            durationLabel="6h 15m"
            rating={4.7}
            ratingCount={210}
            progress={40}
            price="$79"
            onPress={() => {}}
          />
          <LessonRow index={1} title="Setup" durationLabel="8 min" status="completed" kind="Video" onPress={() => {}} />
          <QuizQuestion
            prompt="Pick one"
            questionNumber={2}
            totalQuestions={3}
            selectedId="a"
            choices={[
              { id: 'a', label: 'Alpha' },
              { id: 'b', label: 'Beta', correct: true },
            ]}
            onSelect={() => {}}
          />
          <QuizQuestion prompt="No choices" choices={[]} />
          <ProgressTracker
            variant="ring"
            steps={[
              { id: '1', label: 'One', completed: true },
              { id: '2', label: 'Two' },
            ]}
            showList
          />
          <ProgressTracker steps={[]} />
          <FlashCard front="Q" back="A" defaultFlipped />
          <CertificateCard courseTitle="Data Science" recipient="Grace H." issuer="Xenition" issuedOn="May 2026" credentialId="XN-123" variant="honors" onAction={() => {}} />
          <ModuleAccordion
            modules={[
              {
                id: 'm1',
                title: 'Module 1',
                lessons: [
                  { id: 'l1', title: 'Lesson 1', status: 'completed', durationLabel: '5 min' },
                  { id: 'l2', title: 'Lesson 2', status: 'available' },
                ],
              },
            ]}
            defaultOpenIds={['m1']}
            onLessonPress={() => {}}
          />
          <ModuleAccordion modules={[]} />
          <EnrollButton state="idle" price="$79" onEnroll={() => {}} />
          <EnrollButton state="enrolled" />
          <EnrollButton state="full" />
          <StreakBadge count={12} tone="warn" />
          <StreakBadge count={0} />
          <VideoLessonRow title="Intro clip" durationLabel="3:20" watchProgress={60} playing meta="1.1" onPlay={() => {}} />
          <LeaderboardRow rank={1} name="Ada L." score={1200} highlighted trend="▲2" onPress={() => {}} />
          <LeaderboardRow rank={5} empty />
          <AchievementBadge title="Streak master" tier="gold" unlocked description="7 day streak" onPress={() => {}} />
          <AchievementBadge title="Locked" tier="silver" unlocked={false} />
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
