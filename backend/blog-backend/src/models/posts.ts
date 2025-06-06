import Joi from "joi";

// Joi schema - post
export const postsAddSchema = Joi.object({
  title: Joi.string().min(2).max(155).required(),
  content: Joi.string().min(2).required(),
  author: Joi.string().required(),
}).options({ stripUnknown: true });

// Joi schema - comments
const commentAddSchema = Joi.object({
  postId: Joi.string().uuid().required,
  author: Joi.string().required(),
  text: Joi.string().min(2).required(),
  createAt: Joi.string(),
});
