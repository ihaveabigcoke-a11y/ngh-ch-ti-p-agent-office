$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MuseWindowCapture {
 [StructLayout(LayoutKind.Sequential)] public struct Rect { public int Left,Top,Right,Bottom; }
 [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr h,StringBuilder s,int max);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h,IntPtr dc,uint flags);
 [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr h,int x,int y,int w,int height,bool repaint);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h,int cmd);
}
'@
$museWindows = @(Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'chrome|chromium' -and $_.CommandLine -like '*product-lab-desktop*' -and $_.CommandLine -notmatch '--type=' } | ForEach-Object { Get-Process -Id $_.ProcessId -ErrorAction SilentlyContinue } | Where-Object { $_.MainWindowHandle -ne 0 })
if($museWindows.Count -ne 1){throw 'Could not uniquely identify the Hermes-owned Muse browser.'}
$handle=$museWindows[0].MainWindowHandle
[void][MuseWindowCapture]::ShowWindow($handle,9)
[void][MuseWindowCapture]::MoveWindow($handle,20,20,1366,900,$true)
Start-Sleep -Milliseconds 500
$rect=New-Object MuseWindowCapture+Rect
[void][MuseWindowCapture]::GetWindowRect($handle,[ref]$rect)
$bitmap=New-Object System.Drawing.Bitmap ($rect.Right-$rect.Left),($rect.Bottom-$rect.Top)
$graphics=[System.Drawing.Graphics]::FromImage($bitmap)
try{
 $dc=$graphics.GetHdc()
 try { if(-not [MuseWindowCapture]::PrintWindow($handle,$dc,2)){throw 'Window capture failed.'} } finally { $graphics.ReleaseHdc($dc) }
 $region=New-Object System.Drawing.Rectangle 300,110,($bitmap.Width-320),($bitmap.Height-190)
 $cropped=$bitmap.Clone($region,$bitmap.PixelFormat)
 try{$cropped.Save('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/M-20261114-muse-flow-live/provider-window.png')}finally{$cropped.Dispose()}
 Write-Output 'Captured the Hermes-owned Muse content panel; sidebar and browser chrome excluded.'
}finally{$graphics.Dispose();$bitmap.Dispose()}
