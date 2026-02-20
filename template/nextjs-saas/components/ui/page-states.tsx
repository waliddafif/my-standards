"use client";

import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PageStateProps {
  className?: string;
}

/** Empty state — no data yet */
export function EmptyState({
  title = "Aucune donnée",
  description,
  action,
  className,
}: PageStateProps & {
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}

/** Loading state — spinner */
export function LoadingState({
  message = "Chargement...",
  className,
}: PageStateProps & { message?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 gap-3", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/** Error state — with optional retry */
export function ErrorState({
  title = "Une erreur est survenue",
  description,
  onRetry,
  className,
}: PageStateProps & {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="rounded-full bg-destructive/10 p-4 mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>Réessayer</Button>
      )}
    </div>
  );
}
