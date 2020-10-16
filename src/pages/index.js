import React from "react"
import DragDropContainer from "../components/DragDropContainer"
import { Provider } from "../utils/notesContext"

// TODO: Finish turning it into its own page

const Index = ({ data, location }) => {
  // instantiate a map of notes
  const noteMap = new Map()
  for (const brainNote of data.allBrainNote.nodes) {
    const key = "/" + brainNote.slug
    const value = {
      note: brainNote,
      status: "closed",
      isHovering: false,
    }
    if (brainNote.slug === data.brainNote.slug) {
      value.status = "open"
    }
    noteMap.set(key, value)
  }
  return (
    <Provider noteMap={noteMap} openNotes={[data.brainNote]}>
      <DragDropContainer location={location}></DragDropContainer>
    </Provider>
  )
}

export default Index

export const query = graphql`
  query {
    allBrainNote {
      nodes {
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
    brainNote(slug: { eq: "intro-note" }) {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
