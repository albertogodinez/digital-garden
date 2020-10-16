/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from "theme-ui"
import { LinkToDraggableNote } from "./CustomLinkToDraggable"
import styles from "./noteLayout.module.css"
import Tippy from "./Tippy"

const AnchorTag = ({ href, popups = {}, noPopups = false, ...restProps }) => {
  if (!href) href = restProps.to
  if (!href.match(/^http/))
    return noPopups ? (
      <Link {...restProps} to={href} className={styles.internalLink} />
    ) : (
      <Tippy
        content={popups[href.replace(/^\//, "")]}
        placement="right"
        animation="shift-away"
      >
        <LinkToDraggableNote
          {...restProps}
          to={href}
          className={styles.internalLink}
        />
      </Tippy>
    )
  return <a {...restProps} href={href} />
}

export default {
  a: AnchorTag,
}
