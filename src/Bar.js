import React from 'react'

export const Bar = ({data}) => {

   let style = {}
   style.backgroundColor = data.color
   style.height = data.value + "px"

    return (
        <div className="bar" style={style} id={data.i} ></div>
    )
}
