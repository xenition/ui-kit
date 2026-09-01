"use strict";
/**
 * `@xenition/ui/pets` — token-bound React DOM components for pet-care and
 * veterinary apps. The web parity of `@xenition/ui/native/pets`: same component
 * and prop names (`onPress` → `onClick`), styled exclusively via the `--xen-*`
 * theme tokens (no literal colors), composing the shared web `../primitives`
 * (Avatar/Badge/Button) and `../charts` (ProgressRing/Sparkline) plus the shared
 * `../commerce` EmptyState.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightTrackerV4 = exports.VetAppointmentCardV4 = exports.VaccineRecordV4 = exports.PetProfileCardV4 = exports.PetHealthLogV4 = exports.PetActivityRingV4 = exports.MedicationReminderV4 = exports.LostPetAlertV4 = exports.GroomingCardV4 = exports.FeedingScheduleV4 = exports.BreedCardV4 = exports.AdoptionCardV4 = exports.LostPetAlert = exports.WeightTracker = exports.MedicationReminder = exports.PetActivityRingV3 = exports.PetActivityRingV2 = exports.PetActivityRing = exports.AdoptionCardV3 = exports.AdoptionCardV2 = exports.AdoptionCard = exports.GroomingCard = exports.FeedingSchedule = exports.PetHealthLog = exports.BreedCard = exports.VetAppointmentCardV3 = exports.VetAppointmentCardV2 = exports.VetAppointmentCard = exports.VaccineRecord = exports.PetProfileCardV3 = exports.PetProfileCardV2 = exports.PetProfileCard = void 0;
var PetProfileCard_1 = require("./PetProfileCard");
Object.defineProperty(exports, "PetProfileCard", { enumerable: true, get: function () { return PetProfileCard_1.PetProfileCard; } });
var PetProfileCardV2_1 = require("./PetProfileCardV2");
Object.defineProperty(exports, "PetProfileCardV2", { enumerable: true, get: function () { return PetProfileCardV2_1.PetProfileCardV2; } });
var PetProfileCardV3_1 = require("./PetProfileCardV3");
Object.defineProperty(exports, "PetProfileCardV3", { enumerable: true, get: function () { return PetProfileCardV3_1.PetProfileCardV3; } });
var VaccineRecord_1 = require("./VaccineRecord");
Object.defineProperty(exports, "VaccineRecord", { enumerable: true, get: function () { return VaccineRecord_1.VaccineRecord; } });
var VetAppointmentCard_1 = require("./VetAppointmentCard");
Object.defineProperty(exports, "VetAppointmentCard", { enumerable: true, get: function () { return VetAppointmentCard_1.VetAppointmentCard; } });
var VetAppointmentCardV2_1 = require("./VetAppointmentCardV2");
Object.defineProperty(exports, "VetAppointmentCardV2", { enumerable: true, get: function () { return VetAppointmentCardV2_1.VetAppointmentCardV2; } });
var VetAppointmentCardV3_1 = require("./VetAppointmentCardV3");
Object.defineProperty(exports, "VetAppointmentCardV3", { enumerable: true, get: function () { return VetAppointmentCardV3_1.VetAppointmentCardV3; } });
var BreedCard_1 = require("./BreedCard");
Object.defineProperty(exports, "BreedCard", { enumerable: true, get: function () { return BreedCard_1.BreedCard; } });
var PetHealthLog_1 = require("./PetHealthLog");
Object.defineProperty(exports, "PetHealthLog", { enumerable: true, get: function () { return PetHealthLog_1.PetHealthLog; } });
var FeedingSchedule_1 = require("./FeedingSchedule");
Object.defineProperty(exports, "FeedingSchedule", { enumerable: true, get: function () { return FeedingSchedule_1.FeedingSchedule; } });
var GroomingCard_1 = require("./GroomingCard");
Object.defineProperty(exports, "GroomingCard", { enumerable: true, get: function () { return GroomingCard_1.GroomingCard; } });
var AdoptionCard_1 = require("./AdoptionCard");
Object.defineProperty(exports, "AdoptionCard", { enumerable: true, get: function () { return AdoptionCard_1.AdoptionCard; } });
var AdoptionCardV2_1 = require("./AdoptionCardV2");
Object.defineProperty(exports, "AdoptionCardV2", { enumerable: true, get: function () { return AdoptionCardV2_1.AdoptionCardV2; } });
var AdoptionCardV3_1 = require("./AdoptionCardV3");
Object.defineProperty(exports, "AdoptionCardV3", { enumerable: true, get: function () { return AdoptionCardV3_1.AdoptionCardV3; } });
var PetActivityRing_1 = require("./PetActivityRing");
Object.defineProperty(exports, "PetActivityRing", { enumerable: true, get: function () { return PetActivityRing_1.PetActivityRing; } });
var PetActivityRingV2_1 = require("./PetActivityRingV2");
Object.defineProperty(exports, "PetActivityRingV2", { enumerable: true, get: function () { return PetActivityRingV2_1.PetActivityRingV2; } });
var PetActivityRingV3_1 = require("./PetActivityRingV3");
Object.defineProperty(exports, "PetActivityRingV3", { enumerable: true, get: function () { return PetActivityRingV3_1.PetActivityRingV3; } });
var MedicationReminder_1 = require("./MedicationReminder");
Object.defineProperty(exports, "MedicationReminder", { enumerable: true, get: function () { return MedicationReminder_1.MedicationReminder; } });
var WeightTracker_1 = require("./WeightTracker");
Object.defineProperty(exports, "WeightTracker", { enumerable: true, get: function () { return WeightTracker_1.WeightTracker; } });
var LostPetAlert_1 = require("./LostPetAlert");
Object.defineProperty(exports, "LostPetAlert", { enumerable: true, get: function () { return LostPetAlert_1.LostPetAlert; } });
/*
 * ── V4 "companion" (warm, friendly pet-care) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated rounded cards,
 * rings, and rows with soft-primary glyph wells and meta chips, status/kind by
 * glyph + labelled badge (never color alone). The brand gradient is reserved for
 * the companion moment — the `PetProfileCard` profile hero. Each V4 keeps its
 * base props (all variant/status values honored). Base/V2/V3 untouched; V4 is
 * additive. Token-driven, dark-mode safe, web + native.
 */
var AdoptionCardV4_1 = require("./AdoptionCardV4");
Object.defineProperty(exports, "AdoptionCardV4", { enumerable: true, get: function () { return AdoptionCardV4_1.AdoptionCardV4; } });
var BreedCardV4_1 = require("./BreedCardV4");
Object.defineProperty(exports, "BreedCardV4", { enumerable: true, get: function () { return BreedCardV4_1.BreedCardV4; } });
var FeedingScheduleV4_1 = require("./FeedingScheduleV4");
Object.defineProperty(exports, "FeedingScheduleV4", { enumerable: true, get: function () { return FeedingScheduleV4_1.FeedingScheduleV4; } });
var GroomingCardV4_1 = require("./GroomingCardV4");
Object.defineProperty(exports, "GroomingCardV4", { enumerable: true, get: function () { return GroomingCardV4_1.GroomingCardV4; } });
var LostPetAlertV4_1 = require("./LostPetAlertV4");
Object.defineProperty(exports, "LostPetAlertV4", { enumerable: true, get: function () { return LostPetAlertV4_1.LostPetAlertV4; } });
var MedicationReminderV4_1 = require("./MedicationReminderV4");
Object.defineProperty(exports, "MedicationReminderV4", { enumerable: true, get: function () { return MedicationReminderV4_1.MedicationReminderV4; } });
var PetActivityRingV4_1 = require("./PetActivityRingV4");
Object.defineProperty(exports, "PetActivityRingV4", { enumerable: true, get: function () { return PetActivityRingV4_1.PetActivityRingV4; } });
var PetHealthLogV4_1 = require("./PetHealthLogV4");
Object.defineProperty(exports, "PetHealthLogV4", { enumerable: true, get: function () { return PetHealthLogV4_1.PetHealthLogV4; } });
var PetProfileCardV4_1 = require("./PetProfileCardV4");
Object.defineProperty(exports, "PetProfileCardV4", { enumerable: true, get: function () { return PetProfileCardV4_1.PetProfileCardV4; } });
var VaccineRecordV4_1 = require("./VaccineRecordV4");
Object.defineProperty(exports, "VaccineRecordV4", { enumerable: true, get: function () { return VaccineRecordV4_1.VaccineRecordV4; } });
var VetAppointmentCardV4_1 = require("./VetAppointmentCardV4");
Object.defineProperty(exports, "VetAppointmentCardV4", { enumerable: true, get: function () { return VetAppointmentCardV4_1.VetAppointmentCardV4; } });
var WeightTrackerV4_1 = require("./WeightTrackerV4");
Object.defineProperty(exports, "WeightTrackerV4", { enumerable: true, get: function () { return WeightTrackerV4_1.WeightTrackerV4; } });
//# sourceMappingURL=index.js.map