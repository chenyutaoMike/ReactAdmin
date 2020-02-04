import { SET_HEAD_TITLE } from './actionTypes';

/**
 * 设置头部标题的同步action
 * 
 */
export const setHeaderTitle = (headTitle) => ({
   type: SET_HEAD_TITLE,
   data: headTitle
}) 
