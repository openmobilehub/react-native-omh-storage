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
    return moduleImpl.initialize()
  }

  @ReactMethod
  fun listFiles(folderId: String, promise: Promise) {
    return moduleImpl.listFiles(folderId, promise)
  }

  @ReactMethod
  fun downloadFile(folderId: String, promise: Promise) {
    return moduleImpl.downloadFile(folderId, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = StorageOneDriveModuleImpl.NAME
  }
}
