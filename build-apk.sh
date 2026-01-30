#!/bin/bash
# Everything Coffee - Build Script for Android APK
# This script automates the APK build process

set -e

echo "========================================"
echo "Everything Coffee - Android APK Builder"
echo "========================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm $(npm --version)"

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install JDK 11 or higher."
    exit 1
fi
echo "✅ Java $(java -version 2>&1 | head -1)"

# Check Android SDK
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "⚠️  Warning: ANDROID_HOME or ANDROID_SDK_ROOT not set"
    echo "    Please set: export ANDROID_HOME=/path/to/android-sdk"
fi

echo ""
echo "Step 1: Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "Step 2: Building Angular application..."
npm run build

echo ""
echo "Step 3: Syncing with Capacitor..."
npm run capsync

echo ""
echo "========================================"
echo "✅ Build preparation complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Open Android Studio: npx capacitor open android"
echo "2. Go to: Build > Generate Signed Bundle/APK"
echo "3. Select APK and follow the wizard"
echo ""
echo "The APK will be at: android/app/release/app-release.apk"
echo ""
