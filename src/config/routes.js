import Home from '../components/pages/Home'
import SignOut from '../components/pages/SignOut';
import Accomodations from '../pages/accomodations/Accomodations';
import AccomodationView from '../pages/accomodations/AccomodationView';
import Activation from '../pages/Activation';
import BookingAccom from '../pages/bookings/BookingAccom';
import BookingConfirm from '../pages/bookings/BookingConfirm';
import BookingDetails from '../pages/bookings/BookingDetails';
import BookingHistory from '../pages/bookings/BookingHistory';
import BookingSuccess from '../pages/bookings/BookingSuccess';
import BookingTour from '../pages/bookings/BookingTour';
import AccomCountry from '../pages/country/AccomCountry';
import DestinationCountry from '../pages/country/DestinationCountry';
import ExploreAccomodation from '../pages/country/ExploreAccomodation';
import ExploreDestination from '../pages/country/ExploreDestination';
import DestinationView from '../pages/destinations/DestinationView';
import ForgotPassword from '../pages/ForgotPassword';
import Payment from '../pages/payment/Payment';
import Profile from '../pages/profile/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Tours from '../pages/tours/Tours';
import TourView from '../pages/tours/TourView';

const routes=[
    {
        path:'/',
        component:Home,
        isPrivate:false,
        exact:true
    },
    {
        path:'/signIn',
        component:SignIn,
        isPrivate:false,
    },
    {
        path:'/signUp',
        component:SignUp,
        isPrivate:false,
    },
    {
        path:'/activation/:token',
        component: Activation,
        isPrivate:false
    },
    {
        path:'/exploreAccomodations',
        component:ExploreAccomodation,
        isPrivate:false
    },
    {
        path:'/exploreDestinations',
        component:ExploreDestination,
        isPrivate:false
    },
    {
        path:'/accomCountry/:id',
        component:AccomCountry,
        isPrivate:false
    },
    {
        path:'/destinationCountry/:id',
        component:DestinationCountry,
        isPrivate:false
    },
    {
        path:'/destination/:id',
        component: DestinationView,
        isPrivate:false
    },
    {
        path:'/accomodations/:id',
        component:Accomodations,
        isPrivate:false
    },
    {
        path:'/accomDetails/:id',
        component:AccomodationView,
        isPrivate:false
    },
    {
        path:'/tours/:id',
        component:Tours,
        isPrivate:false
    },
    {
        path:'/tourDetails/:id',
        component:TourView,
        isPrivate:false
    },
    {
        path:'/bookTour/:id',
        component:BookingTour,
        isPrivate:false
    },
    {
        path:'/bookAccom/:id',
        component:BookingAccom,
        isPrivate:true
    },
    {
        path:'/confirmBooking',
        component:BookingConfirm,
        isPrivate:false
    },
    {
        path:'/successBooking',
        component:BookingSuccess,
        isPrivate:false
    },
    {
        path:'/bookingHistory',
        component:BookingHistory,
        isPrivate:false
    },
    {
        path:'/bookingDetails/:id',
        component:BookingDetails,
        isPrivate:false
    },
    {
        path:'/payment/:id',
        component:Payment,
        isPrivate:false
    },
    {
        path:'/profile',
        component:Profile,
        isPrivate:false
    },
    {
        path:'/forgetPassword',
        component:ForgotPassword,
        isPrivate:false
    },
    {
        path:'/signOut',
        component:SignOut,
        isPrivate:true,
    },
];

export default routes;