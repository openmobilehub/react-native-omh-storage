package com.openmobilehub.reactnative.storage.googledrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.OmhStorageProvider
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.reactnative.auth.plugin.google.OmhGoogleModule
import com.openmobilehub.reactnative.storage.core.StorageCoreModuleImpl
import com.openmobilehub.android.storage.plugin.googledrive.gms.GoogleDriveGmsConstants
import com.openmobilehub.android.storage.plugin.googledrive.nongms.GoogleDriveNonGmsConstants


class StorageGoogleDriveModuleImpl(private val reactContext: ReactApplicationContext) {
  private val moduleImpl = StorageCoreModuleImpl(reactContext, this::createStorageClient)

  private fun createStorageClient(): OmhStorageClient {
    val module = reactContext.getNativeModule(OmhGoogleModule::class.java)

    val authClient = module?.authClient
      ?: throw OmhStorageException.DeveloperErrorException("Google auth client is not initialized")

    val storageClient = OmhStorageProvider.Builder()
      .addGmsPath(GoogleDriveGmsConstants.IMPLEMENTATION_PATH)
      .addNonGmsPath(GoogleDriveNonGmsConstants.IMPLEMENTATION_PATH)
      .build()
      .provideStorageClient(authClient, reactContext)

    return storageClient
  }

  fun initialize() {
    moduleImpl.initialize()
  }

  fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  fun getFileMetadata(fileId: String, promise: Promise) {
    moduleImpl.getFileMetadata(fileId, promise) {
      it.toString()
    }
  }

  fun uploadFile(fileName: String, uri: String, folderId: String, promise: Promise) {
    moduleImpl.uploadFile(fileName, uri, folderId, promise)
  }

  fun search(query: String, promise: Promise) {
    moduleImpl.search(query, promise)
  }

  fun updateFile(fileName: String, uri: String, fileId: String, promise: Promise) {
    moduleImpl.updateFile(fileName, uri, fileId, promise)
  }

  fun downloadFile(fileId: String, filePath: String, promise: Promise) {
    moduleImpl.downloadFile(fileId, filePath, promise)
  }

  fun exportFile(fileId: String, mimeType: String, filePath: String, promise: Promise) {
    moduleImpl.exportFile(fileId, mimeType, filePath, promise)
  }

  fun getFileVersions(fileId: String, promise: Promise) {
    moduleImpl.getFileVersions(fileId, promise)
  }

  fun downloadFileVersion(fileId: String, versionId: String, filePath: String, promise: Promise) {
    moduleImpl.downloadFileVersion(fileId, versionId, filePath, promise)
  }

  fun createFileWithMimeType(name: String, mimeType: String, parentId: String, promise: Promise) {
    moduleImpl.createFileWithMimeType(name, mimeType, parentId, promise)
  }

  fun createFileWithExtension(name: String, fileExtension: String, parentId: String, promise: Promise) {
    moduleImpl.createFileWithExtension(name, fileExtension, parentId, promise)
  }

  fun createFolder(name: String, parentId: String, promise: Promise) {
    moduleImpl.createFolder(name, parentId, promise)
  }

  fun getPermissions(fileId: String, promise: Promise) {
    moduleImpl.getPermissions(fileId, promise)
  }

  companion object {
    const val NAME = "StorageGoogleDriveModule"
  }
}
