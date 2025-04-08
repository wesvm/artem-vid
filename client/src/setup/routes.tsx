import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "@/setup/protected-route";
import { Layout } from "@/setup/layout";
import LoginPage from "@/pages/LoginPage";

export const router = createBrowserRouter([
  {
    id: "root",
    index: true,
    path: "auth",
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>home</div>,
      },
      {
        path: "users",
        element: <div>users</div>,
      },
      {
        path: "customers",
        element: <div>customers</div>,
      },
    ],
  },
]);
