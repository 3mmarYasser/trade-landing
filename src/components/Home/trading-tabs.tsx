"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const tabVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
}

export default function TradingTabs() {
  const [activeTab, setActiveTab] = useState("positions")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-black border-t border-gray-800/50"
    >
      <div className="border-b border-gray-800/50 hidden md:block">
        <div className="flex gap-4 overflow-x-auto px-4 py-3">
          <motion.button 
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-400 px-4 py-2 border-b-2 border-transparent hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Algo (API)
          </motion.button>
          <motion.button 
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-400 px-4 py-2 border-b-2 border-transparent hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Alerts
          </motion.button>
          <motion.button 
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-400 px-4 py-2 border-b-2 border-transparent hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Replay Trading
          </motion.button>
          <motion.button 
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-400 px-4 py-2 border-b-2 border-transparent hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Notes
          </motion.button>
          <motion.button 
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-400 px-4 py-2 border-b-2 border-transparent hover:text-white transition-colors duration-200 whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            Trading Panel
            <motion.span 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="w-2 h-2 rounded-full bg-[#b3aef5]"
            ></motion.span>
          </motion.button>
          <motion.button 
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-[#b3aef5] px-4 py-1.5 ml-4 bg-[#b3aef5]/10 rounded border border-dashed border-[#b3aef5]/50 whitespace-nowrap hover:bg-[#b3aef5]/20 transition-colors duration-200 cursor-pointer"
          >
            Trade
          </motion.button>
        </div>
      </div>

      <div className="border-b border-gray-800/50 md:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-gray-400 flex items-center cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Trading Options
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMenuOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
            </motion.div>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-[#b3aef5] px-4 py-1.5 bg-[#b3aef5]/10 rounded border border-dashed border-[#b3aef5]/50 hover:bg-[#b3aef5]/20 transition-colors duration-200 cursor-pointer"
          >
            Trade
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-3 space-y-2 bg-[#111] overflow-hidden"
            >
              <motion.button 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-gray-400 block w-full text-left py-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Algo (API)
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm text-gray-400 block w-full text-left py-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Alerts
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-400 block w-full text-left py-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Replay Trading
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm text-gray-400 block w-full text-left py-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Notes
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-400 w-full text-left py-2 hover:text-white transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                Trading Panel
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.2 }}
                  className="w-2 h-2 rounded-full bg-[#b3aef5]"
                ></motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap border-b border-gray-800/50 py-3 px-4">
        <div className="flex overflow-x-auto w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xs rounded-md px-3 py-1.5 mr-4 whitespace-nowrap border cursor-pointer ${activeTab === "positions" ? "border-dashed border-[#b3aef5]/70 text-[#b3aef5] bg-[#111]" : "border-transparent text-gray-400 hover:text-white"} transition-colors duration-200`}
            onClick={() => setActiveTab("positions")}
          >
            Positions 0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`text-xs rounded-md px-3 py-1.5 mr-4 whitespace-nowrap border cursor-pointer ${activeTab === "orders" ? "border-dashed border-[#b3aef5]/70 text-white bg-[#111]" : "border-transparent text-gray-400 hover:text-white"} transition-colors duration-200`}
            onClick={() => setActiveTab("orders")}
          >
            Orders 0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-xs rounded-md px-3 py-1.5 mr-4 whitespace-nowrap border cursor-pointer ${activeTab === "history" ? "border-dashed border-[#b3aef5]/70 text-white bg-[#111]" : "border-transparent text-gray-400 hover:text-white"} transition-colors duration-200`}
            onClick={() => setActiveTab("history")}
          >
            History
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`text-xs rounded-md px-3 py-1.5 mr-4 whitespace-nowrap border cursor-pointer ${activeTab === "balance" ? "border-dashed border-[#b3aef5]/70 text-white bg-[#111]" : "border-transparent text-gray-400 hover:text-white"} transition-colors duration-200`}
            onClick={() => setActiveTab("balance")}
          >
            Balance
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-xs rounded-md px-3 py-1.5 mr-4 whitespace-nowrap border cursor-pointer ${activeTab === "journal" ? "border-dashed border-[#b3aef5]/70 text-white bg-[#111]" : "border-transparent text-gray-400 hover:text-white"} transition-colors duration-200`}
            onClick={() => setActiveTab("journal")}
          >
            Trading Journal
          </motion.button>
          <div className="flex-grow"></div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xs text-[#b3aef5] border border-dashed border-[#b3aef5]/70 rounded-md px-3 py-1.5 mr-3 whitespace-nowrap hover:bg-[#b3aef5]/10 transition-colors duration-200 cursor-pointer"
          >
            Bulk SL & TP
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-[#b3aef5] border border-dashed border-[#b3aef5]/70 rounded-md px-3 py-1.5 whitespace-nowrap hover:bg-[#b3aef5]/10 transition-colors duration-200 cursor-pointer"
          >
            Close all
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
