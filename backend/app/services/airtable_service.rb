

require 'airtable'
class AirtableService
  AIRTABLE_API_KEY = ENV['AIRTABLE_API_KEY']
  AIRTABLE_BASE_ID = ENV['AIRTABLE_BASE_ID']
  TABLE_NAME = ENV['TABLE_NAME']
  
    def self.push_to_airtable(user)
      uri = URI("https://api.airtable.com/v0/#{AIRTABLE_BASE_ID}/#{TABLE_NAME}")
  
      headers = {
        'Authorization' => "Bearer #{AIRTABLE_API_KEY}",
        'Content-Type' => 'application/json'
      }
  
      data = {
        "records": [
          {
            "fields": {
              "first_name": user.first_name,
              "last_name": user.last_name,
              "email": user.email,
              "dob": user.dob.to_date.iso8601,
              "file":user.file_url
            }
          }
        ]
      }
  
      response = Net::HTTP.post(uri, data.to_json, headers)

      puts "Airtable Response: #{response.body}" # Debug output
        # Return the parsed response to the controller
        if response.is_a?(Net::HTTPSuccess)
          JSON.parse(response.body) # Return parsed response
        else
          raise "Airtable Error: #{response.body}"
        end
      end
    end

  

  
