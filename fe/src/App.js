function App() {
  return (
    <div>
      <div className="top-modal">
        <h1>Create Activity</h1>
      </div>
      <div className="form-activity">
        <form>
        <div className="activities">
          <p>Choose Activity</p>
          <select name="activities" id="activities">
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
            <input type="text" />
          </div>
          <div className="date-duration">
            <div className="date">
              <p>Date</p>
              <input type="date" />
            </div>
            <div className="duration">
              <p>Duration (min)</p>
              <input type="text" />
            </div>
          </div>
          <div className="energy-burn">
            <p>Energy burn (Calories)</p>
            <input type="text" />
          </div>
          <div className="distance">
            <p>Distance (meter)</p>
            <input type="text" />
          </div>
          <div className="description">
            <p>Description</p>
            <input type="text" />
          </div>
          <div className='btn'>
            <button>Create</button>
            <button>Cancle</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
