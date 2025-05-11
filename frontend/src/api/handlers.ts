import { rest } from 'msw'

// Function to check if the real API is available
const isRealApiAvailable = async () => {
  try {
    // Use a relative URL to check if the backend API is available
    const response = await fetch('/api/health')
    return response.ok
  } catch (error) {
    console.log('API availability check failed:', error)
    return false
  }
}

// Only use mocks if the real API is not available
export const handlers = [
  rest.post('/api/subscribe', async (req, res, ctx) => {
    if (await isRealApiAvailable()) {
      // Let the real API handle it
      return
    }
    return res(ctx.json({ userId: 1, status: 'waitlist' }))
  }),
  
  rest.post('/api/invoice/:userId', async (req, res, ctx) => {
    if (await isRealApiAvailable()) {
      // Let the real API handle it
      return
    }
    return res(
      ctx.json({
        solana_url: 'solana:Abc...?amount=10&reference=XYZ',
        qr_svg: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTAgMTUwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTEwLDEwSDYwVjYwSDEwVjEwek05MCwxMEgxNDBWNjBIOTBWMTB6TTEwLDkwSDYwVjE0MEgxMFY5MHptMjAsLTYwaDEwdjEwSDMwVjMwem0yMCwyMEgzMFYzMGgxMFY0MHpNNDAsMzBINTB2MTBINDBWMzB6TTMwLDQwSDIwVjUwSDMwVjQwem0yMCwwSDQwVjUwSDUwVjQwek05MCwzMGgxMHYxMEg5MFYzMHptMjAsMEgxMDB2MTBoMTBWMzB6TTEyMCwzMEgxMTB2MTBoMTBWNDB6TTExMCw0MEgxMDBWNTBoMTBWNDB6TTEyMCw0MGgtMTBWNTBoMTBWNDB6TTMwLDEwMGgxMHYxMEgzMFYxMDB6TTUwLDEwMGgtMTB2MTBoMTBWMTAwek00MCw5MGgxMHYxMEg0MFY5MHoiIG9wYWNpdHk9IjAuOSIvPjwvc3ZnPg=='
      }),
    )
  }),
  
  rest.get('/api/status/:userId', async (req, res, ctx) => {
    if (await isRealApiAvailable()) {
      // Let the real API handle it
      return
    }
    return res(ctx.json({ status: 'paid' }))
  }),
]