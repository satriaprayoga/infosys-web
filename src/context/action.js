import axios from "axios";
import { API_URL } from "../const";

export async function signIn(dispatch,payload){
    try {
        dispatch({type:'REQUEST_LOGIN'});
        let {data}=await axios.post(`${API_URL}/api/v1/signin`,payload);
       
        console.log(data);
        if(data){
            const expiration = new Date(new Date().getTime() + 1000 * 60 *60 );
            const user={
                token:data.accessToken,
                user:data.principal,
                expirationTime:expiration.toISOString()
            }
            console.log(data);
            localStorage.setItem('appUser',JSON.stringify(user));
            dispatch({type:'LOGIN_SUCCESS', payload:user});
            console.log(localStorage.getItem('appUser'))
            return user;
        }
         dispatch({type:'LOGIN_ERROR'})
        return;
    } catch (error) {
        console.log(error.response.data.status);
        dispatch({ type: 'LOGIN_ERROR', error: error.response.data.status });
    }
}

export async function signOut(dispatch){
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem('appUser');
}

export async function createBook(dispatch,payload){
    try {
        dispatch({type:'INIT_BOOK'});
    let data={}
    if(payload.book){
        localStorage.setItem('book',JSON.stringify(payload.book));
        if(payload.accomDetails){
            localStorage.setItem('accomDetails',JSON.stringify(payload.accomDetails));
            data.accomDetails=payload.accomDetails;
        }
        if(payload.tourDetails){
            localStorage.setItem('tourDetails',JSON.stringify(payload.tourDetails));
            data.tourDetails=payload.tourDetails;
        }
        data.book=payload.book;
        dispatch({type:'SAVE_BOOK', payload:data});
        console.log(data);
        return data;
    }
    dispatch({type:'BOOKING_ERROR'});
    return;
    } catch (error) {
        
    }
}

export async function removeTourDetails(dispatch){
    dispatch({type: 'REMOVE_TOUR'});
    if(localStorage.getItem('tourDetails')){
        localStorage.removeItem('tourDetails');
    }
}

export async function confirmBook(dispatch){
    dispatch({type:'CONFIRM_BOOK'});
    localStorage.removeItem('book');
    localStorage.removeItem('accomDetails');
    localStorage.removeItem('tourDetails');
}