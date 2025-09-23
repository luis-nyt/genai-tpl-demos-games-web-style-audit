# Background / Design Goals

## Figma file conventions for icons

First, the [TPL Figma file](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants), we have a page of icons. There's one component per size (12, 16, 20, 24), and components are grouped into variants / component sets ([Figma docs](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants)).

Thus, the `download` command uses a Figma file ID and page node ID to define the list of components to consider "icons". Once we calculate that list, we make another Figma REST API call to render this subset of components as SVGs. Finally, we download the SVGs, optimize them with `svgo` and write them to disk.

## Implicit deprecation and removals

The `download` command also supports **implicit deprecation and removal of icons**. After running the command for the first time, its default behavior is to move icons that exist on-disk, but _not_ in the Figma file and page, to a `__deprecated__` subfolder. In other words:

- If `--missingIconAction=deprecate` (default), move them to `deprecatedOutDir`
- If `--missingIconAction=remove`, delete them

## Step-by-step description of how the `download` command works

1.  Get command line options from Yargs

2.  If `--figmaToken` isn't set, use macOS Keychain or prompt to get a Figma Personal Access Token

3.  Download metadata for all "component sets" in the specified Figma file and page (e.g. the "Icons" page)
  - @see https://www.figma.com/developers/api#get-file-component-sets-endpoint

4.  Download the list of components for the Figma file
  - @see https://www.figma.com/developers/api#get-file-components-endpoint

5.  Read current icons from disk

6.  Verify that, when grouped by icon name, each group of SVGs on disk contains all the expected
    sizes (`--expectedSizes`)

7.  Filter the components down to only those contained within the specified component sets
  - This gives us every icon's size and theme-specific renditions
  - We also use current icon information to check for name conflicts and avoid accidental
    un-deprecations (i.e. `--preserveDeprecations`)

8.  Verify that, when grouped by icon name, each group icons read from Figma has the expected
    sizes (`--expectedSizes`)

9.  For icons currently on disk, but _not_ in the Figma file and page, do something with them:
  - If `--missingIconAction=deprecate`, move them to `deprecatedOutDir`
  - If `--missingIconAction=remove`, delete them

10. Finally, ask Figma to render SVGs for us
  - @see https://www.figma.com/developers/api#get-images-endpoint

11. Download those images and write them to disk

12. We're done! Print some summary info, including a list of **new** deprecations or removals
