"use client"

import { useState } from "react"
import { Menu, Search, X, ChevronDown, Settings } from "lucide-react"
import BubbleSVG from "@/components/ui/BubbleSVG"
import Button from "@/components/ui/Button"
import { AnimatePresence, motion } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16">
      <div className="flex items-center space-x-4">
        <button 
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-800 md:hidden cursor-pointer" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-purple-500">🚀</div>
        <div className="bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-medium">Demo</div>
        </div>
        <div className="flex items-center px-3 py-1.5 cursor-pointer">
          <span className="text-gray-800 font-medium">Account #457159</span>
          <ChevronDown size={16} className="ml-1 text-gray-500" />
        </div>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            <BubbleSVG 
              className="w-[80px] h-[80px] -translate-x-6 -translate-y-2"
              color1="#b3aef5"
              color2="#b3aef5"
              color3="#b3aef5"
            />
            <BubbleSVG 
              className="w-[80px] h-[80px] translate-x-6 translate-y-2"
              color1="#ffaac2"
              color2="#ffaac2"
              color3="#ffaac2"
            />
          </div>
          <div className="relative flex items-center w-52 h-12 bg-white/50 backdrop-blur-lg rounded-full shadow-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
              <Search size={18} />
            </span>
            <input
              type="search"
              placeholder="Search (Ctrl+S)"
              className="w-full h-full pl-12 pr-4 bg-transparent text-gray-600 placeholder:text-gray-600 focus:outline-none border-none rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <Button
            variant="plain"
            showBubbles={true}
            bubbles={[
              {
                color1: "#b09dfd",
                color2: "#ff9a9e",
                color3: "#ffb37f",
                size: "w-[100px] h-[80px]",
                position: "-left-2"
              }
            ]}
            bubblesContainer="absolute pointer-events-none w-full h-full left-0 top-1/2 -translate-y-1/2 flex items-center"
            className="bg-white/80 backdrop-blur-sm text-black px-5 py-2 font-medium rounded-full border border-white/50 shadow-sm flex items-center gap-2.5"
          >
            <Settings size={16} />
            Settings
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 lg:hidden pt-16"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={toggleMenu}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-700" />
            </motion.button>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="search"
                  placeholder="Search (Ctrl+S)"
                  className="w-full h-10 bg-gray-100 rounded-full pl-10 pr-4 text-sm text-gray-800 focus:outline-none"
                />
              </div>
              <div className="space-y-4">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Trading
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  History
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Settings
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Help
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
