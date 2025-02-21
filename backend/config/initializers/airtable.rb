require 'airtable'

Airtable::Client.new(api_key: ENV['AIRTABLE_API_KEY'])