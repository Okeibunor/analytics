  const badRequestResponse = async ({ response, data, message, error }) => {
    if (error) {
      logData({
        type: 'error',
        data: error,
        message,
      })
  
      if (Env.get('NODE_ENV') !== 'testing') {
        Sentry.captureException(error)
      }
  
      if (
        error.message.includes('E_USER_NOT_FOUND') ||
        error.message.includes('E_PASSWORD_MISMATCH')
      ) {
        return unauthorizedResponse({
          response,
          message: 'Invalid email or password',
        })
      }
  
      if (error.message.includes('E_INVALID_JWT_REFRESH_TOKEN')) {
        return unauthorizedResponse({
          response,
          message: 'Invalid refresh token',
        })
      }
  
      if (
        (error.messages && error.messages.errors) ||
        error.message.includes('E_VALIDATION_FAILURE')
      ) {
        return response.status(500).json({
          status: false,
          message: 'validation error',
          data: error.messages.errors,
        })
      }
      if (error.response && error.response.data) {
        return response.status(400).json({
          status: false,
          message: getAxiosErrorMessage(error.response.data),
          data,
        })
      }
    }
    return response.status(400).json({
      status: false,
      message,
      data,
    })
  }
  exports.badRequestResponse = badRequestResponse
  
  const unauthorizedResponse = ({ response, data, message }) => {
    return response.status(401).json({
      status: false,
      message,
      data,
    })
  }
  exports.unauthorizedResponse = unauthorizedResponse
  
  const forbiddenResponse = ({ response, data, message }) => {
    return response.status(403).json({
      status: false,
      message,
      data,
    })
  }
  exports.forbiddenResponse = forbiddenResponse
  
  const notFoundResponse = ({ response, data, message }) => {
    return response.status(404).json({
      status: false,
      message,
      data,
    })
  }
  exports.notFoundResponse = notFoundResponse

  const successfulResponse = ({ response, data, message }) => {
    return response.status(200).json({
      status: true,
      message,
      data,
    })
  }
  exports.successfulResponse = successfulResponse
  
  const serverErrorResponse = ({ response, data, message }) => {
    return response.status(500).json({
      status: false,
      message,
      data,
    })
  }
  exports.serverErrorResponse = serverErrorResponse
  
  const validationErrorResponse = ({ response, message, field }) => {
    return response.status(500).json({
      status: false,
      message: 'validation error',
      data: [
        {
          message,
          field,
          validation: 'valid',
        },
      ],
    })
  }
  exports.validationErrorResponse = validationErrorResponse
  