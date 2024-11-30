import React from 'react';
import EventCard from '../components/Events/EventCard';
import { Link } from 'react-router-dom';
import MyFollowEventsButton from '../components/Events/MyFollowEventsButton';
import EventSearch from '../components/Events/EventSearch';


const EventPage: React.FC = () => {

  const handleEventClick = () => {
    console.log("Event card clicked!");
  };

  return (
    
    <div>

      <div className= "p-4 m-2 flex justify-center gap-4">
          
          <EventSearch onSearch={function (searchTerm: string): void {
              throw new Error('Function not implemented.');
            } } />

<Link to="/created-events"> <button className='bg-white rounded-lg p-2 font-bold shadow-md text-pink-500'> Mis eventos </button> </Link>
    
      
      </div>
      <div className='p-4 m-2 flex flex-col justify-center gap-4'>
        <h1>Event Page</h1>
    
        <MyFollowEventsButton />
     
        <EventCard
          title="Sample Event"
          date="2023-12-01"
          description="This is a sample event description."
          onClick={handleEventClick} location={''} lat={0} lng={0}        />
      </div>
      
    </div>

  );
};

export default EventPage;
