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

  override fun getName() = NAME

  companion object {
    const val NAME = StorageOneDriveModuleImpl.NAME
  }
}
