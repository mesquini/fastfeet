import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';

import Delivery from '../pages/Delivery';
import DeliveryEditNew from '../pages/Delivery/CreateEdit';

import DeliveryProblem from '../pages/DeliveryProblem';

import Deliveryman from '../pages/Deliveryman';
import DeliverymanEditNew from '../pages/Deliveryman/CreateEdit';

import Recipient from '../pages/Recipient';
import RecipientEditNew from '../pages/Recipient/CreateEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/deliveries" component={Delivery} isPrivate />
      <Route path="/new-delivery" component={DeliveryEditNew} isPrivate />
      <Route path="/delivery/:id" component={DeliveryEditNew} isPrivate />

      <Route path="/delivery-problem" component={DeliveryProblem} isPrivate />

      <Route path="/deliverymanes" component={Deliveryman} isPrivate />
      <Route path="/new-deliveryman" component={DeliverymanEditNew} isPrivate />
      <Route path="/deliveryman/:id" component={DeliverymanEditNew} isPrivate />

      <Route path="/recipients" component={Recipient} isPrivate />
      <Route path="/new-recipient" component={RecipientEditNew} isPrivate />
      <Route path="/recipient/:id" component={RecipientEditNew} isPrivate />
    </Switch>
  );
}
