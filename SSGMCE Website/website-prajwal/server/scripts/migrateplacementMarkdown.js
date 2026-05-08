/**
 * Migration Script: Convert placement page sections to markdown
 * 
 * Converts:
 * - placements-career: text sections → markdown
 * - placements-brochure: stats + list sections → markdown
 * 
 * Run: node scripts/migrateplacementMarkdown.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB\n');

  const db = mongoose.connection.db;
  const collection = db.collection('pagecontents');

  // ─── 1. placements-career: Convert text sections to markdown ───
  const career = await collection.findOne({ pageId: 'placements-career' });
  if (career) {
    const updatedSections = career.sections.map(s => {
      if (s.type === 'text') {
        console.log(`  [career] Converting section "${s.title}" from text → markdown`);
        return { ...s, type: 'markdown' };
      }
      return s;
    });
    await collection.updateOne(
      { pageId: 'placements-career' },
      { $set: { sections: updatedSections } }
    );
    console.log('✓ placements-career: converted text → markdown\n');
  } else {
    console.log('⚠ placements-career not found\n');
  }

  // ─── 2. placements-brochure: Convert stats + list sections to markdown ───
  const brochure = await collection.findOne({ pageId: 'placements-brochure' });
  if (brochure) {
    const updatedSections = brochure.sections.map(s => {
      if (s.type === 'stats' && s.sectionId === 'highlights') {
        // Convert stats array to markdown bullet list
        const statsMarkdown = s.content.stats.map(stat =>
          `- **${stat.label}**: ${stat.value}`
        ).join('\n');
        console.log(`  [brochure] Converting stats section "${s.title}" → markdown`);
        return {
          ...s,
          type: 'markdown',
          content: {
            ...s.content,
            text: statsMarkdown,
            stats: []
          }
        };
      }
      if (s.type === 'list' && s.sectionId === 'key-features') {
        // Convert list items to markdown bullet list
        const listMarkdown = s.content.items.map(item => `- ${item}`).join('\n');
        console.log(`  [brochure] Converting list section "${s.title}" → markdown`);
        return {
          ...s,
          type: 'markdown',
          content: {
            ...s.content,
            text: listMarkdown,
            items: []
          }
        };
      }
      return s;
    });
    await collection.updateOne(
      { pageId: 'placements-brochure' },
      { $set: { sections: updatedSections } }
    );
    console.log('✓ placements-brochure: converted stats+list → markdown\n');
  } else {
    console.log('⚠ placements-brochure not found\n');
  }

  // ─── 3. Create placements-contact if it doesn't exist ───
  const contact = await collection.findOne({ pageId: 'placements-contact' });
  if (!contact) {
    console.log('  [contact] Creating placements-contact page with markdown section...');
    await collection.insertOne({
      pageId: 'placements-contact',
      pageTitle: 'Placement Cell Contact',
      pageDescription: 'Contact the Training & Placement Cell',
      route: '/placements/contact',
      category: 'placements',
      template: 'generic',
      isPublished: true,
      sections: [
        {
          sectionId: 'contact-info',
          title: 'Contact Information',
          type: 'markdown',
          order: 1,
          isVisible: true,
          content: {
            text: '## Training & Placement Cell\n\n**Shri Sant Gajanan Maharaj College of Engineering, Shegaon**\n\nFor placement-related queries, please contact the T&P Cell.\n\n---\n\n*Contact details will be updated soon.*',
            items: [],
            url: '',
            alt: '',
            caption: '',
            stats: [],
            events: [],
            cards: [],
            headers: [],
            rows: [],
          }
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('✓ placements-contact: created with markdown section\n');
  } else {
    // If it exists but has non-markdown sections, convert them
    const hasNonMarkdown = contact.sections?.some(s => s.type !== 'markdown');
    if (hasNonMarkdown) {
      const updatedSections = contact.sections.map(s => {
        if (s.type !== 'markdown') {
          console.log(`  [contact] Converting section "${s.title}" from ${s.type} → markdown`);
          return { ...s, type: 'markdown' };
        }
        return s;
      });
      await collection.updateOne(
        { pageId: 'placements-contact' },
        { $set: { sections: updatedSections } }
      );
      console.log('✓ placements-contact: converted to markdown\n');
    } else {
      console.log('✓ placements-contact: already all markdown\n');
    }
  }

  // ─── Verify ───
  console.log('=== Verification ===');
  const allPlacement = await collection.find({ pageId: /^placements-/ }).toArray();
  for (const page of allPlacement) {
    const types = (page.sections || []).map(s => s.type);
    const allMarkdown = types.length > 0 && types.every(t => t === 'markdown');
    const status = types.length === 0 ? '⚠ EMPTY' : allMarkdown ? '✓ ALL MARKDOWN' : `✗ MIXED: [${types.join(', ')}]`;
    console.log(`  ${page.pageId}: ${status}`);
  }

  await mongoose.disconnect();
  console.log('\nDone!');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
