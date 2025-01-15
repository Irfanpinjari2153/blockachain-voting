const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    deployer.deploy(Voting, ["NDA", "INDI", "OTHERS"]); // Replace with your candidates
};
