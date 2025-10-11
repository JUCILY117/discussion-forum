import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').max(100).optional().transform(val => val?.trim()),
  username: z.string().min(2, 'Username must be at least 2 characters').max(30).optional().transform(val => val?.trim()),
  avatar: z.string().url('Avatar must be a valid URL').optional().transform(val => val?.trim()),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional().transform(val => val?.trim()),
  website: z.string().url('Website must be a valid URL').optional().transform(val => val?.trim()),
  location: z.string().max(100, 'Location must be 100 characters or less').optional().transform(val => val?.trim()),
  bannerImage: z.string().url('Banner image must be a valid URL').optional().transform(val => val?.trim()),
});
