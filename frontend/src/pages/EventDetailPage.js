import {
  useParams,
  json,
  useLoaderData,
  useRouteLoaderData,
  redirect
} from "react-router-dom";
import EventItem from "../components/EventItem";
export default function EventDetailPage() {
  // const params = useParams(); //gives us access to the values that are encoded in the URL, eventid in this case

  // const data = useLoaderData()

  //eventDetailpage route will search for the closest available userLoaderData and that is itself
  //use routeLoaderData with a given id to specify where to look (it's parent)
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      {/* <h1>EventDetailPage</h1>
    <p>EVENT ID: {params.eventId}</p> */}

      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "could not fetch details for selected event" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  //get the id with params
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {method: request.method});
    if (!response.ok) {
    throw json(
      { message: "could not fetch details for selected event" },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
}
