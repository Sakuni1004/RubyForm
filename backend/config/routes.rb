Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'submit_form', to: 'forms#submit_form'
    end
  end
end
