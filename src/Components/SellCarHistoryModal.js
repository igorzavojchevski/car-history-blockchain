import React from "react";
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class SellModal extends React.Component {
    constructor() {
        super();
        this.state={}
    }

    render() {
        return (<div className="static-modal">
        <Modal show={this.props.showSell}>
          <Modal.Header>
            <Modal.Title>How much do you want to list your car history for?</Modal.Title>
          </Modal.Header>
      
          <Modal.Body>
          <form><FormGroup
          controlId="formBasicText"
            >
          <ControlLabel>Car History Number {this.props.carNumber + 1}</ControlLabel>
          <FormControl
            type="number"
            placeholder="Enter your price"
            onChange={e => this.setState({price: e.target.value})}
          />
        </FormGroup></form>
        <br/>
        <ControlLabel>Car Service was made on 34000 KM</ControlLabel>
          <br/>
          <ControlLabel>Car Service details:</ControlLabel>
          <div>-Changed oil and engine oil filter</div>
          <div>-Replaced air cleaner filter</div>
          <div>-Inspected exchaust system</div>
          <div>-Replaced cabin filter</div>
          <div>-Replaced cabin filter</div>
          <div>-Inspected brake linings</div>
          <div>-Inspected front suspension, checked for cracks and leaks</div>
          <br/>
          <ControlLabel>Car owner at the moment of car service - Petko Petkovski</ControlLabel>
          <br/>
          </Modal.Body>
      
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Button bsStyle="primary" onClick={() => this.props.onSellClicked(this.state.carNumber, this.state.price)}>Sell</Button>
          </Modal.Footer>
        </Modal>
      </div>);
    }
}


  export default SellModal;