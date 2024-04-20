const database = require('../config/dbConn')

// @desc Get all belt codes
// @route GET /codes
// @access Private
const getAllCodes = async (req, res) => {
    const codes = await database.query(`
        
    SELECT
    c.id,
    c.code_index,
    c.code_name,
    c.legacy_code_name,
    c.stock_level,
    json_agg(json_build_object(
        'vault_id', v.id,
        'vault_name', v.vault_name
    )) AS in_vaults,
    c.note
FROM
    codes c
LEFT JOIN
    codes_in_vaults cv ON c.id = cv.code_id
LEFT JOIN
    vaults v ON cv.vault_id = v.id
GROUP BY
    c.id,
    c.code_index,
    c.code_name,
    c.legacy_code_name,
    c.stock_level,
    c.note
ORDER BY
    c.code_index ASC;


`);

    // If no codes
    if (codes.rowCount === 0) {
        return res.status(400).json({ message: 'No codes found' })
    }

    res.json(codes.rows)
};


// @desc Get a code by ID
// @route GET /codes/:id
// @access Private
const getCodeById = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to get the ID from the URL
        const code = await database.query('SELECT * FROM codes WHERE id=$1', [id]);

        console.log(id)

        if (code.rowCount === 0) {
            return res.status(404).json({ message: 'Code not found' });
        }

        res.json(code.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};



// @desc Create new code
// @route POST /codes
// @access Private
const createNewCode = async (req, res) => {
    try {
        const { code_index, code_name, legacy_code_name, stock_level, note } = req.body;

        // Confirm data
        if (!code_name) {
            return res.status(400).json({ message: 'All fields exect code_index, legacy code names and note are required' });
        }

        // Check for duplicate code
        const duplicate = await database.query('SELECT * FROM codes WHERE code_name=$1', [code_name]);

        if (duplicate.rowCount !== 0) {
            return res.status(409).json({ message: 'Duplicate code name' });
        }

        // Create and store new code
        await database.query('INSERT INTO codes (code_index, code_name, legacy_code_name, stock_level, note) VALUES ($1, $2, $3, $4, $5)', [code_index, code_name, legacy_code_name, stock_level, note]);

        res.status(201).json({ message: `New code "${code_name}" created` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Update a code
// @route PATCH /codes
// @access Private
const updateCode = async (req, res) => {
    const { id, code_index, code_name, legacy_code_name, stock_level, note } = req.body;

    console.log(id, code_index, code_name, legacy_code_name, stock_level, note)

    // Confirm data 
    if (!id || !code_name) {
        return res.status(400).json({ message: 'ID and code name are required' });
    }

    // Does the code exist to update?
    const codeToUpdate = await database.query('SELECT * FROM codes WHERE id=$1', [id]);

    if (codeToUpdate.rowCount === 0) {
        return res.status(400).json({ message: 'Code not found' });
    }

    // Check for duplicate 
    const duplicate = await database.query('SELECT * FROM codes WHERE code_name=$1', [code_name]);

    // Allow updates to the original user 
    if (duplicate.rowCount !== 0 && duplicate.rows[0].id !== id) {
        return res.status(409).json({ message: 'Duplicate code' });
    }

    const updatedCode = await database.query('UPDATE codes SET code_index=$1, code_name=$2, legacy_code_name=$3, stock_level=$4, note=$5 WHERE id=$6 RETURNING *', [code_index, code_name, legacy_code_name, stock_level, note, id]);

    res.json({ message: `"${updatedCode.rows[0].code_name}" updated` });
};


// @desc Delete a code
// @route DELETE /codes
// @access Private
const deleteCode = async (req, res) => {
    const { id } = req.params;

    console.log(id)

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Code ID Required' });
    }

    // Does the code exist to delete?
    const code = await database.query('SELECT * FROM codes WHERE id=$1;', [id]);

    if (code.rowCount === 0) {
        return res.status(400).json({ message: 'Code not found' });
    }

    const result = await database.query('DELETE FROM codes WHERE id=$1 RETURNING *', [id]);

    const reply = `Code "${result.rows[0].code_name}" deleted`;

    res.json(reply);
};


module.exports = {
    getAllCodes,
    getCodeById,
    createNewCode,
    updateCode,
    deleteCode
};



