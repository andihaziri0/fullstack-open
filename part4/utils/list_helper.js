const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  const blogsMap = new Map();

  for (let i = 0; i < blogs.length; i++) {
    if (!blogsMap.has(blogs[i].author)) {
      blogsMap.set(blogs[i].author, 1);
    } else {
      const numberOfBlogsOfAuthor = blogsMap.get(blogs[i].author);
      blogsMap.set(blogs[i].author, numberOfBlogsOfAuthor+1);
    }
  }

  console.log("Mapiiiiiiiiiiiiiiiii\n" , blogsMap);
  
  let maxAuthor = '';
  let maxCount = 0;

  blogsMap.forEach((count, author) => {
    if (count > maxCount) {
      maxCount = count;
      maxAuthor = author;
    }
  });

  return {author: maxAuthor, blogs: maxCount}
};

const mostLikes = (blogs) => {
    const likesMap = new Map();

  for (let i = 0; i < blogs.length; i++) {
    if (!likesMap.has(blogs[i].author)) {
      likesMap.set(blogs[i].author, blogs[i].likes);
    } else {
      const numberOfLikesOfAuthor = likesMap.get(blogs[i].author);
      likesMap.set(blogs[i].author, numberOfLikesOfAuthor+blogs[i].likes);
    }
  }

  console.log("Mapiiiiiiiiiiiiiiiii2\n" , likesMap);
  
  let maxAuthor = '';
  let maxLikes = 0;

  likesMap.forEach((likes, author) => {
    if (likes > maxLikes) {
      maxLikes = likes;
      maxAuthor = author;
    }
  });

  return {author: maxAuthor, likes: maxLikes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
