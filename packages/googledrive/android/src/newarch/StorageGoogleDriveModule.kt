package com.openmobilehub.reactnative.storage.googledrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = StorageGoogleDriveModule.NAME)
class StorageGoogleDriveModule(
  private val reactContext: ReactApplicationContext
) : NativeGoogleDriveStorageClientSpec(reactContext) {
  private val moduleImpl = StorageGoogleDriveModuleImpl(reactContext)

  @ReactMethod
  override fun initializeStorageClient() {
    moduleImpl.initialize()
  }

  @ReactMethod
  override fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  @ReactMethod
  override fun uploadFile(fileName: String, uri: String, folderId: String, promise: Promise) {
    moduleImpl.uploadFile(fileName, uri, folderId, promise)
  }

  @ReactMethod
  override fun getFileMetadata(fileId: String, promise: Promise) {
    moduleImpl.getFileMetadata(fileId, promise)
  }

  @ReactMethod
  override fun search(query: String, promise: Promise) {
    moduleImpl.search(query, promise)
  }

  @ReactMethod
  override fun updateFile(fileName: String, uri: String, fileId: String, promise: Promise) {
    moduleImpl.updateFile(fileName, uri, fileId, promise)
  }

  @ReactMethod
  override fun downloadFile(fileId: String, filePath: String, promise: Promise) {
    moduleImpl.downloadFile(fileId, filePath, promise)
  }

  @ReactMethod
  override fun exportFile(fileId: String, mimeType: String, filePath: String, promise: Promise) {
    moduleImpl.exportFile(fileId, mimeType, filePath, promise)
  }

  @ReactMethod
  override fun getFileVersions(fileId: String, promise: Promise) {
    moduleImpl.getFileVersions(fileId, promise)
  }

  @ReactMethod
  override fun downloadFileVersion(fileId: String, versionId: String, filePath: String, promise: Promise) {
    moduleImpl.downloadFileVersion(fileId, versionId, filePath, promise)
  }

  @ReactMethod
  override fun createFileWithMimeType(name: String, mimeType: String, parentId: String, promise: Promise) {
    moduleImpl.createFileWithMimeType(name, mimeType, parentId, promise)
  }

  @ReactMethod
  override fun createFileWithExtension(name: String, fileExtension: String, parentId: String, promise: Promise) {
    moduleImpl.createFileWithExtension(name, fileExtension, parentId, promise)
  }

  @ReactMethod
  override fun createFolder(name: String, parentId: String, promise: Promise) {
    moduleImpl.createFolder(name, parentId, promise)
  }

  @ReactMethod
  override fun deleteFile(fileId: String, promise: Promise) {
    moduleImpl.deleteFile(fileId, promise)
  }

  @ReactMethod
  override fun permanentlyDeleteFile(fileId: String, promise: Promise) {
    moduleImpl.permanentlyDeleteFile(fileId, promise)
  }

  @ReactMethod
  override fun getPermissions(fileId: String, promise: Promise) {
    moduleImpl.getPermissions(fileId, promise)
  }

  @ReactMethod
  override fun getWebUrl(fileId: String, promise: Promise) {
    moduleImpl.getWebUrl(fileId, promise)
  }

  @ReactMethod
  override fun createPermission(
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

  @ReactMethod
  override fun deletePermission(fileId: String, permissionId: String, promise: Promise) {
    moduleImpl.deletePermission(fileId, permissionId, promise)
  }

  @ReactMethod
  override fun updatePermission(fileId: String, permissionId: String, role: String, promise: Promise) {
    moduleImpl.updatePermission(fileId, permissionId, role, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = StorageGoogleDriveModuleImpl.NAME
  }
}
