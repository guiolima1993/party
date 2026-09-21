import { useEffect, useMemo, useState } from 'react'
import UnidadeCard from './components/UnidadeCard.jsx'
import { normalize } from './utils/normalize.js'

export default function App() {
  const [unidades, setUnidades] = useState([])
  const [term, setTerm] = useState('')
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    fetch('/data/unidades.json')
      .then((res) => res.json())
      .then(setUnidades)
      .catch(() => setLoadError(true))
  }, [])

  const results = useMemo(() => {
    const normalizedTerm = normalize(term)
    if (!normalizedTerm) return null
    return unidades.filter((u) => {
      const haystack = normalize(
        [u.unidade, u.rua, u.bairro, u.cidade, u.uf, u.cep, u.endereco_completo].join(' ')
      )
      return haystack.includes(normalizedTerm)
    })
  }, [unidades, term])

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__logo">☕</div>
        <h1 className="hero__title">O CAFÉ VAI VIRAR FESTA!</h1>
        <p className="hero__subtitle">Encontre a unidade participante mais perto de você.</p>

        <form
          className="search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="search__input"
            placeholder="Digite sua cidade ou endereço..."
            autoComplete="off"
            aria-label="Buscar unidade por cidade ou endereço"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className="search__button" aria-label="Buscar">🔍</button>
        </form>
      </header>

      <main className="results">
        {loadError && (
          <p className="results__hint">Não foi possível carregar a lista de unidades.</p>
        )}

        {!loadError && results === null && (
          <p className="results__hint">
            Digite uma cidade, bairro ou endereço para ver as unidades participantes.
          </p>
        )}

        {!loadError && results !== null && results.length === 0 && (
          <p className="results__empty">
            <strong>Nenhuma unidade participante encontrada</strong>
            Não encontramos unidades para "{term}". Tente buscar por outra cidade ou endereço.
          </p>
        )}

        {results !== null && results.length > 0 && (
          <div className="cards">
            {results.map((u) => (
              <UnidadeCard key={u.codigo} unidade={u} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        {results !== null && results.length > 0 && (
          <span>{`${results.length} unidade${results.length > 1 ? 's' : ''} encontrada${results.length > 1 ? 's' : ''}`}</span>
        )}
      </footer>
    </div>
  )
}
