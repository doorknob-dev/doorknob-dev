const express = require('express');
const app = express(); // Create an Express application
const pool = require("../db");
const router = express.Router();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let baseQuery = "SELECT l.listings_thumbnail_image_url AS thumbnail_image_url, ltl.name AS listings_type, ptl.name AS property_type, l.beds AS beds, l.baths AS baths, l.size AS area_size, aul.name AS area_unit, l.price AS price, l.address_details AS address, alk.name AS area_location, clk.name AS city_location, zl.zipcode AS zipcode FROM listings l INNER JOIN property_type_lk ptl ON l.property_type_id = ptl.id INNER JOIN listings_type_lk ltl ON l.listings_type_id = ltl.id INNER JOIN area_unit_lk aul ON l.area_unit_id = aul.id INNER JOIN area_location_lk alk ON l.area_location_id = alk.id INNER JOIN city_location_lk clk ON l.city_location_id = clk.id INNER JOIN zipcode_lk zl ON l.zipcode_id = zl.id";

// Define a GET route for fetching user details by ID
router.get('/details', async (req, res) => {
    try {
        let queryParams = [];
        let conditions = [];
        let paramIndex = 1; // Initialize parameter index

        // Check if the query parameters are provided and add corresponding conditions
        if (req.query.listings_code) {
            const listingsCode = req.query.listings_code;
            if (typeof listingsCode === 'string') {
                conditions.push("ltl.code = $" + paramIndex++);
                queryParams.push(listingsCode);
            } else {
                return res.status(400).json({ error: "Invalid value for listings_code." });
            }
        }
        if (req.query.property_code) {
            const propertyCode = req.query.property_code;
            if (typeof propertyCode === 'string') {
                conditions.push("ptl.code = $" + paramIndex++);
                queryParams.push(propertyCode);
            } else {
                return res.status(400).json({ error: "Invalid value for property_code." });
            }
        }
        if (req.query.beds) {
            const beds = parseInt(req.query.beds);
            if (!isNaN(beds)) {
                conditions.push("l.beds = $" + paramIndex++);
                queryParams.push(beds);
            } else {
                return res.status(400).json({ error: "Invalid value for beds." });
            }
        }
        if (req.query.baths) {
            const baths = parseInt(req.query.baths);
            if (!isNaN(baths)) {
                conditions.push("l.baths = $" + paramIndex++);
                queryParams.push(baths);
            } else {
                return res.status(400).json({ error: "Invalid value for baths." });
            }
        }
        // if (req.query.size) {
        //     const size = parseInt(req.query.size);
        //     if (!isNaN(size)) {
        //         conditions.push("l.size >= $" + paramIndex++);
        //         queryParams.push(size);
        //     } else {
        //         return res.status(400).json({ error: "Invalid value for size." });
        //     }
        // }
        if (req.query.from_size) {
            const fromSize = parseInt(req.query.from_size);
            if (!isNaN(fromSize)) {
                conditions.push("l.size >= $" + paramIndex++);
                queryParams.push(fromSize);
            } else {
                return res.status(400).json({ error: "Invalid value for from_size." });
            }
        }
        if (req.query.to_size) {
            const toSize = parseInt(req.query.to_size);
            if (!isNaN(toSize)) {
                conditions.push("l.size < $" + paramIndex++);
                queryParams.push(toSize);
            } else {
                return res.status(400).json({ error: "Invalid value for to_size." });
            }
        }
        if (req.query.from_price) {
            const fromPrice = parseInt(req.query.from_price);
            if (!isNaN(fromPrice)) {
                conditions.push("l.price >= $" + paramIndex++);
                queryParams.push(fromPrice);
            } else {
                return res.status(400).json({ error: "Invalid value for from_price." });
            }
        }
        if (req.query.to_price) {
            const toPrice = parseInt(req.query.to_price);
            if (!isNaN(toPrice)) {
                conditions.push("l.price < $" + paramIndex++);
                queryParams.push(toPrice);
            } else {
                return res.status(400).json({ error: "Invalid value for to_price." });
            }
        }
        if (req.query.area_code) {
            const areaCode = req.query.area_code;
            if (typeof areaCode === 'string') {
                conditions.push("alk.code = $" + paramIndex++);
                queryParams.push(areaCode);
            } else {
                return res.status(400).json({ error: "Invalid value for area." });
        }
        if (req.query.city_code) {
            const cityCode = req.query.city_code;
            if (typeof cityCode === 'string') {
                conditions.push("clk.code = $" + paramIndex++);
                queryParams.push(cityCode);
            } else {
                return res.status(400).json({ error: "Invalid value for city." });
            }
        }
        if (req.query.zipcode) {
            const zipcode = req.query.zipcode;
            if (typeof zipcode === 'string') {
                conditions.push("zl.zipcode = $" + paramIndex++);
                queryParams.push(zipcode);
            } else {
                return res.status(400).json({ error: "Invalid value for zipcode." });
            }
        }
    }

        // Combine conditions into the WHERE clause
        let whereClause = conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "";

        // Construct the final SQL query
        let finalQuery = baseQuery + whereClause;

        // Execute the query
        const userResult = await pool.query(finalQuery, queryParams);

        console.log("Query executed, rows found:", userResult.rows.length);

        if (userResult.rows.length > 0) {
            console.log("Listings found:", userResult.rows); // Logging found listings
            res.status(200).json(userResult.rows); // Returning the found listings
        } else {
            console.log("No listings found for the provided filters");
            res.status(404).json({ message: "No listings found for the provided filters" });
        }
    } catch (error) {
        console.error("Error during query:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { router };
