"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const supabase_js_1 = require("@supabase/supabase-js");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
app.get('/', (req, res) => {
    return res.send('Hello!');
});
app.get('/resources', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from('raw_resources')
            .select('*')
            .order('name', { ascending: true });
        if (error) {
            throw error;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from('refined_resources')
            .select('*')
            .order('name', { ascending: true });
        if (error) {
            throw error;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/mapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from('raw_refined_mapping')
            .select('*');
        if (error) {
            throw error;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// beam me up, scotty
app.listen(PORT, () => {
});
//# sourceMappingURL=index.js.map