import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, notification, Modal } from 'antd';
import PropTypes from 'prop-types';
import { lateMess } from '../actions/dateAction';
import axios from 'axios';
import { messCutFetch } from '../actions/messCutAction';
import TableItemFeed from './TableItemFeed';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      danger: []
    };

    console.log('constructor', this.state.danger);
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;

    const messNumber = localStorage.getItem('messNumber');

    var data = {
      messNumber: messNumber,
      date: today
    };

    this.props.lateMess(data);

    const openNotification = () => {
      notification.open({
        message: 'YOUR LATE MESS IS SUCCESSFULL',
        description: 'Take the food as per mess number provided in the plate',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
      });
    };
    openNotification();
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    let messNumber = this.props.auth.user;

    // console.log(this.state.data);
    console.log('component did mount executed', messNumber);
    this.props.messCutFetch(messNumber);
    // axios.post('/getmesscut', { messNumber: messNumber }).then(res => {
    //   let dataTable = res.data.map(data => {
    //     return (
    //       <tr>
    //         <td>{data.fromDate}</td>
    //         <td>{data.toDate}</td>
    //       </tr>
    //     );
    //   });
    //   this.setState({ data: dataTable });
    // });
    // let messCutHistory = this.props.mess.messCutHistory;
    // let dataTable = messCutHistory.map(data => {
    //   return (
    //     <tr>
    //       <td>{data.fromDate}</td>
    //       <td>{data.toDate}</td>
    //     </tr>
    //   );
    // });

    this.setState({
      danger: this.props.mess.messCutHistory
    });
    console.log('danger', this.state.danger);
  }

  // lateMess(e) {
  //   e.preventDefault();

  //   var today = new Date();
  //   var dd = today.getDate();
  //   var mm = today.getMonth() + 1; //January is 0!
  //   var yyyy = today.getFullYear();

  //   if (dd < 10) {
  //     dd = '0' + dd;
  //   }

  //   if (mm < 10) {
  //     mm = '0' + mm;
  //   }

  //   today = dd + '-' + mm + '-' + yyyy;

  //   const messNumber = localStorage.getItem('messNumber');

  //   var data = {
  //     messNumber: messNumber,
  //     date: today
  //   };

  //   this.props.lateMess(data);

  //   const openNotification = () => {
  //     notification.open({
  //       message: 'YOUR LATE MESS IS SUCCESSFULL',
  //       description:
  //         'Take the food as per mess number provided in the plate,if you',
  //       icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
  //     });
  //   };
  //   openNotification();
  // }

  messcut(e) {
    e.preventDefault();
    this.props.history.push('/mess-cut');
  }

  logout() {
    axios.post('/logout').then(res => {
      console.log(res);
      localStorage.clear();
      window.location.href = '/';
    });
  }

  // tableData() {
  //   const { messCutHistory } = this.props.auth;

  //   console.log('inside table data', messCutHistory);

  //   // return messCutHistory.map(date => <TableItem key={date._id} date={date} />);
  // }

  render() {
    // const datesArray = JSON.stringify(dates);
    const { messCutHistory } = this.props.mess;
    //messCutHistory.map(date => console.log(date));

    // messCutHistory.messCutHistory.map(date => console.log(date));

    console.log('home', messCutHistory);

    // messCutHistory.map(date => console.log(date));

    // messCutHistory.map(date => console.log(date));

    // let dataTable = this.state.danger.map(data => {
    //   return (
    //     <tr>
    //       <td>{data.fromDate}</td>
    //       <td>{data.toDate}</td>
    //     </tr>
    //   );
    // });
    let tableContent;

    tableContent = <TableItemFeed messCutHistory={messCutHistory} />;

    return (
      <div className="home-section">
        <section className="section section-head">
          <div className="container">
            <div className="row">
              <div className="">
                <div
                  className="btn-large waves-effect lighten-effect blue lighten-2 col s12 m4"
                  onClick={this.messcut.bind(this)}
                >
                  mess cut
                </div>
              </div>
              <div className="">
                <div
                  className="btn-large waves-effect lighten-effect blue lighten-2 col s12 m4"
                  onClick={this.showModal.bind(this)}
                >
                  late mess
                </div>
                <Modal
                  title="LATE MESS"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p>Late mess is only available at dinner only</p>
                  <p>
                    Take the food as per mess number provided in the plate,if
                    you wasted the food you will be fined
                  </p>
                </Modal>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-middle">
          <div className="container">
            <div className="row">
              <div className="col s12 m4">
                <div className="card indigo lighten-1 messNumberCard">
                  <div className="card-content">
                    <p className="white-text">MESS NO</p>
                    <span className="messNumber">{this.props.auth.user}</span>
                  </div>
                </div>
              </div>
              <div className="col s12 m4 offset-m1 ">
                <p className="center" id="messcutHeading">
                  Mess-cut History
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>

                  <tbody>{tableContent}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="center">
            <div
              className="btn-large waves-effect lighten-effect red lighten-2 col s12 m4"
              onClick={this.logout.bind(this)}
            >
              log out
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  messCutFetch: PropTypes.func.isRequired,
  messCutHistory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  mess: state.mess
});

export default connect(
  mapStateToProps,
  { lateMess, messCutFetch }
)(Home);
