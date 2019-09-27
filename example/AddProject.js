import React, { Component } from 'react';
import NavCustom from './NavCustom';
import axios from 'axios';

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameProject: '',
            category: '',
            color: '',
            notes: ''
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        console.log("name", this.state.nameProject);
        console.log("category", this.state.category);
        console.log("color", this.state.color);
        console.log("notes", this.state.notes);
    }

    onSubmitForm = (e) => {
        axios({
            method: 'POST',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/project/create',
            data: {
                "nameProject": this.state.nameProject,
                "category": this.state.category,
                "color": this.state.color,
                "notes": this.state.notes
            }
        }).then(res => {
            console.log(res);
            alert("Them thanh cong!")
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        let { nameProject, category, color, notes } = this.state;
        return (
            <div>
                <NavCustom />
                <div className="container">
                    <div className="row about">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-6 sizeword">ADD PROJECT</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-6">
                            <form >
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputEmail1" className="fontsize">Name Project</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="nameProject"
                                            value={nameProject}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputPassword1" className="fontsize">Category</label>
                                    </div>
                                    <div className="col-8">
                                        <select className="form-control form-control-sm"
                                            name="category"
                                            value={category}
                                            onChange={this.onChange}
                                        >
                                            <option></option>
                                            <option>C1</option>
                                            <option>C2</option>
                                            <option>C3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputPassword1" className="fontsize">Color</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="color"
                                            value={color}
                                            className="form-control form-control-sm sizecolor"
                                            id="exampleInputPassword1"
                                            placeholder=""
                                            name="color"
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label for="exampleFormControlTextarea1" className="fontsize">Notes</label>
                                    </div>
                                    <div className="col-8">
                                        <textarea
                                            className="form-control form-control-sm"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            name="notes"
                                            value={notes}
                                            onChange={this.onChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3"></div>
                                    <div className="col-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={this.onSubmitForm}
                                        >Add Project</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProject;