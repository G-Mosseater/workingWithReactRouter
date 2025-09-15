import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
export default function Error() {
    const error = useRouteError()
    let title = 'An error occured'
    let message = 'Something went wrong'

    if (error.status === 500) {
        message = (error.data).message       //need to parse if not using json() function
    }

    if(error.status === 404) {
        title = 'Not found'
        message = 'Could not find page'
    }
  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
}
