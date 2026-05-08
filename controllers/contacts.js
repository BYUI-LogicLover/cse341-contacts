import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect.js';

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

function buildContact(body) {
  const missing = REQUIRED_FIELDS.filter((f) => !body[f]);
  if (missing.length) {
    return { error: `Missing required field(s): ${missing.join(', ')}` };
  }
  return {
    contact: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      favoriteColor: body.favoriteColor,
      birthday: body.birthday,
    },
  };
}

export async function getAll(req, res) {
  try {
    const contacts = await getDb().collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getSingle(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid contact id' });
  }
  try {
    const contact = await getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createContact(req, res) {
  const built = buildContact(req.body ?? {});
  if (built.error) {
    return res.status(400).json({ error: built.error });
  }
  try {
    const result = await getDb().collection('contacts').insertOne(built.contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateContact(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid contact id' });
  }
  const built = buildContact(req.body ?? {});
  if (built.error) {
    return res.status(400).json({ error: built.error });
  }
  try {
    const result = await getDb()
      .collection('contacts')
      .replaceOne({ _id: new ObjectId(id) }, built.contact);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteContact(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid contact id' });
  }
  try {
    const result = await getDb()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ deleted: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
