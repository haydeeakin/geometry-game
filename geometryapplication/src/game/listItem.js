import React from 'react'

function ListItem(props){
    return(
        <div style={{color: "black", fontSize:21, textAlign:"left", paddingLeft: 10}}>
            {props.typeTransform}: {props.type} {props.value} {props.location}
        </div>
    )
}
export default ListItem