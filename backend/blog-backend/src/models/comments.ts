import Joi from "joi";
// Joi schema - comments
export const commentAddSchema = Joi.object({
  postId: Joi.string().uuid().required,
  author: Joi.string().required(),
  text: Joi.string().min(2).required(),
  createAt: Joi.string(),
});
