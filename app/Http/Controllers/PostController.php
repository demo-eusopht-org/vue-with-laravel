<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    //
    public function index(Request $request)
    {
        try {
            $posts = Post::where('status', 1)->where('user_id', $request->user()->id)->get();
            return response()->json([
                'status' => true,
                'data' => $posts
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'title' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }
            $post = new Post();
            $post->title = $request->title;
            $post->user_id = $request->user()->id;
            $post->description = $request->description;
            $post->save();

            return response()->json([
                'status' => true,
                'message' => 'Post added successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::find($id);
            $post->title = $request->title;
            $post->description = $request->description;
            $post->update();

            return response()->json([
                'status' => true,
                'message' => 'Post updated successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::find($id);
            $post->status = 0;
            $post->update();

            return response()->json([
                'status' => true,
                'message' => 'Post deleted successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $post = Post::find($id);
            return response()->json([
                'status' => true,
                'data' => $post
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}