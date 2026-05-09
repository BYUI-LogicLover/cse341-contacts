import 'dotenv/config';
import express from 'express';
import {readFile} from 'node:fs/promises';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js';
import {initDb} from './db/connect.js';

const app = express();
const port = process.env.PORT || 3000;

const swaggerDocument = JSON.parse(
    await readFile(new URL('./swagger-output.json', import.meta.url), 'utf-8')
);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Database connected. Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    });
