import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOriginalUrl } from '../lib/services/urlService'

const ShortUrlRedirect: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const redirect = async () => {
      if (!shortCode) {
        setError('Código de URL no válido')
        return
      }

      try {
        const originalUrl = await getOriginalUrl(shortCode)
        if (originalUrl) {
          window.location.href = originalUrl
        } else {
          setError('URL no encontrada')
        }
      } catch (err) {
        setError('Error al procesar la URL')
      }
    }

    redirect()
  }, [shortCode])

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Redirigiendo...</h1>
      <p>Por favor espera mientras te redirigimos a la URL original.</p>
    </div>
  )
}

export default ShortUrlRedirect 