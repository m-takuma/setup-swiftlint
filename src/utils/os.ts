import * as core from "@actions/core";

export const IS_LINUX = process.platform === "linux";
export const IS_MAC = process.platform === "darwin";
export const IS_WINDOWS = process.platform === "win32";
export const IS_X64 = process.arch === "x64";
export const IS_AARCH64 = process.arch === "arm64";

export function verifyPlatform(): void {
  if (IS_MAC) {
    core.debug("verifying platform: OK (macOS)");
    return;
  }
  if (IS_LINUX && IS_X64) {
    core.debug("verifying platform: OK (Linux x64)");
    return;
  }
  core.error(`Unsupported platform: ${process.platform} ${process.arch}`);
  throw new Error(`Unsupported platform: ${process.platform} ${process.arch}`);
}
