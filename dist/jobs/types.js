"use strict";
/**
 * Shared data shapes + variant/state unions for the `@xenition/ui/jobs` module
 * (web / React DOM). Nothing here fetches or holds state — these are the plain
 * records an app passes down, plus the small string unions that drive component
 * variants. Instants are ISO-8601 strings (same convention as the booking
 * module). This is a dep-free port of the native `jobs/types` so the two
 * platforms stay in lockstep.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAGE_LABEL = exports.APPLICATION_STAGES = exports.EMPLOYMENT_TYPES = exports.EMPLOYMENT_LABEL = void 0;
/** Human labels for each employment type. */
exports.EMPLOYMENT_LABEL = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    contract: 'Contract',
    remote: 'Remote',
};
/** The employment types in display order (for filter bars, pickers). */
exports.EMPLOYMENT_TYPES = [
    'full-time',
    'part-time',
    'contract',
    'remote',
];
/** The canonical funnel order, used by {@link ApplicationStage}-driven UI. */
exports.APPLICATION_STAGES = [
    'applied',
    'screening',
    'interview',
    'offer',
    'hired',
];
/** Human labels for each stage (never rely on color alone to convey these). */
exports.STAGE_LABEL = {
    applied: 'Applied',
    screening: 'Screening',
    interview: 'Interview',
    offer: 'Offer',
    hired: 'Hired',
};
//# sourceMappingURL=types.js.map