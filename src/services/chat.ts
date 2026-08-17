type StreamChatOptions = {
  message: string
  signal?: AbortSignal
  onChunk: (chunk: string) => void
}

type StreamEvent =
  | {
      type: 'chunk'
      content: string
    }
  | {
      type: 'done'
    }

export async function streamChat({
  message,
  signal,
  onChunk,
}: StreamChatOptions) {
  const response = await fetch('http://127.0.0.1:3001/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (!response.body) {
    throw new Error('Streaming response is not available')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()

    if (done) {
      break
    }

    buffer += decoder.decode(value, { stream: true })

    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''

    for (const event of events) {
      const dataLine = event
        .split('\n')
        .find((line) => line.startsWith('data: '))

      if (!dataLine) {
        continue
      }

      const data = JSON.parse(
        dataLine.slice(6),
      ) as StreamEvent

      if (data.type === 'chunk') {
        onChunk(data.content)
      }

      if (data.type === 'done') {
        return
      }
    }
  }
}