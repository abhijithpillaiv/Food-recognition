import React from 'react'
import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts ? posts.hits.map((p) => (
        <Post key={p.recipe.uri} post={p} />
      )) : <h1> Waiting for the post</h1>}
    </div>
  );
}
