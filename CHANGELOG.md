## [8.1.1](https://github.com/simonsmith/cypress-image-snapshot/compare/8.1.0...8.1.1) (2023-08-17)


### Bug Fixes

* remove attempt suffix from snapshot name ([eb544a1](https://github.com/simonsmith/cypress-image-snapshot/commit/eb544a144cf4fc476ed38c05f44654dea48b5427)), closes [#19](https://github.com/simonsmith/cypress-image-snapshot/issues/19)

# [8.1.0](https://github.com/simonsmith/cypress-image-snapshot/compare/8.0.2...8.1.0) (2023-08-15)


### Features

* allow subdirectories to be created in snapshots dir ([2218586](https://github.com/simonsmith/cypress-image-snapshot/commit/22185867da1d114a34e132e8f2d97ba4386752bc)), closes [#17](https://github.com/simonsmith/cypress-image-snapshot/issues/17)

## [8.0.2](https://github.com/simonsmith/cypress-image-snapshot/compare/8.0.1...8.0.2) (2023-07-31)


### Bug Fixes

* sanitise snapshot filenames ([ef49519](https://github.com/simonsmith/cypress-image-snapshot/commit/ef49519795daf5183f4fac6f3136e194f20f39f4)), closes [#15](https://github.com/simonsmith/cypress-image-snapshot/issues/15)

## [8.0.1](https://github.com/simonsmith/cypress-image-snapshot/compare/8.0.0...8.0.1) (2023-07-26)


### Bug Fixes

* rename e2eSpecFolder -> e2eSpecDir ([106af6c](https://github.com/simonsmith/cypress-image-snapshot/commit/106af6c43b879954847f1ae08088d0063b1c1eba))

# [8.0.0](https://github.com/simonsmith/cypress-image-snapshot/compare/7.0.0...8.0.0) (2023-07-25)


### Bug Fixes

* requireSnapshots should work with retries ([ebfc8be](https://github.com/simonsmith/cypress-image-snapshot/commit/ebfc8bebc806d3bf18a044cadecb47c75b1e6325))


### Features

* normalise directory output for snapshots ([1939e25](https://github.com/simonsmith/cypress-image-snapshot/commit/1939e25461e5811f2e683e51415653707fd24f03))


### BREAKING CHANGES

* This uses the `Cypress.spec.relative` option to
generate the snapshot directory and changes the folder structure.

It should now match the directory structure found in the `cypress/e2e/`
directory

Updating to this change may mean committing new snapshot paths and
removing old ones in your project (especially with component testing)

See the section "Snapshot paths" in the README for more information

# [7.0.0](https://github.com/simonsmith/cypress-image-snapshot/compare/6.1.1...7.0.0) (2023-05-25)


### Bug Fixes

* ensure files are packaged in root ([c0816dc](https://github.com/simonsmith/cypress-image-snapshot/commit/c0816dc9b3c809fc31fd9b147a3499a3e4e60f2d))
* move @types/jest-image-snapshot ([5e65567](https://github.com/simonsmith/cypress-image-snapshot/commit/5e65567d2a383f65860976213ebab9a86da3ff72))
* release from root directory ([e0bab6a](https://github.com/simonsmith/cypress-image-snapshot/commit/e0bab6ac3a28d70697cfc2941559b188e6a21cad))


### Features

* add recording of snapshot result ([488ae4b](https://github.com/simonsmith/cypress-image-snapshot/commit/488ae4be65267bb3547064becb864664a24f7846))
* add semantic release ([b1b063b](https://github.com/simonsmith/cypress-image-snapshot/commit/b1b063b3c31b33b25e0fb37e87048533c82a0139))
* allow default options to be passed into addMatchImageSnapshotCommand ([405afcb](https://github.com/simonsmith/cypress-image-snapshot/commit/405afcbd202adcb2665a5239120fb7d0fa02022b))


### BREAKING CHANGES

* removed fork of original package

This is a rewrite of the original library, now with full support for
TypeScript and improved testing.

Notes:

* The API for `matchImageSnapshot` remains the same, as well as all the
  import paths
* The behavior of the plugin is exactly the same, as are the default
  options

TypeScript types are exported under `@simonsmith/cypress-image-snapshot/types`.
These should be used instead of the package on DefinitelyTyped

Removed:
* The `reporter` is not supported in this version.

# [7.0.0-beta.3](https://github.com/simonsmith/cypress-image-snapshot/compare/7.0.0-beta.2...7.0.0-beta.3) (2023-05-24)


### Bug Fixes

* ensure files are packaged in root ([db30cbb](https://github.com/simonsmith/cypress-image-snapshot/commit/db30cbb901b52a88f7959fc1565260fadf3f058e))
* move @types/jest-image-snapshot ([f6404d4](https://github.com/simonsmith/cypress-image-snapshot/commit/f6404d444875efd4e42123dd80e3784c67ec86b1))

# [7.0.0-beta.2](https://github.com/simonsmith/cypress-image-snapshot/compare/7.0.0-beta.1...7.0.0-beta.2) (2023-05-24)


### Bug Fixes

* release from root directory ([0ec36c1](https://github.com/simonsmith/cypress-image-snapshot/commit/0ec36c13bd0ff478ee013f75fc94975a255c33dd))

# [7.0.0-beta.1](https://github.com/simonsmith/cypress-image-snapshot/compare/6.1.1...7.0.0-beta.1) (2023-05-24)


### Features

* add recording of snapshot result ([488ae4b](https://github.com/simonsmith/cypress-image-snapshot/commit/488ae4be65267bb3547064becb864664a24f7846))
* add semantic release ([4db3b89](https://github.com/simonsmith/cypress-image-snapshot/commit/4db3b89690c3e726689ee98f44fa528fcba233e2))
* allow default options to be passed into addMatchImageSnapshotCommand ([405afcb](https://github.com/simonsmith/cypress-image-snapshot/commit/405afcbd202adcb2665a5239120fb7d0fa02022b))


### BREAKING CHANGES

* removed fork of original package

This is a rewrite of the original library, now with full support for
TypeScript and improved tests

Released as a major but everything should be backwards compatible
