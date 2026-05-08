import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const host = process.env.HOST || 'localhost:3000';
const schemes = host.startsWith('localhost') ? ['http'] : ['https'];

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 contacts service',
    version: '1.0.0',
  },
  host,
  schemes,
  tags: [{ name: 'Contacts', description: 'Contact CRUD endpoints' }],
  definitions: {
    Contact: {
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      favoriteColor: 'teal',
      birthday: '1815-12-10',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
