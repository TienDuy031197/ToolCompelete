import React, { Component } from 'react';
import axios from 'axios';

class ItemProject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.nameProject}</td>
                <td>{this.props.obj.category}</td>
                <td><input type="color" value={this.props.obj.color}></input></td>
                {/* <td>{this.props.obj.color}</td> */}
                <td>{this.props.obj.notes}</td>
                <td>
                    <button onClick={() => this.props.handleDelete(this.props.obj)} type="button" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '30px', fontSize: '9px', marginRight: '2px' }}>delete</button>
                    <button onClick={() => this.props.handleEdit(this.props.obj)} type="button" className="btn btn-primary btn-sm" style={{ width: '32px', height: '30px', fontSize: '10px' }}>Edit</button>
                </td>

            </tr>
        );
    }
}

export default ItemProject;