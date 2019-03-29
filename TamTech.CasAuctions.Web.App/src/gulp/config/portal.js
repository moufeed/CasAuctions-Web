var portal_dist = "./wwwroot/portal";
var portal_src = "./src/portal";



module.exports = {
    dist : portal_dist,
    src : portal_src,
    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n',
    sassOptions: {
        outputStyle: 'compressed'
    },
    fonts: [{
        output: `${portal_dist}/fonts/fa/`,
        input: [
            './node_modules/font-awesome/fonts/*',
        ]
    }, {
        output: `${portal_dist}/fonts/`,
        input: [`${portal_src}/fonts/**/*`]
    }],
    css: {
        src: [
            `${portal_src}/scss/**/*.scss`
        ],
        dist: `${portal_dist}/css/`,
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js: {
        dist: `${portal_dist}/js`,
        watch: `${portal_src}/js/**/*.js`,
        files: [{
                outputFileName: "bundle.js",
                es6: false,
                inputFiles: [
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                    './node_modules/jquery-parallax.js/parallax.min.js',
                    './node_modules/waypoints/lib/jquery.waypoints.min.js',
                    './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
                ],
            },
            {
                outputFileName: "script.js",
                es6: true,
                inputFiles: [
                    `${portal_src}/js/scripts.js`
                ],
            },
            {
                outputFileName: "validation.js",
                es6: false,
                inputFiles: [
                    './node_modules/jquery-validation/dist/jquery.validate.min.js',
                    './node_modules/jquery-validation/dist/additional-methods.js',
                    `${portal_src}/js/validate.js`
                ]
            },
            {
                outputFileName: "owl.carousel.js",
                es6: false,
                inputFiles: [
                    './node_modules/owl.carousel/dist/owl.carousel.min.js',
                ]
            },
            {
                outputFileName: "counterup.js",
                es6: false,
                inputFiles: [
                    `${portal_src}/js/jquery.counterup.js`
                ],
            },
            {
                outputFileName: "slider.js",
                es6: false,
                inputFiles: [
                    `${portal_src}/js/jquery.themepunch.tools.min.js`,
                    `${portal_src}/js/jquery.themepunch.revolution.min.js`,
                    `${portal_src}/js/slider.js`
                ]
            },
            {
                outputFileName: "magnific-popup.js",
                es6: false,
                inputFiles: [
                    './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
                ],
            },
        ]
    },
}