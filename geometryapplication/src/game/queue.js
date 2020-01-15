import React from 'react'
import "./queue.css"

class Queue extends React.Component{
    constructor(){
        super();
        this.state = {
            queue: [],
            interface: 'translation'        //default new transformation
        }
    }
    render(){
        return(
            <div id="actionQueue">
                <h1>Action Queue</h1><br/>
                <select>
                    <option value="translation">Translation</option>
                    <option value="rotation">Rotation</option>
                    <option value="reflection">Reflection</option>
                </select>
            </div>
        )
    }
}
export default Queue;