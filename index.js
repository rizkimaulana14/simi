const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const Router = express.Router();

Router.get('/', (req, res) => {
    // get request
    let msg = req.query.msg;

    axios
        .get('https://api.akuari.my.id/simi/simi2?query=' + msg)
        .then(function (response) {
            // deklarasi res ke variabel
            let simi = response.data;

            // manipulasi data
            simi['creator'] = 'Rizki Maulana';
            simi['donasi'] = '0895361164306';
            simi['website'] = 'https://skyzedev.tech';

            if (msg == 'creator?' || msg == 'creator') {
                simi['respon'] = 'Rizki Maulana, jangan lupa Donasii yaa..!!';
            } else if (
                msg == 'siapa' ||
                msg == 'kamu siapa' ||
                msg == 'siapa kamu'
            ) {
                simi['respon'] = 'Aku Jodohmu, namaku Syifa..';
            } else if (msg == 'cantik' || msg == 'ayang' || msg == 'eummm') {
                simi['respon'] = 'Iyaa apa sayang, mau pap..?';
            } else if (
                msg == 'punya wa ga?' ||
                msg == 'punya wa?' ||
                msg == 'punya wa ngga?'
            ) {
                simi['respon'] = 'ini kan wa syifaaa..!!';
            }

            // render result
            res.send(simi);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.use(`/.netlify/functions/api`, Router);

module.exports = app;
module.exports.handler = serverless(app);
