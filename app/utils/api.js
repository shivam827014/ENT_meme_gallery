// api.js
import axios from "axios";

const fetchMemes = async (after = null) => {
  try {
    const response = await axios.get(
      `https://www.reddit.com/r/memes.json${after ? `?after=${after}` : ""}`
    );

    const memes = response.data.data.children.map((child) => {
      const post = child.data;
      return {
        id: post.id,
        title: post.title,
        thumbnail: post.thumbnail,
        url: post.url,
      };
    });

    return {
      memes,
      after: response.data.data.after,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchMemes };
