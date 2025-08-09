"use client";

import React, { useState } from "react";
import MovieCard from "@/components/MovieCard";
import toast from "react-hot-toast";
import "../styles/HomePage.css";

export default function HomePage() {
  const [movie, setMovie] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("This functionality has not been implemented yet.", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
    setMovie("");
  };

  return (
    <main className="home-container">
      <h1>StreamList Application</h1>
      <p>Welcome to the StreamList Application!</p>
      <p>
        Use the form below to begin manually adding movies or shows to your watch list.
      </p>
      <p>
        Use the Search page to find where to watch a movie or show.
      </p>
      <p>
        Use the Watch List page to manage your watch list.
      </p>

      <section className="add-movie-section">
        <h2>Add Movie or Show</h2>
        <form onSubmit={handleSubmit} className="add-movie-form">
          <input
            type="text"
            placeholder="Type a movie or show..."
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="featured-section">
        <div>
          <h3>Featured Movies & Shows</h3>
          <div className="card-container">
            <MovieCard title="Featured Show" platform="Netflix" />
            <MovieCard title="Featured Movie" platform="Max" />
            <MovieCard title="Featured Movie" platform="Paramount+" />
          </div>
        </div>
        <div>
          <h3>Trending Movies & Shows</h3>
          <div className="card-container">
            <MovieCard title="Trending Show" platform="Disney+, Hulu" />
            <MovieCard title="Trending Movie" platform="Amazon Video" />
            <MovieCard title="Trending Movie" platform="Paramount+" />
          </div>
        </div>
      </section>
    </main>
  );
}