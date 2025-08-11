import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type RoomsAPIResponse = Array<{
  id: string;
  name: string;
}>;

export function CreateRoom() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/api/rooms");
      const data: RoomsAPIResponse = await response.json();
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
    <ul className="space-y-2 list-none p-5 m-5">
      <li className="flex items-center justify-between gap-x-4 border-b border-gray-300 dark:border-gray-600 py-2">
        <h2 className="text-lg font-semibold">Join a Room</h2>
      </li>
      {data?.map((room) => (
        <li key={room.id} className="py-2">
          <Link
            className="block w-full px-4 py-2 rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            to={`/room/${room.id}`}
          >
            {room.name}
          </Link>
        </li>
      ))}
      <li className="py-2">
        <Link
          className="block w-full px-4 py-2 rounded-md shadow-md bg-primary hover:bg-primary/90 dark:bg-primary/60 dark:hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
          to="/create-room/new"
        >
          Create a new room
        </Link>
      </li>
    </ul>
  );
}
