import React from "react";
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class ViewModal extends React.Component {
    constructor() {
        super();
        this.state={}
    }

    render() {
        return (<div className="static-modal">
        <Modal show={this.props.showView}>
          <Modal.Header>
            <Modal.Title>Fiat 500 - Car History Number {this.props.carNumber + 1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <form><FormGroup
          controlId="formBasicText"
            > */}
          {/* <ControlLabel>Car History Number {this.props.carNumber + 1}</ControlLabel> */}
          <br/>
          {/* <ControlLabel>Car Service was made on {this.props.carkm} KM</ControlLabel> */}
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
          {/* <FormControl
            type="number"
            placeholder="TEST"
            onChange={e => this.setState({price: e.target.value})}
          />
        </FormGroup></form> */}
          </Modal.Body>
      
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Cancel</Button>
            {/* <Button bsStyle="primary" onClick={() => this.props.onSellClicked(this.state.carNumber, this.state.price)}>Sell</Button> */}
          </Modal.Footer>
        </Modal>
      </div>);
    }
}


  export default ViewModal;