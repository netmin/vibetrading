import { useState, useEffect } from 'react'

interface InvoiceData {
  solana_url: string
  qr_svg: string
}

export const useInvoice = (userId: number | null) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInvoice = async () => {
    if (!userId) return

    setLoading(true)
    setError(null)

    try {
      const API_ROOT = import.meta.env.VITE_API ?? ''
      const response = await fetch(`${API_ROOT}/api/invoice/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch invoice')
      }

      const data = await response.json()
      setInvoiceData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchInvoice()
    }
  }, [userId])

  return { invoiceData, loading, error, refetch: fetchInvoice }
}