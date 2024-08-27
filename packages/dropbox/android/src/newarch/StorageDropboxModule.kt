package com.openmobilehub.reactnative.storage.dropbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = StorageDropboxModule.NAME)
class StorageDropboxModule(
  private val reactContext: ReactApplicationContext
) : NativeDropboxStorageClientSpec(reactContext) {
  private val moduleImpl = StorageDropboxModuleImpl(reactContext)

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

  override fun getName() = NAME

  companion object {
    const val NAME = StorageDropboxModuleImpl.NAME
  }
}
