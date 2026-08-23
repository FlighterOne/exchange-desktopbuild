# ExChange Desktop

Оболочка Electron для сайта **https://exchangeprojects.site**  
Сборка Windows / Linux / macOS через **GitHub Actions**.

## Локально

```bash
npm install
npm start
```

## GitHub Actions

1. Создай **новый** репозиторий (например `exchange-desktop`).
2. Залей все файлы из этой папки в корень репо.
3. **Actions** → **Build desktop apps** → **Run workflow**.
4. После сборки: **Artifacts** → скачай:
   - `exchange-win` → `.exe`
   - `exchange-linux` → `.AppImage` / `.deb`
   - `exchange-mac` → `.dmg`

### Релиз по тегу

```bash
git tag v1.0.0
git push origin v1.0.0
```

Сборка + GitHub Release с файлами установщиков.

## Иконка (по желанию)

Положи в `build/`:

- `icon.ico` — Windows  
- `icon.icns` — macOS  
- `icons/` — png 256/512 для Linux  

Без иконки сборка тоже пройдёт (иконка Electron по умолчанию).

## Смена URL сайта

В `main.js` измени `SITE_URL`.
