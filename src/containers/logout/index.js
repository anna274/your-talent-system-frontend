import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'redux/actions';

function Logout() {
  const authorizedUserId = useSelector((state) => state.authorizedUser.data.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser(authorizedUserId));
  }, [dispatch, authorizedUserId]);
  return null;
}

export default Logout;
