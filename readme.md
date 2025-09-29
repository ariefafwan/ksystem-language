# K-System Language (VS Code Extension) — Internal

> Syntax highlighting + snippets untuk **K-System** di VS Code. Dirancang khusus untuk file sct dan tmp ksystem dengan struktur kode K-System di lingkungan kantor.

---

## Dibuat Supaya Bisa

- **Syntax Highlighting** untuk struktur dan perintah K-System (SCREEN, IMAGE, FIELD, MAP, CALCS, HOOKS, PERMIT, dll).
- **Snippets produktif** untuk membuat _screen_ baru, _form_ ASCII, blok MAP/CALCS/HOOKS/PERMIT/LOCAL/DEFAULT/HELP, baris FIELD, komentar, dll.
- **Komentar blok** `/* ... */` (Ctrl+/ default VS Code).

---

## 🧩 Instalasi (VSIX)
2. Install:
   - **GUI**: _Extensions → ⋮ → Install from VSIX…_
   - **CLI**:  
     ```bash
     code --install-extension ksystem-language-X.X.X.vsix
     ```
kalau udah jangan lupa reload VS Code.

---

## Asosiasi File (wajib untuk ngenalin file ksystemnya)

Agar file seperti `sct*` otomatis dikenali sebagai K-System, tambahkan di folder /.vscode di prt****/, lalu buat file settings.json, isinya:

```jsonc
{
  "files.associations": {
    "sct*": "ksystem",
    "tmp*": "ksystem",
    // Atau batasi per folder kalau .vscode di home:
    // "**/prt9000/sct*": "ksystem"
  }
}
```

## snipet 

Snippets (Ringkas + Contoh)

Ketik prefix lalu tekan Tab untuk expand.

**1. Screen Template — scr**

Membuat kerangka layar baru dengan nomor otomatis diambil dari nama file sctNNNN.

```
"SCREEN ${TM_FILENAME_BASE/(sct)([0-9]+)/$2/} ${1:QUERY_TYPE|APP_TYPE|MENU_TYPE|REPORT_TYPE} ${2:s.ProgramName}",
SCR_FILE ${3:name_of_master_file}
SCR_LOGFLD ${4:logfield}
IMAGE(master)
FIELD(master)
DEFAULT(master)
EDITS(master)
MAP(mymap)
CALCS()
HOOKS(master)
DBCALCS(master)
SPCALCS(master)
POSTING(master)
PERMIT(master)
END_SCREEN
```

**2. Map Block — map**
```
MAP(${1:MapName})
${2:Field1} ${3:TargetField} ${4:REPLACE}
```

**3. Calc Block — calc**
```
CALCS()
${1:CalcName}
```

**4. Hook After Input (DO_MAP) — hookmap**
```
AFTER_INPUT cur_field=${1:FieldName} DO_MAP SHOW ${2:MapName}
```

**5. Hook After Input (DO_LIB) — hooklib**
```
AFTER_INPUT cur_field=${1:FieldName} DO_LIB ${2:LibName}(${3:params});
```

**6. Hook Before Input (DO_MAP) — bmap**
```
BEFORE_INPUT cur_field=${1:FieldName} DO_MAP SHOW ${2:MapName}
```

**7. After Input Hooks — after_**
```
AFTER_INPUT cur_field=${1:FieldName} DO_MAP SHOW ${2:MapName}
```

**8 Before Input Hooks — before_**
```
BEFORE_INPUT cur_field=${1:FieldName} DO_MAP SHOW ${2:MapName}
```

**9. Hook Condition Example — hookif**
```
AFTER_INPUT cur_field=${1:FieldName} DO_MAP SHOW ${2:MapName}
    IF ${3:condition}
    ELSE HKCURSOR STAY
    HKMSG ${4:Message}
```

**10 Permit Block — permit**
```
PERMIT(${1:master})
    ${2:PMT_ADD_COND|PMT_UPDALL_COND|PMT_DEL_COND} ${3:CalcName}
```

**11 Local Vars — local**
```
LOCAL
PGM_FIELDS
    ${1:varname} ${2:STRING|DATE|INT2|DFLOAT} ${3:panjang}
```

**13 Local Vars 1 line - lvar**
bikin satu local
```
"${1:varname} ${2:STRING} ${3:panjang}"
```
**13 FIELD — field**

Menyisipkan deklarasi FIELD(master) + satu baris field dengan opsi umum.

```
FIELD(${1:master})
${2:FieldName} ${3:ALLCAPS|PROTECT|DIGITS|NONE} ${4:SCROLL|NONE} ${5:INPUTRI|RI|NONE} ${6:1}
```

**14 Default Block — def**
```
DEFAULT
    ${1:FieldName} INIT ${2:DefaultValue}
```

**15 Help Block — help**
```
HELP
    "${1:Help text for this screen or field}"
```

**16 Form Template — form**

Membuat box ASCII siap isi field.

```
IMAGE(${1:master})
/------------------------------------\
|| ${2:t.Field1}   :________________ ||
|| ${3:t.Field2}   :________________ ||
|| ${4:t.Field3}   :________________ ||
|| ${5:t.Field4}   :________________ ||
\------------------------------------/
```

**17 Field Row (ASCII form) — fld**
```
|| ${1:t.Field}   :________________ ||
```

**18 Block Comment — cmt**
```
/* ${1:komentar} */
```

**19 Spcalcs - spcalc**
```
"SPCALCS(${1:SpcalcName})",
      "         ${2:dbcalcname|IF|DO_LIB|DO_LIB_IF}"
```

**20 DBCALCS - dbcalc**
```
DBCALCS(${1:DbcalcName}),
    DBC_COMMAND ${2:ADD|UPDATE|DELETE|JOIN|MAPMAP|JOIN_LAST_SFL}
    DBC_COND ${3:calccondition}
    DBC_FILE ${4:LibName}
    DBC_TARGET ${5:indexjoin}
    DBC_MAP ${6:mapname}
```

**21 scupl - scrupl**
```
SCR_UPLFLD   ${1:fieldname},
SCR_UPLFLD2  ${2:fieldname2}
SCR_UPL_DIRFLD  ${3:dirfieldname}
SCR_UPLFLD_DBCALCS  ${4:DbcalcName}
SCR_UPL_DELCOND ${5:calccondition}
```

**22 POSTING - post**
```
"POSTING(${1:master|trans})",
      ${2:PST_ADDCMD} ${3:SpcalcName}
      ${3:PST_UPDCMD} ${5:spcalcname}
      ${4:PST_DELCMD} ${6:spcalcname}
      ${8:PST_COND} ${9:calcond}
```

**23 SUBFILE - sub**
```
SUBFILE(${1:transt})
SFL_LINES ${2:5}
SFL_TITLE ${3:transt}
SFL_COND ${4:calccondition}
SFL_SELECT ${5:calcselect}
SFL_TARGET ${6:namaindex}
SFL_SORT_BY_FIELD ${7:sortfield}
SFL_TRANS2_FIELD ${8:trans2field}
SFL_TEMPLATE ${9:template}
```

**23 RTREE - rtree**
```
RTREE(${1:report})
RT_COND ${2:calccondition}
USES_SCRIPT ${2:LaporanName}
RT_NXT_POSTING ${3:layarPosting}
RT_NXT_MAP ${4:layarMap}
RT_MAP ${5:mparam}
RT_PRINT_BACKUP
${6:RT_XLSX|RT_HTML|RT_PDF}$
```

**24 SCR APR - scr_apr**
```
SCR_APR ${1:calcdolib}
SCR_APRFLD ${2:fieldname}
SCR_APR_COND ${3:calccondition}
SCR_APR_MSG IF ${4:calccondition} ${5:Message}
            IF ${6:calccondition} ${7:Message}
```

**24 SCR NXT - scr_nxt**
```
SCR_NXT_POSTING_IF ${1:layarPosting}
SCR_NXT_MSG IF ${2:calccondition} ${3:Message}
            IF ${4:calccondition} ${5:Message}
SCR_NEXT_MAP ${6:mapPosting}
```

**25 AP DBCLC - ap_dbclc**
```
DO_LIB ap_dbclc(DNAME ${1:dname}, DCOMMAND ${2:ADD|UPDATE}, DMAP ${5:mapnyaapa});
```

## Kustomisasi Warna (Opsional)
Tambahkan di Settings (JSON) lu untuk nyesuaian warna token:

```
"editor.tokenColorCustomizations": {
  "textMateRules": [
    { "scope": "keyword.declaration.ksys", "settings": { "foreground": "#2dbf6e", "fontStyle": "bold" }},     // SCREEN, END_SCREEN
    { "scope": "keyword.control.ksys",    "settings": { "foreground": "#61afef" }},                            // IMAGE, FIELD, MAP, CALCS, dll
    { "scope": "string.unquoted.form.ksys", "settings": { "foreground": "#e0c060" }},                          // garis ASCII pada IMAGE box
    { "scope": "variable.other.field.ksys", "settings": { "foreground": "#d19a66" }},                          // underline ______ pada form
    { "scope": "entity.name.function.ksys",  "settings": { "foreground": "#c678dd" }}                          // kata pertama di baris (label/rule)
  ]
}

```

# Lain - lain
internal kantor, kalau ada perubahan atau tambahan berkabar
