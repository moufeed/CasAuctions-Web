var admin_dist = "./wwwroot/admin";
var admin_src = "./src/admin";

module.exports = {
    dist: admin_dist,
    src: admin_src,
    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n',
    sassOptions: {
        outputStyle: 'compressed'
    },
    css: {
        src: [
            `${admin_src}/scss/**/*.scss`
        ],
        dist: `${admin_dist}/css/`,
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js: {
        dist: `${admin_dist}/js`,
        watch: `${admin_src}/js/**/*.js`,
        files: [
            {
                outputFileName: "lib.js",
                inputFiles: [
                    './node_modules/jquery/dist/jquery.min.js',
                    `${admin_dist}/lib/bootstrap-3.3.7/js/bootstrap.min.js`, 
                    './node_modules/bootstrap-notify/bootstrap-notify.min.js',
                    './node_modules/sweetalert2/dist/sweetalert2.all.min.js', 
                    './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                ],
            },
            {
                outputFileName: "script.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/Localization.js`,
                    `${admin_src}/js/scripts.js`,
                ],
            },
            {
                outputFileName: "product.js",
                es6: true,
                inputFiles: [

                    `${admin_src}/js/product/product.js`,
                    `${admin_src}/js/product/specifications.js`,
                    `${admin_src}/js/product/images.js`,
                    `${admin_src}/js/product/attrbuites.js`,
                    `${admin_src}/js/product/description.js`,
                    `${admin_src}/js/product/combinations.js`
                ],
            },
            {
                outputFileName: "users.js",
                inputFiles: [
                    `${admin_src}/js/users.js`
                ],
            }, {
                outputFileName: "validator.js",
                inputFiles: [
                    `${admin_src}/js/validator.js`
                ],
            }, {
                outputFileName: "menu.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/menu.js`
                ],
            }, {
                outputFileName: "sliders.js",
                es6: false,
                inputFiles: [
                    `${admin_src}/js/sliders.js`
                ],
            }, {
                outputFileName: "services.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/services.js`
                ],
            }, {
                outputFileName: "galleries.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/galleries.js`
                ],
            }, , {
                outputFileName: "lightbox.js",
                es6: false,
                inputFiles: [
                    "./node_modules/lightbox2/dist/js/lightbox.min.js"
                ],
            },
            {
                outputFileName: "seo.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/seo.js`
                ],
            },
            {
                outputFileName: "pages.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/pages.js`
                ],
            },
            {
                outputFileName: "serializejson.js",
                inputFiles: [
                    './node_modules/jquery-serializejson/jquery.serializejson.min.js',
                ],
            },
            {
                outputFileName: "sections.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/sections.js`
                ],
            },
            {
                outputFileName: "posts.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/posts.js`
                ],
            },
            {
                outputFileName: "testimonials.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/testimonials.js`
                ],
            },
            {
                outputFileName: "Localization.js",
                es6: true,
                inputFiles: [
                    `${admin_src}/js/Localization.js`
                ],
            },
            {
                outputFileName: "chart.js",
                es6: false,
                inputFiles: [
                    `./node_modules/chart.js/dist/Chart.min.js`,
                    `${admin_src}/js/Chart.js`
                ],
            },
        ]
    }
}