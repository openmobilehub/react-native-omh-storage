package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class CoreSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  // TODO: POC, remove once implemented
  abstract fun listFiles(promise: Promise)
}
