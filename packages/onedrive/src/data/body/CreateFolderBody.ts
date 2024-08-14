export interface CreateFolderBody {
  'name': string;
  'folder': object;
  '@microsoft.graph.conflictBehavior': 'rename';
}
