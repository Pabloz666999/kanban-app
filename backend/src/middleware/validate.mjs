export const validateRequired = (fields) => {
  return (req, res, next) => {
    const errors = []
    
    fields.forEach(field => {
      if (!req.body[field] || req.body[field].toString().trim() === '') {
        errors.push(`${field} is required`)
      }
    })
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      })
    }
    
    next()
  }
}
