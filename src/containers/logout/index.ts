import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';

export const Logout = () => {
  const authorizedUserId = useSelector((state: IRootState) => state.authorizedUser.data.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser(authorizedUserId));
  }, [dispatch, authorizedUserId]);
  return null;
};
