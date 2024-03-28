// models/blogModel.js:

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  contents: { type: String, required: true },
  tags: { type: [String], default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
