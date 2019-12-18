import {CLEAR_CACHE} from '../actionTypes/global';

/**
 * 清除缓存
 */
export const clearCache = () => {
  return {
    type: CLEAR_CACHE,
  };
};
