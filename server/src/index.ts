import 'dotenv/config'
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js"
import { Database } from './supabase'

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = 'https://wnbtubmfobgomfgfjikb.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient<Database>(
    supabaseUrl, supabaseKey);

app.get('/', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('resources')
            .select('*');

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// beam me up, scotty
app.listen(PORT, () => {
    console.log(`hi from http://localhost:${PORT}`);
});