$ErrorActionPreference='Stop'
Set-Location 'C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local'
$env:PATH=(Join-Path (Get-Location) 'desktop/tools/ffmpeg/bin')+';'+$env:PATH
$testTemp=Join-Path (Get-Location) 'outputs/M-20261114-muse-flow-temp'
New-Item -ItemType Directory -Force -Path $testTemp | Out-Null
$env:TEMP=$testTemp
$env:TMP=$testTemp
$integrationConfig=Get-Content -LiteralPath desktop/.integrations/config.json -Raw | ConvertFrom-Json
$env:PRODUCT_LAB_TEST_PYTHON=$integrationConfig.python
$env:PRODUCT_LAB_TEST_MONTAGE=$integrationConfig.montage
$env:PRODUCT_LAB_TEST_REACH=$integrationConfig.reach
$results=@()
foreach($suite in @('typecheck','test','test:api','test:desktop')) {
 $log='outputs/M-20261114-muse-flow-'+$suite.Replace(':','-')+'.log'
 $ErrorActionPreference='Continue'
 & pnpm $suite *> $log
 $code=$LASTEXITCODE
 $ErrorActionPreference='Stop'
 $results+=@{suite=$suite;code=$code;log=$log}
 Write-Output ($suite+' exit='+$code)
 Get-Content -LiteralPath $log -Tail 9
 if($code -ne 0){$results | ConvertTo-Json | Set-Content outputs/M-20261114-muse-flow-gate.json;exit $code}
}
$results | ConvertTo-Json | Set-Content outputs/M-20261114-muse-flow-gate.json

