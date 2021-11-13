const findUserLike = (likes, userId) => likes.find((like) => like.user === userId);

export { findUserLike };
