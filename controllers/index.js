const router = require ('express') .Router();
const dashboardRoutes = require ('./dashboard-routes');
const homeRoutes = require ('./home-routes');
const apiRoutes = require ('./api');

router.use ('/dashboard', dashboardRoutes);
router.use ('/', homeRoutes);
router.use ('/api', apiRoutes);
module.exports = router;