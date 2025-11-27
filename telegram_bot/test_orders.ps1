# test_orders.ps1
# Simple auto tests for /new_order webhook

# TODO: change this to your current ngrok URL
$baseUrl = "https://davin-autogenous-yasmin.ngrok-free.dev/new_order"

$orders = @(
    # 1. Full order: all fields
    @{
        name    = "Alexey Ivanov"
        phone   = "+79991234567"
        email   = "alex@test.com"
        budget  = "15000"
        comment = "Full order test"
    },
    # 2. Without email
    @{
        name    = "Maria"
        phone   = "+79261234567"
        budget  = "25000"
        comment = "No email test"
    },
    # 3. Without budget
    @{
        name    = "Egor"
        phone   = "+79005553535"
        email   = "egor@test.com"
        comment = "No budget test"
    },
    # 4. Only required fields
    @{
        name  = "Irina"
        phone = "+79876543210"
    }
)

$index = 1

foreach ($order in $orders) {
    Write-Host "=== Sending test order #$index ===" -ForegroundColor Cyan

    $json = $order | ConvertTo-Json -Depth 5

    Write-Host "Request body:"
    Write-Host $json

    try {
        $response = Invoke-RestMethod `
            -Uri $baseUrl `
            -Method POST `
            -ContentType "application/json" `
            -Body $json

        Write-Host "Response:" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 5 | Write-Host
    }
    catch {
        Write-Host "Error while sending order #${index}:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }

    Write-Host ""
    $index++
}
