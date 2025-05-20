"use client"

import { useState, ReactNode } from "react"
import { ChevronDown, ChevronRight, Plus, Trash2, Pencil } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/Dropdown"

interface WatchlistItem {
  symbol: string
  bid: string
  ask: string
  spread: string
  isExpanded?: boolean
  subItems?: WatchlistItem[]
  isSection?: boolean
  items?: WatchlistItem[]
}

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    height: 0,
    transition: { duration: 0.15 }
  }
}

const hoverVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.15 }
  }
}

const HoverTools = ({ 
  isHovered, 
  onRemove
}: { 
  isHovered: boolean, 
  onRemove?: () => void 
}) => (
  <AnimatePresence>
    {isHovered && (
      <motion.div 
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={hoverVariants}
        className="absolute inset-0 flex space-x-2 justify-end items-center bg-black/15 backdrop-blur-sm max-w-[100px] p-4 ml-auto"
      >
        <button className="text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center">
          <Pencil size={16} strokeWidth={2} />
        </button>
        <button 
          className="text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center" 
          onClick={onRemove}
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
)

const WatchlistItemContent = ({ 
  item, 
  indentLevel = 0,
  onRemove,
  isHovered
}: { 
  item: WatchlistItem,
  indentLevel?: number,
  onRemove?: () => void,
  isHovered: boolean
}) => (
  <div className="grid grid-cols-4 py-2 text-white text-xs font-normal items-center cursor-pointer border-b border-gray-800 last:border-b-0 relative">
    <div className="flex items-center">
      <span className={`truncate ml-${indentLevel * 2 + (indentLevel > 0 ? 2 : 0)}`}>{item.symbol}</span>
    </div>
    <div className="text-center">{item.bid}</div>
    <div className="text-green-500 text-center">{item.ask}</div>
    <div className="text-center">
      <span className="text-gray-400">{item.spread}</span>
    </div>
    
    <HoverTools isHovered={isHovered} onRemove={onRemove} />
  </div>
)

const ExpandableContent = ({
  isExpanded,
  children
}: {
  isExpanded: boolean,
  children: ReactNode
}) => (
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={itemVariants}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export default function Watchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([
    { 
      symbol: "EUR / USD", 
      bid: "1.13322", 
      ask: "1.13322", 
      spread: "14", 
      isExpanded: false,
      subItems: [
        { symbol: "EUR / USD 1H", bid: "1.13320", ask: "1.13325", spread: "15" },
        { symbol: "EUR / USD 4H", bid: "1.13318", ask: "1.13327", spread: "17" }
      ]
    },
    { symbol: "GBP / USD", bid: "1.13322", ask: "1.13322", spread: "14" },
    { symbol: "GBP / AUD", bid: "", ask: "", spread: "" },
    {
      isSection: true,
      symbol: "Section",
      bid: "",
      ask: "",
      spread: "",
      isExpanded: false,
      items: [{ symbol: "GBP / AUD", bid: "", ask: "", spread: "" }]
    }
  ])

  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isEmpty, setIsEmpty] = useState(false)

  const toggleExpansion = (index: number) => {
    setItems(items.map((item, idx) => 
      idx === index ? { ...item, isExpanded: !item.isExpanded } : item
    ))
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index))
    if (items.length <= 1) {
      setIsEmpty(true)
    }
  }

  const clearList = () => {
    setItems([])
    setIsEmpty(true)
  }

  return (
    <div className="bg-black rounded-[28px] overflow-hidden relative min-h-[300px] w-full font-normal flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-800">
        <div className="flex items-center">
          <span className="text-white text-lg sm:text-2xl font-normal">Watchlist</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-2 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center outline-none">
                <ChevronDown size={20} strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pencil size={16} className="mr-3 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center" />
                <span>Rename</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onSelect={clearList}>
                <Trash2 size={16} className="mr-3 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center" />
                <span>Clear List</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="mr-3 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4V20M4 12H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Add Section</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="mr-3 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6H20M4 10H20M4 14H20M4 18H12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 18H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Create New List</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="mr-3 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6H20M4 10H20M4 14H12M4 18H12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 14L20 14M16 18L20 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Duplicate List</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-blue-400">
                  <div className="mr-3 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6H20M4 10H20M4 14H20M4 18H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>My Lists</span>
                </DropdownMenuSubTrigger>
                
                <DropdownMenuSubContent>
                  {["List 1", "List 2", "List 3", "List 4"].map((list, index) => (
                    <DropdownMenuItem key={`list-${index}`} className="flex justify-between">
                      <span>{list}</span>
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          <Pencil size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center justify-center">
          <Plus size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="grid grid-cols-4 px-4 sm:px-6 py-3 text-gray-500 text-xs sm:text-sm font-normal tracking-wide uppercase">
        <div className="text-center">Symbol</div>
        <div className="text-center">Bid</div>
        <div className="text-center">Ask</div>
        <div className="text-center">Spread</div>
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center h-[200px] sm:h-[300px] px-4 sm:px-6 text-center">
          <p className="text-white text-sm sm:text-base font-normal">
            You don&apos;t have any symbols in your watchlist. You can add symbols from above.
          </p>
        </div>
      ) : (
        <div className="px-4 sm:px-6 overflow-y-auto flex-grow">
          {items.map((item, index) => (
            <div key={`item-${index}`}>
              {item.isSection ? (
                <div
                  className="flex items-center py-2 text-white text-xs font-normal cursor-pointer border-b border-gray-800 last:border-b-0 relative"
                  onClick={() => toggleExpansion(index)}
                  onMouseEnter={() => setHoveredItem(`section-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    initial={{ rotate: item.isExpanded ? 90 : 0 }}
                    animate={{ rotate: item.isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mr-2 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.5 11L5.5 6L0.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span>{item.symbol}</span>
                  
                  <HoverTools 
                    isHovered={hoveredItem === `section-${index}`} 
                    onRemove={() => removeItem(index)} 
                  />
                </div>
              ) : (
                <div
                  className="grid grid-cols-4 py-2 text-white text-xs font-normal items-center cursor-pointer border-b border-gray-800 last:border-b-0 relative"
                  onMouseEnter={() => setHoveredItem(`item-${index}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center">
                    {item.subItems && (
                      <motion.button 
                        onClick={(e) => {e.stopPropagation(); toggleExpansion(index)}} 
                        initial={{ rotate: item.isExpanded ? 90 : 0 }}
                        animate={{ rotate: item.isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mr-2 text-gray-500 hover:text-white transition-colors duration-200 flex items-center justify-center"
                      >
                      <ChevronRight size={16} strokeWidth={2} />
                      </motion.button>
                    )}
                    <span className={`truncate ${!item.subItems ? "ml-6" : ""}`}>{item.symbol}</span>
              </div>
              <div className="text-center">{item.bid}</div>
              <div className="text-green-500 text-center">{item.ask}</div>
                  <div className="text-center">
                <span className="text-gray-400">{item.spread}</span>
                  </div>
                  
                  <HoverTools 
                    isHovered={hoveredItem === `item-${index}`} 
                    onRemove={() => removeItem(index)} 
                  />
                  </div>
                )}

              <ExpandableContent isExpanded={!!(item.isExpanded && !item.isSection && item.subItems)}>
                {item.subItems?.map((subItem, subIndex) => (
                  <div
                    key={`subitem-${index}-${subIndex}`}
                    onMouseEnter={() => setHoveredItem(`subitem-${index}-${subIndex}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <WatchlistItemContent 
                      item={subItem} 
                      indentLevel={2}
                      isHovered={hoveredItem === `subitem-${index}-${subIndex}`}
                    />
              </div>
                ))}
              </ExpandableContent>

              <ExpandableContent isExpanded={!!(item.isSection && item.isExpanded && item.items)}>
                {item.items?.map((sectionItem, itemIndex) => (
                  <div
                    key={`section-${index}-item-${itemIndex}`}
                    onMouseEnter={() => setHoveredItem(`section-${index}-item-${itemIndex}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <WatchlistItemContent 
                      item={sectionItem}
                      indentLevel={1}
                      isHovered={hoveredItem === `section-${index}-item-${itemIndex}`}
                    />
                  </div>
                ))}
              </ExpandableContent>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
