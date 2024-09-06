import semver from "semver";

export function getSemverSwiftLintVersion(swiftVersion: string) {
  return semver.coerce(swiftVersion)!.toString();
}
