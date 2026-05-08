$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$outDir = 'd:\SSGMCE Website\website\server\uploads\documents\pride_templates'
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

function Escape-Xml([string]$s) {
  if ($null -eq $s) { return '' }
  return $s.Replace('&','&amp;').Replace('<','&lt;').Replace('>','&gt;').Replace('"','&quot;').Replace("'",'&apos;')
}

function New-DocxTemplate([string]$filePath, [string]$title, [string[]]$headers) {
  $tmp = Join-Path $env:TEMP ("docx_tpl_" + [Guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $tmp | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tmp '_rels') | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tmp 'word') | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tmp 'word\_rels') | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tmp 'docProps') | Out-Null

  @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
'@ | Out-File -LiteralPath (Join-Path $tmp '[Content_Types].xml') -Encoding utf8

  @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
'@ | Out-File -FilePath (Join-Path $tmp '_rels\.rels') -Encoding utf8

  @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>Microsoft Office Word</Application>
</Properties>
'@ | Out-File -FilePath (Join-Path $tmp 'docProps\app.xml') -Encoding utf8

  @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>Projects Template</dc:title>
  <dc:creator>SSGMCE</dc:creator>
</cp:coreProperties>
'@ | Out-File -FilePath (Join-Path $tmp 'docProps\core.xml') -Encoding utf8

  @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships" />
'@ | Out-File -FilePath (Join-Path $tmp 'word\_rels\document.xml.rels') -Encoding utf8

  $headerCells = ($headers | ForEach-Object {
    "<w:tc><w:tcPr><w:tcW w:w='2400' w:type='dxa'/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>$(Escape-Xml $_)</w:t></w:r></w:p></w:tc>"
  }) -join ''

  $blankRows = @()
  for ($i = 0; $i -lt 5; $i++) {
    $rowCells = ($headers | ForEach-Object {
      "<w:tc><w:tcPr><w:tcW w:w='2400' w:type='dxa'/></w:tcPr><w:p><w:r><w:t xml:space='preserve'> </w:t></w:r></w:p></w:tc>"
    }) -join ''
    $blankRows += "<w:tr>$rowCells</w:tr>"
  }
  $rowsXml = $blankRows -join ''

  $docXml = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><w:document xmlns:mc='http://schemas.openxmlformats.org/markup-compatibility/2006' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xmlns:w='http://schemas.openxmlformats.org/wordprocessingml/2006/main'><w:body><w:p><w:r><w:rPr><w:b/><w:sz w:val='28'/></w:rPr><w:t>$(Escape-Xml $title)</w:t></w:r></w:p><w:tbl><w:tblPr><w:tblW w:w='0' w:type='auto'/><w:tblBorders><w:top w:val='single' w:sz='8' w:space='0' w:color='auto'/><w:left w:val='single' w:sz='8' w:space='0' w:color='auto'/><w:bottom w:val='single' w:sz='8' w:space='0' w:color='auto'/><w:right w:val='single' w:sz='8' w:space='0' w:color='auto'/><w:insideH w:val='single' w:sz='8' w:space='0' w:color='auto'/><w:insideV w:val='single' w:sz='8' w:space='0' w:color='auto'/></w:tblBorders></w:tblPr><w:tr>$headerCells</w:tr>$rowsXml</w:tbl><w:p/><w:sectPr><w:pgSz w:w='11906' w:h='16838'/><w:pgMar w:top='1440' w:right='1440' w:bottom='1440' w:left='1440'/></w:sectPr></w:body></w:document>"
  $docXml | Out-File -FilePath (Join-Path $tmp 'word\document.xml') -Encoding utf8

  if (Test-Path $filePath) { Remove-Item $filePath -Force }
  $zipPath = [System.IO.Path]::ChangeExtension($filePath, 'zip')
  if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
  Compress-Archive -Path (Join-Path $tmp '*') -DestinationPath $zipPath -Force
  Move-Item -Path $zipPath -Destination $filePath -Force
  Remove-Item -Path $tmp -Recurse -Force
  Write-Host "Created: $filePath"
}

New-DocxTemplate -filePath (Join-Path $outDir 'cse_projects_template.docx') -title 'CSE - Student Best Projects' -headers @('Sr. No','Title of Project','Guided By','Award/Reward')
New-DocxTemplate -filePath (Join-Path $outDir 'cse_ug_projects_template.docx') -title 'CSE - UG Projects (Import into selected session)' -headers @('Group No.','Project Title','Project Report Link')
New-DocxTemplate -filePath (Join-Path $outDir 'it_projects_template.docx') -title 'IT - Student Best Projects' -headers @('Sr. No','Title of Project','Guided By','Award/Reward')
New-DocxTemplate -filePath (Join-Path $outDir 'entc_projects_template.docx') -title 'EnTC - Student Best Projects' -headers @('Sr. No','Title of Project','Guided By','Award/Reward')
New-DocxTemplate -filePath (Join-Path $outDir 'mech_projects_template.docx') -title 'Mechanical - UG Student Projects' -headers @('Group No.','Project Title')
