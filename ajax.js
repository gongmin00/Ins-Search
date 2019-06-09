$("#btn-clear").hide()
$("#limit-container").hide()
$('#btn').click(function () {
    $("#btn-clear").show()
    $("#limit-container").show()
    var userName = $("#input").val()
    var photoLimit = $("#limit").val()
    var userLink = 'https://api.lityapp.com/instagrams/' + userName + '?limit=' + photoLimit
    console.log(userLink)
    /*why photoLimit not affect url */
    $.ajax({
        url: userLink,
        error: function () {
            alert("please enter correct username")
        }

    }).done(function (data) {
        var insData = JSON.parse(data)
        console.log(insData.photoUrlHD)
        var insContainer = $('#ins-container')
        $('<img>').attr('src', insData.photoUrlHD).appendTo(insContainer)
        var postList = insData.posts

        for (var i = 0; i < postList.length; i++) {
                $('<img>').attr('src', postList[i].photoUrl).css({
                    'width': postList[i].photoWidth,
                    'height': postList[i].photoHeight
                }).appendTo(insContainer)
                $('<p>').text(postList[i].caption).appendTo(insContainer)

            }

        $("#btn-limit").on("click",function(){
            var photoLimit = $("#limit").val();
            $(insContainer).empty()
            for (var b=0; b<photoLimit;b++) {
                
                $("<img>").attr("src",postList[b].photoUrl).css({
                    "width":postList[b].photoWidth,
                    "height":postList[b].photoHeight
                }).appendTo(insContainer)
                $("<p>").text(postList[b].caption).appendTo(insContainer)
            }
        })
        $("#btn-clear").on("click", function () {
            $(insContainer).empty()
        })
    })
    $("#input").val('')
})



