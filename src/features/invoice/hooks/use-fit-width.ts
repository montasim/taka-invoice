import { useLayoutEffect, useRef, useState } from "react"

/**
 * Scale factor (≤ 1) that fits content of `contentWidth` px into the
 * observed element's width.
 */
export function useFitWidth<T extends HTMLElement>(contentWidth: number) {
  const ref = useRef<T>(null)
  const [scale, setScale] = useState(1)

  // Layout effect: measure before the first paint so the content never
  // flashes at full size and then shrinks.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = (width: number) => setScale(Math.min(1, width / contentWidth))
    fit(el.clientWidth)
    const observer = new ResizeObserver(([entry]) => fit(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [contentWidth])

  return { ref, scale }
}
