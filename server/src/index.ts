import 'dotenv/config'
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js"
import { Database } from "./supabase"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient<Database>(
    supabaseUrl, supabaseKey);

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello!')
})

app.get('/resources', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('raw_resources')
            .select('*')
            .order('name', { ascending: true });

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
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/mapping', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('raw_refined_mapping')
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
});