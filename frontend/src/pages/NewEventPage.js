import React from "react";
import EventForm from "../components/EventForm";
import { json,redirect } from "react-router-dom";
export default function NewEventPage() {
  return <EventForm method={'post'}/>;
}

//sending data to backend
// comment out since we created an action that handles both EDIT and SAVING 
// export async function action({ request, params }) {
//   // fetching the input data from the react Form component
//   const data = await request.formData();
//   //get the identifiers of input fields
//   // const enteredTitle = data.get("title")
//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };
//   //posting the data to backend
//   const response = await fetch("http://localhost:8080/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventData),
//   });
//   if (response.status === 422) {   //status sent on backend
//       return response
//   }
//   if (!response.ok) {
//     throw json({ message: "could not save event" }, { status: 500 });
//   }
// //redirects user
//   return redirect('/events')
// }
