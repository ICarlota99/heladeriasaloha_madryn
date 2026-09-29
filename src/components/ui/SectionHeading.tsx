interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'ink' | 'light';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  tone = 'ink',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const subtitleColor = tone === 'light' ? 'text-white/90' : 'text-ink/75';

  return (
    <div className={`${alignClass} ${className}`}>
      <h2 className={`font-display text-4xl leading-tight md:text-5xl ${titleColor}`}>{title}</h2>
      {subtitle ? <p className={`mt-2 text-lg ${subtitleColor}`}>{subtitle}</p> : null}
    </div>
  );
}
