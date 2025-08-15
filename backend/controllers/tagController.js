import prisma from '../prismaClient.js';

export const createTag = async(req,res)=>{
    try{
        const {name}=req.body;
        if (!name) return res.status(400).json({error: 'Tag name is required'});

        const existing= await prisma.tag.findUnique({where:{name}});
        if (existing) return res.status(400).json({error: 'Tag already exists'});

        const tag= await prisma.tag.create({data:{name}});
        res.status(201).json(tag);
    }catch(error){
        console.error('Error creating tag:', error);
        res.status(500).json({error: 'Failed to create tag'});
    }
};


export const getTags = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany();
        res.status(200).json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
};
