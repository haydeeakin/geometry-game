import React from 'react'
import "./queue.css"

class Action extends React.Component{
    constructor(){
        super();
        this.state = {
            queue: [],
            
        }
    }

    render(){
        return(
            <div id="action">
                <h1 style={{color: "purple"}}>Moves</h1><br/>
                
            </div>
        )
    }
}
export default Action;