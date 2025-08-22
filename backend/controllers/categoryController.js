import prisma from '../utils/prismaClient.js';

export const getCategories= async(req,res)=>{
    try{
        const categories= await prisma.category.findMany({ orderBy: { name: 'asc' } });
        res.status(200).json(categories);
    }catch(error){
        console.error('Error fetching categories:', error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
};
export const addCategories = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Failed to add category' });
    }
};
export const deleteCategories= async(req,res)=>{
    const { id } = req.params;
    try {
        const category = await prisma.category.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(category);
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
