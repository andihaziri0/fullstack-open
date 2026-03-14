const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    if (!request.body.title || !request.body.url) {
      return response.status(400).json({ error: "title and url are required" });
    }
    const blog = new Blog(request.body);
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body);
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
