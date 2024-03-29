function IntervalUnit(interval, sign) {
    this.interval = interval;
    this.Sign = sign;
    this.isStop = false;
}

var CountDown = {};
var interval = null;
CountDown.M_IntervalUnits = []; //定时器容器数组

CountDown.openTimeCountBySeconds = function (params) {
    clearInterval(interval);
    var CountDownSeconds = 0;
    if (params.CountDownSeconds) {
        CountDownSeconds = params.CountDownSeconds;
    }
    var Ele = document.body;
    if (params.Ele) {
        Ele = params.Ele;
    }
    var EndFunc = function () {};
    if (params.EndFunc) {
        EndFunc = params.EndFunc;
    }
    var Divider = ':';
    if (params.Divider) {
        Divider = params.Divider;
    }
    var Sign = 'time';
    if (params.Sign) {
        Sign = params.Sign;
    }
    var startDate = new Date();
    var endDate = new Date();
    endDate.setSeconds(startDate.getSeconds() + CountDownSeconds);

    var tempdate = new Date(endDate.getTime() - startDate.getTime());

    interval = setInterval(function () {
        if (intervalUnit.isStop) {
            return;
        }
        if (startDate.getTime() >= endDate.getTime()) {
            clearInterval(interval);
            EndFunc();
            return;
        }

        startDate.setSeconds(startDate.getSeconds() + 1);

        tempdate.setTime(endDate.getTime() - startDate.getTime());
        Ele.innerText = CountDown.makeTimeText(tempdate, Divider);
    }, 1000);

    var intervalUnit = new IntervalUnit(interval, Sign, false);
    CountDown.M_IntervalUnits.push(intervalUnit);
};


CountDown.openTimeCountByStartAndEndDate = function (params) {
    clearInterval(interval);
    var Ele = document.body;
    if (params.Ele) {
        Ele = params.Ele;
    }
    var EndFunc = function () {};
    if (params.EndFunc) {
        EndFunc = params.EndFunc;
    }
    var Divider = ':';
    if (params.Divider) {
        Divider = params.Divider;
    }
    var Sign = '';
    if (params.Sign) {
        Sign = params.Sign;
    }
    var startDate;
    if (params.StartDate) {
        startDate = params.StartDate;
    }
    var endDate;
    if (params.EndDate) {
        endDate = params.EndDate;
    }
    var additionToggle = undefined;
    if (params.additionToggle) {
        additionToggle = {};
        additionToggle.seconds = params.additionToggle.seconds;
        additionToggle.callback = params.additionToggle.callback;
    }
    var tempdate = new Date(endDate.getTime() - startDate.getTime());

    interval = setInterval(function () {
        if (intervalUnit.isStop) {
            return;
        }
        if (startDate.getTime() >= endDate.getTime() - 1000) {
            clearInterval(interval);
            return;
        }

        startDate.setSeconds(startDate.getSeconds() + 1);

        tempdate.setTime(endDate.getTime() - startDate.getTime());

        // if (additionToggle && !this.alreadyToggle) {
        //     if (tempdate.getTime() / 1000 < additionToggle.seconds) {
        //         additionToggle.callback();
        //         this.alreadyToggle = true;
        //     }
        // }
        console.log(CountDown.makeTimeText(tempdate, Divider));
        Ele.innerText = CountDown.makeTimeText(tempdate, Divider);
    }, 1000);

    var intervalUnit = new IntervalUnit(interval, Sign, false);
    CountDown.M_IntervalUnits.push(intervalUnit);

};

CountDown.stopBySign = function (Sign) {
    for (var i = 0; i < CountDown.M_IntervalUnits.length; ++i) {
        if (CountDown.M_IntervalUnits[i].Sign == Sign) {
            CountDown.M_IntervalUnits[i].isStop = true;
        }
    }
};

CountDown.resumeBySign = function (Sign) {
    for (var i = 0; i < CountDown.M_IntervalUnits.length; ++i) {
        if (CountDown.M_IntervalUnits[i].Sign == Sign) {
            CountDown.M_IntervalUnits[i].isStop = false;
        }
    }
};

CountDown.startBySign = function (Sign) {
    this.openTimeCountBySeconds(Sign);
};


CountDown.makeTimeText = function (tempdate, Divider) {
    var hour = parseInt(tempdate.getTime() / (60 * 60 * 1000));
    var minutes = tempdate.getMinutes();
    var seconds = tempdate.getSeconds();

    var timetext = '';
    if (hour < 10) {
        timetext = timetext + '0';
    }
    timetext = timetext + hour + Divider;
    if (minutes < 10) {
        timetext = timetext + '0';
    }
    timetext = timetext + minutes + Divider;
    if (seconds < 10) {
        timetext = timetext + '0';
    }
    timetext = timetext + seconds;
    return timetext;
};

CountDown.makeDateAndTimeText = function (tempdate, Divider, dateDivider) {
    var date = parseInt(tempdate.getTime() / (60 * 60 * 1000 * 24));
    var hour = parseInt((tempdate.getTime() % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000));
    var minutes = tempdate.getMinutes();
    var seconds = tempdate.getSeconds();

    var timetext = '';
    timetext = timetext + date + dateDivider;
    if (hour < 10) {
        timetext = timetext + '0';
    }
    timetext = timetext + hour + Divider;
    if (minutes < 10) {
        timetext = timetext + '0';
    }
    timetext = timetext + minutes + Divider;
    if (seconds < 10) {
        timetext = timetext + '0';
    }
    timetext = timetext + seconds;
    return timetext;
};