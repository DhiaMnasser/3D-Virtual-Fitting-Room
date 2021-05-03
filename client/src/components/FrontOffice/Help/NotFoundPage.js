import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from './img/PageNotFound.png';
class NotFoundPage extends React.Component{
    render(){
        return <div>
            <img src={PageNotFound}  />
            <p style={{textAlign:"center"}}>
              <Link to="/Home">Go to Home </Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;