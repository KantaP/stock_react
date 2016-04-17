import React from 'react';
class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <button 
            className={this.props.class} 
            id={this.props.Id}
            type={this.props.type}
            onClick={this.props.click}
            disabled={this.props.disabled}>
                {this.props.title}
            </button>
        )
    }
}
export default Button;