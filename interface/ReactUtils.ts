import React = require('react')

interface CSSProperties extends React.CSSProperties {
    azimuth?: string
    backgroundAttachment?: string
    backgroundColor?: string
    backgroundImage?: string
    backgroundPosition?: string
    backgroundRepeat?: string
    background?: string
    borderCollapse?: string
    borderColor?: string
    borderSpacing?: string
    borderStyle?: string
    borderTop?: string
    borderRight?: string
    borderBottom?: string
    borderLeft?: string
    borderTopColor?: string
    borderRightColor?: string
    borderBottomColor?: string
    borderLeftColor?: string
    borderTopStyle?: string
    borderRightStyle?: string
    borderBottomStyle?: string
    borderLeftStyle?: string
    borderTopWidth?: string
    borderRightWidth?: string
    borderBottomWidth?: string
    borderLeftWidth?: string
    borderWidth?: string
    border?: string
    bottom?: string
    captionSide?: string
    clear?: string
    clip?: string
    color?: string
    content?: string
    counterIncrement?: string | number
    counterReset?: string | number
    cueAfter?: string
    cueBefore?: string
    cue?: string
    cursor?: string
    direction?: string
    display?: string
    elevation?: string
    emptyCells?: string
    float?: string
    fontFamily?: string
    fontSize?: string | number
    fontStyle?: string
    fontVariant?: string
    fontWeight?: string
    font?: string
    height?: string | number
    left?: string | number
    letterSpacing?: string
    lineHeight?: string
    listStyleImage?: string
    listStylePosition?: string
    listStyleType?: string
    listStyle?: string
    marginRight?: string | number
    marginLeft?: string | number
    marginTop?: string | number
    marginBottom?: string | number
    margin?: string | number
    maxHeight?: string | number
    maxWidth?: string | number
    minHeight?: string | number
    minWidth?: string | number
    outlineColor?: string
    outlineStyle?: string
    outlineWidth?: string
    outline?: string
    overflow?: string
    paddingTop?: string | number
    paddingRight?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number
    padding?: string | number
    pageBreakAfter?: string
    pageBreakBefore?: string
    pageBreakInside?: string
    pauseAfter?: string
    pauseBefore?: string
    pause?: string
    pitchRange?: string
    pitch?: string
    playDuring?: string
    position?: string
    quotes?: string
    richness?: string
    right?: string | number
    speakHeader?: string
    speakNumeral?: string
    speakPunctuation?: string
    speak?: string
    speechRate?: string
    stress?: string
    tableLayout?: string
    textAlign?: string
    textDecoration?: string
    textIndent?: string
    textTransform?: string
    top?: string | number
    unicodeBidi?: string
    verticalAlign?: string
    visibility?: string
    voiceFamily?: string
    volume?: string
    whiteSpace?: string
    width?: string | number
    wordSpacing?: string
}

export function CSS(css: CSSProperties) {
    return css;
}