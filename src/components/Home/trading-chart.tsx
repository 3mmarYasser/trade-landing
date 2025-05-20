"use client"

import { useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import Button from "@/components/ui/Button"
import { ChevronDown, X, Minus, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const OrderCard = ({ type, action, pair, lot, price }: { 
  type: string, 
  action: 'buy' | 'sell', 
  pair: string, 
  lot: string, 
  price: string
}) => {
  const badgeColor = action === 'buy' ? 'text-[#b5ecb9] bg-[#b5ecb9]/10' : 'text-[#c7bcd6] bg-[#c7bcd6]/10';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col min-w-[140px]"
    >
      <div className="pt-1.5 px-2 pb-0.5 text-[9px] text-gray-400">
        {type} <span className="text-gray-500">on {pair} / USD</span>
      </div>
      
      <div className="flex items-center justify-between px-1.5 pb-1.5">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`${badgeColor} text-[10px] font-medium rounded-md px-1.5 py-0.5`}
        >
          {action === 'buy' ? 'Buy' : 'Sell'} {lot} Lot
        </motion.div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400">at {price}</span>
          <motion.button 
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X size={10} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function TradingCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const labels = Array.from({ length: 200 }, (_, i) => `${i + 1}`)
  
  const generateChartData = () => {
    
    const points = []
    let lastValue = 1.13500
    
    for(let i = 0; i < 200; i++) {
      const randomChange = (Math.random() - 0.5) * 0.0010
      
      let trendInfluence = 0
      
      if (i < 50) {
        trendInfluence = 0.00005
      } 
      else if (i >= 50 && i < 70) {
        trendInfluence = -0.00015
      }
      else if (i >= 70 && i < 90) {
        trendInfluence = 0.00002
      }
      else if (i >= 90 && i < 120) {
        trendInfluence = 0.00008
      }
      else if (i >= 120 && i < 150) {
        trendInfluence = (Math.random() - 0.5) * 0.0005
      }
      else {
        trendInfluence = 0.00003
      }
      
      lastValue = lastValue + randomChange + trendInfluence
      
      lastValue = Math.max(1.12, Math.min(1.15, lastValue))
      
      if (i % 15 === 0) {
        const spike = (Math.random() - 0.5) * 0.003
        points.push(lastValue + spike)
      } else {
        points.push(lastValue)
      }
    }
    
    return points
  }
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'EUR/USD',
        data: generateChartData(),
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        pointRadius: 0,
        borderWidth: 1.5,
        tension: 0.1,
      },
    ],
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full h-full bg-black/40 backdrop-blur-sm flex flex-col justify-stretch rounded-[28px] overflow-hidden"
    >
      <div className="relative py-8 flex-grow min-h-[300px]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <Line options={chartOptions} data={chartData} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="bg-black/80 backdrop-blur-md border border-gray-800/50 rounded-[28px] p-3 w-[320px] shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-[11px] text-gray-400 flex items-center gap-0.5 cursor-pointer"
              >
                Order Info
                <ChevronDown size={12} className="text-gray-400" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-[11px] text-gray-400 flex items-center gap-0.5 cursor-pointer"
              >
                Risk / Order
                <ChevronDown size={12} className="text-gray-400" />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-white font-medium text-center text-base mb-2"
            >
              113637 <span className="text-gray-400 text-[10px] uppercase ml-0.5">USD</span>
            </motion.div>

            <div className="flex justify-between items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="w-[100px] h-[40px] rounded-full flex items-center justify-center p-0"
                  variant="glass"
                  showBubbles={true}
                  bubbles={[
                    {
                      color1: "#d8cce8",
                      color2: "#d8cce8",
                      color3: "#d8cce8",
                      size: "w-[60px] h-[60px]",
                      position: "-translate-x-4"
                    }
                  ]}
                  bubblesContainer="absolute pointer-events-none w-full h-full left-0 top-1/2 -translate-y-1/2 flex items-center"
                >
                  <span className="text-white text-sm">Sell</span>
                </Button>
              </motion.div>

              {/* Lot Controls - Horizontal layout with 0.01 between + and - */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-gray-300 cursor-pointer hover:bg-black/50 transition-colors"
                  >
                    <Minus size={16} strokeWidth={1.5} />
                  </motion.button>
                  
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    className="text-center px-1"
                  >
                    <div className="text-white text-sm font-medium">0.01</div>
                  </motion.div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-gray-300 cursor-pointer hover:bg-black/50 transition-colors"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </motion.button>
                </div>
                
                <div className="text-[10px] text-gray-400 mt-1">
                  Lot
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="bg-black/10 backdrop-blur-lg w-[100px] h-[40px] rounded-full flex items-center justify-center p-0"
                  variant="glass"
                  showBubbles={true}
                  bubbles={[
                    {
                      color1: "#bcf7c0",
                      color2: "#bcf7c0",
                      color3: "#bcf7c0",
                      size: "w-[60px] h-[60px]",
                      position: "translate-x-13",
                      reversed: true,
                      rotate: "rotate-10"
                    }
                  ]}
                  bubblesContainer="absolute pointer-events-none w-full h-full right-0 top-1/2 -translate-y-1/2 flex items-center"
                >
                  <span className="text-white text-sm">Buy</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-800/50 mt-auto">
        <div className="flex md:hidden items-center justify-between px-4 py-2 bg-black">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gray-400 text-[11px] flex items-center" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide" : "Show"} History
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={12} className="ml-1" />
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          <div className={`p-3 overflow-x-auto ${isExpanded ? "block" : "hidden md:block"}`}>
            <div className="flex items-center flex-nowrap gap-3">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(165, 160, 226, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[9px] cursor-pointer text-[#a5a0e2] bg-[#a5a0e2]/10 border border-[#a5a0e2]/20 whitespace-nowrap px-2 py-1 rounded-md hover:bg-[#a5a0e2]/20 transition-colors"
              >
                Close all
              </motion.button>
              
              <OrderCard 
                type="Order Rejected" 
                action="sell" 
                pair="EUR" 
                lot="1.33" 
                price="1.14321" 
              />
              
              <OrderCard 
                type="Order Placed" 
                action="buy" 
                pair="EUR" 
                lot="1.33" 
                price="1.14321" 
              />
              
              <OrderCard 
                type="Market Order Rejected" 
                action="sell" 
                pair="EUR" 
                lot="1.33" 
                price="1.14321" 
              />
              
              <OrderCard 
                type="Market Order Executed" 
                action="sell" 
                pair="EUR" 
                lot="1.33" 
                price="1.14321" 
              />
              
              <OrderCard 
                type="Market Order Executed" 
                action="buy" 
                pair="EUR" 
                lot="1.33" 
                price="1.14321" 
              />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
