import React from "react"
// import SEO from "../../../components/SEO"
import NoteContainer from "../components/noteContainer"

const Note = props => {
  const noteTitle = props.data.brainNote.title

  return (
    <NoteContainer
      title={noteTitle}
      note={props.data.brainNote}
      noteId={props.data.brainNote.slug}
      location={props.location}
      slug={props.pageContext.slug}
    >
      {/* <SEO title={siteTitle} description={props.data.description} /> */}
    </NoteContainer>
  )
}

export default Note
export const query = graphql`
  query BrainNoteWithRefsBySlug($slug: String!) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      childMdx {
        body
      }
      inboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
      outboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
    }
  }
`
