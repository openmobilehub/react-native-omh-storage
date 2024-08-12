package com.openmobilehub.reactnative.storage.core

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageEntity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class StorageModuleImpl(
  context: ReactApplicationContext,
  private val createStorageClient: () -> OmhStorageClient
) {

  private var _storageClient: OmhStorageClient? = null

  private val storageClient: OmhStorageClient
    get() = _storageClient ?: throw Exception("OmhStorageClient is not initialized")


  fun initialize() {
    _storageClient = createStorageClient()
  }

  fun listFiles(folderId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        Log.v("RNOmhStorageCoreModuleImpl", "listFiles1 $folderId")
        val files = storageClient.listFiles(parentId = folderId)
        Log.v("RNOmhStorageCoreModuleImpl", "storageClient: $storageClient")
        val writableArray: WritableArray = Arguments.createArray()

        files.forEach {
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
}
