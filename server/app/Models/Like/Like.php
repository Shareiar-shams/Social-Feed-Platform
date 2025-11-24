<?php

namespace App\Models\Like;

use Illuminate\Database\Eloquent\Model;
use App\Models\Like\Mutators\LikeMutators;
use App\Models\Like\Accessors\LikeAccessors;
use App\Models\Like\Relations\LikeRelations;
use App\Models\Like\Scopes\LikeScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Like\LikeObserver;

#[ObservedBy([LikeObserver::class])]
class Like extends Model
{
    use HasFactory;

    // Relations
    use LikeRelations;

    // Accessors & Mutators
    use LikeAccessors, LikeMutators;

    // Scopes
    use LikeScopes;

    protected $casts = [];

    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type'
    ];
}