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
    const val NAME = StorageDropboxModuleImpl.NAME
  }
}
