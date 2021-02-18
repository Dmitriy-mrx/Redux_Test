import express from 'express';

import Theme from '../models/cardModel.js';

const router = express.Router();

router.get('/game', async (req, res) => {
  const games = await Theme.find({});
  res.json({ games });
});

export default router;
