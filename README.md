
# Insatiable - Website 

This is the repository for the Insatiable website, built using Next JS and TailwindCSS for the frontend. And PayloadCMS for the backend with a Postgresql database.

## Running 

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone
    cd insatiable-website
    ```
2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    DATABASE_URL=your_postgresql_database_url
    PAYLOAD_SECRET=your_payload_secret
    ```
4. Run database migrations (if applicable):
    ```bash
    npx drizzle-kit migrate:up
    ```
5. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
6. Open your browser and navigate to `http://localhost:3000` to view the website.


## Locally Running PostgreSQL with Docker

```sh
docker run --name insatiable-postgres -e POSTGRES_PASSWORD=test -d -p 5432:5432 postgres:17

=> postgres://postgres:test@127.0.0.1:5432/postgres
```

> Remark: Make sure to use postgres version 17 or lower due to compatibility issues with PayloadCMS.
> issue: [github.com/payloadcms/payload/issues/13963](https://github.com/payloadcms/payload/issues/13963)

## License

```
INSATIABLE WEBSITE
Copyright (C) 2025 Bureau de l'Insatiable

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```