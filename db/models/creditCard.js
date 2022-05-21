const client = require("../client");

async function createCreditCard({
    firstname, 
    lastname, 
    cardtype,
    zipcode,
    cardnumber,
    cvv,
    expdate
}) {
    try {
        const {
            rows: [creditCard],
        } = await client.query(`
        INSERT INTO creditCard(firstname, lastname, cardtype, zipcode, cardnumber, cvv, expdate)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
        [ firstname, lastname, cardtype, zipcode, cardnumber, cvv, expdate ]
        );
        return creditCard;
    } catch (error) {
        throw error;
    }
}

module.exports = createCreditCard;