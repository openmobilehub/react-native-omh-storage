package com.openmobilehub.reactnative.storage.core

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhStorageCoreModule.NAME)
class RNOmhStorageCoreModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
  private val moduleImpl = RNOmhStorageCoreModuleImpl(reactContext)

  @ReactMethod
  fun createStorageClient(reflectionPath: String): String {
    return moduleImpl.createStorageClient(reflectionPath)
  }

  @ReactMethod
   fun listFiles(clientId: String, folderId: String) {
    Log.v("RNOmhStorageCoreModule", "listFiles-1")
    return moduleImpl.listFiles(clientId, folderId)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = RNOmhStorageCoreModuleImpl.NAME
  }
}
