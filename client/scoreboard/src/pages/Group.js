import React, { useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Context } from '../context/StateContext';
import { Button } from '@mui/material';
import axios from 'axios';
import NewGroupForm from '../components/NewGroupForm';
import "./Group.css";



function Group() {
  const { user, setUser, groups, setGroups, setGroupName } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  // Show groups for user
  useEffect(() => {

    if (user) {

      axios
        .get(`http://localhost:4000/group`, { withCredentials: true })
        .then((res) => {
          const groupData = res.data.group;
          if (groupData === 'No group found') {
            setGroups([]);
          }

          if (res.status === 200) {
            const groupData = res.data.group;
            console.log('Group data: ', groupData);
            const groupsArray = groupData
              ? Object.keys(groupData).map((key) => ({ id: key, ...groupData[key] }))
              : [];
            setGroups(groupsArray);
            console.log('groups', groupsArray);
          } else if (res.status === 400) {
            setGroups([]);
          }
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
  }, [setUser, user, setGroups]);

  if (loading) {
    return <div>Loading...</div>;
  }




  return (
    <div className='groupPage'>
      <NavBar />
      <div className='groupInfo'>
        <div className='groupCopy'>
          <div className='groupCopy-text'>
            <h2>Hello {user.name} {user.lastname}</h2>
            <p> To start please choose a group or create a new group</p>
          </div>
          <NewGroupForm />

        </div>

        <div className='groups'>
          <h2>Groups</h2>
          {groups.length === 0 ? (
            <p>No groups found. Please create a group</p>
          ) : (
            <>
           {groups.map((group) => {
                return (
                  <Button
                    size="large"
                    variant="contained"
                    sx={{ bgcolor: "#edbe02", mr: 2, mb: 2 }}
                    color="warning"
                    key={group.id}
                    onClick={() => {
                      setGroupName(group.name);
                      navigate(`/dashboard/${group.id}`);
                    }}
                  >
                    {group.name}
                  </Button>
                );
              })}
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Group;





