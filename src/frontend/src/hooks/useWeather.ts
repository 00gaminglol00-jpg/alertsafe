import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import { MOCK_WEATHER } from "../data/mockData";
import type { WeatherData } from "../types";

export function useWeather() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WeatherData | null>({
    queryKey: ["weather"],
    queryFn: async () => {
      if (!actor) return MOCK_WEATHER;
      try {
        const result = await actor.getWeather();
        return result as WeatherData | null;
      } catch {
        return MOCK_WEATHER;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}
