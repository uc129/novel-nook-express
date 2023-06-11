const { ProductModel } = require('../database/models/products/product.model');
const { DesignerModel, TestimonialModel } = require('../database/models/users/designer.model');

class DesignerService {

    async getAllDesigners() {
        try {
            const designers = await DesignerModel.find();
            return designers;
        } catch (error) {
            return (`Could not get designers: ${error}`);
        }
    }

    async getDesignerById(designerId) {
        try {
            const designer = await DesignerModel.findById(designerId)
            return designer;
        } catch (error) {
            return (`Could not get designer: ${error}`);
        }
    }

    async getDesignerByEmail(email) {
        try {
            const designer = await DesignerModel.findOne({ email })
            return designer;
        } catch (error) {
            return (`Could not get designer: ${error}`);
        }
    }


    async createDesigner(designerData) {
        try {
            const designer = new DesignerModel(designerData);
            const newDesigner = await designer.save();
            return newDesigner;
        } catch (error) {
            return (`Could not create designer: ${error}`);
        }
    }


    async updatedDesigner(designerData, designerId) {
        try {
            const updatedDesigner = await DesignerModel.findByIdAndUpdate(
                designerId,
                designerData,
                { new: true }
            );
            return updatedDesigner;
        } catch (error) {
            return (`Could not update designer: ${error}`);
        }
    }

    async addDesignerProduct(designerId, productId) {

        try {
            let product = ProductModel.findById(productId)
            if (!product) return 'Product not found'

            const updatedDesigner = await DesignerModel.findOneAndUpdate(
                { _id: designerId },
                { $addToSet: { products: productId } },
                { new: true }
            ).populate('products');

            if (!updatedDesigner) {
                return (`Could not update designer`);
            }
            return updatedDesigner.products
        } catch (error) {
            return (`Could not update designer: ${error}`);
        }
    }



    async updateDesignerProduct(designerId, productId) {

        try {
            let product = ProductModel.findById(productId)
            if (!product) return 'Product not found'

            const updatedDesigner = await DesignerModel.findOneAndUpdate(
                { _id: designerId },
                { $addToSet: { products: productId } },
                { new: true }
            ).populate('products');

            if (!updatedDesigner) {
                return (`Could not update designer`);
            }
            return updatedDesigner.products
        } catch (error) {
            return (`Could not update designer: ${error}`);
        }
    }





    removeDesignerProduct = async (designerId, productId) => {
        try {

            let product = ProductModel.findById(productId)
            if (!product) return 'Product not found'

            const updatedDesigner = await DesignerModel.findOneAndUpdate(
                { _id: designerId },
                { $pull: { products: productId } }
            );
            if (!updatedDesigner) {
                return res.status(404).json({ message: 'Designer or product not found' });
            }
            return updatedDesigner
        } catch (error) {
            return ('Could not remove product' + error)
        }

    }

    async deleteDesigner(designerId) {
        try {
            const deletedDesigner = await DesignerModel.findByIdAndDelete(designerId);
            return deletedDesigner;
        } catch (error) {
            return (`Could not delete designer: ${error}`);
        }
    }

    async getAllTestimonials() {
        try {
            const testimonials = await TestimonialModel.find()
                .populate('designer');
            return testimonials;
        } catch (error) {
            return (`Could not get testimonials: ${error}`);
        }
    }

    async getTestimonialById(testimonialId) {
        try {
            const testimonial = await TestimonialModel.findById(testimonialId)
                .populate('designer');
            return testimonial;
        } catch (error) {
            return (`Could not get testimonial: ${error}`);
        }
    }

    async getTestimonialByDesignerId(designerId) {
        try {
            const testimonials = await TestimonialModel.find({ designer: designerId })
                .populate('designer');
            return testimonials;
        } catch (error) {
            return (`Could not get testimonials: ${error}`);
        }
    }

    async createTestimonial(data) {
        try {
            const testimonial = new TestimonialModel(data);
            const newTestimonial = await testimonial.save();
            return newTestimonial;
        } catch (error) {
            return (`Could not create testimonial: ${error}`);
        }
    }

    async updateTestimonial(testimonialId, data) {
        try {
            const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
                testimonialId,
                data,
                { new: true }
            );
            return updatedTestimonial;
        }

        catch (error) {
            return (`Could not update testimonial: ${error}`);
        }
    }

    async deleteTestimonial(testimonialId) {
        try {
            const deletedTestimonial = await TestimonialModel.findByIdAndDelete(
                testimonialId
            );
            return deletedTestimonial._id;

        } catch (error) {
            return (`Could not delete testimonial: ${error}`);
        }

    }
}

module.exports = new DesignerService()