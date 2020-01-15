import React from 'react'

class Queue extends React.Component{
    constructor(){
        this.state = {
            queue: [],
            interface: 'translation'        //default new transformation
        }
    }
    render(){
        return(
            <div id="actionQueue">
                Action Queue
                <select>
                    <option value="translation">Translation</option>
                    <option value="rotation">Rotation</option>
                    <option value="reflection">Reflection</option>
                </select>
            </div>
        )
    }
}