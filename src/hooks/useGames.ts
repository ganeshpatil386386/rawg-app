import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
}
interface FetchGames {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGames>("/games", {
          signal: controller.signal,
        });
        setGames(res.data.results);
      } catch (err) {
        if (err instanceof CanceledError) {
          return;
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchGames();

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
