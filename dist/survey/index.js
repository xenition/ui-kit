"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyNavigator = exports.NPSResultCard = exports.SurveyComplete = exports.YesNoToggle = exports.DEFAULT_EMOJI_OPTIONS = exports.EmojiScale = exports.SliderScale = exports.SurveyProgressV4 = exports.SurveyIntroV4 = exports.ResponseSummaryV4 = exports.RatingScaleInputV4 = exports.RankingQuestionV4 = exports.PollResultBarV4 = exports.OpenTextResponseV4 = exports.MatrixQuestionV4 = exports.NPSScaleV4 = exports.MultipleChoiceV4 = exports.LikertScaleV4 = exports.QuestionCardV4 = exports.SurveyIntro = exports.PollResultBar = exports.OpenTextResponse = exports.RankingQuestion = exports.MatrixQuestion = exports.ResponseSummary = exports.SurveyProgress = exports.MultipleChoiceV3 = exports.MultipleChoiceV2 = exports.MultipleChoice = exports.RatingScaleInput = exports.NPSScaleV3 = exports.NPSScaleV2 = exports.npsBucket = exports.NPSScale = exports.LikertScaleV3 = exports.LikertScaleV2 = exports.LikertScale = exports.QuestionCardV3 = exports.QuestionCardV2 = exports.QuestionCard = void 0;
var QuestionCard_1 = require("./QuestionCard");
Object.defineProperty(exports, "QuestionCard", { enumerable: true, get: function () { return QuestionCard_1.QuestionCard; } });
var QuestionCardV2_1 = require("./QuestionCardV2");
Object.defineProperty(exports, "QuestionCardV2", { enumerable: true, get: function () { return QuestionCardV2_1.QuestionCardV2; } });
var QuestionCardV3_1 = require("./QuestionCardV3");
Object.defineProperty(exports, "QuestionCardV3", { enumerable: true, get: function () { return QuestionCardV3_1.QuestionCardV3; } });
var LikertScale_1 = require("./LikertScale");
Object.defineProperty(exports, "LikertScale", { enumerable: true, get: function () { return LikertScale_1.LikertScale; } });
var LikertScaleV2_1 = require("./LikertScaleV2");
Object.defineProperty(exports, "LikertScaleV2", { enumerable: true, get: function () { return LikertScaleV2_1.LikertScaleV2; } });
var LikertScaleV3_1 = require("./LikertScaleV3");
Object.defineProperty(exports, "LikertScaleV3", { enumerable: true, get: function () { return LikertScaleV3_1.LikertScaleV3; } });
var NPSScale_1 = require("./NPSScale");
Object.defineProperty(exports, "NPSScale", { enumerable: true, get: function () { return NPSScale_1.NPSScale; } });
Object.defineProperty(exports, "npsBucket", { enumerable: true, get: function () { return NPSScale_1.npsBucket; } });
var NPSScaleV2_1 = require("./NPSScaleV2");
Object.defineProperty(exports, "NPSScaleV2", { enumerable: true, get: function () { return NPSScaleV2_1.NPSScaleV2; } });
var NPSScaleV3_1 = require("./NPSScaleV3");
Object.defineProperty(exports, "NPSScaleV3", { enumerable: true, get: function () { return NPSScaleV3_1.NPSScaleV3; } });
var RatingScaleInput_1 = require("./RatingScaleInput");
Object.defineProperty(exports, "RatingScaleInput", { enumerable: true, get: function () { return RatingScaleInput_1.RatingScaleInput; } });
var MultipleChoice_1 = require("./MultipleChoice");
Object.defineProperty(exports, "MultipleChoice", { enumerable: true, get: function () { return MultipleChoice_1.MultipleChoice; } });
var MultipleChoiceV2_1 = require("./MultipleChoiceV2");
Object.defineProperty(exports, "MultipleChoiceV2", { enumerable: true, get: function () { return MultipleChoiceV2_1.MultipleChoiceV2; } });
var MultipleChoiceV3_1 = require("./MultipleChoiceV3");
Object.defineProperty(exports, "MultipleChoiceV3", { enumerable: true, get: function () { return MultipleChoiceV3_1.MultipleChoiceV3; } });
var SurveyProgress_1 = require("./SurveyProgress");
Object.defineProperty(exports, "SurveyProgress", { enumerable: true, get: function () { return SurveyProgress_1.SurveyProgress; } });
var ResponseSummary_1 = require("./ResponseSummary");
Object.defineProperty(exports, "ResponseSummary", { enumerable: true, get: function () { return ResponseSummary_1.ResponseSummary; } });
var MatrixQuestion_1 = require("./MatrixQuestion");
Object.defineProperty(exports, "MatrixQuestion", { enumerable: true, get: function () { return MatrixQuestion_1.MatrixQuestion; } });
var RankingQuestion_1 = require("./RankingQuestion");
Object.defineProperty(exports, "RankingQuestion", { enumerable: true, get: function () { return RankingQuestion_1.RankingQuestion; } });
var OpenTextResponse_1 = require("./OpenTextResponse");
Object.defineProperty(exports, "OpenTextResponse", { enumerable: true, get: function () { return OpenTextResponse_1.OpenTextResponse; } });
var PollResultBar_1 = require("./PollResultBar");
Object.defineProperty(exports, "PollResultBar", { enumerable: true, get: function () { return PollResultBar_1.PollResultBar; } });
var SurveyIntro_1 = require("./SurveyIntro");
Object.defineProperty(exports, "SurveyIntro", { enumerable: true, get: function () { return SurveyIntro_1.SurveyIntro; } });
/*
 * ── V4 "focus" (clean form) design line ──
 * A drop-in V4 variant for each of the 12 originals: calm elevated cards, one
 * primary accent, big legible ≥44px controls, a slim primary focus bar on the
 * question card, and a brand gradient reserved for the peak/end moments (survey
 * intro, completion, NPS results). Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
var QuestionCardV4_1 = require("./QuestionCardV4");
Object.defineProperty(exports, "QuestionCardV4", { enumerable: true, get: function () { return QuestionCardV4_1.QuestionCardV4; } });
var LikertScaleV4_1 = require("./LikertScaleV4");
Object.defineProperty(exports, "LikertScaleV4", { enumerable: true, get: function () { return LikertScaleV4_1.LikertScaleV4; } });
var MultipleChoiceV4_1 = require("./MultipleChoiceV4");
Object.defineProperty(exports, "MultipleChoiceV4", { enumerable: true, get: function () { return MultipleChoiceV4_1.MultipleChoiceV4; } });
var NPSScaleV4_1 = require("./NPSScaleV4");
Object.defineProperty(exports, "NPSScaleV4", { enumerable: true, get: function () { return NPSScaleV4_1.NPSScaleV4; } });
var MatrixQuestionV4_1 = require("./MatrixQuestionV4");
Object.defineProperty(exports, "MatrixQuestionV4", { enumerable: true, get: function () { return MatrixQuestionV4_1.MatrixQuestionV4; } });
var OpenTextResponseV4_1 = require("./OpenTextResponseV4");
Object.defineProperty(exports, "OpenTextResponseV4", { enumerable: true, get: function () { return OpenTextResponseV4_1.OpenTextResponseV4; } });
var PollResultBarV4_1 = require("./PollResultBarV4");
Object.defineProperty(exports, "PollResultBarV4", { enumerable: true, get: function () { return PollResultBarV4_1.PollResultBarV4; } });
var RankingQuestionV4_1 = require("./RankingQuestionV4");
Object.defineProperty(exports, "RankingQuestionV4", { enumerable: true, get: function () { return RankingQuestionV4_1.RankingQuestionV4; } });
var RatingScaleInputV4_1 = require("./RatingScaleInputV4");
Object.defineProperty(exports, "RatingScaleInputV4", { enumerable: true, get: function () { return RatingScaleInputV4_1.RatingScaleInputV4; } });
var ResponseSummaryV4_1 = require("./ResponseSummaryV4");
Object.defineProperty(exports, "ResponseSummaryV4", { enumerable: true, get: function () { return ResponseSummaryV4_1.ResponseSummaryV4; } });
var SurveyIntroV4_1 = require("./SurveyIntroV4");
Object.defineProperty(exports, "SurveyIntroV4", { enumerable: true, get: function () { return SurveyIntroV4_1.SurveyIntroV4; } });
var SurveyProgressV4_1 = require("./SurveyProgressV4");
Object.defineProperty(exports, "SurveyProgressV4", { enumerable: true, get: function () { return SurveyProgressV4_1.SurveyProgressV4; } });
/* ── New components (V4 focus line) ── */
var SliderScale_1 = require("./SliderScale");
Object.defineProperty(exports, "SliderScale", { enumerable: true, get: function () { return SliderScale_1.SliderScale; } });
var EmojiScale_1 = require("./EmojiScale");
Object.defineProperty(exports, "EmojiScale", { enumerable: true, get: function () { return EmojiScale_1.EmojiScale; } });
Object.defineProperty(exports, "DEFAULT_EMOJI_OPTIONS", { enumerable: true, get: function () { return EmojiScale_1.DEFAULT_EMOJI_OPTIONS; } });
var YesNoToggle_1 = require("./YesNoToggle");
Object.defineProperty(exports, "YesNoToggle", { enumerable: true, get: function () { return YesNoToggle_1.YesNoToggle; } });
var SurveyComplete_1 = require("./SurveyComplete");
Object.defineProperty(exports, "SurveyComplete", { enumerable: true, get: function () { return SurveyComplete_1.SurveyComplete; } });
var NPSResultCard_1 = require("./NPSResultCard");
Object.defineProperty(exports, "NPSResultCard", { enumerable: true, get: function () { return NPSResultCard_1.NPSResultCard; } });
var SurveyNavigator_1 = require("./SurveyNavigator");
Object.defineProperty(exports, "SurveyNavigator", { enumerable: true, get: function () { return SurveyNavigator_1.SurveyNavigator; } });
//# sourceMappingURL=index.js.map