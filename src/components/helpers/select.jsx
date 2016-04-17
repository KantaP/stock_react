import React from 'react';
class Select extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        fetch(this.props.source,{
            method: this.props.method,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                this.setState({list: data});
            })
    }
    render(){
        return(
            <select
             className={this.props.class}
             onChange={this.props.change}
             data-state={this.props.state}
             value={this.props.value}>
             {this.state.list.map((d,index)=>{
                 return <option key={index} value={d._id}>{d.name}</option>
             })}
            </select>
        )
    }
}
export default Select;