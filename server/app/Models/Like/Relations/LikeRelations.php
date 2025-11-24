<?php

namespace App\Models\Like\Relations;

use App\Models\User;

trait LikeRelations
{
    // polymorphic relation
    public function likeable()
    {
        return $this->morphTo();
    }

    // user relation
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}