import {ADD, ALTER_COLOR} from '../actionTypes/test';

export const addCreator = () => {
  return {
    type: ADD,
  };
};

export const alterColorCreator = color => {
  return {
    type: ALTER_COLOR,
    color,
  };
};
