import React, { useState, useEffect }from 'react';
import './App.css';
import { hasConflict, terms, getCourseTerm, getCourseNumber, addScheduleTimes} from './utilities/times.js';
import CourseList from './components/CourseList';


const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () =>  {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
)};

export default App;