import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as os from "./utils/os";
import { install_swiftlint } from "./install_swiftlint";

export async function run(): Promise<void> {
  try {
    os.verifyPlatform();
    const swiftlint_version: string = core.getInput("swiftlint-version");
    core.debug(`Downloading SwiftLint version ${swiftlint_version}...`);
    await install_swiftlint(swiftlint_version);
    const { stdout: swiftlint_version_out } = await exec.getExecOutput(
      "swiftlint",
      ["--version"],
    );
    const { stdout: which_swiftlint_out } = await exec.getExecOutput("which", [
      "swiftlint",
    ]);
    core.info(`SwiftLint version: ${swiftlint_version_out}`);
    core.info(`SwiftLint path: ${which_swiftlint_out}`);
    core.setOutput("swiftlint-version", swiftlint_version_out);
    core.setOutput("swiftlint-path", which_swiftlint_out);
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
