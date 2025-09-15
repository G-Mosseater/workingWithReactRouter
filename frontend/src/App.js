import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetailPage, {
  loader as EventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import NewEventPage from "./pages/NewEventPage";
import { action as manipulateEventAction } from "./components/EventForm";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import EventsRoot from "./pages/EventsRoot";
import Error from "./pages/Error";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/NewsletterPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            {
              index: true,
              element: <EventsPage />, //fetching data before the component gets rendered
              //cannot use useLoaderData on a higher level element than the one where fetching data
              // move the code in the component that's needed
              loader: eventsLoader,
            },
            //passing the event data with a loader()
            {
              path: ":eventId",
              id: "event-detail",
              //nested route so  we can access the loader in the children routes
              loader: EventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: manipulateEventAction,
                },
              ],
            },

            // {
            //   path: ":eventId",
            //   element: <EventDetailPage />,
            //   loader: EventDetailLoader,
            // },

            //sending data to backend with action function
            {
              path: "new",
              element: <NewEventPage />,
              action: manipulateEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
