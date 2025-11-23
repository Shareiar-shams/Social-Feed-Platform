<?php

namespace App\Services;

use App\Models\Post\Post;
use Illuminate\Support\Facades\Storage;

class PostService
{
    public function showAllPosts($request, $perPage = 10)
    {
        return Post::visibleTo($request->user())
            ->withPostRelations()
            ->latest()
            ->paginate($perPage);
    }

    public function createPost($request)
    {
        $data = [
            'user_id' => $request->user()->id,
            'content' => $request->content,
            'visibility' => $request->visibility,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        return Post::create($data);
    }

    public function getPostById($id)
    {
        return Post::withPostRelations()->findOrFail($id);
    }

    public function getPostsByUser($userId)
    {
        return Post::ownedBy($userId)
            ->withPostRelations()
            ->latest()
            ->get();
    }

    public function getSinglePostForUser($id, $userId)
    {
        return Post::ownedBy($userId)->findOrFail($id);
    }

    public function updatePost($id, $userId, $request)
    {
        $post = $this->getSinglePostForUser($id, $userId);

        // Update content if provided
        if ($request->has('content')) {
            $post->content = $request->input('content');
        }

        // Update visibility if provided
        if ($request->has('visibility')) {
            $post->visibility = $request->input('visibility');
        }

        // Update image if uploaded
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $oldImage = $post->image;
            $post->image = $request->file('image')->store('posts', 'public');

            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        }

        $post->save();
        return $post;
    }
    public function deletePost($id, $userId)
    {
        $post = $this->getSinglePostForUser($id, $userId);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();
        return $post;
    }
}
