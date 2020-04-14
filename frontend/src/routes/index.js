import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';

import Delivery from '../pages/Delivery';
import DeliveryProblem from '../pages/DeliveryProblem';
import Deliveryman from '../pages/Deliveryman';

import Recipient from '../pages/Recipient';
import RecipientEditNew from '../pages/Recipient/CreateEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/delivery" component={Delivery} isPrivate />
      <Route path="/delivery-problem" component={DeliveryProblem} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />

      <Route path="/recipients" component={Recipient} isPrivate />
      <Route path="/new-recipient" component={RecipientEditNew} isPrivate />
      <Route path="/recipient/:id" component={RecipientEditNew} isPrivate />
    </Switch>
  );
}
