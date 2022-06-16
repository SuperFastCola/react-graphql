
export interface ProjectsInterface{
    length: number;
    projects:Array<any>
}

export type Image = {
    order:number;
    s:string;
    m:string;
    l:string;
    xl:string;
}

export type ProjectDefinition ={
    url: string[]
    id?: number;
    name: string;
    description: string;
    role: string;
    tech: string;
    image:Image[];
    projid:string;
    type: string[];
}
