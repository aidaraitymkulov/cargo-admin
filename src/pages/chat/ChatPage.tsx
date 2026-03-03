import { useState } from 'react'
import { Search, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const mockConversations = [
  { id: '1', name: 'Алмаз Байдилдаев', code: 'AN0042', lastMessage: 'Здравствуйте, когда будет моя посылка?', time: '2 мин', unread: 2 },
  { id: '2', name: 'Нурай Касымова', code: 'AN0221', lastMessage: 'Спасибо за помощь!', time: '15 мин', unread: 0 },
  { id: '3', name: 'Эрлан Жумабеков', code: 'BK0087', lastMessage: 'Можно уточнить по весу?', time: '1 ч', unread: 1 },
  { id: '4', name: 'Бакыт Исмаилов', code: 'BK0015', lastMessage: 'Ок, понял', time: '3 ч', unread: 0 },
  { id: '5', name: 'Айгерим Токтосунова', code: 'AN0108', lastMessage: 'А где можно посмотреть трекинг?', time: '5 ч', unread: 0 },
]

const mockMessages = [
  { id: '1', sender: 'USER', text: 'Здравствуйте!', time: '10:30' },
  { id: '2', sender: 'USER', text: 'Когда будет моя посылка? Трекинг YT123456', time: '10:31' },
  { id: '3', sender: 'MANAGER', text: 'Здравствуйте, Алмаз! Сейчас проверю информацию по вашей посылке.', time: '10:33' },
  { id: '4', sender: 'MANAGER', text: 'Ваша посылка YT123456 сейчас в пути, ожидаемое прибытие — 5 марта.', time: '10:35' },
  { id: '5', sender: 'USER', text: 'Здравствуйте, когда будет моя посылка?', time: '11:02' },
]

export function ChatPage() {
  const [selectedId, setSelectedId] = useState('1')

  return (
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="flex w-80 flex-col border-r border-border bg-background">
        <div className="border-b border-border p-4">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Чат</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                'flex w-full items-start gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors hover:bg-accent/50',
                selectedId === conv.id && 'bg-accent'
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {conv.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate">
                    {conv.name}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="truncate text-xs text-muted-foreground">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <Badge className="ml-2 h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-[10px]">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            АБ
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Алмаз Байдилдаев</p>
            <p className="text-xs text-muted-foreground">AN0042</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-3">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex',
                  msg.sender === 'MANAGER' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-4 py-2.5',
                    msg.sender === 'MANAGER'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={cn(
                      'mt-1 text-[10px]',
                      msg.sender === 'MANAGER'
                        ? 'text-primary-foreground/60'
                        : 'text-muted-foreground'
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Напишите сообщение..."
              className="flex-1"
            />
            <Button size="icon" className="shrink-0">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
