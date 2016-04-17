import React from 'react';
class Input extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <input 
             type={this.props.type}
             className={this.props.class} 
             placeholder={this.props.placeHolder} 
             id={this.props.Id} 
             value={this.props.value} 
             onChange={this.props.change}
             data-state = {this.props.state} />
        )
    }
}

export default Input;