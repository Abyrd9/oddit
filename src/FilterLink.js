import React from 'react';
import {Link} from 'react-router';

 const FilterLink = ({filter, children}) => (
   <Link
    to={filter === 'signUp' ? '/' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
    >
    {children}
    </Link>
 );

 export default FilterLink;
