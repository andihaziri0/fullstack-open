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
  // Create a user
  const user = {
    username: "testuser",
    password: "password123",
    name: "Test User",
  };

  await api.post("/api/users").send(user);

  // Login to get token
  const loginResponse = await api.post("/api/login").send({
    username: "testuser",
    password: "password123",
  });

  const token = loginResponse.body.token;

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
    .set("Authorization", `Bearer ${token}`)
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
  // Create a user
  const user = {
    username: "testuser2",
    password: "password123",
    name: "Test User 2",
  };

  await api.post("/api/users").send(user);

  // Login to get token
  const loginResponse = await api.post("/api/login").send({
    username: "testuser2",
    password: "password123",
  });

  const token = loginResponse.body.token;

  const blog = {
    title: "Nje dite Ramazani ne kurs3",
    author: "Ardian Syla",
    url: "http://localhost:3003/api/blogs",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsResponse = await api.get("/api/blogs");
  const blogs = blogsResponse.body;

  const ourBlog = blogs.find(blog => blog.title === "Nje dite Ramazani ne kurs3")

  assert.strictEqual(ourBlog.likes, 0)
});

test("If title or url missing - status code 400", async () => {
  // Create a user
  const user = {
    username: "testuser3",
    password: "password123",
    name: "Test User 3",
  };

  await api.post("/api/users").send(user);

  // Login to get token
  const loginResponse = await api.post("/api/login").send({
    username: "testuser3",
    password: "password123",
  });

  const token = loginResponse.body.token;

  const blog = {
    author: "Ardian Syla",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
})

test("Adding a blog without token returns 401 Unauthorized", async () => {
  const blog = {
    title: "Blog without token",
    author: "Ardian Syla",
    url: "http://localhost:3003/api/blogs",
    likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

// Tests that ensure invalid users are not created and that an invalid add user operation returns a suitable status code and error message.

test('if username and password are missing', async () => {
  const user = {
    name: "ardian"
  }

  const response = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

test('if username is missing', async () => {
  const user = {
    password: "password123",
    name: "ardian"
  }

  const response = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

test('if password is missing', async () => {
  const user = {
    username: "testuser",
    name: "ardian"
  }

  const response = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

test('if username is shorter than 3 characters', async () => {
  const user = {
    username: "ab",
    password: "password123",
    name: "ardian"
  }

  const response = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

test('if password is shorter than 3 characters', async () => {
  const user = {
    username: "testuser",
    password: "ab",
    name: "ardian"
  }

  const response = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

test('if both username and password are shorter than 3 characters', async () => {
  const user = {
    username: "ab",
    password: "cd",
    name: "ardian"
  }

  const response = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error !== undefined, true, "Error message should be returned");
})

after(async () => {
  await mongoose.connection.close();
});
