"use strict";
/**
 * `@xenition/ui/health` — composed React DOM blocks for fitness, health, and
 * wellness screens: workout and meal cards, habit / exercise rows, streak
 * counters, activity and metric rings, water / sleep / mood trackers, and vital
 * / body-composition stat tiles. Web parity of `@xenition/ui/native/health`:
 * every block mirrors its native prop contract (with `onPress` → `onClick` /
 * `onPress` kept where native used it) and is styled exclusively from the
 * `--xen-*` theme tokens via Tailwind classes — no literal colors — with each
 * ring/chart carrying an `aria-label`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralizeUnit = exports.rangeVerdict = exports.goalParts = exports.WorkoutCardV4 = exports.WaterTrackerV4 = exports.VitalStatV4 = exports.StreakCounterV4 = exports.SleepStagesV4 = exports.SleepBarV4 = exports.MoodPickerV4 = exports.MetricRingV4 = exports.MealCardV4 = exports.HealthRangeBarV4 = exports.HabitRowV4 = exports.GoalCardV4 = exports.ExerciseRowV4 = exports.BodyMetricCardV4 = exports.ActivityRingsV4 = exports.BodyMetricCard = exports.MoodPicker = exports.ExerciseRow = exports.VitalStat = exports.GoalCardV3 = exports.GoalCardV2 = exports.GoalCard = exports.ActivityRings = exports.SleepBar = exports.WaterTracker = exports.MealCardV3 = exports.MealCardV2 = exports.MealCard = exports.MetricRing = exports.StreakCounter = exports.HabitRowV3 = exports.HabitRowV2 = exports.HabitRow = exports.WorkoutCardV3 = exports.WorkoutCardV2 = exports.WorkoutCard = void 0;
var WorkoutCard_1 = require("./WorkoutCard");
Object.defineProperty(exports, "WorkoutCard", { enumerable: true, get: function () { return WorkoutCard_1.WorkoutCard; } });
var WorkoutCardV2_1 = require("./WorkoutCardV2");
Object.defineProperty(exports, "WorkoutCardV2", { enumerable: true, get: function () { return WorkoutCardV2_1.WorkoutCardV2; } });
var WorkoutCardV3_1 = require("./WorkoutCardV3");
Object.defineProperty(exports, "WorkoutCardV3", { enumerable: true, get: function () { return WorkoutCardV3_1.WorkoutCardV3; } });
var HabitRow_1 = require("./HabitRow");
Object.defineProperty(exports, "HabitRow", { enumerable: true, get: function () { return HabitRow_1.HabitRow; } });
var HabitRowV2_1 = require("./HabitRowV2");
Object.defineProperty(exports, "HabitRowV2", { enumerable: true, get: function () { return HabitRowV2_1.HabitRowV2; } });
var HabitRowV3_1 = require("./HabitRowV3");
Object.defineProperty(exports, "HabitRowV3", { enumerable: true, get: function () { return HabitRowV3_1.HabitRowV3; } });
var StreakCounter_1 = require("./StreakCounter");
Object.defineProperty(exports, "StreakCounter", { enumerable: true, get: function () { return StreakCounter_1.StreakCounter; } });
var MetricRing_1 = require("./MetricRing");
Object.defineProperty(exports, "MetricRing", { enumerable: true, get: function () { return MetricRing_1.MetricRing; } });
var MealCard_1 = require("./MealCard");
Object.defineProperty(exports, "MealCard", { enumerable: true, get: function () { return MealCard_1.MealCard; } });
var MealCardV2_1 = require("./MealCardV2");
Object.defineProperty(exports, "MealCardV2", { enumerable: true, get: function () { return MealCardV2_1.MealCardV2; } });
var MealCardV3_1 = require("./MealCardV3");
Object.defineProperty(exports, "MealCardV3", { enumerable: true, get: function () { return MealCardV3_1.MealCardV3; } });
var WaterTracker_1 = require("./WaterTracker");
Object.defineProperty(exports, "WaterTracker", { enumerable: true, get: function () { return WaterTracker_1.WaterTracker; } });
var SleepBar_1 = require("./SleepBar");
Object.defineProperty(exports, "SleepBar", { enumerable: true, get: function () { return SleepBar_1.SleepBar; } });
var ActivityRings_1 = require("./ActivityRings");
Object.defineProperty(exports, "ActivityRings", { enumerable: true, get: function () { return ActivityRings_1.ActivityRings; } });
var GoalCard_1 = require("./GoalCard");
Object.defineProperty(exports, "GoalCard", { enumerable: true, get: function () { return GoalCard_1.GoalCard; } });
var GoalCardV2_1 = require("./GoalCardV2");
Object.defineProperty(exports, "GoalCardV2", { enumerable: true, get: function () { return GoalCardV2_1.GoalCardV2; } });
var GoalCardV3_1 = require("./GoalCardV3");
Object.defineProperty(exports, "GoalCardV3", { enumerable: true, get: function () { return GoalCardV3_1.GoalCardV3; } });
var VitalStat_1 = require("./VitalStat");
Object.defineProperty(exports, "VitalStat", { enumerable: true, get: function () { return VitalStat_1.VitalStat; } });
var ExerciseRow_1 = require("./ExerciseRow");
Object.defineProperty(exports, "ExerciseRow", { enumerable: true, get: function () { return ExerciseRow_1.ExerciseRow; } });
var MoodPicker_1 = require("./MoodPicker");
Object.defineProperty(exports, "MoodPicker", { enumerable: true, get: function () { return MoodPicker_1.MoodPicker; } });
var BodyMetricCard_1 = require("./BodyMetricCard");
Object.defineProperty(exports, "BodyMetricCard", { enumerable: true, get: function () { return BodyMetricCard_1.BodyMetricCard; } });
var ActivityRingsV4_1 = require("./ActivityRingsV4");
Object.defineProperty(exports, "ActivityRingsV4", { enumerable: true, get: function () { return ActivityRingsV4_1.ActivityRingsV4; } });
var BodyMetricCardV4_1 = require("./BodyMetricCardV4");
Object.defineProperty(exports, "BodyMetricCardV4", { enumerable: true, get: function () { return BodyMetricCardV4_1.BodyMetricCardV4; } });
var ExerciseRowV4_1 = require("./ExerciseRowV4");
Object.defineProperty(exports, "ExerciseRowV4", { enumerable: true, get: function () { return ExerciseRowV4_1.ExerciseRowV4; } });
var GoalCardV4_1 = require("./GoalCardV4");
Object.defineProperty(exports, "GoalCardV4", { enumerable: true, get: function () { return GoalCardV4_1.GoalCardV4; } });
var HabitRowV4_1 = require("./HabitRowV4");
Object.defineProperty(exports, "HabitRowV4", { enumerable: true, get: function () { return HabitRowV4_1.HabitRowV4; } });
var HealthRangeBarV4_1 = require("./HealthRangeBarV4");
Object.defineProperty(exports, "HealthRangeBarV4", { enumerable: true, get: function () { return HealthRangeBarV4_1.HealthRangeBarV4; } });
var MealCardV4_1 = require("./MealCardV4");
Object.defineProperty(exports, "MealCardV4", { enumerable: true, get: function () { return MealCardV4_1.MealCardV4; } });
var MetricRingV4_1 = require("./MetricRingV4");
Object.defineProperty(exports, "MetricRingV4", { enumerable: true, get: function () { return MetricRingV4_1.MetricRingV4; } });
var MoodPickerV4_1 = require("./MoodPickerV4");
Object.defineProperty(exports, "MoodPickerV4", { enumerable: true, get: function () { return MoodPickerV4_1.MoodPickerV4; } });
var SleepBarV4_1 = require("./SleepBarV4");
Object.defineProperty(exports, "SleepBarV4", { enumerable: true, get: function () { return SleepBarV4_1.SleepBarV4; } });
var SleepStagesV4_1 = require("./SleepStagesV4");
Object.defineProperty(exports, "SleepStagesV4", { enumerable: true, get: function () { return SleepStagesV4_1.SleepStagesV4; } });
var StreakCounterV4_1 = require("./StreakCounterV4");
Object.defineProperty(exports, "StreakCounterV4", { enumerable: true, get: function () { return StreakCounterV4_1.StreakCounterV4; } });
var VitalStatV4_1 = require("./VitalStatV4");
Object.defineProperty(exports, "VitalStatV4", { enumerable: true, get: function () { return VitalStatV4_1.VitalStatV4; } });
var WaterTrackerV4_1 = require("./WaterTrackerV4");
Object.defineProperty(exports, "WaterTrackerV4", { enumerable: true, get: function () { return WaterTrackerV4_1.WaterTrackerV4; } });
var WorkoutCardV4_1 = require("./WorkoutCardV4");
Object.defineProperty(exports, "WorkoutCardV4", { enumerable: true, get: function () { return WorkoutCardV4_1.WorkoutCardV4; } });
/** The health V4 line's arithmetic, shared with the native twin. */
var goal_v4_1 = require("./goal-v4");
Object.defineProperty(exports, "goalParts", { enumerable: true, get: function () { return goal_v4_1.goalParts; } });
Object.defineProperty(exports, "rangeVerdict", { enumerable: true, get: function () { return goal_v4_1.rangeVerdict; } });
Object.defineProperty(exports, "pluralizeUnit", { enumerable: true, get: function () { return goal_v4_1.pluralizeUnit; } });
//# sourceMappingURL=index.js.map