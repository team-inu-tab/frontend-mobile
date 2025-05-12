import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router.jsx";
import { Toaster } from "react-hot-toast";
import MailContainer from "@components/common/mailWriteContainer.jsx";
import MailWriteModal from "@components/common/mailWriteModal.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
    {/* <MailContainer/> */}
    {/* <MailWriteModal/> */}
  </StrictMode>
);
