import type { GoogleStorageApiService } from './GoogleStorageApiService';

export class GoogleStorageRepository {
  private apiService: GoogleStorageApiService;

  constructor(apiService: GoogleStorageApiService) {
    this.apiService = apiService;
  }

  listFiles(folderId: string) {
    return this.apiService.listFiles(folderId);
  }
}
