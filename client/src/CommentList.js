export const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = "";
    if (comment.status === "approved")
      content = <p style={{ color: "#1D1C1E" }}>{comment.content}</p>;
    if (comment.status === "rejected")
      content = <p style={{ color: "#EE3913" }}>This comment is not allowed</p>;
    if (comment.status === "pending")
      content = (
        <p style={{ color: "#4F13EE" }}> This comment awaiting moderation</p>
      );

    return (
      <li key={comment.id} className="card mb-2">
        {content}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};
