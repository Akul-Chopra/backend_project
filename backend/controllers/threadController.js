import prisma from '../utils/prismaClient.js';

export const createThread = async (req, res) => {
  const { title, description, categoryId, tagNames = [] } = req.body;
  const authorId = req.user.userId;

  try {
    const thread = await prisma.thread.create({
      data: { title, description, authorId, categoryId },
    });

    if (tagNames.length > 0) {
      const tagRecords = await Promise.all(
        tagNames.map(async (name) => {
          const normalized = name.trim().toLowerCase();

          let existing = await prisma.tag.findFirst({
            where: { name: { equals: normalized, mode: 'insensitive' } }
          });
          if (!existing) {
            existing = await prisma.tag.create({ data: { name: normalized } });
          }
          return existing;
        })
      );

      const threadTagLinks = tagRecords.map(tag => ({
        threadId: thread.id,
        tagId: tag.id,
      }));

      await prisma.threadTag.createMany({
        data: threadTagLinks,
        skipDuplicates: true,
      });
    }

    const createdThreadWithTags = await prisma.thread.findUnique({
      where: { id: thread.id },
      include: {
        author: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
      },
    });

    res.status(201).json(createdThreadWithTags);
  } catch (err) {
    console.error('Failed to create thread:', err);
    res.status(500).json({ error: 'Failed to create thread' });
  }
};
export const addTagToThread = async (req, res) => {
  const { id } = req.params;
  const { tagName } = req.body;
  
  if (!tagName) return res.status(400).json({ error: 'Missing tagName' });

  try {
    const normalized = tagName.trim().toLowerCase();

    const thread = await prisma.thread.findUnique({ where: { id: parseInt(id) } });
    if (!thread) return res.status(404).json({ error: 'Thread not found' });

    let tag = await prisma.tag.findFirst({
      where: { name: { equals: normalized, mode: 'insensitive' } }
    });
    if (!tag) {
      tag = await prisma.tag.create({ data: { name: normalized } });
    }

    const alreadyAssigned = await prisma.threadTag.findUnique({
      where: {
        threadId_tagId: {
          threadId: thread.id,
          tagId: tag.id,
        },
      },
    });

    if (alreadyAssigned) {
      return res.status(200).json({ message: "Tag already associated with thread", tag });
    }

    await prisma.threadTag.create({
      data: {
        threadId: thread.id,
        tagId: tag.id,
      },
    });

    res.status(201).json({ message: 'Tag associated with thread', tag });
  } catch (err) {
    console.error('Failed to add tag:', err);
    res.status(500).json({ error: 'Failed to add tag to thread' });
  }
};
