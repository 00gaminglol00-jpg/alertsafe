import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type AlertType, createActor } from "../backend";
import { MOCK_ALERTS } from "../data/mockData";
import type { AlertRecord } from "../types";

export function useAlerts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AlertRecord[]>({
    queryKey: ["alerts"],
    queryFn: async () => {
      if (!actor) return MOCK_ALERTS;
      try {
        const result = await actor.getAlerts();
        return result as AlertRecord[];
      } catch {
        return MOCK_ALERTS;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useAlertsByType(alertType: AlertType) {
  const { actor, isFetching } = useActor(createActor);
  const typeValue: string = alertType;
  return useQuery<AlertRecord[]>({
    queryKey: ["alerts", typeValue],
    queryFn: async () => {
      if (!actor)
        return MOCK_ALERTS.filter((a) => (a.alertType as string) === typeValue);
      try {
        const result = await actor.getAlertsByType(typeValue);
        return result as AlertRecord[];
      } catch {
        return MOCK_ALERTS.filter((a) => (a.alertType as string) === typeValue);
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.submitContact(name, email, message);
    },
  });
}
