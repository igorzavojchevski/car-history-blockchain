import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'react-bootstrap';
import MainNav from './Components/Navbar';
import Cars from './Components/Cars';
import LoginModal from './Components/LoginModal';
import SignupModal from './Components/SignupModal';
import SellModal from './Components/SellCarHistoryModal';
import ViewModal from './Components/ViewCarHistoryModal';
import Header from './Components/Header';
import Landing from './Components/Landing';
import { connect } from 'react-redux';
import { login, logout, signup, buyCar, sellCar, takeOffMarket, carDetails } from "./actions"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showSignup: false,
      showSell: false,
      showView: false
    };
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.userId != nextProps.userId) {
      this.setState({ showLogin: false, showSignup: false, showSell: false });
    }
  }

  render() {
    return (
      <div>
        <MainNav onLoginClicked={() => this.setState({ showLogin: true })}
          onSignupClicked={() => this.setState({ showSignup: true })}
          userId={this.props.userId}
          onLogoutClicked={this.props.logout} />
        <div className="container">
          {this.props.userId ? <Header /> : null}
        </div>
        {this.props.userId ? null :
          <Landing />}
        {this.props.userId && this.props.contractAddressValid ?
          <Cars cars={this.props.properties} userId={this.props.userId}
            onBuyClicked={(carId, price) => this.props.buyCar(this.props.contractInstance, carId, price, this.props.userId)}
            onSellClicked={carId => this.setState({ carToSell: carId, showSell: true })}
            onTakeOffMarketClicked={carId => this.props.takeOffMarket(this.props.contractInstance, carId, this.props.userId)}
            onDetailsClicked={carId => { this.setState({ carToSell: carId, showView: true }); this.props.carDetails(this.props.contractInstance, carId, this.props.userId); }}/> :
          null}
        <LoginModal showLogin={this.state.showLogin}
          onClose={() => this.setState({ showLogin: false })}
          onLoginClicked={(address, password) => this.props.login(address, password)} />
        <SignupModal showSignup={this.state.showSignup}
          onClose={() => this.setState({ showSignup: false })}
          onsignupClicked={(password) => this.props.signup(password)} />
        <SellModal showSell={this.state.showSell}
          carNumber={this.state.carToSell}
          onClose={() => this.setState({ showSell: false })}
          onSellClicked={(carIndex, price) => {
            this.props.sellCar(this.props.contractInstance, this.state.carToSell, price, this.props.userId);
            this.setState({ showSell: false });
          }} />
        <ViewModal showView={this.state.showView}
          carNumber={this.state.carToSell}
          onClose={() => this.setState({ showView: false })}
          onDetailsClicked={(carIndex, price) => {
            this.props.carDetails(this.props.contractInstance, this.state.carToSell, this.props.userId);
            this.setState({ showView: false });
          }}
           />
      </div>
    );
  }
}

let mapStateToProps = (state, props) => {
  return {
    properties: state.properties,
    userId: state.userId,
    contractAddressValid: state.contract ? state.contract.contractAddressValid : false,
    contractInstance: state.contract ? state.contract.contractInstance : null
  }
}

export default connect(mapStateToProps, { login, logout, signup, buyCar, sellCar, takeOffMarket, carDetails })(App);

