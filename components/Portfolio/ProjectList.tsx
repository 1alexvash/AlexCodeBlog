import { ProjectData } from "./projectDataTypes";
import { ProjectItem } from "./ProjectItem";

export interface ProjectListProps {
  readonly projects: readonly ProjectData[];
  readonly activeProjectId: string | undefined;
  readonly onProjectClick: (projectId: string) => void;
}

export const ProjectList = ({
  projects,
  onProjectClick,
  activeProjectId,
}: ProjectListProps): JSX.Element => (
  <>
    {projects.map((project) => (
      <ProjectItem
        key={project.id}
        isActive={activeProjectId === project.id}
        lightImage={project.lightImage}
        darkImage={project.darkImage}
        title={project.title}
        onClick={() => {
          onProjectClick(project.id);
        }}
      />
    ))}
  </>
);
