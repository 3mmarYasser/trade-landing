"use client"

import { useState } from "react"
import { ChevronDown, Edit, Trash2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const tableRowVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.05 * custom,
      duration: 0.3 
    }
  })
}

export default function TradingJournal() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-black flex-grow flex flex-col"
    >
      <div className="flex justify-between items-center p-4 md:hidden">
        <motion.h3 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-sm font-medium"
        >
          Trading Journal
        </motion.h3>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 flex items-center text-xs cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"} Details
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} className="ml-1" />
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        <div className={`overflow-x-auto ${isExpanded ? "block" : "hidden md:block"} flex-grow`}>
          <div className="md:hidden space-y-4 p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#111]/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30"
            >
              <div className="flex justify-between mb-3">
                <div className="text-white font-medium">EUR / USD</div>
                <div className="text-red-500 font-medium">Sell</div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="grid grid-cols-2 gap-3 text-xs"
              >
                <div>
                  <div className="text-gray-400 mb-1">Size</div>
                  <div className="text-white">0.1</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Entry Price</div>
                  <div className="text-white">1.13516</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Created at</div>
                  <div className="text-white">01.04.2025 (15:45 PM)</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">P/L</div>
                  <div className="text-red-500">-$0.94</div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex justify-end mt-3 space-x-3"
              >
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden md:block w-full h-full">
            <table className="w-full text-sm min-w-max">
              <motion.thead
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <tr className="text-gray-400 text-xs border-b border-gray-800/50 bg-black sticky top-0">
                  <th className="text-left py-3 px-3 font-medium">Instrument</th>
                  <th className="text-left py-3 px-3 font-medium">Side</th>
                  <th className="text-left py-3 px-3 font-medium">Size</th>
                  <th className="text-left py-3 px-3 font-medium">Entry Price</th>
                  <th className="text-left py-3 px-3 font-medium">Created at (EET)</th>
                  <th className="text-left py-3 px-3 font-medium">Stop Loss</th>
                  <th className="text-left py-3 px-3 font-medium">Take Profit</th>
                  <th className="text-left py-3 px-3 font-medium">Margin</th>
                  <th className="text-left py-3 px-3 font-medium">P/L</th>
                  <th className="text-left py-3 px-3 font-medium">Position ID</th>
                  <th className="text-left py-3 px-3 font-medium">Action</th>
                </tr>
              </motion.thead>
              <tbody>
                <motion.tr 
                  variants={tableRowVariant}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  whileHover={{ backgroundColor: "rgba(17, 17, 17, 0.7)" }}
                  className="border-b border-gray-800/30 hover:bg-[#111]/50 text-white"
                >
                  <td className="py-3 px-3">EUR / USD</td>
                  <td className="py-3 px-3">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#c7bcd6]/20 text-[#c7bcd6] px-2 py-0.5 rounded-full text-xs"
                    >
                      Sell
                    </motion.span>
                  </td>
                  <td className="py-3 px-3">0.1</td>
                  <td className="py-3 px-3">1.13516</td>
                  <td className="py-3 px-3">01.04.2025 (15:45 PM)</td>
                  <td className="py-3 px-3">-</td>
                  <td className="py-3 px-3">-</td>
                  <td className="py-3 px-3">$2.27</td>
                  <td className="py-3 px-3 text-red-500">-$0.94</td>
                  <td className="py-3 px-3 text-gray-400">325262348734563456</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnimatePresence>
    </motion.div>
  )
}
