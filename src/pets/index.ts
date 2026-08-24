/**
 * `@xenition/ui/pets` — token-bound React DOM components for pet-care and
 * veterinary apps. The web parity of `@xenition/ui/native/pets`: same component
 * and prop names (`onPress` → `onClick`), styled exclusively via the `--xen-*`
 * theme tokens (no literal colors), composing the shared web `../primitives`
 * (Avatar/Badge/Button) and `../charts` (ProgressRing/Sparkline) plus the shared
 * `../commerce` EmptyState.
 */

export { PetProfileCard } from './PetProfileCard';
export type { PetProfileCardProps, PetSpecies, PetSex } from './PetProfileCard';

export { VaccineRecord } from './VaccineRecord';
export type { VaccineRecordProps, VaccineStatus } from './VaccineRecord';

export { VetAppointmentCard } from './VetAppointmentCard';
export type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

export { BreedCard } from './BreedCard';
export type { BreedCardProps, BreedSize, BreedEnergy } from './BreedCard';

export { PetHealthLog } from './PetHealthLog';
export type { PetHealthLogProps, HealthLogEntry, HealthLogKind } from './PetHealthLog';

export { FeedingSchedule } from './FeedingSchedule';
export type { FeedingScheduleProps, FeedingMeal, MealType } from './FeedingSchedule';

export { GroomingCard } from './GroomingCard';
export type { GroomingCardProps, GroomingService, GroomingStatus } from './GroomingCard';

export { AdoptionCard } from './AdoptionCard';
export type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

export { PetActivityRing } from './PetActivityRing';
export type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

export { MedicationReminder } from './MedicationReminder';
export type { MedicationReminderProps, MedicationForm, MedicationState } from './MedicationReminder';

export { WeightTracker } from './WeightTracker';
export type { WeightTrackerProps, WeightStatus } from './WeightTracker';

export { LostPetAlert } from './LostPetAlert';
export type { LostPetAlertProps, LostPetStatus } from './LostPetAlert';
