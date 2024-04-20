const database = require('../config/dbConn')

// @desc Get all codes in vaults
// @route GET /codesinvaults
// @access Private
const getAllCodesInVaults = async (req, res) => {

    const codesInVaults = await database.query(`

        SELECT
            civ.id,
            civ.code_id,
            json_build_object(
                'id', c.id,
                'code_index', c.code_index
            ) AS code_data,
            civ.vault_id,
            json_build_object(
                'id', v.id,
                'vault_name', v.vault_name
            ) AS vault_data
        FROM
            codes_in_vaults civ
        JOIN
            codes c ON civ.code_id = c.id
        JOIN
            vaults v ON civ.vault_id = v.id

    `)

    if (codesInVaults.rowCount === 0) {
        return res.status(400).json({ message: 'No relations between codes and vaults found' })
    }

    res.json(codesInVaults.rows)
}

// @desc Put a new code into the vault
// @route POST /codesinvaults
// @access Private
const createNewCodeInVault = async (req, res) => {
    const { code_id, vault_id } = req.body

    // Confirm data
    if (!code_id && !vault_id) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store new code in the vault
    const newCodeInVault = await database.query('INSERT INTO codes_in_vaults (code_id, vault_id) VALUES ($1, $2) RETURNING *', [code_id, vault_id])

    if (newCodeInVault) { //created 
        res.status(201).json({ message: `New code was put into vault` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteCodeInVault = async (req, res) => {
    const { id } = req.params;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'CIV ID Required' });
    }

    // Does the user exist to delete?
    const civ = await database.query('SELECT * FROM codes_in_vaults WHERE id=$1;', [id]);

    if (civ.rowCount === 0) {
        return res.status(400).json({ message: 'Vault not found' });
    }


    const result = await database.query('DELETE FROM codes_in_vaults WHERE id=$1 RETURNING *', [id]);


    const reply = `CIV deleted`;

    res.json(reply);
};


module.exports = {
    getAllCodesInVaults,
    createNewCodeInVault,
    deleteCodeInVault
};
