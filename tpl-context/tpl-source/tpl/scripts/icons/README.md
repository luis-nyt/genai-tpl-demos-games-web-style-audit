# TPL Icon Script

`pnpm -F @nyt/tpl icons` is a multi-command Yargs command line interface with
two commands: `download` and `generate`.

## `download` command

Downloads icon SVGs from a specified Figma file and page.

### Usage

```
pnpm -F @nyt/tpl icons download
```

Please add the `--help` flag to print additional information about this
command's options.

### Creating a Figma Personal Access Token

The `download` command prompts for a Figma Personal Access Token, so it can
access the [Figma REST API](https://www.figma.com/developers/api). We'll save it
to the
[macOS Keychain](https://support.apple.com/guide/keychain-access/what-is-keychain-access-kyca1083/mac),
so you only need to enter it once.

Use your Figma account to create a Personal Access Token in one of two ways:

1. Visit the
   [Figma API → Access Tokens](https://www.figma.com/developers/api#access-tokens)
   page and click "+ Get personal access token" in the sidebar.
2. [Use the Figma app's user interface, as described here](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens#Generate_a_personal_access_token)

## `generate` command

Generates React components from previously downloaded icon SVGs.

### Usage

```
pnpm -F @nyt/tpl icons generate
```

Please add the `--help` flag to print additional information about this
command's options.
