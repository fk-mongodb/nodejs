/**
 * @fileoverview Demonstrate simple use case for aggregation pipeline to MongoDB Atlas Cluster
 * 
 * @description
 * Demonstrate simple use case for aggregation pipeline to MongoDB Atlas Cluster
 * 
 * @author Fernando Karnagi <fkarnagi@gmail.com>
 * @version 1.0.0
 * @date 11-Dec-2024
 * 
 * @usage
 * cmd/2_crud.js
 */

const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.s70hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await crud(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function crud(client) {
    const db = await client.db("food");
    console.log(`Connecting to Food DB`);

    const aggregrationRule = [
        {
            $lookup: {
                from: "restaurants",
                localField: "restaurant_name",
                foreignField: "name",
                let: { orders_drink: "$drink" },
                pipeline: [{
                    $match: {
                        $expr: { $in: ["$$orders_drink", "$beverages"] }
                    }
                }],
                as: "matches"
            }
        }
    ]
    const result = await db.collection("orders").aggregate(aggregrationRule).toArray();
    console.log(JSON.stringify(result))

};


main().catch(console.error);