const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');



const Image = require('../database/models/images.model');

// Configure Cloudinary
cloudinary.config({
    cloud_name: "drqofmj2h",
    api_key: "883523278595692",
    api_secret: "ysILH4OCP2v1TuY4qv-HHa2LKX8"
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => {
            // Use the ownerType from the request body as the folder name
            return req.body.ownerType;
        },
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });



exports.createImage = async (req, res) => {
    try {
        const file = req.file;
        const { title, description, altText, featured, owner, ownerType } = req.body;

        const imageUrl = file.path;

        const newImage = new Image({
            url: imageUrl,
            title,
            description,
            altText,
            featured,
            owner,
            ownerType,
        });

        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating image: ' + error });
    }
};

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find({});
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images: ' + error });
    }
};

exports.getImageById = async (req, res) => {
    try {
        const imageId = req.params.image_id;
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image: ' + error });
    }
};

exports.getImagesByIds = async (req, res) => {
    const imageIds = req.params.image_ids;
    const IdArray = imageIds.split('&');

    try {
        const images = await Promise.all(
            IdArray.map(async id => {
                return await Image.findById(id);
            })
        );

        if (images.length === 0) {
            return res.status(404).json({ message: 'Images not found' });
        }
        return res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images: ' + error });
    }
}




exports.updateImage = async (req, res) => {
    try {
        const imageId = req.params.image_id;
        const updatedImage = await Image.findByIdAndUpdate(imageId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating image: ' + error });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const imageId = req.params.image_id;
        const deletedImage = await Image.findByIdAndDelete(imageId);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json({ message: 'Image deleted', image: deletedImage });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting image: ' + error });

    }
}