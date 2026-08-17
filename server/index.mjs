import http from 'node:http'

const PORT = 3001

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    try {
      let body = ''

      for await (const chunk of req) {
        body += chunk
      }

      const { message } = JSON.parse(body)

      if (typeof message !== 'string' || !message.trim()) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        })

        res.end(JSON.stringify({ error: 'Message is required' }))
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...corsHeaders,
      })

      const response =
        `I received your message: "${message}". ` +
        'This response is streamed from the local Node.js backend using Server-Sent Events.'

      const words = response.split(' ')

      for (const word of words) {
        if (res.destroyed) {
          return
        }

        res.write(
          `data: ${JSON.stringify({
            type: 'chunk',
            content: `${word} `,
          })}\n\n`,
        )

        await sleep(120)
      }

      res.write(
        `data: ${JSON.stringify({
          type: 'done',
        })}\n\n`,
      )

      res.end()
    } catch (error) {
      console.error('Chat API error:', error)

      if (!res.headersSent) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        })
      }

      res.end()
    }

    return
  }

  res.writeHead(404, corsHeaders)
  res.end('Not found')
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running on http://127.0.0.1:${PORT}`)
})