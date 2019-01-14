import React from "react";
import {
  code, Badge, ButtonToolbar, Button
} from 'react-bootstrap';

const Car = ({ car, onBuyClicked, onSellClicked, onTakeOffMarketClicked, onDetailsClicked }) => {
  if (!car) {
    return null;
  }
  let forSaleBySomeElse = car.forSale && car.owner !== car.userId;
  let forSaleByLoggedInUser = car.forSale && car.owner === car.userId;
  let ownedByLoggedInUser = car.owner.toUpperCase() === car.userId.toUpperCase();
  return (
    <div>
      <code>Car History {car.carNumber}</code>
      {car.forSale ? <Badge className="badge" pullRight>For Sale ({car.price} Eth)</Badge> : null}
      <ButtonToolbar className="toolbar">
        {car.forSale && !ownedByLoggedInUser ? 
        <Button className="pull-right" bsStyle="primary" bsSize="xsmall" onClick={() => onBuyClicked(car.id, car.price)}>
          Buy
        </Button> : null}
        {!car.forSale && ownedByLoggedInUser ? 
        <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={() => onSellClicked(car.id)}>
          Sell
        </Button> : null}
        {ownedByLoggedInUser ? 
        <Button className="pull-left" bsStyle="info" bsSize="xsmall" onClick={() => onDetailsClicked(car.id)}>
          Car History Details
        </Button> : null}
        {car.forSale && ownedByLoggedInUser ? 
        <Button className="pull-right" bsStyle="warning" bsSize="xsmall" onClick={() => onTakeOffMarketClicked(car.id)}>
          Take Car History Off the Market
        </Button> : null}
      </ButtonToolbar>
    </div>
  )
}

export default Car;