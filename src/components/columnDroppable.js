/**
 * Will be a column that is Droppable where all notes can be dropped in
 */

import PropTypes from "prop-types"
import React from "react"
import { Droppable } from "react-beautiful-dnd"
import NoteContainer from "./noteContainer"

const ColumnDroppable = ({ index, noteList, location }) => {
  return (
    <Droppable key={index} droppableId={`${index}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            //todo: make this reusable
            backgroundColor: snapshot.isDraggingOver ? "#adced7" : "#f3f5f8",
            width: 625,
            minWidth: 625,
            padding: 1,
          }}
        >
          {noteList.map((note, noteIdx) => (
            <NoteContainer
              key={note.title}
              title={note.title}
              note={note}
              noteId={note.title}
              location={location}
              slug={note.slug}
              noteIdx={noteIdx}
            ></NoteContainer>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

ColumnDroppable.propTypes = {
  index: PropTypes.node.isRequired,
}

export default ColumnDroppable
