'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown, Send, Upload, Menu, Star, Save, Trash } from 'lucide-react'

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  const index = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (index.current < text.length) {
        setDisplayText((prev) => prev + text.charAt(index.current))
        index.current += 1
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [text])

  return (
    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      {displayText}
    </h2>
  )
}

export function ChatPageComponent() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you with your coding project today?' },
  ])
  const [input, setInput] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [savedChats, setSavedChats] = useState<{ id: number; title: string }[]>([])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${input}` }])
      }, 1000)
    }
  }

  const handleSaveChat = () => {
    const newSavedChat = {
      id: Date.now(),
      title: `Chat ${savedChats.length + 1}`,
    }
    setSavedChats([...savedChats, newSavedChat])
  }

  const handleDeleteChat = (id: number) => {
    setSavedChats(savedChats.filter(chat => chat.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-300 font-sans">
      {/* Sidebar */}
      <div className={`w-64 bg-gray-800 border-r border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <Button className="w-full justify-between bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveChat}>
            New Chat <ChevronDown size={16} />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {savedChats.map(chat => (
              <div key={chat.id} className="flex items-center justify-between mb-2">
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:bg-gray-700">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  {chat.title}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteChat(chat.id)}>
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4 text-gray-300">
            <Menu size={24} />
          </Button>
          <TypewriterEffect text="Hello! Start Developing With Prompt-Flow" />
        </header>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 border border-gray-700 text-gray-300'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4 bg-gray-800">
          <div className="flex items-center">
            <Button variant="outline" className="mr-2 text-gray-400">
              <Upload size={16} />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 mr-2 border-gray-600 bg-gray-700 text-gray-300"
              rows={1}
            />
            <Button onClick={handleSend} className="bg-blue-600 text-white hover:bg-blue-700">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
