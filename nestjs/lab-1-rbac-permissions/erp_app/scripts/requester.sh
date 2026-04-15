#!/bin/bash

clear 

echo "Starting the requests to the erp app..."


echo "Getting the JWT token..."
echo ""
JWT_TOKEN=$(
    curl -sS -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" | jq -r '.access_token'
)

echo "Access Token got it: $JWT_TOKEN"
echo ""
echo ""
echo ""

sleep 2

echo "Get List of Invoices..."
echo ""

INVOICE_RESPONSE=$(
    curl -sS -X GET http://localhost:3000/invoices \
    -H "Authorization: Bearer $JWT_TOKEN"
)
echo "List of Invoices got it:"
echo $INVOICE_RESPONSE
sleep 2
echo ""

echo "Creating a new Invoice..."
echo ""

NEW_INVOICE_RESPONSE=$(
    curl -sS -X POST http://localhost:3000/invoices \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "customer":"John Doe",
        "amount":1000
    }'
)

echo "New Invoice created:"
echo $NEW_INVOICE_RESPONSE
sleep 2
echo ""
