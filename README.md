# ExChange Desktop

Окно Electron для https://exchangeprojects.site  
Сборка Windows / Linux / macOS — GitHub Actions.

## Название приложения

В `package.json`:
- `"productName": "ExChange"` — имя в меню Пуск, на ярлыке, в .exe
- `"name": "exchange-desktop"` — внутреннее имя npm (латиница, без пробелов)

После смены `productName` — новая сборка в Actions.

## Иконки

Положи файлы в папку **`build/`**:

| Файл | Назначение |
|------|------------|
| `build/icon.ico` | Windows (лучше 256×256 в .ico) |
| `build/icon.icns` | macOS |
| `build/icon.png` | Linux / запасной (512×512) |

Собрать `.ico` / `.icns`: https://www.electron.build/icons или https://icoconvert.com

В `package.json` уже указано `"buildResources": "build"`.

## Telegram-вход

Логин через Telegram открывается **внутри приложения** (oauth.telegram.org), а не во внешнем браузере.

## Локально

```bash
npm install
npm start
```

## GitHub Actions

Actions → **Build desktop apps** → **Run workflow** → скачать Artifacts.
