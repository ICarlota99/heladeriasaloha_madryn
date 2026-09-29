import { BUSINESS_HOURS, LOCATIONS } from '@/lib/constants';

const linkTones = {
  light: 'text-cream no-underline transition hover:text-white hover:underline',
  dark: 'text-ink underline decoration-brand/40 underline-offset-2 transition hover:text-brand',
} as const;

interface GoogleMapsProps {
  tone?: keyof typeof linkTones;
}

export default function GoogleMaps({ tone = 'dark' }: GoogleMapsProps) {
  const linkClass = linkTones[tone];

  return (
    <p className="leading-relaxed">
      <strong>Horarios:</strong>
      <br />
      {BUSINESS_HOURS}
      <br />
      <br />
      <strong>Dónde encontrarnos:</strong>
      <br />
      {LOCATIONS.map((location, index) => (
        <span key={location.url}>
          <a className={linkClass} href={location.url} target="_blank" rel="noopener noreferrer">
            {location.label}
          </a>
          {index < LOCATIONS.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}
