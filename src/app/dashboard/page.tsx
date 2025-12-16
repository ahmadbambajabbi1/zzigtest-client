import React from "react";
import AuthenticatedPage from "@/layouts/AuthenticatedPage";
import Dashboard from "@/components/dashboard";

const dashboardPage = () => {
  return (
    <AuthenticatedPage>
      <Dashboard />
    </AuthenticatedPage>
  );
};

export default dashboardPage;
