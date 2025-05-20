"use client"

import { motion } from "framer-motion"

const loadingVariants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.2 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.5,
      when: "afterChildren"
    }
  }
}

const dotVariants = {
  initial: { 
    y: 0,
    scale: 1
  },
  animate: { 
    y: [-10, 0, -10],
    scale: [1, 1.2, 1],
    transition: { 
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }
  }
}

interface LoadingScreenProps {
  appName?: string;
}

export default function LoadingScreen({ appName = "Trade Landing" }: LoadingScreenProps) {
  return (
    <motion.div 
      key="loading"
      variants={loadingVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-gradient-to-br from-[#191919] to-black z-50 flex items-center justify-center"
    >
      <motion.div className="flex flex-col items-center gap-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-24 h-24 relative"
        >
          <motion.div 
            animate={{ 
              rotate: 360,
              transition: { repeat: Infinity, duration: 3, ease: "linear" }
            }}
            className="absolute inset-0 rounded-full border-t-4 border-[#b3aef5] opacity-75"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              transition: { repeat: Infinity, duration: 2, ease: "linear" }
            }}
            className="absolute inset-2 rounded-full border-t-2 border-r-2 border-[#b3aef5]/80"
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66675 12.5C10.729 12.5 12.5001 10.7908 12.5001 6.66663C12.5001 10.7908 14.2587 12.5 18.3334 12.5C14.2587 12.5 12.5001 14.2586 12.5001 18.3333C12.5001 14.2586 10.729 12.5 6.66675 12.5Z" stroke="white" strokeLinejoin="round"/>
              <path d="M1.66675 5.41663C4.27821 5.41663 5.41675 4.3179 5.41675 1.66663C5.41675 4.3179 6.54732 5.41663 9.16675 5.41663C6.54732 5.41663 5.41675 6.5472 5.41675 9.16663C5.41675 6.5472 4.27821 5.41663 1.66675 5.41663Z" stroke="white" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
        
        <motion.div className="flex space-x-3">
          <motion.div 
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-[#b3aef5]"
            style={{ originY: 0.5 }}
          />
          <motion.div 
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-[#b3aef5]"
            style={{ originY: 0.5 }}
            transition={{ delay: 0.15 }}
          />
          <motion.div 
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-[#b3aef5]"
            style={{ originY: 0.5 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/80 text-lg"
        >
          Loading {appName}
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 