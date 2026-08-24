/**
 * `@xenition/ui/native/survey` — survey, research, feedback and polling
 * components for React Native. Mobile-first and presentational: the host app
 * owns the answers and callbacks, nothing here fetches or persists. Every color
 * traces to a compiled `SemanticColors` token via `useXenitionTheme()` (no
 * literal colors), inputs are controlled (`value` + change callback), and each
 * control uses RN-valid a11y roles (`radiogroup`/`radio`/`checkbox`/
 * `progressbar`) with selection announced — never conveyed by color alone.
 *
 * Composed from the shared `../primitives` (Card, Button, Icon, Textarea,
 * Progress, …) so a theme-seed change restyles the whole survey, dark mode
 * included.
 */

export { QuestionCard } from './QuestionCard';
export type { QuestionCardProps, QuestionCardVariant } from './QuestionCard';
export { QuestionCardV2 } from './QuestionCardV2';
export type { QuestionCardV2Props } from './QuestionCardV2';
export { QuestionCardV3 } from './QuestionCardV3';
export type { QuestionCardV3Props } from './QuestionCardV3';

export { LikertScale } from './LikertScale';
export type { LikertScaleProps, LikertVariant } from './LikertScale';
export { LikertScaleV2 } from './LikertScaleV2';
export type { LikertScaleV2Props } from './LikertScaleV2';
export { LikertScaleV3 } from './LikertScaleV3';
export type { LikertScaleV3Props } from './LikertScaleV3';

export { NPSScale, npsBucket } from './NPSScale';
export type { NPSScaleProps, NPSBucket } from './NPSScale';
export { NPSScaleV2 } from './NPSScaleV2';
export type { NPSScaleV2Props } from './NPSScaleV2';
export { NPSScaleV3 } from './NPSScaleV3';
export type { NPSScaleV3Props } from './NPSScaleV3';

export { RatingScaleInput } from './RatingScaleInput';
export type { RatingScaleInputProps, RatingScaleVariant } from './RatingScaleInput';

export { MultipleChoice } from './MultipleChoice';
export type { MultipleChoiceProps } from './MultipleChoice';
export { MultipleChoiceV2 } from './MultipleChoiceV2';
export type { MultipleChoiceV2Props } from './MultipleChoiceV2';
export { MultipleChoiceV3 } from './MultipleChoiceV3';
export type { MultipleChoiceV3Props } from './MultipleChoiceV3';

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

export type {
  SurveyChoice,
  MatrixRow,
  PollOption,
  SurveyAnswer,
  ChoiceSelection,
} from './types';
