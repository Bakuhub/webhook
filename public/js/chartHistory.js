$('#statusBar').hide();
var canvas = document.getElementById('chart-area');
var canvas2 = document.getElementById('chart-area2');
var ctx = document.getElementById("chart-area").getContext("2d");
var ctx2 = document.getElementById("chart-area2").getContext("2d");

function statMsg(i) {
    $('#statusBar').show();
    $('#statusBar').html(i);
}
function endMsg(i) {
    $("#statusBar").show();
    $("#statusBar").html(i);
    setTimeout(() => {
        $('#statusBar').hide();
    }, 5000);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [],
            backgroundColor: [],
            label: 'Pie'
        }],
        labels: []
    },
    options: {
        responsive: true
    }
};
var barConfig = {
    type: 'horizontalBar',
    data: {
        //need to insert names
        labels: [],
        datasets: [
            {
                label: "ppt",
                //push random color with value
                backgroundColor: [],
                //push Object.value to data 
                data: [],
            }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: { display: false },
        title: {
            display: true,
            text: ''
        }
    }
}


//init pie chart
function chartInit(chartData) {
    var data = config.data.datasets[0]['data'];
    var backgroundColor = config.data.datasets[0]['backgroundColor'];
    var labels = config.data.labels;
    var barData = barConfig.data.datasets[0]['data'];
    var barBackgroundColor = barConfig.data.datasets[0]['backgroundColor'];
    var barLabels = barConfig.data.labels;
    var change = [data, backgroundColor, labels, barData, barBackgroundColor, barLabels];
    for (var k = 0; k < change.length; k++) {
        if (change[k] !== undefined) {
            change[k].length = 0;
        }
    };
    for (var i = 0; i < Object.values(chartData).length; i++) {
        var color = getRandomColor();
        data.push(Object.values(chartData)[i]);
        backgroundColor.push(color);
        labels.push(Object.keys(chartData)[i]);
        barData.push(Object.values(chartData)[i]);
        barBackgroundColor.push(color);
        barLabels.push(Object.keys(chartData)[i]);
    }
}
var temp1;
var temp2;
$('#chartSubmit').click((e) => {
    statMsg('Creating Charts');
    if ($('#startDate').val() == '') {
        endMsg('please input startDate');
        return;
    }
    if ($('#endDate').val() == '') {
        endMsg('please input endDate');
        return;
    }

    if ($('#startDate').val() > $('#endDate').val()) {
        endMsg('invalid date');
        return;
    }
    {
        $.ajax({
            type: "POST",
            url: "/selectPeriod",
            data: $("#date_form").serialize(),
            success: function (e) {
                console.log(myPie);
                if (temp1 !== undefined && temp2 !== undefined) {
                    temp1.destroy();
                    console.log('clear');
                    temp2.destroy();
                }

                var chartData = e;
                if (Object.keys(chartData).length === 0 && chartData.constructor === Object) {
                    statMsg('Sry, there is no data during selected Period');
                } else {
                   chartInit(chartData);
                    barConfig.options.title.text = 'Bar Chart During ' + $('#startDate').val() + ' to ' + $('#endDate').val();
                    var myPie = new Chart(ctx, config);
                    var myBar = new Chart(ctx2, barConfig);
                    temp1 = myPie;
                    temp2 = myBar;
                    endMsg('Chart completed');
                }
            }
        })
    }
    e.preventDefault();
    });
