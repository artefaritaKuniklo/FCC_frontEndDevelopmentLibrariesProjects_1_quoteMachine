import "./App.scss";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "no quote yet",
      author: "Nobody",
      bgColor: "",
      boxColor: "",
      textColor: "",
    };
    this.newQuote = this.newQuote.bind(this);
    this.fetchScheme = this.fetchScheme.bind(this);
  }
  componentDidMount() {
    this.newQuote();
  }
  newQuote() {
    this.fetchScheme();
    fetch("https://api.quotable.io/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState(
          Object.assign({}, this.state, {
            quote: data.content,
            author: "-- " + data.author,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  fetchScheme() {
    fetch("https://www.colr.org/json/scheme/random")
      .then((res) => res.json())
      .then((data) => {
        let schemes = data.schemes[0].colors;
        this.setState(
          Object.assign({}, this.state, {
            bgColor: "#" + schemes[0],
            boxColor: "#" + schemes[1],
            textColor: "white",
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    return (
      <div id="box-container" style={{ backgroundColor: this.state.bgColor }}>
        <h1 style={{ color: this.state.textColor }}>Random Quote Machine</h1>
        <Box id="quote-box" style={{ backgroundColor: this.state.boxColor }}>
          <Typography id="text" style={{ color: this.state.textColor }}>
            {this.state.quote}
          </Typography>
          <Typography id="author" style={{ color: this.state.textColor }}>
            {this.state.author}
          </Typography>
          <div id="btn-container">
            <a href="twitter.com/intent/tweet" target="_blank">
              <Button
                variant="contained"
                id="tweet-quote"
                style={{
                  color: this.state.textColor,
                  backgroundColor: this.state.bgColor,
                }}
              >
                Tweet Quote
              </Button>
            </a>
            <Button
              variant="contained"
              id="new-quote"
              style={{
                color: this.state.textColor,
                backgroundColor: this.state.bgColor,
              }}
              onClick={this.newQuote}
            >
              New Quote
            </Button>
          </div>
        </Box>
      </div>
    );
  }
}

export default App;
