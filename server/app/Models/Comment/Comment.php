<?php

namespace App\Models\Comment;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Comment\Mutators\CommentMutators;
use App\Models\Comment\Accessors\CommentAccessors;
use App\Models\Comment\Relations\CommentRelations;
use App\Models\Comment\Scopes\CommentScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Comment\CommentObserver;

#[ObservedBy([CommentObserver::class])]
class Comment extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use CommentRelations;

    // Accessors & Mutators
    use CommentAccessors, CommentMutators;

    // Scopes
    use CommentScopes;

    protected $casts = [];

    protected $fillable = [
        'post_id',
        'user_id',
        'parent_id',
        'content'
    ];
}