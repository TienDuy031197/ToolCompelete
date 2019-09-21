import React, { Component } from 'react';
import { Modal } from "antd"

class ListButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        }
    }
    render() {
        let {showModal} = this.state;
        return (
            <div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary" onClick={this.openAddResource}>Add Resource</button>
                    <button type="button" className="btn btn-secondary">Add Project</button>
                    <button type="button" className="btn btn-secondary">...</button>
                </div>
                <Modal
                    title="Thông tin yêu cầu"
                    visible={showModal}

                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                <div className="container">
                    <div className="row form-group">
                        <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                            Resource
                        </label>
                        <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                            
                        </label>
                    </div>
                    <div className="row form-group">
                        <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                            From
                        </label>
                        <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                            <input type="text" value="" className="newstyleFrom"></input>
                        </label>
                        <label className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-form-label">
                            to
                        </label>
                        <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                            <input type="text" value="" className="newstyleFrom"></input>
                        </label>
                    </div>
                    <div className="row form-group">
                        <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                            Time per day
                        </label>
                        <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-form-label">
                            <input type="text" value="" className="newstyleTime"></input>
                        </label>
                        <label className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-form-label">
                            to
                        </label>
                        <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                            <input type="text" value="" className="newstyleTime"></input>
                        </label>
                    </div>
                    <div className="row form-group">
                        <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                            Project
                        </label>
                        <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                            <input type="text" value="" ></input>
                        </label>
                    </div>
                    <div className="row form-group">
                        <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                            Detail
                        </label>
                        <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                            <textarea type="text" className="styleTextarea" value="" ></textarea>
                        </label>
                    </div>
                </div>
                </Modal>
            </div>
        );
    }

    openAddResource = () => {
        this.setState({
            showModal: true
        });
    }

    handleOk = () => {
        this.setState({
            showModal: false
        });
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        });
    }
}

export default ListButton;