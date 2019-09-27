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



  render() {
    return (
      <div>
        <NavCustom />
        <div className="container">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8"><h2>Resource <b>Details</b></h2></div>
                <div className="col-sm-4">
                  {/* <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button> */}
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
      </div>
    );
  }
}

export default CrudResource;
