// src/my-pglite-worker.js
import { PGlite } from '@electric-sql/pglite'
import { worker } from '@electric-sql/pglite/worker'

worker({
    async init() {
        // Optionally, add initial SQL statements here (e.g., CREATE TABLE)
        return new PGlite()
    },
})
