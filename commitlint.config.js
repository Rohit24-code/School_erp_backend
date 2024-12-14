module.exports = {
    extends: ['@commitlint/cli', '@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2, // Level: error (1 = warning, 2 = error)
            'always', // Condition: enforce rule always
            [
                'feat', // A new feature
                'fix', // A bug fix
                'docs', // Documentation only changes
                'style', // Changes that do not affect the meaning of the code (white-space, formatting, etc.)
                'refactor', // A code change that neither fixes a bug nor adds a feature
                'perf', // A code change that improves performance
                'test', // Adding or correcting tests
                'chore', // Changes to the build process or auxiliary tools
                'build', // Changes that affect the build system or dependencies
                'ci', // Changes to CI configuration files and scripts
                'revert', // Reverts a previous commit
                'wip', // Work in progress
                'deps' // Dependency updates
            ]
        ],
        'subject-case': [
            2,
            'always',
            ['sentence-case'] // Enforces case format for the subject
        ]
    }
}
