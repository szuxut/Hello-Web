/**
 * Created by szuxut on 2016/8/23.
 */


var originalQuestions = [//original question array
    {
        "title": "世界四大洋中面积最小的是?",
        "answer": "D",
        "choose": ["太平洋", "大西洋", "印度洋", "北冰洋"],
        "userChoose":null
    },
    {
        "title": "世界上海拔最高的山峰是哪一座?",
        "answer": "B",
        "choose": ["乔戈里峰", "珠穆朗玛峰", "干城章嘉峰", "公格尔山峰"],
        "userChoose":null
    },
    {
        "title": "下列海洋中哪一个是我国最大的海?",
        "answer": "A",
        "choose": ["南海", "东海", "黄海", "渤海"],
        "userChoose":null
    }
];
var historyQuestions = [],//record history questions
    totalPoints = 0,//total result
    right = 0,//answer right count
    wrong = 0,//answer wrong count
    originalQuestionsRandomCursor = Math.floor(Math.random() * (originalQuestions.length)),//originalQuestions Array's random cursor
    forwardOrBackFlag = 0,//distinguish time point from historyQuestions to originalQuestions
    totalRound = originalQuestions.length;


// start
$(document).ready(function () {
    originalForwardRenderPage();   // initialize page
});

/*  about event     */
// listen on next button
$('#next').on('click',function () {
    if(!$("input:radio:checked").val()) {
        alertErr("嘿,先选择一个答案吧");
    } else {
        forward();
    }
});
function forward() {

    if (forwardOrBackFlag == 0) {
        // 1.copy the question object to history array 2.remove this object from originalQuestions
        // 3.calculate your points
        var currentOriginalQuestion = originalQuestions[originalQuestionsRandomCursor];
        currentOriginalQuestion.userChoose = $("input:radio:checked").val();

        if (currentOriginalQuestion.userChoose == currentOriginalQuestion.answer) {
            right++;
            totalPoints += 10;
        } else {
            wrong++;
        }
        historyQuestions.push(originalQuestions.splice(originalQuestionsRandomCursor, 1)[0]);
        originalQuestionsRandomCursor = Math.floor(Math.random() * (originalQuestions.length));
        forwardOrBackFlag = 0;
        originalForwardRenderPage();
    } else {
        var currentHistoryQuestion = historyQuestions[historyQuestions.length + forwardOrBackFlag];
        currentHistoryQuestion.userChoose = $("input:radio:checked").val();

        if (currentHistoryQuestion.userChoose == currentHistoryQuestion.answer) {
            right++;
            totalPoints += 10;
        } else {
            wrong++;
        }

        forwardOrBackFlag += 1;

        if (forwardOrBackFlag == 0) {
            originalForwardRenderPage();
        } else {
            historyForwardRenderPage();
        }
        // create question and chooses
    }
}


// listen on back button
$('#back').on('click',function () {
    //console.log(historyQuestions.length + forwardOrBackFlag);

    var historyQuestionsCursor = historyQuestions.length + forwardOrBackFlag;
     // reduce 1 forwardOrBackFlag ,once back button click
    if(historyQuestionsCursor <= 0) {
        alertErr("嘿,你已经到返回到第一题啦!");
        console.log(historyQuestionsCursor);
    } else {
        forwardOrBackFlag -= 1;
        back();
    }
});

// listen on restart button
$('#restartButton').on('click',function () {
    location.reload();
});

function historyForwardRenderPage() {
    var historyQuestionsCursor = historyQuestions.length + forwardOrBackFlag;
    var title = historyQuestions[historyQuestionsCursor].title,
        answer0 = historyQuestions[historyQuestionsCursor].choose[0],
        answer1 = historyQuestions[historyQuestionsCursor].choose[1],
        answer2 = historyQuestions[historyQuestionsCursor].choose[2],
        answer3 = historyQuestions[historyQuestionsCursor].choose[3];

        $('#quiz-body').fadeOut('fast',function () {
            $('#question').text(title);
            $('#answer0').text(answer0);
            $('#answer1').text(answer1);
            $('#answer2').text(answer2);
            $('#answer3').text(answer3);
            $('#right').text(right);
            $('#wrong').text(wrong);
            $('#total').text(totalPoints);
            $('#quiz-body').fadeIn('fast');
        });
    setProgress();
};
/*  render HTML Page   */
function originalForwardRenderPage() {
    if(originalQuestions.length != 0) {
        var title = originalQuestions[originalQuestionsRandomCursor].title,
            answer0 = originalQuestions[originalQuestionsRandomCursor].choose[0],
            answer1 = originalQuestions[originalQuestionsRandomCursor].choose[1],
            answer2 = originalQuestions[originalQuestionsRandomCursor].choose[2],
            answer3 = originalQuestions[originalQuestionsRandomCursor].choose[3];
        //update page scores


        // init new chooses to unchecked
        $('input:radio').prop('checked', false);

        // create question and chooses
        $('#quiz-body').fadeOut('fast',function () {
            $('#question').text(title);
            $('#answer0').text(answer0);
            $('#answer1').text(answer1);
            $('#answer2').text(answer2);
            $('#answer3').text(answer3);
            $('#right').text(right);
            $('#wrong').text(wrong);
            $('#total').text(totalPoints);
            $('#quiz-body').fadeIn('fast');
        });
    } else {
        $('#quiz-body').addClass('no-display');
        $('#back').addClass('no-display');
        $('#next').addClass('no-display');
        $('#restartButton').css({'display':'block'});
        $('#restartTip').css({'display':'block'});
    }
    setProgress();
}
function back() {
    var historyQuestionsCursor = historyQuestions.length + forwardOrBackFlag;
    var title = historyQuestions[historyQuestionsCursor].title,
        answer0 = historyQuestions[historyQuestionsCursor].choose[0],
        answer1 = historyQuestions[historyQuestionsCursor].choose[1],
        answer2 = historyQuestions[historyQuestionsCursor].choose[2],
        answer3 = historyQuestions[historyQuestionsCursor].choose[3],
        rightAnswer = historyQuestions[historyQuestionsCursor].answer,
        userChoose = historyQuestions[historyQuestionsCursor].userChoose;

    //judge user choose ,and count the right or wrong
    if(userChoose == rightAnswer) {
        right -= 1;
        totalPoints -= 10;
    } else {
        wrong -= 1;
    }

    $('#quiz-body').fadeOut('fast',function () {
        $('#question').text(title);
        $('#answer0').text(answer0);
        $('#answer1').text(answer1);
        $('#answer2').text(answer2);
        $('#answer3').text(answer3);
        $('#right').text(right);
        $('#total').text(totalPoints);
        $('#wrong').text(wrong);
        switch (userChoose) {
            case "A":
                $('#input1').prop('checked', 'checked');
                break;
            case "B":
                $("#input2").prop('checked', 'checked');
                break;
            case "C":
                $('#input3').prop('checked', 'checked');
                break;
            case "D":
                $('#input4').prop('checked', true);
                break;
        }
        $('#quiz-body').fadeIn('fast');
    });
    setProgress();
}
function alertErr(str) {
    $('#alertLayer').text(str).slideDown('fast').delay(1000).slideUp('fast');
}
function setProgress(){
    //var progressbarValue = 33;
    var nowRound = right + wrong;
    console.log(nowRound);
    var percent = Math.round((nowRound / totalRound) * 100);
    $('.progress-bar').css({'width':percent+'%','min-width':percent+'em'}).text(percent+'%');
    //$('.progress-bar').css({'width':'80%','min-width':'80em'});
}


/*
var CookieUtil = {
    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
                + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
            encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

$('#signUp').on('click',function () {
    var username = $('#username_signup').val();
    var password = $('#password_signup').val();

    localStorage.setItem(username,password);
    $('#username_signup').val("");
    $('#password_signup').val("");
    alert("注册成功");
});

$('#logIn').on('click',function () {
    var username = $('#username_login').val();
    var password = $('#password_login').val();
    $('#quiz-body').fadeIn();
    $('#userinfo').css('.hidden');
    $(this).closest('#main').css('.visible');
    
    if(localStorage.getItem(username) && password == localStorage.getItem(username)) {
        alert("欢迎回来");
    
        CookieUtil.set(username,password);
        var pwdWelcome = CookieUtil.get(username);
        $('#username').text("用户名："+username+" | "+"密码："+pwdWelcome);
    
        $("#password_login").val('');
        $("#username_login").val('');
    
    
        $('#userinfo').fadeOut({'display': 'none'});
        $('#main').fadeIn({'display': 'block'});
    
    
    } else {
        if(!localStorage.getItem(username)) {
            alert("用户不存在！");
            $("#password_login").val('');
            $("#username_login").val('');
    
        } else if(password != localStorage.getItem(username)) {
            alert("密码错误");
            $("#password_login").val('');
        }
    }
});
 
 about data initialize

 function initialize() {
 /*          // try to import json file data to originalQuestion, but failed
 $.getJSON("qaLib.json",function (data) {
 $.each(data,function (key) {
 originalQuestions.push(data[key]);

 });
 alert(originalQuestions.length + 'haha');
 });

 // get a random question from original questions

 }
 
*/
