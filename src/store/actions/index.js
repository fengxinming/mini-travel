import { createActions } from 'redux-actions';
import { getStore } from 'wepy-redux';

import * as types from '../types';
import hotel from './hotel';
import http from '@/commons/http';

const store = getStore();

types.http = http;
types.store = store;

export default createActions({
  HOTEL: hotel(types)
});
