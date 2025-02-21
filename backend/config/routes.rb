Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'submit_form', to: 'forms#submit_form'
      get 'submit_form', to: 'forms#test'
    end
  end
end
