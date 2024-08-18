import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/gh/hageratia/blogApi/db.json"
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const handlePostClick = (slug) => {
    navigate(`/posts/${slug}`);
  };

  const filterdPosts = useMemo(() => {
    if (!search) return posts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);

  return (
    <>
      <section>
        <div className="container py-6">
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1 className="text-xl font-bold">Blog</h1>
          </div>
        </div>
        <div className="p-4">
          <input
            placeholder="search"
            className="p-2 px-3 rounded-md text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isloading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filterdPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.slug)}
                className="bg-gray-900 p-4 cursor-pointer"
              >
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p>{post.slug}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
