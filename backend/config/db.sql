CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE vaults (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vault_name VARCHAR(28) UNIQUE NOT NULL,
    note VARCHAR (100)
);

CREATE TABLE codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code_index VARCHAR(255) UNIQUE NOT NULL,
    code_name VARCHAR(255) UNIQUE NOT NULL,
    legacy_code_name VARCHAR(255),
    stock_level VARCHAR(100) NOT NULL DEFAULT 'empty',
    note VARCHAR(255)
);

CREATE TABLE codes_in_vaults (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code_id UUID REFERENCES codes(id),
    vault_id UUID REFERENCES vaults(id)
);


SELECT
    c.code_index,
    c.code_name,
    c.legacy_code_name,
    c.stock_level,
    json_agg(json_build_object(
        'vault_id', v.id,
        'vault_name', v.vault_name
    )) AS in_vaults
FROM
    codes c
JOIN
    codes_in_vaults cv ON c.id = cv.code_id
JOIN
    vaults v ON cv.vault_id = v.id
GROUP BY
    c.code_index,
    c.code_name,
    c.legacy_code_name,
    c.stock_level;


{
    code_index,
    code_name,
    legacy_code_name,
    stock_level,
    in_vaults: [
        {
            vault_id: // vault id,
            vault_name: // vault name,
        }
    ]
}

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
    v.note;



{
    vault_name,
    note,
    inclues: [
        {
            code_id: // code id,
            code_index: // code index
        }
    ]
}








/* Codes In Vaults */

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
WHERE
    civ.vault_id = <vault_id>;

{
    id,
    code_id,
    code_data: {
        c.id,
        c.code_index
    },
    vault_id,
    vault_data: {
        v.id,
        v.vault_name
    }
}











SELECT
    c.code_index,
    c.code_name,
    c.legacy_code_name,
    c.stock_level,
    json_agg(json_build_object(
        'vault_id', v.id,
        'vault_name', v.vault_name
    )) AS in_vaults
FROM
    codes c
JOIN
    codes_in_vaults cv ON c.id = cv.code_id
JOIN
    vaults v ON cv.vault_id = v.id
GROUP BY
    c.code_index,
    c.code_name,
    c.legacy_code_name,
    c.stock_level;
