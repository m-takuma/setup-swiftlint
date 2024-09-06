import * as path from "path";
import * as core from "@actions/core";
import * as toolCache from "@actions/tool-cache";
import * as os from "./utils/os";
import { getSemverSwiftLintVersion } from "./utils/version";

export async function install_swiftlint(version: string) {
  core.info(`Installing SwiftLint version ${version}...`);
  let toolPath: string = toolCache.find(
    "swiftlint",
    getSemverSwiftLintVersion(version),
  );
  if (toolPath) {
    core.debug(`Found SwiftLint in cache`);
    core.addPath(toolPath);
    return;
  }
  if (os.IS_MAC) {
    core.debug(`Download SwiftLint version ${version} on macOS...`);
    const downloadpath = await download_swiftlint_on_macos(version);
    core.debug(`Downloaded SwiftLint to ${downloadpath}`);
    core.debug(`Unpack SwiftLint...`);
    const unpack_path = await toolCache.extractXar(downloadpath);
    core.debug(`Unpacked SwiftLint to ${unpack_path}`);
    core.debug(`Extract SwiftLint...`);
    const extracted_path = await toolCache.extractTar(
      path.join(unpack_path, "Payload"),
    );
    core.debug(`Extracted SwiftLint to ${extracted_path}`);
    core.debug(`Cache SwiftLint...`);
    toolPath = await toolCache.cacheDir(
      extracted_path,
      "swiftlint",
      getSemverSwiftLintVersion(version),
    );
    core.debug(`Cached SwiftLint to ${toolPath}`);
  } else if (os.IS_LINUX) {
    core.debug(`Download SwiftLint version ${version} on Linux...`);
    const downloadPath = await download_swiftlint_on_linux(version);
    core.debug(`Downloaded SwiftLint to ${downloadPath}`);
    core.debug(`Extract SwiftLint...`);
    const extracted_path = await toolCache.extractZip(downloadPath);
    core.debug(`Extracted SwiftLint to ${extracted_path}`);
    core.debug(`Cache SwiftLint...`);
    toolPath = await toolCache.cacheDir(
      extracted_path,
      "swiftlint",
      getSemverSwiftLintVersion(version),
    );
    core.debug(`Cached SwiftLint to ${toolPath}`);
  } else {
    core.error(`Unsupported platform: ${process.platform} ${process.arch}`);
    throw new Error(
      `Unsupported platform: ${process.platform} ${process.arch}`,
    );
  }
  core.debug(`Add SwiftLint to PATH...`);
  core.addPath(toolPath);
  core.debug(`SwiftLint version ${version} setup successfully!`);
}

async function download_swiftlint_on_macos(version: string): Promise<string> {
  core.debug(`Downloading SwiftLint version ${version} on macOS...`);
  const url = `https://github.com/realm/SwiftLint/releases/download/${version}/SwiftLint.pkg`;
  core.debug(`Download SwiftLint from ${url}`);
  try {
    const downloadPath = await toolCache.downloadTool(url);
    return downloadPath;
  } catch (error) {
    core.error(`Not Found SwiftLint version ${version}`);
    throw new Error(`Failed to download SwiftLint: ${error}`);
  }
}

async function download_swiftlint_on_linux(version: string): Promise<string> {
  console.log(`Downloading SwiftLint version ${version} on Linux...`);
  const url = `https://github.com/realm/SwiftLint/releases/download/${version}/swiftlint_linux.zip`;
  try {
    const downloadPath = await toolCache.downloadTool(url);
    return downloadPath;
  } catch (error) {
    core.error(`Not Found SwiftLint version ${version}`);
    throw new Error(`Failed to download SwiftLint: ${error}`);
  }
}
