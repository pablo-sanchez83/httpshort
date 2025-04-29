import React, { useState } from 'react'
import { createShortUrl } from '../lib/services/urlService'
import { getRemainingUses } from '../lib/services/cookieService'

const Home: React.FC = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const remainingUses = getRemainingUses()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await createShortUrl(url)
      setShortUrl(result)
      setUrl('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la URL corta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <p className="description">Acorta tus URLs de forma rápida y sencilla</p>

      <div className="info-card">
        <p>Información importante:</p>
        <ul>
          <li>Las URLs acortadas expiran después de 24 horas</li>
          <li>Límite de {remainingUses} usos restantes hoy</li>
          <li>Las URLs deben comenzar con http:// o https://</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Ingresa tu URL (ej: https://ejemplo.com)"
            required
          />
          {error && <p className="error-message">{error}</p>}
          {shortUrl && <p className="success-message">¡URL acortada con éxito!</p>}
        </div>
        
        <button type="submit" disabled={loading || remainingUses === 0}>
          {loading ? 'Acortando...' : 'Acortar'}
        </button>
      </form>

      {shortUrl && (
        <div className="short-url-container">
          <p className="short-url">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          <button className="copy-button" onClick={() => navigator.clipboard.writeText(shortUrl)}>
            Copiar URL
          </button>
        </div>
      )}
    </div>
  )
}

export default Home 