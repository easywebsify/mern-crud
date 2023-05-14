import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Home = ({ user, userLoaded }) => {

    const handleLogout = () => {
      signOut(auth).then(function() {
        // Sign-out successful.
        window.location.reload(false);

      }).catch(function(error) {
        // An error happened.
        console.log('error: ', error)
      });
    }
    return (
      <div>
        <div>Home</div>
          {
            userLoaded ?
            (
              <div>
              {
                !user && (
                <div>
                    <div><a href="/login">Login</a></div>
                    <div><a href="/signup">Signup</a></div>
                </div>)
              }
              <div><a href="/activity-form">activity form</a></div>
              <div><a href="/activity-list">activity list</a></div>
              {
                user && (
                  <div><button onClick={handleLogout}>Logout</button></div>
                )
              }
              </div>
            )
            :
            <div>Loading...</div>
          }
      </div>
    )
}

export default Home;
