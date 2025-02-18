class Api::V1::FormsController < ApplicationController
    def submit_form
      # Retrieve form data
      user = User.new(user_params)
  
      # Handle file upload
      if params[:file].present?
        user.file.attach(params[:file])
      end
  
      # Save user data to the database
      if user.save
        render json: { message: 'Form submitted successfully!' }, status: :ok
      else
        render json: { message: 'Failed to submit form', errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    # Strong parameters for user data
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :dob)
    end
  end
  