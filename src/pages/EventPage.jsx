/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react';
import Event from '../components/Event.jsx';
import { useOutletContext } from 'react-router-dom';
import { getAllEvents } from '../API/api.js';

/*=====================================================
EventPage
=====================================================*/
const EventPage = () => {
  /*================================
  States
  ================================*/
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [setIsLoading] = useOutletContext();

  /*================================
  Loading events
  ================================*/
  useEffect(() => {
    loadEvents()
  }, []);

  async function loadEvents() {
    setIsLoading(true);
    try {
      const data = await getAllEvents();
      setEvents(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  /*================================
  Event elements
  ================================*/
  // Sorting the events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const eventElements = sortedEvents.map((event, index) => {
    return (
      <Event 
        key = {index}
        date = {event.date}
        city = {event.city}
        location = {event.location}
        link = {event.link}
      />
    );
  });

  /*================================
  JSX
  ================================*/
  return (
    <main className='event-page site__content page-padding'>
      <h1 className='title center'>Tour Dates</h1>
      
      <div className='events'>
        {eventElements}
      </div>
    </main>
  );
};

export default EventPage;