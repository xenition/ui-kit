/**
 * Shared data shapes for `@xenition/ui/survey` (web / React DOM). Presentational
 * only — the host app owns question state and persistence; these types just
 * describe the data the components render and the callbacks they fire. Mirrors
 * the native `@xenition/ui/native/survey` contract 1:1.
 */

/** A single selectable answer option (multiple choice, ranking, matrix cols…). */
export interface SurveyChoice {
  /** Stable id reported back through the change callbacks. */
  id: string;
  /** Human label shown to the respondent. */
  label: string;
  /** Optional helper line under the label. */
  description?: string;
  /** Optional leading glyph/emoji. */
  icon?: string;
}

/** One row in a {@link MatrixQuestion}. */
export interface MatrixRow {
  id: string;
  label: string;
}

/** A tallied poll option (a choice plus its vote count). */
export interface PollOption extends SurveyChoice {
  /** Number of votes for this option. */
  votes: number;
}

/** A single answered question, for {@link ResponseSummary}. */
export interface SurveyAnswer {
  /** The question id/key. */
  id: string;
  /** The question prompt. */
  question: string;
  /** The rendered answer (already formatted by the host). */
  answer: string;
  /** Marks the answer as skipped/unanswered → muted styling. */
  skipped?: boolean;
}

/** How a {@link MultipleChoice} lets the respondent answer. */
export type ChoiceSelection = 'single' | 'multiple';
