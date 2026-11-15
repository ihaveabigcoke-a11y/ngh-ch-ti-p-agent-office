$ErrorActionPreference='Stop'
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
$appPid=[int](Get-Content -LiteralPath C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/M-20261114-muse-flow-live/electron.pid)
$browsers=@(Get-CimInstance Win32_Process | Where-Object {$_.Name -match 'chrome|chromium' -and $_.ParentProcessId -eq $appPid -and $_.CommandLine -notmatch '--type='})
$expected=Get-Content -LiteralPath C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/M-20261114-muse-flow-live/expected-result.json -Raw | ConvertFrom-Json
foreach($browser in $browsers){
 $p=Get-Process -Id $browser.ProcessId
 if($p.MainWindowHandle -eq 0){continue}
 $window=[System.Windows.Automation.AutomationElement]::FromHandle($p.MainWindowHandle)
 $condition=New-Object System.Windows.Automation.PropertyCondition ([System.Windows.Automation.AutomationElement]::ControlTypeProperty),([System.Windows.Automation.ControlType]::Edit)
 foreach($edit in $window.FindAll([System.Windows.Automation.TreeScope]::Descendants,$condition)){
  if($edit.Current.Name -match 'Address|address'){
   $value=$edit.GetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern).Current.Value
   $matches=($value -eq $expected.url -or ('https://'+$value) -eq $expected.url)
   [pscustomobject]@{AddressReadViaUi=$true;IsRequestedThread=$matches;IsMuseHost=$value -match 'muse.ai'} | ConvertTo-Json -Compress
  }
 }
}

