"use client"

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import BubbleSVG from "../BubbleSVG"

interface BubbleProps {
  color1?: string;
  color2?: string;
  color3?: string;
  size?: string;
  position?: string; // CSS classes for positioning
  reversed?: boolean;
  rotate?: string; // CSS classes for rotation
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "default" | "glass" | "plain";
  icon?: React.ReactNode;
  showBubbles?: boolean;
  bubbles?: BubbleProps[];
  bubblesContainer?: string;
  className?: string;
}

export const Button = ({ 
  children, 
  variant = "default", 
  icon,
  showBubbles = true,
  bubbles = [
    {
      color1: "#b3aef5",
      color2: "#ffa66b", 
      color3: "#ffaac2",
      size: "w-[100px] h-[100px]",
      position: "",
      reversed: false,
      rotate: ""
    }
  ],
  bubblesContainer = "absolute pointer-events-none w-full h-[120px] left-1/2 -translate-x-1/2 -bottom-10 flex items-center justify-center",
  className = "",
  ...props 
}: ButtonProps) => {
  const getButtonClasses = () => {
    const baseClasses = "relative flex items-center justify-center gap-2.5 cursor-pointer z-10"
    
    switch (variant) {
      case "glass":
        return `${baseClasses} px-5 py-2.5 text-white font-normal rounded-[22px] bg-[#161616]/40 backdrop-blur-md border border-gray-800/50 shadow-lg`
      case "plain":
        return `${baseClasses} px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors`
      default:
        return `${baseClasses} px-5 py-2.5 text-white font-normal rounded-[22px] bg-[#161616]/40 backdrop-blur-md border border-gray-800/50 shadow-lg`
    }
  }

  return (
    <div className="relative">
      {showBubbles && bubbles.length > 0 && (
        <div className={bubblesContainer}>
          {bubbles.map((bubble, index) => (
            <BubbleSVG 
              key={index}
              className={`${bubble.size || "w-[100px] h-[100px]"} ${bubble.position || ""} ${bubble.rotate || ""}`}
              color1={bubble.color1}
              color2={bubble.color2}
              color3={bubble.color3}
              reversed={bubble.reversed}
            />
          ))}
        </div>
      )}
      
      <motion.button
        className={`${getButtonClasses()} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
        {icon && <span>{icon}</span>}
      </motion.button>
    </div>
  )
}

export default Button 