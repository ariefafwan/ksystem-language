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
     code --install-extension ksystem-language-0.0.X.vsix
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
SCREEN ${TM_FILENAME_BASE/(sct)([0-9]+)/$2/} ${1:QUERY_TYPE|APP_TYPE|MENU_TYPE|REPORT_TYPE} ${2:s.ProgramName}
    IMAGE(master)
    FIELD(master)
    EDITS(master)
    MAP(mymap)
    CALCS()
    HOOKS(master)
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

**12 FIELD — field**

Menyisipkan deklarasi FIELD(master) + satu baris field dengan opsi umum.

```
FIELD(${1:master})
${2:FieldName} ${3:ALLCAPS|PROTECT|DIGITS|NONE} ${4:SCROLL|NONE} ${5:INPUTRI|RI|NONE} ${6:1}
```

**13 Default Block — def**
```
DEFAULT
    ${1:FieldName} = ${2:DefaultValue}
```

**14 Help Block — help**
```
HELP
    "${1:Help text for this screen or field}"
```

**15. Form Template — form**

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

**16. Field Row (ASCII form) — fld**
```
|| ${1:t.Field}   :________________ ||
```

**17 Block Comment — cmt**
```
/* ${1:komentar} */
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
internal kantor, kalau ada perubahan atau tambahan kabarin, **AFWAN**
