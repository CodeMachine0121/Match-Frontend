# React + Vite

This project is built on [Vite](https://vitejs.dev/) and [React](https://react.dev/), supporting HMR (Hot Module Replacement) and basic ESLint rules, suitable for rapid development of modern front-end applications.

## Features

- ⚡️ Instant development startup and build
- 🔥 React 18 + HMR hot update
- 🛠️ ESLint code specification
- 📦 Modern front-end engineering experience

## Directory Structure

```
├── Dockerfile              # Docker build file (if deployment is needed)
├── eslint.config.js        # ESLint configuration
├── index.html              # Entry HTML
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── vite.config.js          # Vite configuration
├── public/                 # Public resources directory
│   └── vite.svg
└── src/                    # Source code directory
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── MatchList.jsx
    ├── MatchList.css
    └── assets/
        └── react.svg
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Build for production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Preview production build

```bash
npm run preview
```

## Lint and check code style

```bash
npm run lint
```

## Main dependencies

- [react](https://react.dev/)
- [react-dom](https://react.dev/)
- [vite](https://vitejs.dev/)
- [eslint](https://eslint.org/)

## Related links

- [Vite official documentation](https://vitejs.dev/)
- [React official documentation](https://react.dev/)

---

For further expansion with TypeScript, routing, state management, and other features, please refer to the relevant community best practices.
