import { useState, useEffect, useCallback } from 'react';
import {
  FeedHeader,
  MobileMenu,
  MobileBottomNav,
  LeftSidebar,
  StoriesDesktop,
  StoriesMobile,
  Composer,
  TimelinePost,
  RightSidebar
} from '../components/feed';
import { postService } from '../services/postService';
import type { Post } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';

export default function Feed() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Fetch posts with pagination
  const fetchPosts = useCallback(
    async (append: boolean = false) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const res = await postService.getPostsPaginated(page, 10);

        // Filter posts based on visibility
        const filteredPosts = res.data.filter(post => {
          if (post.visibility === 'public') return true;
          if (post.visibility === 'private' && post.user_id === user?.id) return true;
          return false;
        });

        if (append) {
          setPosts(prev => [...prev, ...filteredPosts]);
        } else {
          setPosts(filteredPosts);
        }

        // Check if more pages exist
        setHasMore(res.current_page < res.last_page);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, page, user?.id, hasMore]
  );

  // Scroll handler for infinite scroll
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  // Fetch posts on page change
  useEffect(() => {
    fetchPosts(page > 1);
  }, [page, fetchPosts]);

  // Initial fetch
  useEffect(() => {
    fetchPosts(false);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // When new post is created
  const handlePostCreated = useCallback((newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  // When post is updated
  const handlePostUpdate = useCallback((updatedPost: Post) => {
    setPosts(prev => prev.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    ));
  }, []);

  // When post is deleted
  const handlePostDelete = useCallback((postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  return (
    <div className={`_layout _layout_main_wrapper ${darkMode ? '_dark_wrapper' : ''}`}>
      <div className="_layout_mode_swithing_btn">
        <button type="button" className="_layout_swithing_btn_link" onClick={toggleDarkMode}>
          <div className="_layout_swithing_btn">
            <div className="_layout_swithing_btn_round"></div>
          </div>
          {/* Your dark/light mode SVGs */}
        </button>
      </div>

      <div className="_main_layout">
        <FeedHeader />
        <MobileMenu />
        <MobileBottomNav />

        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <StoriesDesktop />
                    <StoriesMobile />
                    <Composer onPostCreated={handlePostCreated} />

                    {posts.map(post => (
                      <TimelinePost
                        key={post.id}
                        post={post}
                        onPostUpdate={handlePostUpdate}
                        onPostDelete={handlePostDelete}
                      />
                    ))}

                    {/* Loader */}
                    {loading && posts.length > 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        Loading more posts...
                      </div>
                    )}

                    {/* No more posts message */}
                    {!hasMore && posts.length > 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        No more posts to load
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
