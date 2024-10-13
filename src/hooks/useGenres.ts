import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}
const useGeneres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGenresResponse>("/genres", {
          signal: controller.signal,
        });
        setGenres(res.data.results);
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

  return { genres, error, isLoading };
};

export default useGeneres;
