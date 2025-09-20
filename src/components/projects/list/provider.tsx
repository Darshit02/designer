'use client';
import { fetchProjectsStart, fetchProjectsSuccess } from "@/redux/slice/projects";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  initialProject: any;
};

const ProjectProvider = ({ children, initialProject }: Props) => {
  const dispatch = useAppDispatch();
  const projects = initialProject?._valueJSON as any[] | null;
  const user = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (!user?.id) return;
    dispatch(fetchProjectsStart());
    if (projects) {
      dispatch(fetchProjectsSuccess({ projects, total: projects.length }));
    }
    // Optionally handle errors here
  }, [projects, user?.id, dispatch]);
  return (
    <>
    {children}
    </>
  )
};

export default ProjectProvider;
