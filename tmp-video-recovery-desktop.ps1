$ErrorActionPreference='Continue'
Set-Location 'C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local'
& node --experimental-strip-types outputs/check-video-recovery-desktop.mjs *> outputs/M-20261114-video-recovery-desktop.log
$qaCode=$LASTEXITCODE
$ErrorActionPreference='Stop'
$checkpoint=Get-Content -LiteralPath outputs/M-20261114-video-recovery-desktop-ui/shutdown.json -Raw | ConvertFrom-Json
$qaWindow=Get-Process -Id $checkpoint.pid -ErrorAction Stop
$qaWindow.Refresh()
if(-not $qaWindow.CloseMainWindow()){throw 'QA window did not accept normal close'}
if(-not $qaWindow.WaitForExit(1000)){
 $qaWindow.Refresh()
 if(-not $qaWindow.CloseMainWindow()){throw 'QA did not accept the second normal close'}
 if(-not $qaWindow.WaitForExit(15000)){throw 'QA Electron did not exit'}
}
Get-Content outputs/M-20261114-video-recovery-desktop.log -Tail 14
if($qaCode -ne 0){exit $qaCode}
$result=Get-Content outputs/M-20261114-video-recovery-desktop-ui/ui-result.json -Raw | ConvertFrom-Json
$result | Add-Member -NotePropertyName closedGracefully -NotePropertyValue $true
$result | ConvertTo-Json -Depth 8 | Set-Content outputs/M-20261114-video-recovery-desktop-ui/result.json
Write-Output 'Launcher QA passed and closed gracefully.'
