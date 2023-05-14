import axios from 'axios';
import conf from '../config';
import { useState } from 'react';

const ActivityForm = () => {
    const [activityType, setActivityType] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState(0);
    const [energy, setEnergy] = useState('');
    const [distance, setDistance] = useState(0);
    const [description, setDescription] = useState('');

    const createActivity = () => {
        const data = {
            activityType: activityType,
            title,
            dateTime: date,
            duration: duration,
            distance: distance,
            description: description
        }

        const config = {
            method: 'post',
            url: `${conf.serverUrl}/api/activity`,
            headers: {  'Content-Type': 'application/json' },
            data : data
        };
        axios(config)
        .then((response) => {
            console.log(response.data)
        }).catch(error => {
          console.log(error);
        });
    }

    const handleActivityType = (e) => {
      setActivityType(e.target.value);
    }

    const handleTitle = (e) => {
      setTitle(e.target.value);
    }

    const handleDate = (e) => {
      setDate(e.target.value);
    }

    const handleDuration = (e) => {
      setDuration(e.target.value);
      setEnergy(e.target.value/2)
    }

    const handleDistance = (e) => {
      setDistance(e.target.value);
    }

    const handleDescription = (e) => {
      setDescription(e.target.value);
    }


    const handleCreateActivity = (e) => {
      e.preventDefault();
      if (title) {
          createActivity({ activityType, title });
      } else {
          alert('Please check form')
      }
      setActivityType('');
      setTitle('');
      setDate('');
      setDuration(0);
      setEnergy(0);
      setDistance(0);
      setDescription('');
  }

    return (
      <div>
        <div className="top-modal">
          <h1>Create Activity</h1>
        </div>
        <div className="form-activity">
          <form onSubmit={handleCreateActivity}>
          <div className="activities">
            <p>Choose Activity</p>
            <select name="activities" id="activities" onChange={handleActivityType} value={activityType}>
              <option value="run">Run</option>
              <option value="bicycle-ride">Bicycle ride</option>
              <option value="swim">Swim</option>
              <option value="walk">Walk</option>
              <option value="hike">Hike</option>
              <option value="yoga">Yoga</option>
            </select>
          </div>
            <div className="title">
              <p>Habit Title</p>
              <input type="text" onChange={handleTitle} value={title}/>
            </div>
            <div className="date-duration">
              <div className="date">
                <p>Date</p>
                <input type="date" onChange={handleDate} value={date}/>
              </div>
              <div className="duration">
                <p>Duration (min)</p>
                <input type="text" onChange={handleDuration} value={duration}/>
              </div>
            </div>
            <div className="energy-burn">
              <p>Energy burn (Calories)</p>
              <input type="text" disabled={true} value={energy}/>
            </div>
            <div className="distance">
              <p>Distance (meter)</p>
              <input type="text" onChange={handleDistance} value={distance}/>
            </div>
            <div className="description">
              <p>Description</p>
              <input type="text" onChange={handleDescription} value={description}/>
            </div>
            <div className='btn'>
              <button type="submit" >Create</button>
              <button>Cancle</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default ActivityForm;
  