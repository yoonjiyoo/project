const CarSharing = artifacts.require("CarSharing");

module.exports = function (deployer) {
  deployer.deploy(CarSharing);
};