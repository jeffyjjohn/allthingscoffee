# Everything Coffee - Android APK Build Guide

This guide will help you build an APK for Android from the Everything Coffee source code.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **Android SDK** - Via Android Studio
- **Java Development Kit (JDK)** (v11+) - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Git** - For version control

## Step 1: Environment Setup

### Install Android SDK and JDK

1. Download and install [Android Studio](https://developer.android.com/studio)
2. During installation, ensure you select:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. After installation, add Android SDK to your PATH:

   ```powershell
   $env:ANDROID_SDK_ROOT = "C:\Users\[YourUsername]\AppData\Local\Android\Sdk"
   $env:ANDROID_HOME = "C:\Users\[YourUsername]\AppData\Local\Android\Sdk"
   ```

4. Set JAVA_HOME:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-[version]"
   ```

## Step 2: Install Project Dependencies

```powershell
cd c:\Users\ABSSTEM\Downloads\Beanconqueror-master\allthingscoffee
npm install
```

## Step 3: Build the Angular Application

```powershell
npm run build
```

This creates a `dist/` folder with the compiled Angular app.

## Step 4: Sync with Capacitor

```powershell
npm run capsync
```

Or separately:

```powershell
npx capacitor sync android
npx capacitor sync ios
```

This copies the web app into the native Android and iOS projects.

## Step 5: Build Android APK

### Using Capacitor (Recommended)

```powershell
npx capacitor open android
```

This opens Android Studio with the project. Then:

1. In Android Studio, go to **Build** > **Generate Signed Bundle/APK**
2. Select **APK** (not Bundle)
3. Click **Next**
4. Choose or create a key store:
   - Click **Create new** if you don't have one
   - Fill in the details for your key store
   - Click **Next**
5. Select **Release** as the build variant
6. Click **Finish**

The APK will be generated in: `android/app/release/app-release.apk`

### Using Gradle (Command Line)

```powershell
cd android
gradlew assembleRelease
```

This creates the APK at: `app/build/outputs/apk/release/app-release.apk`

## Step 6: Install on Device/Emulator

### On Physical Device (USB Connected)

```powershell
adb install path/to/app-release.apk
```

Or use Android Studio to deploy directly.

### On Emulator

```powershell
adb install path/to/app-release.apk
```

## Troubleshooting

### Issue: Build fails with gradle errors

**Solution:** Make sure Android SDK is properly installed and ANDROID_HOME is set.

### Issue: "ng" command not found

**Solution:** Run `npm install` again or use `npx ng` instead.

### Issue: Java version incompatibility

**Solution:** Ensure you have JDK 11 or higher. Check with: `java -version`

### Issue: APK file is too large

**Solution:** This is normal for Ionic/Angular apps (usually 40-80MB).

## App Signing

For production release on Google Play:

1. Generate a signed APK using Android Studio (as shown in Step 5)
2. Keep your keystore file safe - you'll need it for updates
3. Upload to Google Play Console

## Next Steps

1. **Testing:** Install the APK on a physical device or emulator to test
2. **App Store:** Submit to Google Play Store
3. **Updates:** Use the same keystore for future updates

## Resources

- [Ionic Documentation](https://ionicframework.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/)
- [Android Development](https://developer.android.com/docs)
- [Google Play Console](https://play.google.com/console)

---

**App Name:** Everything Coffee  
**Author:** Jeffy John  
**Repository:** https://github.com/jeffyjjohn/allthingscoffee
