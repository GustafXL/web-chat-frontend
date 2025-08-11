import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function Room() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-room", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/api/rooms/${id}`);
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-b-2 border-blue-500 rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Room {data?.name}</h1>
    </div>
  );
}
