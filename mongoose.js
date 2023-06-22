const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://likithrgbsc22:likith2004@cluster0.q0ltqpd.mongodb.net/?retryWrites=true&w=majority';

// Leg Schema
const legSchema = new mongoose.Schema({
  city1: String,
  city2: String,
  cost: Number
});

// Route Schema
const routeSchema = new mongoose.Schema({
  legs: [legSchema]
});

// Route Model
const Route = mongoose.model('Route', routeSchema);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // CRUD operations
    // Create a route document
    const route = new Route({
      legs: [
        { city1: 'City A', city2: 'City B', cost: 100 },
        { city1: 'City B', city2: 'City C', cost: 150 },
        { city1: 'City C', city2: 'City D', cost: 200 }
      ]
    });
    const insertResult = await route.save();
    console.log('Inserted document:', insertResult._id);

    // Read the route document
    const findResult = await Route.findOne({});
    console.log('Route document:', findResult);

    // Update the cost of a leg
    const legToUpdate = findResult.legs[0];
    legToUpdate.cost = 120;
    const updateResult = await findResult.save();
    console.log('Updated document:', updateResult._id);

    // Delete the route document
    const deleteResult = await Route.deleteOne({ _id: findResult._id });
    console.log('Deleted document:', deleteResult.deletedCount);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Call the function to perform CRUD operations
connectToMongoDB();