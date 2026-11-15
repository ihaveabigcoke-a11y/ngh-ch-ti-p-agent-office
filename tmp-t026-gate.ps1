param([Parameter(Mandatory=$true)][string]$Task)
$ErrorActionPreference='Stop'
$appRoot='C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local'
Set-Location -LiteralPath $appRoot
if(Get-Process electron -ErrorAction SilentlyContinue | Where-Object {$_.Path -like '*Product-Lab-Local*'}){throw 'Electron phải tắt'}
$env:PATH=(Join-Path $appRoot 'desktop\tools\ffmpeg\bin')+';'+$env:PATH
$result=@()
foreach($check in @('typecheck','test','test:api','test:desktop')){
 $log=Join-Path $appRoot ('outputs/'+$Task+'-'+$check.Replace(':','-')+'.log')
 & pnpm $check *> $log
 $code=$LASTEXITCODE
 $summary=Get-Content -LiteralPath $log | Select-String '^# (tests|pass|fail|skipped)|^ℹ (tests|pass|fail|skipped)' | ForEach-Object {$_.Line}
 $result+=@{check=$check;exit=$code;summary=$summary}
 Write-Output ($check+': exit '+$code+' '+($summary -join ' '))
 if($code -ne 0){Get-Content -LiteralPath $log | Select-String '^✖|^not ok|error TS' | Select-Object -First 12 | ForEach-Object {$_.Line}; break}
}
$result | ConvertTo-Json -Depth 5 | Set-Content ('outputs/'+$Task+'-suite.json') -Encoding utf8
if($result.Count -ne 4 -or ($result | Where-Object {$_.exit -ne 0})){exit 1}
