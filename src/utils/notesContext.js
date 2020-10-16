import PropTypes from "prop-types"
import React, { createContext, useState } from "react"

export const Context = createContext({})

export const Provider = props => {
  // Initial values are obtained from the props
  const { noteMap: initNoteMap, openNotes: initNoteArr, children } = props

  // Use State to keep the values
  const [noteMap, setNoteMap] = useState(initNoteMap)
  // have empty array for empty column
  const [openNotes, setOpenNotes] = useState([initNoteArr, []])

  const setNoteAsOpen = slug => {
    // note map has the key set to the slug of a note
    const openingNote = noteMap.get(slug)
    if (openingNote.status === "open") return // note is already open
    openingNote.status = "open"

    const openingNoteArr = [openingNote.note]
    const openNotesCopy = Array.from(openNotes)

    if (openNotesCopy[openNotesCopy.length - 1].length === 0) {
      openNotesCopy.splice(openNotesCopy.length - 1, 0, openingNoteArr)
    } else {
      openNotesCopy.push(openingNoteArr)
    }
    setOpenNotes(openNotesCopy)
  }

  // Make the context object:
  const notesContext = {
    noteMap,
    setNoteMap,
    openNotes,
    setOpenNotes,
    setNoteAsOpen,
  }

  // pass the value in provider and return
  return <Context.Provider value={notesContext}>{children}</Context.Provider>
}

// A React component that subscribes to context changes.
// This lets you subscribe to a context within a function component.
export const { Consumer } = Context

Provider.propTypes = {
  noteMap: PropTypes.object,
  openNotes: PropTypes.array,
}

Provider.defaultProps = {
  noteMap: {},
  openNotes: [[]],
}
