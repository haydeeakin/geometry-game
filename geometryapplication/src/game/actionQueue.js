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
            <div id="action" >
                <h1 style={{color: "purple"}}>Moves</h1><br/>
                <div style={{height: 500}}>Display list of actions from user inputs</div>
                <div>
                    <input type="button" className="buttons btnExecute" value=" "></input>

                </div>
            </div>
        )
    }
}
export default Action;