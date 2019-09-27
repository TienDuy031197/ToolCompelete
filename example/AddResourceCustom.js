import React, { Component } from 'react';
import NavCustom from './NavCustom'
import './Basiccss.css';
import axios from 'axios';

class AddResourceCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            department: '',
            job_title: '',
            skill: '',
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
    }

    onClickResource = (e) => {
        axios({
            method: 'POST',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/create',
            data: {
                "resourceName":this.state.fullname,
                "email":this.state.email,
                "department":this.state.department,
                "jobTitle":this.state.job_title,
                "skill":this.state.skill,
                "notes":this.state.notes
            }
        }).then(res => {
            console.log(res);
            alert("Them thanh cong!");
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        let { fullname, email, department, job_title, skill, color, notes } = this.state;
        return (
            <div>
                <NavCustom />
                <div className="container">
                    <div className="row about">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-6 sizeword">ADD RESOURCE</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-6">
                            <form>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputEmail1" className="fontsize">Full Name</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="fullname"
                                            value={fullname}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputPassword1" className="fontsize">Email</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            id="exampleInputPassword1"
                                            placeholder=""
                                            name="email"
                                            value={email}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputPassword1" className="fontsize">Department</label>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            className="form-control form-control-sm"
                                            name="department"
                                            value={department}
                                            onChange={this.onChange}
                                        >
                                            <option></option>
                                            <option>PB1</option>
                                            <option>PB2</option>
                                            <option>PB3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputPassword1" className="fontsize">Job Title</label>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            className="form-control form-control-sm"
                                            name="job_title"
                                            value={job_title}
                                            onChange={this.onChange}
                                        >
                                            <option></option>
                                            <option>CD1</option>
                                            <option>CD2</option>
                                            <option>CD3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label htmlFor="exampleInputPassword1" className="fontsize">Skill</label>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            className="form-control form-control-sm"
                                            name="skill"
                                            value={skill}
                                            onChange={this.onChange}
                                        >
                                            <option></option>
                                            <option>Java</option>
                                            <option>Nodejs</option>
                                            <option>React</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="row form-group">
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
                                </div> */}
                                <div className="row form-group">
                                    <div className="col-3">
                                        <label for="exampleFormControlTextarea1" className="fontsize">Notes</label>
                                    </div>
                                    <div className="col-8">
                                        <textarea
                                            class="form-control form-control-sm"
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
                                        <button type="button" className="btn btn-primary" onClick={this.onClickResource}>Add Resource</button>
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

export default AddResourceCustom;