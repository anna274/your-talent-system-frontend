import { getQueryString } from 'helpers';

const getProfileLink = (id) => `/profile/${id}`;
const getPostsLink = (id, { withAuthorFilter = false, tagFilter = '' } = {}) => {
  let queryObject = {};
  if (withAuthorFilter) {
    queryObject = {
      ...queryObject,
      author: '',
    };
  }
  if (tagFilter) {
    queryObject = {
      ...queryObject,
      tag: tagFilter,
    };
  }
  return `/board/${id}${getQueryString(queryObject)}`;
};
const getPostCreateLink = (id) => `/board/${id}/create`;
const getPostLink = (userId, postId) => `/board/${userId}/post/${postId}`;
const getUsersLink = (userId) => `/users/${userId}`;
const getPostEditLink = (userId, postId) => `/board/${userId}/post/${postId}/edit`;
const getUserCreateLink = (id) => `/users/${id}/create`;
const getUserEditLink = (id, editedUserId) => `/users/${id}/user/${editedUserId}/edit`;
const getChatLink = (authorizedUserId, user2Id) => `/messenger/${authorizedUserId}/chat/${user2Id}`;
const getFriendsLink = (userId) => `${getUsersLink(userId)}?friends`;
const getSystemPostsLink = (userId) => `/system/${userId}/posts`;
const getSystemUsersLink = (userId) => `/system/${userId}/users`;
const getUserProfileLink = (userId) => `/profile/${userId}`;
const getProfileSettingsLink = (userId) => `/settings/${userId}/profile-settings`;
const getSystemLink = (userId) => `/system/${userId}`;

export {
  getFriendsLink,
  getPostsLink,
  getPostCreateLink,
  getPostLink,
  getProfileLink,
  getPostEditLink,
  getUserCreateLink,
  getUserEditLink,
  getUsersLink,
  getChatLink,
  getSystemPostsLink,
  getUserProfileLink,
  getSystemUsersLink,
  getProfileSettingsLink,
  getSystemLink,
};
