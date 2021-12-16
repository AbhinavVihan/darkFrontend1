require 'sinatra'
require 'stripe'
# This is a sample test API key.
Stripe.api_key = 'sk_test_tR3PYbcVNZZ796tH88S4VQ2u'

set :static, true
set :port, 4242

# Securely calculate the order amount
def calculate_order_amount(_items)
  # Replace this constant with a calculation of the order's amount
  # Calculate the order total on the server to prevent
  # people from directly manipulating the amount on the client
  1400
end

# An endpoint to start the payment process
post '/create-payment-intent' do
  content_type 'application/json'
  data = JSON.parse(request.body.read)

  # Create a PaymentIntent with amount and currency
  payment_intent = Stripe::PaymentIntent.create(
    amount: calculate_order_amount(data['items']),
    currency: 'eur',
    payment_method_types: [
      'giropay',
      'eps',
      'p24',
      'sofort',
      'sepa_debit',
      'card',
      'bancontact',
      'ideal',
    ],
  )

  {
    clientSecret: payment_intent['client_secret']
  }.to_json
end