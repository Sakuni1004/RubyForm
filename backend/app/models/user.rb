class User < ApplicationRecord
  has_one_attached :file
  validates :first_name, :last_name, :email, :dob, presence: true  # Ensure these fields are not empty
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }  # Ensure the email is in the correct format

  validates :file, content_type: { in: ['application/pdf', 'image/png'], message: 'must be a PDF or PNG' }


  def file_url
    file.attached? ? Rails.application.routes.url_helpers.rails_blob_url(file, only_path: true) : nil
  end
end
  
