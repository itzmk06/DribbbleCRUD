    const express = require('express');
    const app = express();
    const port = 3000;
    const cors = require('cors');
    const mongoose = require('mongoose');
    const mongoUrl = "mongourlhere";
    const User = require('./models/User.js');
    const bodyParser = require('body-parser');

    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.json());

    // Connect to MongoDB
    const connectToDb = async () => {
        try {
            await mongoose.connect(mongoUrl);
            console.log("Connection to MongoDB successful");
        } catch (error) {
            console.log("Connection to MongoDB failed!");
            throw error;
        }
    };

    connectToDb();

    // Image schema definition
    const imageSchema = new mongoose.Schema({
        src: { type: String, required: true },
        type: String,
        name: { type: String, default: "Admin" },
        likes: { type: String, default: "0" },
        views: { type: String, default: "0" },
        authorImage: { type: String, default: "https://cdn.dribbble.com/userupload/17555790/file/original-5c4ae37f40454a724b60d08d9bd588e3.jpg?resize=400x300&vertical=center" },
        username: { type: String, default: "admin" },
        location: { type: String, default: "India" },
        rating: { type: Number, default: 4.9 },
    });

    const Image = mongoose.model('Image', imageSchema);

    // POST route to upload an image
    app.post('/upload', async (req, res) => {
        const { src, type } = req.body;

        try {
            const newImage = new Image({ src, type });
            console.log(newImage);
            const savedImage = await newImage.save();
            res.status(201).json({ message: 'Image saved successfully', data: savedImage });
        } catch (error) {
            console.error('Error saving image:', error);
            res.status(500).json({ message: 'Failed to save image' });
        }
    });

    // GET route to fetch data from both Image and User collections
    app.get('/items', async (req, res) => {
        connectToDb();
        try {
            // Fetch data from both collections
            const userUploads = await User.find({});
            const imageUploads = await Image.find({});
            
            // Combine data from both collections
            const combinedData = [...userUploads, ...imageUploads];

            // Return the combined data
            res.status(200).json(combinedData);
            console.log(combinedData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

    // PUT route to update a user
    app.put('/update/:id', async (req, res) => {
        const { id } = req.params;
        const { src, type } = req.body;

        try {
            const updatedItem1 = await User.findByIdAndUpdate(id, { src, type }, { new: true });
            const updatedItem2 = await Image.findByIdAndUpdate(id, { src, type }, { new: true });
            
            if (!updatedItem1 && !updatedItem2) {
                return res.status(404).json({ message: 'Item not found' });
            }

            const updatedItem = updatedItem1 || updatedItem2;

            res.json(updatedItem);
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ message: 'Error updating item' });
        }
    });

    // DELETE route to delete a user
    app.delete('/delete/:id', async (req, res) => {
        connectToDb();

        const { id } = req.params;
        try {
            const result1 = await User.deleteOne({ _id: id });
            const result2 = await Image.deleteOne({ _id: id });
            
            if (result1.deletedCount === 0&&result2.deletedCount === 0) {
                return res.status(404).send('Item not found');
            }
            res.status(200).send('Item deleted successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });

    // Starting the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });


    app.get('/items/:id', async(req, res) => {
        connectToDb();
        const { id } = req.params;
        const imageData1=await User.findById(id);
        const imageData2=await Image.findById(id);
        const imageData=imageData1||imageData2;
        
        console.log(id);
        
        return res.json(imageData);
    });
    
    