"use client"

import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import Button from "@/components/ui/Button"
import { motion } from "framer-motion"

export default function ChatAssistant() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-black rounded-[28px] overflow-hidden relative h-[300px] w-full flex flex-col"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center justify-between p-4 border-b border-gray-800"
      >
        <div className="flex items-center gap-3">
          <motion.svg 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.66675 12.5C10.729 12.5 12.5001 10.7908 12.5001 6.66663C12.5001 10.7908 14.2587 12.5 18.3334 12.5C14.2587 12.5 12.5001 14.2586 12.5001 18.3333C12.5001 14.2586 10.729 12.5 6.66675 12.5Z" stroke="white" strokeLinejoin="round"/>
            <path d="M1.66675 5.41663C4.27821 5.41663 5.41675 4.3179 5.41675 1.66663C5.41675 4.3179 6.54732 5.41663 9.16675 5.41663C6.54732 5.41663 5.41675 6.5472 5.41675 9.16663C5.41675 6.5472 4.27821 5.41663 1.66675 5.41663Z" stroke="white" strokeLinejoin="round"/>
          </motion.svg>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-white text-base sm:text-lg"
          >
            Axben AI
          </motion.span>
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-md cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33325 7.50004V4.66671C3.33325 4.2 3.33325 3.96664 3.42408 3.78838C3.50398 3.63158 3.63146 3.5041 3.78826 3.42421C3.96652 3.33337 4.19988 3.33337 4.66659 3.33337H7.49992M3.33325 12.5V15.3334C3.33325 15.8001 3.33325 16.0335 3.42408 16.2117C3.50398 16.3685 3.63146 16.496 3.78826 16.5759C3.96652 16.6667 4.19988 16.6667 4.66659 16.6667H7.49992M12.4999 3.33337H15.3333C15.8 3.33337 16.0333 3.33337 16.2116 3.4242C16.3684 3.5041 16.4958 3.63158 16.5758 3.78838C16.6666 3.96664 16.6666 4.2 16.6666 4.66671V7.50004M16.6666 12.5V15.3334C16.6666 15.8001 16.6666 16.0335 16.5758 16.2117C16.4958 16.3685 16.3684 16.496 16.2116 16.5759C16.0333 16.6667 15.8 16.6667 15.3333 16.6667H12.4999" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-50">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-black w-screen h-screen p-6 relative overflow-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <motion.svg 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.66675 12.5C10.729 12.5 12.5001 10.7908 12.5001 6.66663C12.5001 10.7908 14.2587 12.5 18.3334 12.5C14.2587 12.5 12.5001 14.2586 12.5001 18.3333C12.5001 14.2586 10.729 12.5 6.66675 12.5Z" stroke="white" strokeLinejoin="round"/>
                      <path d="M1.66675 5.41663C4.27821 5.41663 5.41675 4.3179 5.41675 1.66663C5.41675 4.3179 6.54732 5.41663 9.16675 5.41663C6.54732 5.41663 5.41675 6.5472 5.41675 9.16663C5.41675 6.5472 4.27821 5.41663 1.66675 5.41663Z" stroke="white" strokeLinejoin="round"/>
                    </motion.svg>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-[#6E56CF] text-[26px] font-medium"
                    >
                      Axben AI
                    </motion.div>
                  </div>
                  
                  <Dialog.Close asChild>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white transition-colors p-1 rounded-md cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12"/>
                      </svg>
                    </motion.button>
                  </Dialog.Close>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-lg text-gray-400 mb-12"
                >
                  How can i help you today?
                </motion.div>
                
                <div className="flex justify-center items-center h-[50vh] relative">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button 
                      variant="glass"
                      bubbles={[
                        {
                          color1: "#b3aef5",
                          color2: "#ffa66b",
                          color3: "#ffaac2",
                          size: "w-[100px] h-[100px]",
                          position: "-translate-x-10"
                        },
                        {
                          color1: "#70d6ff",
                          color2: "#ff70a6",
                          color3: "#ffca3a",
                          size: "w-[100px] h-[100px]",
                          position: "translate-x-10",
                          reversed: true,
                          rotate: "rotate-180"
                        }
                      ]}
                      bubblesContainer="absolute pointer-events-none w-full h-[120px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-between"
                    >
                      <span className="text-[15px]">Ask anything</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 1L7.5 9M15.5 1L10.5 15L7.5 9L1 6L15.5 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="px-6 pb-4"
      >
        <div className="text-lg text-gray-400">How can i help you today?</div>
      </motion.div>
      
      <div className="flex-grow"></div>
      
      <div className="flex justify-center items-center mb-8 relative">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="glass"
            bubbles={[
              {
                color1: "#b3aef5",
                color2: "#ffa66b",
                color3: "#ffaac2",
                size: "w-[100px] h-[100px]",
                position: "-translate-x-5"
              },
              {
                color1: "#70d6ff",
                color2: "#ff70a6",
                color3: "#ffca3a",
                size: "w-[100px] h-[100px]",
                position: "translate-x-3",
                reversed: true,
                rotate: "rotate-180"
              }
            ]}
            bubblesContainer="absolute pointer-events-none w-full h-[120px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-between"
          >
            <span className="text-[15px]">Ask anything</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 1L7.5 9M15.5 1L10.5 15L7.5 9L1 6L15.5 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
  