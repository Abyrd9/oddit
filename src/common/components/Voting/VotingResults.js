import React, {Component} from 'react';
import './Voting.css';

class VotingResults extends Component {
  render() {
    return (
      <div className="voting-container">
        <div className="voting-title-container">
          <p className="voting-title">{this.props.votingTitle}</p>
          <p className="vote-number-total">{this.props.voteTotal}</p>
        </div>

        <div className="voting-buttons-main-container">
          <div className="voting-content-container">
            <div className="voting-button-container">
              <button className="voting-button one">
                <p className="button-text">{this.props.buttonOneText}</p>
              </button>
              <div className="color-bar one"></div>
              <button className="voting-button two">
                <p className="button-text">{this.props.buttonTwoText}</p>
              </button>
              <div className="color-bar two"></div>
              <button className="voting-button three">
                <p className="button-text">{this.props.buttonThreeText}</p>
              </button>
              <div className="color-bar three"></div>
              <button className="voting-button four">
                <p className="button-text">{this.props.buttonFourText}</p>
              </button>
              <div className="color-bar four"></div>
              <button className="voting-button five">
                <p className="button-text">{this.props.buttonFiveText}</p>
              </button>
            </div>
            <div className="voting-button-title-container">
              <p className="voting-button-title">False</p>
              <p className="voting-button-title">Not Really</p>
              <p className="voting-button-title">Maybe</p>
              <p className="voting-button-title">Kind Of</p>
              <p className="voting-button-title">True</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default VotingResults;
