const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    deployer.deploy(Voting, ["NDA", "INDI", "OTHERS","NOTA"]); // Replace with your candidates
};
