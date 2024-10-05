import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { parent: Platform }[];
  metacritic: number;
}
interface FetchGames {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGames>("/games", {
          signal: controller.signal,
        });
        setGames(res.data.results);
        setLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) {
          return;
        } else {
          setError("An unknown error occurred");
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
