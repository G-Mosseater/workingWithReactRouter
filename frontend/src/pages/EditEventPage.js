import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditEventPage() {
  const data = useRouteLoaderData('event-detail');
  const event = data.event;
  //passing the event data through the event prop
  return <EventForm event={event} method={'patch'} />;
}
