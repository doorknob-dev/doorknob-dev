const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

app.use(cors());
app.use(express.json());

//Auth verification of the user

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, '9u23r32f3f9398fj39jfu3', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token: User ID missing" });
        }
        req.user = decoded; // Ensure this line is correctly executing
        next();
    });
};

// POST API for adding lisitngs 

router.post("/", verifyToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const { thumbNailUrl, listingTypeCode, propertyTypeCode, price, priceUnitCode, beds, baths, size, sizeUnitCode, propertyDescription, addressDetails, areaLocationCode, cityLocationCode, zipcode } = req.body;

        // property code function
        const propertyType = await pool.query("select id from property_type_lk where code =$1", [propertyTypeCode]);
        if (propertyType.rows.length === 0) {
            return res.status(400).json({ error: "Invalid Property Type" })
        }
        const propertyTypeId = propertyType.rows[0].id;

        // price unit 
        const priceUnit = await pool.query("select id from price_unit_lk where code =$1", [priceUnitCode]);
        if (priceUnit.rows.length === 0) {
            return res.status(400).json({ error: "Invalid Price Unit" })
        }
        const priceUnitId = priceUnit.rows[0].id;

        // size unit
        const sizeUnit = await pool.query("select id from area_unit_lk where code =$1", [sizeUnitCode]);
        if (sizeUnit.rows.length === 0) {
            return res.status(400).json({ error: "Invalid Size Unit" })
        }
        const sizeUnitId = sizeUnit.rows[0].id;

        // Area Location
        const areaLocation = await pool.query("select id from area_location_lk where code =$1", [areaLocationCode]);
        if (areaLocation.rows.length === 0) {
            return res.status(400).json({ error: "Invalid Area Location" })
        }
        const areaLocationId = areaLocation.rows[0].id;

        // City Location

        const cityLocation = await pool.query("select id from city_location_lk where code =$1", [cityLocationCode]);
        if (cityLocation.rows.length === 0) {
            return res.status(400).json({ error: "Invalid City Location" })
        }
        const cityLocationId = cityLocation.rows[0].id;

        // Zipcode function

        // const zipcodeResult = await pool.query("SELECT id FROM zipcode_lk WHERE zipcode = $1", [zipcode]);
        // let zipcodeId = null;
        // if (zipcodeResult.rows.length === 0) {
        //     // Zipcode not found, add it
        //     const zipcodeIdResult = await pool.query("INSERT INTO zipcode_lk (zipcode) VALUES ($1) RETURNING id", [zipcode]);
        //     const zipcodeId = zipcodeIdResult.rows[0].id;
        //     await pool.query("INSERT INTO listings (zipcode_id) VALUES ($1)", [zipcodeId]);
        // } else {
        //     const zipcodeId = zipcodeResult.rows[0].id;
        //     await pool.query("INSERT INTO listings (zipcode_id) VALUES ($1)", [zipcodeId]);
        // }
    //     const zipcodeNo = await pool.query("SELECT id FROM zipcode_lk WHERE zipcode = $1", [zipcode]);
    // if (zipcodeNo.rows.length === 0) {
    //     const zipcodeNew = await pool.query("INSERT INTO zipcode_lk (zipcode) VALUES ($1) RETURNING id", [zipcode]);
    //     return zipcodeNew.rows[0].id;
    // }
    // return zipcodeNo.rows[0].id;

    let zipcodeId = await handleZipcode(zipcode);

    async function handleZipcode(zipcode) {
        const result = await pool.query("SELECT id FROM zipcode_lk WHERE zipcode = $1", [zipcode]);
        if (result.rows.length === 0) {
            const insertResult = await pool.query("INSERT INTO zipcode_lk (zipcode) VALUES ($1) RETURNING id", [zipcode]);
            return insertResult.rows[0].id;
        }
        return result.rows[0].id;
    }
 
        const listingType = await pool.query("select id from listings_type_lk where code =$1", [listingTypeCode]);
        if (listingType.rows.length === 0) {
            return res.status(400).json({ error: "Invalid listing type" })
        }
        const listingTypeId = listingType.rows[0].id;

        // Add Rest of the property details

        // const listingDetails = await pool.query("insert into listings (user_id,listings_thumbnail_image_url,listings_type_id,property_type_id,beds,baths,area_unit_id,price,price_unit_id,address_details,area_location_id,city_location_id,description,zipcode_id,size) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning *", [userId, thumbNailUrl, listingTypeId, propertyTypeId, beds, baths, sizeUnitId, price, priceUnitId, addressDetails, areaLocationId, cityLocationId, propertyDescription, zipcodeId, size])
        const listingDetails = await pool.query("insert into listings (user_id, listings_thumbnail_image_url, listings_type_id, property_type_id, beds, baths, area_unit_id, price, price_unit_id, address_details, area_location_id, city_location_id, description, zipcode_id, size) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) returning *", [userId, thumbNailUrl, listingTypeId, propertyTypeId, beds, baths, sizeUnitId, price, priceUnitId, addressDetails, areaLocationId, cityLocationId, propertyDescription, zipcodeId, size]);
        res.status(200).json({ message: 'listing added successfully' });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: 'Server Error', message: 'An error occurred while creating the post' });

    }
})

  module.exports = { router };

// app.use('/', router);


// app.listen(5001, () => {
//     console.log("Server started on port 5001");
// });