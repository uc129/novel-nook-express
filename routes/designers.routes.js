const express = require('express')
const router = express.Router()

const designerController = require('../controllers/designer.controller.js')
const { createDesignerValidation } = require('../validators/designer/createDesigner.validator.js')
const { updateDesignerValidation } = require('../validators/designer/updateDesigner.validator.js')


router.get('/all', designerController.getAllDesigners);
router.get('/id/:designer_id', designerController.getDesignerById);
router.get('/email/:email', designerController.getDesignerByEmail);

router.post('/create', createDesignerValidation, designerController.createDesigner);
router.patch('/update/:designer_id', updateDesignerValidation, designerController.updateDesigner);

router.patch('/:designer_id/product/add/:product_id', designerController.addDesignerProduct);
router.patch('/:designer_id/product/update/:product_id', designerController.updateDesignerProduct);
router.delete('/:designer_id/product/remove/:product_id', designerController.removeDesignerProduct);

router.delete('/delete/:designer_id', designerController.deleteDesigner);

router.get('/testimonial/all', designerController.getAllTestimonials);
router.get('/testimonial/id/:testimonial_id', designerController.getTestimonialById);
router.get('/testimonial/designer/:designer_id', designerController.getTestimonialByDesignerId);

router.post('/testimonial/create', designerController.createTestimonial);
router.patch('/testimonial/update/:testimonial_id', designerController.updateTestimonial);
router.delete('/testimonial/delete/:testimonial_id', designerController.deleteTestimonial);






module.exports = router;
