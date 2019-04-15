import { useState, useRef, useEffect } from 'react'

export function useMeasure() {
    const ref = useRef()
    const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
    const [ro] = useState(() => new ResizeObserver(entries => {
        for (let entry of entries) {
            set(entry.contentRect);
        }
    }));
    useEffect(() => {
      if (ref.current) ro.observe(ref.current)
      return () => ro.disconnect()
    }, [])
    return [{ ref }, bounds]
  }

  export function usePrevious(value) {
    const ref = useRef()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
  }