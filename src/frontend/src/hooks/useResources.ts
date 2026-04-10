import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { type ResourceType, createActor } from "../backend";
import { MOCK_RESOURCES } from "../data/mockData";
import type { ResourceRecord } from "../types";

export function useResources() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ResourceRecord[]>({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return MOCK_RESOURCES;
      try {
        const result = await actor.getResources();
        return result as ResourceRecord[];
      } catch {
        return MOCK_RESOURCES;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useResourcesByType(resourceType: ResourceType) {
  const { actor, isFetching } = useActor(createActor);
  const typeValue: string = resourceType;
  return useQuery<ResourceRecord[]>({
    queryKey: ["resources", typeValue],
    queryFn: async () => {
      if (!actor)
        return MOCK_RESOURCES.filter(
          (r) => (r.resourceType as string) === typeValue,
        );
      try {
        const result = await actor.getResourcesByType(typeValue);
        return result as ResourceRecord[];
      } catch {
        return MOCK_RESOURCES.filter(
          (r) => (r.resourceType as string) === typeValue,
        );
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}
