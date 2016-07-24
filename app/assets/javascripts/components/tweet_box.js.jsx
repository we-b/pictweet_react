var TweetBox = React.createClass({
  loadTweetsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
    }).done(function(data){
      this.setState({ tweets: data });
    }.bind(this)).fail(function(data){
      console.log(data);
    }.bind(this));
  },
  handleTweetSubmit: function(tweet){
    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      data: tweet
    }).done(function(data){
      this.setState({ tweets: data });
    }.bind(this)).fail(function(data){
      console.log(data);
    }.bind(this));
  },
  handleTweetDelete: function(id){
    $.ajax({
      url: this.props.url + "/" + id,
      type: 'DELETE',
      dataType: 'json',
      data: id
    }).done(function(data){
      console.log(data);
      this.setState({ tweets: data });
    }.bind(this)).fail(function(data){
      console.log(data);
    }.bind(this));
  },
  getInitialState: function(){
    return { tweets: [] }
  },
  componentDidMount: function(){
    this.loadTweetsFromServer();
  },
  render: function() {
    return(
      <div className="contents row">
        <TweetForm onTweetSubmit={this.handleTweetSubmit}></TweetForm>
        <TweetList tweets={this.state.tweets} handleDelete={this.handleTweetDelete}></TweetList>
      </div>
    );
  }
});

var TweetForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var image = this.refs.image.value.trim();
    var text = this.refs.text.value.trim();
    if (!image || !text) {
      return;
    }
    this.props.onTweetSubmit({ image: image, text: text });
    this.refs.image.value = "";
    this.refs.text.value = "";

  },
  render: function(){
    return(
      <div className="tweet-form" id="post">
        <form onSubmit={this.handleSubmit}>
          <h3>投稿する</h3>
          <input type="text" placeholder="image url" ref="image"></input>
          <textarea cols="10" placeholder="text" ref="text"></textarea>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
});

var TweetList = React.createClass({
  handleTweetDelete: function(id){
    this.props.handleDelete(id);
  },
  render: function(){
    var tweetNodes = this.props.tweets.map(function(tweet, index){
      return(
        <Tweet image={tweet.image} text={tweet.text} onTweetDelete={this.handleTweetDelete} id={tweet.id} key={index}></Tweet>
      );
    }.bind(this));
    return(
      <div className="tweet-list">
        {tweetNodes}
      </div>
    );
  }
});

var Tweet = React.createClass({
  handleDelete: function(e){
    e.preventDefault();
    var id = this.props.id;
    this.props.onTweetDelete(id);
  },
  render: function(){
    var imgStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    };
    return(
      <div className="content_post" style={imgStyle} >
        <div className="more">
          <span>
            <img src="/assets/arrow_top.png"></img>
          </span>
          <ul className="more_list">
            <li>
              <a onClick={this.handleDelete}>削除</a>
            </li>
          </ul>
        </div>
        <p>
          {this.props.text}
        </p>
        <span className="name">

        </span>
      </div>
    );
  }
});
