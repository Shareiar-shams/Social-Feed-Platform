<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function getLikes($type, $id)
    {
        $model = $type === 'post' ? 'App\Models\Post\Post' : 'App\Models\Comment\Comment';
        $likeable = $model::findOrFail($id);

        // Get all likes with users
        $likes = $likeable->likes()->with('user')->get();

        return response()->json([
            'count' => $likes->count(),
            'users' => $likes->pluck('user')
        ]);
    }

    public function toggle(Request $request, $type, $id)
    {
        $model = $type === 'post' ? 'App\Models\Post\Post' : 'App\Models\Comment\Comment';
        $likeable = $model::findOrFail($id);

        $like = $request->user()->likes()
            ->where('likeable_id', $id)
            ->where('likeable_type', $model)
            ->first();

        if ($like) {
            $like->delete();
        } else {
            $likeable->likes()->create([
                'user_id' => $request->user()->id
            ]);
        }

        // Return updated like info
        $likes = $likeable->likes()->with('user')->get();

        return response()->json([
            'liked' => $likeable->likes()->where('user_id', $request->user()->id)->exists(),
            'count' => $likes->count(),
            'users' => $likes->pluck('user')
        ]);
    }

}
