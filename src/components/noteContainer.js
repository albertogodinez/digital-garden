import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Move } from "react-feather"
import BrainNote from "../@aengusm/gatsby-theme-brain/components/BrainNote"
import styles from "./noteLayout.module.css"

const NoteContainer = ({ location, title, slug, note, noteId, noteIdx }) => {
  // todo: got the scroll into view to work. A few things to implement:
  /**
   *- Create a method that fetches latest updated note
   *  - note that was last opened
   */
  const noteRef = React.useRef(null)
  React.useEffect(() => {
    if (slug === "test") {
      noteRef.current.scrollIntoView({ behavior: "smooth" })
    }
  })
  return (
    <Draggable key={noteId} draggableId={noteId} index={noteIdx}>
      {(provided, snapshot) => (
        <div
          className={styles.note}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            // todo: find a way to make this more reusable
            backgroundColor: "#fffff",
            // backgroundColor: isNoteHovering ? "#ffffff" : "blue",
            // backgroundColor: snapshot.isDragging ? "lightblue" : "#ffffff",
            ...provided.draggableProps.style,
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
            <div ref={noteRef} {...provided.dragHandleProps}>
              <Move />
            </div>
          </header>
          <BrainNote note={note} />
          {/* <p>isNoteHovering: {{ isNoteHovering }}</p> */}
          {/* <main>{children}</main> */}
          {/* <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer> */}
        </div>
      )}
    </Draggable>
  )
}

export default NoteContainer
