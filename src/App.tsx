import { RouterProvider } from "react-router-dom";
import router from './router';
import { WebSocketProvider } from './WebsocketProvider';
// import { Alert, Snackbar } from "@mui/material";
import './main.scss';
const App = () => {
  return (<>
    {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={reduxStore.isEnabled}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={reduxStore.type}
          sx={{ width: "100%" }}
        >
          {reduxStore.msg}
        </Alert>
      </Snackbar> */}
    <WebSocketProvider>
      <RouterProvider router={router} />
    </WebSocketProvider>
  </>
  )
};

export default App;