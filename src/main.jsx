import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router.jsx";
import { Toaster } from "react-hot-toast";
// import MailWriteModal from "@components/common/mailWriteModal.jsx";
// import Signin from "@screens/signin.jsx";
// import Landing from "@screens/landingScreen.jsx";
// import SendComplete from "@screens/sendCompleteScreen.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
    {/* <MailWriteModal></MailWriteModal> */}
    {/* <TextEditor></TextEditor> */}
    {/* <Signin></Signin> */}
    {/* <AddInfoComp></AddInfoComp> */}
    {/* <MailWriteModal/> */}
    {/* <Landing/> */}
    {/* <SendComplete/> */}
  </StrictMode>
);
