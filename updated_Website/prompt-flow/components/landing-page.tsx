'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Code, Zap, Rocket, Cloud, Cog, Box, Check, Phone, Mail, MessageCircle, Instagram, Facebook, Sun, Moon, DollarSign } from 'lucide-react'
import Link from 'next/link'

export function LandingPageComponent() {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    setMounted(true)
    const root = window.document.documentElement
    root.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const features = [
    {
      icon: Code,
      title: "Natural Language to Code Generation",
      description: "Convert natural language prompts into full project structures, including code and configuration files.",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      icon: Zap,
      title: "Dynamic Web Access for Real-Time Framework Support",
      description: "Access up-to-date documentation and support for new languages or frameworks via our LLM-powered Docker container.",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      icon: Cloud,
      title: "Seamless Cloud Deployment Integration",
      description: "Generate cloud-ready configurations for AWS, GCP, and Kubernetes automatically.",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      icon: Cog,
      title: "End-to-End SDLC Automation",
      description: "Automate your entire software development lifecycle. From code generation to testing and deployment.",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      icon: Box,
      title: "Flexible Execution and Testing via Docker",
      description: "Execute, test, and validate projects in isolated Docker environments.",
      image: "/placeholder.svg?height=400&width=600"
    },
  ]

  const plans = [
    { name: "Basic", price: 2, features: ["5 projects", "Basic code generation", "Community support"] },
    { name: "Pro", price: 3, features: ["Unlimited projects", "Advanced code generation", "Priority support", "Cloud deployment"] },
    { name: "Enterprise", price: 6, features: ["Custom solutions", "Dedicated account manager", "24/7 premium support", "Advanced integrations"] },
  ]

  const whyPromptFlow = [
    { title: "AI-Powered Development", description: "Leverage cutting-edge AI to streamline your development process." },
    { title: "Streamlined Workflow", description: "Optimize your workflow with intelligent automation and integration." },
    { title: "Increased Productivity", description: "Boost your team's productivity with smart code generation and management." },
    { title: "Cutting-Edge Technology", description: "Stay ahead of the curve with the latest in AI-assisted development tools." }
  ]

  const connectIcons = [
    { icon: Phone, label: 'Call Us', href: 'tel:+1234567890' },
    { icon: Mail, label: 'Email', href: 'mailto:info@promptflow.com' },
    { icon: MessageCircle, label: 'Discord', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A051E] text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300 overflow-hidden font-sans`}>
      {/* Enhanced Navigation */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            PromptFlow
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            {['Features', 'Why PromptFlow', 'Pricing', 'Connect'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative group text-lg font-medium"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 transition-transform group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
          >
            <div className="w-10 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 relative">
              <motion.div
                className="w-4 h-4 bg-white rounded-full shadow-md"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
              <Sun className="absolute left-1 top-1 h-4 w-4 text-yellow-400 transition-opacity duration-300" style={{ opacity: isDarkMode ? 0 : 1 }} />
              <Moon className="absolute right-1 top-1 h-4 w-4 text-gray-900 transition-opacity duration-300" style={{ opacity: isDarkMode ? 1 : 0 }} />
            </div>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </header>

      <main>
        {/* Hero Section with Curved Background */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-[200%] aspect-[2/1] -top-[75%] left-1/2 -translate-x-1/2 rounded-[100%] bg-gradient-to-b from-purple-600/30 via-pink-500/20 to-transparent blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block px-4 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm mb-8"
            >
              Revolutionize Your Development Workflow
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                AI-Powered Code Generation
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-10 text-gray-300 dark:text-gray-300 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PromptFlow streamlines your entire software development lifecycle, from code generation to deployment, with cutting-edge AI technology.
            </motion.p>

            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/chatbot" passHref>
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity relative overflow-hidden group">
                  <span className="relative z-10">Start Prompting</span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.span
                      className="text-2xl"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    >
                      |
                    </motion.span>
                  </span>
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-20 bg-gray-50 dark:bg-[#0A051E]/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Powerful Features
            </h2>
            <div className="space-y-20">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/50 to-transparent opacity-60" />
                      <feature.icon className="absolute bottom-4 left-4 w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-light">{feature.description}</p>
                    <a href="#" className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors inline-flex items-center group">
                      Learn more 
                      <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why PromptFlow Section */}
        <section id="why-promptflow" className="relative py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Why PromptFlow?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {whyPromptFlow.map((reason, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section with Enhanced Money Animation */}
        <section id="pricing" className="relative py-20 bg-gray-50 dark:bg-[#0A051E]/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg flex flex-col relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6 flex items-baseline">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      ${plan.price}
                    </span>
                    <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">/month</span>
                  </p>
                  <ul className="mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <Check className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-auto w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity">
                    Choose Plan
                  </button>
                  <div className="absolute -top-4 -right-4 w-24 h-24">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5],
                          y: [-20, -60],
                          x: Math.random() * 40 - 20,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      >
                        <DollarSign className="text-yellow-400 w-6 h-6" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect With Us Section with 3D Sphere-like Icons */}
        <section id="connect" className="relative py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Connect With Us
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
              {connectIcons.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center relative overflow-hidden group-hover:bg-opacity-90 transition-all duration-300">
                      <item.icon className="w-10 h-10 text-purple-500 dark:text-purple-400 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300">{item.label}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-white/10 py-8 bg-gray-50 dark:bg-[#0A051E]/80">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">&copy; 2023 PromptFlow. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">Privacy Policy</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">Terms of Service</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">Contact Us</a>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}