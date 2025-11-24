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
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [likeUsers, setLikeUsers] = useState(post.likes || []);
  const [loading, setLoading] = useState(false);

  // Initialize like state on mount and when post changes
  useEffect(() => {
    if (post.likes_count !== undefined) {
      setLikesCount(post.likes_count);
    }
    if (post.likes && Array.isArray(post.likes)) {
      setLikeUsers(post.likes);
      setLiked(post.likes.some(l => l.user_id === user?.id) || false);
    }
  }, [post.id, post.likes_count, post.likes, user?.id]);

  const handleLike = async () => {
    if (!user || loading) return;
    setLoading(true);

    try {
      const res = await likeService.toggleLike('post', post.id);

      // Update local states
      setLiked(res.liked);
      setLikesCount(res.count);
      setLikeUsers(res.users || []);

      // Update parent component with new post data
      onPostUpdate?.({
        ...post,
        likes_count: res.count,
        likes: res.users || []
      });

    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="_feed_inner_timeline_reaction">
      <button
        className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${liked ? '_feed_reaction_active' : ''}`}
        onClick={handleLike}
        disabled={loading}
        title={liked ? 'Unlike this post' : 'Like this post'}
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
