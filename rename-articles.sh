#!/usr/bin/env bash
set -euo pipefail

# БАЗОВАЯ ПАПКА С ТЕМ САМИМ "статьи"
BASE_DIR="public/assets/статьи"

if [ ! -d "$BASE_DIR" ]; then
  echo "Нет папки $BASE_DIR. Запусти скрипт из корня репозитория."
  exit 1
fi

echo "Собираю список файлов в $BASE_DIR ..."

# Ассоциативный массив: старый путь -> новый путь
declare -A MAP

i=1

# Находим все файлы внутри public/assets/статьи (рекурсивно)
while IFS= read -r -d '' FILE; do
  EXT="${FILE##*.}"             # расширение
  DIR="$(dirname "$FILE")"      # папка
  NEW_FILE="$DIR/article-$i.$EXT"

  # Если вдруг такой файл уже существует — увеличиваем индекс
  while [ -e "$NEW_FILE" ]; do
    i=$((i + 1))
    NEW_FILE="$DIR/article-$i.$EXT"
  done

  MAP["$FILE"]="$NEW_FILE"
  echo ">> План: $FILE -> $NEW_FILE"
  i=$((i + 1))
done < <(find "$BASE_DIR" -type f -print0)

echo
echo "=== Переименовываю файлы (git mv) ==="
for OLD in "${!MAP[@]}"; do
  NEW="${MAP[$OLD]}"
  echo "git mv \"$OLD\" \"$NEW\""
  git mv "$OLD" "$NEW"
done

echo
echo "=== Обновляю пути в коде ==="

# Файлы, в которых будем искать и заменять пути
SEARCH_PATHS=("src" "public")

for OLD in "${!MAP[@]}"; do
  NEW="${MAP[$OLD]}"

  # 1) Полный путь с public (на всякий случай)
  OLD_FULL="$OLD"
  NEW_FULL="$NEW"

  # 2) URL-путь без public (как используется в src: /assets/статьи/...)
  OLD_URL="${OLD#public}"   # убираем приставку "public"
  NEW_URL="${NEW#public}"

  # Экранируем для sed (/, & и т.п.)
  OLD_FULL_ESC=$(printf '%s\n' "$OLD_FULL" | sed 's/[\/&]/\\&/g')
  NEW_FULL_ESC=$(printf '%s\n' "$NEW_FULL" | sed 's/[\/&]/\\&/g')
  OLD_URL_ESC=$(printf '%s\n' "$OLD_URL" | sed 's/[\/&]/\\&/g')
  NEW_URL_ESC=$(printf '%s\n' "$NEW_URL" | sed 's/[\/&]/\\&/g')

  echo
  echo ">>> Заменяю ссылки:"
  echo "    $OLD_FULL -> $NEW_FULL"
  echo "    $OLD_URL  -> $NEW_URL"

  for PATH in "${SEARCH_PATHS[@]}"; do
    if [ -d "$PATH" ]; then
      # Ищем файлы, где встречается старый путь, и заменяем
      FILES=$(git grep -Il -- "$OLD_URL" -- "$PATH" || true)

      if [ -n "$FILES" ]; then
        echo "    В файлах: $FILES"
        # Заменяем и вариант с public, и вариант без public
        sed -i \
          -e "s/$OLD_FULL_ESC/$NEW_FULL_ESC/g" \
          -e "s/$OLD_URL_ESC/$NEW_URL_ESC/g" \
          $FILES
      fi
    fi
  done
done

echo
echo "Готово. Проверь git status и протестируй проект локально."
