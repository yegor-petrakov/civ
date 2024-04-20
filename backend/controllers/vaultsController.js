const database = require('../config/dbConn')

// @desc Get all users
// @route GET /users
// @access Private
const getAllVaults = async (req, res) => {

    const vaults = await database.query(`

        SELECT
            v.id,
            v.vault_name,
            v.note,
            json_agg(json_build_object(
                'code_id', c.id,
                'code_index', c.code_index
            )) AS includes
        FROM
            vaults v
        LEFT JOIN
            codes_in_vaults cv ON v.id = cv.vault_id
        LEFT JOIN
            codes c ON cv.code_id = c.id
        GROUP BY
            v.id,
            v.vault_name,
            v.note
            ORDER BY
            v.vault_name ASC;
    
    `)

    // If no vaults 
    if (vaults.rowCount === 0) {
        return res.status(400).json({ message: 'No vaults found' })
    }

    res.json(vaults.rows)
}




// @desc Get a code by ID
// @route GET /codes/:id
// @access Private
const getVaultById = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to get the ID from the URL
        const vault = await database.query(`

        SELECT
    v.id,
    v.vault_name,
    v.note,
    json_agg(json_build_object(
        'code_id', c.id,
        'code_index', c.code_index
    )) AS includes
FROM
    vaults v
LEFT JOIN
    codes_in_vaults cv ON v.id = cv.vault_id
LEFT JOIN
    codes c ON cv.code_id = c.id
WHERE
    v.id = $1 
GROUP BY
    v.id,
    v.vault_name,
    v.note;
    
    `, [id])

        console.log(id)

        if (vault.rowCount === 0) {
            return res.status(404).json({ message: 'Vault not found' });
        }

        res.json(vault.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};






// @desc Create new user
// @route POST /users
// @access Private
const createNewVault = async (req, res) => {
    const { vault_name, note } = req.body

    // Confirm data
    if (!vault_name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await database.query('SELECT * FROM vaults WHERE vault_name=$1', [vault_name])

    if (duplicate.rowCount !== 0) {
        return res.status(409).json({ message: 'Duplicate vault name' })
    }

    // Insert new vault into the database
    let newVault;
    if (note) {
        newVault = await database.query('INSERT INTO vaults (vault_name, note) VALUES ($1, $2) RETURNING *', [vault_name, note]);
    } else {
        newVault = await database.query('INSERT INTO vaults (vault_name) VALUES ($1) RETURNING *', [vault_name]);
    }

    if (newVault) { //created 
        res.status(201).json({ message: `New vault ${newVault} created` })
    } else {
        res.status(400).json({ message: 'Invalid newVault data received' })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateVault = async (req, res) => {
    const { id, vault_name, note } = req.body;

    // Confirm data 
    if (!id || !vault_name) {
        return res.status(400).json({ message: 'All fields except note are required' });
    }

    // Does the user exist to update?
    const vault = await database.query('SELECT * FROM vaults WHERE id=$1', [id]);

    if (vault.rowCount === 0) {
        return res.status(400).json({ message: 'Vault not found' });
    }

    // Check for duplicate 
    const duplicate = await database.query('SELECT * FROM vaults WHERE vault_name=$1', [vault_name]);

    // Allow updates to the original user 
    if (duplicate.rowCount !== 0 && duplicate.rows[0].id !== id) {
        return res.status(409).json({ message: 'Duplicate vault name' });
    }

    const updatedVault = await database.query('UPDATE vaults SET vault_name=$1, note=$2 WHERE id=$3 RETURNING *', [vault_name, note, id]);

    res.json({ message: `${updatedVault.rows[0].vaultname} updated` });
};


// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteVault = async (req, res) => {
    const { id } = req.params;

    // Log the received id for debugging
    console.log('Received id:', id);

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    // Does the user exist to delete?
    const vault = await database.query('SELECT * FROM vaults WHERE id=$1;', [id]);

    if (vault.rowCount === 0) {
        return res.status(400).json({ message: 'Vault not found' });
    }


    const result = await database.query('DELETE FROM vaults WHERE id=$1 RETURNING *', [id]);


    const reply = `Vault name ${result.rows[0].vaultname} with ID ${result.rows[0].id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllVaults,
    getVaultById,
    createNewVault,
    updateVault,
    deleteVault
};
