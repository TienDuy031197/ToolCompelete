import React, { Component } from 'react';

class ItemEditProject extends Component {
    rederDepartment = () => {
        let { arrayCategory } = this.props;
        Object.assign({}, arrayCategory);
        console.log("jkajsndkjascj", arrayCategory);
        return arrayCategory.map((value, index) => {
            switch (index) {
                case index:
                    return <option key={index} value={value}>{value}</option>
            }
        })
    }

    render() {
        return (
            <tr>
                <td><input type="text" className="form-control" value={this.props.editName} onChange={(event) => this.props.onChangeEditNameProject(event.target.value)} /></td>
                <td className="text-center">
                    <select className="form-control" value={this.props.editCategory} onChange={(event) => this.props.onChangeEditCategory(event.target.value)}>
                        {this.rederDepartment()}
                    </select>
                </td>
                <td>
                    <input type="color" value={this.props.editColor} onChange={(event) => this.props.onChangeEditColor(event.target.value)}></input>
                </td>
                <td>
                    <textarea type="text" value={this.props.editNote} onChange={(event) => this.props.onChangeEditNote(event.target.value)}>

                    </textarea>
                </td>
                <td>
                    <button onClick={() => this.props.onClickEditCancel()} type="button" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '30px', fontSize: '9px', marginRight: '2px' }}>cancel</button>
                    <button onClick={() => this.props.onClickSave()} type="button" className="btn btn-primary btn-sm" style={{ width: '32px', height: '30px', fontSize: '10px' }}>save</button>
                </td>
            </tr>
        );
    }
}

export default ItemEditProject;