"use client"
import TradingCard from "@/components/Home/trading-chart"
import Navbar from "@/components/shared/Navbar"
import AccountSummary from "@/components/Home/account-summary"
import TradingTabs from "@/components/Home/trading-tabs"
import TradingJournal from "@/components/Home/trading-journal"
import Watchlist from "@/components/Home/watchlist"
import ChatAssistant from "@/components/Home/chat-assistant"
import LoadingScreen from "@/components/ui/LoadingScreen"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable"
import { useEffect, useState, useRef } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { motion, AnimatePresence } from "framer-motion"

const childrenAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
}

export default function TradingDashboard() {
  const DEFAULT_WIDTH = 370;
  const MIN_WIDTH = 323;
  const MAX_WIDTH = 457;
  
  const [rightPanelWidth, setRightPanelWidth] = useLocalStorage<number>("right-panel-width", DEFAULT_WIDTH);
  const [isMobile, setIsMobile] = useState(false);
  const [minSizePercent, setMinSizePercent] = useState(15);
  const [maxSizePercent, setMaxSizePercent] = useState(35);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const calculatePercentage = (pixelWidth: number, containerWidth: number) => {
    return (pixelWidth / containerWidth) * 100;
  };
  
  const getRightPanelPercentage = () => {
    if (!containerRef.current) return 25; 
    
    const containerWidth = containerRef.current.offsetWidth;
    const constrainedWidth = Math.max(MIN_WIDTH, Math.min(rightPanelWidth, MAX_WIDTH));
    return calculatePercentage(constrainedWidth, containerWidth);
  };
  
  const handleResizeEnd = (sizes: number[]) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const newWidth = (sizes[1] / 100) * containerWidth;
    
    const constrainedWidth = Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH));
    setRightPanelWidth(constrainedWidth);
  };
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setMinSizePercent(calculatePercentage(MIN_WIDTH, containerWidth));
        setMaxSizePercent(calculatePercentage(MAX_WIDTH, containerWidth));
      }
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    const timer = setTimeout(() => {
      if (document.readyState === 'complete') {
        setIsLoading(false);
      } else {
        window.addEventListener('load', () => setIsLoading(false));
      }
    }, 1200);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('load', () => setIsLoading(false));
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen appName="Trade Landing" />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: isLoading ? 0.3 : 0 }}
        className="min-h-screen flex flex-col bg-gradient-to-br from-[#e4e2f9] to-white relative overflow-hidden"
      >
        <motion.div
          variants={childrenAnimations}
          initial="initial"
          animate="animate"
          transition={{ delay: isLoading ? 0.5 : 0.1 }}
        >
          <Navbar />
        </motion.div>
        
        <motion.div
          variants={childrenAnimations}
          initial="initial"
          animate="animate"
          transition={{ delay: isLoading ? 0.7 : 0.2 }}
        >
          <AccountSummary />
        </motion.div>

        {isMobile ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isLoading ? 0.9 : 0.3 }}
            className="p-4 space-y-4 flex-grow"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: isLoading ? 1.1 : 0.4, 
                type: "spring", 
                stiffness: 100 
              }}
              className="bg-black rounded-[28px] overflow-hidden h-full"
            >
              <TradingCard />
              <TradingTabs />
              <TradingJournal />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isLoading ? 1.3 : 0.5 }}
              className="w-full"
            >
              <Watchlist />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isLoading ? 1.5 : 0.6 }}
              className="w-full"
            >
              <ChatAssistant />
            </motion.div>
          </motion.div>
        ) :
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isLoading ? 0.9 : 0.3 }}
            ref={containerRef} 
            className="p-4 flex-grow flex"
          >
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={handleResizeEnd}
              className="w-full h-full"
            >
              <ResizablePanel
                defaultSize={100 - getRightPanelPercentage()}
                minSize={60}
              >
                <ResizablePanelGroup direction="vertical" className="h-full">
                  <ResizablePanel defaultSize={62} minSize={50}>
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: isLoading ? 1.1 : 0.4, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      whileHover={{ scale: 1.005 }}
                      className="bg-black rounded-[28px] overflow-hidden h-full"
                    >
                      <TradingCard />
                    </motion.div>
                  </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  <ResizablePanel defaultSize={38} minSize={25}>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: isLoading ? 1.3 : 0.5, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      whileHover={{ scale: 1.005 }}
                      className="bg-black rounded-[28px] overflow-hidden h-full flex flex-col"
                    >
                      <TradingTabs />
                      <div className="flex-grow overflow-auto">
                        <TradingJournal />
                      </div>
                    </motion.div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              
              <ResizableHandle withHandle>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: 1, delay: isLoading ? 1.5 : 0.7 }}
                  className="absolute inset-0 z-[1] pointer-events-none"
                />
              </ResizableHandle>
              
              <ResizablePanel 
                defaultSize={getRightPanelPercentage()} 
                minSize={minSizePercent}
                maxSize={maxSizePercent}
              >
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: isLoading ? 1.5 : 0.6, 
                    type: "spring", 
                    stiffness: 100 
                  }}
                  className="flex flex-col h-full gap-4"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: isLoading ? 1.7 : 0.7 }}
                    whileHover={{ scale: 1.005 }}
                    className="flex-grow"
                  >
                    <Watchlist />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: isLoading ? 1.9 : 0.8 }}
                    whileHover={{ scale: 1.005 }}
                    className="min-h-[300px]"
                  >
                    <ChatAssistant />
                  </motion.div>
                </motion.div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </motion.div>
        }
      </motion.div>
    </>
  )
}