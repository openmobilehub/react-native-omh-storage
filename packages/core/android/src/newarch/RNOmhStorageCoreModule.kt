package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhStorageCoreModule.NAME)
class RNOmhStorageCoreModule(
  private val reactContext: ReactApplicationContext
) : NativeOmhStorageModuleSpec(reactContext) {
  private val moduleImpl = RNOmhStorageCoreModuleImpl(reactContext)

  override fun createStorageClient(reflectionPath: String): String {
    return moduleImpl.createStorageClient(reflectionPath)
  }

  override fun listFiles(clientId: String, folderId: String, promise: Promise) {
    return moduleImpl.listFiles(clientId, folderId, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = RNOmhStorageCoreModuleImpl.NAME
  }
}
