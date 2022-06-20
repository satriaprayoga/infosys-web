import React,{ createContext, useContext, useReducer } from "react";
import { AuthReducer, BookReducer, initialBook, initialState } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
const BookStateContext=React.createContext();
const BookDispatchContext=React.createContext();

export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};

export function useBookState() {
	const context = React.useContext(BookStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export function useBookDispatch() {
	const context = React.useContext(BookDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const BookProvider = ({ children }) => {
	const [bookData, dispatch] = useReducer(BookReducer, initialBook);

	return (
		<BookStateContext.Provider value={bookData}>
			<BookDispatchContext.Provider value={dispatch}>
				{children}
			</BookDispatchContext.Provider>
		</BookStateContext.Provider>
	);
};