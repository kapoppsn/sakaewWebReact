import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import './Create.css'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button, Dropdown, Navbar,DropdownButton, FormControl, Nav } from 'react-bootstrap';


class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      name: '',
      page: '',
      amount: '',
      size: '',
      format: '',
      color: '',
      value: '',
      address: '',
      tel:'',
      statusOrder: false,
      rand: Math.floor(Math.random() * 100000 + 1),
      showPopup: false
    };
  }

    togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = event => {
    this.setState({ value: event.target.value});
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { name, amount, size, format ,color, page, tel, address, statusOrder, rand} = this.state;

    confirmAlert({
      title: 'Confirm to submit',
    message: <text>หน้าที่: {this.state.amount}<br />
    ขนาดกระดาษ: {this.state.size}<br />
    จำนวนหน้า: {this.state.amount}<br />
    สี: {this.state.color}<br />
    รูปแบบการเข้าเล่ม: {this.state.format}<br />
    ที่อยู่: {this.state.address}<br />
    เบอร์ติดต่อ: {this.state.tel}</text>,
      buttons: [
        {
          label: 'Yes',
          onClick: ()=> this.ref.add({
            name,
            page,
            amount,
            size,
            format,
            color,
            tel,
            address,
            statusOrder,
            rand
          }).then((docRef) => {
            this.setState({
              name: '',
              page: '',
              amount: '',
              size: '',
              format: '',
              color: '',
              address: '',
              tel:'',
              statusOrder: '',
              rand: ''
            });
            this.props.history.push("/history")
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
        })
        },
        {
          label: 'No',
        }
      ]
    });
  };

  render() {
    const { name, amount, size, format, color, page, tel, address, statusOrder, rand} = this.state;
    return (
      <div class="container">
        <header>
            <Navbar className="navAll">
              <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/create">สร้างรายการสั่งทำ</Nav.Link>
                  <Nav.Link href="/history">ประวัติการสั่งทำ</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
              {/* <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse> */}
            </Navbar>
          </header>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-name">
              รายการสั่งทำ
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/history" class="btn btn-primary">ประวัติการสั่งทำ</Link></h4> */}
                <label>เลขที่คำสั่งซื้อ:</label>
                <label>{this.state.rand}</label>

            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="page">หน้าที่:</label>
                <input type="text" class="form-control" name="page" value={page} onChange={this.onChange} placeholder="All or 1-99" required/>
              </div>

              <div class="form-group">
                <label for="size">ขนาดกระดาษ:</label>
                <input type="text" class="form-control" name="size" value={size} onChange={this.onChange} placeholder="size" required/>
              </div>

              <div class="form-group">
                <label for="amount">จำนวนหน้า:</label>
                <input type="text" class="form-control" name="amount" value={amount} onChange={this.onChange} placeholder="amount" required/>
              </div>

              <div class="form-group">
              <label for="color">สี: </label>
                  <select name="color" value={color} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="color" required>
                    <option value="">select</option >
                    <option value="ขาว-ดำ">ขาว-ดำ</option >
                    <option value="สี">สี</option >
                </select >
            </div>

              <div class="form-group">
              <label for="format">รูปแบบการเข้าเล่ม: </label>
                  <select name="format" value={format} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="format" required>
                    <option value="">select</option >
                    <option value="สันกระดูกงู">สันกระดูกงู</option >
                    <option value="สันเกลียว">สันเกลียว</option >
                    <option value="ผลงาน">ผลงาน</option >
                    <option value="แลคซีน">แลคซีน</option >
                </select >
            </div>
              
            <div class="form-group">
                <label for="address">ที่อยู่:</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="address" required/>
              </div>

              <div class="form-group">
                <label for="tel">เบอร์ติดต่อ:</label>
                <input type="tel" class="form-control" name="tel" value={tel} onChange={this.onChange} placeholder="tel" required/>
              </div>
              <button type="submit" class="btn btn-success" name="statusOrder" value={statusOrder} onChange={this.onChange} >Submit</button>
              <h4><Link to="/">กลับ</Link></h4>

              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;