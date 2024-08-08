package com.openmobilehub.reactnative.storage.core

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.reactnative.auth.core.OmhAuthModule

class RNOmhStorageCoreModuleImpl internal constructor(private val context: ReactApplicationContext) {
  fun createStorageClient(reflectionPath: String): String {
    Log.v("RNOmhStorageCoreModuleImpl", "createStorageClient")
    val module = context.getNativeModule(OmhAuthModule::class.java)
    Log.v("RNOmhStorageCoreModuleImpl", "module: ${module?.omhAuthClient}")
    // getOmhClient
    // getStorageClientFromReflection


    return "clientId"
  }

  fun listFiles(clientId: String, folderId: String, promise: Promise) {
    val writableArray = Arguments.createArray()
    promise.resolve(writableArray)
  }

  companion object {
    const val NAME = "RNOmhStorageCoreModule"
  }
}
