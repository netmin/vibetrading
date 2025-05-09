// API client for making requests to the backend

// Types
export interface SubscribeRequest {
  email: string
}

export interface SubscribeResponse {
  userId: number
  status: string
}

export interface InvoiceResponse {
  solana_url: string
  qr_svg: string
}

export interface StatusResponse {
  status: string
}

// API client
class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API ?? ''
  }

  // Subscribe to the waitlist
  async subscribe(email: string): Promise<SubscribeResponse> {
    const response = await fetch(`${this.baseUrl}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe')
    }

    return response.json()
  }

  // Get invoice for payment
  async getInvoice(userId: number): Promise<InvoiceResponse> {
    const response = await fetch(`${this.baseUrl}/api/invoice/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get invoice')
    }

    return response.json()
  }

  // Check payment status
  async checkStatus(userId: number): Promise<StatusResponse> {
    const response = await fetch(`${this.baseUrl}/api/status/${userId}`)

    if (!response.ok) {
      throw new Error('Failed to check status')
    }

    return response.json()
  }
}

// Export a singleton instance
export const api = new ApiClient()