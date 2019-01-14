import React from "react";
import { Grid, Row, Col, code, Badge, ButtonToolbar, Button } from 'react-bootstrap';
import Car from './Car'

const Cars = ({ cars, userId, onBuyClicked, onSellClicked, onTakeOffMarketClicked, onDetailsClicked }) => {
  if(!cars || cars.length === 0){
    return null;
  }
  if(cars){
    if(cars[0].carName == undefined){
      // cars[0].carName = "Skoda Octavia";
      // cars[0].carManufactureYear = "2006";
      // cars[0].carBoughtFrom = "Porsche Macedonia"
      // cars[0].carKM = "180 000";
      cars[0].carName = "Fiat 500";
      cars[0].carManufactureYear = "2012";
      cars[0].carBoughtFrom = "Fiat Macedonia"
      cars[0].carKM = "50 000";
    }
  }
  return (
    <Grid>
      <div class="col-lg-12">
        <div class="text-center carName"> {cars[0].carName} ({cars[0].carManufactureYear}) </div>
        <div class="text-center carKM"> {cars[0].carKM} KM </div>
        <div class="text-center carBoughtFrom margin-bottom-10"> Initially bought from {cars[0].carBoughtFrom} </div>
        <button class="btn btn-primary pull-right margin-top-minus-85">New Service</button>
      </div>
      <Row className="show-grid">
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[0], id:0, carNumber: 1, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>  
        {/* <div className="middle">
            <button className="middle_button xs">Car History Info</button>
        </div> */}
        </Col>
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[1], id:1, carNumber: 2, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[2], id:2, carNumber: 3, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col className="car road-bottom road-top road-left road-right" xs={4}>
        <Car car={{...cars[3], id:3, carNumber: 4, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-bottom road-top road-left road-right" xs={4}>
        <Car car={{...cars[4], id:4, carNumber: 5, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-bottom road-top road-left road-right" xs={4}>
        <Car car={{...cars[5], id:5, carNumber: 6, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
      </Row>

      {/* <Row className="show-grid">
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[6], id:6, carNumber: 7, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[7], id:7, carNumber: 8, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[8], id:8, carNumber: 9, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
      </Row> */}

      {/* <Row className="show-grid">
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[9], id:9, carNumber: 10, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[10], id:10, carNumber: 11, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
        <Col className="car road-top road-left road-right" xs={4}>
        <Car car={{...cars[11], id:11, carNumber: 12, userId}} onBuyClicked={onBuyClicked} onSellClicked={onSellClicked} onTakeOffMarketClicked={onTakeOffMarketClicked} onDetailsClicked={onDetailsClicked}/>
        </Col>
      </Row> */}
      <div className="margin-bottom-10">&nbsp;</div>
    </Grid>
  )
}

export default Cars;