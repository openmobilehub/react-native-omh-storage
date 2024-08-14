package com.openmobilehub.reactnative.storage.onedrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = StorageOneDriveModule.NAME)
class StorageOneDriveModule(
  private val reactContext: ReactApplicationContext
) : NativeOneDriveStorageClientSpec(reactContext) {
  private val moduleImpl = StorageOneDriveModuleImpl(reactContext)

  @ReactMethod
  override fun initializeStorageClient() {
    return moduleImpl.initialize()
  }

  @ReactMethod
  override fun listFiles(folderId: String, promise: Promise) {
    return moduleImpl.listFiles(folderId, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = StorageOneDriveModuleImpl.NAME
  }
}
