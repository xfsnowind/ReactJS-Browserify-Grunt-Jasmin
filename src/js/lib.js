/* global module*/
module.exports = {
    clickOnButton: function (state, event) {
        state.text = "button text is: " + event.currentTarget.value;
        return state;
    }
};
