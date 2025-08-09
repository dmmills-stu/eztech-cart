import '../styles/MovieCard.css'
import { MovieCardProps } from "@/types/MovieCardProps";
import { MdMovie } from "react-icons/md";

const MovieCard = ({ title, platform }: MovieCardProps) => {
    return (
    <div className="movie-card">
      <MdMovie className="placeholder-icon" />
      <p>
        {title} Available On: {platform}
      </p>
    </div>
  );
}

export default MovieCard;