const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const DesignerService = require('../services/designer.service')

class DesignerController {



    getAllDesigners = async (req, res) => {

        try {
            const designers = await DesignerService.getAllDesigners();
            res.status(200).json(designers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getDesignerById = async (req, res) => {
        const designerId = req.params.designer_id;
        try {
            const designer = await DesignerService.getDesignerById(designerId);
            if (!designer) {
                return res.status(404).json({ message: 'Designer not found' });
            }
            res.status(200).json(designer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getDesignerByEmail = async (req, res) => {
        const email = req.params.email;
        try {
            const designer = await DesignerService.getDesignerByEmail(email);
            if (!designer) {
                return res.status(404).json({ message: 'Designer not found' });
            }
            res.status(200).json(designer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }



    createDesigner = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                username,
                email,
                password,
                firstName,
                lastName,
            } = req.body;

            let hashedPassword = await bcrypt.hash(password, 10);
            const designerData = {}


            designerData = {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
            };

            const newDesigner = await DesignerService.createDesigner(designerData);
            res.status(201).json(newDesigner);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }



    updateDesigner = async (req, res) => {
        let designer_id = req.params.designer_id

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                username,
                email,
                password,
                firstName,
                lastName,
            } = req.body;

            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10)
            }

            let designerData = {};

            username && (designerData.username = username);
            email && (designerData.email = email);
            password && (designerData.password = hashedPassword);
            firstName && (designerData.firstName = firstName);
            lastName && (designerData.lastName = lastName);



            const updatedDesigner = await DesignerService.updatedDesigner(designerData, designer_id);
            if (!updatedDesigner) {
                return res.status(500).json({ message: "Error updating designer: " });
            }
            res.status(201).json(updatedDesigner);
        } catch (error) {
            res.status(500).json({ message: "Error updating designer: " + error.message });
        }
    }

    addDesignerProduct = async (req, res) => {

        const designerId = req.params.designer_id;
        const productId = req.params.product_id;
        try {

            res.status(200).json(await DesignerService.addDesignerProduct(designerId, productId));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    updateDesignerProduct = async (req, res) => {

        const designerId = req.params.designer_id;
        const productId = req.params.product_id;
        try {

            res.status(200).json(await DesignerService.updateDesignerProduct(designerId, productId));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }


    removeDesignerProduct = async (req, res) => {

        const designerId = req.params.designer_id;
        const productId = req.params.product_id;
        try {
            const updatedDesigner = await DesignerService.removeDesignerProduct(designerId, productId);
            if (!updatedDesigner) {
                return res.status(404).json({ message: 'Designer or product not found' });
            }
            res.status(200).json(updatedDesigner);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }


    deleteDesigner = async (req, res) => {

        const designerId = req.params.designer_id;
        try {
            const deletedDesigner = await DesignerService.deleteDesigner(designerId);
            if (!deletedDesigner) {
                return res.status(404).json({ message: 'Designer not found' });
            }
            res.status(200).json(deletedDesigner);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    //

    getAllTestimonials = async (req, res) => {

        try {
            const testimonials = await DesignerService.getAllTestimonials();
            res.status(200).json(testimonials);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
    getTestimonialById = async (req, res) => {
        try {
            const testimonial = await DesignerService.getTestimonialById(req.params.testimonial_id);
            if (!testimonial) {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
            res.status(200).json(testimonial);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getTestimonialByDesignerId = async (req, res) => {

        try {
            const testimonials = await DesignerService.getTestimonialByDesignerId(req.params.designer_id);
            if (!testimonials) {
                return res.status(404).json({ message: 'Testimonials not found for designer' });
            }
            res.status(200).json(testimonials);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }


    createTestimonial = async (req, res) => {

        try {
            let data = req.body
            const testimonial = await DesignerService.createTestimonial(data);
            res.status(201).json(testimonial);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }


    updateTestimonial = async (req, res) => {
        let testimonial_id = req.params.id;
        let data = req.body

        try {
            const testimonial = await DesignerService.updateTestimonial(testimonial_id, data);
            if (!testimonial) {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
            res.status(200).json(testimonial);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    deleteTestimonial = async (req, res) => {
        try {
            const deletedTestimonialId = await DesignerService.deleteTestimonial(req.params.testimonial_id);
            if (!deletedTestimonialId) {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
            res.status(200).json({ message: `Testimonial with ID ${deletedTestimonialId} has been deleted` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }





}

module.exports = new DesignerController()