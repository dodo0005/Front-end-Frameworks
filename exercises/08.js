
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts() {
  try {
    const res = await fetch(BASE_URL + "/posts");
    const posts = await res.json();

    const firstFive = posts.slice(0, 5);

    firstFive.forEach(post => console.log(post.title));

    return firstFive;
  } catch (error) {
    console.log("Failed to load posts");
  }
}

fetchPosts();



async function getPostById(id) {
  const res = await fetch(BASE_URL + "/posts/" + id);

  if (!res.ok) {
    throw new Error("Post not found");
  }

  return await res.json();
}

getPostById(1)
  .then(post => console.log(post))
  .catch(error => console.log(error.message));




getPostById(99999)
  .then(post => console.log(post))
  .catch(error => console.log(error.message));

