const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("blogs likes", () => {
  const blogs = [
    {
      title: "Nje dite Ramazani ne kurs",
      author: "Ardian Syla",
      url: "http://localhost:3003/api/blogs",
      likes: 3,
    },
    {
      title: "Myzhde Agu",
      author: "Enis Rama",
      url: "https://enisrama.com/ramazani/view/Myzhde_Agu.pdf",
      likes: 5,
    },
    {
      title: "Harta e Kthimit",
      author: "Enis Rama",
      url: "https://enisrama.com/ramazani/view/Myzhde_Agu.pdf",
      likes: 10,
    },
  ];

  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });

  test("totalLikes returns the total of likes", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 18);
  });

  test("favoriteBlog returns the blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[2]);
  });

  test("most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
        author: 'Enis Rama',
        blogs: 2
    });
  });

  test("most likes", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
        author: 'Enis Rama',
        likes: 15
    })
  })
});
