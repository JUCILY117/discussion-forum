import prisma from '../prismaClient.js';

export const getCategories= async(req,res)=>{
    try{
        const categories= await prisma.category.findMany({ orderBy: { name: 'asc' } });
        res.status(200).json(categories);
    }catch(error){
        console.error('Error fetching categories:', error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
};
