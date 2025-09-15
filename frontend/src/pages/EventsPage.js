import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

//useLoaderData to get access to the "closest"
function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={ <p>Loading...</p> }>
    <Await resolve={events}>
      {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await>
    </Suspense>
  );
  //commented out because of defer
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  // return <>{<EventsList events={events} />}</>;
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  // error handling
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    // throw {message: "Could not fetch events."}
    // throw new Response(JSON.stringify({ message: "could not fetch events." }), {
    //   status: 500,
    // });
    return json({ message: "could not fetch events." }, { status: 500 });
  } else {
    // const resData = await response.json();
    // const res = new Response('data',{status: 201})
    // return response;
    // required since we are using defer
    const resData = await response.json()
    return resData.events
  }
}

// use defer to show some content on a page while waiting for other to load...
// defer not needed in ReactRouter v7
export function loader() {
  return defer({
    events: loadEvents(),
  });
}

// export async function loader() {
//   // cannot use react hooks in the loader
//   const response = await fetch("http://localhost:8080/events");
//   // error handling
//   if (!response.ok) {
//     // return { isError: true, message: "Could not fetch events." };
//     // throw {message: "Could not fetch events."}
//     // throw new Response(JSON.stringify({ message: "could not fetch events." }), {
//     //   status: 500,
//     // });
//     return json({ message: "could not fetch events." }, { status: 500 });
//   } else {
//     // const resData = await response.json();
//     // const res = new Response('data',{status: 201})
//     return response;
//   }
// }
