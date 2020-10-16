/** @jsx jsx */
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { jsx, ThemeProvider } from "theme-ui"
import components from "../../../components/MdxComponent"
import NoteFooter from "../../../components/NoteFooter"
import theme from "../../../theme"
import useWindowWidth from "../../../utils/useWindowWidth"
import Popover from "./../../../components/Popover"

export default ({ note }, pageContext) => {
  const [width] = useWindowWidth()

  const popups = {}
  if (note.outboundReferenceNotes) {
    note.outboundReferenceNotes
      .filter(reference => !!reference.childMdx.excerpt)
      .forEach((ln, i) => {
        popups[ln.slug] = <Popover reference={ln} />
      })
  }

  const AnchorTagWithPopups = props => (
    <components.a {...props} popups={popups} />
  )

  let references = []
  let referenceBlock
  if (note.inboundReferencePreviews != null) {
    references = note.inboundReferencePreviews.map(ref => (
      <li>
        <a href={ref.source}>{ref.source}</a>
        <br />
        <div dangerouslySetInnerHTML={{ __html: ref.previewHtml }} />
      </li>
    ))

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h1>Linked References</h1>
          <ul>{references}</ul>
        </>
      )
    }
  }

  return (
    <ThemeProvider
      theme={theme}
      components={{ ...components, a: AnchorTagWithPopups }}
    >
      <h1>{note.title}</h1>
      <MDXRenderer>{note.childMdx.body}</MDXRenderer>
      <NoteFooter references={note.inboundReferenceNotes} />
    </ThemeProvider>
  )
}
