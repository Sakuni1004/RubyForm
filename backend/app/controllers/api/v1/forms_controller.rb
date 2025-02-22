

class Api::V1::FormsController < ApplicationController
  include Rails.application.routes.url_helpers

  def submit_form
    user_params = params.require(:user).permit(:first_name, :last_name, :email, :dob, :file)

    @user = User.new(user_params.except(:file))

    if @user.save
      if params[:user][:file].present?
        @user.file.attach(params[:user][:file])
      end

      file_url = @user.file.attached? ? url_for(@user.file) : nil

      airtable_response = AirtableService.push_to_airtable(@user)
      puts "Airtable Response1: #{airtable_response.inspect}"

      # Safely check if airtable_response is nil or empty before accessing its contents
      if airtable_response.present? && airtable_response["records"].present? && airtable_response["records"].first.present?
        airtable_id = airtable_response["records"].first["id"]
        puts "Airtable ID: #{airtable_id}"

        if airtable_id.present?
          render json: { message: 'Form submitted successfully!', user: @user, file_url: file_url, airtable_id: airtable_id }, status: :created
        else
          render json: { message: 'Form submitted, but failed to push data to Airtable (missing Airtable ID).', errors: airtable_response }, status: :unprocessable_entity
        end
      else
        # Handle case where response is nil or incomplete
        render json: { message: 'Form submitted, but failed to push data to Airtable (unexpected response structure).', errors: airtable_response }, status: :unprocessable_entity
      end
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def test
    render json: { message: "GET request received" }
  end
end

