$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName UIAutomationClient
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class MuseWindowCapture {
 [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left,Top,Right,Bottom; }
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hwnd,out RECT rect);
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hwnd,IntPtr hdc,uint flags);
}
'@
$museWindows=@(Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.Id -eq 19600 -and $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -match 'Muse.*Chrome for Testing' })
if($museWindows.Count -ne 1){ throw "Expected one visible Muse window; found $($museWindows.Count)." }
$museWindow=$museWindows[0]
$rect=New-Object MuseWindowCapture+RECT
[void][MuseWindowCapture]::GetWindowRect($museWindow.MainWindowHandle,[ref]$rect)
$bitmap=New-Object System.Drawing.Bitmap ($rect.Right-$rect.Left),($rect.Bottom-$rect.Top)
$graphics=[System.Drawing.Graphics]::FromImage($bitmap)
$hdc=$graphics.GetHdc()
try { $captured=[MuseWindowCapture]::PrintWindow($museWindow.MainWindowHandle,$hdc,2) }
finally { $graphics.ReleaseHdc($hdc) }
$target='C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local\outputs\M-20261114\provider-visible.png'
try { if(!$captured){throw 'Window capture failed'}; $bitmap.Save($target,[System.Drawing.Imaging.ImageFormat]::Png) }
finally { $graphics.Dispose();$bitmap.Dispose() }
Write-Output "Saved only the existing Muse window: $target"
