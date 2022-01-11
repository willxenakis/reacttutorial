import React, { useState }from 'react';
import { terms, getCourseTerm} from '../utilities/times.js';
import Course from './Course.js';

const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    const [selected, setSelected] = useState([]);
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm}/>
        <div className="course-list">
        { termCourses.map(course => <Course key={course.id} course={ course } selected={selected} setSelected={ setSelected } />) }
        </div>
      </>
    );
  };

  const TermSelector = ({term, setTerm}) => (
    <div className="btn-group">
    { 
      Object.values(terms)
        .map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term}/>)
    }
    </div>
  );

  const TermButton = ({term, setTerm, checked}) => (
    <>
      <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked}
      onChange={() => setTerm(term)}/>
      <label className="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
      </label>
    </>
  );

export default CourseList;