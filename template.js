/**
 * grunt-init-jekyll v0.1.0, 2013-04-03
 *
 * Hosted on http://github.com/amsul/grunt-init-jekyll
 * Copyright (c) 2013 Amsul - http://amsul.ca
 * Licensed under the MIT license.
 */

/*jshint
    unused: true,
    debug: true,
    devel: true,
    browser: true,
    asi: true
 */


// Basic template description.
exports.description = 'Create a basic jekyll setup.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'You are about to create a new jekyll site. Brace yourself for _awesomeness_.';

// Template-specific notes to be displayed after question prompts.
exports.after = '\n\n\n\n\n\n\n\n\n\nEpic.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ) {

    init.process(

        { type: 'jekyll' },

        // Prompt for these values.
        [
            init.prompt( 'name' ),
            init.prompt( 'version' ),
            init.prompt( 'title' ),
            init.prompt( 'description', 'Another epic jekyll site.' ),
            init.prompt( 'homepage' ),
            init.prompt( 'repository' ),
            init.prompt( 'licenses', 'MIT' ),
            init.prompt( 'author_name' ),
            init.prompt( 'author_email' ),
            init.prompt( 'author_url' ),
            init.prompt( 'jquery_version', '' )
        ],

        function( error, props ) {

            // Grab all the files to copy and process.
            var pkgFiles = init.filesToCopy( props )

            // Add the license files.
            init.addLicenseFiles( pkgFiles, props.licenses )

            // Other data to hold in the `package.json` file.
            props.keywords = []
            props.dependencies = props.jquery_version ? { jquery: props.jquery_version } : {}
            props.devDependencies = {
                'grunt': '~0.4.0',
                'grunt-contrib-concat': '~0.1.1',
                'grunt-contrib-watch': '~0.1.4',
                'grunt-contrib-jshint': '~0.3.0'
            }

            // Do the file copying and processing.
            init.copyAndProcess( pkgFiles, props, { noProcess: 'index.html' } )

            // Create the `package.json` file.
            init.writePackageJSON( 'package.json', props )

            // Create the `jquery.json` file.
            if ( props.jquery_version ) {
                init.writePackageJSON( props.name + '.jquery.json', props )
            }

            // Aaand we're done!
            done()
        }

    ) //init.process

} //exports.template

