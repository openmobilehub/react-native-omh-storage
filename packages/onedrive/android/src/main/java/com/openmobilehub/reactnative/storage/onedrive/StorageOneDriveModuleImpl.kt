package com.openmobilehub.reactnative.storage.onedrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.microsoft.graph.models.DriveItem
import com.microsoft.kiota.serialization.KiotaJsonSerialization
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.android.storage.plugin.onedrive.OneDriveOmhStorageFactory
import com.openmobilehub.reactnative.auth.plugin.microsoft.OmhMicrosoftModule
import com.openmobilehub.reactnative.storage.core.StorageCoreModuleImpl

class StorageOneDriveModuleImpl(private val reactContext: ReactApplicationContext) {
  private val moduleImpl = StorageCoreModuleImpl(reactContext, this::createStorageClient)

  private fun createStorageClient(): OmhStorageClient {
    val module = reactContext.getNativeModule(OmhMicrosoftModule::class.java)
    val authClient = module?.authClient
      ?: throw OmhStorageException.DeveloperErrorException("OneDrive auth client is not initialized")
    val storageClient = OneDriveOmhStorageFactory().getStorageClient(authClient)

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
      val driveItem = it as DriveItem;
      // Solution: https://github.com/microsoftgraph/msgraph-sdk-java/issues/2064#issuecomment-2196233961
      driveItem.backingStore.isInitializationCompleted = false;
      KiotaJsonSerialization.serializeAsString(it)
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

  fun deleteFile(fileId: String, promise: Promise) {
    moduleImpl.deleteFile(fileId, promise)
  }

  fun permanentlyDeleteFile(fileId: String, promise: Promise) {
    moduleImpl.permanentlyDeleteFile(fileId, promise)
  }

  fun getPermissions(fileId: String, promise: Promise) {
    moduleImpl.getPermissions(fileId, promise)
  }

  fun getWebUrl(fileId: String, promise: Promise) {
    moduleImpl.getWebUrl(fileId, promise)
  }

  fun createPermission(
    fileId: String,
    role: String,
    sendNotificationEmail: Boolean,
    recipientType: String,
    emailMessage: String?,
    recipientEmail: String?,
    recipientDomain: String?,
    recipientObjectId: String?,
    recipientAlias: String?,
    promise: Promise
  ) {
    moduleImpl.createPermission(
      fileId,
      role,
      sendNotificationEmail,
      recipientType,
      emailMessage,
      recipientEmail,
      recipientDomain,
      recipientObjectId,
      recipientAlias,
      promise,
    )
  }

  fun deletePermission(fileId: String, permissionId: String, promise: Promise) {
    moduleImpl.deletePermission(fileId, permissionId, promise)
  }

  fun updatePermission(fileId: String, permissionId: String, role: String, promise: Promise) {
    moduleImpl.updatePermission(fileId, permissionId, role, promise)
  }

  companion object {
    const val NAME = "StorageOneDriveModule"
  }
}
