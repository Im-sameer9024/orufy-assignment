import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse(req.body);
    req.validatedData = parsedData;
    next();
  } catch (error) {
    console.log('Error in validate middleware', error);

    if (error instanceof ZodError) {
      const formattedErrors = error.flatten().fieldErrors;

      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: formattedErrors, // 🔥 send structured errors
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.message, // 🔥 send structured errors
    });
  }
};
