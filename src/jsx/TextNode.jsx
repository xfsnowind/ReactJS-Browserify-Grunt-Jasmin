/** @jsx React.DOM */
/* global require, window, document, module */
var React = require("react"),
    lib = require("../js/lib.js");

module.exports = React.createClass({
    render: function () {
        return (
            <p>{this.props.data.text}</p>
            );
    }
});
