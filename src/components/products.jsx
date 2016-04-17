import React from 'react';
import ReactDOM from 'react-dom';
import Button from './helpers/button.jsx';
import Input from './helpers/input.jsx';
import Select from './helpers/select.jsx';

class ProductAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: 0,
            price: 0,
            catSelect: 0,
            productList: [],
            catList: [],
            removeDisabled: true,
            removeSelect: ''
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handlerSelect = this.handlerSelect.bind(this);
        this.handlerLoad();
    }
    handlerChange(event) {
        if (event.target.getAttribute("data-state") == "name") this.setState({ name: event.target.value })
        if (event.target.getAttribute("data-state") == "amount") this.setState({ amount: event.target.value })
        if (event.target.getAttribute("data-state") == "price") this.setState({ price: event.target.value })
        if (event.target.getAttribute("data-state") == "catSelect") this.setState({ catSelect: event.target.value })
    }
    handlerLoad() {
        fetch('http://localhost:3000/api/stocks', {
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
                    productList: result
                });
            })

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
                    catList: result
                });
            })
    }
    handlerClick(event) {
        if (this.state.name != '' && this.state.amount != 0 && this.state.price != 0) {
            fetch('http://localhost:3000/api/stock/add', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    catId: this.state.catSelect,
                    total: this.state.amount,
                    price: this.state.price
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    alert(result.message);
                    this.handlerLoad();
                    this.setState({ name: '', catSelect: '', amount: 0, price: 0, removeDisabled: true, removeSelect: '' });
                })
        }
    }
    handlerRemove(event) {
        if (this.state.removeSelect != "") {
            fetch(`http://localhost:3000/api/stock/remove`, {
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
                    this.setState({ name: '', catSelect: '', amount: 0, price: 0, removeDisabled: true, removeSelect: '' });
                })
        } else {
            alert("Please select category");
        }
    }
    handlerSelect(event) {
        fetch(`http://localhost:3000/api/stock/${event.target.getAttribute("data-pro-id")}`, {
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
                    name: result.name,
                    removeSelect: result._id,
                    amount: result.total,
                    price: result.price,
                    catSelect: result.catId,
                    removeDisabled: false
                });
            })

    }
    render() {
        return (
            <form className="form-inline">
                <h2>Products</h2>
                <div className="row col-md-12">
                    <div className="form-group">
                        <Input
                            type="text"
                            class="form-control input-flat"
                            value={this.state.name}
                            state = "name"
                            placeHolder="Input Product...."
                            change={this.handlerChange} />
                        <Input
                            type="number"
                            class="form-control input-flat"
                            state = "amount"
                            value={this.state.amount}
                            change={this.handlerChange} />
                        <Input
                            type="number"
                            class="form-control input-flat"
                            value={this.state.price}
                            state = "price"
                            change={this.handlerChange} />
                        <Select source="http://localhost:3000/api/categories" method="get" class="form-control input-flat" state="catSelect" 
                                value={this.state.catSelect} change={this.handlerChange}  />
                    </div>
                    <Button type="button" class ="btn btn-primary btn-flat" title="ADD" click={this.handlerClick} />
                    <Button type="button" class ="btn btn-primary btn-flat" title="REMOVE" disabled={this.state.removeDisabled} click={this.handlerRemove} />
                </div>
                <div className="row col-md-12">
                    <ul>
                        {this.state.productList.map((d, index) => {
                            return <li key={index}>
                                <a 
                                    data-pro-id={d._id}
                                    onClick={this.handlerSelect}
                                    href="javascript:void(0)">{d.name}
                                </a>
                            </li>
                        }) }
                    </ul>
                </div>
            </form>
        )
    }
}

ReactDOM.render(<ProductAdd />, document.getElementById('todo-pro'));