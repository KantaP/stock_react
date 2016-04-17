import React from 'react';
import ReactDOM from 'react-dom';
import Button from './helpers/button.jsx';
import Input from './helpers/input.jsx';

class CatMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: '',
            removeSelect: '',
            removeDisabled: true
        };
        this.handlerClick = this.handlerClick.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerLoad = this.handlerLoad.bind(this);
        this.handlerSelect = this.handlerSelect.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
    }
    componentDidMount() {
        this.handlerLoad();
    }
    handlerLoad() {
        fetch('http://localhost:3000/api/categories', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                this.setState({
                    list: result
                });
            })
    }
    handlerClick(event) {
        if (this.state.value != "") {
            fetch('http://localhost:3000/api/category/add', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.value
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    alert(result.message);
                    this.handlerLoad();
                    this.setState({value: '',removeDisabled: true,removeSelect:''});
                })
        } else {
            alert('Please input something');
        }
    }
    handlerRemove(event) {
        if (this.state.removeSelect != "") {
            fetch(`http://localhost:3000/api/category/remove`, {
                method: 'delete',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.removeSelect
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    alert(result.message);
                    this.handlerLoad();
                    this.setState({value: '',removeDisabled: true,removeSelect:''});
                })
        } else {
            alert("Please select category");
        }
    }
    handlerChange(event) {
        this.setState({ value: event.target.value })
    }
    handlerSelect(event) {
        this.setState({ value: event.target.getAttribute("data-cat-name"), removeSelect: event.target.getAttribute("data-cat-id"), removeDisabled: false });
    }
    render() {
        return (
            <form className="form-inline">
                <h2>Categories</h2>
                <div className="row col-md-12">
                    <div className="form-group">
                        <Input
                            type="text"
                            class="form-control input-flat"
                            value={this.state.value}
                            placeHolder="Input Category...."
                            change={this.handlerChange} />
                    </div>
                    <Button type="button" class ="btn btn-primary btn-flat" title="ADD" click={this.handlerClick} />
                    <Button type="button" class ="btn btn-primary btn-flat" title="REMOVE" disabled={this.state.removeDisabled} click={this.handlerRemove} />
                </div>
                <p className="clearfix"></p>
                <div className="row col-md-12">
                    <ul>
                        {this.state.list.map((d, index) => {
                            return <li key={index}><a data-cat-name={d.name} data-cat-id={d._id} onClick={this.handlerSelect}  href="javascript:void(0)">{d.name}</a></li>
                        }) }
                    </ul>
                </div>
            </form>
        )
    }
}
ReactDOM.render(<CatMain />, document.getElementById("todo-cat"));
