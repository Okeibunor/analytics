const { successfulResponse, notFoundResponse } = require('../../helpers/responses');

var router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/vfd', require('./vfd'));

router.get('/', (req, res) => {
  return successfulResponse({
    response: res,
    message: "welcome to financial analytics api"
  })
})


router.use('/', (req, response) => {
  return notFoundResponse({
    response,
    message: "route not found"
  })
})

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;