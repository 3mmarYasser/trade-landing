"use client"
import { ChevronDown, Settings, Edit } from "lucide-react"
import Button from "@/components/ui/Button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AccountSummary() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-100"
    >
      <div className="px-4 md:px-6 py-3">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
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
              className="bg-white/80 backdrop-blur-sm text-black px-5 py-2 font-medium rounded-full border border-white/50 shadow-sm flex items-center gap-2.5 cursor-pointer"
            >
              <span className="text-gray-800 text-sm">EUR / USD</span>
              <ChevronDown size={16} className="text-gray-400" />
            </Button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 bg-white/50 backdrop-blur-sm rounded-full p-2 border border-white/30 cursor-pointer hover:bg-white/70 transition-colors"
            >
              <Settings size={18} />
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-nowrap items-center justify-between flex-1 ml-6 overflow-x-auto gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">Balance:</div>
              <div className="text-gray-800 text-sm font-medium">$10000.00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">Equity:</div>
              <div className="text-gray-800 text-sm font-medium">$10000.00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">Profit/Loss:</div>
              <div className="text-gray-800 text-sm font-medium">$0.00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">Margin Used:</div>
              <div className="text-gray-800 text-sm font-medium">$10000.00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">Margin Available:</div>
              <div className="text-gray-800 text-sm font-medium">$10000.00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">Margin (%):</div>
              <div className="text-gray-800 text-sm font-medium">0.00</div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 flex items-center text-sm cursor-pointer hover:text-gray-700 transition-colors whitespace-nowrap"
            >
              <Edit size={16} className="mr-1" />
              Edit View
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col w-full">
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center space-x-3">
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
                className="bg-white/80 backdrop-blur-sm text-black px-4 py-1.5 font-medium rounded-full border border-white/50 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span className="text-gray-800 text-sm">EUR / USD</span>
                <ChevronDown size={16} className="text-gray-400" />
              </Button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 bg-white/50 backdrop-blur-sm rounded-full p-2 border border-white/30 cursor-pointer hover:bg-white/70 transition-colors"
              >
                <Settings size={16} />
              </motion.button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 flex items-center text-sm cursor-pointer hover:text-gray-700 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Hide" : "View"} Details
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} className="ml-1" />
              </motion.div>
            </motion.button>
          </div>

          {/* Collapsible Account Details for Mobile */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-col space-y-2 mt-2 bg-white/10 p-3 rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Balance:</div>
                    <div className="text-gray-800 text-xs font-medium">$10000.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Equity:</div>
                    <div className="text-gray-800 text-xs font-medium">$10000.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Profit/Loss:</div>
                    <div className="text-gray-800 text-xs font-medium">$0.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Margin Used:</div>
                    <div className="text-gray-800 text-xs font-medium">$10000.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Margin Available:</div>
                    <div className="text-gray-800 text-xs font-medium">$10000.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Margin (%):</div>
                    <div className="text-gray-800 text-xs font-medium">0.00</div>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 flex items-center text-xs cursor-pointer hover:text-gray-700 transition-colors self-end mt-1"
                >
                  <Edit size={14} className="mr-1" />
                  Edit View
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="items-center justify-between mt-1 overflow-x-auto w-full flex"
              >
                <div className="flex items-center gap-2">
                  <div className="text-gray-500 text-xs">Balance:</div>
                  <div className="text-gray-800 text-xs font-medium">$10000.00</div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="text-gray-500 text-xs">P/L:</div>
                  <div className="text-gray-800 text-xs font-medium">$0.00</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
