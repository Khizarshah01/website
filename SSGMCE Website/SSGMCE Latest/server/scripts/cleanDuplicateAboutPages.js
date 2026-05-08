const mongoose = require('mongoose');
require('dotenv').config();

const toDelete = [
  'about-glance',
  'about-board-of-directors',
  'about-directors',
  'about-governing-body',
  'about-organization',
  'about-principal-message',
  'about-vision-mission'
];

mongoose.connect(process.env.MONGODB_URI, { family: 4 }).then(async () => {
  const PageContent = require('../models/PageContent');
  const result = await PageContent.deleteMany({ pageId: { $in: toDelete } });
  console.log('Deleted', result.deletedCount, 'duplicate pages');

  const remaining = await PageContent.find({ category: 'about' }, 'pageId pageTitle').sort('pageId').lean();
  console.log('\nRemaining about pages:', remaining.length);
  remaining.forEach(p => console.log(' ', p.pageId, '|', p.pageTitle));
  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
