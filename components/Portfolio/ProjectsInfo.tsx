import { ProjectData } from "./projectDataTypes";
import { ProjectInfoItem } from "./ProjectInfoItem";

export interface ProjectsInfoProps {
  readonly projects: readonly ProjectData[];
  readonly enableScrollObservation: boolean;
  readonly activeProjectId: number | undefined;
  readonly onProjectActivated: (projectId: number) => void;
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
