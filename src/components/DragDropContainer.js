import React, { useContext } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import ColumnDroppable from "../components/columnDroppable"
import SEO from "../components/seo"
import { Consumer, Context } from "../utils/notesContext"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const DragDropContainer = ({ location }) => {
  // get the current value in UsersContext through the hook
  const notesContext = useContext(Context)
  const { openNotes, setOpenNotes } = notesContext

  function onDragStart(result) {
    console.log(result)
  }

  function onDragEnd(result) {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    const sourceIdx = +source.droppableId
    const destIdx = +destination.droppableId

    if (sourceIdx === destIdx) {
      const items = reorder(
        openNotes[sourceIdx],
        source.index,
        destination.index
      )
      const newState = [...openNotes]
      newState[sourceIdx] = items
      setOpenNotes(newState)
    } else {
      const result = move(
        openNotes[sourceIdx],
        openNotes[destIdx],
        source,
        destination
      )
      const newState = [...openNotes]
      newState[sourceIdx] = result[sourceIdx]
      newState[destIdx] = result[destIdx]

      /**
       * The following makes sure that we only have one column open on the right
       */
      let right = newState.length - 1
      let emptyRightCol = 0

      while (right >= 0 && newState[right].length === 0) {
        emptyRightCol++
        if (emptyRightCol > 1) {
          newState.splice(right, 1)
          right--
        }
        right--
      }
      if (emptyRightCol === 0) {
        newState.push([])
      }
      console.log(newState)

      setOpenNotes(newState)
    }
  }
  return (
    <div>
      <SEO title="All posts" />
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Consumer>
          {(context = []) => (
            <div style={{ display: "flex" }}>
              {context.openNotes.map((noteList, ind) => (
                <ColumnDroppable
                  key={ind}
                  index={ind}
                  noteList={noteList}
                  location={location}
                />
              ))}
            </div>
          )}
        </Consumer>
      </DragDropContext>
    </div>
  )
}

export default DragDropContainer
