import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { streamChat } from '../services/chat'
import type { ChatMessage } from '../types/chat'

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome-message',
    role: 'assistant',
    content:
      'Hi! I can help you analyze product activity, explain metrics, and explore recent AI usage.',
  },
]

export function AssistantPage() {
  const [messages, setMessages] =
    useState<ChatMessage[]>(initialMessages)

  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const trimmedInput = input.trim()

    if (!trimmedInput || isGenerating) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedInput,
    }

    const assistantMessageId = crypto.randomUUID()

    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ])

    setInput('')
    setError(null)
    setIsGenerating(true)

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      await streamChat({
        message: trimmedInput,
        signal: controller.signal,

        onChunk: (chunk) => {
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    content: message.content + chunk,
                  }
                : message,
            ),
          )
        },
      })
    } catch (requestError) {
      if (
        requestError instanceof DOMException &&
        requestError.name === 'AbortError'
      ) {
        return
      }

      setError(
        'Unable to generate a response. Please try again.',
      )

      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) =>
            message.id !== assistantMessageId ||
            message.content.length > 0,
        ),
      )
    } finally {
      setIsGenerating(false)
      abortControllerRef.current = null
    }
  }

  const handleStop = () => {
    abortControllerRef.current?.abort()
  }

  return (
    <main className="dashboard">
      <section className="dashboard__intro">
        <p className="section-label">AI Assistant</p>
        <h2>AI conversation</h2>
        <p>
          Ask questions about product activity and receive streamed
          AI responses.
        </p>
      </section>

      <section className="chat">
        <div className="chat__messages" aria-live="polite">
          {messages.map((message) => (
            <article
              className={`message message--${message.role}`}
              key={message.id}
            >
              <div className="message__meta">
                {message.role === 'user' ? 'You' : 'Nexa AI'}
              </div>

              <div className="message__bubble">
                {message.content ||
                  (isGenerating ? 'Connecting...' : '')}
              </div>
            </article>
          ))}
        </div>

        <form className="chat__composer" onSubmit={handleSubmit}>
          {error && (
            <div className="chat__error" role="alert">
              {error}
            </div>
          )}

          <textarea
            aria-label="Message"
            placeholder="Ask something about your AI product..."
            rows={3}
            value={input}
            disabled={isGenerating}
            onChange={(event) => setInput(event.target.value)}
          />

          <div className="chat__composer-footer">
            <span>
              Responses are streamed from the local API using SSE.
            </span>

            {isGenerating ? (
              <button
                className="button button--secondary"
                type="button"
                onClick={handleStop}
              >
                Stop generating
              </button>
            ) : (
              <button
                className="button button--primary"
                disabled={!input.trim()}
                type="submit"
              >
                Send
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  )
}