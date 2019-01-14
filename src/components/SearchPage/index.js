import React, { Component } from 'react';

import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';

import './index.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia'

import { IconContext } from 'react-icons'
import { MdDirectionsWalk, MdLocationOn, MdStar, MdFiberManualRecord } from 'react-icons/md';

import * as ROUTES from '../../utils/routes';
import { Link } from 'react-router-dom';

import Map from '../Map.js'

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAfiscRoTi4EHAno__kZRqZ_B8FFLZd7Ck");
Geocode.enableDebug();

// <Typography color="textSecondary" gutterBottom>
//               Word of the Day
//             </Typography>
//             <Typography color="textSecondary">
//               adjective
//             </Typography>

 //         <img src={this.props.data.images ? this.props.data.images[0]: ''} alt="Smiley face" />



class MyCard extends Component {

  handleTitleClick = ()=>{
        this.props.history.push(ROUTES.REST + '/' + this.props.data.id)
  }

  render(){
    return (
      <div >
        <Card className = "Card" >
          <CardContent className = "CardContent">
            <Typography component="p">
              <IconContext.Provider value={{ color: "blue"}}>
                <MdLocationOn />
              </IconContext.Provider>
             <Link style = {{textDecoration: 'none', color: 'black'}} to={{ pathname: ROUTES.REST + '/' + this.props.data.id }}> {this.props.data.title ? this.props.data.title : 'Washoe Public House'} </Link>
            </Typography>
            <Typography component="p" style={{color: 'lighblue'}}>
              <span style={{fontSize: '12px', color: 'blue'}}>{this.props.data.cuisine ? this.props.data.cuisine : 'American Style Food'}</span>
            </Typography>
            <Typography style={{marginTop: '10px', fontSize: 'fit-width'}}>
              <MdStar />
              <span>Featured in NY Magzine... +2</span>
            </Typography>
          </CardContent>
          <img
            className= 'CardMedia'
            width="60"
            height = '128'
            src={this.props.data.images ? this.props.data.images[0] : 'https://hips.hearstapps.com/del.h-cdn.co/assets/16/21/1464036871-delish-summer-salads-chicken-fajita.jpg'}
            alt = "No Image Available"
          />            
        </Card>
        <div style={{fontSize: '14px', color: 'blue', width: '350px', margin: 'auto', display: 'flex', justifyContent: 'space-between'}}>
          <div>
          {this.props.data.open_closed ? this.props.data.open_closed : 'Open'}
          <span>{" "}</span>
          <IconContext.Provider value={{ color: "blue", className: "global-class-name", size: '0.5em'  }}>
              <MdFiberManualRecord />
           </IconContext.Provider>
           <span>{" "}</span>
           {this.props.data.distance ? Math.round( Number(this.props.data.distance) * 10 ) / 10 + " miles away" : 'Nearby'}
        </div>
         <div>
          <MdDirectionsWalk />
          <span style={{color: 'black'}}>{" " + this.props.data.distance ? Math.round( Number(this.props.data.distance) * 10 ) : 'Around 10'}<span style={{fontSize: '8px'}}>min</span></span>
          {" "}<MdStar />
          <span style={{color: 'black'}}>{" " + this.props.data.rating ? this.props.data.rating : 'None'}<span style={{fontSize: '8px'}}>/5</span></span>
         </div> 
        </div>
      </div>  
        
      )
  }
}

class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {address: 'chicago', lat: null, lng: null}
  }
  // componentDidMount(){
  //   Geocode.fromAddress(this.state.address).then(
  //     response => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log("************************************************ " + lat, lng);
  //       this.setState({lat: lat, lng: lng});
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   )
  // }

  catchReturnForLocationSearch = (e)=>{
    if (e.charCode == 13) {
        // alert('Enter... (KeyPress, use charCode)' + e.target.value);
      const newAddress = e.target.value;
      Geocode.fromAddress(e.target.value).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("************************************************ " + lat, lng);
        this.setState({address: newAddress, lat: lat, lng: lng})
      },
      error => {
        console.error("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^: " + error);
      }
    )


      }
  }

  render() {
    
    return (
      // Variables can be either lat and lon OR address
      <Query
        query={RESTAURANT_SEARCH_QUERY}
        variables={{
          address: this.state.address
        }}
      >
        {({ loading, error, data = {} }) => {
          if (loading) {
            return <CircularProgress />;
          }

          console.log('DO SOMETHING SMART WITH THIS DATA');
          console.log('data', data);
          console.log('error', error);

          // Make sure we have data
          if (
            data.search_restaurants
            && data.search_restaurants.results
            && data.search_restaurants.results.length > 0
          ) {
            return (
            <div className="FullScreen">
              <div className="LeftSide">
                {
                  data.search_restaurants.results.map((r) => {
                    return <MyCard data={r} />;
                  })
                }
              </div>
              <div className="RightSide">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
                  <div style={{alignItems: 'center'}}>
                    <Button>
                       <MdLocationOn />
                       Use my location 
                    </Button>
                    <TextField
                      id="outlined-search"
                      label="Search food in your area"
                      type="search"
                      className= ''
                      variant="outlined"
                      onKeyPress={this.catchReturnForLocationSearch}
                    />
                  </div>
                  <div>
                    <Button> Login </Button>
                    <Button> SignUp </Button>
                  </div>
                </div>
                <Map currLat={this.state.lat} currLng={this.state.lng} data = {data.search_restaurants.results} />
              </div>
            </div>  
            );
          }

          // No Data Return
          return <div>No Results</div>;
        }}
      </Query>
    );
  }
}

export default SearchPage;
