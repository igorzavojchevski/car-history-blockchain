import React from "react";
import { Jumbotron, ControlLabel, FormControl, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeContractAddress, clearContractAddress } from "../actions"

class Header extends React.Component {
    constructor(props) {
        super(props);

        // this.props = {
        //     showBuySellAlert: false
        // }

        this.state = {
            showAlert: true,
            showBuySellAlertModal: true,
        }
        this.onkeyPress = this.onkeyPress.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
    }

    onkeyPress(evt) {
        if (evt.keyCode == 13) {
            this.props.changeContractAddress(evt.target.value);
        }
    }

    changeAddress() {
        this.props.clearContractAddress();
    }

    dismissAlert() {
        this.setState({ showAlert: false });
        this.setState({ showBuySellAlertModal: false });
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.contractAddress !== this.props.contractAddress) {
            this.setState({ showAlert: true });
            this.setState({ showBuySellAlertModal: true });
        }
    }

    render() {
        return (

            <Jumbotron className="header">
                <div className="text-center">
                    <ControlLabel className="text-left full-width">Chassis number</ControlLabel>
                    {this.props.contractAddress && this.props.contractAddressValid ?
                        // <span className="pull-left"><label>{this.props.contractAddress == undefined ? "" : "TMBJG7NE6E0122334"}</label>
                        <span className="pull-left"><label>{this.props.contractAddress == undefined ? "" : "ZFA31200000541563"}</label>
                        <Button onClick={this.changeAddress} bsStyle="link">Change</Button></span>
                        : <FormControl
                            type="text"
                            placeholder="Enter your chassis (VIN) number and press enter."
                            onKeyDown={this.onkeyPress}
                        />}
                    {this.state.showAlert && this.props.contractAddress && !this.props.contractAddressValid ?
                        <Alert bsStyle="danger" onDismiss={this.dismissAlert}>
                            <h4>Oh snap!</h4>
                            <p>
                                The chasssis number (VIN) you entered is not valid.
                            </p>
                        </Alert> : null}
                </div>
                {this.state.showBuySellAlertModal && this.props.showBuySellAlert && !this.props.isBought ?
                        <Alert bsStyle="danger" onDismiss={this.dismissAlert}>
                            <p>
                                Buying car History Failed.
                            </p>
                        </Alert> : null}
            </Jumbotron>
        );
    }
}

let mapStateToProps = (state, props) => {
    return {
        contractAddress: state.contract ? state.contract.contractAddress : null,
        contractAddressValid: state.contract ? state.contract.contractAddressValid : false,
        isBought: state.contract ? state.contract.isBought : false,
        showBuySellAlert: state.contract ? state.contract.showBuySellAlert : false
    }
}

export default connect(mapStateToProps, {changeContractAddress, clearContractAddress })(Header);