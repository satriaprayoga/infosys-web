
let user = localStorage.getItem('appUser')
? JSON.parse(localStorage.getItem('appUser')).user
: '';
let token = localStorage.getItem('appUser')
? JSON.parse(localStorage.getItem('appUser')).token
: '';
let exp= localStorage.getItem('appUser')
? JSON.parse(localStorage.getItem('appUser')).expirationTime
:'';

let book= localStorage.getItem('book')
? JSON.parse(localStorage.getItem('book')):null;
let accomDetails=localStorage.getItem('accomDetails')
? JSON.parse(localStorage.getItem('accomDetails')):null;
let tourDetails=localStorage.getItem('tourDetails')
? JSON.parse(localStorage.getItem('tourDetails')):null;


let siteInfo=localStorage.getItem('siteInfo')
? JSON.parse(localStorage.getItem('siteInfo')):null;

export const initialState = {
    user:  ''||user,
	token: ''||token,
	loading: false,
	expirationTime: ''||exp,
	errorMessage: null,
};

export const initialBook={
	book:null||book,
	accomDetails:null||accomDetails,
	tourDetails:null || tourDetails
}

export const initalSite={
	siteInfo:null||siteInfo
}

export const SIGN_IN_REQUEST="SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS="SIGN_IN_SUCCESS";
export const SIGN_OUT="SIGN_OUT";
export const SIGN_IN_ERROR="SIGN_IN_ERROR";

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				user: action.payload.user,
				token: action.payload.token,
				expirationTime: action.payload.expirationTime,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				token: '',
				expirationTime:''
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

export const BookReducer = (initialBook,action)=>{
	switch (action.type){
		case 'INIT_BOOK':
			return {
				...initialBook
			};
		case 'SAVE_BOOK':
			return{
				...initialBook,
				book:action.payload.book,
				accomDetails:action.payload.accomDetails,
				tourDetails:action.payload.tourDetails
			};
		case 'CONFIRM_BOOK':
			return {
				...initialBook,
				book:null,
				accomDetails:null,
				tourDetails:null
			};
		case 'REMOVE_TOUR':
			return{
				...initialBook
			}
		case 'BOOKING_ERROR':
			return {
				...initialBook,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}