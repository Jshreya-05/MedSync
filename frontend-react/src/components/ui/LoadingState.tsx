export function LoadingState({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="loading-state">
      <div className="loading-spinner" />
      <p>{message}</p>
    </div>
  );
}




