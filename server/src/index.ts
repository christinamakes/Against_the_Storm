import 'dotenv/config'
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js"
import { Database } from "./supabase"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3000;

const supabaseUrl = 'https://wnbtubmfobgomfgfjikb.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient<Database>(
    supabaseUrl, supabaseKey);

app.get('/resources', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('raw_resources')
            .select('*');

        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('refined_resources')
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