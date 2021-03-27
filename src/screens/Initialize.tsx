import React from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from '../modules/app';

const Initialize: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return null;
};

export default Initialize;
