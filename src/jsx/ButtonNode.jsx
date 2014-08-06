/** @jsx React.DOM */
/* global require, window, document, module */
var React = require("react"),
    app= require("./app.jsx");

module.exports = React.createClass({
    render: function () {
        return (
            <input value={this.props.data.buttonText} className="button" type="button" onClick={app.actionForClickButton} />
            );
    }
});
