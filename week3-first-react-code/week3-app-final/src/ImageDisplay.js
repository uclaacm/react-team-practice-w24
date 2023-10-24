import React from 'react'

function ImageDisplay(props) {
    return (
        <img src={props.url} alt={props.alt} width={props.width} />
    )
}

export default ImageDisplay