
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {AuthProvider} from './context';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import routes from './config/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookProvider } from './context/context';
import axios from 'axios';
import { API_URL } from './const';

function App() {
  const [socials,setSocials]=useState([]);
  const [siteInfo,setSetInfo]=useState({});

  const fetchSocials=async()=>{
    try {
      let {data}=await axios.get(`${API_URL}/api/v1/site/socials`);
      if(!data){
        return;
      }
      setSocials(data);
    } catch (error) {
      
    }
  }

  const fetchSiteInfo=async ()=>{
    try {
      let {data}=await axios.get(`${API_URL}/api/v1/site`);
      if(!data){
        return;
      }
      setSetInfo(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchSocials();
    fetchSiteInfo();
  }, [])


 

  return (

    <>
      <AuthProvider>
        <BookProvider>
        <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <div style={{
          backgroundImage: `url(${API_URL}/api/v1/images/siteInfo/${siteInfo.id})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <Router>
            
            <Navbar />
            <Switch>
            {routes.map((route) => (
            route.exact===true?(<PrivateRoute
            key={route.path}
            path={route.path}
            isPrivate={route.isPrivate}
            component={route.component}
            exact
          />):
          (<PrivateRoute
              key={route.path}
              path={route.path}
              isPrivate={route.isPrivate}
              component={route.component}
             
            />)
          ))}
            </Switch>
            <Footer siteInfo={siteInfo} socials={socials}/>
          </Router>
        </div>

        </BookProvider>
      </AuthProvider>
    </>
  );
}

export default App;
