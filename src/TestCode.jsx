const response = await fetch(`http://localhost:8080/api/v1/tickets/user/${userId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

const text = await response.text(); // Get the raw response text
console.log(text); // Log it to see the actual response
