// apps/mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Workspace root — two levels up from apps/mobile
const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in the monorepo (not just apps/mobile)
config.watchFolders = [workspaceRoot];

// 2. Resolve modules from both the project root AND workspace root
//    This prevents "module not found" for shared deps
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. pnpm uses symlinks; tell Metro to follow them
config.resolver.unstable_enableSymlinks = true;

// 4. Required for Expo Router's file-based routing
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'mjs', // needed for some Firebase 10 internals
];

module.exports = config;
