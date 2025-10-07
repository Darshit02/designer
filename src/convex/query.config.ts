import { preloadQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { ConvexUserRaw, normalizeProfile } from "@/types/user";
import { Id } from "../../convex/_generated/dataModel";

export const ProfileQuery = async () => {
  return await preloadQuery(
    api.user.getCurrentUser,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );
};

export const SubscriptionEntitlementQuery = async () => {
  const rawProfile = await ProfileQuery();
  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null
  );

  const entitlement = await preloadQuery(
    api.subscription.hasEntitalment,
    {
      userId: profile?.id as Id<"users">,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
  return { entitlement, profileName: profile?.name || "User" };
};


export const projectsQuery = async () => {
  const token = await convexAuthNextjsToken();

  const rawProfile = await preloadQuery(
    api.user.getCurrentUser,
    {},
    { token }
  );

  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null
  );

  if (!profile?.id) {
    return { projects: [], profile: null, projectsPreload: null };
  }

  const projectsPreload = await preloadQuery(
    api.projects.getUserProjects,
    { userId: profile.id as Id<"users"> },
    { token }
  );

  const projects = (projectsPreload._valueJSON as unknown as Array<any>) ?? [];

  return { projects, profile, projectsPreload };
};

export const projectQuery = async (projectId:string) => {
  const rawProfile = await ProfileQuery()
  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null
  );

  if (!profile?.id || !projectId) {
    return { project:null, profile: null };
  }
  const project =  await preloadQuery(
        api.projects.getProject,
        { projectId: projectId as Id<"projects"> },
        { token: await convexAuthNextjsToken() }
      )

  return { project, profile };
};

export const StyleGuideQuery = async (projectId?:string) => {
  if (!projectId) return { styleGuide: null };

  const styleGuide = await preloadQuery(
    api.projects.getProjectStyleGuide,
    { projectId: projectId as Id<"projects">,},
    { token: await convexAuthNextjsToken() }
  );

  return { styleGuide };
};


export const MoodBoardImageQuery = async (projectId : string) => {
  const images = await preloadQuery(
    api.moodboard.getMoodBoardImages,
    {
      projectId: projectId as Id<"projects">,
    },
    { token: await convexAuthNextjsToken() }
  )
  return { images }
}