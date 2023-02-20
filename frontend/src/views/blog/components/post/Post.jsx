import React from 'react'
import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      <img className="postImg" src={post.recipe.image} alt="image" />
      <div className="postInfo">
        <div className="postCats">
        </div>
        <Link to={`/singlerec/${post.recipe.uri.split("_")[1]}`} className="link">
          <span className="postTitle">{post.recipe.label}</span>
        </Link>
        <hr />
      </div>

    </div>
  );
}

