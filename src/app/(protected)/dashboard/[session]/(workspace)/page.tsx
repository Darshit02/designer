import ProjectList from "@/components/projects/list";
import ProjectProvider from "@/components/projects/list/provider";
import { projectQuery, projectsQuery } from "@/convex/query.config";
import React from "react";

const Page = async () => {
  const { projects, profile, projectsPreload } = await projectsQuery();

  if (!profile) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Authenticated Required
          </h1>
          <p className="text-muted-foreground">
            Please sign in to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProjectProvider initialProject={projectsPreload}>
      <div className="container mx-auto py-36 px-4">
        <ProjectList />
      </div>
    </ProjectProvider>
  );
};

export default Page;
