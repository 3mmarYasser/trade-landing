"use client"

import React from "react"

interface BubbleSVGProps {
  color1?: string
  color2?: string
  color3?: string
  className?: string
  width?: string | number
  height?: string | number
  reversed?: boolean
}

export const BubbleSVG = ({
  color1 = "#b3aef5", // purple
  color2 = "#ffa66b", // orange
  color3 = "#ffaac2", // pink
  className = "",
  width = "100%",
  height = "100%",
  reversed = false,
}: BubbleSVGProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 800 800" 
    className={className}
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    style={reversed ? { transform: 'scaleX(-1)' } : undefined}
  >
    <defs>
      <filter 
        id="bbblurry-filter" 
        x="-100%" 
        y="-100%" 
        width="400%" 
        height="400%" 
        filterUnits="objectBoundingBox" 
        primitiveUnits="userSpaceOnUse" 
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur 
          stdDeviation="20" 
          x="0%" 
          y="0%" 
          width="100%" 
          height="100%" 
          in="SourceGraphic" 
          edgeMode="none" 
          result="blur"
        ></feGaussianBlur>
      </filter>
    </defs>
    <g filter="url(#bbblurry-filter)">
      <ellipse rx="138.5" ry="150" cx="620.0839501167566" cy="513.4702077209053" fill={color3}></ellipse>
      <ellipse rx="138.5" ry="150" cx="259.11034741659466" cy="310.8806608081223" fill={color1}></ellipse>
      <ellipse rx="138.5" ry="150" cx="359.8345650662177" cy="546.9452614711207" fill={color2}></ellipse>
    </g>
  </svg>
);

export default BubbleSVG; 