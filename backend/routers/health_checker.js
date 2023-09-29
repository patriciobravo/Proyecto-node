'use strict';

const express = require('express');
const router = express.Router({});

class HealthChecker {

  static check() {
   return {
      uptime: process.uptime(),
      response: process.hrtime(),
      message: 'Server is ok',
      timestamp: Date.now()
    };
  }
}

router.get('/', async (_req, res, _next) => {
  try {
    res.send(HealthChecker.check());
  } catch (error) {

    res.status(503).send(error);
  }
});

// export router with all routes included
module.exports = router;