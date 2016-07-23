class Api::TweetsController < ApplicationController
  def index
    @tweets = Tweet.newer
  end

  def create
    @tweet = Tweet.create(tweet_params)
  end

  private

    def tweet_params
      params.permit("image", "text")
    end

end