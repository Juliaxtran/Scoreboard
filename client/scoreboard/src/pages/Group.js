import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Context } from '../context/StateContext';
import axios from 'axios';

function Group() {
  const { user, setUser, groups, setGroups } = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      axios
        .get(`http://localhost:4000/group`, { withCredentials: true })
        .then((res) => {
          const groupData = res.data.group;
          console.log('Group data: ', groupData);
          const groupsArray = Object.keys(groupData).map((key) => ({
            id: key,
            ...groupData[key],
          }));
          setGroups(groupsArray);
          console.log('groups', groupsArray);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setUser, setGroups]);

  if (loading) {
    return <div>Loading...</div>;
  }

// Show groups for user




  return (
    <div className='groupPage'>
      <NavBar/>
      <div>
        <h1>Group page</h1>
        <h2>{user.name}</h2>
        <h2>{user.id}</h2>
        <h2>{user.lastName}</h2>
        <h2>{user.email}</h2>
      </div>
      <div>
        {groups && groups.map((group) => {
          return (
            <div key={group.id}>
              <h2>{group.name}</h2>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default Group;





