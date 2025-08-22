import prisma from '../utils/prismaClient.js';

export const createTag = async (req, res) => {
  try {
    let { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Tag name is required' });

    const normalized = name.trim().toLowerCase();

    const existing = await prisma.tag.findFirst({
      where: { name: { equals: normalized, mode: 'insensitive' } }
    });

    if (existing) return res.status(400).json({ error: 'Tag already exists' });

    const tag = await prisma.tag.create({ data: { name: normalized } });
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
};

export const getTags = async (req, res) => {
  try {
    const searchQuery = req.query.q || req.query.query || '';
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
      orderBy: { name: 'asc' },
      take: 20,
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

export const deleteTag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await prisma.tag.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(tag);
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ error: 'Failed to delete tag' });
    }
};
