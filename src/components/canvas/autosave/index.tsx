"use client";

import { useAutosaveProjectMutation } from "@/redux/api/project";
import { useAppSelector } from "@/redux/store";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const AutoSave = (props: Props) => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const user = useAppSelector((state) => state.profile.user);
  const shapeState = useAppSelector((state) => state.shapes);
  const viewportState = useAppSelector((state) => state.viewport);
  const [autosaveProject, { isLoading: isSaving }] =
    useAutosaveProjectMutation();
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const isRedy = Boolean(projectId && user?.id);

  useEffect(() => {
    if (!isRedy) return;
    const stateString = JSON.stringify({
      shapes: shapeState,
      viewport: viewportState,
    });
    if (stateString === lastSavedRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      lastSavedRef.current = stateString;
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      setSaveStatus("saving");
      try {
        await autosaveProject({
          projectId: projectId as string,
          userId: user?.id as string,
          shapesData: shapeState,
          viewPortData: {
            scale: viewportState.scale,
            translate: viewportState.translate,
          },
        }).unwrap();
        setSaveStatus("saved");
        setTimeout(() => {
          setSaveStatus("idle");
        }, 1000);
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        setSaveStatus("error");
        setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
      }
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [isRedy, shapeState, viewportState, projectId, user?.id, autosaveProject]);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!isRedy) return null;

  if (isSaving) {
    return (
      <div className="flex items-center">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }
  switch (saveStatus) {
    case "saved":
      return (
        <div className="flex item-center">
          <CheckCircle className="w-4 h-4" />
        </div>
      );
    case "error":
      return (
        <div className="flex items-center">
          <AlertCircle className="w-4 h-4" />
        </div>
      );

    default:
      return <></>;
  }
};

export default AutoSave;
