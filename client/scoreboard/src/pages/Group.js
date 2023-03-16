import React, {useContext} from 'react'
import NavBar from '../components/NavBar';
import { Context } from '../context/StateContext';


function Group() {
  const {user} = useContext(Context);
  console.log(user)
  return (
    <div className='groupPage'>
      <NavBar/>
      <div>
      <h1>Group page</h1>
      <h2>{user.name}</h2>
      <h2>{user.id}</h2>
      <h2>{user.lastName}</h2>
      </div>

    </div>
  )
}

export default Group