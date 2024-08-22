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

  override fun getName() = NAME

  companion object {
    const val NAME = StorageDropboxModuleImpl.NAME
  }
}
