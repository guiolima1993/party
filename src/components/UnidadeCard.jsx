function mapUrl(unidade) {
  const query = encodeURIComponent(unidade.endereco_completo || unidade.rua)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export default function UnidadeCard({ unidade }) {
  const partes = [
    unidade.rua && unidade.numero ? `${unidade.rua}, ${unidade.numero}` : unidade.rua,
    `${unidade.cidade} - ${unidade.uf}`,
  ].filter(Boolean)

  return (
    <a
      className="card"
      href={mapUrl(unidade)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card__unidade">{unidade.unidade || `Unidade ${unidade.codigo}`}</div>
      <div className="card__endereco">{partes.join(' — ')}</div>
      <div className="card__link-hint">📍 Ver no mapa</div>
    </a>
  )
}
