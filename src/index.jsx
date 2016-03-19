var React = require('react')
var ReactDOM = require('react-dom')

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    )
  }
})

var a = <CommentBox />

ReactDOM.render(
  a,
  document.getElementById('content'))
