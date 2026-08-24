/**
 * `@xenition/ui/survey` — survey, research, feedback and polling components for
 * React DOM. The web parity of `@xenition/ui/native/survey`: same component
 * names, same prop contract (`onPress`→`onClick`, RN a11y roles→ARIA), and
 * presentational — the host app owns the answers and callbacks, nothing here
 * fetches or persists. Every color traces to a `--xen-*` token class (no literal
 * colors), inputs are controlled (`value` + change callback), and each control
 * uses the right ARIA (`radiogroup`/`radio`/`checkbox`/`progressbar`) with
 * selection announced via `aria-checked` — never conveyed by color alone.
 *
 * Composed from the shared `../primitives` (Card, Button, Icon, Textarea,
 * Progress, …) and `../commerce` (EmptyState) so a token-seed change restyles
 * the whole survey, dark mode included.
 */
export { QuestionCard } from './QuestionCard';
export type { QuestionCardProps, QuestionCardVariant } from './QuestionCard';
export { LikertScale } from './LikertScale';
export type { LikertScaleProps, LikertVariant } from './LikertScale';
export { NPSScale, npsBucket } from './NPSScale';
export type { NPSScaleProps, NPSBucket } from './NPSScale';
export { RatingScaleInput } from './RatingScaleInput';
export type { RatingScaleInputProps, RatingScaleVariant } from './RatingScaleInput';
export { MultipleChoice } from './MultipleChoice';
export type { MultipleChoiceProps } from './MultipleChoice';
export { SurveyProgress } from './SurveyProgress';
export type { SurveyProgressProps, SurveyProgressVariant } from './SurveyProgress';
export { ResponseSummary } from './ResponseSummary';
export type { ResponseSummaryProps } from './ResponseSummary';
export { MatrixQuestion } from './MatrixQuestion';
export type { MatrixQuestionProps } from './MatrixQuestion';
export { RankingQuestion } from './RankingQuestion';
export type { RankingQuestionProps } from './RankingQuestion';
export { OpenTextResponse } from './OpenTextResponse';
export type { OpenTextResponseProps } from './OpenTextResponse';
export { PollResultBar } from './PollResultBar';
export type { PollResultBarProps } from './PollResultBar';
export { SurveyIntro } from './SurveyIntro';
export type { SurveyIntroProps, SurveyIntroMeta, SurveyIntroVariant } from './SurveyIntro';
export type { SurveyChoice, MatrixRow, PollOption, SurveyAnswer, ChoiceSelection, } from './types';
//# sourceMappingURL=index.d.ts.map