# GEMINI.md

## Project Overview

This is a Next.js application that provides a chat interface for interacting with an AI. It uses a variety of modern web technologies to provide a feature-rich experience.

The project is a "Code Copilot" chat bot. It allows users to generate responses, copy messages, regenerate messages, save and retrieve chats from a database, and upload attachments.

## Building and Running

To get started with this project, you'll need to have Node.js and pnpm installed.

1.  **Install dependencies:**

    ```bash
    pnpm install
    ```

2.  **Run the development server:**

    ```bash
    pnpm run dev
    ```

    This will start the development server on [http://localhost:3000](http://localhost:3000).

3.  **Build for production:**

    ```bash
    pnpm run build
    ```

4.  **Start the production server:**

    ```bash
    pnpm run start
    ```

### Other useful commands:

*   `pnpm run lint`: Lint the code.
*   `pnpm run typecheck`: Run the TypeScript compiler to check for type errors.
*   `pnpm run db:push`: Push database schema changes.
*   `pnpm run db:generate`: Generate database migration files.
*   `pnpm run db:migrate`: Apply database migrations.
*   `pnpm run db:studio`: Open the Drizzle Studio to view and manage your database.

## Development Conventions

*   **Framework:** The project is built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/).
*   **Authentication:** Authentication is handled by [NextAuth.js](https://next-auth.js.org/), with providers for Google and Github.
*   **Database:** The project uses a PostgreSQL database with [Drizzle ORM](https://orm.drizzle.team/). The database schema is defined in `lib/drizzle/schema.ts`.
*   **Styling:** The project uses [Tailwind CSS](https://tailwindcss.com/) for styling.
*   **UI Components:** The project uses [Radix UI](https://www.radix-ui.com/) and custom components for the user interface.
*   **Linting and Formatting:** The project uses [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting.
*   **Type Checking:** The project uses [TypeScript](https://www.typescriptlang.org/) for static type checking.
