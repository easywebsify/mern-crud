import { useEffect, useState } from "react";
import axios from 'axios';
import conf from '../config';

const ActivityList = () => {
    const [activity, setActivity] = useState([]);
    const getActivity = () => {
        const config = {
            method: 'get',
            url: `${conf.serverUrl}/api/activity`,
            headers: { }
        };
        try {
            axios(config)
            .then((response) => {
                setActivity(response.data.data)
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getActivity();
   }, []);

    return (
      <div>
        <div className="top-modal">
          <h1>Create List</h1>
          {
            activity.map((item) => {
                return <div key={item._id}>{item._id} {item.activityType} {item.duration}</div>
            })
          }
        </div>
      </div>
    );
  }
  
  export default ActivityList;
  