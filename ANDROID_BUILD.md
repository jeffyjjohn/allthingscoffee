# Everything Coffee - Android Build Instructions

## Quick Start

To build an APK for Android, follow these steps:

### Prerequisites

- Android Studio installed with Android SDK
- Java Development Kit (JDK) 11 or higher
- Node.js v14 or higher
- Set `ANDROID_HOME` environment variable to your Android SDK path

### Build Steps

1. **Clone the repository:**

   ```
   git clone https://github.com/jeffyjjohn/allthingscoffee.git
   cd allthingscoffee
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Build the app:**

   ```
   npm run build
   ```

4. **Sync with Capacitor:**

   ```
   npm run capsync
   ```

5. **Open in Android Studio:**

   ```
   npx capacitor open android
   ```

6. **Build APK in Android Studio:**
   - Go to **Build** > **Generate Signed Bundle/APK**
   - Select **APK** (not Bundle)
   - Create or select your keystore
   - Select **Release** as build variant
   - Click **Finish**

7. **APK Location:**
   - Your APK will be at: `android/app/release/app-release.apk`

## Automated Build (Windows)

If you're on Windows, use the PowerShell script:

```powershell
.\build-apk.ps1
```

This script handles steps 2-4 automatically.

## Detailed Documentation

See [BUILD_APK_GUIDE.md](BUILD_APK_GUIDE.md) for comprehensive instructions including:

- Environment setup details
- Troubleshooting common issues
- Google Play Store submission
- APK optimization tips

## Quick Troubleshooting

| Problem                | Solution                                |
| ---------------------- | --------------------------------------- |
| `ng` command not found | Run `npm install` again                 |
| Build fails            | Check Java version: `java -version`     |
| APK not generated      | Check Android SDK path and ANDROID_HOME |
| Large APK size         | Normal for Ionic/Angular apps (40-80MB) |

## Support

- Repository: https://github.com/jeffyjjohn/allthingscoffee
- Author: Jeffy John
- Contact: jjeffy@gmail.com

---

**Note:** Always test the APK on a physical device or emulator before submitting to Google Play Store.
