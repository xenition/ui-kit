import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import {
  CourseCardV2,
  CourseCardV3,
  LessonRowV2,
  LessonRowV3,
  QuizQuestionV2,
  QuizQuestionV3,
  LeaderboardRowV2,
  LeaderboardRowV3,
  CourseCardV4,
  LessonRowV4,
  VideoLessonRowV4,
  LeaderboardRowV4,
  CertificateCardV4,
  ProgressTrackerV4,
  QuizQuestionV4,
  QuizOptionV4,
  FlashCardV4,
  ModuleAccordionV4,
  EnrollButtonV4,
  StreakBadgeV4,
  AchievementBadgeV4,
} from './index';

/** All alternate designs rendered together, exercising rich + empty/edge props. */
function AllVariants(): React.ReactElement {
  return (
    <>
      <CourseCardV2
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
      <CourseCardV2 title="No frills course" />
      <CourseCardV3
        title="Design Systems at Scale"
        instructor="Grace H."
        level="intermediate"
        category="Design"
        lessonCount={18}
        durationLabel="4h"
        rating={4.9}
        ratingCount={88}
        progress={65}
        price="Free"
        onPress={() => {}}
      />
      <CourseCardV3 title="Minimal, no CTA" />

      <LessonRowV2 index={1} title="Setup" durationLabel="8 min" status="completed" kind="Video" onPress={() => {}} />
      <LessonRowV2 title="Final exam" status="locked" />
      <LessonRowV3 index={2} title="Components" durationLabel="12 min" status="in-progress" kind="Reading" onPress={() => {}} />
      <LessonRowV3 title="Locked module" status="locked" />

      <QuizQuestionV2
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
      <QuizQuestionV2 prompt="Review mode" review selectedId="a" choices={[{ id: 'a', label: 'Wrong' }, { id: 'b', label: 'Right', correct: true }]} />
      <QuizQuestionV2 prompt="No choices" choices={[]} />
      <QuizQuestionV3
        prompt="Which is correct?"
        questionNumber={1}
        totalQuestions={4}
        review
        selectedId="x"
        choices={[
          { id: 'x', label: 'Nope' },
          { id: 'y', label: 'Yep', correct: true },
        ]}
      />
      <QuizQuestionV3 prompt="No choices" choices={[]} />

      <LeaderboardRowV2 rank={1} name="Ada L." score={1200} highlighted trend="▲2" onPress={() => {}} />
      <LeaderboardRowV2 rank={4} empty />
      <LeaderboardRowV3 rank={2} name="Grace H." score={980} trend="▼1" onPress={() => {}} />
      <LeaderboardRowV3 rank={5} empty />
    </>
  );
}

describe('learning design variants (native)', () => {
  it('every V2/V3 mounts under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByText } = renderThemed(<AllVariants />, seed);
      expect(getByText('React Native Deep Dive')).toBeTruthy();
      expect(getByText('Design Systems at Scale')).toBeTruthy();
    });
  });

  it('every rendered hex traces to a compiled token (both seeds)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(<AllVariants />, seed);
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('QuizQuestionV2: selecting a radio option fires onSelect with its id', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuizQuestionV2
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
    const four = getByLabelText('B. Four');
    expect(four.props.accessibilityRole).toBe('radio');
    fireEvent.press(four);
    expect(onSelect).toHaveBeenCalledWith('b');
  });
});

/** All 13 V4 "campus" components in ONE tree — the gradient CertificateCardV4
 * award hero is always present, plus compact variants and review/locked states.
 * Shared by the mount test and the both-seeds token-purity block. */
const AllLearningV4 = (
  <>
    <CourseCardV4 title="Intro to TS" instructor="Ada" level="beginner" category="Web" lessonCount={12} durationLabel="4h" rating={4.5} ratingCount={210} progress={40} price="$49" onPress={() => {}} />
    <CourseCardV4 title="Go Deep" level="advanced" variant="compact" onPress={() => {}} />
    <LessonRowV4 title="Variables" index={1} status="available" kind="Video" durationLabel="12 min" onPress={() => {}} />
    <LessonRowV4 title="Locked" status="locked" variant="compact" />
    <VideoLessonRowV4 title="Lecture 1" durationLabel="12:30" watchProgress={30} playing meta="3.2" onPlay={() => {}} />
    <VideoLessonRowV4 title="Lecture 2" watched variant="compact" onPlay={() => {}} />
    <LeaderboardRowV4 rank={1} name="Ada" score={980} trend="▲2" highlighted onPress={() => {}} />
    <LeaderboardRowV4 rank={4} empty variant="compact" />
    <CertificateCardV4 courseTitle="React 101" recipient="Ada Lovelace" issuer="Xen Academy" issuedOn="May 2026" credentialId="XA-2026-001" variant="honors" onAction={() => {}} />
    <ProgressTrackerV4 steps={[{ id: '1', label: 'A', completed: true }, { id: '2', label: 'B' }]} showList />
    <QuizQuestionV4 prompt="2 + 2 = ?" questionNumber={1} totalQuestions={3} choices={[{ id: 'a', label: '3' }, { id: 'b', label: '4', correct: true }]} onSelect={() => {}} />
    <QuizQuestionV4 prompt="Review" review selectedId="a" choices={[{ id: 'a', label: 'Wrong' }, { id: 'b', label: 'Right', correct: true }]} />
    <QuizOptionV4 label="4" marker="B" state="correct" />
    <FlashCardV4 front="Photosynthesis" back="Light to energy" />
    <ModuleAccordionV4 modules={[{ id: 'm1', title: 'Basics', lessons: [{ id: 'l1', title: 'Intro', status: 'completed' }] }]} onLessonPress={() => {}} />
    <EnrollButtonV4 state="enrolled" />
    <StreakBadgeV4 count={5} tone="primary" />
    <AchievementBadgeV4 title="First Step" tier="gold" unlocked />
    <AchievementBadgeV4 title="Locked" tier="platinum" unlocked={false} />
  </>
);

describe('learning V4 "campus" line (native)', () => {
  it('mounts all 13 V4 together (SEED_LIGHT) with the gradient hero + statuses', () => {
    const { getByText } = renderThemed(AllLearningV4, SEED_LIGHT);
    expect(getByText('Intro to TS')).toBeTruthy();
    // Gradient award hero surfaces the recipient.
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('First Step')).toBeTruthy();
  });

  it('CourseCardV4 (compact) fires the CTA', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <CourseCardV4 title="React 101" level="beginner" variant="compact" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Enroll: React 101'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('QuizOptionV4 renders a radio and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(<QuizOptionV4 label="Four" marker="B" onSelect={onSelect} />, SEED_LIGHT);
    const opt = getByLabelText('B. Four');
    expect(opt.props.accessibilityRole).toBe('radio');
    fireEvent.press(opt);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('LeaderboardRowV4 shows a medal for rank 1 and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(<LeaderboardRowV4 rank={1} name="Ada" score={99} onPress={onPress} />, SEED_LIGHT);
    expect(getByText('🥇')).toBeTruthy();
    fireEvent.press(getByLabelText(/Rank 1, Ada/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity — learning V4 "campus" line (both seeds)', () => {
  it.each([SEED_LIGHT, SEED_DARK])('every rendered V4 style hex traces to a compiled token (%s)', (seed) => {
    const { root } = renderThemed(AllLearningV4, seed);
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
