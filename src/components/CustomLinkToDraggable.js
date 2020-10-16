import { Link } from "gatsby"
import React, { useCallback, useContext } from "react"
import { Context } from "../utils/notesContext"

/**
 * prevents link default functionality and adds it to
 * state of opened notes
 */
export const LinkToDraggableNote = React.forwardRef(
  ({ to, onClick, onMouseLeave, onMouseEnter, ...restProps }, ref) => {
    const notesContext = useContext(Context)
    const { setNoteAsOpen } = notesContext

    const onClickHandler = ev => {
      ev.preventDefault()
      const isMac = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0

      /* Override command + click on MacOS and Ctrl + click on other OS */
      if ((isMac && ev.metaKey) || (!isMac && ev.ctrlKey))
        window.open(to, "_blank")
      setNoteAsOpen(to)
    }

    const onMouseEnterHandler = useCallback(
      ev => {
        // highlightStackedPage(to, true)
        if (onMouseEnter) {
          onMouseEnter(ev)
        }
      },
      [to, onMouseEnter]
    )

    const onMouseLeaveHandler = useCallback(
      ev => {
        // highlightStackedPage(to, false)
        if (onMouseLeave) {
          onMouseLeave(ev)
        }
      },
      [to, onMouseLeave]
    )

    return (
      <Link
        {...restProps}
        to={to}
        ref={ref}
        onClick={onClickHandler}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
    )
  }
)
