import * as React from 'react';
import { cn } from './cn';
import { Card } from './Card';

export interface AuthCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** Centered card shell for auth screens (LoginForm/SignupForm/…). Bound to the theme tokens. */
export function AuthCard({ title, subtitle, children, footer, className }: AuthCardProps): React.ReactElement {
  return (
    <div className={cn('mx-auto w-full max-w-sm', className)}>
      <Card className="p-6">
        {(title != null || subtitle != null) && (
          <div className="mb-4">
            {title != null && <h1 className="text-xl font-bold text-on-surface">{title}</h1>}
            {subtitle != null && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          </div>
        )}
        {children}
        {footer != null && <div className="mt-4 text-center text-sm text-muted">{footer}</div>}
      </Card>
    </div>
  );
}
