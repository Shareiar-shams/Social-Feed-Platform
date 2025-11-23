<?php

namespace App\Models\Post;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Post\Mutators\PostMutators;
use App\Models\Post\Accessors\PostAccessors;
use App\Models\Post\Relations\PostRelations;
use App\Models\Post\Scopes\PostScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Post\PostObserver;

#[ObservedBy([PostObserver::class])]
class Post extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use PostRelations;

    // Accessors & Mutators
    use PostAccessors, PostMutators;

    // Scopes
    use PostScopes;

    protected $casts = [];

    protected $fillable = [
        'user_id',
        'content',
        'image',
        'visibility'
    ];
}