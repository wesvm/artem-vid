import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "@/setup/protected-route";
import { Layout } from "@/setup/layout";
import LoginPage from "@/pages/LoginPage";
import UsersPage from "@/pages/users";
import CustomersPage from "@/pages/customers";

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
        element: <div>welcome!</div>,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
    ],
  },
]);
