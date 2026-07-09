/**
 * Prop shapes mirror the booking module: a bookable **resource** has a name, a
 * timezone, and a slot length; a **slot** is an instant range with remaining
 * capacity. Instants are ISO-8601 strings (the component never fetches — the
 * app passes already-shaped data).
 */

export interface BookingResource {
  /** Display name (staff member, room, table, …). */
  name: string;
  /** IANA timezone the resource's availability is expressed in. */
  timezone?: string;
  /** Length of one slot in minutes. */
  slotMinutes?: number;
}

export interface BookingSlot {
  /** ISO-8601 start instant. */
  startsAt: string;
  /** ISO-8601 end instant. */
  endsAt: string;
  /** Remaining capacity; `0` means the slot is full. */
  spotsLeft: number;
}
