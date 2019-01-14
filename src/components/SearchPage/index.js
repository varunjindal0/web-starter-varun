import React, { Component } from 'react';

import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';

import './index.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia'

import { IconContext } from 'react-icons'
import { MdDirectionsWalk, MdLocationOn, MdStar, MdFiberManualRecord } from 'react-icons/md';

// <Typography color="textSecondary" gutterBottom>
//               Word of the Day
//             </Typography>
//             <Typography color="textSecondary">
//               adjective
//             </Typography>

 //         <img src={this.props.data.images ? this.props.data.images[0]: ''} alt="Smiley face" />



class MyCard extends Component {
  render(){
    return (
      <div >
        <Card className = "Card" >
          <CardContent className = "CardContent">
            <Typography component="p">
              <IconContext.Provider value={{ color: "blue"}}>
                <MdLocationOn />
              </IconContext.Provider>
             <span style={{fontSize: 'fit-width'}}> {this.props.data.title ? this.props.data.title : 'Washoe Public House'} </span>
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
            height = '110'
            src={this.props.data.images ? this.props.data.images[0] : 'https://hips.hearstapps.com/del.h-cdn.co/assets/16/21/1464036871-delish-summer-salads-chicken-fajita.jpg'}
            alt = "No Image Available"
          />            
        </Card>
        <div style={{fontSize: '14px', color: 'blue', marginLeft: '10px', display: 'flex', justifyContent: 'space-between', marginRight: '15px'}}>
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
    this.state = {address: 'chicago'}
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
