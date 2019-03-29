var local_dist = "./Localization";
var local_src = "./src/Localization";



module.exports = {
    dist : local_dist,
    src : local_src,
    header:`msgid ""
msgstr ""
"Project-Id-Version: <%= pkg.name %> <%= pkg.version %>"
"Last-Translator: tamtech solution <support@tamtech.solution>"
"MIME-Version: 1.0"
"Content-Type: text/plain; charset=UTF-8"
"Content-Transfer-Encoding: 8bit"
"Plural-Forms: nplurals=2; plural=(n != 1);"
"POT-Creation-Date:"
"PO-Revision-Date:"
"Language-Team:"\n`,
    files :[
        {
        "outputFileName" : "en.po",
        "inputFiles" :[
            `${local_src}/en/admin.po`,
            `${local_src}/en/portal.po`,
            `${local_src}/en/custom.po`
        ]
    },{
        "outputFileName" : "ar.po",
        "inputFiles" :[
            `${local_src}/ar/admin.po`,
            `${local_src}/ar/portal.po`,
            `${local_src}/ar/custom.po`
        ]
    },{
        "outputFileName" : "tr.po",
        "inputFiles" :[
            `${local_src}/tr/admin.po`,
            `${local_src}/tr/portal.po`,
            `${local_src}/tr/custom.po`
        ]
    } 
]
}