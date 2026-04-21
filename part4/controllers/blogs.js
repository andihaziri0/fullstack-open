const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const { populate } = require("dotenv");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    if (!body.title || !body.url) {
      return response.status(400).json({ error: "title and url are required" });
    }

    if (!request.user) {
      return response.status(401).json({ error: "token missing" });
    }

    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);

    await user.save();
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const user = request.user;
    const blogFound = await Blog.findById(id).populate("user", {
      username: 1,
      name: 1,
    });
    console.log("Blog found: ", blogFound);

    if (blogFound.user.username != user.username) {
      return response
        .status(401)
        .json({ error: "Cannot delete blog of other user" });
    }

    await Blog.findByIdAndDelete(id);

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body);
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
