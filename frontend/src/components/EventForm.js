import {
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import { Form } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData(); //gives us access to the data returned by the action
  const navigate = useNavigate();
  const navigation = useNavigation(); //gives us navigation state that can be: idle, loading or submitting

  const isSubmitting = navigation.state === "submitting"; // if submitting, we can disable buttons when we are waiting for form submission

  function cancelHandler() {
    navigate("..");
  }
  //fetching form data with the event prop
  // Form component sends the request to the 'action' with method prop
  return (
    <Form method="post" className={classes.form}>
      {/* outputting error messages from backend */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event && event.title}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event && event.image}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event && event.date}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event && event.description}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting ..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// action for adding a new event + editing an existing event

export async function action({ request, params }) {
  const method = request.method;
  // fetching the input data from the react Form component
  const data = await request.formData();
  //get the identifiers of input fields
  // const enteredTitle = data.get("title")
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  let url = "http://localhost:8080/events";
  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }
  //posting the data to backend
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (response.status === 422) {
    //status sent on backend
    return response;
  }
  if (!response.ok) {
    throw json({ message: "could not save event" }, { status: 500 });
  }
  //redirects user
  return redirect("/events");
}
