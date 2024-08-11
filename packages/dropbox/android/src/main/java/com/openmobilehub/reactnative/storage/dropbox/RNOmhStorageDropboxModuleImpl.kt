package com.openmobilehub.reactnative.storage.dropbox

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageEntity
import com.openmobilehub.android.storage.plugin.dropbox.DropboxOmhStorageFactory
import com.openmobilehub.reactnative.auth.plugin.dropbox.OmhDropboxModule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class RNOmhStorageDropboxModuleImpl(private val reactContext: ReactApplicationContext) {
  var storageClient: OmhStorageClient? = null

  fun createStorageClient() {
    val module = reactContext.getNativeModule(OmhDropboxModule::class.java)
    val authClient = module?.moduleImpl?._authClient
    val storageClient = DropboxOmhStorageFactory().getStorageClient(authClient!!)
    this.storageClient = storageClient
  }

  fun listFiles(folderId: String, promise: Promise) {
    Log.v("RNOmhStorageCoreModuleImpl", "listFiles")

    CoroutineScope(Dispatchers.IO).launch {
      try {
        Log.v("RNOmhStorageCoreModuleImpl", "listFiles1 $folderId")
        val files = storageClient?.listFiles(parentId = folderId)
        Log.v("RNOmhStorageCoreModuleImpl", "storageClient: $storageClient")
        val writableArray: WritableArray = Arguments.createArray()

       files?.forEach {
          writableArray.pushMap(Arguments.createMap().apply {
            when (it) {
              is OmhStorageEntity.OmhFile -> {
                putString("type", "file")
                putString("id", it.id)
                putString("name", it.name)
                putString("createdTime", it.createdTime.toString())
                putString("modifiedTime", it.modifiedTime.toString())
                putString("parentId", it.parentId)
                putString("mimeType", it.mimeType)
                putString("extension", it.extension)
                putInt("size", it.size ?: -1)
              }
              is OmhStorageEntity.OmhFolder -> {
                putString("type", "folder")
                putString("id", it.id)
                putString("name", it.name)
                putString("createdTime", it.createdTime.toString())
                putString("modifiedTime", it.modifiedTime.toString())
                putString("parentId", it.parentId)
              }
            }
          })
        }

        Log.v("RNOmhStorageCoreModuleImpl", "$writableArray")

        promise.resolve(writableArray)

      } catch (e: Exception) {
        promise.reject("E_LIST_FILES_FAILED", e.message)
      }
    }
  }

  companion object {
    const val NAME = "RNOmhStorageDropboxModule"
  }
}
