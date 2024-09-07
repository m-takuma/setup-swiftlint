# setup-swiftLint

## Basic usage

```yml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup SwiftLint
    uses: m-takuma/setup-swiftlint@1
```

## Usage (Specific Version)

```yml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup SwiftLint
    uses: m-takuma/setup-swiftlint@1
    with:
      swiftlint-version: "0.56.2"
```

## Usage (with setup-swift)
```yml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup Swift
    uses: m-takuma/setup-swift@1
  - name: Setup SwiftLint
    uses: m-takuma/setup-swiftlint@1
```
