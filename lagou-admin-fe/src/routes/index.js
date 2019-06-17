import SMERouter from 'sme-router'
import * as indexController from '../controllers/index'
import * as positionController from '../controllers/position'

const router = new SMERouter('router-view')
router.route('/', indexController.render)
router.route('/position', positionController.render)