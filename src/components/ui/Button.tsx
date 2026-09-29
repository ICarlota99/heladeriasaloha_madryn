import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-sm',
  secondary: 'border-2 border-brand bg-white/95 text-brand hover:bg-peach-light',
  ghost: 'bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25',
};

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-base font-bold no-underline transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none';

export function buttonClass(variant: ButtonVariant = 'primary', className = ''): string {
  return `${base} ${variants[variant] ?? variants.primary} ${className}`.trim();
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}
