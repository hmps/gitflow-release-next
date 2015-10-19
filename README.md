Git flow release creator
===

A small and simple Node CLI tool to create a new release branch, following the [git-flow workflow](http://nvie.com/posts/a-successful-git-branching-model/).

## Installation

Clone this repo and run `npm link` in the root folder.

This will create two CLI commands:

- `create-release`
- `cr`

They both do the same thing, `cr` is just a shorter version.

## Usage

`$ create-release [major|minor|patch]`

If no release type is specified, a patch bump is performed.

Git flow release creator assumes that you can run `git-flow` commands from your CLI.

## License
MIT
