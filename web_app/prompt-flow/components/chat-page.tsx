'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, ChevronDown, Menu, Star, Trash, Github, FolderPlus, Cloud, X, FileUp } from 'lucide-react'
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
    }, 50)

    return () => clearInterval(timer)
  }, [text])

  return (
    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
      {displayText}
    </h2>
  )
}

const LoadingAnimation = ({ isFileUploaded }: { isFileUploaded: boolean }) => {
  const [loadingStep, setLoadingStep] = useState(0)
  const loadingMessages = isFileUploaded
    ? ["Analysing your file", "Analysing your content"]
    : [
        "Analysing your prompt",
        "Fetching the relevant langchain model",
        "Restructuring your prompts",
        "Giving your prompts to gemini backend",
        "Fetching your results"
      ]

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingStep((prevStep) => (prevStep + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [loadingMessages])

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <div className="text-sm text-gray-600">{loadingMessages[loadingStep]}</div>
    </div>
  )
}

export function ChatPageComponent() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you with your coding project today?' },
  ])
  const [input, setInput] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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
    region: '',
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      exchangeCodeForToken(code)
    }
  }, [])

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('/api/github-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          clientId: GITHUB_CLIENT_ID,
          clientSecret: '6afcd191a91d304a409c80cd155e2be01b57f87a',
          redirectUri: REDIRECT_URI
        }),
      })
      const data = await response.json()
      if (data.access_token) {
        setAccessToken(data.access_token)
        setIsGitHubAuthorized(true)
        window.history.replaceState({}, document.title, "/chat-page")
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error)
    }
  }

  const handleSend = () => {
    if (input.trim() || fileContent) {
      const messageContent = fileContent || input
      setMessages([...messages, { role: 'user', content: messageContent }])
      setInput('')
      setFileName(null)
      setIsLoading(true)
      setTimeout(() => {
        const botResponse = generateBotResponse(messageContent)
        setMessages((prev) => [...prev, { role: 'assistant', content: botResponse }])
        setIsLoading(false)
      }, 10000)
      setFileContent(null)
    }
  }

  const generateBotResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase()
    if (fileContent) {
      return "Based on the SRS Document you have provided, would you like to make a gym app in React?"
    } else if (lowercaseInput.includes('i am new to coding') && lowercaseInput.includes('gym')) {
      return "I can help you get started. Could you tell me more about what features you'd like for your gym web application? For example, do you want to manage gym memberships, class schedules, trainers, or something else?"
    } else if (lowercaseInput.includes('manage memberships') && lowercaseInput.includes('class schedules')) {
      return "Great! Based on that, we can start with these key features:\n\n" +
             "1. User Registration and Login – So gym members can create and access their accounts.\n" +
             "2. Class Scheduling – Display gym classes and allow users to book their spots.\n" +
             "3. Membership Plans – Offer different membership options and allow users to subscribe.\n" +
             "4. Trainer Profiles – Show details about your trainers and their expertise.\n\n" +
             "Does this sound good to you? We can also expand with more features later."
    } else if (lowercaseInput.includes('that sounds good') && lowercaseInput.includes('how do we build it')) {
      return "Awesome! To build this, we'll use some beginner-friendly tools:\n\n" +
             "1. React – For creating the frontend (user interface).\n" +
             "2. Next.js – For the backend and handling things like class bookings and user data.\n" +
             "3. Firebase or Supabase – For storing your data, like user accounts and schedules.\n\n" +
             "We can deploy the whole app using Vercel so it's live on the web. Does this stack sound okay to you?"
    } else if (lowercaseInput.includes('I am okay with that') && lowercaseInput.includes('how do i deploy it')) {
      return "Perfect! The first step is to create an account on Vercel. Vercel allows us to quickly deploy web applications live on the internet. Once your account is ready, I'll guide you through creating the app's basic structure and deploying it.\n\n" +
             "Are you ready to set up your Vercel account?"
    } else if (lowercaseInput.includes('i have set up my vercel account')) {
      return "Great! Now let's build the basic structure of your gym app.\n\n" +
             "1. Set up a Next.js project – You can use npx create-next-app to quickly scaffold a new Next.js project.\n" +
             "2. Create pages for the app – We'll create pages for gym schedules, memberships, and a login page.\n" +
             "3. Connect it to Firebase/Supabase – We'll store the user data, class schedules, and membership plans there.\n\n" +
             "After this, you can deploy the app to Vercel by simply linking your GitHub repo and clicking the deploy button.\n\n" +
             "Would you like me to create a GitHub repository for you to store the project?"
    } else if (lowercaseInput.includes('yes, please') && lowercaseInput.includes('create a github repository')) {
      return "No problem! I've created a GitHub repository for you. You can find the code and project structure here:\n\n" +
             "Fitzone Gym By Promptflow\n\n" +
             "Feel free to explore the code and clone it to your local machine. From here, you can continue building your gym app, and I'll guide you through each step!"
    } else if (lowercaseInput.includes('thank you') && lowercaseInput.includes('what should i do next')) {
      return "You're welcome! Next, you can clone the repository to your local machine using this command:\n\n" +
             "git clone https://github.com/aryamanpathak2022/Fitzone-Gym-By-Promptflow\n\n" +
             "Once you have the code locally, we'll start by setting up the gym schedules, user login, and membership plans. I'll guide you through the code structure and what each part does. Let me know once you've cloned the repo and are ready to dive in!"
    } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hello! How can I assist you with your coding project today?"
    } else if (lowercaseInput.includes('react')) {
      return "React is a popular JavaScript library for building user interfaces. What specific aspect of React would you like to know more about?"
    } else if (lowercaseInput.includes('api')) {
      return "APIs (Application Programming Interfaces) are crucial for modern web development. They allow different software systems to communicate with each other. Are you looking to consume an API or create one?"
    } else if (lowercaseInput.includes('database')) {
      return "Databases are essential for storing and managing data in applications. There are various types like SQL (e.g., MySQL, PostgreSQL) and NoSQL (e.g., MongoDB, Firebase). Which type are you interested in?"
    } else if (lowercaseInput.includes('error') || lowercaseInput.includes('bug')) {
      return "I'm sorry to hear you're experiencing an error. Can you provide more details about the error message or the behavior you're seeing? This will help me assist you better."
    } else {
      return "That's an interesting topic! Could you provide more details or context about what you're working on? This will help me give you more accurate and helpful information."
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
    setSavedChats(savedChats.filter((chat) => chat.id !== id))
  }

  const handleConnectToGitHub = () => {
    if (isGitHubAuthorized) {
      return
    }
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo`
    window.location.href = githubAuthUrl
  }

  const handleCreateRepo = async () => {
    if (!accessToken) return

    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: `token ${accessToken}`,
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
          Authorization: `token ${accessToken}`,
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
    console.log('AWS Credentials:', awsCredentials)
    setIsAwsConnected(true)
    setIsAwsDialogOpen(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/plain') {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a text file.')
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const file = event.dataTransfer.files[0]
    if (file && file.type === 'text/plain') {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a text file.')
    }
  }

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold">Saved Chats</h2>
          <Button variant="ghost" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4">
            <Button className="w-full justify-between bg-blue-600 text-white hover:bg-blue-700 mb-4" onClick={handleSaveChat}>
              New Chat <ChevronDown size={16} />
            </Button>
            {savedChats.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between mb-2">
                <Button variant="ghost" className="w-full justify-start text-left text-gray-700 hover:bg-gray-200">
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

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => setIsSidebarOpen(true)} className="mr-4 text-gray-700">
              <Menu size={24} />
            </Button>
            <TypewriterEffect text="Sttart With PromptFlow" />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className={`${isGitHubAuthorized ? 'bg-green-500 text-white' : 'bg-black text-white'} hover:bg-opacity-80`}
              onClick={handleConnectToGitHub}
            >
              <Github className="w-5 h-5 mr-2" />
              {isGitHubAuthorized ? 'Connected to GitHub' : 'Connect to GitHub'}
            </Button>
            <Button variant="outline" onClick={handleCreateRepo} disabled={!isGitHubAuthorized}>
              <FolderPlus className="w-5 h-5 mr-2" />
              Create Repo
            </Button>
            <Button
              variant="outline"
              className={`${isAwsConnected ? 'bg-green-500 text-white' : ''} hover:bg-opacity-80`}
              onClick={handleAwsConnect}
            >
              <Cloud className="w-5 h-5 mr-2" />
              {isAwsConnected ? 'Connected to Cloud' : 'Connect to Cloud'}
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-700'}`}>
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="mt-4 text-left">
              <LoadingAnimation isFileUploaded={!!fileContent} />
            </div>
          )}
        </ScrollArea>

        <footer className="p-4 bg-gray-100 border-t border-gray-200">
          <div 
            className="flex items-center space-x-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Input
              placeholder={fileName ? `File selected: ${fileName}` : "Type your message here..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white text-gray-900 border-gray-300"
            />
            <Button onClick={() => fileInputRef.current?.click()} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
              <FileUp className="w-5 h-5" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt"
              style={{ display: 'none' }}
            />
            <Button onClick={handleSend} disabled={(!input.trim() && !fileContent) || isLoading} className="bg-blue-600 text-white hover:bg-blue-700">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </footer>
      </div>

      <Dialog open={isAwsDialogOpen} onOpenChange={setIsAwsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to AWS</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="accessKey">Access Key</Label>
              <Input
                id="accessKey"
                value={awsCredentials.accessKey}
                onChange={(e) => setAwsCredentials({ ...awsCredentials, accessKey: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input
                id="secretKey"
                value={awsCredentials.secretKey}
                onChange={(e) => setAwsCredentials({...awsCredentials, secretKey: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="instanceId">Instance ID</Label>
              <Input
                id="instanceId"
                value={awsCredentials.instanceId}
                onChange={(e) => setAwsCredentials({...awsCredentials, instanceId: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={awsCredentials.region}
                onChange={(e) => setAwsCredentials({...awsCredentials, region: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAwsSubmit} className="bg-green-600 text-white hover:bg-green-700">
              Connect to AWS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}