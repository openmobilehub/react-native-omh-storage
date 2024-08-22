package com.openmobilehub.reactnative.storage.onedrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = StorageOneDriveModule.NAME)
class StorageOneDriveModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
  private val moduleImpl = StorageOneDriveModuleImpl(reactContext)

  @ReactMethod
  fun initializeStorageClient() {
    moduleImpl.initialize()
  }

  @ReactMethod
  fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  @ReactMethod
  fun uploadFile(fileName: String, uri: String, folderId: String, promise: Promise) {
    moduleImpl.uploadFile(fileName, uri, folderId, promise)
  }

  @ReactMethod
  fun getFileMetadata(fileId: String, promise: Promise) {
    moduleImpl.getFileMetadata(fileId, promise)
  }

  @ReactMethod
  fun search(query: String, promise: Promise) {
    moduleImpl.search(query, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = StorageOneDriveModuleImpl.NAME
  }
}
