export interface CreateFileRequestBody {
  name: string;
  mimeType: string;
  parents?: string[];
}
