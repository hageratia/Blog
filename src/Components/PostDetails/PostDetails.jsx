import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { slug } = useParams(); // استخدام التدمير لاستخراج slug
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/gh/hageratia/blogApi/db.json"
        );
        if (response.ok) {
          const data = await response.json();
          const foundPost = data.posts.find((p) => p.slug === slug); // البحث عن البوست بناءً على الـ slug
          if (foundPost) {
            setPost(foundPost);
          } else {
            setError("Post not found");
          }
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isloading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="p-6">
      {post ? (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="mt-4"> {post.content} </p>
        </>
      ) : (
        <div>Post not found</div>
      )}
    </section>
  );
};

export default PostDetails;
