"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

type Direction = "top" | "right" | "bottom" | "left"
type Alignment = "start" | "center" | "end"

interface DropdownPosition {
  direction: Direction
  alignment: Alignment
  x: number
  y: number
  transformOrigin: string
  isVisible: boolean
}

interface UseDropdownPositionProps {
  triggerRef: RefObject<HTMLElement>
  contentRef: RefObject<HTMLElement>
  preferredDirection?: Direction
  preferredAlignment?: Alignment
  offset?: number
  padding?: number
}


export function useDropdownPosition({
  triggerRef,
  contentRef,
  preferredDirection = "bottom",
  preferredAlignment = "start",
  offset = 8,
  padding = 16,
}: UseDropdownPositionProps): DropdownPosition & { updatePosition: () => void } {
  const [position, setPosition] = useState<DropdownPosition>({
    direction: preferredDirection,
    alignment: preferredAlignment,
    x: 0,
    y: 0,
    transformOrigin: "top left",
    isVisible: false,
  })

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) {
      return {
        direction: preferredDirection,
        alignment: preferredAlignment,
        x: 0,
        y: 0,
        transformOrigin: "top left",
        isVisible: false,
      }
    }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const spaceTop = triggerRect.top
    const spaceRight = viewportWidth - triggerRect.right
    const spaceBottom = viewportHeight - triggerRect.bottom
    const spaceLeft = triggerRect.left

    let direction = preferredDirection
    const contentWidth = contentRect.width
    const contentHeight = contentRect.height

    const hasSpaceTop = spaceTop >= contentHeight + padding
    const hasSpaceRight = spaceRight >= contentWidth + padding
    const hasSpaceBottom = spaceBottom >= contentHeight + padding
    const hasSpaceLeft = spaceLeft >= contentWidth + padding

    if (direction === "bottom" && !hasSpaceBottom) {
      if (hasSpaceTop) direction = "top"
      else if (hasSpaceRight) direction = "right"
      else if (hasSpaceLeft) direction = "left"
    } else if (direction === "top" && !hasSpaceTop) {
      if (hasSpaceBottom) direction = "bottom"
      else if (hasSpaceRight) direction = "right"
      else if (hasSpaceLeft) direction = "left"
    } else if (direction === "right" && !hasSpaceRight) {
      if (hasSpaceLeft) direction = "left"
      else if (hasSpaceBottom) direction = "bottom"
      else if (hasSpaceTop) direction = "top"
    } else if (direction === "left" && !hasSpaceLeft) {
      if (hasSpaceRight) direction = "right"
      else if (hasSpaceBottom) direction = "bottom"
      else if (hasSpaceTop) direction = "top"
    }

    let alignment = preferredAlignment

    let x = 0
    let y = 0
    let transformOrigin = ""

    if (direction === "bottom" || direction === "top") {
      if (alignment === "start") {
        x = triggerRect.left
        if (x + contentWidth > viewportWidth - padding) {
          x = Math.max(padding, viewportWidth - contentWidth - padding)
          alignment = "end"
        }
      } else if (alignment === "center") {
        x = triggerRect.left + triggerRect.width / 2 - contentWidth / 2
        if (x < padding) {
          x = padding
          alignment = "start"
        } else if (x + contentWidth > viewportWidth - padding) {
          x = viewportWidth - contentWidth - padding
          alignment = "end"
        }
      } else if (alignment === "end") {
        x = triggerRect.right - contentWidth
        if (x < padding) {
          x = padding
          alignment = "start"
        }
      }

      if (direction === "bottom") {
        y = triggerRect.bottom + offset
        transformOrigin = `${alignment} top`
      } else {
        y = triggerRect.top - contentHeight - offset
        transformOrigin = `${alignment} bottom`
      }
    } else {
      if (alignment === "start") {
        y = triggerRect.top
        if (y + contentHeight > viewportHeight - padding) {
          y = Math.max(padding, viewportHeight - contentHeight - padding)
          alignment = "end"
        }
      } else if (alignment === "center") {
        y = triggerRect.top + triggerRect.height / 2 - contentHeight / 2
        if (y < padding) {
          y = padding
          alignment = "start"
        } else if (y + contentHeight > viewportHeight - padding) {
          y = viewportHeight - contentHeight - padding
          alignment = "end"
        }
      } else if (alignment === "end") {
        y = triggerRect.bottom - contentHeight
        if (y < padding) {
          y = padding
          alignment = "start"
        }
      }

      if (direction === "right") {
        x = triggerRect.right + offset
        transformOrigin = `left ${alignment}`
      } else {
        x = triggerRect.left - contentWidth - offset
        transformOrigin = `right ${alignment}`
      }
    }

    return {
      direction,
      alignment,
      x,
      y,
      transformOrigin,
      isVisible: true,
    }
  }, [preferredDirection, preferredAlignment, offset, padding, triggerRef, contentRef]);

  const updatePosition = useCallback(() => {
    setPosition(calculatePosition())
  }, [calculatePosition]);

  useEffect(() => {
    const handleChange = () => {
      updatePosition()
    }

    window.addEventListener("resize", handleChange)
    window.addEventListener("scroll", handleChange)

    updatePosition()

    return () => {
      window.removeEventListener("resize", handleChange)
      window.removeEventListener("scroll", handleChange)
    }
  }, [updatePosition])

  return { ...position, updatePosition }
}
