const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Unique identifier is named id", async () => {
  const blogsResponse = await api.get("/api/blogs");
  const blogs = blogsResponse.body;
  console.log("blogssssssssssssssssssssssss", blogs);

  const firstBlog = blogs[0];
  const keys = Object.keys(firstBlog);

  console.log("keyssssssssssssss", keys);

  assert.strictEqual(keys.includes("id"), true, "Expected 'id' key to exist");
});

test("Successfully created blog post", async () => {
  const initialBlogsResponse = await api.get("/api/blogs");

  const initialBlogs = initialBlogsResponse.body;

  const blog = {
    title: "Nje dite Ramazani ne kurs2",
    author: "Ardian Syla",
    url: "http://localhost:3003/api/blogs",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const finalResponseBlogs = await api.get("/api/blogs");

  const finalBlogs = finalResponseBlogs.body;

  assert.strictEqual(finalBlogs.length, initialBlogs.length + 1);
  const titles = finalBlogs.map((r) => r.title);

  assert(titles.includes("Nje dite Ramazani ne kurs2"));
});

test("Verify that likes property default is 0", async () => {
  


  const blog = {
    title: "Nje dite Ramazani ne kurs3",
    author: "Ardian Syla",
    url: "http://localhost:3003/api/blogs",
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsResponse = await api.get("/api/blogs");
  const blogs = blogsResponse.body;

  const ourBlog = blogs.find(blog => blog.title === "Nje dite Ramazani ne kurs3")

  assert.strictEqual(ourBlog.likes, 0)
 
  
});

test.only("If title or url missing - status code 400", async () => {
  const blog = {
    author: "Ardian Syla",
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
})

after(async () => {
  await mongoose.connection.close();
});
