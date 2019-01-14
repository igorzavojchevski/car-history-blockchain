import React from "react";
import { Thumbnail } from 'react-bootstrap';

class Landing extends React.Component {
    constructor() {
        super();
        this.state={}
    }

    render() {
        return (<div className="text-center landing">
            <Thumbnail src="/src/img/front_bg.png" alt="front_background" >
        <h3>Car History Blockchain Platform</h3>
        <p>Login or Sign up to continue</p>
        <p>&copy; Igor Zavojchevski</p>
        
      </Thumbnail>
      </div>);
    }
}


  export default Landing;