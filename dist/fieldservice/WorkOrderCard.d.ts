import * as React from 'react';
/** Work-order lifecycle — conveyed by text + glyph + color (never color-alone). */
export type WorkOrderStatus = 'open' | 'in-progress' | 'on-hold' | 'done' | 'cancelled';
/** Job urgency — drives the priority pill. */
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'emergency';
export interface WorkOrderCardProps {
    /** Work-order reference (e.g. "WO-10482"). */
    workOrderNumber: string;
    /** Short task title (e.g. "Replace HVAC compressor"). */
    title: string;
    /** Lifecycle status — text + glyph + color. */
    status: WorkOrderStatus;
    /** Urgency; when set, renders a priority pill. */
    priority?: WorkOrderPriority;
    /** Assigned technician / crew name shown as a meta line. */
    assignee?: string;
    /** Job-site / customer name shown as a meta line. */
    site?: string;
    /** Localized scheduled date/time string (already formatted by the caller). */
    scheduledFor?: string;
    /** Trade / category glyph shown in the leading disc (emoji or symbol). */
    glyph?: string;
    /** Show a skeleton placeholder instead of data. */
    loading?: boolean;
    /** Fires on card click; the card is only a button when supplied. */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A summary card for a single field-service work order. A tinted leading trade
 * glyph disc, a title/number stack, a status pill (text + glyph + a color that
 * traces to a semantic token — never color alone), an optional priority pill,
 * and assignee / site / schedule meta. Becomes a `role="button"` surface
 * (click / Enter / Space) only when `onClick` is supplied. Renders a `Skeleton`
 * while `loading`. Every color traces to a `--xen-*` token — no literals.
 */
export declare const WorkOrderCard: React.ForwardRefExoticComponent<WorkOrderCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkOrderCard.d.ts.map