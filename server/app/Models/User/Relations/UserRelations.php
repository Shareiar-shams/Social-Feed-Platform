<?php

namespace App\Models\User\Relations;

use App\Models\Comment\Comment;
use App\Models\Like\Like;
use App\Models\Post\Post;

trait UserRelations
{
    // A user has many posts
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // A user has many comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // A user has many likes (polymorphic)
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}