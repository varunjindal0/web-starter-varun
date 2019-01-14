import React, { Component } from 'react';

import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { RESTAURANT_QUERY } from '../../graphql/queries';

import * as ROUTES from '../../utils/routes';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class RestDetails extends Component {

  render() {
    const { restId } = this.props;

    return (
      <Query
        query={RESTAURANT_QUERY}
        variables={{
          id: restId
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
          if (data.restaurant) {
            return (
              <div className="rest-page">
                {JSON.stringify(data.restaurant)}
                <hr />
                <Link to={ROUTES.SEARCH}><Button onSubmit = {this.handleGoBack}> Go Back </Button></Link>
              </div>
              
            );
          }

          // No Data Return
          return <div>No Rest Data</div>;
        }}
      </Query>
    );
  }
}

export default RestDetails;
