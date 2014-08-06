/** @jsx React.DOM */
/* global require, window, document, module */
var React = require("react"),
    Root = require("./Root.jsx"),
    lib = require("../js/lib"),

    appState = {
        button: {
            buttonText: "button"
        },

        text: {
            text:"nothing"
        }
    },

    external = {
        actionForClickButton: function (event) {
            appState = lib.clickOnButton(appState, event);
        }
    };

if (document.getElementById("container")) {
    React.renderComponent(
        <Root data={appState} />,
        document.getElementById("container")
    );
}

module.exports = external;
