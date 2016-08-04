class Api::TweetsController < ApplicationController
  def index
    @tweets = Tweet.newer
  end

  def create
    @tweet = Tweet.create(tweet_params)
  end

  def update
    @tweet = Tweet.find(params[:id])
    @tweet.update(tweet_params)
  end

  def destroy
    @tweet = Tweet.find(params[:id])
    @tweet.destroy
  end

  private

    def tweet_params
      params.permit(:image, :text)
    end

end
