const apis = require('express').Router()

// import library mysql2
const mysql = require('mysql2')
// connection with database
const query = mysql.createConnection({
    host: 'db4free.net',
    database: 'al_sahaba_db',
    user: 'fatimaelsaadny',
    password: '123456789',
    connectTimeout: 60000
});
// check if has connection or not 
query.connect(function (error) {
    if (error) {
        console.log(error);
        console.log('Error');
        return;
    }
    else {
        console.log('connected');
    }
});

/////////////////// bookslibrary table ///////////
/*
Api for get all book that related to person 
EndPoint: /allPersonBooks
method: GET
{
    BookId: 49,
    BookName: "أسد الغابة في معرفة الصحابة ط ابن حزم",
    author: "علي بن محمد الجزري ابن الأثير عز الدين أبو الحسن",
    coverPic: "https://www.nourbook.com/publice/covers_cache_webp/1/8/c/1/49cc86f4248c1cbc59fc4fd7f97cc937.jpg.webp",
    bookDiscription: "كتاب جامع في تراجم الصحابة، حاول استقصاء جميع الصحابة الذين وصلتنا أخبارهم أو اشارات عنهم ، استوعب أبرز كتب "الصحابة" التي ألّفت قبله و زاد عليها، وفاته منهم جملة، و هو يعد من أبرز كتب تراجم الصحابة .",
    bookLink: "link book",
    bookCategory: "1"
}
*/
apis.get('/allPersonBooks', (req, res) => {
    query.query(`SELECT * FROM bookslibrary WHERE bookCategory = "1";`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allPersonBooks api")
            } else {
                res.json(result)
            }
        })
});

/*
Api for get book by id
EndPoint: /bookById/:id
method: GET
*/
apis.get('/bookById/:id', (req, res) => {
    let id = req.params.id
    query.query(`SELECT * FROM bookslibrary WHERE BookId= ${id};`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in bookById api")
            } else {
                res.json(result)
            }
        })
});

/*
Api for get all book that related to sefat
EndPoint: /allsefatBooks
method: GET
{
    BookId: 43,
    BookName: "خلق المسلم لمحمد الغزالي",
    author: "محمد الغزالي",
    coverPic: "https://www.nourbook.com/publice/covers_cache_webp/1/8/6/5/5a7e2e2a758655b13d63f137573ee9b7.png.webp",
    bookDiscription: "ما يميّز هذا الكتاب أنه عميــق الأثر بالنسبة لعدد صفحاته، فهو خفيف على النفس في الوقت عينه. ،. يشد فيه( ما يتضح من اسمه) أن منظوره "إسلامي" وأنه مستوحى من الآيات الكريمة والأحاديث الشريفة.. فهو لا يهذب الأخلاق فقط بل تفهم منه معاني بعض الآيات والأحاديث التي كانت تتخلل الكلام بخفّة، ولا يغيب عن البال أسلوب الغزالي الأدبي الجميل. حرص مؤلفه أن يلفت أنظار المنصفين إلى أساليب التربية والأخلاق الرائعة التى جاء بها صاحب الرسالة الخاتمة ونقل بها العالم من الغى إلى الرشاد ويُظهر المؤلف في هذا الكتاب أن فى الإسلام كنوزا حافلة بالنفائس .",
    bookLink: "link book",
    bookCategory: "0"
}
*/

apis.get('/allsefatBooks', (req, res) => {
    query.query(`SELECT * FROM bookslibrary WHERE bookCategory = "0";`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allsefatBooks api")
            } else {
                res.json(result)
            }
        })
});

///////////////// personbook table ///////////////
/*
Api for get all books which contain specific sahaby
EndPoint: /booksToOnePerson/:id
method: GET
{
    personId: 2,
    bookId: 50
}
*/
apis.get('/booksToOnePerson/:id', (req, res) => {
    let id = req.params.id
    query.query(`SELECT * FROM personbook WHERE personId = ${id};`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in booksToOnePerson api")
            } else {
                res.json(result)
            }
        })
})

///////////////// sefatbook table ///////////////

/*
Api for get all books which contain specific safa
EndPoint: /booksToOneSefa/:id
method: GET
{
    book_id: 43,
    sefat_Id: 1
}
*/
apis.get('/booksToOneSefa/:id', (req, res) => {
    let id = req.params.id
    query.query(`SELECT * FROM sefatbook WHERE sefat_Id = ${id};`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in booksToOneSefa api")
            } else {
                res.json(result)
            }
        })
})

///////////////// place table ///////////////
/*
Api for get places that sahaba visited
EndPoint: /allPlaces
method: GET
{
    placeId: 1,
    visitedPlaces: "مكه "
},
*/
apis.get('/allPlaces', (req, res) => {
    query.query(`SELECT * FROM placetble;`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allPlaces api")
            } else {
                res.json(result)
            }
        })
})

///////////////////////// Videos Table //////////////////////////
/*
Api for get vedios
EndPoint: /allVideos
method: GET
{
    videoId: 1,
    personId: 2,
    videoName: "طارق السويدان أبو بكر الصديق الجزء الأول",
    videoDescription: "مقطع صوتي لأبي بكر الصديق ",
    instructorName: "طارق السويدان",
    Category: "1",
    seriesName: "سلسلة الصحابة ",
    videoLink: "https://www.youtube.com/watch?v=z3HouXZUWEA&list=PLW3Dddj9BXB8CAx3i5U9UFuELJDpY21qF&index=1"
}
*/

apis.get('/allVideos', (req, res) => {
    query.query(`SELECT * FROM videostable;`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allVideos api")
            } else {
                res.json(result)
            }
        })
})


// //////////////////////////////   APIS SAHABA PAGE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\
////////////////////// personalities table ///////////////
/*
Api for get all data about sahaba
EndPoint: /allPerson
method: GET
{
    personId: 2,
    personName: "أبو بكر الصديق",
    personBreif: "صدّيق الأمة و خليل الهجرة",
    Narration: "https://drive.google.com/file/d/1TSfJPUkn8-jUMN-pLKYpu88w0szW7ms4/preview",
    txtNarration: "https://drive.google.com/file/d/1xdmL2cbExWnhJVSkOm5DMCguBksO9mCk/preview",
    placeOfDeth: "",
    placeOfBirth: "",
    per_image: {},
    Audio: null
}
*/
apis.get('/allPerson', (req, res) => {
    query.query(`SELECT * FROM personalities;`,
        (err, result) => {
            if (err) {
                res.send("error in allPerson api")
            } else {
                res.json(result)
            }
        })
})

/*
Api for get one Sahaby by take id
EndPoint: /onePerson/:id
method: GET
{
    personId: 2,
    personName: "أبو بكر الصديق",
    personBreif: "صدّيق الأمة و خليل الهجرة",
    Narration: "https://drive.google.com/file/d/1TSfJPUkn8-jUMN-pLKYpu88w0szW7ms4/preview",
    txtNarration: "https://drive.google.com/file/d/1xdmL2cbExWnhJVSkOm5DMCguBksO9mCk/preview",
    placeOfDeth: "",
    placeOfBirth: "",
    per_image: {},
    Audio: null
}
*/
apis.get('/onePerson/:id', (req, res) => {
    let id = req.params.id;
    console.log(req.header("id"));
    query.execute(`SELECT * FROM personalities WHERE personId = ${id}`,
        (err, result) => {
            if (err) {
                res.send("error in onePerson api");
            } else {
                res.json(result);
            }
        })
})
/**
Api for add new person
EndPoint: /addPerson
method: post
{
    personName: String,
    personBreif: String,
    Narration: String (link),
    txtNarration: String (link),
}
*/
apis.post('/addPerson', (req, res) => {
    try {
        let { personName, personBreif, Narration, txtNarration } = req.body
        console.log(req.body);
        query.execute(` INSERT INTO personalities( personName, personBreif, Narration, txtNarration) 
        VALUES ("${personName}","${personBreif}","${Narration}","${txtNarration}") `)

        res.json({ message: "Success add new person :)" })
    } catch (err) {
        res.send(err.message)
        res.json({ message: "invalid add new person" })
    }
})
///////////////////////////////////////////// End \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// ///////////////////////// API PAGE SEFAT  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\
///////////////////////// SEfat Table //////////////////////////
/**
Api for get all sefat data
EndPoint: /allSefats
method: GET
{
    sefatId: 1,
    sefatName: "الحياء",
    sefatDetails: "https://drive.google.com/file/d/1BaJ8ninSxNVMCQc0bqyJSfmDXHVidoKv/preview",
    sefatFadL: null,
    sefatSteps: "الإستعانة بالله أولًا وكثرة الدعاء بأن تكتسب صفة الحياء.,اتِّباع أوامر الله سبحانه والخوف منه، ومراقبته في كلِّ حين، واستشعار معيته.,اتِّباع سنَّة النَّبيِّ صلى الله عليه وسلم والاقتداء به في حياته القوليَّة والفعليَّة.",
    Image: null,
    sefatAudio: null,
    txtsefatDetails: "https://drive.google.com/file/d/14Kl5tBkCzxzLx6WOBrhdogyezcRiQoEb/preview"
}
 */
apis.get('/allSefats', (req, res) => {
    query.query(`SELECT * FROM sefattable WHERE sefatDetails != "null";`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allSefats api")
            } else {
                res.json(result)
            }
        })
})

/*
Api for get one sefa by id
EndPoint: /oneSefa/:id
method: GET
[
    {
        sefatId: 1,
        sefatName: "الحياء",
        sefatDetails: "https://drive.google.com/file/d/1BaJ8ninSxNVMCQc0bqyJSfmDXHVidoKv/preview",
        sefatFadL: null,
        sefatSteps: "الإستعانة بالله أولًا وكثرة الدعاء بأن تكتسب صفة الحياء.,اتِّباع أوامر الله سبحانه والخوف منه، ومراقبته في كلِّ حين، واستشعار معيته.,اتِّباع سنَّة النَّبيِّ صلى الله عليه وسلم والاقتداء به في حياته القوليَّة والفعليَّة.",
        Image: null,
        sefatAudio: null,
        txtsefatDetails: "https://drive.google.com/file/d/14Kl5tBkCzxzLx6WOBrhdogyezcRiQoEb/preview"
    }
]
*/
apis.get('/oneSefa/:id', (req, res) => {
    let id = req.params.id
    query.execute(`SELECT * FROM sefattable WHERE sefatId = ${id}`,
        (err, result) => {
            if (err) {
                res.send("error in oneSefa api")

            } else {
                res.json(result)
            }
        }
    )
})

/*
API for  insert one sefa 
End point :/addSefa 
method : METHOD
{
    sefatName: String,
    sefatDetails: String (link),
    sefatSteps: String,
    txtsefatDetails: String (link)
}
*/
apis.post('/addSefa', async (req, res) => {
    try {
        let { sefatName, sefatDetails, sefatSteps, txtsefatDetails } = req.body
        await query.execute(`INSERT INTO sefattable( sefatName, sefatDetails, sefatSteps, txtsefatDetails) 
                VALUES ("${sefatName}","${sefatDetails}", "${sefatSteps}", "${txtsefatDetails}") `)
        res.status(200).json({ status: "Success add new sefa" })
    } catch (err) {
        res.status(400).json({ message: "invalid add new sefa" })
        res.send(err.message)
    }
})

////////////////////////////////// End \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

///////////////// personSefat table ///////////////
// data from ai
apis.get('/allPersonSefat/:id', (req, res) => {
    let id = req.params.id
    query.query(`SELECT * FROM personsefat WHERE sefatId = ${id};`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allPersonSefat api")
            } else {
                res.json(result)
            }
        })
})

///////////////////////// Visited Places Table //////////////////////////
// data from ai
apis.get('/allVisitedPlaces', (req, res) => {
    query.query(`SELECT * FROM visitedplaces;`,
        (err, result) => {
            if (err) {
                res.send(err)
                res.send("error in allVisitedPlaces api")
            } else {
                res.json(result)
            }
        })
})

/*
Api for place map
EndPoint: /placeOfSahaba
method: GET
{
"personId": num,
"personName": String,
"placeOfDeth": String,
"placeOfBirth": String
}
*/
apis.get('/placeOfSahaba', async (req, res) => {
    await query.execute(`SELECT personId, personName, placeOfDeth, placeOfBirth FROM personalities`,
        (err, result) => {
            if (err) {
                res.send("error..............")
            } else {
                res.json(result)
            }
        })
})
module.exports = apis
