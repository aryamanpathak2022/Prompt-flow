'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Code, Zap, Rocket, Cloud, Cog, Box, Check, Phone, Mail, MessageCircle, Instagram, Facebook, Sun, Moon, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function LandingPage() {
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
      image: "/placeholder.svg?height=600&width=800"
    },
    {
      icon: Zap,
      title: "Dynamic Web Access for Real-Time Framework Support",
      description: "Access up-to-date documentation and support for new languages or frameworks via our LLM-powered Docker container.",
      image: "/placeholder.svg?height=600&width=800"
    },
    {
      icon: Cloud,
      title: "Seamless Cloud Deployment Integration",
      description: "Generate cloud-ready configurations for AWS, GCP, and Kubernetes automatically.",
      image: "/placeholder.svg?height=600&width=800"
    },
    {
      icon: Cog,
      title: "End-to-End SDLC Automation",
      description: "Automate your entire software development lifecycle. From code generation to testing and deployment.",
      image: "/placeholder.svg?height=600&width=800"
    },
    {
      icon: Box,
      title: "Flexible Execution and Testing via Docker",
      description: "Execute, test, and validate projects in isolated Docker environments.",
      image: "/placeholder.svg?height=600&width=800"
    },
  ]

  const plans = [
    { 
      name: "Basic", 
      price: 2, 
      features: ["5 projects", "Basic code generation", "Community support"],
      gradient: "from-purple-400 to-pink-400"
    },
    { 
      name: "Pro", 
      price: 3, 
      features: ["Unlimited projects", "Advanced code generation", "Priority support", "Cloud deployment"],
      gradient: "from-pink-400 to-orange-400",
      popular: true
    },
    { 
      name: "Enterprise", 
      price: 6, 
      features: ["Custom solutions", "Dedicated account manager", "24/7 premium support", "Advanced integrations"],
      gradient: "from-orange-400 to-red-400"
    },
  ]

  const connectIcons = [
    { icon: Phone, label: 'Call Us', href: 'tel:+1234567890' },
    { icon: Mail, label: 'Email', href: 'mailto:info@promptflow.com' },
    { icon: MessageCircle, label: 'Discord', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0A051E] text-white font-sans">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#0A051E]/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              PromptFlow
            </Link>
            <nav className="hidden md:flex items-center space-x-8 ml-auto">
              {['Features', 'Why PromptFlow', 'Pricing', 'Connect'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-lg font-medium hover:text-purple-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors ml-8"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Tech Background */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A051E] via-transparent to-[#0A051E]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0A051E]/0 to-[#0A051E]/0" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-block px-6 py-2 rounded-full text-sm bg-white/10 backdrop-blur-sm mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Revolutionize Your Development Workflow
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              AI-Powered Code Generation
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              PromptFlow streamlines your entire software development lifecycle, from code generation to deployment, with cutting-edge AI technology.
            </p>

            {/* Paper-like Icons */}
            <div className="flex justify-center gap-8 mb-12">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative w-24 h-24"
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  style={{ perspective: 1000 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transform rotate-3 opacity-20" />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform -rotate-3 opacity-20" />
                  <div className="relative h-full flex items-center justify-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                    <feature.icon className="w-10 h-10 text-purple-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-12 py-6 rounded-full hover:opacity-90 transition-opacity text-xl"
            >
              Start Prompting
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-gray-50/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Powerful Features
          </h2>
          <div className="space-y-32">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <Image 
                      src={feature.image}
                      alt={feature.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/50 to-transparent opacity-60" />
                    <feature.icon className="absolute bottom-6 left-6 w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-8 text-xl font-light leading-relaxed">{feature.description}</p>
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center group text-lg">
                    Learn more 
                    <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 bg-gray-50/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Money Animation */}
                <AnimatePresence>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`money-${i}`}
                      initial={{ opacity: 0, scale: 0, x: 50, y: -20 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        x: [50, 0, -50],
                        y: [-20, 20, 60],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-4 -right-4"
                    >
                      <DollarSign className={`w-6 h-6 bg-clip-text text-transparent bg-gradient-to-r ${plan.gradient}`} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {plan.popular && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${plan.gradient}`}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 mr-2 text-purple-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full bg-gradient-to-r ${plan.gradient} text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-lg mt-auto`}
                >
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section with Tech Background */}
      <section id="connect" className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A051E] via-transparent to-[#0A051E]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Connect With Us
          </h2>

          <div className="flex justify-between items-center max-w-6xl mx-auto">
            {connectIcons.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="group flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5"
                  animate={{
                    x: [0, 10, -10, 10, 0],
                    rotate: [0, 5, -5, 5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-[#0A051E] flex items-center justify-center relative overflow-hidden group-hover:bg-opacity-90 transition-all duration-300">
                    <item.icon className="w-12 h-12 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
                <p className="mt-4 text-lg font-medium text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  {item.label}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 bg-gray-50/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">&copy; 2023 PromptFlow. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-purple-400">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-purple-400">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-purple-400">Contact Us</a>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-purple-400">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}