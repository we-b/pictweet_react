Rails.application.routes.draw do
  match '*any' => 'application#options', :via => [:options]
  namespace 'api', format: 'json' do
    resources :tweets
  end

end
