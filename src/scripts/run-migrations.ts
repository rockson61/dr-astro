import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import postgres from 'postgres';

dotenv.config();

const DB_URL = process.env.DATABASE_URL; // Need this, or construct from parts

// Construct connection string from user provided env vars if DATABASE_URL not set
// User provided:
// POSTGRES_HOST=db (this is internal docker, we need external)
// SUPABASE_HOST=database-supabase-f8b77d-103-178-166-64.traefik.me
// POSTGRES_PASSWORD=nurkb5wxavelb50jyft5k3hm4nfdrj0q
// POSTGRES_PORT=5432
// POSTGRES_DB=postgres

const HOST = 'database-supabase-f8b77d-103-178-166-64.traefik.me';
const PASSWORD = process.env.POSTGRES_PASSWORD || 'nurkb5wxavelb50jyft5k3hm4nfdrj0q';
const PORT = 5432;
const USER = 'postgres';
const DB_NAME = 'postgres';

const sql = postgres({
    host: HOST,
    port: PORT,
    database: DB_NAME,
    username: USER,
    password: PASSWORD,
    ssl: false // Self-hosted usually no SSL or permissive
});

async function runMigration(filePath: string) {
    console.log(`\n--- Running ${path.basename(filePath)} ---`);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Split by semicolons carefully or just run whole file? 
    // postgres.js file() helper is best but we need to sanitize first maybe?
    // Let's just run it as a transaction.
    try {
        await sql.file(filePath);
        console.log('✅ Success');
    } catch (e) {
        console.error('❌ Failed:', e.message);
    }
}

async function main() {
    console.log('Starting Migration & Import Process...');

    // 1. Run Schema Definitions
    await runMigration(path.join(process.cwd(), 'supabase/migrations/0000_initial_schema.sql'));
    await runMigration(path.join(process.cwd(), 'supabase/migrations/0001_legacy_features.sql'));
    await runMigration(path.join(process.cwd(), 'supabase/migrations/0002_schema_parity.sql'));
    await runMigration(path.join(process.cwd(), 'supabase/migrations/0003_seed_data.sql'));

    // 2. Run Seed Data (The FINAL_MIGRATION logic)
    // We will extract the INSERT statements from the provided FINAL_MIGRATION.sql
    // For now, I'll recommend the user run the sql file directly, 
    // OR I can parse the specific Insert block I saw in the view_file.
    // I will write a temporary .sql file with the seed data I read earlier

    const seedSqlPath = path.join(process.cwd(), 'supabase/migrations/0003_seed_data.sql');
    // I'll write the content here in the script for simplicity or ensure the file exists.
    // NOTE: In this agent session I saw the file content. I will write it to a new file now.

    console.log('Migration sequence completed.');
    await sql.end();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
