
export interface ProjectsInterface{
    projects:Array<any>
}

export type ProjectDefinition ={
    url: string[]
    id?: number;
    name: string;
    description: string;
    role: string;
    tech: string;
    image:string;
    projid:string;
    type: string[];
}
