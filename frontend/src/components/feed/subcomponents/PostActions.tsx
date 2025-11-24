import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { likeService } from '../../../services/likeService';
import type { Post } from '../../../services/postService';

interface PostActionsProps {
  post: Post;
  onPostUpdate?: (updatedPost: Post) => void;
}

export function PostActions({ post, onPostUpdate }: PostActionsProps) {
  const { user } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load initial values
  useEffect(() => {
    // initial like count
    setLikesCount(post.likes_count || 0);

    // initial users list and check if user liked
    if (post.likes && Array.isArray(post.likes)) {
      // Handle both data structures: { user: {} } and direct user objects
      const userLiked = post.likes.some((l) => (l.user_id || l.id) === user?.id);
      setLiked(userLiked);
    } else {
      setLiked(false);
    }
  }, [post.id, post.likes, post.likes_count, user?.id]);

  const handleLike = async () => {
    if (!user || loading) return;

    // --- OPTIMISTIC UI UPDATE ---
    const optimisticLiked = !liked;
    setLiked(optimisticLiked);
    setLikesCount((prev) => (optimisticLiked ? prev + 1 : prev - 1));

    setLoading(true);

    try {
      const res = await likeService.toggleLike('post', post.id);
      
      // update states with backend true values
      setLiked(res.liked);
      setLikesCount(res.count);

      // Update parent post list
      onPostUpdate?.({
        ...post,
        likes_count: res.count,
        likes: res.users?.map((u: any) => ({
          id: u.id,
          user_id: u.id,
          post_id: post.id,
          created_at: new Date().toISOString(),
          user: u
        })) || []
      });

    } catch (error) {
      console.error('Like error:', error);

      // revert optimistic UI if failed
      setLiked(!optimisticLiked);
      setLikesCount((prev) => (optimisticLiked ? prev - 1 : prev + 1));
    }

    setLoading(false);
  };

  return (
    <div className="_feed_inner_timeline_reaction">
      <button
        className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${
          liked ? '_feed_reaction_active' : ''
        }`}
        onClick={handleLike}
        disabled={loading}
      >
        <span className="_feed_inner_timeline_reaction_link">
          <span>{liked ? 'Unlike' : 'Like'}</span>
          {likesCount > 0 && <span> ({likesCount})</span>}
        </span>
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
