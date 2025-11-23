export function PostActions() {
  return (
    <div className="_feed_inner_timeline_reaction">
      <button className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active">
        <span className="_feed_inner_timeline_reaction_link"><span>Haha</span></span>
      </button>
      <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link"><span>Comment</span></span>
      </button>
      <button className="_feed_inner_timeline_reaction_share _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link"><span>Share</span></span>
      </button>
    </div>
  );
}
