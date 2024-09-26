"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, ChevronDown, Menu, Star, Trash, Github, FolderPlus, Cloud } from 'lucide-react'
import { LoaderAnimation } from './loader-animation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const GITHUB_CLIENT_ID = 'Ov23liT7U9majuZ1XYCf'
const REDIRECT_URI = 'http://localhost:3000/chat-page'

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
  const [isLoading, setIsLoading] = useState(false)
  const [isGitHubAuthorized, setIsGitHubAuthorized] = useState(false)
  const [isAwsConnected, setIsAwsConnected] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAwsDialogOpen, setIsAwsDialogOpen] = useState(false)
  const [awsCredentials, setAwsCredentials] = useState({
    accessKey: '',
    secretKey: '',
    instanceId: '',
    region :'',
  })

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      exchangeCodeForToken(code)
    }
  const storedAuthorization = localStorage.getItem('isGitHubAuthorized');
  if (storedAuthorization === 'true') {
    setIsGitHubAuthorized(true);
  }
  }, [])

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('/api/github-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      if (data.access_token) {
        setAccessToken(data.access_token)
        setIsGitHubAuthorized(true)
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error)
    }
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      setIsLoading(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${input}` }])
        setIsLoading(false)
      }, 6000)
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

  const handleConnectToGitHub = () => {
    setIsGitHubAuthorized(true);
    localStorage.setItem('isGitHubAuthorized', 'true');
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo`
    window.location.href = githubAuthUrl
  }

  const handleCreateRepo = async () => {
    if (!accessToken) return

    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'my-new-repo',
          description: 'Repository created from ChatBot',
          private: false,
        }),
      })

      if (response.ok) {
        const repo = await response.json()
        await createFile(repo.full_name, 'README.md', '# My New Repository\n\nThis repository was created using ChatBot.')
        alert('Repository created successfully!')
      } else {
        throw new Error('Failed to create repository')
      }
    } catch (error) {
      console.error('Error creating repository:', error)
      alert('Failed to create repository. Please try again.')
    }
  }

  const createFile = async (repoFullName: string, path: string, content: string) => {
    try {
      await fetch(`https://api.github.com/repos/${repoFullName}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Create README.md',
          content: btoa(content),
        }),
      })
    } catch (error) {
      console.error('Error creating file:', error)
    }
  }

  const handleAwsConnect = () => {
    setIsAwsDialogOpen(true)
  }

  const handleAwsSubmit = () => {
    // Here you would typically validate and store the AWS credentials
    console.log('AWS Credentials:', awsCredentials)
    setIsAwsConnected(true)
    setIsAwsDialogOpen(false)
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

        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4">
              <Menu size={24} />
            </Button>
            <TypewriterEffect text="Hello! Start Developing With Prompt-Flow" />
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={handleConnectToGitHub} 
              className={`${isGitHubAuthorized ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-800 hover:bg-gray-700'} text-white`}
            >
              <Github className="mr-2 h-4 w-4" />
              {isGitHubAuthorized ? 'Connected' : 'Connect to GitHub'}
            </Button>
            {isGitHubAuthorized && (
              <Button onClick={handleCreateRepo} className="bg-blue-500 text-white hover:bg-blue-600">
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Repository
              </Button>
            )}
            <Button 
              onClick={handleAwsConnect} 
              className={`${isAwsConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
            >
              <Cloud className="mr-2 h-4 w-4" />
              {isAwsConnected ? 'Connected' : 'Connect to Cloud'}
            </Button>
          </div>
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
              {message.role === 'user' && index === messages.length - 1 && isLoading && (
                <div className="mt-4 text-left">
                  <LoaderAnimation />
                </div>
              )}
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4 bg-gray-800">
          <div className="flex items-center">

            <Button variant="outline" className="mr-2 text-gray-400">
              <Upload size={16} />
            </Button>
            <Textarea>
            <Input>
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your message here..."

              className="flex-1 mr-2 border-gray-600 bg-gray-700 text-gray-300"
              rows={1}

              className="flex-1 mr-2 border-gray-300"
              style={{ color: 'black' }}
            />
            <Button onClick={handleSend} className="bg-blue-600 text-white hover:bg-blue-700">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* AWS Credentials Dialog */}
      <Dialog open={isAwsDialogOpen} onOpenChange={setIsAwsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to AWS</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accessKey" className="text-right">
                Access Key
              </Label>
              <Input
                id="accessKey"
                value={awsCredentials.accessKey}
                onChange={(e) => setAwsCredentials({ ...awsCredentials, accessKey: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secretKey" className="text-right">
                Secret Key
              </Label>
              <Input
                id="secretKey"
                type="password"
                value={awsCredentials.secretKey}
                onChange={(e) => setAwsCredentials({ ...awsCredentials, secretKey: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instanceId" className="text-right">
                Instance ID
              </Label>
              <Input
                id="instanceId"
                value={awsCredentials.instanceId}
                onChange={(e) => setAwsCredentials({ ...awsCredentials, instanceId: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instanceId" className="text-right">
                Region
              </Label>
              <Input
                id="instanceId"
                value={awsCredentials.instanceId}
                onChange={(e) => setAwsCredentials({ ...awsCredentials, instanceId: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAwsSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
