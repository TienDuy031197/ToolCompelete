import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
// import logo from './logo.svg';
//import './App.css';
import ItemProject from './ItemProject';
import SweetAlert from 'sweetalert-react';
import './../node_modules/sweetalert/dist/sweetalert.css';
import axios from 'axios';
import NavCustom from './NavCustom';
import { configConsumerProps } from 'antd/lib/config-provider';
import ItemEditProject from './ItemEditProject';

class CrudProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: [],
      itemEdit: [],
      idEdit: '',
      editName: '',
      editCategory: '',
      editColor: '',
      editNote: '',
      arrayCategory: ["C1", "C2", "C3"],
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/project',
      data: null
    }).then(res => {
      console.log("Res", res);
      this.setState({
        showList: res.data.project
      });
      console.log("data", this.state.showList);

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
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/project/' + obj._id,
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
      editName: obj.nameProject,
      editCategory: obj.category,
      editColor: obj.color,
      editNote: obj.notes,
    })
    console.log("itemEdit", this.state.itemEdit);
  }

  onChangeEditNameProject = (value) => {
    this.setState({
      editName: value,
    })
  }

  onChangeEditCategory = (value) => {
    this.setState({
      editCategory: value,
    })
  }

  onChangeEditColor = (value) => {
    this.setState({
      editColor: value,
    })
  }

  onChangeEditNote = (value) => {
    this.setState({
      editNote: value,
    })
  }

  onClickEditCancel = () => {
    this.setState({
      idEdit: '',
    })
  }

  onClickSave = () => {
    let { showList, idEdit, editName, editCategory, editColor, editNote } = this.state;
    axios({
      method: 'PUT',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/project/' + idEdit,
      data: {
        "nameProject": editName,
        "category": editCategory,
        "color": editColor,
        "notes": editNote,
      }
    }).then(res => {
      console.log("aaaaaaaaaaaaa", res);
      for (let i = 0; i < showList.length; i++) {
        if (idEdit === showList[i]._id) {
          showList[i].nameProject = editName;
          showList[i].category = editCategory;
          showList[i].color = editColor;
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
    let { showList, itemEdit, idEdit, editName, editCategory, editColor, editNote, arrayCategory } = this.state;

    return showList.map((object, i) => {
      if (object._id === idEdit) {
        return <ItemEditProject
          key={i}
          itemEdit={itemEdit}
          arrayCategory={arrayCategory}
          editName={editName}
          editCategory={editCategory}
          editColor={editColor}
          editNote={editNote}
          onChangeEditNameProject={this.onChangeEditNameProject}
          onChangeEditCategory={this.onChangeEditCategory}
          onChangeEditColor={this.onChangeEditColor}
          onChangeEditNote={this.onChangeEditNote}
          onClickEditCancel={this.onClickEditCancel}
          onClickSave={this.onClickSave}
        />
      }
      return <ItemProject
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
                <div className="col-sm-8"><h2>Project <b>Details</b></h2></div>
                <div className="col-sm-4">
                  {/* <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button> */}
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name Project</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Notes</th>
                  <th>Action</th>
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

export default CrudProject;
