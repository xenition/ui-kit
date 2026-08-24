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
