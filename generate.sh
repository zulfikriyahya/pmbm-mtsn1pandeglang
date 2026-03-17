#!/bin/bash

OUTPUT="draft.md"
ROOT="${1:-.}"

EXCLUDE_DIRS=(
  "node_modules" ".astro" "dist" ".git"
  ".pnpm-store" ".cache" "coverage" ".turbo"
)

BINARY_EXTS=(
  png jpg jpeg gif webp svg ico bmp tiff avif
  woff woff2 ttf eot otf
  mp4 mp3 wav ogg webm
  pdf zip tar gz br
  db sqlite
)

TEXT_EXTS=(
  astro tsx ts jsx js mjs cjs
  css scss less
  html json jsonc
  md mdx
  sh bash
  env toml yaml yml
  xml txt
  gitignore prettierrc eslintrc
)

is_excluded_dir() {
  local d="$1"
  for ex in "${EXCLUDE_DIRS[@]}"; do
    [[ "$d" == *"/$ex/"* || "$d" == *"/$ex" ]] && return 0
  done
  return 1
}

is_binary_ext() {
  local ext="${1##*.}"
  ext="${ext,,}"
  for b in "${BINARY_EXTS[@]}"; do
    [[ "$ext" == "$b" ]] && return 0
  done
  return 1
}

is_text_ext() {
  local ext="${1##*.}"
  ext="${ext,,}"
  for t in "${TEXT_EXTS[@]}"; do
    [[ "$ext" == "$t" ]] && return 0
  done
  return 1
}

get_lang() {
  local ext="${1##*.}"
  ext="${ext,,}"
  case "$ext" in
    ts|tsx)            echo "typescript" ;;
    js|mjs|cjs|jsx)   echo "javascript" ;;
    astro)             echo "astro" ;;
    css)               echo "css" ;;
    scss)              echo "scss" ;;
    html)              echo "html" ;;
    json|jsonc)        echo "json" ;;
    md|mdx)            echo "markdown" ;;
    sh|bash)           echo "bash" ;;
    env|gitignore)     echo "bash" ;;
    toml)              echo "toml" ;;
    yaml|yml)          echo "yaml" ;;
    xml)               echo "xml" ;;
    sql)               echo "sql" ;;
    py)                echo "python" ;;
    *)                 echo "$ext" ;;
  esac
}

echo "Generating $OUTPUT dari $ROOT ..."

> "$OUTPUT"

echo "# Draft Project" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "Generated: $(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "---" >> "$OUTPUT"
echo "" >> "$OUTPUT"

COUNT=0
SKIP=0

while IFS= read -r -d '' file; do
  rel="${file#$ROOT/}"

  if is_excluded_dir "$file"; then
    ((SKIP++))
    continue
  fi

  if is_binary_ext "$file"; then
    ((SKIP++))
    continue
  fi

  if ! is_text_ext "$file"; then
    if file --mime-type "$file" 2>/dev/null | grep -q "text/"; then
      :
    else
      ((SKIP++))
      continue
    fi
  fi

  lang=$(get_lang "$file")

  echo "## $rel" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo '```'"$lang" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo '```' >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo "---" >> "$OUTPUT"
  echo "" >> "$OUTPUT"

  ((COUNT++))
  echo "  + $rel"

done < <(find "$ROOT" -type f -print0 | sort -z)

echo ""
echo "Selesai: $COUNT file → $OUTPUT (dilewati: $SKIP)"
