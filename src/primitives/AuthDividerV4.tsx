import * as React from 'react';
import { cn } from './cn';
import { TextV4 } from './TextV4';
import type { AuthDividerProps } from './AuthCard';

/** Where the label sits on the rule. */
export type AuthDividerV4Align = 'start' | 'center' | 'end';

export interface AuthDividerV4Props extends AuthDividerProps {
  /**
   * Where the label sits. Default `'center'` — §9 asks for the label *on* the
   * rule, and centred is the only reading of that a user recognises as "or
   * continue with". `'start'`/`'end'` drop the rule on that side entirely
   * rather than drawing a stub nobody can see.
   */
  align?: AuthDividerV4Align;
  /**
   * **The thing the divider introduces** — normally the provider row.
   *
   * This is the §9 empty-provider rule made structural. Passing the row here
   * means the divider and the row live or die together:
   *
   * ```tsx
   * <AuthDividerV4 label="or continue with">
   *   {providers.map((p) => <AuthProviderButtonV4 key={p.id} {...p} />)}
   * </AuthDividerV4>
   * ```
   *
   * With `providers={[]}` the map yields `[]`, the whole component renders
   * `null`, and the screen shows no orphaned rule. The base pushed that
   * decision onto every caller and every caller was one `&&` away from the
   * bug the spec calls out.
   *
   * Omitting the prop entirely keeps the base's behaviour: a bare divider that
   * always draws.
   */
  children?: React.ReactNode;
}

/**
 * Is this node nothing a user could see?
 *
 * `[]`, `null`, `undefined`, `false`, whitespace and a fragment of those all
 * count — `providers.map(…)` over an empty list produces the first of them,
 * and a caller who wrote `{providers.length > 0 && row}` produces the third.
 */
function isEmptyNode(node: React.ReactNode): boolean {
  if (node === null || node === undefined || typeof node === 'boolean') return true;
  if (Array.isArray(node)) return node.every(isEmptyNode);
  if (typeof node === 'string') return node.trim() === '';
  if (React.isValidElement(node) && node.type === React.Fragment) {
    return isEmptyNode((node.props as { children?: React.ReactNode }).children);
  }
  return false;
}

/**
 * A single hairline. `1` physical pixel is the one bare number §10.1 names
 * outright, and `flex-1` is a flex factor, which is geometry rather than a
 * spacing decision.
 */
function Rule(): React.ReactElement {
  return <span aria-hidden className="h-px flex-1 bg-border" />;
}

/**
 * **V4 auth divider** — the "or continue with" separator of `ONBOARDING-DESIGN-SPEC.md`
 * §9, in the V4 design line. Web twin of the native `AuthDividerV4`.
 *
 * Two things separate it from {@link AuthDivider}.
 *
 * **1. The rule is drawn either side of the label, not underneath it.** The
 * base runs one absolutely-positioned rule the full width and knocks a
 * `surface`-coloured patch out of it behind the label. That only works when
 * the divider is actually sitting on `surface` — and §1 explicitly allows an
 * auth screen to take a warmer ground (`ramps.neutral[50]`, `primary[50]`), at
 * which point the patch becomes a visible white smear across the hairline.
 * Here the rule is two flex segments with the label between them, so it is
 * ground-independent by construction and there is nothing to knock out.
 *
 * **2. It owns the empty state.** See {@link AuthDividerV4Props.children} —
 * handing the provider row to the divider is what makes `providers={[]}`
 * render nothing at all instead of a rule introducing a void.
 *
 * The hairline stays a hairline: `h-px` and `bg-border`, never a `2px` rule or
 * a `neutral` step used as a line. The label steps up from the base's `xs` to
 * `sm` — this line is a consumer mobile surface, and `xs` on a phone is below
 * the size at which incidental copy is comfortably read.
 */
export function AuthDividerV4({
  label,
  align = 'center',
  className,
  children,
  ...rest
}: AuthDividerV4Props): React.ReactElement | null {
  // `undefined` means "no slot given" — the base's always-draw behaviour.
  // Anything else means the caller handed us their content, so its emptiness
  // is ours to answer for (§9, §10.6).
  const slotted = children !== undefined;
  if (slotted && isEmptyNode(children)) return null;

  return (
    <div className={cn('flex w-full flex-col gap-md', className)} {...rest}>
      <div className="flex w-full items-center gap-md">
        {label ? (
          <>
            {align === 'start' ? null : <Rule />}
            <TextV4 size="sm" tone="muted">
              {label}
            </TextV4>
            {align === 'end' ? null : <Rule />}
          </>
        ) : (
          // No label is not two half-rules with a gap where the words would
          // have been — it is one unbroken hairline. §10.6: the empty state has
          // to look composed, not like something failed to load.
          <Rule />
        )}
      </div>
      {slotted ? <div className="flex flex-col gap-sm">{children}</div> : null}
    </div>
  );
}
