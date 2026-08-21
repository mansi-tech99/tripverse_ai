import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional label displayed above the input */
    label?: string;
    /** Optional error message displayed below the input */
    error?: string;
}

/**
 * Reusable Input component compatible with shadcn/ui styling.
 * It forwards refs and spreads all native input attributes.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label className="text-sm font-medium text-muted-foreground" htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-destructive mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
