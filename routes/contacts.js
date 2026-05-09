import {Router} from 'express';
import {createContact, deleteContact, getAll, getSingle, updateContact,} from '../controllers/contacts.js';

const router = Router();

router.get('/', (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Get all contacts'
    return getAll(req, res);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Get a single contact by id'
    return getSingle(req, res);
});

router.post('/', (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.summary = 'Create a new contact'
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: { $ref: '#/definitions/Contact' }
        } */
    return createContact(req, res);
});

router.put('/:id', (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.summary = 'Replace a contact by id'
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: { $ref: '#/definitions/Contact' }
        } */
    return updateContact(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Delete a contact by id'
    return deleteContact(req, res);
});

export default router;
