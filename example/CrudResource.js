import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
// import logo from './logo.svg';
//import './App.css';
import Item from './Item';
import ItemEdit from './ItemEdit';
import SweetAlert from 'sweetalert-react';
import './../node_modules/sweetalert/dist/sweetalert.css';
import axios from 'axios';
import NavCustom from './NavCustom';
import { configConsumerProps } from 'antd/lib/config-provider';
import { Modal } from "antd"

class CrudResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: [],
      itemEdit: [],
      idEdit: '',
      arrayDepartment: ["PB1", "PB2", "PB3"],
      arrayJobTile: ["CD1", "CD2", "CD3"],
      arraySkill: ["Java", "Nodejs", "Reactjs"],
      editDepartment: '',
      editName: '',
      editEmail: '',
      editJobTitle: '',
      editSkill: '',
      editNote: '',

      showModal: false,
      fullname: '',
      email: '',
      department: '',
      job_title: '',
      skill: '',
      notes: ''
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource',
      data: null
    }).then(res => {
      console.log("Res", res);
      this.setState({
        showList: res.data.resource
      });

    }).catch(err => {
      console.log(err);
    });
  }

  handleDelete = (obj) => {
    let { showList } = this.state;
    console.log("testdata", this.state.showList);
    console.log("id", obj._id);
    axios({
      method: 'DELETE',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/' + obj._id,
      data: {

      }
    }).then(res => {
      console.log(res);
      if (showList.length > 0) {
        for (let i = 0; i < showList.length; i++) {
          if (showList[i]._id === obj._id) {
            showList.splice(i, 1);
            break;
          }
        }
      }
      this.setState({
        showList: showList,
      });
      alert("Xoa thanh cong!");
    }).catch(err => {
      console.log(err);
    });
  }

  handleEdit = (obj) => {
    this.setState({
      itemEdit: obj,
      idEdit: obj._id,
      department: obj.department,
      editName: obj.resourceName,
      editDepartment: obj.department,
      editEmail: obj.email,
      editJobTitle: obj.jobTitle,
      editSkill: obj.skill,
      editNote: obj.notes,
    });
    console.log("item", this.state.itemEdit);
    console.log("id", this.state.idEdit);
  }

  onChangeEditDepartment = (value) => {
    this.setState({
      editDepartment: value,
    })
  }

  onChangeEditNameResource = (value) => {
    console.log("name resource", value);
    this.setState({
      editName: value,
    });
  }

  onChangeEditEmail = (value) => {
    this.setState({
      editEmail: value,
    })
  }

  onChangeEditJobTitle = (value) => {
    this.setState({
      editJobTitle: value,
    })
  }

  onChangeEditSkill = (value) => {
    this.setState({
      editSkill: value
    })
  }

  onChangeEditNote = (value) => {
    this.setState({
      editNote: value
    })
  }

  onClickEditCancel = () => {
    this.setState({
      idEdit: '',
    })
  }

  onClickSave = () => {
    let { showList, editDepartment, editName, editEmail, editJobTitle, editSkill, editNote, idEdit } = this.state;
    axios({
      method: 'PUT',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/' + idEdit,
      data: {
        "resourceName": editName,
        "email": editEmail,
        "department": editDepartment,
        "jobTitle": editJobTitle,
        "skill": editSkill,
        "notes": editNote
      }
    }).then(res => {
      console.log("aaaaaaaaaaaaa", res);
      for (let i = 0; i < showList.length; i++) {
        if (idEdit === showList[i]._id) {
          showList[i].resourceName = editName;
          showList[i].email = editEmail;
          showList[i].department = editDepartment;
          showList[i].jobTitle = editJobTitle;
          showList[i].skill = editSkill;
          showList[i].notes = editNote;
          break;
        }
      }
      this.setState({
        showList: showList,
        idEdit: '',
      })
      alert("Sua thanh cong!");
    }).catch(err => {
      console.log(err);
    });

  }

  rederItem = () => {
    let { showList, idEdit, itemEdit, arrayDepartment, arrayJobTile, arraySkill, editName, editDepartment, editEmail, editJobTitle, editSkill, editNote } = this.state;

    return showList.map((object, i) => {
      if (object._id === idEdit) {
        return (
          <ItemEdit
            key={i}
            itemEdit={itemEdit}
            arrayDepartment={arrayDepartment}
            arrayJobTile={arrayJobTile}
            arraySkill={arraySkill}
            editName={editName}
            editDepartment={editDepartment}
            editEmail={editEmail}
            editJobTitle={editJobTitle}
            editSkill={editSkill}
            editNote={editNote}
            onChangeEditDepartment={this.onChangeEditDepartment}
            onChangeEditNameResource={this.onChangeEditNameResource}
            onChangeEditEmail={this.onChangeEditEmail}
            onChangeEditJobTitle={this.onChangeEditJobTitle}
            onChangeEditSkill={this.onChangeEditSkill}
            onChangeEditNote={this.onChangeEditNote}
            onClickEditCancel={this.onClickEditCancel}
            onClickSave={this.onClickSave}
          />
        )
      }
      return <Item
        obj={object}
        key={i}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEdit}
      />
    });
  }

  openModal = () => {
    this.setState({
      showModal: true,
    })
  }

  handleOk = () => {
    let {showList, fullname, email, department, job_title, skill, notes } = this.state;
    axios({
      method: 'POST',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/create',
      data: {
          "resourceName":fullname,
          "email":email,
          "department":department,
          "jobTitle":job_title,
          "skill":skill,
          "notes":notes
      }
  }).then(res => {
      console.log(res);
      let addList = {resourceName:fullname,email:email,department:department,jobTitle:job_title,skill:skill,notes:notes};
      showList.push(addList);
      this.setState({
        showList:showList,
        showModal:false,
      });
      alert("Them thanh cong!");
  }).catch(err => {
      console.log(err);
  });
  }

  handleCancel = () => {
    this.setState({
      showModal: false,
    })
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    let { fullname, email, department, job_title, skill, notes } = this.state;
    return (
      <div>
        <NavCustom />
        <div className="container">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8"><h2>Resource <b>Details</b></h2></div>
                <div className="col-sm-4">
                  <button type="button" onClick={this.openModal} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Skill</th>
                  <th>Notes</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {this.rederItem()}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          title="ADD RESOURCE"
          visible={this.state.showModal}

          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="container">
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
          </div>
        </Modal>
      </div>
    );
  }
}

export default CrudResource;
