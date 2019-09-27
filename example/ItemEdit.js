import React, { Component } from 'react';

class ItemEdit extends Component {
    rederDepartment = () => {
        let { arrayDepartment } = this.props;
        Object.assign({}, arrayDepartment);
        console.log("jkajsndkjascj", arrayDepartment);
        return arrayDepartment.map((value, index) => {
            switch (index) {
                case index:
                    return <option key={index} value={value}>{value}</option>
            }
        })
    }

    renderJobTile = () => {
        let { arrayJobTile } = this.props;
        Object.assign({}, arrayJobTile);
        console.log("jkajsndkjascj", arrayJobTile);
        return arrayJobTile.map((value, index) => {
            switch (index) {
                case index:
                    return <option key={index} value={value}>{value}</option>
            }
        })
    }

    renderSkill = () => {
        let { arraySkill } = this.props;
        Object.assign({}, arraySkill);
        console.log("jkajsndkjascj", arraySkill);
        return arraySkill.map((value, index) => {
            switch (index) {
                case index:
                    return <option key={index} value={value}>{value}</option>
            }
        })
    }

    render() {
        return (
            <tr>
                <td><input type="text" className="form-control" value={this.props.editName} onChange={(event) => this.props.onChangeEditNameResource(event.target.value)}/></td>
                <td><input type="text" className="form-control" value={this.props.editEmail} onChange={(event) => this.props.onChangeEditEmail(event.target.value)}/></td>
                <td className="text-center">
                    <select className="form-control" value={this.props.editDepartment} onChange={(event) => this.props.onChangeEditDepartment(event.target.value)}>
                        {this.rederDepartment()}
                    </select>
                </td>
                <td>
                    <select className="form-control" value={this.props.editJobTitle} onChange={(event) => this.props.onChangeEditJobTitle(event.target.value)}>
                        {this.renderJobTile()}
                    </select>
                </td>
                <td>
                    <select className="form-control" value={this.props.editSkill} onChange={(event) => this.props.onChangeEditSkill(event.target.value)}>
                        {this.renderSkill()}
                    </select>
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

export default ItemEdit;