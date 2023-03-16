import React, {useContext} from 'react'
import NavBar from '../components/NavBar';
import { Context } from '../context/StateContext';

function Group() {
  const {user} = useContext(Context);
  return (
    <div>
      <NavBar/>

      <h1>Group page</h1>
    </div>
  )
}

export default Group