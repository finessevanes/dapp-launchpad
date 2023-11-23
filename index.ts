#!/usr/bin/env node
import packageJson from "./package.json";
import { program } from "commander";
import { dev } from "./commands/dev";
import { init } from "./commands/init";
import { deploy } from "./commands/deploy";

/// Metadata
program
  .name('create-polygon-dapp')
  .description('CLI tool to initialise a fully-integrated Polygon DApp, create a development environment, and deploy everything to production.')
  .version(packageJson.version);

//// Add commands

// Init
program
    .command("init")
    .description("Initialises a Polygon DApp project in a new directory")
    .argument("[project-name]", "Name of the project; optional")
    .action(init);

// Dev
program
    .command("dev")
    .description("Starts a local dev environment - a local blockchain (hardhat) and a local FE (Next.js) server")
    .option("-n, --fork-network-name [NAME]", "Name of the network to fork; optional. By default, it starts a new chain from genesis block.")
    .option("-b, --fork-block-num [number]", "Block number to fork at. By default, it's the latest block.")
    .option("-r, --reset-on-change", "Resets the entire local blockchain when any code is changed; for forked mode, it resets back to forked block number; NOT DEFAULT")
    .option("-e, --enable-explorer", "Sets up a chain explorer for the local test blockchain started; NOT DEFAULT; sign up at \"https://app.tryethernal.com/\"")
    .option("--ethernal-login-email [EMAIL]", "Ethernal login email; needed only if --explorer is enabled. This overrides env variable ETHERNAL_EMAIL if present.")
    .option("--ethernal-login-password [PASSWORD]", "Ethernal login password; needed only if --explorer is enabled. This overrides env variable ETHERNAL_PASSWORD if present.")
    .option("--ethernal-workspace [WORKSPACE]", "Ethernal workspace name; needed only if --explorer is enabled. This overrides env variable ETHERNAL_WORKSPACE if present.")
    .action(dev);

// Deploy
  program
    .command("deploy")
    .description("Deploys the smart contracts and frontend app to production")
    .option("-n, --network-name <NAME>", "Name of the network to deploy smart contracts to.")
    .option("--only-smart-contracts", "Deploys only smart contracts and updates `smart-contracts-production.json`")
    .option("--only-frontend", "Deploys only smart contracts and updates `smart-contracts-production.json`")
    .action(deploy);

// Parse program
program.parse();