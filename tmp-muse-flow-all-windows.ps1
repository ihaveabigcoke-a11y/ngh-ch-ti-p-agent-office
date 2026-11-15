$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class MuseOwnedWindows {
 public delegate bool EnumCallback(IntPtr h,IntPtr l);
 [StructLayout(LayoutKind.Sequential)] public struct Rect {public int Left,Top,Right,Bottom;}
 [DllImport("user32.dll")] public static extern bool EnumWindows(EnumCallback f,IntPtr l);
 [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h,out uint pid);
 [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
 [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr h);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h,IntPtr dc,uint flags);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h,int cmd);
 [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr h,int x,int y,int w,int height,bool repaint);
 public static IntPtr[] Find(uint pid) {var list=new List<IntPtr>();EnumWindows((h,l)=>{uint p;GetWindowThreadProcessId(h,out p);if(p==pid && IsWindowVisible(h)&&GetWindowTextLength(h)>0)list.Add(h);return true;},IntPtr.Zero);return list.ToArray();}
}
'@
$taskAppPid=[int](Get-Content -LiteralPath C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/M-20261114-muse-flow-live/electron.pid)
$browserProcesses=@(Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'chrome|chromium' -and $_.ParentProcessId -eq $taskAppPid -and $_.CommandLine -notmatch '--type=' })
$i=0
foreach($process in $browserProcesses){foreach($h in [MuseOwnedWindows]::Find($process.ProcessId)){
 [void][MuseOwnedWindows]::ShowWindow($h,9)
 [void][MuseOwnedWindows]::MoveWindow($h,20,20,1366,900,$true)
 Start-Sleep -Milliseconds 500
 $r=New-Object MuseOwnedWindows+Rect
 [void][MuseOwnedWindows]::GetWindowRect($h,[ref]$r)
 $bitmap=New-Object System.Drawing.Bitmap ($r.Right-$r.Left),($r.Bottom-$r.Top)
 $g=[System.Drawing.Graphics]::FromImage($bitmap)
 try{$dc=$g.GetHdc();try{[void][MuseOwnedWindows]::PrintWindow($h,$dc,2)}finally{$g.ReleaseHdc($dc)}
  $rect=New-Object System.Drawing.Rectangle 300,110,($bitmap.Width-320),($bitmap.Height-190)
  $crop=$bitmap.Clone($rect,$bitmap.PixelFormat)
  try{$crop.Save(('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/M-20261114-muse-flow-live/owned-window-'+$i+'.png'))}finally{$crop.Dispose()}
 }finally{$g.Dispose();$bitmap.Dispose()}
 $i++
}}
Write-Output ('Captured '+$i+' content panels of this Hermes-owned browser only.')
