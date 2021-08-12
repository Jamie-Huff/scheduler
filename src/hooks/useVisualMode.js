import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // show different states of the GUI depending on what buttons the user clicks, options are found in index.js
  const transition = (update, replace = false) => {
    if (replace) {
      history.pop()
    }
    history.push(update)
    setHistory(history)
    return setMode(update)
  }
  const back = () => {
    if (history.length > 1) {
      history.pop()
      setHistory(history)
    }
    return setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}