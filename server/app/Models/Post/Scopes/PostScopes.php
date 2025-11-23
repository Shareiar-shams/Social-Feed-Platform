<?php

namespace App\Models\Post\Scopes;

use App\Models\User;

trait PostScopes
{
    // Only Public Posts
    public function scopePublic($query)
    {
        return $query->where('visibility', 'public');
    }

    // Only posts of specific user
    public function scopeOwnedBy($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Logged-in user will see all public + own private
    public function scopeVisibleTo($query, $user)
    {
        if (!$user) {
            return $query->public();
        }

        return $query->where(function ($q) use ($user) {
            $q->public()
              ->orWhere('user_id', $user->id);
        });
    }

    // Common eager-load setup
    public function scopeWithPostRelations($query)
    {
        return $query
            ->with(['user', 'likes.user'])
            ->withCount('likes');
    }
}