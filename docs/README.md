# Currency converter
This application is a small proof-of-concept currency converter that allows the
user to do basic currency convertions with current rates.

![screenshot of the application](images/screenshot-of-website.png)

## Repository Structure
* `src/web`: The frontend user interface application.
* `src/api`: The backend API services for rates and conversion logic.

# Installation
This is a Node-based project, and therefore the following is required:
* Node version +20
* Linux/Unix (Mac)

For convenience, you can also run this project in Docker, at which point, Docker
becomes the only system requirement.

## Installation (with Docker)
If using this application, this application as simple as running the following
commands:

```bash
git clone https://github.com/Laurianne-M/convertor.git
code convertor
```

Once you are in VS Code, it **should** pick up the `devcontainer.json` and
automatically propose reopenning it in a container.

![screenshot of devcontainer proposeal](images/vscode-reopn-in-container-prompt.png)

If the IDE does not propose this, you can always use the keyboard shortcut
`CTRL/CMD + SHIFT + P`, and click "Reopen in Container":

![screenshot of vscode menu](images/vscode-reopen-in-container-manual.png)

At this point the IDE will automatically build and configure the development
container.

## Installation (without Docker)
The installation steps are still relatively simple. Just make sure that you have
Node +20 installed beforehand.

```bash
git clone https://github.com/Laurianne-M/convertor.git
code convertor
make -C src/ install
```
## Environment Setup

This project uses a single, centralized environment file at the workspace root to manage configuration and secrets across both the frontend web client and backend Express services.

### 1. Configuration Overview

| Layer | File Path | Variable Prefix/Name | Runtime Syntax |
| :--- | :--- | :--- | :--- |
| **Web Frontend (Vite)** | `/.env` (Workspace Root) | `VITE_EXCHANGE_RATES_API_KEY` | `import.meta.env.VITE_...` |
| **API Backend (Express)** | `/.env` (Workspace Root) | `EXCHANGE_RATES_API_KEY` | `process.env.EXCHANGE_RATES_API_KEY` |

> **Security Note:** `.env` files contain sensitive API credentials and **must never be committed to Git**. Ensure `.env` is listed in your root `.gitignore`.

### 2. Workspace Root Configuration (/.env)

Create a single .env file in the project root directory (/convertor/.env):

```bash
# Workspace Root /.env

# Frontend Key (Vite)
VITE_EXCHANGE_RATES_API_KEY=your_actual_api_key

# Backend Key (Express / Firebase Functions)
EXCHANGE_RATES_API_KEY=your_actual_api_key
```
### 3. Client-Side Configuration (Vite)

Because the frontend project resides in `src/web/`, Vite relies on `envDir` inside `src/web/vite.config.ts` to locate the workspace root `.env` file:

```bash
// src/web/vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  envDir: path.resolve(__dirname, '../../'),
  ...
});
```

Accessing in Frontend TypeScript Code:

```bash
# /src/web/ts/constants.ts
apiKey: import.meta.env.VITE_EXCHANGE_RATES_API_KEY
```

### 4. Server-Side Configuration (Express / Firebase Functions)

The Express API initializes `dotenv` at its entry point, pointing back four levels to load the workspace root `.env` file:

```bash
// src/api/routes.ts
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve path to root /.env from build directory
const envPath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPath });
```

Accessing in Backend TypeScript Code:

```bash
# /src/api/src/services/EnvironmentServiceImpl
let API_KEY = process.env.EXCHANGE_RATES_API_KEY;
```
