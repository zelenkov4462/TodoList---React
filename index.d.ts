declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

type FileType = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

type Todo = {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  selectedFiles: FileType | null;
  date: any;
};
