export const findUserFriend = (personId: string, friendsIds: string[]) =>
  Boolean(friendsIds.find((friendId) => friendId === personId));
