const linkTones = {
  light: 'text-cream no-underline transition hover:text-white hover:underline',
  dark: 'text-ink underline decoration-brand/40 underline-offset-2 transition hover:text-brand',
};

const GoogleMaps = ({ tone = 'dark' }) => {
  const linkClass = linkTones[tone] ?? linkTones.dark;

  return (
    <p className="leading-relaxed">
      <strong>Horarios:</strong>
      <br />
      De 12 del mediodía a 12 de la noche
      <br />
      <br />
      <strong>Dónde encontrarnos:</strong>
      <br />
      <a className={linkClass} href="https://maps.app.goo.gl/SiwEx7UsUJ7tJw5t5">
        9 de Julio e Hipólito Yrigoyen
      </a>
      <br />
      <a className={linkClass} href="https://maps.app.goo.gl/9N6YKpCPyGiCABo78">
        España y Lombardo
      </a>
    </p>
  );
};

export default GoogleMaps;
