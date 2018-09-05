import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div id='navbar' className='row'>
      <Link to="/projects/list">Projects ListLink</Link>
      <Link to="/projects/gallery">Projects Gallery</Link>
    </div>
  )
}

export default Navbar
