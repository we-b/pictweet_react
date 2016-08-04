json.tweets do
  json.array! @tweets, :id, :text, :image
end
