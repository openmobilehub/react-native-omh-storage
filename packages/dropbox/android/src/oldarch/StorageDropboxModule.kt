package com.openmobilehub.reactnative.storage.dropbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = StorageDropboxModule.NAME)
class StorageDropboxModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
  private val moduleImpl = StorageDropboxModuleImpl(reactContext)

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
  
  @ReactMethod
  fun exportFile(folderId: String, mimeType: String, promise: Promise) {
    return moduleImpl.exportFile(folderId, mimeType, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = StorageDropboxModuleImpl.NAME
  }
}
