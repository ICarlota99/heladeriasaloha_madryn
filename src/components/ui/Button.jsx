const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border-2 border-brand bg-white text-brand hover:bg-peach-light',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-base font-bold no-underline transition duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100';

export function buttonClass(variant = 'primary', className = '') {
  return `${base} ${variants[variant] ?? variants.primary} ${className}`.trim();
}

export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}
