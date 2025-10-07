import InfinityCanvas from '@/components/canvas'
import ProjectProvider from '@/components/projects/provider'
import { projectQuery } from '@/convex/query.config'
import React from 'react'

interface CanvasPageProps {
  searchParams : Promise<{ project? : string}>
}

const CanvasGuide = async ({searchParams}: CanvasPageProps) => {
  const params = await searchParams
  const projectId = params.project

  if(!projectId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          No project selected
        </p>
      </div>
    )
  }
  
  const { profile , project } = await projectQuery(projectId)
  if(!profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          No project selected
        </p>
      </div>
    )
  }

  if(!project){
    return(
      <div className="w-full h-screen flex items-center justify-center">
      <p className="text-red-500">
        Project Not found or access denied
      </p>
    </div>
    )
  }
  return (
    <ProjectProvider initialProject={project}>
      <InfinityCanvas/>
    </ProjectProvider>
  )
}

export default CanvasGuide