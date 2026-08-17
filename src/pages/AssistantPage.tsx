import { useState } from 'react'
import type { FormEvent } from 'react'
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
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setInput('')
    setIsGenerating(true)

    window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'This is a simulated AI response. SSE streaming will replace this mock response in the next stage.',
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ])

      setIsGenerating(false)
    }, 900)
  }

  return (
    <main className="dashboard">
      <section className="dashboard__intro">
        <p className="section-label">AI Assistant</p>
        <h2>AI conversation</h2>
        <p>
          Ask questions about product activity and receive streamed AI
          responses.
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
                {message.content}
              </div>
            </article>
          ))}

          {isGenerating && (
            <article className="message message--assistant">
              <div className="message__meta">Nexa AI</div>

              <div className="message__bubble message__bubble--loading">
                Generating response...
              </div>
            </article>
          )}
        </div>

        <form className="chat__composer" onSubmit={handleSubmit}>
          <textarea
            aria-label="Message"
            placeholder="Ask something about your AI product..."
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <div className="chat__composer-footer">
            <span>
              Responses are currently simulated locally.
            </span>

            <button
              className="button button--primary"
              disabled={!input.trim() || isGenerating}
              type="submit"
            >
              {isGenerating ? 'Generating...' : 'Send'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}