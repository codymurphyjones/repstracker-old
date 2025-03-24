const clientVersion = "version-2226k"

function buildURL(
    baseURL,
    params = undefined,
    additionalConstraints = [],
    real = true
) {
    // Default constraints
    console.log('params:', params);
    const defaultConstraints = [
        {
            key: 'ImportHistory',
            constraint_type: 'equals',
            value: params?.importHistory || 'importHistory',
        },
        {
            key: 'createdBy',
            constraint_type: 'equals',
            value: params?.createdBy || 'CreatedBy',
        },
    ];

    // Merge default constraints with additional constraints
    const paramVal = params ? defaultConstraints : [];
    const allConstraints = [...paramVal, ...additionalConstraints];

    console.log(allConstraints.map((item) => item.key));
    // Encode the constraints array
    const constraintsEncoded = encodeURIComponent(JSON.stringify(allConstraints));
    console.log('constraints:', constraintsEncoded);

    let finalURL = `${baseURL}?${allConstraints.length !== 0 ? '&constraints=' + constraintsEncoded : ''}`;

    if (!real)
        allConstraints.map(
            (item) => (finalURL = finalURL.replace(item.value, `[${item.value}]`))
        );

    return finalURL;
}

// Example usage:
const baseURL = `https://repstracker.com/${clientVersion}/api/1.1/obj/TimeEntry`;

// Add more constraints
const additionalConstraints = [
    {
        key: 'contentstatus',
        constraint_type: 'equals',
        value: 'ContentStatus',
    } /*,
    {
        key: "date",
        constraint_type: "greater_than",
        value: "2023-01-01"
    }*/,
];
/*
{
        key: "ContentStatus",
        constraint_type: "equals",
        value: "contentstatus"
    }

    */
// Generate the final URL
const params = {
    importHistory: '1733721472994x981418389062287400',
    createdBy: '1692040829807x224452886135348540',
};

const fparams = {
    importHistory: 'importHistory',
    createdBy: 'CreatedBy',
};

async function fetchFromBubbleAPI(baseURL, params, additionalConstraints = []) {
    const finalURL = buildURL(baseURL, params, additionalConstraints);
    console.log('bubble fetch:', finalURL);
    try {
        const response = await fetch(finalURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ecd4e275fea0293ecf55e676a8fec45f',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.response;
        } else {
            console.error('API Error:', response.status, response.statusText);
            return {};
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return {};
}

