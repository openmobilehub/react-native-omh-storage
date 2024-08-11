package com.openmobilehub.reactnative.storage.core

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.plugin.dropbox.DropboxOmhStorageFactory
import com.openmobilehub.reactnative.auth.core.OmhAuthModule
import com.openmobilehub.reactnative.auth.plugin.dropbox.OmhDropboxModule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class RNOmhStorageCoreModuleImpl internal constructor(private val context: ReactApplicationContext) {
  private var storageClient: OmhStorageClient? = null

  fun createStorageClient(reflectionPath: String): String {
    val module = context.getNativeModule(OmhDropboxModule::class.java)
    val authClient = module?.moduleImpl?._authClient
    val storageClient = DropboxOmhStorageFactory().getStorageClient(authClient!!)
    this.storageClient = storageClient
    return "clientId"
  }

   fun listFiles(clientId: String, folderId: String) {
    Log.v("RNOmhStorageCoreModuleImpl", "listFiles")


//    Log.v("RNOmhStorageCoreModuleImpl", "listFiles0")
    CoroutineScope(Dispatchers.IO).launch {
      try {
        Log.v("RNOmhStorageCoreModuleImpl", "listFiles1 $folderId")
        val files = storageClient?.listFiles(parentId = folderId)
        Log.v("RNOmhStorageCoreModuleImpl", "$files" )
      } catch (e: Exception) {
//        promise.reject("E_LIST_FILES_FAILED", e.message)
      }
//    val files = storageClient?.listFiles(parentId = folderId)
//    Log.v("RNOmhStorageCoreModuleImpl", "files: ${files}")
//    val writableArray = Arguments.createArray()
//    promise.resolve(writableArray)
    }
  }

  companion object {
    const val NAME = "RNOmhStorageCoreModule"
  }
}
