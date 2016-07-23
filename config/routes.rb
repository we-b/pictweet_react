Rails.application.routes.draw do
  root 'top#index'

  namespace 'api', format: 'json' do
    resources :tweets
  end

end
