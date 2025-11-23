<?php

namespace App\Models\Post\Relations;

use App\Models\Comment\Comment;
use App\Models\Like\Like;
use App\Models\User;

trait PostRelations
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Post has many comments
    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id'); // only top-level
    }

    // All comments including replies (recursive)
    public function allComments()
    {
        return $this->hasMany(Comment::class);
    }

    // Post can be liked (polymorphic)
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}