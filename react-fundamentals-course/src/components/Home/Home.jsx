import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common/Button/Button';

function Home() {

  return (
    <div className="App">
        <Link to='./courses'>
            <Button title='Courses'/>
        </Link>
    </div>
  );
}

export default Home;