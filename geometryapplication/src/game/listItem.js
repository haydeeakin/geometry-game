import React from 'react'

function ListItem(props){
    return(
        <div style={{color: "white", fontSize:25, textAlign:"left"}}>
            Translation: {props.type} {props.value} {props.location}
        </div>
    )
}
export default ListItem