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
exports.SurveyIntro = exports.PollResultBar = exports.OpenTextResponse = exports.RankingQuestion = exports.MatrixQuestion = exports.ResponseSummary = exports.SurveyProgress = exports.MultipleChoiceV3 = exports.MultipleChoiceV2 = exports.MultipleChoice = exports.RatingScaleInput = exports.NPSScaleV3 = exports.NPSScaleV2 = exports.npsBucket = exports.NPSScale = exports.LikertScaleV3 = exports.LikertScaleV2 = exports.LikertScale = exports.QuestionCardV3 = exports.QuestionCardV2 = exports.QuestionCard = void 0;
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
//# sourceMappingURL=index.js.map