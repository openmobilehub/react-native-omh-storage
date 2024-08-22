package com.openmobilehub.reactnative.storage.core

import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.reactnative.storage.core.extensions.toWritableArray
import com.openmobilehub.reactnative.storage.core.extensions.toWritableMap
import com.openmobilehub.reactnative.storage.core.utils.ErrorUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File

class StorageCoreModuleImpl(
  private val context: ReactApplicationContext,
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

  fun uploadFile(fileName: String, uri: String, folderId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      val file = getFile(Uri.parse(uri), fileName)
      try {
        val uploadedFile = storageClient.uploadFile(file, folderId)
        promise.resolve(uploadedFile?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      } finally {
        file.delete()
      }
    }
  }

  private fun getFile(uri: Uri, fileName: String): File {
    val tempFile = File(context.cacheDir, fileName)

    context.contentResolver.openInputStream(uri)?.use { inputStream ->
      tempFile.outputStream().use { output ->
        inputStream.copyTo(output)
      }
    }

    return tempFile
  }
}
