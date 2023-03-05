const SurveyResponse = require("../data-access-object/surveyresponse.dao");
const { errors } = require('../utils');

exports.checkResponseValidity = async(req, res, next) => {
    try{
        const data = {
            ipaddress: req.body['ipaddress'],
            emotionFrom: req.body['emotionFrom'],
            emotionBy: req.body["emotionBy"]
        };
        const existingResponse = await SurveyResponse.getResponseDataByCategory(data);
        if (existingResponse)  {
            throw new errors.Conflict('Response from this ip of this emotion already exists');
        }
        res.locals.result = 'Response Ok';
        next();
    }catch(err){
        next(err);
    }
}

exports.submitResponse = async (req, res, next) => {
    try {
        req.body.islike = req.body.islike == 'dislike'? false: true;
        const surveyResponse = {
            emotion: req.body.emotion,
            strength: req.body.strength,
            rating: req.body.rating,
            isLike : req.body.islike,
            emotionFrom : req.body.emotionFrom,
            emotionBy : req.body.emotionBy,
            ipaddress : req.body.ipaddress
        };
        if (req.user) {
            surveyResponse.user = req.user.id;
        }
        await SurveyResponse.create(surveyResponse);
        res.locals.result = 'Response submitted'; 
        next();
    }catch (err) {
        next(err);
    }
}

exports.getEmotionsData = async (req, res, next) => {
    try{
        const data = {
            topic: req.body.topic,
            period: req.body.date
        };
        const emotionsData = await SurveyResponse.getEmotionsDataByTopic(data);
        res.locals.result = emotionsData;
        next();
    }catch(err){
        next(err);
    }
}

exports.getTopMostPolledData = async (req, res, next) => {
    try{
        const data = {
            to: new Date(),
            from: new Date()
        };
        switch (req.body.duration) {
        case 0:
            data.from.setDate(data.from.getDate() - 1);
            break;
        case 1:
            data.from.setDate(data.from.getDate() - 7);
            break;
        case 2:
            data.from.setMonth(data.from.getMonth() - 1);
            break;
        case 3:
            data.from.setFullYear(data.from.getFullYear() - 1);
            break;
        default:
            data.from.setDate(data.from.getDate() - 1);
        }
        const emotionsData = await SurveyResponse.getTopMostPolledData(data);
        res.locals.result = emotionsData;
        next();
    }catch(err){
        next(err);
    }
}

exports.getChartData = async (req, res, next) => {
    try {

        let dataValue = await SurveyResponse.getResponseData();
        console.log(dataValue);
        var emotionMap = new Map();
        var ratingMap = new Map();
        var isLikeMap = new Map();
        console.log('hereee');
        debugger;
        for(var i = 0 ; i < dataValue.length; i++){
            console.log(dataValue[i]);
            if(!emotionMap.has(dataValue[i].emotion)){
                console.log('in if');
                emotionMap.set(dataValue[i].emotion, 1);
            }else{
                console.log('in else');
                let count = emotionMap.get(dataValue[i].emotion);
                emotionMap.set(dataValue[i].emotion, count + 1);
            }

            if(!ratingMap.has(dataValue[i].rating)){
                console.log('in if');
                ratingMap.set(dataValue[i].rating, 1);
            }else{
                console.log('in else');
                let count = ratingMap.get(dataValue[i].rating);
                ratingMap.set(dataValue[i].rating, count + 1);
            }

            if(!isLikeMap.has(dataValue[i].isLike)){
                console.log('in if');
                isLikeMap.set(dataValue[i].isLike, 1);
            }else{
                console.log('in else');
                let count = isLikeMap.get(dataValue[i].isLike);
                isLikeMap.set(dataValue[i].isLike, count + 1);
            }
            console.log(emotionMap);
        }
        var labelsEmotion  = [];
        var dataEmotion = [];
        for (let vegetable of emotionMap.keys()) {
            labelsEmotion.push(vegetable);
            dataEmotion.push(emotionMap.get(vegetable));
            console.log(emotionMap.get(vegetable));

        }
        var labelsRating  = [];
        var dataRating = [];
        for (let rating of ratingMap.keys()) {
            labelsRating.push(rating);
            dataRating.push(ratingMap.get(rating));
            console.log(ratingMap.get(rating));

        }

        var labelsIsLike  = [];
        var dataIsLike = [];
        for (let like of isLikeMap.keys()) {
            labelsIsLike.push(like);
            dataIsLike.push(isLikeMap.get(like));
            console.log(isLikeMap.get(like));

        }

        
        res.locals.result = {
            "emotion" : {
                "label" : labelsEmotion,
                "values" : dataEmotion
            },
            "rating" : {
                "label" : labelsRating,
                "values" : dataRating
            },
            "isLike" : {
                "label" : labelsIsLike,
                "values" : dataIsLike
            }

        };
        
        next();
    }catch (err) {
        next(err);
    }
}