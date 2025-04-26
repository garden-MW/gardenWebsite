import { wrapError, DBError } from "db-errors";


// A very simple error handler. In a production setting you would
// not want to send information about the inner workings of your
// application or database to the client.
export default function onError(error, response, next) {
  console.log(error);
  if (response.headersSent) {
    //next(error);
    return;
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
}