import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/user/userSlice';
import Books from '../books/Books';
import UserLibrary from "../userLibrary/UserLibrary";
import "./Library.css";

const Library = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <button className='btn-position' onClick={logoutHandler}>Log out</button>
      <Books />
      <UserLibrary />
    </>
  )
}

export default Library