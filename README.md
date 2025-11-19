# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Как запустить проект

### Требования
- Node.js (версия 18 или выше)
- npm или yarn

### Установка зависимостей
Если зависимости еще не установлены, выполните:
```bash
npm install --legacy-peer-deps
```

**Примечание:** Флаг `--legacy-peer-deps` необходим из-за конфликта версий между React 19 и `react-helmet-async@2.0.5`. Это безопасно и не влияет на работу проекта.

### Запуск в режиме разработки
```bash
npm run dev
```
После запуска проект будет доступен по адресу `http://localhost:5173` (или другому порту, если 5173 занят).

### Сборка для продакшена
```bash
npm run build
```

### Просмотр собранного проекта
```bash
npm run preview
```

### Линтинг кода
```bash
npm run lint
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
