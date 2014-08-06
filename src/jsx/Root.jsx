/** @jsx React.DOM */
/* global require, window, document, module */
var React = require("react"),
    TextNode = require("./TextNode.jsx"),
    ButtonNode = require("./ButtonNode.jsx");

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <TextNode data={this.props.data.text}/>
                <ButtonNode data={this.props.data.button}/>
            </div>
            );
    }
});


