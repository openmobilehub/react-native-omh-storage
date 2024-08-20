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
    return moduleImpl.initialize()
  }

  @ReactMethod
  override fun listFiles(folderId: String, promise: Promise) {
    return moduleImpl.listFiles(folderId, promise)
  }

  @ReactMethod
  fun downloadFile(folderId: String, promise: Promise) {
    return moduleImpl.downloadFile(folderId, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = StorageGoogleDriveModuleImpl.NAME
  }
}
