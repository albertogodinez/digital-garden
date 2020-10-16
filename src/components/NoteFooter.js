/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from "theme-ui"
import useWindowWidth from "../utils/useWindowWidth"
import { LinkToDraggableNote } from "./CustomLinkToDraggable"
import styles from "./noteLayout.module.css"

const NoteFooter = ({ references }) => {
  const [width] = useWindowWidth()

  if (references.length > 0) {
    const RefLink = width < 768 ? Link : LinkToDraggableNote
    return (
      <div className={styles.noteFooter}>
        <h3 className={styles.header}>Links to this note</h3>
        {references.map(reference => {
          return (
            <RefLink
              className={styles.refLink}
              to={`/${reference.slug}`}
              key={reference.slug}
            >
              <div style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}>
                <h4 style={{ margin: 0 }}>{reference.title}</h4>
                <p style={{ fontWeight: 200, margin: 0 }}>
                  {reference.childMdx.excerpt}
                </p>
              </div>
            </RefLink>
          )
        })}
      </div>
    )
  }
  return null
}

export default NoteFooter
