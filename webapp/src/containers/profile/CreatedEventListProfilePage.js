

import React, { Component } from 'react';

const EventList = (props) => (
    <h1> MY LIST </h1>
)

const CreatedEventListProfilePage = (props) => (
    <EventList
      service={'created'}
      status={'all'}
    />
)