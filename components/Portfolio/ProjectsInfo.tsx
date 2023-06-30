import { ProjectData } from "./projectDataTypes";
import { ProjectInfoItem } from "./ProjectInfoItem";

export interface ProjectsInfoProps {
  projects: ProjectData[];
  enableScrollObservation: boolean;
  activeProjectId: number | undefined;
  onProjectActivated: (projectId: number) => void;
}

export const ProjectsInfo = ({
  projects,
  activeProjectId,
  enableScrollObservation,
  onProjectActivated: onProjectBecomeActive,
}: ProjectsInfoProps): JSX.Element => (
  <>
    {projects.map((project) => (
      <ProjectInfoItem
        projectData={project}
        enableScrollObservation={enableScrollObservation}
        key={project.id}
        isActive={project.id === activeProjectId}
        onActivated={onProjectBecomeActive}
      />
    ))}
  </>
);
