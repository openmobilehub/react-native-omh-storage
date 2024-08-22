package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.reactnative.storage.core.extensions.toWritableArray
import com.openmobilehub.reactnative.storage.core.utils.ErrorUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream

class StorageCoreModuleImpl(
  context: ReactApplicationContext,
  private val createStorageClient: () -> OmhStorageClient
) {
  private var _storageClient: OmhStorageClient? = null
  private val storageClient: OmhStorageClient
    get() = _storageClient
      ?: throw OmhStorageException.DeveloperErrorException("OmhStorageClient is not yet initialized")

  fun initialize() {
    _storageClient = createStorageClient()
  }

  fun listFiles(folderId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val files = storageClient.listFiles(parentId = folderId)
        promise.resolve(files.toWritableArray())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun downloadFile(fileId: String, filePath: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val byteArrayOutputStream = storageClient.downloadFile(fileId)

        writeToFile(filePath, byteArrayOutputStream.toByteArray())

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun exportFile(fileId: String, mimeType: String, filePath: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val byteArrayOutputStream = storageClient.exportFile(fileId, mimeType)

        writeToFile(filePath, byteArrayOutputStream.toByteArray())

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  private fun writeToFile(filePath: String, bytes: ByteArray) {
    val file = File(filePath)

    FileOutputStream(file).use { fileOutputStream ->
      fileOutputStream.write(bytes)
    }
  }
}
