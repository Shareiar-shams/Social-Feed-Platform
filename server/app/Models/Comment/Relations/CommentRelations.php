<?php

namespace App\Models\Comment\Relations;

use App\Models\Comment\Comment;
use App\Models\Like\Like;
use App\Models\Post\Post;
use App\Models\User;

trait CommentRelations
{
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * A comment belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Parent Comment (if this is a reply)
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Replies under this comment
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')
            ->with([
                'replies',      // recursive infinite depth
                'user',
                'likes.user'
            ]);
    }

    // Comment can be liked
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}