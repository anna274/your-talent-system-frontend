const replaceCommentLikes = (comments, { commentId, newLikes }) =>
  comments.map((comment) => (comment.id === commentId ? { ...comment, likes: newLikes } : comment));

export { replaceCommentLikes };
