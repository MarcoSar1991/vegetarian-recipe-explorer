import { useNavigate } from "react-router-dom";

export default function RecipeCard({ result }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${result.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
    >

      <img
        src={result.image}
        alt={result.title}
        loading="lazy"
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
          {result.title}
        </h3>
      </div>

    </div>
  );
}
