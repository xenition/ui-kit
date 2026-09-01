"use strict";
/**
 * `@xenition/ui/dashboard` — composed web (React DOM) blocks for admin /
 * dashboard / account screens: the stat strips, feeds, settings groups, rows,
 * empty states, and onboarding surfaces that generated screens otherwise
 * hand-roll. Every block is styled exclusively from the compiled `--xen-*`
 * theme tokens via the Tailwind preset — no literal colors — and follows the
 * design.md principles (one dominant action, clear hierarchy, real empty
 * states). The web mirror of `@xenition/ui/native/dashboard`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingChecklistV4 = exports.OnboardingChecklist = exports.QuickActionsV4 = exports.QuickActions = exports.MetricTileV4 = exports.MetricTile = exports.SectionCardV4 = exports.SectionCard = exports.EmptyDashboardV4 = exports.EmptyDashboard = exports.SearchHeaderV4 = exports.SearchHeader = exports.FilterChipsV4 = exports.FilterChips = exports.PageContainerV4 = exports.PageContainer = exports.ListRowV4 = exports.ListRow = exports.SettingsSectionV4 = exports.SettingsSection = exports.SettingsRowV4 = exports.SettingsRow = exports.ProfileHeaderV4 = exports.ProfileHeader = exports.NotificationItemV4 = exports.NotificationItem = exports.ActivityFeedV4 = exports.ActivityFeed = exports.KpiRowV4 = exports.KpiRow = exports.StatCardV4 = exports.StatCard = void 0;
var StatCard_1 = require("./StatCard");
Object.defineProperty(exports, "StatCard", { enumerable: true, get: function () { return StatCard_1.StatCard; } });
var StatCardV4_1 = require("./StatCardV4");
Object.defineProperty(exports, "StatCardV4", { enumerable: true, get: function () { return StatCardV4_1.StatCardV4; } });
var KpiRow_1 = require("./KpiRow");
Object.defineProperty(exports, "KpiRow", { enumerable: true, get: function () { return KpiRow_1.KpiRow; } });
var KpiRowV4_1 = require("./KpiRowV4");
Object.defineProperty(exports, "KpiRowV4", { enumerable: true, get: function () { return KpiRowV4_1.KpiRowV4; } });
var ActivityFeed_1 = require("./ActivityFeed");
Object.defineProperty(exports, "ActivityFeed", { enumerable: true, get: function () { return ActivityFeed_1.ActivityFeed; } });
var ActivityFeedV4_1 = require("./ActivityFeedV4");
Object.defineProperty(exports, "ActivityFeedV4", { enumerable: true, get: function () { return ActivityFeedV4_1.ActivityFeedV4; } });
var NotificationItem_1 = require("./NotificationItem");
Object.defineProperty(exports, "NotificationItem", { enumerable: true, get: function () { return NotificationItem_1.NotificationItem; } });
var NotificationItemV4_1 = require("./NotificationItemV4");
Object.defineProperty(exports, "NotificationItemV4", { enumerable: true, get: function () { return NotificationItemV4_1.NotificationItemV4; } });
var ProfileHeader_1 = require("./ProfileHeader");
Object.defineProperty(exports, "ProfileHeader", { enumerable: true, get: function () { return ProfileHeader_1.ProfileHeader; } });
var ProfileHeaderV4_1 = require("./ProfileHeaderV4");
Object.defineProperty(exports, "ProfileHeaderV4", { enumerable: true, get: function () { return ProfileHeaderV4_1.ProfileHeaderV4; } });
var SettingsRow_1 = require("./SettingsRow");
Object.defineProperty(exports, "SettingsRow", { enumerable: true, get: function () { return SettingsRow_1.SettingsRow; } });
var SettingsRowV4_1 = require("./SettingsRowV4");
Object.defineProperty(exports, "SettingsRowV4", { enumerable: true, get: function () { return SettingsRowV4_1.SettingsRowV4; } });
var SettingsSection_1 = require("./SettingsSection");
Object.defineProperty(exports, "SettingsSection", { enumerable: true, get: function () { return SettingsSection_1.SettingsSection; } });
var SettingsSectionV4_1 = require("./SettingsSectionV4");
Object.defineProperty(exports, "SettingsSectionV4", { enumerable: true, get: function () { return SettingsSectionV4_1.SettingsSectionV4; } });
var ListRow_1 = require("./ListRow");
Object.defineProperty(exports, "ListRow", { enumerable: true, get: function () { return ListRow_1.ListRow; } });
var ListRowV4_1 = require("./ListRowV4");
Object.defineProperty(exports, "ListRowV4", { enumerable: true, get: function () { return ListRowV4_1.ListRowV4; } });
var PageContainer_1 = require("./PageContainer");
Object.defineProperty(exports, "PageContainer", { enumerable: true, get: function () { return PageContainer_1.PageContainer; } });
var PageContainerV4_1 = require("./PageContainerV4");
Object.defineProperty(exports, "PageContainerV4", { enumerable: true, get: function () { return PageContainerV4_1.PageContainerV4; } });
var FilterChips_1 = require("./FilterChips");
Object.defineProperty(exports, "FilterChips", { enumerable: true, get: function () { return FilterChips_1.FilterChips; } });
var FilterChipsV4_1 = require("./FilterChipsV4");
Object.defineProperty(exports, "FilterChipsV4", { enumerable: true, get: function () { return FilterChipsV4_1.FilterChipsV4; } });
var SearchHeader_1 = require("./SearchHeader");
Object.defineProperty(exports, "SearchHeader", { enumerable: true, get: function () { return SearchHeader_1.SearchHeader; } });
var SearchHeaderV4_1 = require("./SearchHeaderV4");
Object.defineProperty(exports, "SearchHeaderV4", { enumerable: true, get: function () { return SearchHeaderV4_1.SearchHeaderV4; } });
var EmptyDashboard_1 = require("./EmptyDashboard");
Object.defineProperty(exports, "EmptyDashboard", { enumerable: true, get: function () { return EmptyDashboard_1.EmptyDashboard; } });
var EmptyDashboardV4_1 = require("./EmptyDashboardV4");
Object.defineProperty(exports, "EmptyDashboardV4", { enumerable: true, get: function () { return EmptyDashboardV4_1.EmptyDashboardV4; } });
var SectionCard_1 = require("./SectionCard");
Object.defineProperty(exports, "SectionCard", { enumerable: true, get: function () { return SectionCard_1.SectionCard; } });
var SectionCardV4_1 = require("./SectionCardV4");
Object.defineProperty(exports, "SectionCardV4", { enumerable: true, get: function () { return SectionCardV4_1.SectionCardV4; } });
var MetricTile_1 = require("./MetricTile");
Object.defineProperty(exports, "MetricTile", { enumerable: true, get: function () { return MetricTile_1.MetricTile; } });
var MetricTileV4_1 = require("./MetricTileV4");
Object.defineProperty(exports, "MetricTileV4", { enumerable: true, get: function () { return MetricTileV4_1.MetricTileV4; } });
var QuickActions_1 = require("./QuickActions");
Object.defineProperty(exports, "QuickActions", { enumerable: true, get: function () { return QuickActions_1.QuickActions; } });
var QuickActionsV4_1 = require("./QuickActionsV4");
Object.defineProperty(exports, "QuickActionsV4", { enumerable: true, get: function () { return QuickActionsV4_1.QuickActionsV4; } });
var OnboardingChecklist_1 = require("./OnboardingChecklist");
Object.defineProperty(exports, "OnboardingChecklist", { enumerable: true, get: function () { return OnboardingChecklist_1.OnboardingChecklist; } });
var OnboardingChecklistV4_1 = require("./OnboardingChecklistV4");
Object.defineProperty(exports, "OnboardingChecklistV4", { enumerable: true, get: function () { return OnboardingChecklistV4_1.OnboardingChecklistV4; } });
//# sourceMappingURL=index.js.map